"use client"

import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management and payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://via.placeholder.com/400x250?text=E-Commerce",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Intelligent chatbot powered by machine learning with natural language processing capabilities.",
    tags: ["React", "Python", "TensorFlow", "WebSocket"],
    image: "https://via.placeholder.com/400x250?text=AI+Chat",
  },
  {
    id: 3,
    title: "3D Data Visualization",
    description: "Interactive 3D data visualization dashboard for complex datasets and analytics.",
    tags: ["Three.js", "React", "D3.js", "WebGL"],
    image: "https://via.placeholder.com/400x250?text=3D+Viz",
  },
  {
    id: 4,
    title: "Mobile Weather App",
    description: "Cross-platform mobile application with real-time weather data and notifications.",
    tags: ["React Native", "Redux", "Firebase", "Maps API"],
    image: "https://via.placeholder.com/400x250?text=Weather+App",
  },
]

export default function WorkPage() {
  return (
    <motion.div
      className="work-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="display-4 fw-bold mb-5"
        style={{ fontFamily: "Orbitron, monospace", letterSpacing: "2px", color: "#00a8ff" }}
      >
        FEATURED PROJECTS
      </h2>

      <div className="row g-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card h-100 bg-dark border-info" style={{ borderWidth: "2px", transition: "all 0.3s" }}>
              <img src={project.image || "/placeholder.svg"} className="card-img-top" alt={project.title} />
              <div className="card-body">
                <h5 className="card-title fw-bold" style={{ color: "#00FF00" }}>
                  {project.title}
                </h5>
                <p className="card-text" style={{ color: "#e6f1ff" }}>
                  {project.description}
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="badge bg-info" style={{ color: "#000" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-sm btn-outline-info w-100">View Project</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
