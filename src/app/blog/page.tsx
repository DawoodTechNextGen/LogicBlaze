'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  ArrowRight,
  Clock,
  Tag,
  User,
  ChevronRight,
  Globe2,
  Share2,
  Star
} from 'lucide-react';
import { INITIAL_BLOGS, CATEGORIES, BlogPost } from '@/lib/blog-store';

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = INITIAL_BLOGS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = INITIAL_BLOGS[0];

  return (
    <div className="min-h-screen bg-[#081b33] text-white selection:bg-[#3B82F6] selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="glow-ambient top-[-5%] left-[25%] w-[600px] h-[600px] bg-[#3B82F6]/15 animate-pulse-glow" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#081b33]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
              <Sparkles className="w-6 h-6 text-black font-extrabold" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              CUBIX<span className="text-[#3B82F6]">.BLOG</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold text-gray-300 hover:text-[#3B82F6] transition-colors">
              Main Site
            </Link>
            <Link href="/admin" className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2">
              Admin Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO BANNER & SEARCH */}
      <section className="pt-16 pb-12 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-bold">
            INSIGHTS & ENGINEERING THOUGHT LEADERSHIP
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Engineering Journal
          </h1>
          <p className="text-gray-400 text-base">
            In-depth technical guides, AI neural architecture breakdowns, and enterprise software strategies.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-glass border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 justify-center pb-4 max-w-4xl mx-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#3B82F6] text-black shadow-md shadow-[#3B82F6]/20'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            All Topics
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#3B82F6] text-black shadow-md shadow-[#3B82F6]/20'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED POST BANNER */}
      {selectedCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="group">
            <div className="bg-glass-card rounded-3xl border border-white/10 overflow-hidden grid md:grid-cols-12 gap-8 items-center p-8 md:p-10 hover:border-[#3B82F6]/50 transition-all">
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-bold">
                    Featured Story
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold text-white block">{featuredPost.author.name}</span>
                    <span className="text-[10px] text-gray-500">{featuredPost.author.role}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 h-72 rounded-2xl overflow-hidden bg-black relative">
                <img src={featuredPost.featuredImage} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* POSTS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="bg-glass-card rounded-3xl border border-white/10 overflow-hidden h-full flex flex-col justify-between hover:border-[#3B82F6]/50 transition-all">
                <div>
                  <div className="h-52 bg-black overflow-hidden relative">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#3B82F6] text-xs font-bold border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-semibold text-gray-300">{post.author.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#3B82F6] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-10 text-center text-xs text-gray-500">
        © 2026 CUBIX.LAB. Full WordPress-grade SEO & Site Kit Analytics integrated.
      </footer>
    </div>
  );
}
