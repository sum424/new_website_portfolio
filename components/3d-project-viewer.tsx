"use client"

import { useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { motion } from "framer-motion"

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url)

  useFrame((state) => {
    scene.rotation.y += 0.005
  })

  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />
}

export default function ProjectViewer({ project }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div className="project-viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="project-info-panel">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <a href={project.liveUrl} className="cta-button" target="_blank" rel="noopener noreferrer">
          VIEW PROJECT
        </a>
      </div>

      <div className="project-3d-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading 3D Model...</p>
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model url={project.modelUrl || "/assets/3d/project-placeholder.glb"} scale={project.modelScale || 1} />
            <Environment preset="city" />
            <OrbitControls enableZoom={true} enablePan={true} />
          </Canvas>
        )}
      </div>
    </motion.div>
  )
}
