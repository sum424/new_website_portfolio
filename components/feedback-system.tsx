"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, ThumbsUp } from "lucide-react"

export default function FeedbackSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState("general")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const feedbackRef = useRef(null)

  const feedbackTypes = [
    { id: "general", label: "General Feedback" },
    { id: "design", label: "Design" },
    { id: "content", label: "Content" },
    { id: "functionality", label: "Functionality" },
    { id: "suggestion", label: "Suggestion" },
  ]

  useEffect(() => {
    if (isOpen && feedbackRef.current) {
      // Ensure the feedback form is within viewport
      const rect = feedbackRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (rect.right > viewportWidth) {
        setPosition((prev) => ({ ...prev, x: prev.x - (rect.right - viewportWidth) - 20 }))
      }

      if (rect.bottom > viewportHeight) {
        setPosition((prev) => ({ ...prev, y: prev.y - (rect.bottom - viewportHeight) - 20 }))
      }
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", {
      type: feedbackType,
      message,
      position,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    })

    // Show success message
    setSubmitted(true)

    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setMessage("")
      setFeedbackType("general")
    }, 3000)
  }

  return (
    <>
      <motion.button
        className="feedback-button"
        onClick={(e) => {
          setIsOpen(!isOpen)
          setPosition({ x: e.clientX, y: e.clientY })
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={feedbackRef}
            className="feedback-form"
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>

            {submitted ? (
              <div className="success-message">
                <ThumbsUp size={40} />
                <h4>Thank you for your feedback!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Share Your Thoughts</h3>

                <div className="feedback-type-selector">
                  {feedbackTypes.map((type) => (
                    <label key={type.id} className={feedbackType === type.id ? "selected" : ""}>
                      <input
                        type="radio"
                        name="feedbackType"
                        value={type.id}
                        checked={feedbackType === type.id}
                        onChange={() => setFeedbackType(type.id)}
                      />
                      {type.label}
                    </label>
                  ))}
                </div>

                <textarea
                  placeholder="Your feedback helps me improve..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>

                <button type="submit" className="submit-button">
                  <Send size={16} />
                  Send Feedback
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
