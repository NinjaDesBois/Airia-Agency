/* Sélecteur de langue — FR / NL / EN / DE — Airia */
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const langues = [
  { code: 'fr', label: 'FR', ariaLabel: 'Français' },
  { code: 'nl', label: 'NL', ariaLabel: 'Nederlands' },
  { code: 'en', label: 'EN', ariaLabel: 'English' },
  { code: 'de', label: 'DE', ariaLabel: 'Deutsch' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="lang-switcher" role="group" aria-label="Sélecteur de langue">
      {langues.map((langue) => (
        <button
          key={langue.code}
          className={`lang-switcher__btn ${i18n.language === langue.code ? 'lang-switcher__btn--actif' : ''}`}
          onClick={() => i18n.changeLanguage(langue.code)}
          aria-label={langue.ariaLabel}
          aria-pressed={i18n.language === langue.code}
        >
          {langue.label}
        </button>
      ))}
    </div>
  )
}
