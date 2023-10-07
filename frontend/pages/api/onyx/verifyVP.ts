import { createVc, signVc } from "@/components/onyx";
import { SCHEMA_VERIFIED_CUSTOMER, VERIFIED_CUSTOMER } from "@/config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  vc: string;
  vcJwt: string;
};

type Error = {
  message: string;
};

// create VC with Schema , with Sign VC , to return JWT & VC
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const address = "0x898d0DBd5850e086E6C09D2c83A26Bb5F1ff8C33";

  try {
    const vc = await createVc(
      address,
      SCHEMA_VERIFIED_CUSTOMER,
      { name: "Dhruv Agarwal" },
      VERIFIED_CUSTOMER
    );

    if (!vc) {
      return res.status(400).json({ message: "CAN NOT CREATE VC" });
    }

    const vcJwt = await signVc(vc);
    console.log(vcJwt);

    if (!vcJwt) {
      return res.status(400).json({ message: "CAN NOT CREATE SIGNED VC " });
    }

    res.status(200).json({ vc, vcJwt });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}
