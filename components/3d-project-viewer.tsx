"use client"

import { useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url)

  const clonedScene = scene.clone()
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  useFrame(() => {
    clonedScene.rotation.y += 0.005
  })

  return <primitive object={clonedScene} scale={scale} position={position} rotation={rotation} />
}

// Preload the GLB model (optional but recommended)
if (typeof window !== "undefined") {
  useGLTF.preload("/assets/3d/project-placeholder.glb")
}

export default function ProjectViewer({ project }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="project-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <div className="project-info-panel">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={`${tag}-${i}`} className="tag">
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
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
            <Model
              url={project.modelUrl || "/assets/3d/project-placeholder.glb"}
              scale={project.modelScale || 1}
            />
            <Environment preset="city" />
            <OrbitControls enableZoom enablePan />
          </Canvas>
        )}
      </div>
    </motion.div>
  )
}
