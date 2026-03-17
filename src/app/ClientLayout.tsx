"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../admin-dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700 bg-gray-50 text-gray-900">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 lg:p-10 overflow-y-auto scroll-smooth min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
