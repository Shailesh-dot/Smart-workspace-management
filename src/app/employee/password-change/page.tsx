"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { FiLock, FiShield, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function PasswordChangePage() {
  const { completeFirstLogin } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Simulate API call
    setSuccess(true);
    console.log("Password updated successfully! Transitioning to resume onboarding...");
    setTimeout(() => {
      router.push("/employee/resume");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mx-auto mb-4">
          <FiShield size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Security Update</h1>
        <p className="text-gray-400 mt-1">Please update your password to continue to your dashboard.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all">
        {success ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
            <p className="text-gray-500">Redirecting you to your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                <FiAlertCircle className="flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                Current Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Minimal 6 characters"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat new password"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl text-sm shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
              >
                Update Password & Continue
                <FiCheckCircle className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-center p-6 bg-blue-50 rounded-3xl border border-blue-100">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Security Tip</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Use a strong password with a mix of letters, numbers, and symbols to keep your account secure.
        </p>
      </div>
    </div>
  );
}
