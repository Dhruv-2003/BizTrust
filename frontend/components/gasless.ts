import { ethers } from "ethers";
import abi from "some abi location"
import { 
  IHybridPaymaster, 
  SponsorUserOperationDto,
  PaymasterMode
} from '@biconomy/paymaster'
import { useState } from "react";
import {
  BiconomySmartAccountV2,
} from "@biconomy/account";

const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)
const [address, setAddress] = useState<any>();
const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);

const nftAddress = "0x0a7755bDfb86109D9D403005741b415765EAf1Bc"

export const handleMint = async () => {
  const contract = new ethers.Contract(
    nftAddress,
    abi,
    provider as ethers.providers.Provider,
  )
  try {
    const minTx = await contract.populateTransaction.safeMint(address);
    console.log(minTx.data);
    const tx1 = {
      to: nftAddress,
      data: minTx.data,
    };
    let userOp = await smartAccount.buildUserOp([tx1]);
    console.log({ userOp })
    const biconomyPaymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0'
      },
    };
    const paymasterAndDataResponse =
      await biconomyPaymaster.getPaymasterAndData(
        userOp,
        paymasterServiceData
      );
      
    userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
    const userOpResponse = await smartAccount.sendUserOp(userOp);
    console.log("userOpHash", userOpResponse);
    const { receipt } = await userOpResponse.wait(1);
    console.log("txHash", receipt.transactionHash);
  } catch (err: any) {
    console.error(err);
    console.log(err)
  }
}


