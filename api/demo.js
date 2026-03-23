/* API Démo — Airia
   Serverless function Vercel — POST /api/demo
   Connecte le chat démo à Claude avec des prompts par secteur */

import Anthropic from '@anthropic-ai/sdk'

/* === Prompts système par secteur === */
const PROMPTS_SECTEURS = {
  immobilier:
    "Tu es la réceptionniste IA d'une agence immobilière belge. Tu qualifies les prospects achat/vente/location, prends les RDV. Objectif: qualifier et booker un RDV.",
  dentaire:
    "Tu es la réceptionniste IA d'un cabinet dentaire belge. Tu gères RDV, urgences, rappels. Tu demandes: nom, type de soin, urgence, disponibilités.",
  avocat:
    "Tu es la secrétaire IA d'un cabinet d'avocats belge. Tu qualifies la demande (civil/pénal/commercial), évalues l'urgence, proposes un RDV.",
  notaire:
    "Tu es l'assistante IA d'une étude notariale belge. Tu gères les demandes (acte immobilier, succession, mariage), qualifies et planifies.",
  plombier:
    "Tu es la réceptionniste IA d'un plombier belge. Tu qualifies les urgences, évalues la gravité, prends les coordonnées et planifies l'intervention.",
  electricien:
    "Tu es la réceptionniste IA d'un électricien belge. Tu qualifies les pannes/installations, évalues l'urgence, planifies l'intervention.",
  comptable:
    "Tu es l'assistante IA d'un cabinet comptable belge. Tu qualifies les besoins (TVA, bilan, création société), planifies une consultation.",
  'web-agency':
    "Tu es la réceptionniste IA d'une web agency belge. Tu qualifies les projets (site, app, SEO), évalues budget et timing, planifies un appel découverte.",
}

/* === Rate limiting en mémoire (par IP) === */
const FENETRE_MS = 60_000  // 1 minute
const MAX_REQUETES = 20

const compteurRequetes = new Map()

function estLimité(ip) {
  const maintenant = Date.now()
  const entrée = compteurRequetes.get(ip) ?? { compte: 0, debut: maintenant }

  // Réinitialiser si la fenêtre est expirée
  if (maintenant - entrée.debut > FENETRE_MS) {
    compteurRequetes.set(ip, { compte: 1, debut: maintenant })
    return false
  }

  if (entrée.compte >= MAX_REQUETES) return true

  compteurRequetes.set(ip, { compte: entrée.compte + 1, debut: entrée.debut })
  return false
}

/* === Handler principal === */
export default async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-airia-token')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  /* Vérification du token */
  const token = req.headers['x-airia-token']
  if (token !== 'airia2024') {
    return res.status(401).json({ error: 'Token invalide' })
  }

  /* Rate limiting */
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.socket?.remoteAddress ?? 'unknown'
  if (estLimité(ip)) {
    return res.status(429).json({ error: 'Trop de requêtes — réessayez dans une minute' })
  }

  /* Validation du body */
  const { secteur, messages } = req.body ?? {}

  if (!secteur || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'secteur et messages sont requis' })
  }

  const promptSystème = PROMPTS_SECTEURS[secteur]
  if (!promptSystème) {
    return res.status(400).json({ error: `Secteur inconnu : ${secteur}` })
  }

  /* Appel Anthropic */
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY non configurée' })
  }

  try {
    const client = new Anthropic({ apiKey })

    /* Conversion format messages (role: user/assistant, contenu → content) */
    const messagesFormatés = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.contenu ?? m.content ?? '' }))

    const réponse = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: promptSystème,
      messages: messagesFormatés,
    })

    const texte = réponse.content?.[0]?.text ?? "Je n'ai pas pu générer une réponse."
    return res.status(200).json({ content: texte })
  } catch (erreur) {
    console.error('[api/demo] Erreur Anthropic:', erreur)
    return res.status(500).json({ error: 'Erreur lors de la génération de la réponse' })
  }
}
