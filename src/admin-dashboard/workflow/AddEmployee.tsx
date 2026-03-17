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
    <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Add New Employee</h2>
          <p className="text-zinc-400 text-sm">Enter the details of the new team member.</p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-sky-50 rounded-xl text-zinc-400 transition-colors"
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
                className="rounded-3xl border-4 border-sky-50 object-cover shadow-md" 
                alt="Avatar Preview" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              type="button"
              onClick={() => setFormData({...formData, avatar: `https://picsum.photos/seed/${Math.random()}/200/200`})}
              className="absolute -bottom-2 -right-2 p-2 bg-sky-600 text-white rounded-xl shadow-lg hover:bg-sky-700 transition-all"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-zinc-400 mt-3 font-medium">Click icon to randomize avatar</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-500" />
              Full Name
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-zinc-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-50" />
              Professional Role
            </label>
            <input 
              required
              type="text" 
              placeholder="e.g. Senior Developer"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-zinc-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-500" />
              Department
            </label>
            <select 
              required
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-zinc-900 appearance-none"
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
            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-sky-500" />
              Attrition Risk
            </label>
            <select 
              value={formData.attritionRisk}
              onChange={(e) => setFormData({...formData, attritionRisk: e.target.value})}
              className="w-full bg-sky-50/50 border border-sky-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-zinc-900 appearance-none"
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                <BarChart className="w-4 h-4 text-sky-500" />
                Performance Score
              </label>
              <span className="text-sky-600 font-bold font-mono">{formData.performance}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={formData.performance}
              onChange={(e) => setFormData({...formData, performance: e.target.value})}
              className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <button 
            type="submit"
            className="flex-1 py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20"
          >
            Confirm & Add Employee
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 bg-white border border-sky-100 text-zinc-600 font-bold rounded-2xl hover:bg-sky-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
