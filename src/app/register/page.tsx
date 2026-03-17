"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { FiZap, FiMail, FiLock, FiBriefcase, FiUser } from "react-icons/fi";

export default function RegisterPage() {
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationId: "",
  });
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    login(role);
    router.push(role === "admin" ? "/admin/dashboard" : "/employee/dashboard");
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

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
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 text-center">Create Account</h1>
          <p className="text-gray-400 text-sm text-center mb-7">Join us today!</p>

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
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required className={inputClass} />
              </div>
            </div>

            {role === "admin" ? (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Organization Name</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} placeholder="Enter organization name" required className={inputClass} />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Organization ID</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="organizationId" value={formData.organizationId} onChange={handleInputChange} placeholder="Enter organization ID" required className={inputClass} />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Create a password" required className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" required className={inputClass} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-blue-200 transition-all mt-2"
            >
              Register as {role === "admin" ? "Admin" : "Employee"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
