"use client";

import { useState } from "react";
import { House, PackagePlus, PackageSearch } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-700 md:sticky top-0 w-full h-[10vh] z-50 px-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full">
        <div className="flex justify-center md:justify-between items-center h-full">
          
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <House />
            Hedamo
          </Link>

          {/* Right section (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/add" className="text-slate-200 hover:text-white flex gap-1">
              <PackagePlus/>            
              Add Product
            </Link>
            <Link href="/products" className="text-slate-200 hover:text-white flex gap-1">
              <PackageSearch/>
              View Products
            </Link>
          </div>

          {/* Mobile toggle
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-200"
          >
            {isOpen ? <X /> : <Menu />}
          </button> */}
        </div>

        {/* Mobile dropdown */}
        {/* {isOpen && (
          <div className="md:hidden py-2 space-y-2">
            <Link href="/add" className="block text-slate-200 hover:text-white">
              Add
            </Link>
            <Link
              href="/products"
              className="block text-slate-200 hover:text-white"
            >
              View Products
            </Link>
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
