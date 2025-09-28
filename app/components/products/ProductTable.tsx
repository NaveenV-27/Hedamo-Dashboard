"use client";

import { useEffect, useState } from "react"
import data from "@/data/products.json"
import Link from "next/link"

const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulate fetch
    setLoading(true);
    setTimeout(() => {
      console.log("Data fetched", data);
      setProducts(data);
      setLoading(false);
    }, 500);
  }, []);

  if(loading) {
    const rows = Array.from({ length: 5 });
    return (
    <div className="p-4 bg-slate-900 rounded-lg shadow-md animate-pulse">
      <h2 className="text-xl font-bold mb-4 text-white">Products</h2>

      <table className="min-w-full border border-gray-200">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-8"></div></th>
            <th className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-16"></div></th>
            <th className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-16"></div></th>
            <th className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-12"></div></th>
            <th className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-12"></div></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded  w-20"></div></td>
              <td className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-20"></div></td>
              <td className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-20"></div></td>
              <td className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-12"></div></td>
              <td className="px-4 py-2 border"><div className="bg-gray-200 h-4 rounded w-12"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded shadow p-4 text-gray-100">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      
      <table className="w-full border-collapse table-fixed text-left">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-2 w-1/5">Name</th>
            <th className="p-2 w-1/5">Category</th>
            <th className="p-2 w-1/5">Score</th>
            <th className="p-2 w-1/5">Status</th>
            <th className="p-2 w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-slate-700">
              <td className="p-2">{p.productName}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-black ${
                    p.score > 70
                      ? "bg-green-500"
                      : p.score > 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {p.score}
                </span>
              </td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">
                <Link
                  href={`/products/${p.id}`}
                  className="text-blue-400 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default ProductTable;
