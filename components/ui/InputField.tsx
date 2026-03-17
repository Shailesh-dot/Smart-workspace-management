"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export function InputField({ label, error, required, type, className, ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-dark flex items-center">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative group">
        <input
          type={inputType}
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-border bg-white outline-none",
            "transition-all duration-200 focus:border-brand focus:ring-4 focus:ring-brand/5",
            "placeholder:text-muted/60",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/5"
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-dark transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
