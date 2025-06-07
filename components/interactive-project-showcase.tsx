"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Text, Html } from "@react-three/drei"
import { gsap } from "gsap"
import { Laptop, ExternalLink, Github } from "lucide-react"

// Project Model component
function ProjectModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], onClick }) {
  const [modelError, setModelError] = useState(false)
  const { scene } = useGLTF(url, undefined, (error) => {
    console.error(`Error loading model from ${url}:`, error)
    setModelError(true)
  })
  const modelRef = useRef()
  const { camera } = useThree()

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  useEffect(() => {
    if (modelRef.current) {
      // Add hover animation
      const hoverAnimation = gsap.timeline({ paused: true })
      hoverAnimation.to(modelRef.current.position, {
        y: position[1] + 0.3,
        duration: 0.5,
        ease: "power2.out",
      })

      // Add event listeners
      const model = modelRef.current
      model.userData.hoverAnimation = hoverAnimation
      model.userData.isHovering = false

      const onPointerOver = () => {
        document.body.style.cursor = "pointer"
        model.userData.isHovering = true
        model.userData.hoverAnimation.play()
      }

      const onPointerOut = () => {
        document.body.style.cursor = "auto"
        model.userData.isHovering = false
        model.userData.hoverAnimation.reverse()
      }

      model.traverse((child) => {
        if (child.isMesh) {
          child.addEventListener("pointerover", onPointerOver)
          child.addEventListener("pointerout", onPointerOut)
          child.addEventListener("click", onClick)
        }
      })

      return () => {
        model.traverse((child) => {
          if (child.isMesh) {
            child.removeEventListener("pointerover", onPointerOver)
            child.removeEventListener("pointerout", onPointerOut)
            child.removeEventListener("click", onClick)
          }
        })
      }
    }
  }, [modelRef, position, onClick])

  // If there's an error loading the model, render a fallback cube
  if (modelError) {
    return (
      <mesh
        position={position}
        scale={scale}
        rotation={rotation}
        onClick={onClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00a8ff" />
      </mesh>
    )
  }

  return <primitive ref={modelRef} object={scene} scale={scale} position={position} rotation={rotation} />
}

// Project Info Panel
function ProjectInfoPanel({ project, isVisible, onClose }) {
  return (
    <Html position={[0, 0, 0]} center portal={false} distanceFactor={10}>
      {isVisible && (
        <motion.div
          className="project-info-panel"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="project-info-header">
            <h3>{project.title}</h3>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="project-info-content">
            <p>{project.description}</p>
            <div className="project-tech">
              <h4>Technologies</h4>
              <div className="tech-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <Github size={16} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </Html>
  )
}

// Main component
export default function InteractiveProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const controlsRef = useRef()

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Quantum Interface",
      description:
        "A next-generation UI system with neural network integration and holographic display technology. This project showcases advanced 3D visualization techniques and interactive user interfaces.",
      tags: ["Three.js", "React", "WebGL", "GSAP"],
      modelUrl: "/assets/3d/duck.glb", // Using the available duck model
      position: [-4, 0, 0],
      scale: 1.2,
      liveUrl: "https://example.com/quantum",
      githubUrl: "https://github.com/example/quantum",
    },
    {
      id: 2,
      title: "Nexus Dashboard",
      description:
        "Real-time data visualization platform with 3D analytics and predictive modeling. Features interactive charts, customizable widgets, and AI-powered insights for business intelligence.",
      tags: ["D3.js", "React", "Node.js", "MongoDB"],
      modelUrl: "/assets/3d/duck.glb", // Using the available duck model
      position: [0, 0, 0],
      scale: 1,
      liveUrl: "https://example.com/nexus",
      githubUrl: "https://github.com/example/nexus",
    },
    {
      id: 3,
      title: "AR Navigation",
      description:
        "Augmented reality wayfinding system for complex indoor environments. Uses spatial mapping and computer vision to provide intuitive navigation guidance through challenging spaces.",
      tags: ["AR.js", "Three.js", "WebXR", "TensorFlow"],
      modelUrl: "/assets/3d/duck.glb", // Using the available duck model
      position: [4, 0, 0],
      scale: 0.8,
      liveUrl: "https://example.com/ar-nav",
      githubUrl: "https://github.com/example/ar-nav",
    },
  ]

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsInfoVisible(true)

    // Animate camera to focus on the selected project
    if (controlsRef.current) {
      controlsRef.current.target.set(...project.position)
      controlsRef.current.update()
    }
  }

  const closeProjectInfo = () => {
    setIsInfoVisible(false)
  }

  return (
    <div className="interactive-project-showcase">
      <div className="showcase-header">
        <h2>Interactive Projects</h2>
        <p>Click on a project to explore details</p>
      </div>

      <div className="showcase-container">
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <Environment preset="city" />

          {/* Project Models */}
          {projects.map((project) => (
            <ProjectModel
              key={project.id}
              url={project.modelUrl}
              scale={project.scale}
              position={project.position}
              onClick={() => handleProjectClick(project)}
            />
          ))}

          {/* Project Labels */}
          {projects.map((project) => (
            <Text
              key={`label-${project.id}`}
              position={[project.position[0], project.position[1] - 1.5, project.position[2]]}
              fontSize={0.3}
              color="#00ffcc"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Orbitron_Regular.json"
            >
              {project.title}
            </Text>
          ))}

          {/* Project Info Panel */}
          {selectedProject && (
            <ProjectInfoPanel project={selectedProject} isVisible={isInfoVisible} onClose={closeProjectInfo} />
          )}

          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            minDistance={3}
            maxDistance={20}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      <div className="showcase-instructions">
        <div className="instruction">
          <Laptop size={24} />
          <span>Drag to rotate view</span>
        </div>
        <div className="instruction">
          <span className="mouse-icon">🖱️</span>
          <span>Scroll to zoom</span>
        </div>
        <div className="instruction">
          <span className="tap-icon">👆</span>
          <span>Click on a project to view details</span>
        </div>
      </div>
    </div>
  )
}
