"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Header({ isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom"
      style={{ borderColor: "#00a8ff" }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ fontSize: "1.8rem", letterSpacing: "3px", color: "#00a8ff" }}
        >
          NEXUSPORT
        </Link>

        <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/" style={{ letterSpacing: "1px" }}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/work") ? "active" : ""}`}
                to="/work"
                style={{ letterSpacing: "1px" }}
              >
                WORK
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                to="/about"
                style={{ letterSpacing: "1px" }}
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
                style={{ letterSpacing: "1px" }}
              >
                CONTACT
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary btn-sm ms-2" onClick={onToggleTheme}>
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
