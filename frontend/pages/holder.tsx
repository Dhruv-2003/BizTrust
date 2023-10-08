import {
  CredentialType,
  PresentationCredentials,
  PresentationType,
  SchemaURL,
  createVp,
  signVp,
} from "@/components/onyx";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import cryptoJS from "crypto-js";

export default function holder() {
  const address = "0x898d0DBd5850e086E6C09D2c83A26Bb5F1ff8C33";
  const subjectData = {
    name: "Dhruv Agarwal",
  };
  const encryptionKey = `1234`; // taken from the user

  // createIssueVC(
  //   address,
  //   SchemaURL.SCHEMA_PROOF_OF_NAME,
  //   subjectData,
  //   CredentialType.PROOF_OF_NAME
  // );

  const createIssueVC = async (
    address: `0x${string}`,
    schemaURL: string,
    subjectData: {},
    credentialType: string
  ) => {
    fetch("/api/onyx/issueVC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, schemaURL, subjectData, credentialType }),
    })
      .then(async (response) => {
        const data = await response.json();
        // get the returned
        if (data) {
          console.log(data);
          // storing the vcJWT
          // VC can be decoded by jwtService
          // Stored in credentialName => encryptedJwt
          // const encryptedJWT = cryptoJS.AES.encrypt(
          //   data.vcJwt,
          //   encryptionKey
          // ).toString();
          // console.log(encryptedJWT);
          secureLocalStorage.setItem(credentialType, data.vcJwt);
        }
      })
      .catch((error) => {});
  };

  const createVP = async (presentatinType: string, VCs: string[]) => {
    // take in the required VCTypes
    // fetch from local storage and decrypt with users private key
    let vcJWTs: string[] = [];
    console.log(presentatinType, VCs);

    await VCs.forEach((VC) => {
      console.log(VC);
      const encryptedJWT = secureLocalStorage.getItem(VC) as string;
      if (!encryptedJWT) {
        console.log("JWT NOT FOUND");
        return;
      }
      console.log(encryptedJWT);
      // const jwt = cryptoJS.AES.decrypt(encryptedJWT, encryptionKey);
      // console.log(jwt);
      vcJWTs.push(encryptedJWT);
    });

    // then createVP for these VCs
    const vp = await createVp(VCs, vcJWTs);

    //prepare Holder's DID
    //pass to sign JWT
    const vpJwt = await signVp(null, vp);
    console.log(vpJwt);
    //store the JWT and provide for Verify
  };

  return (
    <div>
      <button
        onClick={() => {
          createIssueVC(
            address,
            SchemaURL.SCHEMA_VERIFIED_CUSTOMER,
            subjectData,
            CredentialType.VERIFIED_CUSTOMER
          );
        }}
      >
        Create VC
      </button>
      <button
        onClick={() => {
          createVP(
            PresentationType.PROOF_OF_VERIFIED_CUSTOMER,
            PresentationCredentials.PROOF_OF_VERIFIED_CUSTOMER
          );
        }}
      >
        Create VP
      </button>
    </div>
  );
}
