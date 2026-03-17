"use client";
import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  BarChart3, 
  Settings,
  BrainCircuit,
  LogOut,
  GraduationCap
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { theme, accentColor } = useTheme();
  const pathname = usePathname();

  const menuItems: { id: string; href: string; icon: any; label: string }[] = [
    { id: "dashboard", href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "workflow", href: "/workflow", icon: Users, label: "Workflow" },
    { id: "upskilling", href: "/upskilling", icon: GraduationCap, label: "Upskilling" },
    { id: "analytics", href: "/analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white flex flex-col z-50 shadow-xl transition-colors duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all bg-white shadow-black/20">
          <BrainCircuit className="text-blue-600 w-6 h-6" />
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-white">SMART FLOW</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                isActive 
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:bg-white/10 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
