"use client";

import SideBar from "../../components/employee/SideBar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <main className="ml-64 p-10 overflow-y-auto scroll-smooth">{children}</main>
    </div>
  );
}
