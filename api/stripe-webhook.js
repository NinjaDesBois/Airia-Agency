/* API Stripe / Mollie Webhook — Airia
   Serverless function Vercel — POST /api/stripe-webhook
   Gère les événements de paiement (abonnement créé, renouvelé, annulé)
   Supporte Stripe et Mollie selon la configuration */

export default async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, stripe-signature')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  /* TODO : vérifier la signature Stripe
     const sig = req.headers['stripe-signature']
     const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET) */

  /* TODO : vérifier la signature Mollie
     const mollieWebhookId = req.body?.id
     const payment = await mollieClient.payments.get(mollieWebhookId) */

  const event = req.body ?? {}

  /* TODO : gérer les événements de paiement
     switch (event.type) {
       case 'customer.subscription.created':
         // Activer le compte client, envoyer email de bienvenue
         break
       case 'customer.subscription.deleted':
         // Désactiver le compte, arrêter les agents IA
         break
       case 'invoice.payment_failed':
         // Notifier le client, suspendre temporairement
         break
     } */

  console.log('[stripe-webhook] event reçu:', event.type ?? 'inconnu')

  return res.status(200).json({ received: true })
}
