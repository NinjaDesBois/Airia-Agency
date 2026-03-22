/* Contexte de langue — FR / NL / EN — Airia */
import { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('airia-lang') || 'fr'
  })

  const setLanguage = useCallback((lang) => {
    localStorage.setItem('airia-lang', lang)
    setLanguageState(lang)
  }, [])

  /* Récupère une traduction via clé pointée ex: "hero.title1" */
  const t = useCallback((key) => {
    const keys = key.split('.')
    let result = translations[language]
    for (const k of keys) {
      result = result?.[k]
    }
    return result ?? key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé dans un LanguageProvider')
  return ctx
}
