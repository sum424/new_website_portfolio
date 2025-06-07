"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  // Initialize state without accessing localStorage
  const [mounted, setMounted] = useState(false)

  // Only access localStorage after component has mounted in the browser
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="page error-page">
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
        <Link
          href="/"
          className="cta-button"
          style={{
            display: "inline-flex",
            textDecoration: "none",
          }}
        >
          RETURN HOME
        </Link>
      </motion.div>
    </div>
  )
}
