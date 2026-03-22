/* Section Problème — Bento Grid asymétrique — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import './Probleme.css'

gsap.registerPlugin(ScrollTrigger)

const problèmes = [
  {
    id: 'appels-répétitifs',
    taille: 'grande',
    titre: 'Vous répondez aux mêmes questions',
    description: 'Horaires, disponibilités, tarifs, process — votre équipe passe 40% du temps sur des questions récurrentes. C\'est du temps facturé que vous n\'encaissez pas.',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.3 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.21 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.55a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
      </svg>
    ),
    stat: '40%',
    labelStat: 'du temps perdu',
  },
  {
    id: 'prospection-manuelle',
    taille: 'normale',
    titre: 'La prospection prend des heures',
    description: 'Trouver, enrichir, contacter, relancer. Un cycle manuel qui épuise et ne scale pas.',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    stat: '3h',
    labelStat: 'par prospection',
  },
  {
    id: 'leads-non-qualifiés',
    taille: 'normale',
    titre: 'Les leads arrivent non qualifiés',
    description: 'Vous recevez des contacts. Mais qui est vraiment prêt à acheter ? Sans qualification IA, c\'est du temps investit pour rien.',
    icône: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    stat: '70%',
    labelStat: 'de leads perdus',
  },
  {
    id: 'gestion-opérationnelle',
    taille: 'grande',
    titre: 'Vous gérez. Vous ne vendez plus.',
    description: 'Facturation, suivi client, relances, reporting — vous êtes devenu·e chef de projet, pas commercial·e. Pendant ce temps, vos concurrents closent des deals. L\'IA doit gérer l\'opérationnel, pas vous.',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    stat: '60%',
    labelStat: 'du temps non facturable',
  },
]

export default function Probleme() {
  const refSection = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.probleme__en-tête',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.probleme__en-tête', start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.probleme__carte',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: { amount: 0.5, from: 'start' },
          scrollTrigger: { trigger: '.probleme__bento', start: 'top 75%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section id="probleme" className="probleme" ref={refSection} aria-labelledby="probleme-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="probleme__en-tête">
          <span className="badge">Le problème</span>
          <h2 id="probleme-titre" className="probleme__titre">
            Votre agence perd du temps
            <br />
            <span className="texte-dégradé">et de l'argent.</span>
          </h2>
          <p className="probleme__sous-titre">
            Chaque heure passée sur des tâches répétitives est une heure de vente perdue.
            L'IA ne dort pas, ne se plaint pas, et ne fait pas d'erreurs.
          </p>
        </div>

        {/* Bento grid asymétrique */}
        <div className="probleme__bento">
          {problèmes.map((prob) => (
            <motion.div
              key={prob.id}
              className={`probleme__carte probleme__carte--${prob.taille} carte-verre`}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className="probleme__carte-icône">
                {prob.icône}
              </div>

              <div className="probleme__carte-contenu">
                <h3 className="probleme__carte-titre">{prob.titre}</h3>
                <p className="probleme__carte-desc">{prob.description}</p>
              </div>

              <div className="probleme__carte-stat">
                <span className="probleme__stat-valeur">{prob.stat}</span>
                <span className="probleme__stat-label">{prob.labelStat}</span>
              </div>

              {/* Lueur décorative */}
              <div className="probleme__carte-lueur" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
