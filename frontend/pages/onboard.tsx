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
  const [properties, setProperties] = useState({
    compname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    mail: "",
    taxNo: "",
    regNo: "",
  });
  const [continu, setContinu] = useState<boolean>(false);

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

  const issueOnboardindVCs = async () => {

    await addNewCompany(address,properties.compname,properties.address,properties.mail,properties.taxNo,properties.regNo);

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
      {/* {!loading && !address && <button onClick={connect}>Connect</button>}
      {loading && <p>Loading Smart Account...</p>}
      {address && <h2>Smart Account: {address}</h2>}

      {smartAccount && provider && (
        <CreateSession
          smartAccount={smartAccount}
          address={address}
          provider={provider}
        />
      )} */}

      <div className="w-screen">
        <div className="flex justify-center mx-auto mt-6">
          {continu ? (
            <div className="border border-gray-300 w-2/3 px-10 py-6 rounded-xl shadow-xl">
              <div className="flex flex-col">
                <div className="flex justify-start">
                  <p className="text-3xl font-semibold text-gray-800">
                    Generate Verifications
                  </p>
                </div>
                <div className="flex flex-col mt-10">
                  <div>
                    <p className="font-semibold text-2xl">Review Details</p>
                  </div>
                  <div className="w-full grid grid-cols-3 grid-rows-3 gap-x-10 gap-y-10 mt-6">
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Company Name
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.compname}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Address
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.address}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        City
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.city}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        state
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.state}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Country
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.country}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Zip Code
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.zip}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Contact Mail
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.mail}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Tax No.
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.taxNo}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-slate-500 font-semibold">
                        Registration No.
                      </p>
                      <p className="text-black font-semibold mt-1 text-lg">
                        {properties.regNo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex flex-col">
                    <p className="text-xl text-black font-semibold">
                      Generate Proof of Registration
                    </p>
                    <button className="px-10 w-1/3 mx-auto py-2 mt-5 bg-gradient-to-tl from-blue-300 text-xl font-semibold hover:scale-105 duration-300 to-blue-500 text-white rounded-xl">
                      Generate
                    </button>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex flex-col">
                    <p className="text-xl text-black font-semibold">
                      Set PassCode
                    </p>
                    <input
                      className="px-3 py-2 rounded-lg bg-gray-100 mt-6 w-40 text-xl text-center mx-auto "
                      placeholder="* * * *"
                      type="password"
                    ></input>
                    <p className="mt-2 text-xs text-slate-500 text-center w-80 mx-auto">
                      This passcode must be only 4 numbers and remember it to
                      further use it for verifying your identity.
                    </p>
                    <button className="px-10 w-1/3 mx-auto py-2 mt-10 bg-gradient-to-tl from-blue-300 text-xl font-semibold hover:scale-105 duration-300 to-blue-500 text-white rounded-xl">
                      Set
                    </button>
                  </div>
                </div>
                <div className="mt-7 flex justify-between w-full">
                  <button
                    onClick={() => setContinu(false)}
                    className="px-10 w-1/3 mx-auto py-2 mt-10 bg-gradient-to-tl from-red-300 text-xl font-semibold hover:scale-105 duration-300 to-red-500 text-white rounded-xl"
                  >
                    Back
                  </button>
                  <button onClick={() => issueOnboardindVCs()} className="px-10 w-1/3 mx-auto py-2 mt-10 bg-white border border-blue-500 text-xl font-semibold hover:scale-105 duration-300  text-blue-500 rounded-xl">
                    Finish
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
                          <input
                            onChange={(e) =>
                              setProperties({
                                ...properties,
                                compname: e.target.value,
                              })
                            }
                            value={properties.compname}
                            className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"
                          ></input>
                        </div>
                        <div>
                          <p className="font-semibold mt-8">Company Address</p>
                          <div className="flex flex-col">
                            <div className="flex">
                              <input
                                onChange={(e) =>
                                  setProperties({
                                    ...properties,
                                    address: e.target.value,
                                  })
                                }
                                value={properties.address}
                                className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-60 text-xl"
                                placeholder="address"
                              ></input>
                              <input
                                onChange={(e) =>
                                  setProperties({
                                    ...properties,
                                    city: e.target.value,
                                  })
                                }
                                value={properties.city}
                                className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-960 text-xl mx-3"
                                placeholder="city"
                              ></input>
                            </div>
                            <div className="flex">
                              <input
                                onChange={(e) =>
                                  setProperties({
                                    ...properties,
                                    state: e.target.value,
                                  })
                                }
                                value={properties.state}
                                className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-40 text-xl"
                                placeholder="state"
                              ></input>
                              <input
                                onChange={(e) =>
                                  setProperties({
                                    ...properties,
                                    country: e.target.value,
                                  })
                                }
                                value={properties.country}
                                className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-40 text-xl mx-3"
                                placeholder="country"
                              ></input>
                              <input
                                onChange={(e) =>
                                  setProperties({
                                    ...properties,
                                    zip: e.target.value,
                                  })
                                }
                                value={properties.zip}
                                className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-40 text-xl"
                                placeholder="zip"
                              ></input>
                            </div>
                          </div>
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
                          <input
                            onChange={(e) =>
                              setProperties({
                                ...properties,
                                mail: e.target.value,
                              })
                            }
                            value={properties.mail}
                            className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"
                          ></input>
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
                          <input
                            onChange={(e) =>
                              setProperties({
                                ...properties,
                                taxNo: e.target.value,
                              })
                            }
                            value={properties.taxNo}
                            className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"
                          ></input>
                        </div>
                        <div>
                          <p className="font-semibold mt-8">
                            Registration Number
                          </p>
                          <input
                            onChange={(e) =>
                              setProperties({
                                ...properties,
                                regNo: e.target.value,
                              })
                            }
                            value={properties.regNo}
                            className="px-3 py-2 rounded-lg bg-gray-100 mt-2 w-96 text-xl"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <button
                    onClick={() => setContinu(true)}
                    className="px-16 py-2 bg-blue-500 text-white rounded-xl text-lg font-semibold cursor-pointer hover:scale-105 duration-300 hover:bg-white border border-white hover:border-blue-500 hover:text-blue-500"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboard;
