"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Printer, ArrowLeft, Moon, Sun } from "lucide-react"
import Resume from "@/components/resume"
import { useTheme } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

export default function ResumePage() {
  const [isPrinting, setIsPrinting] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleBackClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push("/#about")
  }

  return (
    <div className={`resume-page ${isPrinting ? "printing" : ""}`}>
      <motion.div
        className="resume-actions"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="/#about" className="back-button" onClick={handleBackClick}>
          <ArrowLeft size={18} />
          <span>Back to About</span>
        </a>

        <div className="resume-buttons">
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button onClick={handlePrint} className="print-button">
            <Printer size={18} />
            <span>Print Resume</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="resume-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Resume />
      </motion.div>
    </div>
  )
}
