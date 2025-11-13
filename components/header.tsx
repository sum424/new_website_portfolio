"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  currentPage: string
  navigateTo: (page: string) => void
}

export default function Header({ currentPage, navigateTo }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (page: string) => {
    navigateTo(page)
    setMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="header">
      <motion.div
        className="logo"
        data-text="NEXUSPORT"
        whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(0, 168, 255, 0.7)" }}
      >
        NEXUSPORT
      </motion.div>

      <nav className={`desktop-nav ${mobileMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a
              href="#home"
              className={`nav-link ${currentPage === "home" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("home")
              }}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="#work"
              className={`nav-link ${currentPage === "work" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("work")
              }}
            >
              WORK
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-link ${currentPage === "about" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("about")
              }}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("contact")
              }}
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>

      <div className="header-controls">
        <button className="mobile-menu-btn" aria-label="Menu" aria-expanded={mobileMenuOpen} onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <motion.button
          id="mode-toggle"
          className="mode-toggle"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
      </div>
    </header>
  )
}
