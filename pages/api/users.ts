// pages/api/users.ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: { name, email },
    });

    return res.status(201).json(user);
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
}
