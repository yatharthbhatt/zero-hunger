import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase URL and public API key
const supabaseUrl = "https://gkataquhfhjkxzclfnjj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrYXRhcXVoZmhqa3h6Y2xmbmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMzAzMDMsImV4cCI6MjA0MTcwNjMwM30.l8LdxM1a-VpQ8ZPogcHzwPkPlGaytCxm04O83LBiWqU";

export const supabase = createClient(supabaseUrl, supabaseKey);
