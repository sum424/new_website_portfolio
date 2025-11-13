"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      emailjs.init("YOUR_EMAILJS_PUBLIC_KEY")

      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      })

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="display-4 fw-bold mb-5"
        style={{ fontFamily: "Orbitron, monospace", letterSpacing: "2px", color: "#00a8ff" }}
      >
        GET IN TOUCH
      </h2>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          {submitted ? (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          ) : error ? (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-info"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-info"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-bold">
                Message
              </label>
              <textarea
                className="form-control bg-dark text-light border-info"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ background: "transparent", color: "#00FF00", border: "2px solid #00FF00", letterSpacing: "1px" }}
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
