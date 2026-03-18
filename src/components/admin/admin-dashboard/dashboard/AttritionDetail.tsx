"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, AlertTriangle, ShieldAlert, UserMinus, MessageSquare } from "lucide-react";

const AttritionDetail = ({ onBack }: { onBack: () => void }) => {
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
          className="p-2 hover:bg-accent-muted rounded-xl text-zinc-400 hover:text-accent transition-all border border-transparent hover:border-accent-muted dark:hover:bg-accent/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white">Attrition Risk</h1>
          <p className="text-zinc-400 mt-1">Predictive analysis of workforce stability and retention.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-accent-muted rounded-3xl p-8 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 dark:text-white">High Risk Segments</h3>
            <div className="space-y-4">
              {[
                { dept: "Engineering", risk: "High", factor: "Work-life balance", count: 12 },
                { dept: "Sales", risk: "Medium", factor: "Compensation", count: 8 },
                { dept: "Product", risk: "Low", factor: "Career growth", count: 4 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-accent-muted/20 rounded-2xl border border-accent-muted/50 dark:bg-zinc-950/50 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.risk === "High" ? "bg-red-500/10 text-red-500" : 
                      item.risk === "Medium" ? "bg-orange-500/10 text-orange-500" : "bg-accent/10 text-accent"
                    }`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-white">{item.dept}</div>
                      <div className="text-xs text-zinc-400">Primary Factor: {item.factor}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-zinc-900 dark:text-white">{item.count}</div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">At Risk</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 dark:bg-red-900/20 dark:border-red-900/30">
            <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-red-900 mb-2 dark:text-red-400">Retention Alert</h3>
            <p className="text-red-700/70 text-sm mb-6 dark:text-red-300/60">
              AI predicts a 15% increase in attrition risk for the Engineering department next month.
            </p>
            <button className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
              Initiate Retention Plan
            </button>
          </div>

          <div className="bg-white border border-accent-muted rounded-3xl p-8 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-900 mb-4 dark:text-white">Sentiment Analysis</h3>
            <div className="flex items-center gap-4 p-3 bg-accent-muted/50 rounded-xl border border-accent-muted dark:bg-zinc-950/50 dark:border-zinc-800">
              <MessageSquare className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">Overall Sentiment</div>
                <div className="text-lg font-bold text-accent">Positive (78%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttritionDetail;
