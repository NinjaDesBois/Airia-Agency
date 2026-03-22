/* Section ROI — Calculateur par secteur — Airia */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ouvrirModalContact } from '../components/ModalContact'
import './ROI.css'

gsap.registerPlugin(ScrollTrigger)

/* === Données par secteur === */
const secteurs = [
  {
    id: 'immobilier',
    label: 'Immobilier',
    valeurTransaction: 3000,
    unitéLabel: 'commission moyenne',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
  },
  {
    id: 'dentaire',
    label: 'Dentaire',
    valeurTransaction: 150,
    unitéLabel: 'par consultation',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2C9.2 2 7 4.2 7 7c0 2.4 1.4 4.5 3.5 5.5L9 22h2l1-6 1 6h2l-1.5-9.5C15.6 11.5 17 9.4 17 7c0-2.8-2.2-5-5-5z"/>
      </svg>
    ),
  },
  {
    id: 'plombier',
    label: 'Plombier',
    valeurTransaction: 200,
    unitéLabel: 'par intervention',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    id: 'avocat',
    label: 'Avocat',
    valeurTransaction: 500,
    unitéLabel: 'par dossier ouvert',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    id: 'agence',
    label: 'Agence web',
    valeurTransaction: 2000,
    unitéLabel: 'par projet signé',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: 'comptable',
    label: 'Comptable',
    valeurTransaction: 300,
    unitéLabel: 'par client/mois',
    icône: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
  },
]

const TAUX_CONVERSION = 0.15  // 15% — taux réaliste industrie
const COÛT_AIRIA = 750        // abonnement mensuel
const ROI_MAX = 1000          // plafonné à 1000% pour crédibilité

/* Calcul du ROI par secteur */
function calculerROI(appelsParSemaine, secteur) {
  const appelsParMois = appelsParSemaine * 4
  const clientsConvertisParMois = Math.floor(appelsParMois * TAUX_CONVERSION)
  const revenusAdditionnelsMensuels = clientsConvertisParMois * secteur.valeurTransaction

  const minutesParAppel = 15
  const heuresEconomiséesParMois = Math.round((appelsParMois * minutesParAppel) / 60)

  const roiBrut =
    revenusAdditionnelsMensuels > 0
      ? Math.round(((revenusAdditionnelsMensuels - COÛT_AIRIA) / COÛT_AIRIA) * 100)
      : 0

  return {
    appelsParMois,
    clientsConvertisParMois,
    revenusAdditionnelsMensuels,
    heuresEconomiséesParMois,
    roiPourcentage: Math.min(Math.max(roiBrut, 0), ROI_MAX),
  }
}

const bénéfices = [
  'Zéro heure passée sur la prospection manuelle',
  'Leads qualifiés automatiquement avant votre équipe',
  'Campagnes Meta actives 24/7 sans intervention',
  'Appels traités même hors heures de bureau',
  'Reporting automatique pour vos clients',
  'Scaling sans embauche supplémentaire',
]

/* Composant nombre animé */
function NombreAnimé({ valeur, préfixe = '', suffixe = '' }) {
  const [valeurAffichée, setValeurAffichée] = useState(valeur)
  const refPrécédente = useRef(valeur)

  useEffect(() => {
    const début = refPrécédente.current
    const fin = valeur
    const durée = 550
    const startTime = performance.now()

    const animer = (now) => {
      const progression = Math.min((now - startTime) / durée, 1)
      const ease = 1 - Math.pow(1 - progression, 3)
      setValeurAffichée(Math.round(début + (fin - début) * ease))
      if (progression < 1) requestAnimationFrame(animer)
      else refPrécédente.current = fin
    }

    requestAnimationFrame(animer)
  }, [valeur])

  return (
    <span>
      {préfixe}{valeurAffichée.toLocaleString('fr-BE')}{suffixe}
    </span>
  )
}

export default function ROI() {
  const refSection = useRef(null)
  const [appelsParSemaine, setAppelsParSemaine] = useState(30)
  const [secteurActif, setSecteurActif] = useState(secteurs[0])
  const résultats = calculerROI(appelsParSemaine, secteurActif)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.roi__en-tête',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.roi__en-tête', start: 'top 80%' },
        }
      )
      gsap.fromTo(
        ['.roi__calculateur', '.roi__bénéfices'],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.roi__contenu', start: 'top 75%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section id="roi" className="roi" ref={refSection} aria-labelledby="roi-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="roi__en-tête">
          <span className="badge">Calcul ROI</span>
          <h2 id="roi-titre" className="roi__titre">
            Combien vaut Airia
            <br />
            <span className="texte-dégradé">pour votre secteur ?</span>
          </h2>
          <p className="roi__sous-titre">
            Choisissez votre secteur et estimez vos gains mensuels avec Airia.
          </p>
        </div>

        <div className="roi__contenu">
          {/* Calculateur */}
          <div className="roi__calculateur carte-verre">

            {/* Sélecteur de secteur */}
            <div className="roi__secteur-section">
              <p className="roi__label-section">Votre secteur d'activité</p>
              <div className="roi__secteurs" role="radiogroup" aria-label="Secteur d'activité">
                {secteurs.map((s) => (
                  <button
                    key={s.id}
                    role="radio"
                    aria-checked={secteurActif.id === s.id}
                    className={`roi__secteur-btn ${secteurActif.id === s.id ? 'roi__secteur-btn--actif' : ''}`}
                    onClick={() => setSecteurActif(s)}
                  >
                    <span className="roi__secteur-icône">{s.icône}</span>
                    <span className="roi__secteur-nom">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Valeur de transaction affichée */}
            <div className="roi__transaction-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Valeur estimée : <strong>{secteurActif.valeurTransaction.toLocaleString('fr-BE')}€</strong> {secteurActif.unitéLabel}
            </div>

            {/* Slider appels */}
            <div className="roi__slider-section">
              <div className="roi__slider-label">
                <span>Appels entrants par semaine</span>
                <strong className="roi__slider-valeur">{appelsParSemaine}</strong>
              </div>
              <div className="roi__slider-wrapper">
                <input
                  type="range"
                  className="roi__slider"
                  min="5"
                  max="100"
                  step="5"
                  value={appelsParSemaine}
                  onChange={(e) => setAppelsParSemaine(Number(e.target.value))}
                  style={{ '--fill': `${((appelsParSemaine - 5) / (100 - 5)) * 100}%` }}
                  aria-label="Nombre d'appels par semaine"
                  aria-valuemin="5"
                  aria-valuemax="100"
                  aria-valuenow={appelsParSemaine}
                />
                <div className="roi__slider-graduations" aria-hidden="true">
                  <span>5</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
              <p className="roi__hypothèse">
                Hypothèse : taux de conversion de 15% — standard industrie
              </p>
            </div>

            {/* Résultats */}
            <div className="roi__résultats">
              <div className="roi__résultat-carte">
                <div className="roi__résultat-icône roi__résultat-icône--temps">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div>
                  <div className="roi__résultat-valeur">
                    <NombreAnimé valeur={résultats.heuresEconomiséesParMois} suffixe="h" />
                  </div>
                  <div className="roi__résultat-label">économisées / mois</div>
                </div>
              </div>

              <div className="roi__résultat-carte">
                <div className="roi__résultat-icône roi__résultat-icône--clients">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="roi__résultat-valeur">
                    <NombreAnimé valeur={résultats.clientsConvertisParMois} suffixe=" clients" />
                  </div>
                  <div className="roi__résultat-label">convertis / mois</div>
                </div>
              </div>

              <div className="roi__résultat-carte roi__résultat-carte--principal">
                <div className="roi__résultat-icône roi__résultat-icône--revenus">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <div>
                  <div className="roi__résultat-valeur roi__résultat-valeur--cyan">
                    <NombreAnimé valeur={résultats.revenusAdditionnelsMensuels} préfixe="+" suffixe="€" />
                  </div>
                  <div className="roi__résultat-label">revenus / mois</div>
                </div>
              </div>
            </div>

            {/* ROI global */}
            <div className="roi__global">
              <div className="roi__global-texte">
                <span className="roi__global-label">Retour sur investissement</span>
                <div className="roi__global-sous-texte">
                  Pour {COÛT_AIRIA}€/mois de service Airia
                </div>
              </div>
              <div className="roi__global-valeur">
                <NombreAnimé valeur={résultats.roiPourcentage} suffixe="%" />
                <span className="roi__global-badge">ROI</span>
              </div>
            </div>

          </div>

          {/* Bénéfices */}
          <div className="roi__bénéfices">
            <h3 className="roi__bénéfices-titre">Ce que vous gagnez</h3>
            <ul className="roi__liste-bénéfices" role="list">
              {bénéfices.map((b, i) => (
                <motion.li
                  key={b}
                  className="roi__bénéfice"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <div className="roi__bénéfice-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                  {b}
                </motion.li>
              ))}
            </ul>

            <div className="roi__cta">
              <button className="btn-primaire roi__btn" onClick={ouvrirModalContact}>
                Calculer mon ROI personnalisé
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <p className="roi__cta-note">Appel stratégique gratuit · Sans engagement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
