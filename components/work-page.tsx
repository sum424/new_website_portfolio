"use client"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export default function WorkPage() {
  // Projects data
  const projectsData = [
    {
      title: "Sryngar Ecommerce",
      description: "Ecommerce Application with Dashboard for system analytics.",
      tags: ["HTML", "CSS", "PHP", "JavaScript"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "SortCut Nepal",
      description: "Classified web application with multi-layered web apps inside. ",
      tags: ["PHP", "Laravel", "HTML", "Css", "JavaScript", "Vue.js", "Bootstrap"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "PUBG Tournament",
      description: "A Tournament management system build in compatible with OBS Studio.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "GSAP"],
      imageUrl: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      title: "Bakes N Cakes",
      description: "A cake shop web application built for customers's feature of buying with unlimited customizations.",
      tags: ["PHP", "JavaScript", "HTML", "CSS", "Bootstrap"],
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
              {/* <a href={project.link} className="view-project" target="_blank" rel="noopener noreferrer">
                <span>View Project</span>
                <ExternalLink size={16} />
              </a> */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
