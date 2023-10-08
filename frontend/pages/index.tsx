import Image from "next/image";
import onyx from "../public/onyx.jpeg";
import bico from "../public/biconomy.png";
import magic from "../public/magic.png";
import visa from "../public/visa.png";
import React, { useEffect, useState } from "react";
import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
import CreateSession from "@/components/CreateSession";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Wallet, providers, ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null
  );
  const router = useRouter() 

  const [encryptionKey, setEncryptionKey] = useState<string>();
  const [magicLink, setMagicLink] = useState<any>();


  useEffect(() => {
    if (!magicLink) {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
        network: {
          rpcUrl: "https://rpc-mumbai.maticvigil.com",
          chainId: 80001,
        },
      });
      setMagicLink(magic);
    }
  }, []);

  const bundler: IBundler = new Bundler({
    bundlerUrl:
      "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL as string,
  });

  const connect = async () => {
    try {
      setLoading(true);
      await magicLink.wallet.connectWithUI();
      const web3Provider = new ethers.providers.Web3Provider(
        magicLink.rpcProvider,
        "any"
      );
      setProvider(web3Provider);

      const module = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });

      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: module,
        activeValidationModule: module,
      });

      const address = await biconomySmartAccount.getAccountAddress();
      setSmartAccount(biconomySmartAccount);
      setAddress(address);
      toast.success(`Success! Account Created: ${address}`, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      await router.push("/onboard")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen bg-blue-400">
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      <div className="flex mt-4">
        <div className="w-3/5 mt-6">
          <div className="bg-blue-400 h-screen rounded-xl">
            <div className="mx-20">
              <p className="text-white font-semibold text-7xl text-center mt-36">
                Building Trust, Pioneering Business Payment Solutions
              </p>
              <div>
                <p className="mt-10 text-white font-semibold text-xl text-center">
                  Powered by
                </p>
                <div className="flex mt-5 justify-between">
                  <Image src={onyx} alt="" height={100} />
                  <Image src={bico} alt="" height={60} width={90} />
                  <Image src={magic} alt="" height={100} />
                  <Image src={visa} alt="" height={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 mt-6 mx-5">
          <div className="bg-white h-screen rounded-xl">
            <div className="mx-28">
              <div className="px-10">
                <p className="text-5xl text-center py-20 font-semibold">
                  Power you business
                </p>
                <p className="text-3xl text-center font-semibold ">
                  Start With <span className="text-blue-500">BizTrust</span>
                </p>
                <button onClick={() => connect()} className="mt-20 mx-auto flex font-semibold text-2xl px-10 py-2 rounded-xl bg-blue-400 text-white hover:scale-105 duration-300 hover:border-blue-500 hover:bg-white hover:text-blue-500 border border-white ">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
