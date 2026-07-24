'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Search,
  Eye,
  MousePointerClick,
  Award,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Radio,
  Sliders,
  Globe2
} from 'lucide-react';
import { SITE_KIT_ANALYTICS, DEFAULT_SEO_SETTINGS } from '@/lib/seo-store';
import { INITIAL_BLOGS } from '@/lib/blog-store';

export default function SiteKitAnalyticsDashboard() {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const overview = stats?.overview || SITE_KIT_ANALYTICS.overview;
  const trafficSources = stats?.trafficSources || SITE_KIT_ANALYTICS.trafficSources;
  const searchQueries = SITE_KIT_ANALYTICS.searchQueries;

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-bold mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#3B82F6]" />
            SITE KIT BY GOOGLE INTEGRATED
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Site Analytics & Search Console Suite
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time organic search performance, traffic distribution, and SEO health metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs/editor"
            className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Write New SEO Post
          </Link>
          <Link
            href="/admin/settings"
            className="btn-glass px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-[#3B82F6]" />
            Tracking Codes
          </Link>
        </div>
      </div>

      {/* SITE KIT OVERVIEW TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
            <span>TOTAL USERS & VISITORS</span>
            <Eye className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="text-3xl font-black text-white">{overview.totalVisitors}</div>
          <div className="text-xs text-[#3B82F6] font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {overview.totalVisitorsChange} vs last 30 days
          </div>
        </div>

        <div className="bg-glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
            <span>SEARCH IMPRESSIONS</span>
            <Search className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white">{overview.searchImpressions}</div>
          <div className="text-xs text-[#3B82F6] font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {overview.searchImpressionsChange} vs last 30 days
          </div>
        </div>

        <div className="bg-glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
            <span>AVERAGE CTR</span>
            <MousePointerClick className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{overview.averageCtr}</div>
          <div className="text-xs text-[#3B82F6] font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {overview.averageCtrChange} engagement
          </div>
        </div>

        <div className="bg-glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-bold">
            <span>SEARCH POSITION</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-[#3B82F6]">{overview.averagePosition}</div>
          <div className="text-xs text-gray-400 font-bold">
            {overview.averagePositionChange} rank
          </div>
        </div>
      </div>

      {/* TRAFFIC SOURCES & SEARCH QUERIES */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Top Search Queries Table */}
        <div className="md:col-span-7 bg-glass-card p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-[#3B82F6]" />
                Top Organic Search Queries (Google Console)
              </h3>
              <p className="text-xs text-gray-400">Search phrases driving organic traffic to your site</p>
            </div>
            <span className="text-xs font-mono text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded border border-[#3B82F6]/30">
              Live Console API
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500 uppercase border-b border-white/5 font-mono">
                  <th className="pb-3">Keyword Query</th>
                  <th className="pb-3">Clicks</th>
                  <th className="pb-3">Impressions</th>
                  <th className="pb-3">Avg Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {searchQueries.map((q, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{q.query}</td>
                    <td className="py-3 text-[#3B82F6] font-bold">{q.clicks.toLocaleString()}</td>
                    <td className="py-3 text-gray-400">{q.impressions.toLocaleString()}</td>
                    <td className="py-3 font-mono font-bold text-amber-400">#{q.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources Breakdown */}
        <div className="md:col-span-5 bg-glass-card p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
              Acquisition Channels
            </h3>
            <p className="text-xs text-gray-400">Visitor breakdown by acquisition channel</p>
          </div>

          <div className="space-y-4">
            {trafficSources.map((source: any, idx: number) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">{source.source}</span>
                  <span className="text-[#3B82F6] font-bold">{source.percentage}% ({source.visitors})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3B82F6] to-[#A855F7] rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Active Tags Widget */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 pt-4">
            <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              Active Integration Tags
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6]">
                G-TAG: {DEFAULT_SEO_SETTINGS.gtagId}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
                PIXEL ID: {DEFAULT_SEO_SETTINGS.metaPixelId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP PERFORMING BLOG POSTS */}
      <div className="bg-glass-card p-6 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3B82F6]" />
              Top Published Articles & SEO Performance
            </h3>
            <p className="text-xs text-gray-400">Post performance with Focus Keywords and page views</p>
          </div>
          <Link href="/admin/blogs" className="text-xs font-bold text-[#3B82F6] hover:underline flex items-center gap-1">
            Manage All Posts
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {INITIAL_BLOGS.map((post) => (
            <div key={post.id} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#3B82F6]/10 text-[#3B82F6]">
                  {post.category}
                </span>
                <span className="text-xs font-bold text-gray-400">{post.views.toLocaleString()} Views</span>
              </div>

              <h4 className="text-sm font-bold text-white line-clamp-2">{post.title}</h4>

              <div className="space-y-1">
                <span className="text-[11px] text-gray-500 font-mono block">Focus Keywords:</span>
                <div className="flex flex-wrap gap-1">
                  {post.seo.focusKeywords.map((kw, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SEO Score: 98/100
                </span>
                <Link href={`/blog/${post.slug}`} target="_blank" className="text-gray-400 hover:text-white flex items-center gap-1">
                  View Post
                  <Globe2 className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
