'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  BarChart3,
  MessageSquare,
  FileText,
  PlusSquare,
  Sliders,
  Users,
  Briefcase,
  LogOut,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { MonitorX } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // 1. Check if device screen width is smaller than desktop (1024px)
    const checkScreenSize = () => {
      setIsMobileDevice(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // 2. Check Auth Session
    if (pathname !== '/admin/login') {
      fetch('/api/auth/check')
        .then((res) => {
          if (!res.ok) {
            setIsAuthenticated(false);
            router.push('/admin/login');
          } else {
            setIsAuthenticated(true);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          router.push('/admin/login');
        });
    } else {
      setIsAuthenticated(true);
    }

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Mobile Device Block Screen
  if (isMobileDevice) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#0c0f15] border border-red-500/30 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
            <MonitorX className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-white">Desktop Access Only</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              LogicBlaze Admin Panel and SEO Suite is restricted to Laptop & Desktop computers only for security and formatting reasons.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] font-mono text-blue-400">
            Please open this URL on a Desktop or Laptop screen (Width ≥ 1024px).
          </div>
          <Link href="/" className="btn-glass w-full py-2.5 text-xs font-bold block">
            Return to Main Website
          </Link>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Site Kit Analytics', icon: BarChart3 },
    { href: '/admin/case-studies', label: 'Case Studies SEO', icon: Briefcase },
    { href: '/admin/reviews', label: 'Client Reviews', icon: MessageSquare },
    { href: '/admin/users', label: 'User Management', icon: Users },
    { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
    { href: '/admin/blogs/editor', label: 'Add New Blog', icon: PlusSquare },
    { href: '/admin/settings', label: 'SEO & Tracking Suite', icon: Sliders }
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0d0e12] border-r border-white/10 p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="space-y-8">
          {/* Logo Badge */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#3B82F6]/30 blur-sm rounded-full" />
              <img src="/logo-transparent.png" alt="LogicBlaze Admin" className="w-9 h-9 object-contain relative z-10" />
            </div>
            <div>
              <span className="text-lg font-black text-white block tracking-tight">Logic<span className="text-[#3B82F6]">Blaze</span></span>
              <span className="text-[10px] text-gray-500 font-mono">Admin & SEO Control</span>
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
            className="btn-glass w-full py-2 px-4 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#3B82F6]" />
            View Live Website
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 text-xs font-bold text-red-400 hover:bg-red-950/40 rounded-xl border border-red-800/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Admin Header Mobile Nav */}
        <header className="h-16 bg-[#0d0e12] border-b border-white/10 px-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <img src="/logo-transparent.png" alt="LogicBlaze Admin" className="w-6 h-6 object-contain" />
            <span className="font-bold text-white text-sm">LogicBlaze Admin</span>
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
