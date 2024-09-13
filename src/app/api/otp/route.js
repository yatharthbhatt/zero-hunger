import { supabase } from "../../utils/supabaseClient"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

// Create a Nodemailer transporter using your email service (e.g., Gmail, SMTP, etc.)
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service (e.g., Gmail, SMTP, Mailgun)
  auth: {
    user: "sharmasajal069@gmail.com", // Your email address
    pass: "work25x7", // Your email password
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, action } = req.body;

    // Generate OTP and store it temporarily
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpId = uuidv4();

    // Store OTP in Supabase
    const { data, error } = await supabase.from("otp").upsert({
      otp_id: otpId,
      email,
      otp,
      action,
      expires_at: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
    });

    if (error) {
      return res.status(500).json({ error: "Failed to store OTP" });
    }

    // Send OTP email using Nodemailer
    try {
      await transporter.sendMail({
        to: email,
        from: "sharmasajal069@gmail.com", // Your email address
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
      });
      res.status(200).json({ message: "OTP sent successfully", otpId });
    } catch (sendError) {
      console.error(sendError);
      res.status(500).json({ error: "Failed to send OTP email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
