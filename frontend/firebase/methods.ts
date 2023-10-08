import { doc } from "@firebase/firestore";
import { db } from "./firebaseConfig";

export const addNewCompany = async (address: `0x${string}`) => {
  const docsRef = doc(db, "Users", `${address}`);
};
