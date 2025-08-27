import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { address } = req.body;

    try {
      const alias = await prisma.alias.create({
        data: { address },
      });

      return res.status(201).json(alias);
    } catch (error) {
      return res.status(400).json({ error: "Alias already exists or invalid data" });
    }
  }

  if (req.method === "GET") {
    const aliases = await prisma.alias.findMany({
      include: { messages: true }, // also return related messages
    });

    return res.status(200).json(aliases);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
