/* Section FAQ — accordéon accessible (details/summary) */
import { useTranslation } from 'react-i18next'
import './FAQ.css'

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })

  return (
    <section id="faq" className="faq" aria-labelledby="faq-titre">
      <div className="conteneur">
        <div className="faq__en-tête">
          <span className="badge">{t('faq.badge')}</span>
          <h2 id="faq-titre" className="faq__titre">
            {t('faq.title1')}{' '}
            <span className="texte-dégradé">{t('faq.title2')}</span>
          </h2>
          <p className="faq__sous-titre">{t('faq.subtitle')}</p>
        </div>

        <div className="faq__liste">
          {items.map((item, i) => (
            <details key={i} className="faq__item carte-verre">
              <summary className="faq__question">
                {item.q}
                <span className="faq__chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </span>
              </summary>
              <p className="faq__réponse">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
