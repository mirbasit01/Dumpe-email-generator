// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = { success: boolean; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });
  const { html, to } = req.body;
  if (!html || !to) return res.status(400).json({ success: false, error: "Missing html or to" });

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Test Email from Email Generator",
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Send error:", err);
    return res.status(500).json({ success: false, error: String(err?.message || err) });
  }
}
