import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "./firebaseConfig";

export const addNewCompany = async (
  address: `0x${string}`,
  name: string,
  companyAddress: string,
  mail: string,
  taxNo: string,
  regNo: string
) => {
  const docsRef = doc(db, "Companies", `${address}`);
  await setDoc(docsRef, {
    Name: name,
    Address: companyAddress,
    ContactMail: mail,
    TaxNo: taxNo,
    RegNo: regNo,
    trustScore: 500,
    invoicesIssued: [],
    invoicesToPay: [],
  });
};

export const addVC = async (
  address: `0x${string}`,
  credentialType: string,
  vcObject: {}
) => {
  const docsRef = doc(
    db,
    "Companies",
    `${address}`,
    "IssuedVCs",
    `${credentialType}`
  );
  await setDoc(docsRef, vcObject);
};

export const getVCs = async (address: `0x${string}`): Promise<{}[]> => {
  let VCs: {}[] = [];
  const colRef = collection(db, "Companies", `${address}`, "IssuedVCs");
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    VCs.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  return VCs;
};

export const addVP = async (
  address: `0x${string}`,
  presentationType: string,
  vpObject: {}
) => {
  const docsRef = doc(
    db,
    "Companies",
    `${address}`,
    "IssuedVPs",
    `${presentationType}`
  );
  await setDoc(docsRef, vpObject);
};

export const getVPs = async (address: `0x${string}`): Promise<{}[]> => {
  let VPs: {}[] = [];
  const colRef = collection(db, "Companies", `${address}`, "IssuedVPs");
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    VPs.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  return VPs;
};

interface txObjectType {
  to: `0x${string}`;
  timestamp: string;
  SuccesStatus: boolean;
  FeesPaid: string;
  Amount: number;
}

export const addTransaction = async (
  address: `0x${string}`,
  txId: string,
  txObject: txObjectType
) => {
  const docsRef = doc(db, "Companies", `${address}`, "transactions", `${txId}`);
  await setDoc(docsRef, txObject);
};

export const getTxs = async (address: `0x${string}`): Promise<{}[]> => {
  let txs: {}[] = [];
  const colRef = collection(db, "Companies", `${address}`, "transactions");
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    txs.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  return txs;
};

interface invoiceObjectType {
  from: `0x${string}`;
  to: `0x${string}`;
  timestamp: string;
  SuccesStatus: boolean;
  Amount: number;
  Message: string; // purpose
}

export const addInvoicesIssued = async (
  address: `0x${string}`,
  invoiceObject: invoiceObjectType
) => {
  const data = await getCompanyInfo(address);
  const docsRef = doc(db, "Companies", `${address}`);
  await updateDoc(docsRef, {
    invoicesIssued: [...data?.invoicesIssued, invoiceObject],
  });
};

export const addInvoicesToPay = async (
  address: `0x${string}`,
  invoiceObject: invoiceObjectType
) => {
  const data = await getCompanyInfo(address);
  const docsRef = doc(db, "Companies", `${address}`);
  await updateDoc(docsRef, {
    invoicesToPay: [...data?.invoicesToPay, invoiceObject],
  });
};

export const getCompanyInfo = async (address: `0x${string}`) => {
  const docsRef = doc(db, "Companies", `${address}`);
  const docSnap = await getDoc(docsRef);
  const data = docSnap.data();
  return data;
};
