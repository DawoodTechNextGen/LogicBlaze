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
  Star,
  Calculator
} from 'lucide-react';
import { INITIAL_BLOGS, CATEGORIES, BlogPost } from '@/lib/blog-store';

export default function BlogListingPage() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  React.useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((b: any) => ({
            id: b.id,
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            category: b.category,
            tags: b.focus_keywords ? b.focus_keywords.split(',') : ['Engineering'],
            author: {
              name: b.author_name || 'LogicBlaze Admin',
              role: b.author_role || 'Founder & CTO',
              avatar: b.author_avatar || '/logo-transparent.png'
            },
            featuredImage: b.cover_image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
            publishedAt: b.published_at || '2026-07-24',
            readTime: b.read_time || '6 min read',
            status: 'published' as const,
            views: 12000,
            seo: {
              seoTitle: b.seo_title || b.title,
              metaDescription: b.meta_description || b.excerpt,
              focusKeywords: b.focus_keywords ? b.focus_keywords.split(',') : [],
              canonicalUrl: b.canonical_url || `https://logicblaze.co/blog/${b.slug}`,
              ogImage: b.cover_image,
              noIndex: Boolean(b.is_no_index)
            }
          }));
          setBlogsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPosts = blogsList.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogsList[0] || INITIAL_BLOGS[0];

  return (
    <div className="min-h-screen bg-[#081b33] text-white selection:bg-[#3B82F6] selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="glow-ambient top-[-5%] left-[25%] w-[600px] h-[600px] bg-[#3B82F6]/15 animate-pulse-glow" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0a0b0e]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo-transparent.png" alt="LogicBlaze Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black tracking-tight text-white">
              Logic<span className="text-[#3B82F6]">Blaze</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <Link href="/#services" className="hover:text-[#3B82F6] transition-colors">Capabilities</Link>
            <Link href="/#work" className="hover:text-[#3B82F6] transition-colors">Case Studies</Link>
            <Link href="/#process" className="hover:text-[#3B82F6] transition-colors">Process</Link>
            <Link href="/#testimonials" className="hover:text-[#3B82F6] transition-colors">Reviews</Link>
            <Link href="/#tech" className="hover:text-[#3B82F6] transition-colors">Tech Stack</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="btn-glass px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#3B82F6]" />
              Cost Estimator
            </Link>
            <Link
              href="/"
              className="btn-neon px-6 py-2.5 text-xs md:text-sm flex items-center gap-2 cursor-pointer"
            >
              Start Project
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

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#3B82F6]/30 blur-sm rounded-full" />
                <img src="/logo-transparent.png" alt="LogicBlaze Logo" className="w-8 h-8 object-contain relative z-10" />
              </div>
              <span className="text-xl font-black text-white">Logic<span className="text-[#3B82F6]">Blaze</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              LogicBlaze is a global software transformation agency engineering high-scale mobile applications, enterprise AI models, and cloud systems.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Capabilities</div>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Mobile Engineering</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">AI & Machine Learning</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Enterprise Web</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Web3 Protocols</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</div>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#work" className="hover:text-[#3B82F6]">Case Studies</Link></li>
              <li><Link href="/#process" className="hover:text-[#3B82F6]">Process</Link></li>
              <li><Link href="/#testimonials" className="hover:text-[#3B82F6]">Client Reviews</Link></li>
              <li><Link href="/blog" className="text-[#3B82F6] hover:underline font-semibold flex items-center gap-1">Insights & Blog</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Global Hubs</div>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>San Francisco, CA</li>
              <li>London, UK</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 gap-4">
          <div>© 2026 LOGICBLAZE. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Security SLA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
