"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../../components/admin/admin-dashboard/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700 bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-white transition-colors duration-300">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-8 lg:p-10 overflow-y-auto scroll-smooth min-h-screen">
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
