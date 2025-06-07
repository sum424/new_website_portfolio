"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ErrorFallback() {
  return (
    <motion.div
      className="error-fallback"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AlertTriangle size={48} className="error-icon" />
      <h2>Something went wrong</h2>
      <p>We encountered an error while loading this page.</p>
      <div className="error-actions">
        <Link href="/" className="error-action-button">
          Go to Home
        </Link>
        <button onClick={() => window.location.reload()} className="error-action-button">
          Refresh Page
        </button>
      </div>
    </motion.div>
  )
}
