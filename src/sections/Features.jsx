/* Section Fonctionnalités — 6 cartes — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

/* Icônes SVG stables (indépendantes de la langue) */
const icônes = [
  <svg key="voice" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.3 10.8 19.79 19.79 0 01.23 2.17 2 2 0 012.21 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.55a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>,
  <svg key="lead" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>,
  <svg key="meta" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>,
  <svg key="multi" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
  <svg key="dash" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>,
  <svg key="integ" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>,
]

const idsFeatures = ['voice-ia', 'lead-gen', 'pub-meta', 'multilingue', 'dashboard', 'integrations']

export default function Features() {
  const refSection = useRef(null)
  const { language, t } = useLanguage()
  const items = translations[language].features.items

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features__en-tête',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.features__en-tête', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.feature__carte',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.features__grille', start: 'top 75%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section id="fonctionnalites" className="features" ref={refSection} aria-labelledby="features-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="features__en-tête">
          <span className="badge">{t('features.badge')}</span>
          <h2 id="features-titre" className="features__titre">
            {t('features.title1')}
            <br />
            <span className="texte-dégradé">{t('features.title2')}</span>
          </h2>
          <p className="features__sous-titre">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="features__grille">
          {items.map((feat, index) => (
            <motion.div
              key={idsFeatures[index]}
              className={`feature__carte carte-verre ${index === 0 ? 'feature__carte--vedette' : ''}`}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              {index === 0 && (
                <div className="feature__badge-vedette">{t('features.popular')}</div>
              )}

              <div className="feature__icône">
                {icônes[index]}
              </div>

              <div className="feature__texte">
                <h3 className="feature__titre">{feat.titre}</h3>
                <span className="feature__sous-titre">{feat.sousTitre}</span>
                <p className="feature__desc">{feat.description}</p>
              </div>

              <div className="feature__tags">
                {feat.tags.map((tag) => (
                  <span key={tag} className="feature__tag">{tag}</span>
                ))}
              </div>

              {/* Lueur en hover */}
              <div className="feature__lueur" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
