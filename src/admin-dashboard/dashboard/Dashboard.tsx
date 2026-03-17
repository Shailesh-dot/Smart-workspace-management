"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Search,
  Bell,
  ChevronRight,
  Target,
  Zap
} from "lucide-react";
import { MOCK_EMPLOYEES } from "../constants";

// Detail Views
import TotalWorkforceDetail from "./TotalWorkforceDetail";
import PerformanceDetail from "./PerformanceDetail";
import AttritionDetail from "./AttritionDetail";
import SkillCoverageDetail from "./SkillCoverageDetail";

const Dashboard = () => {
  const [activeDetail, setActiveDetail] = useState<string | null>(null); // null, 'workforce', 'performance', 'attrition', 'skills'
  const [searchQuery, setSearchQuery] = useState("");

  const stats: { id: string; label: string; value: string; icon: any; trend: string; color: string }[] = [
    { id: "workforce", label: "Total Workforce", value: "1,248", icon: Users, trend: "+12%", color: "sky" },
    { id: "performance", label: "Avg. Performance", value: "84%", icon: TrendingUp, trend: "+3%", color: "blue" },
    { id: "attrition", label: "Attrition Risk", value: "Low", icon: AlertTriangle, trend: "-5%", color: "orange" },
    { id: "skills", label: "Skill Coverage", value: "68%", icon: Target, trend: "+8%", color: "emerald" },
  ];

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeDetail === "workforce") return <TotalWorkforceDetail onBack={() => setActiveDetail(null)} />;
  if (activeDetail === "performance") return <PerformanceDetail onBack={() => setActiveDetail(null)} />;
  if (activeDetail === "attrition") return <AttritionDetail onBack={() => setActiveDetail(null)} />;
  if (activeDetail === "skills") return <SkillCoverageDetail onBack={() => setActiveDetail(null)} />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Proactive Intelligence</h1>
          <p className="text-zinc-400 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search workforce..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-sky-50/50 border border-sky-100 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 transition-all w-64 text-zinc-900"
            />
          </div>
          <button className="p-2 bg-sky-50 border border-sky-100 rounded-xl text-zinc-400 hover:text-sky-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.button 
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveDetail(stat.id)}
            className="bg-white border border-sky-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-sky-200 transition-all group text-left w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-sky-50 text-sky-500 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sky-600 text-xs font-bold bg-sky-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold mb-1 text-zinc-900">{stat.value}</div>
            <div className="text-zinc-400 text-sm font-medium flex items-center justify-between">
              {stat.label}
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-1 gap-8">
        {/* Attrition Prediction */}
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">
                {searchQuery ? "Search Results" : "Attrition Prediction"}
              </h2>
              <p className="text-zinc-400 text-sm">
                {searchQuery 
                  ? `Showing results for "${searchQuery}"` 
                  : "AI-driven risk assessment for the next quarter"}
              </p>
            </div>
            {!searchQuery && (
              <button className="text-sky-600 text-sm font-bold hover:underline">View Full Report</button>
            )}
          </div>
          
          <div className="space-y-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between p-4 bg-sky-50/30 border border-sky-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image 
                        src={emp.avatar} 
                        fill
                        className="rounded-full border border-sky-100 object-cover" 
                        alt={emp.name} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900">{emp.name}</div>
                      <div className="text-zinc-400 text-xs">{emp.role} • {emp.department}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider mb-1">Performance</div>
                      <div className="font-mono text-sky-600 font-bold">{emp.performance}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider mb-1">Risk Level</div>
                      <div className={`font-bold ${
                        emp.attritionRisk === "High" ? "text-red-500" : 
                        emp.attritionRisk === "Medium" ? "text-orange-500" : "text-sky-600"
                      }`}>
                        {emp.attritionRisk}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-sky-100/50 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5 text-zinc-400" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-zinc-400 font-medium">No employees found matching &quot;{searchQuery}&quot;</div>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-sky-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
