"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <motion.div
      className="home-page py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row align-items-center" style={{ minHeight: "80vh" }}>
        <div className="col-lg-8">
          <h1
            className="display-3 fw-bold mb-4"
            style={{ fontFamily: "Orbitron, monospace", letterSpacing: "2px", color: "#00FF00" }}
          >
            Welcome to <span style={{ color: "#00a8ff" }}>NexusPort</span>
          </h1>
          <p className="lead mb-5" style={{ fontSize: "1.3rem", color: "#e6f1ff" }}>
            A futuristic portfolio showcasing my skills in web development, 3D graphics, and AI integration. Explore my
            work and discover the future of digital innovation.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Link
              to="/work"
              className="btn btn-lg"
              style={{ background: "transparent", color: "#00FF00", border: "2px solid #00FF00", letterSpacing: "1px" }}
            >
              EXPLORE WORK
            </Link>
            <Link to="/about" className="btn btn-lg btn-outline-info">
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
