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
    <div className={`w-64 border-r transition-colors duration-300 flex flex-col h-screen sticky top-0 ${
      theme === "dark" ? "bg-zinc-950 border-zinc-800" : "bg-white border-sky-100"
    }`}>
      <div className="p-6 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all bg-accent shadow-accent/20`}>
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
        <span className={`font-display font-bold text-lg tracking-tight transition-colors ${
          theme === "dark" ? "text-white" : "text-zinc-900"
        }`}>SMART FLOW</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? (theme === "dark" ? "bg-zinc-900 text-accent border border-zinc-800" : "bg-sky-50 text-sky-600 border border-sky-100")
                  : (theme === "dark" ? "text-zinc-500 hover:text-accent hover:bg-zinc-900/50" : "text-zinc-400 hover:text-sky-600 hover:bg-sky-50/50")
              }`}
              style={isActive && theme !== "dark" ? { color: 'var(--accent-primary)', backgroundColor: 'rgba(14, 165, 233, 0.05)' } : {}}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t transition-colors ${
        theme === "dark" ? "border-zinc-800" : "border-sky-100"
      }`}>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
