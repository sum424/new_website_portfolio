"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"

export default function VoiceCommander({ navigateTo }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    let recognition = null

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      // Initialize speech recognition
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase()
        setTranscript(command)

        // Process commands
        if (command.includes("go to home") || command.includes("show home")) {
          setFeedback("Navigating to Home page...")
          navigateTo("home")
        } else if (
          command.includes("go to work") ||
          command.includes("show work") ||
          command.includes("show projects")
        ) {
          setFeedback("Navigating to Work page...")
          navigateTo("work")
        } else if (command.includes("go to about") || command.includes("show about")) {
          setFeedback("Navigating to About page...")
          navigateTo("about")
        } else if (command.includes("go to contact") || command.includes("show contact")) {
          setFeedback("Navigating to Contact page...")
          navigateTo("contact")
        } else {
          setFeedback(`Command not recognized: "${command}"`)
        }

        // Stop listening after processing command
        setIsListening(false)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setFeedback(`Error: ${event.error}`)
        setIsListening(false)
      }
    }

    // Start/stop recognition based on isListening state
    if (isListening && recognition) {
      recognition.start()
      setFeedback("Listening for commands...")
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [isListening, navigateTo])

  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setFeedback("Speech recognition not supported in this browser")
      return
    }

    setIsListening(!isListening)
    if (!isListening) {
      setTranscript("")
    }
  }

  return (
    <div className="voice-commander">
      <motion.button
        className={`voice-button ${isListening ? "listening" : ""}`}
        onClick={toggleListening}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
      </motion.button>

      {(isListening || feedback) && (
        <motion.div
          className="voice-feedback"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {isListening && <div className="listening-indicator">Listening...</div>}
          {transcript && <div className="transcript">"{transcript}"</div>}
          {feedback && <div className="feedback-message">{feedback}</div>}
        </motion.div>
      )}
    </div>
  )
}
