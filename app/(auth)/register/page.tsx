"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { AuthLayout } from "@/components/ui/AuthLayout"
import { InputField } from "@/components/ui/InputField"
import { Button } from "@/components/ui/Button"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 2. Update profile with display name
      await updateProfile(user, { displayName: name })

      // 3. Store user details in Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
          createdAt: serverTimestamp(),
        })
      } catch (firestoreErr: any) {
        if (firestoreErr.code === "permission-denied") {
          throw new Error("Firestore permission denied. Please check your security rules.")
        }
        throw firestoreErr
      }

      // 4. Sign out and Redirect to login as requested
      await signOut(auth)
      router.push("/login")
    } catch (err: any) {
      console.error("Registration error:", err)
      let message = "An error occurred during registration"
      
      if (err.code === "auth/email-already-in-use") {
        message = "This email is already in use. Please try logging in instead."
      } else if (err.code === "auth/invalid-email") {
        message = "The email address is invalid."
      } else if (err.code === "auth/weak-password") {
        message = "The password is too weak. Please use at least 6 characters."
      } else if (err.message.includes("permission denied")) {
        message = "Insufficient permissions to save user data. Please set up Firestore Security Rules."
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
        {/* Header */}
        <div data-animate className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-dark">Create an Account</h1>
          <p className="text-muted">Join now to streamline your experience from day one.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <InputField
            data-animate
            name="name"
            label="Name"
            type="text"
            placeholder="Roger Gerrard"
            required
          />
          <InputField
            data-animate
            name="email"
            label="Email"
            type="email"
            placeholder="sellostore@company.com"
            required
          />
          <InputField
            data-animate
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />
          <InputField
            data-animate
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <Button data-animate type="submit" className="mt-2" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Divider */}
        <div data-animate className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-muted">Or Register With</span>
          </div>
        </div>

        {/* Footer */}
        <p data-animate className="text-center text-sm font-medium text-muted">
          Already Have An Account?{" "}
          <Link href="/login" className="text-brand hover:underline">
            Sign In.
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
