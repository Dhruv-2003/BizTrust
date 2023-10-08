/* eslint-disable @next/next/no-assign-module-variable */
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
import { createIssueVC } from "@/components/onyxMethods";
import { CredentialType, SchemaURL } from "@/components/onyx";
import { async } from "@firebase/util";
import { addNewCompany } from "@/firebase/methods";

const Onboard = () => {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(
    null
  );

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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createCompany = async () => {
    // check data

    // add data to Firebase first
    await addNewCompany();
  };

  const issueOnboardindVCs = async () => {
    await createIssueVC(
      address,
      SchemaURL.SCHEMA_PROOF_OF_NAME,
      {
        name,
      },
      CredentialType.PROOF_OF_NAME,
      encryptionKey
    );

    await createIssueVC(
      address,
      SchemaURL.SCHEMA_PROOF_OF_ADDRESS,
      {
        name,
        address,
        city,
        state,
        country,
        zip,
      },
      CredentialType.PROOF_OF_ADDRESS,
      encryptionKey
    );

    await createIssueVC(
      address,
      SchemaURL.SCHEMA_PROOF_OF_REGISTERATION,
      {
        name,
        registeration_no,
      },
      CredentialType.PROOF_OF_REGISTERATION,
      encryptionKey
    );

    await createIssueVC(
      address,
      SchemaURL.SCHEMA_PROOF_OF_TAX,
      {
        name,
        tax_no,
      },
      CredentialType.PROOF_OF_TAX,
      encryptionKey
    );
  };

  return (
    <div>
      {!loading && !address && <button onClick={connect}>Connect</button>}
      {loading && <p>Loading Smart Account...</p>}
      {address && <h2>Smart Account: {address}</h2>}

      {smartAccount && provider && (
        <CreateSession
          smartAccount={smartAccount}
          address={address}
          provider={provider}
        />
      )}

      <div className="w-screen">
        <div className="flex justify-center mx-auto mt-6">
          <div className="border border-gray-300 w-2/3 px-10 py-6 rounded-xl shadow-xl">
            <div className="flex flex-col">
              <div className="flex justify-start">
                <p className="text-3xl font-semibold text-gray-800">
                  Business Details
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-2xl text-gray-700 font-semibold">
                      Basic Details
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col justify-start">
                      <div>
                        <p className="font-semibold">Company Name</p>
                        <input className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"></input>
                      </div>
                      <div>
                        <p className="font-semibold mt-8">Company Address</p>
                        <input className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"></input>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-6" />
              </div>
              <div className="mt-6">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-2xl text-gray-700 font-semibold">
                      Contact Details
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col justify-start">
                      <div>
                        <p className="font-semibold">Contact Mail</p>
                        <input className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"></input>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-6" />
              </div>
              <div className="mt-6">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-2xl w-5/6 text-gray-700 font-semibold">
                      Tax and Registration Details
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col justify-start">
                      <div>
                        <p className="font-semibold">Tax Number</p>
                        <input className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"></input>
                      </div>
                      <div>
                        <p className="font-semibold mt-8">
                          Registration Number
                        </p>
                        <input className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button className="px-16 py-2 bg-blue-500 text-white rounded-xl text-lg font-semibold cursor-pointer hover:scale-105 duration-300 hover:bg-white border border-white hover:border-blue-500 hover:text-blue-500">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
