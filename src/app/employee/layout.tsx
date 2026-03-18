"use client";

import SideBar from "../../components/employee/SideBar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isOnboardingPage = pathname === "/employee/password-change" || pathname === "/employee/resume";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {!isOnboardingPage && <SideBar />}
      <main className={`${isOnboardingPage ? "w-full" : "ml-64"} flex-1 p-10 overflow-y-auto scroll-smooth`}>
        {children}
      </main>
    </div>
  );
}
