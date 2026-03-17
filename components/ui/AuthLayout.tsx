"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll("[data-animate]")
      gsap.fromTo(
        elements,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out" 
        }
      )
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
      <div ref={containerRef} className="w-full max-w-[440px] flex flex-col items-center">
        {children}
      </div>
    </main>
  )
}
