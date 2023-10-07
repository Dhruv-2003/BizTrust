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
} from "@jpmorganchase/onyx-ssi-sdk";

import { ethrProvider, ISSUER_ES256K_PRIVATE_KEY } from "@/config";
const didEthr = new EthrDIDMethod(ethrProvider);

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
const createVc = async (HOLDER_ES256K_PUBLIC_KEY: `0x${string}`) => {
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

  const vc = createCredential(
    issuerDidWithKeys.did,
    holderDid,
    subjectData,
    [credentialType],
    additionalParams
  );

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
