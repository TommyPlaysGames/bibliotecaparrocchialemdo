import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zsyjukbcdbdwinaxytwa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWp1a2JjZGJkd2luYXh5dHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDE5MjgsImV4cCI6MjA3NDkxNzkyOH0.P1SFxz98FRCn4TnVRLmG_mmohkglGWQateic6G4vnxk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json({ user: data.user, session: data.session });
}
