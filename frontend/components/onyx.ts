import {
  DIDWithKeys,
  EthrDIDMethod,
  createCredential,
  createAndSignCredentialJWT,
  createPresentation,
  createAndSignPresentationJWT,
  JWTService,
  getSubjectFromVP,
  getCredentialsFromVP,
  getSupportedResolvers,
  verifyPresentationJWT,
  verifyDIDs,
  verifySchema,
  createCredentialFromSchema,
  verifyCredentialJWT,
  verifyRevocationStatus,
  SchemaManager,
} from "@jpmorganchase/onyx-ssi-sdk";
// import { camelCase, includes } from "lodash";

import {
  ethrProvider,
  ISSUER_ES256K_PRIVATE_KEY,
  HOLDER_ES256K_PRIVATE_KEY,
  JwtPayload,
} from "@/config";
const didEthr = new EthrDIDMethod(ethrProvider);
const jwtService = new JWTService();

// Create a New DID:ethr
const createDidEthr = async () => {
  const issuerEthrDid: DIDWithKeys = await didEthr.create();

  console.log("Creating a key pair");
  console.log("==========================");
  console.log("key pair generated");
  console.log(`Algorithm: ${issuerEthrDid.keyPair.algorithm}`);
  console.log(
    `Private Key: ${Buffer.from(issuerEthrDid.keyPair.privateKey).toString(
      "hex"
    )}`
  );
  console.log(
    `Public Key: ${Buffer.from(issuerEthrDid.keyPair.publicKey).toString(
      "hex"
    )}`
  );
  console.log("==========================");
  console.log(`Generating did:key`);
  console.log(`Issuer did: ${issuerEthrDid.did}`);
};

// Issuer Create a VC , returns VC
const createVc = async (
  HOLDER_ES256K_PUBLIC_KEY: `0x${string}`,
  SCHEMA_FILE: string,
  subjectData: any,
  credentialType: string
) => {
  if (!ISSUER_ES256K_PRIVATE_KEY) {
    console.log("ISSUER PRIVATE KEY NOT SET");
    return;
  }

  const issuerDidWithKeys = await didEthr.generateFromPrivateKey(
    ISSUER_ES256K_PRIVATE_KEY
  );

  //   const holderDidWithKeys = await didEthr.generateFromPrivateKey(
  //     HOLDER_ES256K_PRIVATE_KEY
  //   );

  const holderDid = `did:ethr:${ethrProvider.name}:${HOLDER_ES256K_PUBLIC_KEY}`;

  const vcDidwithKey = await didEthr.create();
  console.log("\n!!!!!! IMPORTANT: SAVE THIS PRIVATE KEY !!!!!!!\n");
  console.log(
    `\nVC_ES256K_PRIVATE_KEY: ${Buffer.from(
      vcDidwithKey.keyPair.privateKey
    ).toString("hex")}\n`
  );

  console.log("\nVC did private key\n");
  console.log(vcDidwithKey.keyPair.privateKey);

  const vcDidKey = vcDidwithKey.did;

  // const credentialType = "PROOF_OF_NAME";

  // define the Subject Data
  // const subjectData = {
  //   name: "Jessie Doe",
  // };

  // define the schema files first
  const schema = await SchemaManager.getSchemaFromFile(SCHEMA_FILE);

  const validation: any = await SchemaManager.validateCredentialSubject(
    subjectData,
    schema
  );

  // NOTE : In Case the Schema is online
  // const schema = await SchemaManager.getSchemaRemote(SCHEMA_URL);

  // const validation: any = await SchemaManager.validateCredentialSubject(
  //   subjectData,
  //   schema
  // );

  if (!validation) {
    console.log("Schema validation failed");
    return;
  }

  //vc id, expirationDate, credentialStatus, credentialSchema, etc
  const additionalParams = {
    id: vcDidKey,
  };

  console.log(`\nGenerating Verifiable Credential of type ${credentialType}\n`);

  const vc = createCredential(
    issuerDidWithKeys.did,
    holderDid,
    subjectData,
    [credentialType],
    additionalParams
  );

  // const vc = await createCredentialFromSchema(
  //   VC_SCHEMA_URL,
  //   issuerDidWithKeys.did,
  //   holderDid,
  //   subjectData,
  //   credentialType,
  //   additionalParams
  // );

  console.log(JSON.stringify(vc, null, 2));

  // store the vc Credential
  // store the VC DID keys

  //   writeToFile(
  //     path.resolve(VC_DIR_PATH, `${camelCase(credentialType)}.json`),
  //     JSON.stringify(vc, null, 2)
  //   );
};

// Issuer Sign a VC , returns JWT
const signVc = async (vc: any) => {
  if (!ISSUER_ES256K_PRIVATE_KEY) {
    console.log("ISSUER PRIVATE KEY NOT SET");
    return;
  }

  const issuerDidWithKeys = await didEthr.generateFromPrivateKey(
    ISSUER_ES256K_PRIVATE_KEY
  );
  const jwtService = new JWTService();

  return jwtService.signVC(issuerDidWithKeys, vc);

  // save the JWT somewhere
};

// Issuer , create and sign both VC, but returns only a JWT
const createAndSignVc = async (HOLDER_ES256K_PUBLIC_KEY: `0x${string}`) => {
  if (!ISSUER_ES256K_PRIVATE_KEY) {
    console.log("ISSUER PRIVATE KEY NOT SET");
    return;
  }
  const issuerDidWithKeys = await didEthr.generateFromPrivateKey(
    ISSUER_ES256K_PRIVATE_KEY
  );

  //   const holderDidWithKeys = await didEthr.generateFromPrivateKey(
  //     HOLDER_ES256K_PRIVATE_KEY
  //   );

  const holderDid = `did:ethr:${ethrProvider.name}:${HOLDER_ES256K_PUBLIC_KEY}`;

  const vcDidwithKey = await didEthr.create();
  console.log("\n!!!!!! IMPORTANT: SAVE THIS PRIVATE KEY !!!!!!!\n");
  console.log(
    `\nVC_ES256K_PRIVATE_KEY: ${Buffer.from(
      vcDidwithKey.keyPair.privateKey
    ).toString("hex")}\n`
  );

  console.log("\nVC did private key\n");
  console.log(vcDidwithKey.keyPair.privateKey);

  const vcDidKey = vcDidwithKey.did;

  const credentialType = "PROOF_OF_NAME";

  const subjectData = {
    name: "Jessie Doe",
  };

  //vc id, expirationDate, credentialStatus, credentialSchema, etc
  const additionalParams = {
    id: vcDidKey,
  };

  console.log(`\nGenerating Verifiable Credential of type ${credentialType}\n`);

  const vc = createAndSignCredentialJWT(
    issuerDidWithKeys,
    holderDid,
    subjectData,
    [credentialType],
    additionalParams
  );

  console.log(JSON.stringify(vc, null, 2));
};

// Holder , need to supply the name of VCs, SignedVC JWTs for which the presentation has to be created
// VPs can be created for single or multiple files
const createVp = (VC: any[], signedVcJwts: string[]) => {
  if (VC) {
    try {
      console.log("\nReading an existing signed VCs JWT\n");
      //   const signedVcJwt = fs.readFileSync(
      //     path.resolve(VC_DIR_PATH, `${camelCase(VC)}.jwt`),
      //     "utf8"
      //   );
      console.log(signedVcJwts);

      console.log("\nGeting User from VC\n");
      const holderDid = getSubjectFromVP(signedVcJwts[0]);
      console.log(holderDid);

      console.log("\nGenerating a VP\n");
      const vp = createPresentation(holderDid!, signedVcJwts);
      console.log(vp);

      // NOTE: VPs need to be stored

      //   writeToFile(path.resolve(VP_DIR_PATH, `${VC}.json`), JSON.stringify(vp));
    } catch (err) {
      console.log("\nFailed to fetch file\n");
      console.log(
        "\nTo run this script you must have a valid VC and a valid signed VC JWT\n"
      );
      console.log(
        "\nPlease refer to issuer scripts to generate and sign a VC\n"
      );
    }
  } else {
    console.log("\nVC not found!\n");
    console.log(
      "\nTo run this script you must have a valid VC and a valid signed VC JWT\n"
    );
    console.log("\nPlease refer to issuer scripts to generate and sign a VC\n");
  }
};

// Holder , need the Holder's DID with Keys , (need to use private Key)
const signVP = (holderDidWithKeys: DIDWithKeys, token: any) => {
  const jwtService = new JWTService();
  return jwtService.signVP(holderDidWithKeys, token);
};

// Holder
// need to find a way to get Holder's DID with Keys
const createAndSignVp = async (VC: any[], signedVcJwts: string[]) => {
  if (VC) {
    try {
      console.log("\nReading existing signed VCs JWT\n");
      //   const signedVcJwt = fs.readFileSync(
      //     path.resolve(VC_DIR_PATH, `${camelCase(VC)}.jwt`),
      //     "utf8"
      //   );
      console.log(signedVcJwts);

      console.log("\nGeting User from VC\n");
      const holderDid = getSubjectFromVP(signedVcJwts[0]);
      console.log(holderDid);

      if (holderDid?.includes("ethr")) {
        console.log("VC did method: did:ethr");
        if (!HOLDER_ES256K_PRIVATE_KEY) {
          console.log("HOLDER PRIVATE KEY NOT SET");
          return;
        }

        const didWithKeys = await didEthr.generateFromPrivateKey(
          HOLDER_ES256K_PRIVATE_KEY
        );

        if (didWithKeys.did === holderDid) {
          console.log("\nCreating and signing the VP from VC\n");
          const signedVp = await createAndSignPresentationJWT(
            didWithKeys,
            signedVcJwts
          );
          console.log(signedVp);

          //   writeToFile(
          //     path.resolve(VP_DIR_PATH, `${VC}.jwt`),
          //     JSON.stringify(signedVp)
          //   );
        } else {
          console.log(
            "HOLDER_ES256K_PRIVATE_KEY cannot sign for this verifiable credentail\n"
          );
        }
      }
    } catch (err) {
      console.log("\nFailed to fetch file\n");
      console.log(
        "\nTo run this script you must have a valid VC and a valid signed VC JWT\n"
      );
      console.log(
        "\nPlease refer to issuer scripts to generate and sign a VC\n"
      );
    }
  } else {
    console.log("\nVC not found!\n");
    console.log(
      "\nTo run this script you must have a valid VC and a valid signed VC JWT\n"
    );
    console.log("\nPlease refer to issuer scripts to generate and sign a VC\n");
  }
};

// verify
const verify = async (VP: any, signedVpJwt: string) => {
  // Instantiating the didResolver
  const didResolver = getSupportedResolvers([didEthr]);

  if (VP) {
    try {
      console.log("\nReading an existing signed VP JWT\n");
      // const signedVpJwt = fs.readFileSync(
      //   path.resolve(VP_DIR_PATH, `${camelCase(VP)}.jwt`),
      //   "utf8"
      // );
      console.log(signedVpJwt);

      console.log("\nVerifying VP JWT\n");
      // Inovking the verification fuction from the sdk
      // To know more about verification and api reference please refer to readme in src > verifier > readme.md in the sdk
      const isVpJwtValid = await verifyPresentationJWT(
        signedVpJwt,
        didResolver
      );

      if (isVpJwtValid) {
        console.log("\nVP JWT is Valid\n");

        console.log("\nGetting VC JWT from VP\n");

        const vcJwts = getCredentialsFromVP(signedVpJwt);
        vcJwts.forEach(async (vcJwt) => {
          try {
            console.log("\nVerifying VC\n");
            const verificationCredentialPolicies = {
              issuanceDate: true,
              expirationDate: true,
              format: true,
            };

            //Verify Credential JWT
            const isVcJwtValid = await verifyCredentialJWT(
              vcJwt,
              didResolver,
              verificationCredentialPolicies
            );
            if (isVcJwtValid) {
              console.log("\nVC JWT is Valid\n");

              console.log("\nDecoding VC\n");

              const vc = jwtService.decodeJWT(vcJwt)?.payload as JwtPayload;
              console.log(vc);

              try {
                const vcVerified = await verifyDIDs(vcJwt, didResolver);
                console.log(`\nVerification status: ${vcVerified}\n`);
                if (vcVerified) {
                  console.log("\nVerifying subject data with schema\n");
                  // the 2nd param has to be true in case the location if local
                  const isSubjectDataValid = verifySchema(vcJwt, false);
                  console.log(
                    `\nSubject data schema verification status: ${isSubjectDataValid}\n`
                  );

                  console.log("\nVerifying revocation status\n");
                  const revocationStatus = verifyRevocationStatus(
                    vcJwt,
                    didResolver
                  );
                  console.log(`\nRevocation status: ${revocationStatus}\n`);
                } else {
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              console.log("Invalid VC JWT");
            }
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        console.log("Invalid VP JWT");
      }
    } catch (err) {
      console.log("\nFailed to fetch file\n");
      console.log(
        "\nTo run this script you must have a valid VP and a valid signed VP JWT\n"
      );
      console.log(
        "\nPlease refer to issuer scripts to generate and sign a VP\n"
      );
    }
  } else {
    console.log("\nVP not found!\n");
    console.log(
      "\nTo run this script you must have a valid VP and a valid signed VP JWT\n"
    );
    console.log("\nPlease refer to issuer scripts to generate and sign a VP\n");
  }
};
