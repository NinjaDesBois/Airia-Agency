/* Sélecteur de langue — FR / NL / EN / DE — Airia */
import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const langues = [
  { code: 'fr', label: 'FR', ariaLabel: 'Français' },
  { code: 'nl', label: 'NL', ariaLabel: 'Nederlands' },
  { code: 'en', label: 'EN', ariaLabel: 'English' },
  { code: 'de', label: 'DE', ariaLabel: 'Deutsch' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-switcher" role="group" aria-label="Sélecteur de langue">
      {langues.map((langue, index) => (
        <button
          key={langue.code}
          className={`lang-switcher__btn ${language === langue.code ? 'lang-switcher__btn--actif' : ''}`}
          onClick={() => setLanguage(langue.code)}
          aria-label={langue.ariaLabel}
          aria-pressed={language === langue.code}
        >
          {langue.label}
        </button>
      ))}
    </div>
  )
}
