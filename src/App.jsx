"use client"

import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import WorkPage from "./pages/WorkPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import SocialLinks from "./components/SocialLinks"
import AIChatAssistant from "./components/AIChatAssistant"
import CosmicBackground from "./components/CosmicBackground"
import "./styles/global.css"

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-bs-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-bs-theme")
    }
  }, [isDarkMode])

  return (
    <div className="nexusport-app">
      <BrowserRouter>
        <CosmicBackground />
        <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
        <main className="container py-5" style={{ minHeight: "70vh" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <SocialLinks />
        <AIChatAssistant />
      </BrowserRouter>
    </div>
  )
}
