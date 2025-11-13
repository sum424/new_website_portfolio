"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "Bootstrap", "CSS3", "HTML5"] },
    { category: "Backend", items: ["Node.js", "Python", "MongoDB", "PostgreSQL", "Express"] },
    { category: "3D & Graphics", items: ["Three.js", "WebGL", "Blender", "GLSL", "Canvas API"] },
    { category: "Tools & Platforms", items: ["Git", "Docker", "AWS", "Vercel", "Firebase"] },
  ]

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="display-4 fw-bold mb-5"
        style={{ fontFamily: "Orbitron, monospace", letterSpacing: "2px", color: "#00a8ff" }}
      >
        ABOUT ME
      </h2>

      <div className="row g-5">
        <div className="col-lg-6">
          <p className="lead mb-4" style={{ color: "#e6f1ff" }}>
            I'm a full-stack developer passionate about creating innovative digital experiences through cutting-edge
            technologies.
          </p>
          <p style={{ color: "#e6f1ff" }}>
            With expertise in React, Node.js, and 3D graphics, I build scalable applications that push the boundaries of
            web development. My focus is on combining aesthetics with functionality to create memorable user
            experiences.
          </p>
          <p style={{ color: "#e6f1ff" }}>
            When I'm not coding, I'm exploring new technologies, contributing to open-source projects, and continuously
            learning to stay ahead in this ever-evolving field.
          </p>
        </div>

        <div className="col-lg-6">
          <div className="row g-3">
            {skills.map((skillGroup, index) => (
              <div key={index} className="col-md-6">
                <div className="card bg-dark border-info">
                  <div className="card-body">
                    <h6 className="card-title fw-bold mb-3" style={{ color: "#00FF00" }}>
                      {skillGroup.category}
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span key={i} className="badge bg-info" style={{ color: "#000" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
