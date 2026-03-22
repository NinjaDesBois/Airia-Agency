/* Section Témoignages — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ouvrirModalContact } from '../components/ModalContact'
import './Temoignages.css'

gsap.registerPlugin(ScrollTrigger)

const témoignages = [
  {
    id: 'marc',
    texte: "La réceptionniste IA répond à 80% des appels entrants. Mon équipe ne traite plus que les leads vraiment chauds. On a gagné 3h par jour et signé 4 nouveaux mandats en un mois.",
    auteur: 'Marc Dubois',
    rôle: 'Directeur, Agence Immobilière',
    entreprise: 'ImmoCore Bruxelles',
    note: 5,
    résultat: '+4 mandats / mois',
    avatar: 'M',
  },
  {
    id: 'sophie',
    texte: "En 2 semaines, notre séquence de prospection email IA a généré 23 rendez-vous qualifiés. Avant, on en avait 3-4 par mois avec une équipe dédiée. Le ROI était immédiat.",
    auteur: 'Sophie Verlinden',
    rôle: 'CEO',
    entreprise: 'FlexWork Liège',
    note: 5,
    résultat: '23 RDV en 2 semaines',
    avatar: 'S',
  },
  {
    id: 'thomas',
    texte: "Les campagnes Meta tournent toutes seules. L'IA ajuste les budgets en temps réel selon les performances. +340% de leads en 3 mois pour 3 de nos clients. Ils ont tous renouvelé.",
    auteur: 'Thomas Bernard',
    rôle: 'Fondateur',
    entreprise: 'DigitalEdge Gand',
    note: 5,
    résultat: '+340% leads Meta',
    avatar: 'T',
  },
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
          <span className="badge">Témoignages</span>
          <h2 id="temoignages-titre" className="temoignages__titre">
            Ce que disent les agences
            <br />
            <span className="texte-dégradé">qui utilisent Airia</span>
          </h2>
          <p className="temoignages__sous-titre">
            12 agences belges. Des résultats mesurables dès les premières semaines.
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="temoignages__grille">
          {témoignages.map((tém, index) => (
            <motion.article
              key={tém.id}
              className={`témoignage__carte carte-verre ${index === 1 ? 'témoignage__carte--centrale' : ''}`}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              aria-label={`Témoignage de ${tém.auteur}`}
            >
              {/* Badge résultat */}
              <div className="témoignage__résultat">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                  <polyline points="17,6 23,6 23,12"/>
                </svg>
                {tém.résultat}
              </div>

              {/* Corps du témoignage */}
              <blockquote className="témoignage__texte">
                <p>"{tém.texte}"</p>
              </blockquote>

              {/* Étoiles */}
              <Étoiles note={tém.note} />

              {/* Auteur */}
              <div className="témoignage__auteur">
                <div
                  className="témoignage__avatar"
                  aria-hidden="true"
                >
                  {tém.avatar}
                </div>
                <div className="témoignage__identité">
                  <strong className="témoignage__nom">{tém.auteur}</strong>
                  <span className="témoignage__rôle">
                    {tém.rôle} · {tém.entreprise}
                  </span>
                </div>
              </div>

              {/* Lueur décorative */}
              <div className="témoignage__lueur" aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        {/* CTA final */}
        <div className="temoignages__cta">
          <p className="temoignages__cta-texte">
            Rejoignez les 12 agences qui automatisent déjà avec Airia
          </p>
          <button className="btn-primaire" onClick={ouvrirModalContact}>
            Réserver un appel stratégique
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
