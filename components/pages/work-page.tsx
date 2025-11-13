"use client"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function WorkPage() {
  // Projects data
  const projectsData = [
    {
      title: "Quantum Interface",
      description: "Next-gen UI system with neural network integration and holographic display technology.",
      tags: ["Three.js", "AI", "WebGL"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "Nexus Dashboard",
      description: "Real-time data visualization platform with 3D analytics and predictive modeling.",
      tags: ["D3.js", "React", "Node.js"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "AR Navigation",
      description: "Augmented reality wayfinding system for complex indoor environments.",
      tags: ["ARCore", "Unity", "ARKit"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "Neural Network",
      description: "Machine learning platform for real-time pattern recognition and prediction.",
      tags: ["Python", "TensorFlow", "Keras"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="page work-page">
      <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        Selected Works
      </motion.h2>

      <motion.div className="projects-grid" variants={containerVariants} initial="hidden" animate="visible">
        {projectsData.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              boxShadow: "0 10px 30px rgba(0, 168, 255, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    className="tag"
                    key={tagIndex}
                    whileHover={{
                      backgroundColor: "rgba(0, 168, 255, 0.3)",
                      scale: 1.05,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <a href={project.link} className="view-project" target="_blank" rel="noopener noreferrer">
                <span>View Project</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
