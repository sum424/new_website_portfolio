"use client"

import { useState, createContext, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

// Available languages
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
]

// Create context
const LanguageContext = createContext({
  language: "en",
  setLanguage: (code: string) => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

// Language provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    // Load translations for selected language
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/api/translations?lang=${language}`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error("Failed to load translations:", error)
      }
    }

    loadTranslations()
  }, [language])

  // Translation function
  const t = (key) => {
    return translations[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Language switcher component
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="language-switcher">
      <motion.button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={18} />
        <span>{language.toUpperCase()}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="language-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? "active" : ""}`}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
            >
              {lang.name}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
