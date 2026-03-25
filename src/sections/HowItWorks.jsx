/* Section Comment ça marche — 3 étapes — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './HowItWorks.css'

gsap.registerPlugin(ScrollTrigger)

/* Icônes SVG stables */
const icônesÉtapes = [
  <svg key="audit" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
  </svg>,
  <svg key="deploy" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
  <svg key="harvest" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>,
]

const numÉtapes = ['01', '02', '03']

export default function HowItWorks() {
  const refSection = useRef(null)
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { returnObjects: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hiw__en-tête',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.hiw__en-tête', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.hiw__étape',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: '.hiw__étapes', start: 'top 75%' },
        }
      )

      gsap.fromTo(
        '.hiw__ligne-connexion',
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.hiw__étapes', start: 'top 70%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section id="comment-ca-marche" className="hiw" ref={refSection} aria-labelledby="hiw-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="hiw__en-tête">
          <span className="badge">{t('howItWorks.badge')}</span>
          <h2 id="hiw-titre" className="hiw__titre">
            {t('howItWorks.title')} <span className="texte-dégradé">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="hiw__sous-titre">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Étapes */}
        <div className="hiw__étapes-wrapper">
          <div className="hiw__ligne-connexion" aria-hidden="true" />

          <div className="hiw__étapes">
            {steps.map((étape, index) => (
              <motion.div
                key={numÉtapes[index]}
                className="hiw__étape"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Numéro */}
                <div className="hiw__numéro-wrapper">
                  <span className="hiw__numéro">{numÉtapes[index]}</span>
                </div>

                {/* Carte */}
                <div className="hiw__carte carte-verre">
                  <div className="hiw__icône">{icônesÉtapes[index]}</div>
                  <div className="hiw__durée">{étape.durée}</div>
                  <h3 className="hiw__étape-titre">{étape.titre}</h3>
                  <p className="hiw__étape-desc">{étape.description}</p>

                  <ul className="hiw__détails" role="list">
                    {étape.détails.map((détail) => (
                      <li key={détail} className="hiw__détail">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                        {détail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
