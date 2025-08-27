import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { aliasId, from, subject, body } = req.body;

    try {
      const message = await prisma.message.create({
        data: {
          aliasId,
          from,
          subject,
          body,
        },
      });

      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({ error: "Invalid alias or data" });
    }
  }

  if (req.method === "GET") {
    const messages = await prisma.message.findMany({
      include: { alias: true },
    });

    return res.status(200).json(messages);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
 