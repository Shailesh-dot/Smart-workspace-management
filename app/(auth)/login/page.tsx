"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { AuthLayout } from "@/components/ui/AuthLayout"
import { InputField } from "@/components/ui/InputField"
import { Button } from "@/components/ui/Button"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/resumeSection/manualVerification")
    } catch (err: any) {
      console.error("Login error:", err)
      let message = "Invalid email or password"
      
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        message = "Invalid email or password. Please try again."
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later."
      } else if (err.message) {
        message = err.message
      }
      
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full space-y-8">
        {/* Logo */}
        <div data-animate className="flex justify-center">
          <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center rotate-45">
            <div className="-rotate-45 text-white font-bold text-2xl">A</div>
          </div>
        </div>

        {/* Header */}
        <div data-animate className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-dark">Welcome back !</h1>
          <p className="text-muted">Enter to get unlimited access to data & information.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <InputField
            data-animate
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your mail address"
            required
          />
          <InputField
            data-animate
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            required
          />

          <div data-animate className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-brand focus:ring-brand" />
              <span className="text-sm font-medium text-dark">Remember me</span>
            </label>
            <Link href="#" className="text-sm font-medium text-brand hover:underline">
              Forgot your password ?
            </Link>
          </div>

          <Button data-animate type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        {/* Divider */}
        <div data-animate className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-muted">Or, Login with</span>
          </div>
        </div>

        {/* Footer */}
        <p data-animate className="text-center text-sm font-medium text-dark">
          Don't have an account ?{" "}
          <Link href="/register" className="text-brand hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
