'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  BarChart3,
  FileText,
  PlusSquare,
  Sliders,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Site Kit Analytics', icon: BarChart3 },
    { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
    { href: '/admin/blogs/editor', label: 'Add New Blog', icon: PlusSquare },
    { href: '/admin/settings', label: 'SEO & Tracking Suite', icon: Sliders }
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-white flex font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0a0c10] border-r border-white/10 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-8">
          {/* Logo Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
              <Sparkles className="w-5 h-5 text-black font-extrabold" />
            </div>
            <div>
              <span className="text-lg font-black text-white block tracking-tight">CUBIX<span className="text-[#3B82F6]">.ADMIN</span></span>
              <span className="text-[10px] text-gray-500 font-mono">SEO & Analytics Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#3B82F6] text-black shadow-md shadow-[#3B82F6]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-[#3B82F6]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link to Public Site */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/40 p-2.5 rounded-lg border border-blue-800/40">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Site Kit & SEO Active</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="btn-glass w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#3B82F6]" />
            View Live Website
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Admin Header Mobile Nav */}
        <header className="h-16 bg-[#0a0c10] border-b border-white/10 px-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#3B82F6]" />
            <span className="font-bold text-white text-sm">CUBIX Admin</span>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-gray-400 hover:text-[#3B82F6] p-1">
                {item.label.split(' ')[0]}
              </Link>
            ))}
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
