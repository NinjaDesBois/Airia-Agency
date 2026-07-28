/* Section Secteurs — contenu réellement visible (remplace l'ancien bloc SEO caché) */
import { useTranslation } from 'react-i18next'
import './SeoContent.css'

/* IDs stables — les labels viennent des JSON */
const SECTEURS_IDS = ['immobilier', 'dentaire', 'avocat', 'notaire', 'comptable', 'artisan', 'webagency', 'pme']

export default function SeoContent() {
  const { t } = useTranslation()

  return (
    <section id="secteurs" className="secteurs" aria-labelledby="secteurs-titre">
      <div className="conteneur">
        <div className="secteurs__en-tête">
          <span className="badge">{t('sectors.badge')}</span>
          <h2 id="secteurs-titre" className="secteurs__titre">
            {t('sectors.title1')}{' '}
            <span className="texte-dégradé">{t('sectors.title2')}</span>
          </h2>
          <p className="secteurs__sous-titre">{t('sectors.subtitle')}</p>
        </div>

        <ul className="secteurs__grille" role="list">
          {SECTEURS_IDS.map((id) => (
            <li key={id} className="secteurs__carte carte-verre">
              {t(`sectors.items.${id}`)}
            </li>
          ))}
        </ul>

        <p className="secteurs__couverture">{t('sectors.coverage')}</p>
      </div>
    </section>
  )
}
