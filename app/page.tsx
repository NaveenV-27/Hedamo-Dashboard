"use client"

import { useEffect, useState } from "react";
import data from "@/data/products.json"
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Product = {
  id: number
  productName: string
  category: string
  score: number
  status: string
  suggestions?: string[]
  flags?: string[]
}

const COLORS = ["#22c55e", "#eab308", "#ef4444"] // green, yellow, red


const mockProducts = data;
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const list = mockProducts.slice(0,5);
  useEffect(() => {
    setTimeout(() => setProducts(list), 500)
  }, [])

  const totalProducts = products.length
  const avgScore = totalProducts > 0 ? Math.round(products.reduce((sum, p) => sum + p.score, 0) / totalProducts) : 0
  const flaggedProducts = products.filter(p => p.flags).length
  const approved = products.filter(p => p.status === "Approved").length
  const pending = products.filter(p => p.status === "Pending").length

  const scoreData = [
    { name: "High (70-100)", value: products.filter(p => p.score >= 70).length },
    { name: "Medium (40-69)", value: products.filter(p => p.score >= 40 && p.score < 70).length },
    { name: "Low (0-39)", value: products.filter(p => p.score < 40).length },
  ]

  const recentSuggestions = products.flatMap(p =>
    p.suggestions?.map(s => ({ product: p.productName, suggestion: s })) || []
  ).slice(0, 4)

  return (
    <div className="p-6 space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold">Welcome back 👋</h1>
      <p className="text-gray-400">Here’s an overview of your product transparency dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded shadow">
          <p className="text-gray-400">Total Products</p>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded shadow">
          <p className="text-gray-400">Avg Transparency Score</p>
          <p className="text-2xl font-bold">{avgScore}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded shadow">
          <p className="text-gray-400">Flagged Products</p>
          <p className="text-2xl font-bold">{flaggedProducts}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded shadow">
          <p className="text-gray-400">Approved / Pending</p>
          <p className="text-2xl font-bold">{approved} / {pending}</p>
        </div>
      </div>

      {/* Chart + Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-slate-900 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Transparency Score Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={scoreData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI Suggestions */}
        <div className="bg-slate-900 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Recent AI Suggestions</h2>
          <ul className="space-y-2">
            {recentSuggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-400">💡</span>
                <p><span className="font-semibold">{s.product}</span>: {s.suggestion}</p>
              </li>
            ))}
          </ul>
          {recentSuggestions.length === 0 && <p className="text-gray-400">No suggestions yet.</p>}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-slate-900 p-4 rounded shadow overflow-x-scroll md:overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Recent Products</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(p => (
              <tr key={p.id} className="border-b border-slate-700">
                <td className="p-2">{p.productName}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-black ${p.score > 70 ? "bg-green-500" : p.score > 40 ? "bg-yellow-500" : "bg-red-500"}`}>
                    {p.score}
                  </span>
                </td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">
                  <Link href={`/products/${p.id}`} className="text-blue-400 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link href="/add" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">➕ Add Product</Link>
        <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">📂 Manage Products</Link>
        <Link href="/analytics" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">📊 View Analytics</Link>
      </div>
    </div>
  )
}
