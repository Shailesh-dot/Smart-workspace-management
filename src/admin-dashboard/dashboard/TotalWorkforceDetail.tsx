"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Users, Search, Filter, Download } from "lucide-react";

const TotalWorkforceDetail = ({ onBack }: { onBack: () => void }) => {
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
          <h1 className="text-3xl font-display font-bold text-zinc-900">Total Workforce</h1>
          <p className="text-zinc-400 mt-1">Detailed breakdown of your global talent pool.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-sky-100 p-6 rounded-2xl shadow-sm">
          <div className="text-zinc-400 text-sm font-medium mb-1">Full-time</div>
          <div className="text-2xl font-bold text-zinc-900">1,042</div>
          <div className="mt-2 h-1 w-full bg-sky-50 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 w-[83%]" />
          </div>
        </div>
        <div className="bg-white border border-sky-100 p-6 rounded-2xl shadow-sm">
          <div className="text-zinc-400 text-sm font-medium mb-1">Contractors</div>
          <div className="text-2xl font-bold text-zinc-900">156</div>
          <div className="mt-2 h-1 w-full bg-sky-50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[12%]" />
          </div>
        </div>
        <div className="bg-white border border-sky-100 p-6 rounded-2xl shadow-sm">
          <div className="text-zinc-400 text-sm font-medium mb-1">Remote</div>
          <div className="text-2xl font-bold text-zinc-900">450</div>
          <div className="mt-2 h-1 w-full bg-sky-50 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[36%]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-sky-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-sky-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="w-full bg-sky-50/50 border border-sky-100 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-sky-100 rounded-xl text-sm font-bold text-zinc-600 hover:bg-sky-50 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50/50">
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-sky-50/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200" />
                      <div>
                        <div className="font-bold text-zinc-900">Employee Name {i}</div>
                        <div className="text-xs text-zinc-400">Software Engineer</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">Engineering</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Active</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600">San Francisco, CA</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">Jan 12, 2023</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default TotalWorkforceDetail;
