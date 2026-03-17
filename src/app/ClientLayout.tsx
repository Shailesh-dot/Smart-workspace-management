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
    <div className="flex min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700 bg-gray-50 text-gray-900 transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 lg:p-10 overflow-y-auto scroll-smooth">
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
