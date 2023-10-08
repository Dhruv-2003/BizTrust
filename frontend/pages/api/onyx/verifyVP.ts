import { createVc, signVc, verifyVPJwt } from "@/components/onyx";
import { SCHEMA_VERIFIED_CUSTOMER, VERIFIED_CUSTOMER } from "@/config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isVerified: boolean;
};

type Error = {
  message: string;
};

// create VC with Schema , with Sign VC , to return JWT & VC
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "GET") {
    const VPname = req.body.VPname;
    const vpJWT = req.body.vpJWT;

    try {
      const result = await verifyVPJwt(VPname, vpJWT);
      if (!result) {
        return res.status(400).json({ message: "NO Result returned" });
      }

      res.status(200).json({ isVerified: result });
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
