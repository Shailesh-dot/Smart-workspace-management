"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, User, Briefcase, Building, BarChart, AlertCircle, Camera } from "lucide-react";

const AddEmployee = ({ onAdd, onCancel }: { onAdd: (emp: any) => void; onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    performance: "80",
    attritionRisk: "Low",
    avatar: "https://i.pravatar.cc/150?u=placeholder"
  });

  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      avatar: `https://picsum.photos/seed/${Math.random()}/200/200`
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.department) return;
    
    onAdd({
      ...formData,
      id: Date.now(),
      performance: parseInt(formData.performance, 10)
    });
  };

  return (
    <div className="bg-white border border-accent-muted rounded-3xl p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Add New Employee</h2>
          <p className="text-zinc-400 text-sm">Enter the details of the new team member.</p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-accent-muted rounded-xl text-zinc-400 transition-colors dark:hover:bg-accent/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="relative w-24 h-24">
              <Image 
                src={formData.avatar} 
                fill
                className="rounded-3xl border-4 border-accent-muted object-cover shadow-md dark:border-zinc-800" 
                alt="Avatar Preview" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              type="button"
              onClick={() => setFormData({...formData, avatar: `https://picsum.photos/seed/${Math.random()}/200/200`})}
              className="absolute -bottom-2 -right-2 p-2 bg-accent text-white rounded-xl shadow-lg hover:opacity-90 transition-all"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-zinc-400 mt-3 font-medium">Click icon to randomize avatar</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2 dark:text-zinc-300">
              <User className="w-4 h-4 text-accent" />
              Full Name
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-accent-muted/50 border border-accent-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2 dark:text-zinc-300">
              <Briefcase className="w-4 h-4 text-accent" />
              Professional Role
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. Senior Developer"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-accent-muted/50 border border-accent-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2 dark:text-zinc-300">
              <Building className="w-4 h-4 text-accent" />
              Department
            </label>
            <select 
              required
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full bg-accent-muted/50 border border-accent-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-zinc-900 appearance-none dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2 dark:text-zinc-300">
              <AlertCircle className="w-4 h-4 text-accent" />
              Attrition Risk
            </label>
            <select 
              value={formData.attritionRisk}
              onChange={(e) => setFormData({...formData, attritionRisk: e.target.value})}
              className="w-full bg-accent-muted/50 border border-accent-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-all text-zinc-900 appearance-none dark:bg-zinc-950 dark:border-zinc-800 dark:text-white"
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-700 flex items-center gap-2 dark:text-zinc-300">
                <BarChart className="w-4 h-4 text-accent" />
                Performance Score
              </label>
              <span className="text-accent font-bold font-mono">{formData.performance}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={formData.performance}
              onChange={(e) => setFormData({...formData, performance: e.target.value})}
              className="w-full h-2 bg-accent-muted rounded-lg appearance-none cursor-pointer accent-accent dark:bg-zinc-800"
            />
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <button 
            type="submit"
            className="flex-1 py-4 bg-accent text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            Confirm & Add Employee
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 bg-white border border-accent-muted text-zinc-600 font-bold rounded-2xl hover:bg-accent-muted transition-all dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
