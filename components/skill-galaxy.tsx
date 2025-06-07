"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Html, Stars } from "@react-three/drei"
import { gsap } from "gsap"
import * as THREE from "three"

// Skill Planet Component
function SkillPlanet({ skill, position, size, color, onClick }) {
  const planetRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [textureError, setTextureError] = useState(false)

  // State to hold the texture
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    // Load the texture and handle errors
    const loadTexture = async () => {
      try {
        const newTexture = await new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            const tex = new THREE.TextureLoader().load(
              `/assets/textures/${skill.category}.jpg`,
              (tex) => resolve(tex),
              undefined,
              (error) => {
                console.error(`Error loading texture for ${skill.category}:`, error)
                setTextureError(true)
                reject(error)
              },
            )
          }
          img.onerror = (error) => {
            console.error(`Error loading image for ${skill.category}:`, error)
            setTextureError(true)
            reject(error)
          }
          img.src = `/assets/textures/${skill.category}.jpg`
        })
        setTexture(newTexture)
      } catch (error) {
        console.error(`Error loading texture for ${skill.category}:`, error)
        setTextureError(true)
      }
    }

    loadTexture()
  }, [skill.category])

  useFrame(() => {
    if (planetRef.current) {
      // Rotate the planet
      planetRef.current.rotation.y += 0.005

      // Add a slight wobble
      planetRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  useEffect(() => {
    if (planetRef.current) {
      // Hover animation
      if (hovered) {
        gsap.to(planetRef.current.scale, {
          x: size * 1.2,
          y: size * 1.2,
          z: size * 1.2,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        gsap.to(planetRef.current.scale, {
          x: size,
          y: size,
          z: size,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  }, [hovered, size])

  const handleClick = () => {
    setClicked(!clicked)
    onClick(skill)
  }

  return (
    <group position={position}>
      <mesh
        ref={planetRef}
        scale={[size, size, size]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={textureError ? null : texture}
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Skill name label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron_Regular.json"
      >
        {skill.name}
      </Text>

      {/* Skill details panel */}
      {clicked && (
        <Html position={[0, 0, 0]} center distanceFactor={10}>
          <div className="skill-detail-panel">
            <h3>{skill.name}</h3>
            <div className="skill-level">
              <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
            </div>
            <p>{skill.description}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Skill Galaxy Component
export default function SkillGalaxy() {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const galaxyRef = useRef()

  // Define skills with categories
  const skills = [
    {
      name: "React",
      category: "frontend",
      level: 90,
      description:
        "Expert in React for building interactive UIs with component-based architecture, hooks, and state management.",
      color: "#61dafb",
      position: [-4, 2, 0],
      size: 1.2,
    },
    {
      name: "Three.js",
      category: "graphics",
      level: 85,
      description:
        "Proficient in creating immersive 3D web experiences with scene setup, lighting, and interactive elements.",
      color: "#049ef4",
      position: [0, 0, -3],
      size: 1.3,
    },
    {
      name: "GSAP",
      category: "animation",
      level: 80,
      description: "Skilled in creating high-performance animations and transitions for enhanced user experiences.",
      color: "#88ce02",
      position: [4, 1, 0],
      size: 1.1,
    },
    {
      name: "JavaScript",
      category: "frontend",
      level: 95,
      description:
        "Expert in modern JavaScript (ES6+) with deep understanding of asynchronous programming and DOM manipulation.",
      color: "#f7df1e",
      position: [2, -2, 2],
      size: 1.4,
    },
    {
      name: "HTML/CSS",
      category: "frontend",
      level: 90,
      description:
        "Strong expertise in semantic HTML and advanced CSS including animations, layouts, and responsive design.",
      color: "#e34c26",
      position: [-3, -1, 3],
      size: 1.0,
    },
    {
      name: "Node.js",
      category: "backend",
      level: 75,
      description: "Experienced in server-side JavaScript for building scalable backend services and APIs.",
      color: "#3c873a",
      position: [0, 3, 2],
      size: 0.9,
    },
    {
      name: "WebGL",
      category: "graphics",
      level: 70,
      description:
        "Knowledgeable in WebGL for creating hardware-accelerated graphics and visual effects in the browser.",
      color: "#990000",
      position: [-2, 0, -4],
      size: 0.8,
    },
  ]

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
  }

  useFrame(() => {
    if (galaxyRef.current) {
      // Slowly rotate the entire galaxy
      galaxyRef.current.rotation.y += 0.001
    }
  })

  return (
    <div className="skill-galaxy-container">
      <div className="galaxy-header">
        <h2>Skill Galaxy</h2>
        <p>Explore my skills in this interactive 3D visualization</p>
      </div>

      <div className="galaxy-canvas">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <group ref={galaxyRef}>
            {skills.map((skill, index) => (
              <SkillPlanet
                key={index}
                skill={skill}
                position={skill.position}
                size={skill.size}
                color={skill.color}
                onClick={handleSkillClick}
              />
            ))}
          </group>
        </Canvas>
      </div>

      {selectedSkill && (
        <div className="selected-skill-info">
          <h3>{selectedSkill.name}</h3>
          <div className="skill-level-indicator">
            <div className="skill-level-bar">
              <div className="skill-level-fill" style={{ width: `${selectedSkill.level}%` }}></div>
            </div>
            <span className="skill-level-percentage">{selectedSkill.level}%</span>
          </div>
          <p>{selectedSkill.description}</p>
        </div>
      )}
    </div>
  )
}
