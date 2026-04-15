"use client"

import { useEffect, useState } from "react"

interface LeafStyle {
  left: string
  animationDuration: string
  animationDelay: string
  fontSize: string
  opacity: number
}

export function FloatingLeaves() {
  const [leaves, setLeaves] = useState<LeafStyle[]>([])

  useEffect(() => {
    const generated: LeafStyle[] = Array.from({ length: 12 }, () => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${14 + Math.random() * 18}px`,
      opacity: 0.15 + Math.random() * 0.2,
    }))
    setLeaves(generated)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((style, i) => (
        <div
          key={i}
          className="absolute animate-leaf text-primary"
          style={{
            left: style.left,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
            fontSize: style.fontSize,
            opacity: style.opacity,
            top: "-30px",
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.48-2.63 11-8 2-4 1-7 1-7s-2.5.5-3 1z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
