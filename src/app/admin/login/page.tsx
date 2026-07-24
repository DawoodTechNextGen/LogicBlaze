'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="glow-ambient top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#3B82F6]/15 animate-pulse-glow" />
      <div className="glow-ambient bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-[#A855F7]/10 animate-pulse-glow" />

      <div className="max-w-md w-full bg-[#0c0f15] border border-white/10 p-8 md:p-10 rounded-3xl space-y-8 shadow-2xl relative z-10">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 bg-[#3B82F6]/40 blur-lg rounded-full" />
            <img src="/logo-transparent.png" alt="LogicBlaze Logo" className="w-16 h-16 object-contain relative z-10 mx-auto" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Logic<span className="text-[#3B82F6]">Blaze</span> Admin Access
          </h1>
          <p className="text-xs text-gray-400">
            Sign in to manage SEO, Client Reviews, Blogs & Co-Founders Access
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-950/60 border border-red-500/40 text-red-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@logicblaze.co"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-neon py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
            Bcrypt Hashed Security Protected
          </div>
        </div>
      </div>
    </div>
  );
}
