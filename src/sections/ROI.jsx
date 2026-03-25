/* Section ROI — Calculateur par secteur — Airia */
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ouvrirModalContact } from '../components/ModalContact'
import './ROI.css'

gsap.registerPlugin(ScrollTrigger)

/* Valeurs numériques par secteur (stables, indépendantes de la langue) */
const valeursParSecteur = [
  { valeurTransaction: 3000, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )},
  { valeurTransaction: 150, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2C9.2 2 7 4.2 7 7c0 2.4 1.4 4.5 3.5 5.5L9 22h2l1-6 1 6h2l-1.5-9.5C15.6 11.5 17 9.4 17 7c0-2.8-2.2-5-5-5z"/>
    </svg>
  )},
  { valeurTransaction: 200, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  )},
  { valeurTransaction: 500, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  )},
  { valeurTransaction: 2000, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  )},
  { valeurTransaction: 300, icône: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )},
]

const TAUX_CONVERSION = 0.15
const COÛT_AIRIA = 750
const ROI_MAX = 1000

function calculerROI(appelsParSemaine, valeurTransaction) {
  const appelsParMois = appelsParSemaine * 4
  const clientsConvertisParMois = Math.floor(appelsParMois * TAUX_CONVERSION)
  const revenusAdditionnelsMensuels = clientsConvertisParMois * valeurTransaction
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
  const [secteurIndex, setSecteurIndex] = useState(0)
  const { t } = useTranslation()
  const sectorsLabels = t('roi.sectors', { returnObjects: true })
  const benefits = t('roi.benefits', { returnObjects: true })
  const résultats = calculerROI(appelsParSemaine, valeursParSecteur[secteurIndex].valeurTransaction)

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
          <span className="badge">{t('roi.badge')}</span>
          <h2 id="roi-titre" className="roi__titre">
            {t('roi.title1')}
            <br />
            <span className="texte-dégradé">{t('roi.title2')}</span>
          </h2>
          <p className="roi__sous-titre">
            {t('roi.subtitle')}
          </p>
        </div>

        <div className="roi__contenu">
          {/* Calculateur */}
          <div className="roi__calculateur carte-verre">

            {/* Sélecteur de secteur */}
            <div className="roi__secteur-section">
              <p className="roi__label-section">{t('roi.sectorLabel')}</p>
              <div className="roi__secteurs" role="radiogroup" aria-label={t('roi.sectorAriaLabel')}>
                {sectorsLabels.map((s, index) => (
                  <button
                    key={index}
                    role="radio"
                    aria-checked={secteurIndex === index}
                    className={`roi__secteur-btn ${secteurIndex === index ? 'roi__secteur-btn--actif' : ''}`}
                    onClick={() => setSecteurIndex(index)}
                  >
                    <span className="roi__secteur-icône">{valeursParSecteur[index].icône}</span>
                    <span className="roi__secteur-nom">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Valeur de transaction */}
            <div className="roi__transaction-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {t('roi.valueLabel')} <strong>{valeursParSecteur[secteurIndex].valeurTransaction.toLocaleString('fr-BE')}€</strong> {sectorsLabels[secteurIndex].unitéLabel}
            </div>

            {/* Slider appels */}
            <div className="roi__slider-section">
              <div className="roi__slider-label">
                <span>{t('roi.sliderLabel')}</span>
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
                  aria-label={t('roi.sliderLabel')}
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
                {t('roi.hypothesis')}
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
                  <div className="roi__résultat-label">{t('roi.savedLabel')}</div>
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
                    <NombreAnimé valeur={résultats.clientsConvertisParMois} suffixe={` ${t('roi.clientsLabel').split(' ')[0]}`} />
                  </div>
                  <div className="roi__résultat-label">{t('roi.clientsLabel')}</div>
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
                  <div className="roi__résultat-label">{t('roi.revenueLabel')}</div>
                </div>
              </div>
            </div>

            {/* ROI global */}
            <div className="roi__global">
              <div className="roi__global-texte">
                <span className="roi__global-label">{t('roi.roiLabel')}</span>
                <div className="roi__global-sous-texte">
                  {t('roi.roiSubLabel')}
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
            <h3 className="roi__bénéfices-titre">{t('roi.benefitsTitle')}</h3>
            <ul className="roi__liste-bénéfices" role="list">
              {benefits.map((b, i) => (
                <motion.li
                  key={i}
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
                {t('roi.cta')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <p className="roi__cta-note">{t('roi.ctaNote')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
