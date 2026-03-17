"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Lightbulb, Plus, FileText, Upload, Trash2, CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import AddSkillModal from "./AddSkillModal"

interface Skill {
  id: string
  name: string
  level: string
  experience: string
}

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    level: "Expert",
    experience: "4.5 years experience"
  },
  {
    id: "2",
    name: "TypeScript",
    level: "Advanced",
    experience: "3 years experience"
  },
  {
    id: "3",
    name: "Node.js",
    level: "Intermediate",
    experience: "2 years experience"
  }
]

export default function ManualVerification() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const resumeSectionRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInfoRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for sections
      gsap.from(".section-title", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })

      // Skill cards entrance
      gsap.fromTo(".skill-card", 
        {
          scale: 0.9,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          delay: 0.2,
          clearProps: "all"
        }
      )

      // Resume section entrance
      gsap.from(resumeSectionRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (resumeFile && fileInfoRef.current) {
      gsap.fromTo(fileInfoRef.current, 
        { scale: 0.9, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      )
    }
  }, [resumeFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSetFile(file)
  }

  const validateAndSetFile = (file: File) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.")
      return
    }
    setResumeFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndSetFile(file)
  }

  const handleAddSkill = () => {
    setIsModalOpen(true)
  }

  const handleDeleteSkill = (id: string) => {
    const card = skillCardsRef.current.find(ref => ref?.id === `skill-${id}`)
    if (card) {
      gsap.to(card, {
        scale: 0.9,
        opacity: 0,
        x: -20,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setSkills(prev => prev.filter(s => s.id !== id))
        }
      })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFF] p-8 md:p-16">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Skills Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between section-title">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-2xl font-bold text-dark flex items-center gap-3">
                Skills & Competencies
                <span className="bg-gray-100 text-muted px-3 py-1 rounded-full text-sm font-medium">
                  {skills.length}
                </span>
              </h2>
            </div>
            
            <button
              onClick={handleAddSkill}
              className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(var(--brand-rgb),0.4)] hover:shadow-[0_12px_24px_-8px_rgba(var(--brand-rgb),0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              <Plus size={20} />
              Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                id={`skill-${skill.id}`}
                ref={el => { skillCardsRef.current[index] = el }}
                className="skill-card group relative bg-white border border-gray-200 p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] hover:border-brand/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-dark">{skill.name}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      skill.level === "Expert" ? "bg-brand/10 text-brand" :
                        skill.level === "Advanced" ? "bg-blue-50 text-blue-500" :
                          "bg-gray-100 text-muted"
                    )}>
                      {skill.level}
                    </span>
                  </div>
                  
                  <p className="text-muted font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    {skill.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div ref={resumeSectionRef} className="space-y-8">
          <div className="flex items-center gap-3 section-title">
            <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-bold text-dark">Resume</h2>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.doc"
            className="hidden"
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative group border-2 border-dashed rounded-[32px] p-16 transition-all duration-500 flex flex-col items-center justify-center gap-6 overflow-hidden cursor-pointer",
              isDragging
                ? "border-brand bg-brand/5 scale-[0.99] shadow-inner"
                : "border-gray-200 bg-white hover:border-brand/30 hover:bg-gray-50/50"
            )}
          >
            {resumeFile ? (
              <div ref={fileInfoRef} className="flex flex-col items-center gap-4 w-full max-w-md">
                <div className="w-20 h-20 bg-brand text-white rounded-3xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <CheckCircle2 size={36} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-dark truncate max-w-xs">{resumeFile.name}</h3>
                  <p className="text-muted font-medium">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setResumeFile(null)
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95"
                >
                  <Trash2 size={16} />
                  Remove Resume
                </button>
              </div>
            ) : (
              <>
                <div className={cn(
                  "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500",
                  isDragging ? "bg-brand text-white rotate-12 scale-110" : "bg-gray-50 text-muted group-hover:bg-brand/10 group-hover:text-brand"
                )}>
                  <Upload size={36} className={cn("transition-transform duration-500", isDragging && "animate-bounce")} />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-dark">
                    Drop your resume here or <span className="text-brand hover:underline">click to browse</span>
                  </h3>
                  <p className="text-muted font-medium uppercase tracking-widest text-xs">
                    Upload PDF or DOCX (Max 5MB)
                  </p>
                </div>
              </>
            )}

            {/* Subtle background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--brand-color)_0%,_transparent_70%)]" style={{ "--brand-color": "rgb(var(--brand-rgb))" } as any} />
            </div>
          </div>
        </div>

      </div>

      <AddSkillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
