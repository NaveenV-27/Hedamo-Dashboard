import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/layouts/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hedamo Dashboard",
  description: "An assessment for Altibbe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
          <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="p-6 w-full h-full bg-slate-800 min-h-[90vh]">{children}</main>
        </div>
      </body>
    </html>
  );
}
