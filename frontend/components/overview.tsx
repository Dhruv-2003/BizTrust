import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getVCs, getCompanyInfo } from "@/firebase/methods";

const Overview = (props: any) => {
  const [VCs, setVCs] = useState<any[]>();
  const address = props.address;

  useEffect(() => {
    if (address) {
      getVCsInfo(address);
    }
  }, [address]);

  const getInfo = async (address: `0x${string}`) => {
    const data = await getCompanyInfo(address);
    // {
    //   Name: name,
    //   Address: companyAddress,
    //   ContactMail: mail,
    //   TaxNo: taxNo,
    //   RegNo: regNo,
    //   trustScore: 500,
    //   invoicesIssued: [],
    //   invoicesToPay: [],
    // }
    // Data will come in this way , just display as you need to and pass on the rest to the corresponding components
  };

  const getVCsInfo = async (address: `0x${string}`) => {
    const data = await getVCs(address);
    // array of VCs
    // type CredentialPayload {
    //   '@context': string | string[]
    //   id?: string
    //   type: string | string[]
    //   issuer: IssuerType
    //   issuanceDate: DateType
    //   expirationDate?: DateType
    //   credentialSubject: Extensible<{
    //     id?: string
    //   }>
    //   credentialStatus?: CredentialStatus
    //   evidence?: any
    //   termsOfUse?: any
    // }
    setVCs(data);
  };

  return (
    <div className="w-screen">
      <div className="flex flex-col">
        <div className="mt-5">
          <div className="w-11/12 py-6 flex justify-center bg-white shadow-xl mx-5 rounded-xl">
            <div className="w-full flex justify-evenly">
              <div>
                <p className="text-md font-semibold text-neutral-400">
                  Company Name
                </p>
                <p className="text-2xl text-black font-semibold mt-1">
                  BizTrust
                </p>
              </div>
              <div>
                <p className="text-md font-semibold text-neutral-400">
                  Company Tax No.
                </p>
                <p className="text-2xl text-black font-semibold mt-1">E14536</p>
              </div>
              <div>
                <p className="text-md font-semibold text-neutral-400">
                  Company Registration No.
                </p>
                <p className="text-2xl text-black font-semibold mt-1">
                  Biz3748
                </p>
              </div>
              <div>
                <p className="text-md font-semibold text-neutral-400">
                  Verification Status
                </p>
                <p className="text-2xl text-green-500 font-semibold mt-1">
                  Verified
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="w-11/12 flex">
            <div className="w-2/3 mx-6">
              <div className="bg-white px-10 py-6 rounded-xl shadow-xl">
                <div>
                  <p className="font-semibold text-black text-2xl">
                    Digital IDs
                  </p>
                </div>
                <div className="grid grid-flow-col grid-rows-2 gap-x-10 gap-y-14 mt-10">
                  {VCs &&
                    VCs.map((data) => {
                      return (
                        <div className="w-1/2 px-6 py-2 bg-gradient-to-tl from-blue-200 to-blue-500 rounded-xl shadow-lg hover:scale-105 duration-300">
                          <div className="flex flex-col mt-2">
                            <div>
                              <p className="text-white text-xl font-semibold">
                                Proof of Name
                              </p>
                              <p className="text-white text-md font-semibold mt-1">
                                {data.type}
                              </p>
                            </div>
                            <div className="mt-8">
                              <p className="text-white text-xl font-semibold">
                                Issued
                              </p>
                              <p className="text-white text-md font-semibold mt-1">
                                {data.issuanceDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* <div className="w-1/2 px-6 py-2 bg-gradient-to-tl from-blue-200 to-blue-500 rounded-xl shadow-lg hover:scale-105 duration-300">
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-white text-xl font-semibold">
                          Proof of Name
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          BizTrust
                        </p>
                      </div>
                      <div className="mt-8">
                        <p className="text-white text-xl font-semibold">
                          Issued
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          11-10-2023
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="w-1/2 px-6 py-2 bg-gradient-to-tl from-blue-200 to-blue-500 rounded-xl shadow-lg hover:scale-105 duration-300">
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-white text-xl font-semibold">
                          Proof of Name
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          BizTrust
                        </p>
                      </div>
                      <div className="mt-8">
                        <p className="text-white text-xl font-semibold">
                          Issued
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          11-10-2023
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="w-1/2 px-6 py-2 bg-gradient-to-tl from-blue-200 to-blue-500 rounded-xl shadow-lg hover:scale-105 duration-300">
                    <div className="flex flex-col mt-2">
                      <div>
                        <p className="text-white text-xl font-semibold">
                          Proof of Name
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          BizTrust
                        </p>
                      </div>
                      <div className="mt-8">
                        <p className="text-white text-xl font-semibold">
                          Issued
                        </p>
                        <p className="text-white text-md font-semibold mt-1">
                          11-10-2023
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-1/3 mx-3">
              <div className="flex flex-col">
                <div className="bg-white px-10 py-6 rounded-xl shadow-xl">
                  <div className="flex flex-col">
                    <div className="">
                      <p className="font-semibold text-2xl">Trust Score</p>
                      <p className="mt-2 text-xs text-slate-500">
                        Represents the trust of your company by other companies,
                        increase it by completing payments timely and verifying
                        the company to enjoy more benefits.
                      </p>
                    </div>
                    <div className="mt-7">
                      <p className="font-semibold text-green-500 text-3xl">
                        720
                      </p>
                    </div>
                    <div className="mt-8">
                      <p className="text-xl font-semibold text-slate-700">
                        Benefits
                      </p>
                      <ul className="list-disc mt-4">
                        <li>Paymaster Activated</li>
                        <p className="mt-1 text-xs text-slate-500">
                          All the gas fees in the transactions will be on us.
                        </p>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-10 mb-4">
                  <div className="bg-white px-2 py-6 rounded-xl shadow-xl">
                    <div className="mx-3">
                      <p className="text-xl font-semibold">Contact Details</p>
                    </div>
                    <div className="w-full flex flex-col mt-4 mx-3">
                      <div>
                        <p className="font-semibold text-neutral-400">
                          Company Address
                        </p>
                        <p className="font-semibold text-lg mt-1">
                          B-522, Zurich, Switzerland
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-400 mt-4">
                          Company Mail
                        </p>
                        <p className="font-semibold text-lg mt-1">
                          biztrust.contact@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Overview), { ssr: false });
