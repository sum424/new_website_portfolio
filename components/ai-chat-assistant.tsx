"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Bot, Maximize2, Minimize2 } from "lucide-react"

// Predefined responses for common questions
const predefinedResponses = {
  greetings: [
    "Hello! I'm Suman's AI assistant. How can I help you today?",
    "Hi there! I'm here to answer questions about Suman's work and skills. What would you like to know?",
    "Welcome! I'm an AI assistant that can tell you about Suman's projects and experience. What are you interested in learning?",
  ],
  skills: [
    "Suman is skilled in frontend development with expertise in React, JavaScript (ES6+), HTML5, CSS3, Three.js, and GSAP. He also has experience with Node.js and various CSS frameworks like Tailwind and Bootstrap.",
    "Suman's core skills include React, Three.js for 3D web experiences, GSAP for animations, and modern JavaScript. He's also familiar with backend technologies and has a solid foundation in computer science.",
  ],
  experience: [
    "Suman worked as a Frontend Developer at Tech Community Nepal from April 2022 to March 2024, where he developed user interfaces and created immersive 3D web experiences. Before that, he was a Frontend Intern at Stylus Technology from September 2021 to March 2022.",
    "Suman has over 2 years of professional experience in frontend development, focusing on creating responsive, user-centered interfaces and interactive web applications.",
  ],
  education: [
    "Suman has a BSc. Hons in Computing from The British College in Kathmandu, Nepal (2017-2022). He's currently pursuing a Post Graduate Degree in Full Stack Software Development at Lambton College in Ottawa, Ontario (2024-2026).",
    "Suman graduated with Honours in Computing, specializing in software engineering, web development, and project management. He's now furthering his education in Full Stack development.",
  ],
  projects: [
    "Suman has worked on several notable projects including interactive 3D web experiences, data visualization platforms, and responsive web applications. You can see examples in the Projects section of this portfolio.",
    "Some of Suman's key projects include Quantum Interface (a next-gen UI system), Nexus Dashboard (a data visualization platform), and AR Navigation (an augmented reality wayfinding system).",
  ],
  contact: [
    "You can contact Suman through the Contact form on this website, or directly via email at sumanthapa326@gmail.com.",
    "The best way to reach Suman is through email at sumanthapa326@gmail.com or by using the Contact form on this website.",
  ],
  threejs: [
    "Suman has extensive experience with Three.js, creating immersive 3D web experiences with interactive elements, custom shaders, and optimized performance. You can see examples in his portfolio.",
    "Three.js is one of Suman's core skills. He's used it to create 3D visualizations, interactive models, and immersive web experiences with a focus on performance and user engagement.",
  ],
  gsap: [
    "Suman is proficient with GSAP (GreenSock Animation Platform) for creating high-performance animations and transitions. He's used it in combination with React and Three.js for enhanced user experiences.",
    "GSAP is a key part of Suman's toolkit for creating smooth, engaging animations. He's experienced with timelines, scroll triggers, and advanced animation techniques.",
  ],
  fallback: [
    "I don't have specific information about that, but you can ask Suman directly through the Contact form.",
    "That's an interesting question! You might want to reach out to Suman directly for more details.",
    "I don't have that information at hand. Would you like to know about Suman's skills, experience, or projects instead?",
  ],
}

// Function to get a response based on the user's message
function getAIResponse(message) {
  const lowerCaseMessage = message.toLowerCase()

  // Check for greetings
  if (
    lowerCaseMessage.includes("hello") ||
    lowerCaseMessage.includes("hi") ||
    lowerCaseMessage.includes("hey") ||
    lowerCaseMessage.includes("greetings")
  ) {
    return getRandomResponse("greetings")
  }

  // Check for skills questions
  if (
    lowerCaseMessage.includes("skills") ||
    lowerCaseMessage.includes("what can you do") ||
    lowerCaseMessage.includes("technologies") ||
    lowerCaseMessage.includes("tech stack")
  ) {
    return getRandomResponse("skills")
  }

  // Check for experience questions
  if (
    lowerCaseMessage.includes("experience") ||
    lowerCaseMessage.includes("work history") ||
    lowerCaseMessage.includes("background") ||
    lowerCaseMessage.includes("career")
  ) {
    return getRandomResponse("experience")
  }

  // Check for education questions
  if (
    lowerCaseMessage.includes("education") ||
    lowerCaseMessage.includes("degree") ||
    lowerCaseMessage.includes("study") ||
    lowerCaseMessage.includes("college") ||
    lowerCaseMessage.includes("university")
  ) {
    return getRandomResponse("education")
  }

  // Check for project questions
  if (
    lowerCaseMessage.includes("project") ||
    lowerCaseMessage.includes("portfolio") ||
    lowerCaseMessage.includes("work") ||
    lowerCaseMessage.includes("showcase")
  ) {
    return getRandomResponse("projects")
  }

  // Check for contact questions
  if (
    lowerCaseMessage.includes("contact") ||
    lowerCaseMessage.includes("email") ||
    lowerCaseMessage.includes("reach") ||
    lowerCaseMessage.includes("get in touch")
  ) {
    return getRandomResponse("contact")
  }

  // Check for Three.js questions
  if (
    lowerCaseMessage.includes("three.js") ||
    lowerCaseMessage.includes("threejs") ||
    lowerCaseMessage.includes("3d") ||
    lowerCaseMessage.includes("webgl")
  ) {
    return getRandomResponse("threejs")
  }

  // Check for GSAP questions
  if (
    lowerCaseMessage.includes("gsap") ||
    lowerCaseMessage.includes("greensock") ||
    lowerCaseMessage.includes("animation")
  ) {
    return getRandomResponse("gsap")
  }

  // Fallback response
  return getRandomResponse("fallback")
}

// Function to get a random response from a category
function getRandomResponse(category) {
  const responses = predefinedResponses[category]
  const randomIndex = Math.floor(Math.random() * responses.length)
  return responses[randomIndex]
}

// Message Component
function Message({ message, isUser }) {
  return (
    <motion.div
      className={`chat-message ${isUser ? "user-message" : "ai-message"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-avatar">{isUser ? <User size={20} /> : <Bot size={20} />}</div>
      <div className="message-content">
        <p>{message}</p>
        <span className="message-time">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  )
}

// Suggested Questions Component
function SuggestedQuestions({ onSelectQuestion }) {
  const questions = [
    "What skills does Suman have?",
    "Tell me about Suman's experience",
    "What projects has Suman worked on?",
    "How can I contact Suman?",
    "What is Suman's education background?",
  ]

  return (
    <div className="suggested-questions">
      <p>Suggested questions:</p>
      <div className="question-buttons">
        {questions.map((question, index) => (
          <button key={index} onClick={() => onSelectQuestion(question)}>
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

// Main Chat Assistant Component
export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Add initial greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([
          {
            text: "Hi there! I'm Suman's AI assistant. How can I help you today?",
            isUser: false,
          },
        ])
        setIsTyping(false)
      }, 1000)
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage = { text: inputValue, isUser: true }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInputValue("")

    // Simulate AI typing
    setIsTyping(true)

    // Get AI response after a delay
    setTimeout(() => {
      const aiResponse = { text: getAIResponse(userMessage.text), isUser: false }
      setMessages((prevMessages) => [...prevMessages, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInputValue(question)
    // Focus the input field
    document.getElementById("chat-input").focus()
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="chat-toggle-button"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={24} />
        <span className="sr-only">Toggle chat assistant</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-window ${isMinimized ? "minimized" : ""}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="chat-header">
              <div className="chat-title">
                <Bot size={20} />
                <span>AI Assistant</span>
              </div>
              <div className="chat-controls">
                <button onClick={toggleMinimize} className="minimize-button">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={toggleChat} className="close-button">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat body */}
            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <Message key={index} message={message.text} isUser={message.isUser} />
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="typing-indicator">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                  )}

                  {/* Empty div for scrolling to bottom */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested questions */}
                {messages.length < 3 && <SuggestedQuestions onSelectQuestion={handleSuggestedQuestion} />}

                {/* Chat input */}
                <div className="chat-input-container">
                  <input
                    id="chat-input"
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button onClick={handleSendMessage} disabled={inputValue.trim() === ""} className="send-button">
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
