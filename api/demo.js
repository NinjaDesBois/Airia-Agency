/* API Démo — Airia
   Serverless function Vercel — POST /api/demo
   TODO : connecter au bon assistant IA selon le secteur */

export default async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-airia-token')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { secteur, messages } = req.body ?? {}

  if (!secteur || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'secteur et messages sont requis' })
  }

  /* TODO : implémenter la logique par secteur
     - Charger le prompt système correspondant au secteur
     - Appeler l'API Anthropic avec le bon contexte
     - Retourner la réponse */

  return res.status(200).json({
    content: `[Démo ${secteur}] Réponse IA à connecter — ANTHROPIC_API_KEY requis.`,
  })
}
