"use client"

// Animated canvas background with floating organic orbs - pure CSS/Canvas, no Three.js
import { useEffect, useRef, useCallback } from "react"

interface Orb {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  color: string
  opacity: number
}

function createOrbs(width: number, height: number): Orb[] {
  const colors = [
    "rgba(45, 106, 79, 0.15)",
    "rgba(82, 183, 136, 0.12)",
    "rgba(64, 145, 108, 0.1)",
    "rgba(149, 213, 178, 0.14)",
    "rgba(116, 198, 157, 0.11)",
  ]
  return Array.from({ length: 8 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 60 + Math.random() * 140,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: 0.3 + Math.random() * 0.4,
  }))
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orbsRef = useRef<Orb[]>([])
  const animRef = useRef<number>(0)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const orb of orbsRef.current) {
      orb.x += orb.dx
      orb.y += orb.dy

      if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
      if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
      if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
      if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

      const gradient = ctx.createRadialGradient(
        orb.x,
        orb.y,
        0,
        orb.x,
        orb.y,
        orb.radius
      )
      gradient.addColorStop(0, orb.color)
      gradient.addColorStop(1, "rgba(45, 106, 79, 0)")

      ctx.beginPath()
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.globalAlpha = orb.opacity
      ctx.fill()
      ctx.globalAlpha = 1
    }

    animRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      const ctx = canvas.getContext("2d")
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      orbsRef.current = createOrbs(canvas.offsetWidth, canvas.offsetHeight)
    }

    resize()
    window.addEventListener("resize", resize)
    animRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full opacity-70"
      aria-hidden="true"
    />
  )
}
