"use client";
import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, Target, Zap, Users, BookOpen, TrendingUp } from "lucide-react";

const SkillCoverageDetail = ({ onBack }: { onBack: () => void }) => {
  const skills = [
    { name: "React / Frontend", coverage: 85, demand: 90, status: "Healthy" },
    { name: "Node.js / Backend", coverage: 72, demand: 85, status: "Gap Identified" },
    { name: "Cloud Architecture", coverage: 45, demand: 80, status: "Critical Gap" },
    { name: "AI / Machine Learning", coverage: 30, demand: 95, status: "Critical Gap" },
    { name: "UI/UX Design", coverage: 78, demand: 75, status: "Healthy" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-sky-50 rounded-xl text-zinc-400 hover:text-sky-600 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white">Skill Coverage Analysis</h1>
          <p className="text-zinc-400 mt-1">Detailed breakdown of organizational capabilities vs market demand.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Skill Matrix */}
          <div className="bg-white border border-accent-muted rounded-3xl p-8 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 mb-6 dark:text-white">Skill Matrix</h2>
            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white">{skill.name}</span>
                      <span className={`ml-3 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        skill.status === "Healthy" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" :
                        skill.status === "Gap Identified" ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400" : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-zinc-400">
                      Coverage: <span className="text-zinc-900 dark:text-white">{skill.coverage}%</span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-accent-muted rounded-full overflow-hidden relative dark:bg-zinc-800">
                    <div 
                      className="absolute top-0 left-0 h-full bg-accent-muted opacity-50 dark:bg-accent/20" 
                      style={{ width: `${skill.demand}%` }}
                    />
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        skill.coverage < 50 ? "bg-red-500" : 
                        skill.coverage < 75 ? "bg-orange-500" : "bg-accent"
                      }`}
                      style={{ width: `${skill.coverage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <span>Current Supply</span>
                    <span>Market Demand: {skill.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white border border-accent-muted rounded-3xl p-8 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 mb-6 dark:text-white">Key Insights</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-accent-muted rounded-xl flex items-center justify-center text-accent flex-shrink-0 dark:bg-accent/10">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">Rising Demand</div>
                  <p className="text-xs text-zinc-400">AI skills demand increased by 40% this quarter.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 flex-shrink-0 dark:bg-orange-500/10">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">Critical Gaps</div>
                  <p className="text-xs text-zinc-400">Cloud Architecture remains the highest risk gap.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-accent rounded-3xl p-8 text-white shadow-lg shadow-accent/20">
            <Zap className="w-10 h-10 mb-4 text-accent/30" />
            <h3 className="text-xl font-bold mb-2">Bridge the Gap</h3>
            <p className="text-white/80 text-sm mb-6">AI has identified 12 employees ready for cross-training in Cloud Architecture.</p>
            <button className="w-full py-3 bg-white text-accent rounded-xl font-bold hover:bg-white/90 transition-all text-sm">
              Start Training Campaign
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCoverageDetail;
