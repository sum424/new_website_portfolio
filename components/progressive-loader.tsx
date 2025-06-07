"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ProgressiveLoader({ children, priority = 1 }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Stagger loading based on priority
    const loadTime = 100 * priority
    const timer = setTimeout(() => setIsLoaded(true), loadTime)
    return () => clearTimeout(timer)
  }, [priority])

  if (!isLoaded)
    return (
      <motion.div
        className="placeholder-loader"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      />
    )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )
}
