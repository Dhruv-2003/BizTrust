import { createVc } from "@/components/onyx";
import { SCHEMA_VERIFIED_CUSTOMER, VERIFIED_CUSTOMER } from "@/config";

// createVc(
//     address,
//     SCHEMA_VERIFIED_CUSTOMER,
//     { name: "Dhruv Agarwal" },
//     VERIFIED_CUSTOMER
//   )

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = "0x898d0DBd5850e086E6C09D2c83A26Bb5F1ff8C33";

  await createVc(
    address,
    SCHEMA_VERIFIED_CUSTOMER,
    { name: "Dhruv Agarwal" },
    VERIFIED_CUSTOMER
  );

  res.status(200).json({ name: "John Doe" });
}
