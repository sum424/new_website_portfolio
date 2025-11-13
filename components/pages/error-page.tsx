"use client"

import { motion } from "framer-motion"

interface ErrorPageProps {
  navigateTo: (page: string) => void
}

export default function ErrorPage({ navigateTo }: ErrorPageProps) {
  return (
    <motion.div className="error-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        The page you're looking for doesn't exist.
      </motion.p>

      <motion.a
        href="#home"
        className="cta-button"
        onClick={(e) => {
          e.preventDefault()
          navigateTo("home")
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{
          y: -5,
          boxShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
        }}
      >
        RETURN HOME
      </motion.a>
    </motion.div>
  )
}
