"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useTheme } from "@/components/theme-provider"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!canvasRef.current) return

    // Helper function to create a circle texture for particles
    const createCircleTexture = (color: string, size: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size

      const context = canvas.getContext("2d")
      if (!context) return null

      // Draw a circle
      const centerX = size / 2
      const centerY = size / 2
      const radius = size / 2 - 2

      context.beginPath()
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
      context.fillStyle = color
      context.fill()

      // Create soft edges
      const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      context.globalCompositeOperation = "source-atop"
      context.fillStyle = gradient
      context.fillRect(0, 0, size, size)

      const texture = new THREE.CanvasTexture(canvas)
      return texture
    }

    // Create planet texture
    const createPlanetTexture = (baseColor: string, size: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size

      const context = canvas.getContext("2d")
      if (!context) return null

      // Draw planet base
      const centerX = size / 2
      const centerY = size / 2
      const radius = size / 2 - 2

      // Create gradient for planet
      const gradient = context.createRadialGradient(
        centerX - radius / 3,
        centerY - radius / 3,
        0,
        centerX,
        centerY,
        radius,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.5, baseColor)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)")

      context.beginPath()
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
      context.fillStyle = gradient
      context.fill()

      // Add some random craters or features
      const features = Math.floor(Math.random() * 8) + 3
      for (let i = 0; i < features; i++) {
        const featureRadius = Math.random() * (radius / 5) + radius / 10
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * (radius - featureRadius)
        const featureX = centerX + Math.cos(angle) * distance
        const featureY = centerY + Math.sin(angle) * distance

        context.beginPath()
        context.arc(featureX, featureY, featureRadius, 0, 2 * Math.PI, false)
        context.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.3)`
        context.fill()
      }

      // Add glow
      const glowGradient = context.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.2)
      glowGradient.addColorStop(0, baseColor.replace(")", ", 0.3)").replace("rgb", "rgba"))
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      context.beginPath()
      context.arc(centerX, centerY, radius * 1.2, 0, 2 * Math.PI, false)
      context.fillStyle = glowGradient
      context.fill()

      const texture = new THREE.CanvasTexture(canvas)
      return texture
    }

    // Create comet texture
    const createCometTexture = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 128

      const context = canvas.getContext("2d")
      if (!context) return null

      // Create gradient for comet tail
      const gradient = context.createLinearGradient(0, 64, 512, 64)
      gradient.addColorStop(0, "rgba(0, 255, 255, 1)")
      gradient.addColorStop(0.1, "rgba(0, 255, 255, 0.8)")
      gradient.addColorStop(0.5, "rgba(0, 168, 255, 0.4)")
      gradient.addColorStop(1, "rgba(0, 168, 255, 0)")

      // Draw comet tail
      context.fillStyle = gradient
      context.beginPath()
      context.moveTo(0, 64)
      context.lineTo(512, 20)
      context.lineTo(512, 108)
      context.closePath()
      context.fill()

      // Draw comet head
      context.beginPath()
      context.arc(30, 64, 30, 0, Math.PI * 2)
      context.fillStyle = "rgba(255, 255, 255, 0.9)"
      context.fill()

      // Add glow to comet head
      const headGradient = context.createRadialGradient(30, 64, 0, 30, 64, 40)
      headGradient.addColorStop(0, "rgba(0, 255, 255, 0.8)")
      headGradient.addColorStop(0.5, "rgba(0, 255, 255, 0.4)")
      headGradient.addColorStop(1, "rgba(0, 255, 255, 0)")

      context.beginPath()
      context.arc(30, 64, 40, 0, Math.PI * 2)
      context.fillStyle = headGradient
      context.fill()

      const texture = new THREE.CanvasTexture(canvas)
      return texture
    }

    // Create spaceship texture
    const createSpaceshipTexture = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 128

      const context = canvas.getContext("2d")
      if (!context) return null

      // Draw spaceship body
      context.fillStyle = "rgba(50, 50, 70, 0.9)"
      context.beginPath()
      context.moveTo(128, 20) // Top point
      context.lineTo(200, 80) // Bottom right
      context.lineTo(56, 80) // Bottom left
      context.closePath()
      context.fill()

      // Draw cockpit
      context.fillStyle = "rgba(0, 168, 255, 0.7)"
      context.beginPath()
      context.arc(128, 50, 15, 0, Math.PI * 2)
      context.fill()

      // Draw wings
      context.fillStyle = "rgba(100, 100, 120, 0.9)"
      // Left wing
      context.beginPath()
      context.moveTo(80, 70)
      context.lineTo(40, 100)
      context.lineTo(70, 80)
      context.closePath()
      context.fill()
      // Right wing
      context.beginPath()
      context.moveTo(176, 70)
      context.lineTo(216, 100)
      context.lineTo(186, 80)
      context.closePath()
      context.fill()

      // Draw engine glow
      const engineGradient = context.createRadialGradient(128, 80, 0, 128, 80, 30)
      engineGradient.addColorStop(0, "rgba(255, 100, 0, 0.9)")
      engineGradient.addColorStop(0.5, "rgba(255, 50, 0, 0.5)")
      engineGradient.addColorStop(1, "rgba(255, 0, 0, 0)")

      context.beginPath()
      context.arc(128, 90, 20, 0, Math.PI, false)
      context.fillStyle = engineGradient
      context.fill()

      const texture = new THREE.CanvasTexture(canvas)
      return texture
    }

    // Define tech categories with space object types
    const techCategories = [
      { name: "frontend", color: "rgb(0, 168, 255)" }, // Blue
      { name: "backend", color: "rgb(0, 255, 204)" }, // Teal
      { name: "database", color: "rgb(255, 45, 117)" }, // Pink
      { name: "api", color: "rgb(255, 159, 67)" }, // Orange
      { name: "graphics", color: "rgb(111, 66, 193)" }, // Purple
      { name: "communication", color: "rgb(32, 201, 151)" }, // Green
      { name: "ai", color: "rgb(240, 101, 149)" }, // Light pink
      { name: "devops", color: "rgb(73, 80, 87)" }, // Gray
      { name: "performance", color: "rgb(250, 82, 82)" }, // Red
    ]

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

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

    // Create stars
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 10000
    const starVertices = []
    const starSizes = []

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 2000
      starVertices.push(x, y, z)

      // Initialize with random sizes
      starSizes.push(0.1 + Math.random() * 0.1)
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
    starGeometry.setAttribute("size", new THREE.Float32BufferAttribute(starSizes, 1))

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      transparent: true,
      sizeAttenuation: true,
      vertexColors: false,
      // Use the size attribute instead of a fixed size
      size: 1,
      map: createCircleTexture("#ffffff", 256),
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create nebula clouds
    const createNebula = () => {
      const geometry = new THREE.BufferGeometry()
      const vertices = []
      const sizes = []
      const colors = []

      const color = new THREE.Color()

      for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 200
        const y = (Math.random() - 0.5) * 200
        const z = (Math.random() - 0.5) * 200

        vertices.push(x, y, z)

        // Random size between 0.1 and 4
        sizes.push(0.1 + Math.random() * 4)

        // Random color
        const colorIndex = Math.floor(Math.random() * 5)
        if (colorIndex === 0)
          color.set(0x00a8ff) // Blue
        else if (colorIndex === 1)
          color.set(0x00ffcc) // Teal
        else if (colorIndex === 2)
          color.set(0xff2d75) // Pink
        else if (colorIndex === 3)
          color.set(0x6f42c1) // Purple
        else color.set(0x20c997) // Green

        colors.push(color.r, color.g, color.b)
      }

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1))
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: 1,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      })

      const nebula = new THREE.Points(geometry, material)
      return nebula
    }

    const nebula1 = createNebula()
    const nebula2 = createNebula()
    scene.add(nebula1, nebula2)

    // Create space objects (planets, asteroids) for tech terms
    const spaceObjects: THREE.Mesh[] = []

    // Create orbital tech terms as planets, asteroids, etc.
    terms.forEach((term) => {
      // Find the category color
      const category = techCategories.find((cat) => cat.name === term.category) || techCategories[0]

      // Determine object type based on category
      const objectType = Math.random() > 0.7 ? "asteroid" : "planet"

      let material, geometry

      if (objectType === "planet") {
        // Create a planet
        const planetTexture = createPlanetTexture(category.color, 512)
        material = new THREE.MeshBasicMaterial({
          map: planetTexture,
          transparent: true,
          side: THREE.DoubleSide,
        })

        // Size based on term length
        const size = 0.5 + term.text.length * 0.1
        geometry = new THREE.SphereGeometry(size, 32, 32)
      } else {
        // Create an asteroid (irregular shape)
        material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(category.color),
          transparent: true,
          opacity: 0.9,
        })

        // Create irregular geometry for asteroid
        const size = 0.3 + term.text.length * 0.05
        geometry = new THREE.DodecahedronGeometry(size, 0)

        // Distort the geometry to make it more irregular
        const positionAttribute = geometry.getAttribute("position")
        const vertex = new THREE.Vector3()

        for (let i = 0; i < positionAttribute.count; i++) {
          vertex.fromBufferAttribute(positionAttribute, i)
          vertex.x += (Math.random() - 0.5) * 0.2 * size
          vertex.y += (Math.random() - 0.5) * 0.2 * size
          vertex.z += (Math.random() - 0.5) * 0.2 * size
          positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z)
        }

        geometry.computeVertexNormals()
      }

      // Create mesh
      const spaceObject = new THREE.Mesh(geometry, material)

      // Position in a sphere
      const radius = 15 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      spaceObject.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      )

      // Store original position and other animation data
      spaceObject.userData = {
        term: term.text,
        originalPosition: spaceObject.position.clone(),
        speed: 0.05 + Math.random() * 0.1,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ),
        offset: Math.random() * Math.PI * 2,
        amplitude: 0.5 + Math.random() * 0.5,
        distance: radius,
        type: objectType,
      }

      scene.add(spaceObject)
      spaceObjects.push(spaceObject)
    })

    // Create Halley's Comet
    const createComet = () => {
      const cometTexture = createCometTexture()
      const cometMaterial = new THREE.MeshBasicMaterial({
        map: cometTexture,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })

      const cometGeometry = new THREE.PlaneGeometry(20, 5)
      const comet = new THREE.Mesh(cometGeometry, cometMaterial)

      // Set initial position far away
      comet.position.set(-100, Math.random() * 40 - 20, -50)

      // Random rotation around z-axis for different angles
      comet.rotation.z = Math.random() * 0.4 - 0.2

      // Store comet data
      comet.userData = {
        speed: 0.5 + Math.random() * 0.5,
        active: true,
      }

      scene.add(comet)
      return comet
    }

    // Create spaceship
    const createSpaceship = () => {
      const shipTexture = createSpaceshipTexture()
      const shipMaterial = new THREE.MeshBasicMaterial({
        map: shipTexture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const shipGeometry = new THREE.PlaneGeometry(8, 4)
      const ship = new THREE.Mesh(shipGeometry, shipMaterial)

      // Set initial position far away
      const side = Math.random() > 0.5 ? 1 : -1
      ship.position.set(-100 * side, Math.random() * 30 - 15, -30 - Math.random() * 20)

      // Rotate to face direction of travel
      if (side > 0) {
        ship.rotation.y = Math.PI
      }

      // Store ship data
      ship.userData = {
        speed: 0.2 + Math.random() * 0.3,
        active: true,
        side: side,
      }

      scene.add(ship)
      return ship
    }

    // Create initial comet and spaceship
    let activeComet = createComet()
    let activeSpaceship: THREE.Mesh | null = null
    let cometTimer = 0
    let spaceshipTimer = 0
    const cometInterval = 15 // seconds between comets
    const spaceshipInterval = 25 // seconds between spaceships

    // Animation loop
    let frame = 0
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      frame += 0.005

      // Rotate stars slowly
      stars.rotation.y += 0.0002
      stars.rotation.z += 0.0001

      // Animate nebulas
      nebula1.rotation.y += 0.0003
      nebula2.rotation.x += 0.0002

      // Animate space objects
      spaceObjects.forEach((object) => {
        const { originalPosition, speed, offset, amplitude, distance, rotationSpeed, type } = object.userData

        // Orbital movement
        const time = Date.now() * 0.0001
        const angle = offset + time * speed

        object.position.x = Math.sin(angle) * distance
        object.position.z = Math.cos(angle) * distance
        object.position.y = originalPosition.y + Math.sin(time * 2 + offset) * amplitude

        // Rotation (different for planets vs asteroids)
        object.rotation.x += rotationSpeed.x
        object.rotation.y += rotationSpeed.y
        object.rotation.z += rotationSpeed.z
      })

      // Pulse the star sizes
      const sizes = starGeometry.attributes.size as THREE.BufferAttribute
      for (let i = 0; i < sizes.count; i++) {
        sizes.array[i] = 0.1 + 0.05 * Math.sin(frame + i)
      }
      sizes.needsUpdate = true

      // Animate comet
      if (activeComet && activeComet.userData.active) {
        activeComet.position.x += activeComet.userData.speed
        activeComet.position.z += activeComet.userData.speed * 0.2

        // If comet has moved out of view, mark it as inactive
        if (activeComet.position.x > 100) {
          activeComet.userData.active = false
          scene.remove(activeComet)
        }
      }

      // Animate spaceship
      if (activeSpaceship && activeSpaceship.userData.active) {
        const direction = activeSpaceship.userData.side
        activeSpaceship.position.x += activeSpaceship.userData.speed * direction

        // If spaceship has moved out of view, mark it as inactive
        if (
          (direction > 0 && activeSpaceship.position.x > 100) ||
          (direction < 0 && activeSpaceship.position.x < -100)
        ) {
          activeSpaceship.userData.active = false
          scene.remove(activeSpaceship)
          activeSpaceship = null
        }
      }

      // Check if we need to create a new comet
      cometTimer += 0.016 // Approximately 16ms per frame
      if (cometTimer > cometInterval) {
        cometTimer = 0
        activeComet = createComet()
      }

      // Check if we need to create a new spaceship
      spaceshipTimer += 0.016
      if (spaceshipTimer > spaceshipInterval) {
        spaceshipTimer = 0
        activeSpaceship = createSpaceship()
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Mouse movement parallax effect
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      // Subtle camera movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.01
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.01
      camera.lookAt(scene.position)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animate as unknown as number)
      renderer.dispose()
      scene.clear()
    }
  }, [theme]) // Re-initialize when theme changes

  return <canvas id="threejs-bg" ref={canvasRef}></canvas>
}
