"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { InputField } from "@/components/ui/InputField"
import { Button } from "@/components/ui/Button"

interface AddSkillModalProps {
  isOpen: boolean
  onClose: () => void
}

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function AddSkillModal({ isOpen, onClose }: AddSkillModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [expertise, setExpertise] = useState("Intermediate")
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      // Small timeout to ensure DOM is ready for GSAP
      const timeout = setTimeout(() => {
        const tl = gsap.timeline()
        tl.to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        tl.fromTo(
          contentRef.current,
          { 
            scale: 0.9, 
            opacity: 0, 
            y: 30,
            filter: "blur(10px)"
          },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            duration: 0.6, 
            ease: "back.out(1.5)" 
          },
          "-=0.2"
        )
      }, 10)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsRendered(false)
        onClose()
      }
    })
    tl.to(contentRef.current, { 
      scale: 0.95, 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)",
      duration: 0.4, 
      ease: "power2.in" 
    })
    tl.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in" 
    }, "-=0.2")
  }

  if (!isOpen && !isRendered) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay Background */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-dark/40 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[540px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden opacity-0 border border-white/20"
      >
        <div className="p-10 space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-dark tracking-tight">Add Skill</h2>
            <button
              onClick={handleClose}
              className="group p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:rotate-90"
            >
              <X className="w-7 h-7 text-muted group-hover:text-dark" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Skill Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark/70 ml-1 uppercase tracking-wider">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. React, Financial Modeling"
                className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-brand focus:ring-8 focus:ring-brand/5 transition-all text-dark text-lg font-medium placeholder:text-muted/40 placeholder:font-normal"
              />
            </div>

            {/* Expertise Level Segmented Control */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-dark/70 ml-1 uppercase tracking-wider">Expertise Level</label>
              <div className="flex p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-[20px] border border-gray-200/50">
                {levels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setExpertise(level)}
                    className={cn(
                      "flex-1 py-3 text-sm font-bold rounded-2xl transition-all duration-300 relative overflow-hidden",
                      expertise === level
                        ? "bg-white text-brand shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-100"
                        : "text-muted hover:text-dark hover:bg-gray-200/50 scale-95"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark/70 ml-1 uppercase tracking-wider">Experience</label>
              <div className="relative group">
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-brand focus:ring-8 focus:ring-brand/5 transition-all text-dark text-lg font-medium"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted font-semibold bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm transition-all group-focus-within:text-brand group-focus-within:border-brand/20">
                  Years
                </span>
              </div>
            </div>

        
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              onClick={handleClose}
              className="px-10 py-4 text-base font-bold text-muted hover:text-dark hover:bg-gray-100 rounded-2xl transition-all duration-300 active:scale-95"
            >
              Cancel
            </button>
            <button
              className="px-10 py-4 text-base font-bold text-white bg-brand rounded-2xl shadow-[0_8px_24px_-8px_rgba(var(--brand-rgb),0.5)] hover:shadow-[0_12px_32px_-8px_rgba(var(--brand-rgb),0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
