/* Bandeau CTA compact — inséré en milieu de page (après la section Problème) */
import { useTranslation } from 'react-i18next'
import { ouvrirModalContact } from './ModalContact'
import './BandeauCTA.css'

export default function BandeauCTA() {
  const { t } = useTranslation()

  return (
    <aside className="bandeau-cta" aria-label={t('ctaBand.title')}>
      <div className="conteneur bandeau-cta__conteneur">
        <div className="bandeau-cta__texte">
          <p className="bandeau-cta__titre">{t('ctaBand.title')}</p>
          <p className="bandeau-cta__sous-texte">{t('ctaBand.text')}</p>
        </div>
        <button className="btn-primaire bandeau-cta__btn" onClick={ouvrirModalContact}>
          {t('ctaBand.button')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
