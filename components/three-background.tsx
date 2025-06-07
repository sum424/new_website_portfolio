"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Define full-stack terms with categories
    const terms = [
      { text: "HTML5", category: "frontend" },
      { text: "CSS3", category: "frontend" },
      { text: "JavaScript", category: "frontend" },
      { text: "React", category: "frontend" },
      { text: "Three.js", category: "frontend" },
      { text: "Node.js", category: "backend" },
      { text: "Express", category: "backend" },
      { text: "MongoDB", category: "database" },
      { text: "GraphQL", category: "api" },
      { text: "WebGL", category: "graphics" },
      { text: "WebRTC", category: "communication" },
      { text: "TensorFlow", category: "ai" },
      { text: "Docker", category: "devops" },
      { text: "Kubernetes", category: "devops" },
      { text: "WebAssembly", category: "performance" },
    ]

    // Category colors
    const categoryColors = {
      frontend: 0x00a8ff, // Blue
      backend: 0x00ffcc, // Teal
      database: 0xff2d75, // Pink
      api: 0xff9f43, // Orange
      graphics: 0x6f42c1, // Purple
      communication: 0x20c997, // Green
      ai: 0xf06595, // Light pink
      devops: 0x495057, // Gray
      performance: 0xfa5252, // Red
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

    camera.position.z = 8

    // Create floating text meshes
    const fontLoader = new FontLoader()
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textMeshes: THREE.Mesh[] = []

      terms.forEach((term) => {
        const geometry = new TextGeometry(term.text, {
          font: font,
          size: 0.15 + Math.random() * 0.1,
          height: 0.02,
          curveSegments: 8,
        })

        // Use category-based colors
        const color = categoryColors[term.category as keyof typeof categoryColors] || 0x00a8ff
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.8,
        })

        const textMesh = new THREE.Mesh(geometry, material)

        // Randomize position in a sphere
        const radius = 5 + Math.random() * 5
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI

        textMesh.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        )

        // Random rotation
        textMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

        // Store original position for animation
        textMesh.userData = {
          originalPosition: textMesh.position.clone(),
          speed: 0.1 + Math.random() * 0.3,
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
          ),
        }

        scene.add(textMesh)
        textMeshes.push(textMesh)
      })

      // Animation loop
      function animate() {
        requestAnimationFrame(animate)

        // Animate text meshes
        textMeshes.forEach((mesh) => {
          // Float animation
          const time = Date.now() * 0.001
          mesh.position.x = mesh.userData.originalPosition.x + Math.sin(time * mesh.userData.speed) * 0.5
          mesh.position.y = mesh.userData.originalPosition.y + Math.cos(time * mesh.userData.speed * 0.7) * 0.5

          // Rotation
          mesh.rotation.x += mesh.userData.rotationSpeed.x
          mesh.rotation.y += mesh.userData.rotationSpeed.y
        })

        renderer.render(scene, camera)
      }

      animate()
    })

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onWindowResize)

    return () => {
      window.removeEventListener("resize", onWindowResize)
      renderer.dispose()
    }
  }, [])

  return <canvas id="threejs-bg" ref={canvasRef}></canvas>
}
