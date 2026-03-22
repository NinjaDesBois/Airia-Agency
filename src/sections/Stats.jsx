/* Section Stats — 4 chiffres clés — Airia */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Stats.css'

gsap.registerPlugin(ScrollTrigger)

/* Données numériques stables */
const valeursStats = [
  { valeur: 92, suffixe: '%', icône: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  )},
  { valeur: 48, suffixe: 'h', icône: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  )},
  { valeur: 24, suffixe: '/7', icône: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  )},
  { valeur: 0, suffixe: '€', icône: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  )},
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
  const { language } = useLanguage()
  const items = translations[language].stats.items

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          {items.map((stat, index) => (
            <motion.div
              key={valeursStats[index].valeur + '-' + index}
              className="stat__carte carte-verre"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="stat__icône">
                {valeursStats[index].icône}
              </div>
              <div className="stat__chiffre">
                <CompteurAnimé
                  valeurCible={valeursStats[index].valeur}
                  suffixe={valeursStats[index].suffixe}
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
