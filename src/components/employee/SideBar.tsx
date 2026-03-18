"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FiFolder, FiUser, FiLogOut, FiZap } from "react-icons/fi";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/employee/dashboard", label: "Current Projects", icon: <FiFolder /> },
  { href: "/employee/employee", label: "Employee Details", icon: <FiUser /> },
];

export default function SideBar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white flex flex-col z-50 shadow-xl">
      {/* Logo */}
      <div className="px-6 py-8 flex items-center gap-3 border-b border-white/10">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow">
          <FiZap className="text-blue-600 text-lg" />
        </div>
        <span className="text-lg font-bold tracking-tight">SkillTech</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith("/project") && item.href === "/employee");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-200 hover:bg-white/10 transition-all"
        >
          <FiLogOut className="text-lg" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
