"use client";
import React from "react";
import { motion } from "motion/react";
import { BookOpen, GraduationCap, Trophy, Target, Zap, ChevronRight } from "lucide-react";

const Upskilling = () => {
  const courses = [
    { id: 1, title: "Generative AI Fundamentals", provider: "Internal Academy", duration: "12h", progress: 45, status: "In Progress" },
    { id: 2, title: "Advanced Cloud Security", provider: "AWS Training", duration: "24h", progress: 100, status: "Completed" },
    { id: 3, title: "Data-Driven Leadership", provider: "Coursera", duration: "18h", progress: 10, status: "In Progress" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Upskilling & Development</h1>
          <p className="text-zinc-400 mt-1">Bridge the skill gap with AI-recommended learning paths.</p>
        </div>
        <button className="px-6 py-3 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Browse Catalog
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">Active Learning Paths</h2>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="p-4 bg-sky-50/30 border border-sky-50 rounded-2xl hover:border-sky-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-sky-100 text-sky-500">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900">{course.title}</h3>
                        <p className="text-zinc-400 text-sm">{course.provider} • {course.duration}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-sky-50 text-sky-600"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-sky-50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-500 transition-all duration-1000" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="space-y-6">
          <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Skill Gap Analysis</h2>
            <p className="text-zinc-400 text-sm mb-8">AI assessment of organizational needs</p>
            
            <div className="space-y-6">
              {[
                { skill: "Machine Learning", gap: 65, priority: "High" },
                { skill: "Cloud Architecture", gap: 40, priority: "Medium" },
                { skill: "Cybersecurity", gap: 25, priority: "Low" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-zinc-900">{item.skill}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${
                      item.priority === "High" ? "text-red-500" : "text-sky-500"
                    }`}>{item.priority} Priority</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-zinc-900">{item.gap}%</div>
                    <div className="text-xs text-zinc-400 font-medium">Gap</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-4 bg-sky-50 text-sky-600 font-bold rounded-2xl hover:bg-sky-100 transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Auto-Generate Plan
            </button>
          </div>

          <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg shadow-sky-600/20">
            <Trophy className="w-10 h-10 mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Certifications</h3>
            <p className="text-sky-100 text-sm mb-6 opacity-80">12 employees earned new certifications this month.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2">
              View Leaderboard
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Upskilling;
