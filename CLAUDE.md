# Airia — Agence IA Belgique

## Ce qu'est Airia
Agence qui vend des agents IA à des PME et agences immobilières belges.
3 verticales :
1. Voice IA — réceptionniste vocale (répond, qualifie, planifie les RDV)
2. Lead generation & acquisition — prospection automatisée (email, SMS, n8n)
3. Pub Meta par IA — campagnes Facebook/Instagram gérées automatiquement

Tarifs : 500–1000€/mois récurrent par client.
Objectif : 99% automatisé — seul rôle actif = closing calls.

## Ce projet
Landing page Airia — site vitrine de conversion.
Déployé sur Vercel, domaine : airia.be

## Stack technique
- React + Vite
- Three.js (scène 3D particules)
- GSAP (animations scroll)
- CSS custom avec variables (pas de Tailwind)
- Composants fonctionnels, pas de TypeScript

## Structure
/src/components  → Navbar, Footer, composants réutilisables
/src/sections    → Hero, Problem, HowItWorks, Features, ROI, Pricing, CTA
/src/assets      → images, logo

## Couleurs
--cyan: #00F5FF  (accent principal)
--black: #050508
--white: #F0F4FF
--accent2: #00C4CC

## Conventions
- Commentaires en français
- Noms de variables métier en français
- Noms de composants PascalCase anglais
- Ne jamais modifier /dist ni vite.config.js

## UI/UX Skill
UI/UX Pro Max installé dans .claude/skills/
Pour tout nouveau composant, utiliser le skill automatiquement.
Stack préférée : React. Style : Dark Mode + 3D & Hyperrealism + Motion-Driven.