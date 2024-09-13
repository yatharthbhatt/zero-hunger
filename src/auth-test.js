const { createClient } = require("@supabase/supabase-js");
const { useState } = require("react");
const supabaseUrl = "https://gkataquhfhjkxzclfnjj.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYXRhcXVoZmhqa3h6Y2xmbmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMzAzMDMsImV4cCI6MjA0MTcwNjMwM30.l8LdxM1a-VpQ8ZPogcHzwPkPlGaytCxm04O83LBiWqU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const email = "itzsajal69@gmail.com";
const password = "12345678";
const handleLogin = async () => {
  setLoading(true);
  setError("");

  try {
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      }
    );

    console.log("SignIn Data:", data);
    console.log("SignIn Error:", signInError);

    if (signInError) throw signInError;

    if (data) {
      const { data: userData, error: fetchError } = await supabase
        .from("donors")
        .select("*")
        .eq("email", email)
        .single();

      console.log("User Data:", userData);
      console.log("Fetch Error:", fetchError);

      if (fetchError) throw fetchError;

      if (userData) {
        alert("Login successful");
        // e.g., router.push('/home');
      } else {
        alert("User not found. Please register.");
      }
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

handleLogin();
