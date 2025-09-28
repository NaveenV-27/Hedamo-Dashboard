"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";
import Products from "@/data/products.json";

const AnalyticsPage = () => {
  
  const categoryMap: Record<string, number> = {};
  Products.forEach((p: any) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  
  let high = 0, medium = 0, low = 0;
  Products.forEach((p: any) => {
    if (p.score <= 40) high++;
    else if (p.score <= 70) medium++;
    else low++;
  });
  const riskData = [
    { risk: "High Risk", count: high },
    { risk: "Medium Risk", count: medium },
    { risk: "Low Risk", count: low },
  ];

  //dummy data
  const scoreTrendData = [ 
    { month: "Jan", avgScore: 65 },
    { month: "Feb", avgScore: 72 }, 
    { month: "Mar", avgScore: 58 }, 
    { month: "Apr", avgScore: 80 }, 
    { month: "May", avgScore: 74 }, 
    { month: "Jun", avgScore: 85 }, 
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

  return (
    <div className="p-6 space-y-6 bg-slate-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>

      {/* Category Distribution */}
      <div className="bg-slate-800 border border-slate-700 p-4 rounded shadow overflow-x-scroll md:overflow-auto">
        <h2 className="text-xl font-semibold mb-2">Product Distribution by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend/>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="bg-slate-800 border border-slate-700 p-4 rounded shadow overflow-x-scroll md:overflow-auto">
        <h2 className="text-xl font-semibold mb-2">Risk Level Breakdown</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="risk" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Score Trend */}
      <div className="bg-slate-800 border border-slate-700 p-4 rounded shadow overflow-x-scroll md:overflow-auto">
        <h2 className="text-xl font-semibold mb-2">Average Transparency Score Trend (Dummy Data)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
