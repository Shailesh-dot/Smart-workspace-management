"use client";
import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings,
  BrainCircuit,
  LogOut,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems: { id: string; href: string; icon: any; label: string }[] = [
    { id: "dashboard", href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "workflow", href: "/admin/workflow", icon: Users, label: "Workflow" },
    { id: "upskilling", href: "/admin/upskilling", icon: GraduationCap, label: "Upskilling" },
    { id: "analytics", href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-accent via-accent-dark to-accent-dark text-white flex flex-col z-50 shadow-xl transition-colors duration-500">
      <div className="p-6 flex items-center gap-3 border-white/10 border-b">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-white">
          <BrainCircuit className="text-accent w-6 h-6" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">SMART FLOW</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch={true}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 font-semibold text-sm ${
                isActive 
                  ? "bg-white text-accent shadow-md"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-blue-200 hover:bg-white/10 rounded-xl transition-all text-sm font-semibold">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
