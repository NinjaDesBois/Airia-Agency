/* Section Tarifs — Voice IA à partir de 350€/mois + solutions sur mesure */
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ouvrirModalContact } from '../components/ModalContact'
import './Pricing.css'

function Coche() {
  return (
    <span className="pricing__coche" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    </span>
  )
}

export default function Pricing() {
  const { t } = useTranslation()
  const voiceFeatures = t('pricing.voiceFeatures', { returnObjects: true })
  const customFeatures = t('pricing.customFeatures', { returnObjects: true })

  return (
    <section id="tarifs" className="pricing" aria-labelledby="pricing-titre">
      <div className="conteneur">
        {/* En-tête */}
        <div className="pricing__en-tête">
          <span className="badge">{t('pricing.badge')}</span>
          <h2 id="pricing-titre" className="pricing__titre">
            {t('pricing.title1')}{' '}
            <span className="texte-dégradé">{t('pricing.title2')}</span>
          </h2>
          <p className="pricing__sous-titre">{t('pricing.subtitle')}</p>
        </div>

        {/* Cartes */}
        <div className="pricing__grille">
          {/* Voice IA — offre principale */}
          <motion.article
            className="pricing__carte pricing__carte--principale carte-verre"
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            aria-label={t('pricing.voiceName')}
          >
            <span className="pricing__tag">{t('pricing.voiceTag')}</span>
            <h3 className="pricing__nom">{t('pricing.voiceName')}</h3>
            <p className="pricing__desc">{t('pricing.voiceDesc')}</p>

            <div className="pricing__prix">
              <span className="pricing__prix-préfixe">{t('pricing.voicePricePrefix')}</span>
              <span className="pricing__prix-valeur">{t('pricing.voicePrice')}</span>
              <span className="pricing__prix-suffixe">{t('pricing.voicePriceSuffix')}</span>
            </div>

            <ul className="pricing__liste" role="list">
              {voiceFeatures.map((f, i) => (
                <li key={i}><Coche />{f}</li>
              ))}
            </ul>

            <button className="btn-primaire pricing__btn" onClick={ouvrirModalContact}>
              {t('pricing.voiceCta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.article>

          {/* Solutions sur mesure */}
          <motion.article
            className="pricing__carte carte-verre"
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            aria-label={t('pricing.customName')}
          >
            <h3 className="pricing__nom">{t('pricing.customName')}</h3>
            <p className="pricing__desc">{t('pricing.customDesc')}</p>

            <div className="pricing__prix">
              <span className="pricing__prix-valeur pricing__prix-valeur--devis">{t('pricing.customPrice')}</span>
            </div>

            <ul className="pricing__liste" role="list">
              {customFeatures.map((f, i) => (
                <li key={i}><Coche />{f}</li>
              ))}
            </ul>

            <button className="btn-secondaire pricing__btn" onClick={ouvrirModalContact}>
              {t('pricing.customCta')}
            </button>
          </motion.article>
        </div>

        <p className="pricing__note">{t('pricing.note')}</p>
      </div>
    </section>
  )
}
