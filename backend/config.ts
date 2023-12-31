import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const getParam = (name: string) => {
  const param = process.env[name];
  if (!param) {
    console.error(`\nConfig param '${name}' missing\n`);
    return null;
  }
  return param;
};

export const ISSUER_ES256K_PRIVATE_KEY = getParam("ISSUER_ES256K_PRIVATE_KEY");

export const HOLDER_ES256K_PRIVATE_KEY = getParam("HOLDER_ES256K_PRIVATE_KEY");

export const NETWORK_RPC_URL = getParam("NETWORK_RPC_URL");
export const CHAIN_ID = parseInt(getParam("CHAIN_ID")!);
export const NETWORK_NAME = getParam("NETWORK_NAME");
export const REGISTRY_CONTRACT_ADDRESS = getParam("REGISTRY_CONTRACT_ADDRESS");

export const PROOF_OF_REGISTERATION = "proofOfRegisteration";
export const PROOF_OF_TAX = "proofOfTax";
export const VERIFIED_CUSTOMER = "verifiedCustomer";
export const TRUST_SCORE_CREDENTIAL = "trustScoreCredential";

export const SCHEMA_PROOF_OF_REGISTERATION =
  "https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/schemas/proofOfRegisteration.json";
export const SCHEMA_PROOF_OF_TAX =
  "https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/schemas/proofOfTax.json";
export const SCHEMA_VERIFIED_CUSTOMER =
  "https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/schemas/verifiedCustomer.json";
export const SCHEMA_TRUST_SCORE_CREDENTIAL =
  "https://github.com/Dhruv-2003/BizTrust/blob/main/frontend/schemas/trustScoreCredential.json";

export const provider = new ethers.providers.JsonRpcProvider(NETWORK_RPC_URL!);
export const ethrProvider = {
  name: NETWORK_NAME!,
  chainId: CHAIN_ID,
  rpcUrl: NETWORK_RPC_URL!,
  registry: REGISTRY_CONTRACT_ADDRESS!,
  gasSource: "",
};

export interface JwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}
