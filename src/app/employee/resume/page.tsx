"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { FiZap, FiBookOpen, FiPlus, FiTrash2, FiUploadCloud, FiCheckCircle } from "react-icons/fi";

type ProficiencyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

interface Skill {
  id: string;
  name: string;
  level: ProficiencyLevel;
  years: number;
}

const levelColors: Record<ProficiencyLevel, string> = {
  BEGINNER: "bg-slate-100 text-slate-600",
  INTERMEDIATE: "bg-amber-100 text-amber-700",
  ADVANCED: "bg-violet-100 text-violet-700",
  EXPERT: "bg-indigo-100 text-indigo-700",
};

const INITIAL_SKILLS: Skill[] = [
  { id: "1", name: "React", level: "EXPERT", years: 4.5 },
  { id: "2", name: "TypeScript", level: "ADVANCED", years: 3 },
  { id: "3", name: "Node.js", level: "INTERMEDIATE", years: 2 },
];

export default function ResumeOnboardingPage() {
  const { completeFirstLogin } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add skill form state
  const [newSkill, setNewSkill] = useState({ name: "", level: "INTERMEDIATE" as ProficiencyLevel, years: 1 });

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    setSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), ...newSkill },
    ]);
    setNewSkill({ name: "", level: "INTERMEDIATE", years: 1 });
    setShowAddModal(false);
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setResumeFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleComplete = () => {
    // In a real app, you'd upload the resume and save the skills here.
    completeFirstLogin();
    router.push("/employee/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-6">
      <div className="w-full max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mx-auto mb-6">
            <FiZap size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile Onboarding</h1>
          <p className="text-gray-500 mt-2 text-lg">Help us understand your expertise to tailor your experience.</p>
        </div>

        {/* Skills & Competencies Section */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FiBookOpen size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Skills & Competencies</h2>
                <p className="text-sm text-gray-400">Add or manage your technical strengths.</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200"
            >
              <FiPlus strokeWidth={3} /> Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-50 rounded-2xl p-5 border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-200 group relative"
              >
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50"
                  aria-label="Delete skill"
                >
                  <FiTrash2 size={16} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${levelColors[skill.level]}`}>
                    {skill.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {skill.years} years experience
                </div>
              </div>
            ))}
          </div>

          {skills.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-gray-400 font-bold">No skills added yet. Let's get started!</p>
            </div>
          )}
        </div>

        {/* Resume Upload Section */}
        <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm text-center">
            <div className="flex items-center gap-4 mb-8 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FiUploadCloud size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upload Resume</h2>
                <p className="text-sm text-gray-400">Share your journey with us.</p>
              </div>
            </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-[32px] py-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${dragging ? "border-blue-500 bg-blue-50/50" : "border-gray-100 bg-gray-50/50 hover:border-blue-400 hover:bg-white"}`}
          >
            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-blue-50 flex items-center justify-center mb-6 text-blue-500">
              <FiUploadCloud size={32} />
            </div>
            {resumeFile ? (
              <div>
                <p className="text-lg font-bold text-blue-600">{resumeFile.name}</p>
                <p className="text-sm text-gray-400 mt-1 font-medium italic">Click to replace file</p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-extrabold text-gray-800">
                  Drop your resume here or{" "}
                  <span className="text-blue-600 underline underline-offset-4">browse files</span>
                </p>
                <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">PDF or DOCX (Max 5MB)</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={handleComplete}
            className="group px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-3xl transition-all shadow-xl shadow-blue-200 hover:shadow-blue-300 active:scale-95 flex items-center gap-4"
          >
            Finalize Profile & Start Workspace
            <FiCheckCircle size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black text-gray-900">Add New Skill</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Python, Docker..."
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Proficiency Level</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill((s) => ({ ...s, level: e.target.value as ProficiencyLevel }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none"
                >
                  <option>BEGINNER</option>
                  <option>INTERMEDIATE</option>
                  <option>ADVANCED</option>
                  <option>EXPERT</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Years of Experience</label>
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={newSkill.years}
                  onChange={(e) => setNewSkill((s) => ({ ...s, years: parseFloat(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-sm font-bold text-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition shadow-lg shadow-blue-100"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
