"use client"

import { useState } from "react"

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thanks for your message! This is an AI assistant placeholder. You can integrate it with your preferred AI service.",
          sender: "bot",
        },
      ])
    }, 500)
  }

  return (
    <div style={{ position: "fixed", bottom: "100px", right: "40px", zIndex: 10 }}>
      {isOpen ? (
        <div
          className="card bg-dark border-info"
          style={{ width: "350px", maxHeight: "500px", display: "flex", flexDirection: "column" }}
        >
          <div className="card-header bg-info text-dark fw-bold d-flex justify-content-between align-items-center">
            AI Assistant
            <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
          </div>
          <div className="card-body overflow-auto flex-grow-1" style={{ minHeight: "300px" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 rounded ${msg.sender === "user" ? "bg-info text-dark" : "bg-secondary text-light"}`}
                  style={{ maxWidth: "80%" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer bg-dark border-top-info">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-dark text-light border-info"
                placeholder="Type message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="btn btn-info text-dark" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn rounded-circle"
          style={{ width: "60px", height: "60px", background: "#00a8ff", border: "none" }}
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-comments" style={{ fontSize: "1.5rem" }}></i>
        </button>
      )}
    </div>
  )
}
