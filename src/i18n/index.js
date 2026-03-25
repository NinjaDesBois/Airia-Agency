/* Configuration i18next — Airia */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import nl from './locales/nl.json'
import en from './locales/en.json'
import de from './locales/de.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      nl: { translation: nl },
      en: { translation: en },
      de: { translation: de },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'airia-langue',
      caches: ['localStorage'],
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'nl', 'en', 'de'],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
