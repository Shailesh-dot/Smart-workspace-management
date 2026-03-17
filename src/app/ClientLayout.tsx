"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../admin-dashboard/Sidebar";
import { useTheme } from "../ThemeContext";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  // Using pathname as the key for AnimatePresence to trigger re-animation on route change
  const pathname = usePathname();

  return (
    <div className={`flex min-h-screen font-sans selection:bg-sky-100 selection:text-sky-700 transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
    }`}>
      <Sidebar />
      
      <main className={`flex-1 p-8 lg:p-12 overflow-y-auto transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-900/50" : "bg-sky-50/20"
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
