# Airia — Agence IA Belgique

## Ce qu'est Airia
Agence qui vend des agents IA à des PME belges.
Solopreneur — seul rôle actif = closing calls.

### 6 produits
1. Voice IA — réceptionniste vocale 24/7 (produit phare)
2. Lead Generation — prospection email/SMS automatisée
3. Pub Meta IA — campagnes Facebook/Instagram auto-optimisées
4. Multilingue — agents FR/NL/EN/DE
5. Dashboard — reporting temps réel multi-clients
6. Intégrations — 50+ outils (n8n, Airtable, HubSpot, Twilio...)

### Cibles
Agences immobilières, cabinets dentaires, avocats, notaires,
comptables, plombiers/artisans, web agencies, PME générale.

### Tarifs
500–1000€/mois récurrent par client. 0€ setup.

### Stratégie de croissance
- Phase 1 : Belgique (en cours)
- Phase 2 : France, Luxembourg, Suisse romande
- Phase 3 : Europe (NL, DE, ES, IT)

---

## Stack technique
- React + Vite
- Three.js (scène 3D particules)
- GSAP (animations scroll)
- CSS custom avec variables (pas de Tailwind)
- Composants fonctionnels, pas de TypeScript
- Vercel (déploiement) + GitHub (NinjaDesBois/Airia-Agency)
- n8n Cloud (automatisation)
- Airtable (CRM — 644 prospects belges)
- Claude API (agents IA)
- Vapi.ai (réceptionniste vocale)
- Hostinger (domaine airia.be + email hello@airia.be)

---

## Structure du projet
```
/src
  /components  → Navbar, Footer, DemoSection, Dashboard
  /sections    → Hero, Problem, HowItWorks, Features, ROI, Pricing, CTA
  /assets      → images, logo
/api           → serverless functions Vercel (chat.js, demo.js, vapi-webhook.js, stripe-webhook.js)
/public        → sitemap.xml, robots.txt
```

## Variables d'environnement
```
ANTHROPIC_API_KEY=        # Claude API (server side)
VITE_VAPI_API_KEY=        # Vapi.ai (client side)
STRIPE_SECRET_KEY=        # Stripe paiements
MOLLIE_API_KEY=           # Mollie paiements (Belgique)
VITE_CALENDLY_URL=        # Lien Calendly booking
```

---

## Couleurs
```css
--cyan: #00F5FF       /* accent principal */
--black: #050508
--white: #F0F4FF
--accent2: #00C4CC
```

## Conventions
- Commentaires en français
- Noms de variables métier en français
- Noms de composants PascalCase anglais
- Ne jamais modifier /dist ni vite.config.js
- Toujours push sur branche main
- Créer une PR si modification majeure

---

## Fonctionnalités implementées
- ✅ Hero slot machine animé (6 secteurs, cyan #00e5cc)
- ✅ Chat IA flottant (proxy /api/chat.js, rate limiting)
- ✅ Calculateur ROI par secteur (plafonné à 1000%)
- ✅ Multilingue FR/NL/EN (localStorage)
- ✅ SEO (react-helmet-async, JSON-LD, sitemap)
- ✅ Modal "Réserver un appel" (WhatsApp + Calendly)
- ✅ DemoSection (8 secteurs, chat par secteur)
- ✅ Dashboard placeholder
- ✅ Responsive mobile

## Fonctionnalités à compléter
- ⏳ Demo chat → connecter /api/demo.js (manque crédits Anthropic)
- ⏳ Demo voix → connecter Vapi.ai (pas encore configuré)
- ⏳ Stripe/Mollie → paiements récurrents
- ⏳ Calendly URL → à brancher

---

## UI/UX Skill
UI/UX Pro Max installé dans .claude/skills/
Pour tout nouveau composant, utiliser le skill automatiquement.
Stack préférée : React. Style : Dark Mode + 3D & Hyperrealism + Motion-Driven.