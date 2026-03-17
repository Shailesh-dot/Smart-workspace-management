"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const variants = {
    primary: "bg-brand text-white border-transparent",
    secondary: "bg-white text-brand border-brand/20",
    outline: "bg-transparent text-muted border-border hover:border-brand/40"
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        "w-full py-3.5 px-4 rounded-xl font-semibold transition-colors border",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
