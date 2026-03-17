"use client";
import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from "recharts";
import { MOCK_EMPLOYEES } from "../constants";

const Analytics = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Process data for Bar Chart: Avg Performance by Department
  const deptData = MOCK_EMPLOYEES.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { name: emp.department, totalPerformance: 0, count: 0 };
    }
    acc[emp.department].totalPerformance += emp.performance;
    acc[emp.department].count += 1;
    return acc;
  }, {} as Record<string, { name: string; totalPerformance: number; count: number }>);

  const barData = Object.values(deptData).map(d => ({
    name: d.name,
    performance: Math.round(d.totalPerformance / d.count)
  }));

  // Process data for Pie Chart: Workforce Distribution
  const pieData = Object.values(deptData).map(d => ({
    name: d.name,
    value: d.count
  }));

  const COLORS = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  // Mock data for Line Chart: Performance Trend over 6 months
  const lineData = [
    { month: 'Oct', performance: 78 },
    { month: 'Nov', performance: 80 },
    { month: 'Dec', performance: 82 },
    { month: 'Jan', performance: 81 },
    { month: 'Feb', performance: 84 },
    { month: 'Mar', performance: 86 },
  ];

  if (!mounted) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header>
          <h1 className="text-3xl font-display font-bold text-zinc-900">Analytics Deep Dive</h1>
          <p className="text-zinc-400 mt-1">Comprehensive visualization of workforce performance and distribution.</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm h-[400px] animate-pulse" />
          <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm h-[400px] animate-pulse" />
          <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm lg:col-span-2 h-[400px] animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-display font-bold text-zinc-900">Analytics Deep Dive</h1>
        <p className="text-zinc-400 mt-1">Comprehensive visualization of workforce performance and distribution.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Performance by Department */}
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Avg. Performance by Department</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f9ff" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0f2fe', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f0f9ff'}}
                />
                <Bar dataKey="performance" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Performance Trend */}
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Performance Trend (6 Months)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f9ff" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0f2fe', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="performance" stroke="#6366f1" strokeWidth={3} dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Workforce Distribution */}
        <div className="bg-white border border-sky-100 rounded-3xl p-8 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-zinc-900 mb-6">Workforce Distribution by Department</h3>
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="h-[300px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0f2fe', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-1/3">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm font-medium text-zinc-600">{entry.name}</span>
                  <span className="text-sm font-bold text-zinc-900 ml-auto">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
