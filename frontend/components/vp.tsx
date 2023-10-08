import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getVPs } from "@/firebase/methods";
import { createIssueVC, createVP, verifyVP } from "./onyxMethods";
import {
  CredentialType,
  PresentationCredentials,
  PresentationType,
  SchemaURL,
} from "./onyx";

const VP = (props: any) => {
  const [encryptionKey, setEncryptionKey] = useState<string>();
  const [VPs, setVPs] = useState<any[]>();
  const address = props.address;

  useEffect(() => {
    if (address) {
      getVPsInfo(address);
    }
  }, [address]);

  const getVPsInfo = async (address: `0x${string}`) => {
    const data = await getVPs(address);
    // array of Vps
    // type PresentationPayload {
    //   '@context': string | string[]
    //   type: string | string[]
    //   id?: string
    //   verifiableCredential?: VerifiableCredential[]
    //   holder: string
    //   verifier?: string | string[]
    //   issuanceDate?: string
    //   expirationDate?: string
    // }

    // We also have types to be inferred from the name of the Payload
    setVPs(data);
  };

  const generateEntityVP = () => {
    if (!encryptionKey) {
      console.log("ENCRYPTION KEY NOT PROVIDED");
      return;
    }
    // create VP for PROOF of entity
    createVP(
      address,
      PresentationType.PROOF_OF_ENTITY,
      PresentationCredentials.PROOF_OF_ENTITY,
      encryptionKey
    );
    // Verify the VP
    verifyVP(PresentationType.PROOF_OF_ENTITY, encryptionKey);

    // issue verified VC
    createIssueVC(
      address,
      SchemaURL.SCHEMA_VERIFIED_CUSTOMER,
      {
        name,
      },
      CredentialType.VERIFIED_CUSTOMER,
      encryptionKey
    );
  };

  const generateVerifiedVP = () => {
    // take the Proof OF Verified Customer VC
    // create VP
    // verify VP
    // update Verification Status in Firebase
    //
  };
  return (
    <div>
      <div className="bg-slate-100 h-screen">
        <div className="mt-10">
          <div className="w-5/6 bg-white px-10 py-6 flex flex-col mx-auto rounded-xl">
            <div>
              <p className="text-2xl font-semibold text-black">
                Your Verifiable Proofs
              </p>
            </div>
            <div className="mt-8 flex">
              <div className="w-1/3  flex flex-col justify-center mx-3 shadow-xl rounded-xl px-3 py-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-emerald-500 ">
                    Proof of Registration
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-md font-semibold text-slate-400">
                    Submitted Credentials
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
              </div>
              <div className="w-1/3 flex flex-col justify-center mx-3 shadow-xl rounded-xl px-3 py-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-emerald-500">
                    Proof of Registration
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-md font-semibold text-slate-400">
                    Submitted Credentials
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
              </div>
              <div className="w-1/3 flex flex-col justify-center mx-3 shadow-xl rounded-xl px-3 py-4 text-center">
                <div>
                  <p className="text-lg font-semibold text-emerald-500 ">
                    Proof of Registration
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-md font-semibold text-slate-400">
                    Submitted Credentials
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-black font-semibold">
                    Proof of Registration
                  </p>
                  <p className="text-slate-500 text-sm font-semibold">
                    Status: <span className="text-green-500">Valid</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 bg-white px-10 py-6 flex flex-col mx-auto rounded-xl mt-20">
            <div>
              <p className="text-2xl font-semibold text-black">
                Create Verifiable Proofs
              </p>
            </div>
            <div className="mt-4">
              <button className="w-full text-start px-10 py-4 bg-white hover:scale-105 duration-300 rounded-xl border border-gray-300">
                <div className="flex justify-between">
                  <p className="text-black text-xl font-semibold">
                    Generate Proof of Registration
                  </p>
                  <div>
                    <p className="text-md font-semibold text-slate-600">
                      VC's required
                    </p>
                    <ul className="list-disc mt-1 text-xs">
                      <li>Proof Of Name</li>
                      <li>Proof of Registration</li>
                    </ul>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-4">
              <button className="w-full text-start px-10 py-4 bg-white hover:scale-105 duration-300 rounded-xl border border-gray-300">
                <div className="flex justify-between">
                  <p className="text-black text-xl font-semibold">
                    Generate Proof of Score Credential
                  </p>
                  <div>
                    <p className="text-md font-semibold text-slate-600">
                      VC's required
                    </p>
                    <ul className="list-disc mt-1 text-xs">
                      <li>Proof Of Name</li>
                      <li>Proof of Registration</li>
                    </ul>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VP), { ssr: false });
