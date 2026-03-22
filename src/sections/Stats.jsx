/* Section Stats — 4 chiffres clés — Airia */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

const donnéesStats = [
  {
    valeur: 92,
    suffixe: '%',
    label: 'Taux de qualification IA',
    description: 'Des leads qualifiés automatiquement avant votre équipe',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    valeur: 48,
    suffixe: 'h',
    label: 'Déploiement',
    description: 'De la signature au lancement complet de votre système IA',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
  },
  {
    valeur: 24,
    suffixe: '/7',
    label: 'Disponibilité',
    description: 'Votre réceptionniste IA ne prend jamais de congé',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    valeur: 0,
    suffixe: '€',
    préfixe: '',
    label: 'Setup',
    description: 'Aucun frais d\'installation. Vous payez uniquement le récurrent.',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
]

/* Composant compteur animé */
function CompteurAnimé({ valeurCible, suffixe, préfixe = '', actif }) {
  const [valeurAffichée, setValeurAffichée] = useState(0)

  useEffect(() => {
    if (!actif) return

    const durée = 1800
    const début = performance.now()

    const animer = (maintenant) => {
      const progression = Math.min((maintenant - début) / durée, 1)
      const easeOut = 1 - Math.pow(1 - progression, 3)
      setValeurAffichée(Math.round(easeOut * valeurCible))
      if (progression < 1) requestAnimationFrame(animer)
    }

    requestAnimationFrame(animer)
  }, [actif, valeurCible])

  return (
    <span className="stat__chiffre-valeur">
      {préfixe}{valeurAffichée}{suffixe}
    </span>
  )
}

export default function Stats() {
  const refSection = useRef(null)
  const [compteurActif, setCompteurActif] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Révèle les cartes en cascade
      gsap.fromTo(
        '.stat__carte',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.stats__grille',
            start: 'top 80%',
            onEnter: () => setCompteurActif(true),
          },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section className="stats" ref={refSection} aria-label="Chiffres clés">
      <div className="conteneur">
        <div className="stats__grille">
          {donnéesStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat__carte carte-verre"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="stat__icône">
                {stat.icône}
              </div>
              <div className="stat__chiffre">
                <CompteurAnimé
                  valeurCible={stat.valeur}
                  suffixe={stat.suffixe}
                  préfixe={stat.préfixe}
                  actif={compteurActif}
                />
              </div>
              <div className="stat__label">{stat.label}</div>
              <p className="stat__description">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
