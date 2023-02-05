import { sendEmail } from "@/lib/novu";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // we are only handling post requests.
  if (req.method === "POST") {
    try {
      const { email, name, species } = JSON.parse(req.body);

      if (!email || !name || !species) {
        // return bad request status.
        res.status(400).end();
        return;
      }

      await sendEmail(email, { name, species });

      res.status(200).end();
    } catch (error) {
      // Just response internal server error;
      res.status(500).end();
    }
  }
};

export default handler;
