"use client"

import { Linkedin, Github, Twitter, Dribbble } from "lucide-react"
import { motion } from "framer-motion"

export default function SocialLinks() {
  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="social-links" variants={socialVariants} initial="hidden" animate="visible">
      <motion.a
        href="https://www.linkedin.com/in/suman-thapa-8a6907199"
        target="_blank"
        className="social-icon"
        aria-label="LinkedIn"
        variants={iconVariants}
        whileHover={{ y: -5, boxShadow: "0 0 10px rgba(0, 168, 255, 0.7)" }}
      >
        <Linkedin size={20} />
      </motion.a>
      <motion.a
        href="https://github.com/sum424"
        target="_blank"
        className="social-icon"
        aria-label="GitHub"
        variants={iconVariants}
        whileHover={{ y: -5, boxShadow: "0 0 10px rgba(0, 168, 255, 0.7)" }}
      >
        <Github size={20} />
      </motion.a>
      <motion.a
        href="https://x.com/SumanTh15639758"
        target="_blank"
        className="social-icon"
        aria-label="Twitter"
        variants={iconVariants}
        whileHover={{ y: -5, boxShadow: "0 0 10px rgba(0, 168, 255, 0.7)" }}
      >
        <Twitter size={20} />
      </motion.a>
    </motion.div>
  )
}
