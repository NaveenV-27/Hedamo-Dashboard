"use client";

import { useState } from "react";
import Link from "next/link";
import { PackagePlus, PackageSearch } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const navItems = [
    { name: "Products", href: "/products", icon: <span>📦</span>  },   //<PackageSearch />
    { name: "Add Product", href: "/add", icon: <span>➕</span> },    // <PackagePlus />
    { name: "Analytics", href: "/analytics", icon: <span>📊</span> }, //<ChartNoAxesCombined />
  ];

  return (
    <div
      className={`bg-slate-900 border-r border-slate-700 sticky h-[90vh] p-4 left-0 top-[10vh] transition-all duration-300 hidden md:block ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <nav className="flex flex-col gap-4 mt-16">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded text-slate-200 hover:bg-gray-800 hover:text-white"
          >
            {/* Icon */}
            <div className="text-xl">{item.icon}</div>

            {/* Text: show only when sidebar is open */}
            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Toggle button */}
      <button
        className={`absolute top-4 ${isOpen ? "right-3" : "right-7"} w-6 h-6 flex items-center justify-center text-pink-500 hover:text-pink-400 transition-all cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen && (
          <svg
            className="absolute mms:right-7 md:right-8 lg:right-8 2xl:right-9 top-3 -translate-y-1/2 md:w-1.5 lg:w-3 md:h-1.5 lg:h-3 mms:w-1.5 mms:h-1.5"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10L0 5L5 0L5.8875 0.8875L1.775 5L5.8875 9.1125L5 10Z"
              fill="#B0B0B0"
            />
          </svg>
        )}
        {/* Hamburger icon */}
        <svg viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 14V12H18V14H0ZM0 10V8H18V10H0ZM0 6V4H18V6H0ZM0 2V0H18V2H0Z"
            fill={isOpen ? "#BFBFBF" : "#FFFFFF"}
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
