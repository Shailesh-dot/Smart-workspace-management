"use client";

import { useState, useEffect } from "react";
import {
  FiTarget, FiClock, FiUsers, FiCheckCircle,
  FiPlus, FiTrash2, FiEdit3, FiAlertTriangle, FiCalendar
} from "react-icons/fi";

/* ═══ TYPES ═══ */
interface Project {
  id: number; name: string; description: string;
  deadline: string; status: string; team: number;
  done: number; total: number;
}
interface TeamMember { id: number; name: string; role: string; resp: string; init: string; }
interface Task { id: number; text: string; completed: boolean; }

/* ═══ MOCK DATA ═══ */
const PROJECTS: Project[] = [
  { id: 1, name: "Apollo: Cloud Migration", description: "Re-platforming legacy on-prem services to AWS. Building containerised microservices, setting up CI/CD pipelines, and enabling auto-scaling for peak traffic.", deadline: "2026-03-25", status: "In Progress", team: 6, done: 45, total: 60 },
  { id: 2, name: "Gemini: Design System", description: "Creating a unified component library and design token system used across all product teams. Built on React + Tailwind with full a11y compliance.", deadline: "2026-04-10", status: "In Progress", team: 4, done: 12, total: 40 },
  { id: 3, name: "Project Helix: API SDK", description: "Building type-safe, auto-generated SDKs for our public REST and GraphQL APIs, complete with retry logic, caching, and rate-limit handling.", deadline: "2026-03-18", status: "Completed", team: 3, done: 25, total: 25 },
];

const TEAM: TeamMember[] = [
  { id: 1, name: "Alex Rivera", role: "Architect", resp: "System design & cloud infrastructure", init: "AR" },
  { id: 2, name: "Sarah Chen", role: "UI Engineer", resp: "Design system implementation & accessibility", init: "SC" },
  { id: 3, name: "James Wilson", role: "Backend Lead", resp: "API architecture & security protocols", init: "JW" },
  { id: 4, name: "Priya Sharma", role: "PM", resp: "Roadmap prioritization & stakeholder sync", init: "PS" },
  { id: 5, name: "Daniel Kim", role: "QA Lead", resp: "Test automation & regression suites", init: "DK" },
  { id: 6, name: "Mia Lopez", role: "DevOps", resp: "CI/CD pipelines & container orchestration", init: "ML" },
];

/* ═══ SUB-COMPONENTS ═══ */
function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {subtitle && <p className="text-gray-500 text-sm ml-[52px]">{subtitle}</p>}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const pct = Math.round((p.done / p.total) * 100);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{p.name}</h3>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{p.status}</span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.description}</p>
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
        <span>Progress</span><span className="text-blue-600">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex gap-6 text-sm">
        <span className="flex items-center gap-2 text-gray-500"><FiUsers className="text-blue-400" /><b className="text-gray-700">{p.team}</b> members</span>
        <span className="flex items-center gap-2 text-gray-500"><FiCalendar className="text-blue-400" /><b className="text-gray-700">{p.deadline}</b></span>
        <span className="flex items-center gap-2 text-gray-500"><FiCheckCircle className="text-blue-400" /><b className="text-gray-700">{p.done}/{p.total}</b> tasks</span>
      </div>
    </div>
  );
}

function DeadlineRow({ p }: { p: Project }) {
  const diff = (new Date(p.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
  const color = diff < 3 ? "bg-red-500" : diff < 10 ? "bg-yellow-400" : "bg-green-500";
  const label = diff < 3 ? "Urgent" : diff < 10 ? "Soon" : "On Track";
  const labelColor = diff < 3 ? "text-red-600 bg-red-50" : diff < 10 ? "text-yellow-700 bg-yellow-50" : "text-green-700 bg-green-50";
  return (
    <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-2.5 h-10 rounded-full ${color}`} />
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{p.name}</h4>
          <p className="text-xs text-gray-400">{p.status}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${labelColor}`}>{label}</span>
        <span className="text-sm font-bold text-gray-700">{p.deadline}</span>
      </div>
    </div>
  );
}

function TeamMemberCard({ m }: { m: TeamMember }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all text-center">
      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-blue-200">{m.init}</div>
      <h4 className="font-bold text-gray-900 text-sm">{m.name}</h4>
      <p className="text-xs font-semibold text-blue-600 mb-2">{m.role}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{m.resp}</p>
    </div>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return [];
    try { const s = localStorage.getItem("skilltech_tasks"); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });
  const [taskInput, setTaskInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => { localStorage.setItem("skilltech_tasks", JSON.stringify(tasks)); }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput.trim(), completed: false }]);
    setTaskInput("");
  };
  const toggleTask = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));
  const startEdit = (t: Task) => { setEditingId(t.id); setEditInput(t.text); };
  const saveEdit = () => {
    if (!editInput.trim()) return;
    setTasks(tasks.map(t => t.id === editingId ? { ...t, text: editInput.trim() } : t));
    setEditingId(null);
  };

  const stats = { total: tasks.length, done: tasks.filter(t => t.completed).length, pending: tasks.filter(t => !t.completed).length };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Current Projects</h1>
        <p className="text-gray-400 mt-1">Overview of all active initiatives, deadlines, team, and tasks.</p>
      </div>

      {/* 1. Project Overview */}
      <section className="mb-14">
        <SectionTitle icon={<FiTarget size={20} />} title="Project Overview" subtitle="All active and completed projects at a glance." />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 2. Deadlines */}
      <section className="mb-14">
        <SectionTitle icon={<FiAlertTriangle size={20} />} title="Upcoming Deadlines" subtitle="Time-sensitive milestones ranked by urgency." />
        <div className="space-y-3">
          {[...PROJECTS].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).map(p => <DeadlineRow key={p.id} p={p} />)}
        </div>
      </section>

      {/* 3. Team Details */}
      <section className="mb-14">
        <SectionTitle icon={<FiUsers size={20} />} title="Team Details" subtitle="The talented people behind the projects." />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {TEAM.map(m => <TeamMemberCard key={m.id} m={m} />)}
        </div>
      </section>

      {/* 4. Tasks / To-Do */}
      <section className="mb-14">
        <SectionTitle icon={<FiCheckCircle size={20} />} title="Tasks / To-Do" subtitle="Manage your sprint tasks. Data is saved automatically." />

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xs font-bold text-gray-400 uppercase">Total</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xs font-bold text-green-500 uppercase">Completed</p>
            <p className="text-2xl font-extrabold text-green-600 mt-1">{stats.done}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xs font-bold text-yellow-500 uppercase">Pending</p>
            <p className="text-2xl font-extrabold text-yellow-600 mt-1">{stats.pending}</p>
          </div>
        </div>

        <form onSubmit={addTask} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-bold shadow-md shadow-blue-200 transition-colors">
            <FiPlus strokeWidth={3} /> Add
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="group flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm hover:border-blue-200 transition-all">
              <button onClick={() => toggleTask(task.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${task.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}>
                {task.completed && <FiCheckCircle size={12} />}
              </button>
              {editingId === task.id ? (
                <input autoFocus className="flex-1 border border-blue-300 rounded-lg px-3 py-1.5 text-sm outline-none" value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  onBlur={saveEdit}
                />
              ) : (
                <span className={`flex-1 text-sm font-medium ${task.completed ? "line-through text-gray-300" : "text-gray-700"}`}>{task.text}</span>
              )}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(task)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><FiEdit3 size={14} /></button>
                <button onClick={() => deleteTask(task.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><FiTrash2 size={14} /></button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-16 text-gray-300">
              <FiCheckCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-bold">No tasks yet. Add one above!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
