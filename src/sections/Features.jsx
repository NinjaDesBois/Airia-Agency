/* Section Fonctionnalités — 6 cartes — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const fonctionnalités = [
  {
    id: 'voice-ia',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.3 10.8 19.79 19.79 0 01.23 2.17 2 2 0 012.21 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.55a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
      </svg>
    ),
    titre: 'Voice IA',
    sousTitre: 'Réceptionniste vocale 24/7',
    description: 'Votre agent vocal répond aux appels, qualifie les prospects, planifie les rendez-vous et transfère vers votre équipe uniquement les leads chauds.',
    tags: ['Appels entrants', 'Qualification', 'Planning RDV'],
    vedette: true,
  },
  {
    id: 'lead-gen',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    titre: 'Lead Generation',
    sousTitre: 'Prospection automatisée',
    description: 'Séquences email et SMS multi-étapes, personnalisées par IA. Enrichissement automatique des contacts et relances intelligentes.',
    tags: ['Email IA', 'SMS', 'Enrichissement'],
    vedette: false,
  },
  {
    id: 'pub-meta',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    titre: 'Pub Meta IA',
    sousTitre: 'Campagnes Facebook & Instagram',
    description: 'Création, optimisation et scaling automatique de vos campagnes Meta. L\'IA ajuste les budgets, les audiences et les créas en temps réel.',
    tags: ['Facebook Ads', 'Instagram', 'Auto-optimisation'],
    vedette: false,
  },
  {
    id: 'multilingue',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    titre: 'Multilingue',
    sousTitre: 'FR · NL · EN · DE',
    description: 'Vos agents IA communiquent dans la langue du prospect. Parfait pour les agences belges qui opèrent en Flandre, Wallonie et à Bruxelles.',
    tags: ['Français', 'Néerlandais', 'Anglais'],
    vedette: false,
  },
  {
    id: 'dashboard',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    titre: 'Dashboard',
    sousTitre: 'Vue en temps réel',
    description: 'Tableau de bord centralisé avec KPIs en temps réel : appels traités, leads qualifiés, taux de conversion, revenus générés pour chaque client.',
    tags: ['KPIs live', 'Reporting auto', 'Multi-clients'],
    vedette: false,
  },
  {
    id: 'integrations',
    icône: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    titre: 'Intégrations',
    sousTitre: 'Connecté à 50+ outils',
    description: 'n8n, Airtable, Make, Zapier, HubSpot, Twilio, Calendly et plus. Vos workflows existants s\'intègrent sans friction en quelques clics.',
    tags: ['n8n', 'Airtable', 'HubSpot', '+47 autres'],
    vedette: false,
  },
]

export default function Features() {
  const refSection = useRef(null)

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
          <span className="badge">Fonctionnalités</span>
          <h2 id="features-titre" className="features__titre">
            Tout ce dont votre agence
            <br />
            <span className="texte-dégradé">a besoin pour s'automatiser</span>
          </h2>
          <p className="features__sous-titre">
            6 modules IA déployés et configurés en 48h. Chaque module s'adapte
            à votre secteur et vos workflows existants.
          </p>
        </div>

        {/* Grille de cartes */}
        <div className="features__grille">
          {fonctionnalités.map((feat) => (
            <motion.div
              key={feat.id}
              className={`feature__carte carte-verre ${feat.vedette ? 'feature__carte--vedette' : ''}`}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              {feat.vedette && (
                <div className="feature__badge-vedette">Populaire</div>
              )}

              <div className="feature__icône">
                {feat.icône}
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
