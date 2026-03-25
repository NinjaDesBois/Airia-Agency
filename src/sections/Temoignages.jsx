/* Section Témoignages — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ouvrirModalContact } from '../components/ModalContact'
import './Temoignages.css'

gsap.registerPlugin(ScrollTrigger)

/* Données non-traduites (auteurs, résultats, avatars) */
const témoignagesMeta = [
  { id: 'marc', auteur: 'Marc Dubois', entreprise: 'ImmoCore Bruxelles', note: 5, résultat: '+4 mandats / mois', avatar: 'M' },
  { id: 'sophie', auteur: 'Sophie Verlinden', entreprise: 'FlexWork Liège', note: 5, résultat: '23 RDV en 2 semaines', avatar: 'S' },
  { id: 'thomas', auteur: 'Thomas Bernard', entreprise: 'DigitalEdge Gand', note: 5, résultat: '+340% leads Meta', avatar: 'T' },
]

/* Étoiles de notation */
function Étoiles({ note }) {
  return (
    <div className="témoignage__étoiles" aria-label={`Note : ${note} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < note ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={i < note ? 'étoile--pleine' : 'étoile--vide'}
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Temoignages() {
  const refSection = useRef(null)
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.temoignages__en-tête',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.temoignages__en-tête', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.témoignage__carte',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.temoignages__grille', start: 'top 75%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section id="temoignages" className="temoignages" ref={refSection} aria-labelledby="temoignages-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="temoignages__en-tête">
          <span className="badge">{t('testimonials.badge')}</span>
          <h2 id="temoignages-titre" className="temoignages__titre">
            {t('testimonials.title1')}
            <br />
            <span className="texte-dégradé">{t('testimonials.title2')}</span>
          </h2>
          <p className="temoignages__sous-titre">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="temoignages__grille">
          {items.map((tém, index) => {
            const meta = témoignagesMeta[index]
            return (
              <motion.article
                key={meta.id}
                className={`témoignage__carte carte-verre ${index === 1 ? 'témoignage__carte--centrale' : ''}`}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                aria-label={`Témoignage de ${meta.auteur}`}
              >
                {/* Badge résultat */}
                <div className="témoignage__résultat">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                    <polyline points="17,6 23,6 23,12"/>
                  </svg>
                  {meta.résultat}
                </div>

                {/* Corps du témoignage */}
                <blockquote className="témoignage__texte">
                  <p>"{tém.texte}"</p>
                </blockquote>

                {/* Étoiles */}
                <Étoiles note={meta.note} />

                {/* Auteur */}
                <div className="témoignage__auteur">
                  <div className="témoignage__avatar" aria-hidden="true">
                    {meta.avatar}
                  </div>
                  <div className="témoignage__identité">
                    <strong className="témoignage__nom">{meta.auteur}</strong>
                    <span className="témoignage__rôle">
                      {tém.rôle} · {meta.entreprise}
                    </span>
                  </div>
                </div>

                <div className="témoignage__lueur" aria-hidden="true" />
              </motion.article>
            )
          })}
        </div>

        {/* CTA final */}
        <div className="temoignages__cta">
          <p className="temoignages__cta-texte">
            {t('testimonials.ctaText')}
          </p>
          <button className="btn-primaire" onClick={ouvrirModalContact}>
            {t('testimonials.cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
