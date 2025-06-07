"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Text, Line, PerspectiveCamera } from "@react-three/drei"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Briefcase, GraduationCap } from "lucide-react"

// Timeline Node Component
function TimelineNode({ data, position, isActive, onClick }) {
  const nodeRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [fontError, setFontError] = useState(false)

  useEffect(() => {
    if (nodeRef.current) {
      // Animation for active state
      gsap.to(nodeRef.current.scale, {
        x: isActive ? 1.5 : 1,
        y: isActive ? 1.5 : 1,
        z: isActive ? 1.5 : 1,
        duration: 0.5,
        ease: "power2.out",
      })

      // Animation for hover state
      if (hovered && !isActive) {
        gsap.to(nodeRef.current.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.3,
          ease: "power2.out",
        })
      } else if (!hovered && !isActive) {
        gsap.to(nodeRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  }, [hovered, isActive])

  const color = data.type === "education" ? "#00ffcc" : "#00a8ff"

  return (
    <group position={position}>
      <mesh
        ref={nodeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(data)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : hovered ? 0.5 : 0.2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Orbitron_Regular.json"
        onError={(e) => {
          console.error("Error loading font:", e)
          setFontError(true)
        }}
      >
        {data.year}
      </Text>
    </group>
  )
}

// Timeline Path Component
function TimelinePath({ nodes }) {
  const points = nodes.map((node) => node.position)

  return (
    <Line
      points={points}
      color="#ffffff"
      lineWidth={1}
      dashed={true}
      dashSize={0.2}
      dashOffset={0}
      dashScale={1}
      opacity={0.5}
    />
  )
}

// Camera Controller
function CameraController({ target, isMoving }) {
  const { camera } = useThree()
  const currentPos = useRef(camera.position.clone())

  useEffect(() => {
    if (target && !isMoving) {
      gsap.to(camera.position, {
        x: target.x,
        y: target.y + 1,
        z: target.z + 5,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(target.x, target.y, target.z)
        },
      })
    }
  }, [camera, target, isMoving])

  return null
}

// Main Timeline Component
export default function CareerTimeline() {
  const [activeNode, setActiveNode] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  const [cameraTarget, setCameraTarget] = useState({ x: 0, y: 0, z: 0 })

  // Timeline data
  const timelineData = [
    {
      id: 1,
      year: "2017",
      title: "Started BSc. Hons Computing",
      institution: "British College, Kathmandu",
      description: "Began my journey in computer science, focusing on software engineering and web development.",
      type: "education",
      position: [-10, 0, 0],
    },
    {
      id: 2,
      year: "2021",
      title: "Frontend Intern",
      institution: "Stylus Technology, Lalitpur",
      description:
        "Supported frontend development efforts, working on UI enhancements and gaining exposure to Agile methodologies.",
      type: "work",
      position: [-5, 0, 0],
    },
    {
      id: 3,
      year: "2022",
      title: "Graduated with Honours",
      institution: "British College, Kathmandu",
      description:
        "Completed BSc. Hons Computing with a focus on software engineering, web development, and project management.",
      type: "education",
      position: [0, 0, 0],
    },
    {
      id: 4,
      year: "2022",
      title: "Frontend Developer",
      institution: "Tech Community Nepal",
      description:
        "Developed user interfaces for web applications, focusing on seamless user experiences and interactive features.",
      type: "work",
      position: [5, 0, 0],
    },
    {
      id: 5,
      year: "2024",
      title: "Post Graduate Studies",
      institution: "Lambton College, Ottawa",
      description:
        "Pursuing Full Stack Software Development with focus on advanced web technologies and project management.",
      type: "education",
      position: [10, 0, 0],
    },
  ]

  const handleNodeClick = (node) => {
    setActiveNode(node)
    setCameraTarget({ x: node.position[0], y: node.position[1], z: node.position[2] })
  }

  const navigateTimeline = (direction) => {
    setIsMoving(true)

    const currentIndex = activeNode ? timelineData.findIndex((node) => node.id === activeNode.id) : -1

    let newIndex
    if (direction === "next") {
      newIndex = currentIndex < timelineData.length - 1 ? currentIndex + 1 : 0
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : timelineData.length - 1
    }

    const newNode = timelineData[newIndex]
    setActiveNode(newNode)
    setCameraTarget({ x: newNode.position[0], y: newNode.position[1], z: newNode.position[2] })

    setTimeout(() => {
      setIsMoving(false)
    }, 100)
  }

  return (
    <div className="career-timeline-container">
      <div className="timeline-header">
        <h2>Career Journey</h2>
        <p>Navigate through my professional and educational milestones</p>
      </div>

      <div className="timeline-canvas">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Timeline nodes */}
          {timelineData.map((node) => (
            <TimelineNode
              key={node.id}
              data={node}
              position={node.position}
              isActive={activeNode && activeNode.id === node.id}
              onClick={handleNodeClick}
            />
          ))}

          {/* Timeline path */}
          <TimelinePath nodes={timelineData} />

          {/* Camera controller */}
          <CameraController target={cameraTarget} isMoving={isMoving} />

          <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={60} />
        </Canvas>
      </div>

      <div className="timeline-navigation">
        <button className="nav-button prev" onClick={() => navigateTimeline("prev")}>
          <ChevronLeft size={24} />
        </button>
        <button className="nav-button next" onClick={() => navigateTimeline("next")}>
          <ChevronRight size={24} />
        </button>
      </div>

      {activeNode && (
        <motion.div
          className="timeline-detail-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="timeline-card-header">
            <div className="timeline-icon">
              {activeNode.type === "education" ? <GraduationCap size={24} /> : <Briefcase size={24} />}
            </div>
            <div className="timeline-title">
              <h3>{activeNode.title}</h3>
              <div className="timeline-subtitle">
                <span className="timeline-institution">{activeNode.institution}</span>
                <span className="timeline-year">
                  <Calendar size={14} />
                  {activeNode.year}
                </span>
              </div>
            </div>
          </div>
          <div className="timeline-card-content">
            <p>{activeNode.description}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
