"use client";

import Link from "next/link";
import {
  FiUser, FiLayers, FiActivity, FiBox, FiTrendingUp,
  FiBookOpen, FiCpu, FiAward, FiExternalLink, FiStar, FiShield
} from "react-icons/fi";

/* ═══ MOCK DATA ═══ */
const SKILLS: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Redux"],
  Backend: ["Node.js", "Express", "Python", "FastAPI", "Go"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  Tools: ["Docker", "Kubernetes", "Git", "Figma", "VS Code"],
};

const PREV_PROJECTS = [
  { id: 1, name: "Echo Pay UI", role: "Lead Frontend", desc: "A fintech dashboard handling complex data visualizations for high-frequency trading accounts.", success: 98 },
  { id: 2, name: "Skyline SCM", role: "Full Stack", desc: "Supply chain management platform serving international logistics firms.", success: 94 },
  { id: 3, name: "Horizon CRM", role: "Frontend Lead", desc: "Enterprise CRM for mid-market B2B SaaS with real-time collaboration features.", success: 91 },
];

const UPSKILL = [
  { name: "Rust for WebAssembly", diff: "Advanced", imp: "Critical" },
  { name: "GraphQL Federation", diff: "Intermediate", imp: "High" },
  { name: "AI / ML Basics", diff: "Beginner", imp: "High" },
  { name: "System Design", diff: "Advanced", imp: "Critical" },
];

const RESOURCES = [
  { title: "LeetCode Patterns", cat: "Algorithms", url: "https://leetcode.com" },
  { title: "Frontend Masters", cat: "Tutorials", url: "https://frontendmasters.com" },
  { title: "AWS Cloud Practitioner", cat: "Course", url: "https://aws.amazon.com/training" },
  { title: "Neetcode Roadmap", cat: "Algorithms", url: "https://neetcode.io" },
];

const FUTURE = [
  { name: "Generative AI", growth: "+340%", icon: <FiStar /> },
  { name: "Cloud Architecture", growth: "+180%", icon: <FiCpu /> },
  { name: "Blockchain / Web3", growth: "+120%", icon: <FiShield /> },
  { name: "Edge Computing", growth: "+95%", icon: <FiActivity /> },
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

function SkillBadge({ text }: { text: string }) {
  return (
    <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
      {text}
    </span>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function EmployeePage() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Details</h1>
        <p className="text-gray-400 mt-1">Comprehensive talent profile, skills, and growth roadmap.</p>
      </div>

      {/* 1. Profile */}
      <section className="mb-14">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-center gap-10">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-blue-200 flex-shrink-0">AL</div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold">Available</span>
              <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-xs font-bold">8 Years Exp.</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Alex Lumina</h2>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
              Senior Staff Engineer specializing in distributed architecture and performance-critical frontend systems.
              Bridging the gap between design vision and technical scalability.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Skills */}
      <section className="mb-14">
        <SectionTitle icon={<FiLayers size={20} />} title="Skills" subtitle="Categorized by domain expertise." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{cat}</h3>
              <div className="flex flex-wrap gap-2">{items.map(s => <SkillBadge key={s} text={s} />)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Attrition Score */}
      <section className="mb-14">
        <SectionTitle icon={<FiActivity size={20} />} title="Attrition Risk Score" subtitle="Based on engagement, peer reviews, and project impact." />
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm max-w-md">
          <div className="flex justify-between items-end mb-3">
            <span className="text-4xl font-extrabold text-gray-900">9.2%</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Low Risk</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "9.2%" }} />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">Alex is a highly engaged contributor with consistently positive retention indicators.</p>
        </div>
      </section>

      {/* 4. Previous Projects */}
      <section className="mb-14">
        <SectionTitle icon={<FiBox size={20} />} title="Previous Projects" subtitle="Click any card to see full details." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREV_PROJECTS.map(p => (
            <Link key={p.id} href={`/project/${p.id}`} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group block">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gray-900">{p.name}</h4>
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"><FiExternalLink /></div>
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{p.role}</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.success}%` }} />
                </div>
                <span className="text-[10px] font-bold text-gray-400">{p.success}%</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Upskill */}
      <section className="mb-14">
        <SectionTitle icon={<FiTrendingUp size={20} />} title="Upskill Roadmap" subtitle="Recommended skills for career growth." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {UPSKILL.map(u => (
            <div key={u.name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 text-sm mb-2">{u.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{u.diff}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{u.imp}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Learning Resources */}
      <section className="mb-14">
        <SectionTitle icon={<FiBookOpen size={20} />} title="Learning Resources" subtitle="Curated resources organized by skill category." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {RESOURCES.map(r => (
            <a key={r.title} href={r.url} target="_blank" rel="noreferrer" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group block">
              <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{r.title}</h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r.cat}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 7. Future Market Skills */}
      <section className="mb-14">
        <SectionTitle icon={<FiAward size={20} />} title="Future Market Skills" subtitle="Trending tech skills with high demand growth." />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {FUTURE.map(f => (
            <div key={f.name} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 hover:-translate-y-1 transition-all">
              <div className="text-2xl mb-3 text-blue-200">{f.icon}</div>
              <h4 className="font-bold text-sm mb-1">{f.name}</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-blue-200 font-semibold">Growth:</span>
                <span className="font-extrabold text-white">{f.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
