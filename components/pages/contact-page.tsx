"use client"

import type React from "react"
import { useState, type FormEvent, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initialize EmailJS with error handling
    try {
      emailjs.init("8cCVvLyZS8pIqTYh8")
    } catch (error) {
      console.error("EmailJS initialization error:", error)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "" || !isValidEmail(formData.email),
      subject: formData.subject.trim() === "",
      message: formData.message.trim() === "",
    }

    setFormErrors(errors)

    return !Object.values(errors).some((error) => error)
  }

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Get current date and time for the template
      const now = new Date()
      const formattedTime = now.toLocaleString()
      const currentYear = now.getFullYear()

      const result = await emailjs.send(
        "service_xcne9yz",
        "template_ad01u4v",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: formattedTime,
          year: currentYear,
          company: "Suman Thapa",
        },
        "8cCVvLyZS8pIqTYh8",
      )

      console.log("Email sent successfully:", result)

      if (result.text === "OK") {
        setIsSuccess(true)
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error: any) {
      console.error("Error sending message:", error)

      // Provide error message
      let errorMsg = "Failed to send message. Please try again later."
      if (error.text) {
        errorMsg = `Error: ${error.text}`
      } else if (error.message) {
        errorMsg = error.message
      }

      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return null
  }

  if (isSuccess) {
    return (
      <motion.div
        className="success-message"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Message Sent Successfully!
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Thank you for reaching out. I'll get back to you soon.
        </motion.p>
        <motion.a
          href="#home"
          className="cta-button"
          onClick={(e) => {
            e.preventDefault()
            window.location.hash = "home"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{
            y: -5,
            boxShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
          }}
        >
          RETURN HOME
        </motion.a>
      </motion.div>
    )
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="page contact-page">
      <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        Get In Touch
      </motion.h2>

      {errorMessage && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 45, 117, 0.1)",
            border: "1px solid var(--accent)",
            borderRadius: "4px",
            color: "var(--accent)",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </motion.div>
      )}

      <motion.form
        id="contact-form"
        className="contact-form"
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && (
            <div className="form-error" style={{ display: "block" }}>
              Please enter your name
            </div>
          )}
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <div className="form-error" style={{ display: "block" }}>
              Please enter a valid email
            </div>
          )}
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          {formErrors.subject && (
            <div className="form-error" style={{ display: "block" }}>
              Please enter a subject
            </div>
          )}
        </motion.div>

        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.message && (
            <div className="form-error" style={{ display: "block" }}>
              Please enter a message
            </div>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="cta-button"
          disabled={isSubmitting}
          variants={itemVariants}
          whileHover={{
            y: -5,
            boxShadow: "0 0 20px rgba(0, 255, 204, 0.5)",
          }}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner-small"></span> SENDING...
            </>
          ) : (
            "SEND MESSAGE"
          )}
        </motion.button>
      </motion.form>
    </div>
  )
}
