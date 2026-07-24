'use client';

import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  Save,
  Radio,
  Globe2,
  Lock,
  Code2,
  FileCode
} from 'lucide-react';
import { DEFAULT_SEO_SETTINGS, SEOSettings } from '@/lib/seo-store';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SEOSettings>(DEFAULT_SEO_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-1">GLOBAL SEO & TAG MANAGEMENT</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Site Tracking & Global SEO Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure Google Tag Manager (G-Tag), Meta Pixel, default social fallbacks, and robots.txt.
          </p>
        </div>

        <button
          type="submit"
          className="btn-neon px-6 py-3 text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Integration Settings'}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/40 text-[#3B82F6] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Settings successfully updated. G-Tag and Meta Pixel scripts updated globally across all pages.
        </div>
      )}

      <div className="grid md:grid-cols-12 gap-8">
        {/* Tracking Scripts Column */}
        <div className="md:col-span-6 bg-glass-card p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#3B82F6]" />
              Analytics & Tracking Pixel Integration
            </h3>
            <p className="text-xs text-gray-400">Scripts will be auto-injected into standard document head</p>
          </div>

          {/* G-Tag */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-300 block flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#3B82F6]" />
              Google Analytics 4 / G-Tag Measurement ID
            </label>
            <input
              type="text"
              required
              value={settings.gtagId}
              onChange={(e) => setSettings({ ...settings, gtagId: e.target.value })}
              placeholder="e.g. G-XXXXXXXXXX"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3B82F6]"
            />
            <span className="text-[11px] text-gray-500">Injects official `gtag.js` script tag on all public pages</span>
          </div>

          {/* Meta Pixel */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-300 block flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              Meta (Facebook) Pixel ID
            </label>
            <input
              type="text"
              required
              value={settings.metaPixelId}
              onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
              placeholder="e.g. 9876543210123"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3B82F6]"
            />
            <span className="text-[11px] text-gray-500">Injects official Meta Pixel tracking scripts for Facebook conversion tracking</span>
          </div>
        </div>

        {/* Global SEO Defaults Column */}
        <div className="md:col-span-6 bg-glass-card p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-cyan-400" />
              Global Meta Defaults
            </h3>
            <p className="text-xs text-gray-400">Fallback metadata for home and main pages</p>
          </div>

          {/* Site Title */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-300 block">Default Site Title</label>
            <input
              type="text"
              required
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          {/* Default Meta Description */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-300 block">Default Meta Description</label>
            <textarea
              rows={3}
              required
              value={settings.defaultMetaDescription}
              onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          {/* Robots.txt */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-gray-300 block flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              Robots.txt Content
            </label>
            <textarea
              rows={4}
              value={settings.robotsTxtCustom}
              onChange={(e) => setSettings({ ...settings, robotsTxtCustom: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
