import React from "react";
import { Types } from "zksync-checkout";
import { CheckoutManager } from "zksync-checkout";
import { ethers } from "ethers";
import axios from "axios";

const Checkout = () => {
  const ethProvider = ethers.providers.getDefaultProvider("mainnet");

  async function checkoutUser(
    // The list of payments the user has to do
    transactions: Types.ZkSyncTransaction[],
    feeToken: Types.TokenLike,
    address?: string
  ) {
    const checkoutManager = new CheckoutManager("mainnet");

    if (address) {
      // Checks that sum of L1 + L2 balances of the user are sufficient to pay for the transactions
      const hasEnoughBalance = await checkoutManager.checkEnoughBalance(
        transactions,
        feeToken,
        address,
        ethProvider
      );

      if (!hasEnoughBalance) {
        throw new Error("Not enough balance!");
      }
    }
    const txHashes = await checkoutManager.zkSyncBatchCheckout(
      transactions,
      feeToken
    );

    console.log(txHashes);

    const receipts = await checkoutManager.wait(txHashes, "COMMIT");

    // Now we now that the transactions have completed and
    // we can send the payment info to be processed on the back-end of your app
    console.log(receipts);
  }

  const transactions = [
    {
      to: "<your-eth-address>",
      token: "DAI",
      amount: "23000000000000000000", // in wei
      description: "For apples",
    },
    {
      to: "<your-eth-address>",
      token: "DAI",
      amount: "55500000000000000000",
      description: "For bananas",
    },
  ];

  const checkTransaction = async (txHash: any) => {
    const res = await axios.get(
      `https://goerli-api.zksync.io/api/v0.1/transactions/${txHash}`
    );
    const res2 = await axios.get(
      `https://goerli-api.zksync.io/api/v0.1/transactions_all/${txHash}`
    );
    console.log(res);
    console.log(res2);
  };

  return (
    <div>
      <button onClick={() => checkoutUser(transactions, "DAI", "0x")}>
        Send Reciept
      </button>
    </div>
  );
};

export default Checkout;
