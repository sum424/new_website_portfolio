"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Header from "@/components/header"
import CosmicBackground from "@/components/cosmic-background"
import SocialLinks from "@/components/social-links"
import HomePage from "@/components/home-page"
import WorkPage from "@/components/work-page"
import AboutPage from "@/components/about-page"
import ContactPage from "@/components/contact-page"
import ErrorPage from "@/components/error-page"
import AIChatAssistant from "@/components/ai-chat-assistant"
import { AnimatePresence, motion } from "framer-motion"
import { ErrorBoundary } from "@/components/error-boundary"
import { useRouter } from "next/navigation"
import React from "react"

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      setCurrentPage(hash.substring(1))
    }

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        setCurrentPage(hash.substring(1))
      } else {
        setCurrentPage("home")
      }
    }

    const handlePopState = () => {
      const hash = window.location.hash
      if (hash && hash.length > 1) {
        setCurrentPage(hash.substring(1))
      } else {
        setCurrentPage("home")
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const navigateTo = (page: string) => {
    setIsLoading(true)

    setTimeout(() => {
      setCurrentPage(page)
      setIsLoading(false)
      window.history.pushState({ page }, "", `#${page}`)
    }, 500)
  }

  // ✅ Fix added here — e typed explicitly
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/#about")
  }

  const renderPage = () => {
    if (isLoading) {
      return (
        <motion.div className="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="loading-spinner"></div>
          <div className="loading-text">LOADING {currentPage.toUpperCase()}...</div>
        </motion.div>
      )
    }

    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} />
      case "work":
        return <WorkPage />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      default:
        return <ErrorPage navigateTo={navigateTo} />
    }
  }

  return (
    <div className={theme === "light" ? "light-mode" : ""}>
      <ErrorBoundary>
        <CosmicBackground />
      </ErrorBoundary>

      <div className="container">
        <Header currentPage={currentPage} navigateTo={navigateTo} />

        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage}
            id="content-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorBoundary>{renderPage()}</ErrorBoundary>
          </motion.main>
        </AnimatePresence>
      </div>

      <SocialLinks />
      <AIChatAssistant />
    </div>
  )
}
