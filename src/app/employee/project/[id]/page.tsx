"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiBox, FiCalendar, FiClock, FiCode } from "react-icons/fi";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

/* ═══ MOCK DATA ═══ */
const PREV_PROJECTS = [
  {
    id: 1, name: "Echo Pay UI", role: "Lead Frontend",
    desc: "A fintech dashboard handling complex data visualizations for high-frequency trading accounts. Processing over 10,000 transactions per second with real-time websocket updates.",
    contribution: "Implemented real-time WebSocket charts and optimized React rendering cycles, reducing render time by 3x. Abstracted core table views into a reusable custom hook architecture.",
    success: 98, timeline: "Jan 2025 - Dec 2025", duration: "12 Months",
    tech: ["React", "TypeScript", "WebSockets", "Tailwind", "Recharts"],
    roleSplit: [{ name: "Frontend", value: 65 }, { name: "Architecture", value: 20 }, { name: "Testing", value: 15 }],
  },
  {
    id: 2, name: "Skyline SCM", role: "Full Stack",
    desc: "Supply chain management platform serving international logistics firms with 50M+ monthly transactions. Real-time GPS tracking and automated customs clearing.",
    contribution: "Designed the micro-frontend architecture and integrated automated customs-clearing API. Built backend Node.js microservices for realtime location pub-sub.",
    success: 94, timeline: "Mar 2024 - Nov 2024", duration: "8 Months",
    tech: ["Next.js", "Node.js", "Redis", "Docker", "PostgreSQL"],
    roleSplit: [{ name: "Frontend", value: 40 }, { name: "Backend", value: 40 }, { name: "DevOps", value: 20 }],
  },
  {
    id: 3, name: "Horizon CRM", role: "Frontend Lead",
    desc: "Enterprise CRM for mid-market B2B SaaS with real-time collaboration features similar to Google Docs.",
    contribution: "Led the migration from Angular to React and introduced component-driven development. Integrated Operational Transforms (OT) for multiplayer text editing.",
    success: 91, timeline: "Feb 2023 - Jan 2024", duration: "11 Months",
    tech: ["React", "Redux", "WebRTC", "Firebase", "Jest"],
    roleSplit: [{ name: "Frontend", value: 70 }, { name: "Testing", value: 30 }],
  },
];

const COLORS = ["#2563eb", "#6366f1", "#8b5cf6", "#10b981", "#f59e0b"];

/* ═══ CUSTOM LABEL ═══ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  if (cx == null || midAngle == null) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={13} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const project = useMemo(() =>
    PREV_PROJECTS.find(p => p.id === parseInt(params.id as string)),
    [params.id]
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
        <button onClick={() => router.push("/employee")} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => router.push("/employee")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold text-sm mb-6 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm w-fit"
        >
          <FiArrowLeft /> Back to Profile
        </button>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 flex-shrink-0">
            <FiBox size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{project.name}</h1>
            <p className="text-blue-600 font-bold uppercase tracking-widest mt-1">{project.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Project Overview</h3>
            <p className="text-gray-700 leading-relaxed font-medium text-lg">{project.desc}</p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><FiCode size={120} /></div>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Core Contribution</h3>
            <p className="text-gray-900 leading-relaxed font-semibold text-lg relative z-10">{project.contribution}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Technologies &amp; Tooling</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(tech => (
                <span key={tech} className="bg-gray-50 text-gray-700 px-5 py-2 rounded-xl text-sm font-bold border border-gray-200">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Success Metrics</h3>
            <div className="text-center mb-6">
              <p className="text-sm font-bold text-gray-500 mb-1">Overall Delivery Success</p>
              <h4 className="text-5xl font-black text-green-600">{project.success}%</h4>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${project.success}%` }} />
            </div>
            <p className="text-xs text-center text-gray-400 mt-4 font-semibold">Exceeded KPI thresholds set by stakeholders.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Timeline</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><FiCalendar size={18} /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Dates</p>
                <p className="text-sm font-bold text-gray-900">{project.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><FiClock size={18} /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Duration</p>
                <p className="text-sm font-bold text-gray-900">{project.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Chart */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Role Contribution Split</h3>
        <p className="text-sm text-gray-500 text-center mb-8 font-medium">Distribution of primary responsibilities across the project duration.</p>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={project.roleSplit}
                cx="50%" cy="50%"
                innerRadius={80} outerRadius={140}
                paddingAngle={5} dataKey="value"
                animationDuration={1500} animationEasing="ease-out"
                label={renderCustomLabel} labelLine={false}
              >
                {project.roleSplit.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Time Allocation"]}
                contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                itemStyle={{ fontWeight: "bold" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: "bold", fontSize: "14px", paddingTop: "20px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
