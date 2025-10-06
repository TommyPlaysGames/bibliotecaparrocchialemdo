import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zsyjukbcdbdwinaxytwa.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzeWp1a2JjZGJkd2luYXh5dHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDE5MjgsImV4cCI6MjA3NDkxNzkyOH0.P1SFxz98FRCn4TnVRLmG_mmohkglGWQateic6G4vnxk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Metodo non consentito" });

  const { titolo, autore, casa_editrice, genere } = req.body;

  if (!titolo || !autore || !casa_editrice || !genere) {
    return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
  }

  const { data, error } = await supabase
    .from('libri')
    .insert([{ titolo, autore, casa_editrice, genere }]);

  if (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Libro aggiunto!", data });
}