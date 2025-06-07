"use client"

import { motion } from "framer-motion"

interface HomePageProps {
  navigateTo: (page: string) => void
}

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <div className="page home-page">
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          HI, I'M{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            SUMAN THAPA
          </motion.span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
          A creative Frontend Developer crafting immersive digital experiences with HTML, CSS, JavaScript, React, GSAP, PHP and Laravel. I blend
          technical expertise with design sensibility to build interactive, visually stunning web applications that
          engage users, deliver exceptional experiences and maximum performance.
        </motion.p>

        <motion.a
          href="#work"
          className="cta-button"
          onClick={(e) => {
            e.preventDefault()
            navigateTo("work")
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{
            y: -5,
            boxShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
          }}
        >
          VIEW MY WORK
        </motion.a>
      </motion.div>
    </div>
  )
}
