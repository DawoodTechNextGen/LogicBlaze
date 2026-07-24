'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  PlusSquare,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Sparkles
} from 'lucide-react';
import { INITIAL_BLOGS, BlogPost } from '@/lib/blog-store';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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
          setBlogs(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b
      )
    );
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || b.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-1">BLOG & CONTENT MANAGER</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            All Blog Articles & SEO Posts
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your articles, categories, focus keywords, and permalinks.
          </p>
        </div>

        <Link
          href="/admin/blogs/editor"
          className="btn-neon px-6 py-3 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer shrink-0"
        >
          <PlusSquare className="w-4 h-4" />
          Create New Article
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-glass-card p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts or categories..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 font-bold">Category:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
          >
            <option value="all">All Categories</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Enterprise Web">Enterprise Web</option>
            <option value="Web3 & Crypto">Web3 & Crypto</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/60 text-gray-400 uppercase font-mono border-b border-white/10">
                <th className="p-4">Article Title & Permalink</th>
                <th className="p-4">Category</th>
                <th className="p-4">SEO Focus Keywords</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No articles found matching your query.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm line-clamp-1">{post.title}</div>
                      <div className="text-[11px] font-mono text-[#3B82F6] hover:underline flex items-center gap-1 mt-0.5">
                        /blog/{post.slug}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[11px] font-semibold">
                        {post.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.seo.focusKeywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(post.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase cursor-pointer border ${
                          post.status === 'published'
                            ? 'bg-[#3B82F6]/10 border-[#3B82F6]/40 text-[#3B82F6]'
                            : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/editor?editId=${post.id}`}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title="Edit Content & SEO"
                        >
                          <Edit className="w-4 h-4 text-[#3B82F6]" />
                        </Link>

                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title="Preview Live Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
