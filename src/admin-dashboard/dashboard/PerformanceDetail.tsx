"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Award, Target, Zap } from "lucide-react";

const PerformanceDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-sky-50 rounded-xl text-zinc-400 hover:text-sky-600 transition-all border border-transparent hover:border-sky-100"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Avg. Performance</h1>
          <p className="text-zinc-400 mt-1">Real-time performance analytics and productivity metrics.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Performance Distribution</h3>
          <div className="space-y-6">
            {[
              { label: "Exceeds Expectations", count: 245, percent: 85, color: "emerald" },
              { label: "Meets Expectations", count: 680, percent: 70, color: "sky" },
              { label: "Needs Improvement", count: 120, percent: 40, color: "orange" },
              { label: "Critical", count: 45, percent: 15, color: "red" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-zinc-700">{item.label}</span>
                  <span className="text-zinc-400">{item.count} employees</span>
                </div>
                <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${item.color}-500 transition-all duration-1000`} 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Key Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl">
              <Award className="w-6 h-6 text-sky-500 mb-2" />
              <div className="text-xl font-bold text-zinc-900">92%</div>
              <div className="text-xs text-zinc-400">Project Completion</div>
            </div>
            <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl">
              <Target className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-xl font-bold text-zinc-900">88%</div>
              <div className="text-xs text-zinc-400">Goal Alignment</div>
            </div>
            <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl">
              <Zap className="w-6 h-6 text-orange-500 mb-2" />
              <div className="text-xl font-bold text-zinc-900">14%</div>
              <div className="text-xs text-zinc-400">Velocity Increase</div>
            </div>
            <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
              <div className="text-xl font-bold text-zinc-900">4.8/5</div>
              <div className="text-xs text-zinc-400">Peer Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceDetail;
