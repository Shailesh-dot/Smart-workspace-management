"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { FiZap, FiMail, FiLock, FiBriefcase } from "react-icons/fi";

export default function LoginPage() {
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationId: "",
  });
  const { login, isFirstLogin, completeFirstLogin } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      const isDefaultPass = formData.organizationId === formData.password;
      console.log("Login Attempt:", { isDefaultPass, organizationId: formData.organizationId, isFirstLogin });
      
      // If the employee uses their Organization ID as a password, force onboarding
      if (isDefaultPass) {
        console.log("Redirecting to Password Change...");
        router.push("/employee/password-change");
      } else {
        // If they use a custom password, they are assumed to have already changed it
        console.log("Redirecting to Dashboard...");
        completeFirstLogin(); // Mark as onboarded in local state
        router.push("/employee/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <FiZap className="text-white text-lg" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900">SkillTech</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 text-center">Welcome Back</h1>
          <p className="text-gray-400 text-sm text-center mb-7">Sign in to your account</p>

          {/* Role Toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-6">
            {(["employee", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                  role === r
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r === "employee" ? "Employee" : "Admin (Org)"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {role === "employee" && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                  Organization ID
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="organizationId"
                    value={formData.organizationId}
                    onChange={handleInputChange}
                    placeholder="Enter your organization ID"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-blue-200 transition-all mt-2"
            >
              Sign In as {role === "admin" ? "Admin" : "Employee"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
