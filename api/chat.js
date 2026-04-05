import Anthropic from "@anthropic-ai/sdk";

export default async function handler(req, res) {
  console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY);

  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: "Tu es l'assistant IA d'Airia, une agence spécialisée dans les réceptionnistes IA vocales pour agences immobilières belges. Prix : 500-1000€/mois. Réponds en FR/NL/EN selon la langue du visiteur. Objectif : qualifier le lead et l'inviter à réserver un appel via Calendly.",
      messages,
    });

    res.status(200).json({ content: response.content[0].text });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
