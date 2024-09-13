import { supabase } from "../../../lib/supabase"; // Adjust import path as needed

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, otpId, otp } = req.body;

    if (!email || !otpId || !otp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch the OTP from Supabase
    const { data: otpData, error } = await supabase
      .from("otp")
      .select("*")
      .eq("otp_id", otpId)
      .eq("email", email)
      .single();

    if (error || !otpData) {
      return res.status(404).json({ error: "OTP not found" });
    }

    // Check if the OTP matches and is not expired
    const isValidOtp = otpData.otp === parseInt(otp, 10);
    const isExpired = new Date() > new Date(otpData.expires_at);

    if (!isValidOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (isExpired) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    // OTP is valid
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
