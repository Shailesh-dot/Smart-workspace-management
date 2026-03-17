"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Plus
} from "lucide-react";
import { MOCK_EMPLOYEES } from "../constants";
import AddEmployee from "./AddEmployee";

const Workflow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [isAdding, setIsAdding] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: "All",
    risk: "All"
  });
  
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = filters.department === "All" || emp.department === filters.department;
    const matchesRisk = filters.risk === "All" || emp.attritionRisk === filters.risk;
    
    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleAddEmployee = (newEmp: any) => {
    setEmployees([newEmp, ...employees]);
    setIsAdding(false);
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Role", "Department", "Performance", "Attrition Risk"];
    const csvContent = [
      headers.join(","),
      ...filteredEmployees.map(emp => [
        emp.id,
        `"${emp.name}"`,
        `"${emp.role}"`,
        `"${emp.department}"`,
        `${emp.performance}%`,
        emp.attritionRisk
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `workforce_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const departments = ["All", ...new Set(employees.map(e => e.department))];
  const risks = ["All", "Low", "Medium", "High"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Workflow Management</h1>
          <p className="text-zinc-400 mt-1">Manage your global workforce and team operations.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        )}
      </header>

      {isAdding ? (
        <AddEmployee 
          onAdd={handleAddEmployee} 
          onCancel={() => setIsAdding(false)} 
        />
      ) : (
        <>
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-sky-100 shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search by name, role, or department..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/50 transition-all text-zinc-900"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    showFilters || filters.department !== "All" || filters.risk !== "All"
                    ? "bg-sky-600 text-white"
                    : "bg-white border border-sky-100 text-zinc-600 hover:bg-sky-50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button 
                  onClick={handleExport}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-sky-100 rounded-xl text-sm font-bold text-zinc-600 hover:bg-sky-50 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-sky-50/50 p-6 rounded-3xl border border-sky-100 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Department</label>
                  <div className="flex flex-wrap gap-2">
                    {departments.map(dept => (
                      <button
                        key={dept}
                        onClick={() => setFilters({...filters, department: dept})}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          filters.department === dept
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                          : "bg-white text-zinc-600 border border-sky-100 hover:border-sky-300"
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Risk Level</label>
                  <div className="flex flex-wrap gap-2">
                    {risks.map(risk => (
                      <button
                        key={risk}
                        onClick={() => setFilters({...filters, risk: risk})}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          filters.risk === risk
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                          : "bg-white text-zinc-600 border border-sky-100 hover:border-sky-300"
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Employee Grid/List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14">
                      <Image 
                        src={emp.avatar} 
                        fill
                        className="rounded-2xl border-2 border-sky-50 object-cover" 
                        alt={emp.name} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-lg">{emp.name}</h3>
                      <p className="text-sky-600 text-sm font-medium">{emp.role}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-sky-50 rounded-xl text-zinc-400 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{emp.name.toLowerCase().replace(' ', '.')}@company.com</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-sky-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Performance</span>
                    <span className="text-lg font-bold text-zinc-900">{emp.performance}%</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Risk</span>
                    <span className={`text-sm font-bold ${
                      emp.attritionRisk === "High" ? "text-red-500" : 
                      emp.attritionRisk === "Medium" ? "text-orange-500" : "text-emerald-500"
                    }`}>
                      {emp.attritionRisk}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-sky-50 text-sky-600 text-xs font-bold rounded-xl hover:bg-sky-100 transition-all">
                    View Profile
                  </button>
                  <button className="py-2.5 bg-white border border-sky-100 text-zinc-600 text-xs font-bold rounded-xl hover:bg-sky-50 transition-all">
                    Message
                  </button>
                </div>
              </div>
            ))}

            {filteredEmployees.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white border border-dashed border-sky-200 rounded-3xl">
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-sky-500 opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">No employees found</h3>
                <p className="text-zinc-400 max-w-xs">We couldn&apos;t find any employees matching &quot;{searchQuery}&quot;. Try a different search term.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Workflow;
