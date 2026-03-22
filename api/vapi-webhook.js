/* API Vapi Webhook — Airia
   Serverless function Vercel — POST /api/vapi-webhook
   Reçoit les événements Vapi.ai (fin d'appel, transcription, qualification)
   Doc : https://docs.vapi.ai/webhooks */

export default async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const event = req.body ?? {}

  /* TODO : gérer les types d'événements Vapi
     switch (event.type) {
       case 'call-ended':
         // Enregistrer l'appel, qualifier le lead
         break
       case 'transcript':
         // Traiter la transcription
         break
       case 'function-call':
         // Exécuter une action (créer RDV Calendly, envoyer SMS, etc.)
         break
     } */

  console.log('[vapi-webhook] event reçu:', event.type ?? 'inconnu')

  return res.status(200).json({ received: true })
}
