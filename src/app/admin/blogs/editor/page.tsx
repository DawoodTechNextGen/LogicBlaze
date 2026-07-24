'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe2,
  Share2,
  Save,
  ArrowLeft,
  Sparkles,
  Search,
  Eye,
  Key,
  Layers,
  Image as ImageIcon,
  Tag,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  Settings,
  Undo2,
  Redo2,
  Plus,
  BarChart2,
  FileCode,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { INITIAL_BLOGS, CATEGORIES, BlogPost } from '@/lib/blog-store';

function RankMathBlogEditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');

  // Sidebar Tabs: 'post' | 'rankmath'
  const [sidebarTab, setSidebarTab] = useState<'post' | 'rankmath'>('rankmath');
  // Rank Math Sub-tabs: 'general' | 'advanced' | 'schema' | 'social'
  const [rankMathTab, setRankMathTab] = useState<'general' | 'advanced' | 'schema' | 'social'>('general');

  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('AI, Software, Mobile');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [postStatus, setPostStatus] = useState<'published' | 'draft'>('published');

  // Rank Math SEO Suite State
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeywords, setFocusKeywords] = useState('mobile app, AI development');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [schemaType, setSchemaType] = useState('Article');
  const [isNoIndex, setIsNoIndex] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editId) {
      const existing = INITIAL_BLOGS.find((b) => b.id === editId);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug);
        setCategory(existing.category);
        setTags(existing.tags.join(', '));
        setExcerpt(existing.excerpt);
        setContent(existing.content);
        setFeaturedImage(existing.featuredImage);
        setPostStatus(existing.status);

        setSeoTitle(existing.seo.seoTitle);
        setMetaDescription(existing.seo.metaDescription);
        setFocusKeywords(existing.seo.focusKeywords.join(', '));
        setCanonicalUrl(existing.seo.canonicalUrl);
        setIsNoIndex(existing.seo.noIndex);
      }
    }
  }, [editId]);

  // Insert HTML tags
  const insertFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.substring(start, end) || 'Sample paragraph text';
    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editId && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
    if (!seoTitle) {
      setSeoTitle(val);
    }
  };

  // Rank Math Detailed SEO Test Audits
  const kwList = focusKeywords.split(',').map((k) => k.trim().toLowerCase()).filter(Boolean);
  const primaryKw = kwList[0] || '';

  const testTitleHasKw = primaryKw ? seoTitle.toLowerCase().includes(primaryKw) : false;
  const testDescHasKw = primaryKw ? metaDescription.toLowerCase().includes(primaryKw) : false;
  const testSlugHasKw = primaryKw ? slug.toLowerCase().includes(primaryKw.replace(/\s+/g, '-')) : false;
  const testContentHasKw = primaryKw ? content.toLowerCase().includes(primaryKw) : false;
  const testTitleLength = seoTitle.length >= 40 && seoTitle.length <= 60;
  const testDescLength = metaDescription.length >= 120 && metaDescription.length <= 160;

  // Calculate Rank Math 0-100 Score
  const calculateRankMathScore = () => {
    let score = 25;
    if (testTitleHasKw) score += 20;
    if (testSlugHasKw) score += 15;
    if (testDescHasKw) score += 15;
    if (testContentHasKw) score += 10;
    if (testTitleLength) score += 8;
    if (testDescLength) score += 7;
    return Math.min(score, 100);
  };

  const rankMathScore = calculateRankMathScore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Rank Math SEO Post successfully ${postStatus === 'published' ? 'Published' : 'Saved as Draft'}!`);
    router.push('/admin/blogs');
  };

  return (
    <div className="min-h-screen bg-[#081b33] text-white flex flex-col font-sans -m-6 md:-m-10">
      {/* WORDPRESS TOP ADMIN HEADER BAR */}
      <header className="h-14 bg-[#0d0f14] border-b border-white/10 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* WordPress W Monogram Icon */}
          <Link
            href="/admin/blogs"
            className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center font-black text-black text-sm hover:scale-105 transition-transform"
            title="Back to WordPress Posts Table"
          >
            W
          </Link>

          <div className="h-5 w-px bg-white/10" />

          {/* Gutenberg Block & History Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertFormatting('<h2>', '</h2>')}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
              title="Add Block"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 rounded-lg text-gray-500 hover:text-white" title="Undo">
              <Undo2 className="w-4 h-4" />
            </button>
            <button type="button" className="p-1.5 rounded-lg text-gray-500 hover:text-white" title="Redo">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Title Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span>{title ? title : 'Draft Article'}</span>
          <span className="text-gray-600">•</span>
          <span className="text-[#3B82F6]">{postStatus.toUpperCase()}</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* SIGNATURE RANK MATH SEO SCORE BADGE */}
          <button
            type="button"
            onClick={() => { setShowRightSidebar(true); setSidebarTab('rankmath'); }}
            className={`px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 cursor-pointer border shadow-lg transition-all ${
              rankMathScore >= 80
                ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6] shadow-[#3B82F6]/20'
                : rankMathScore >= 60
                ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                : 'bg-red-500/20 border-red-500 text-red-400'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            RANK MATH {rankMathScore}/100
          </button>

          {/* Save Draft */}
          <button
            type="button"
            onClick={() => setPostStatus('draft')}
            className="text-xs font-semibold text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Save Draft
          </button>

          {/* Publish / Update Button */}
          <button
            type="button"
            onClick={handleSave}
            className="btn-neon px-4 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            {editId ? 'Update' : 'Publish'}
          </button>

          {/* Toggle Right Settings Drawer */}
          <button
            type="button"
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className={`p-2 rounded-lg transition-colors ${
              showRightSidebar ? 'bg-[#3B82F6] text-black' : 'bg-white/5 text-gray-300 hover:text-white'
            }`}
            title="Toggle Settings Panel"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN WORDPRESS GUTENBERG WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* CENTER GUTENBERG CANVAS AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 flex justify-center">
          <div className="max-w-3xl w-full space-y-6">
            {/* Title Input (WordPress Gutenberg Large Header) */}
            <div className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Add title"
                className="w-full bg-transparent text-3xl sm:text-5xl font-extrabold text-white placeholder:text-gray-600 focus:outline-none tracking-tight"
              />

              {/* Permalink Display Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 pt-1">
                <span>Permalink:</span>
                <span className="text-[#3B82F6]">https://cubix.lab/blog/{slug || 'your-slug'}</span>
              </div>
            </div>

            {/* GUTENBERG FLOATING FORMATTING TOOLBAR */}
            <div className="bg-[#0f1217] border border-white/10 rounded-xl p-2 flex flex-wrap items-center gap-1 shadow-xl">
              <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
                <button
                  type="button"
                  onClick={() => setEditorMode('visual')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${editorMode === 'visual' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                >
                  Visual
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('html')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${editorMode === 'html' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                >
                  HTML
                </button>
              </div>

              <button
                type="button"
                onClick={() => insertFormatting('<strong>', '</strong>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<em>', '</em>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting('<h2>', '</h2>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="H2 Heading"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<h3>', '</h3>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="H3 Heading"
              >
                <Heading3 className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<ol>\n  <li>', '</li>\n</ol>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<blockquote>\n  ', '\n</blockquote>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<pre><code>', '</code></pre>')}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Code"
              >
                <Code className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-white/10 mx-1" />

              <button
                type="button"
                onClick={() => {
                  const link = prompt('Enter URL:', 'https://');
                  if (link) insertFormatting(`<a href="${link}" target="_blank">`, '</a>');
                }}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Insert Link"
              >
                <Link2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const img = prompt('Enter Image URL:', 'https://images.unsplash.com/...');
                  if (img) insertFormatting(`<img src="${img}" alt="Article Image" class="w-full rounded-2xl my-6" />`);
                }}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-[#3B82F6]"
                title="Insert Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>

            {/* MAIN GUTENBERG EDITING CANVAS */}
            {editorMode === 'visual' ? (
              <div className="space-y-6">
                <textarea
                  ref={textareaRef}
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type / to choose a block or start typing article content..."
                  className="w-full bg-transparent text-gray-200 text-sm font-sans leading-relaxed focus:outline-none resize-y min-h-[300px]"
                />

                {/* Live Output Box */}
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <span className="text-[11px] font-mono text-[#3B82F6] font-bold block flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    WYSIWYG Visual Rendered Output
                  </span>
                  <div
                    className="prose prose-invert prose-indigo max-w-none text-gray-300 text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content || '<p className="text-gray-500 italic">Visual output preview will appear here...</p>' }}
                  />
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Raw HTML code view..."
                className="w-full p-4 rounded-2xl bg-[#05070a] border border-[#3B82F6]/40 text-[#3B82F6] text-xs font-mono focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* RANK MATH SEO SUITE SIDEBAR (EXACT RANK MATH WORDPRESS UI) */}
        {showRightSidebar && (
          <aside className="w-80 bg-[#0a0c10] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shrink-0 animate-fade-in-up">
            <div className="space-y-6">
              {/* Main Sidebar Tabs: Post vs Rank Math */}
              <div className="flex border-b border-white/10 gap-4">
                <button
                  type="button"
                  onClick={() => setSidebarTab('post')}
                  className={`pb-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    sidebarTab === 'post' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-gray-400'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Post Settings
                </button>

                <button
                  type="button"
                  onClick={() => setSidebarTab('rankmath')}
                  className={`pb-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    sidebarTab === 'rankmath' ? 'border-[#3B82F6] text-[#3B82F6]' : 'border-transparent text-gray-400'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Rank Math SEO
                </button>
              </div>

              {/* RANK MATH SEO SUITE TAB */}
              {sidebarTab === 'rankmath' && (
                <div className="space-y-5 text-xs">
                  {/* Rank Math Sub-Navigation Pills (General, Advanced, Schema, Social) */}
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 justify-between text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setRankMathTab('general')}
                      className={`px-2 py-1 rounded-lg transition-all ${rankMathTab === 'general' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                    >
                      General
                    </button>
                    <button
                      type="button"
                      onClick={() => setRankMathTab('advanced')}
                      className={`px-2 py-1 rounded-lg transition-all ${rankMathTab === 'advanced' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                    >
                      Advanced
                    </button>
                    <button
                      type="button"
                      onClick={() => setRankMathTab('schema')}
                      className={`px-2 py-1 rounded-lg transition-all ${rankMathTab === 'schema' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                    >
                      Schema
                    </button>
                    <button
                      type="button"
                      onClick={() => setRankMathTab('social')}
                      className={`px-2 py-1 rounded-lg transition-all ${rankMathTab === 'social' ? 'bg-[#3B82F6] text-black' : 'text-gray-400'}`}
                    >
                      Social
                    </button>
                  </div>

                  {/* RANK MATH GENERAL SUB-TAB */}
                  {rankMathTab === 'general' && (
                    <div className="space-y-5">
                      {/* Focus Keyword Input */}
                      <div className="space-y-2">
                        <label className="font-bold text-gray-300 uppercase text-[11px] flex items-center gap-1">
                          <Key className="w-3.5 h-3.5 text-[#3B82F6]" />
                          Focus Keyword
                        </label>
                        <input
                          type="text"
                          value={focusKeywords}
                          onChange={(e) => setFocusKeywords(e.target.value)}
                          placeholder="e.g. mobile app AI"
                          className="w-full bg-white/5 text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>

                      {/* Rank Math Edit Snippet Button & Fields */}
                      <div className="space-y-3 bg-black/60 p-4 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="font-bold text-white text-[11px]">Google Search Snippet</span>
                          <span className="text-[10px] text-[#3B82F6] font-mono">Rank Math Preview</span>
                        </div>

                        {/* Google SERP Card */}
                        <div className="p-3 rounded-xl bg-white text-black space-y-1">
                          <div className="text-[10px] text-[#202124] truncate">https://cubix.lab &gt; blog &gt; {slug}</div>
                          <div className="text-xs font-bold text-[#1a0dab] line-clamp-1">{seoTitle || title}</div>
                          <div className="text-[11px] text-[#4d5156] line-clamp-2">{metaDescription || excerpt}</div>
                        </div>

                        {/* Title Input */}
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[10px] text-gray-400">
                            <span>SEO Title Tag</span>
                            <span className={testTitleLength ? 'text-[#3B82F6]' : 'text-amber-400'}>{seoTitle.length}/60</span>
                          </div>
                          <input
                            type="text"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            className="w-full bg-white/10 text-white p-2 rounded-lg text-xs focus:outline-none"
                          />
                        </div>

                        {/* Meta Description Input */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-gray-400">
                            <span>Meta Description</span>
                            <span className={testDescLength ? 'text-[#3B82F6]' : 'text-amber-400'}>{metaDescription.length}/160</span>
                          </div>
                          <textarea
                            rows={2}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            className="w-full bg-white/10 text-white p-2 rounded-lg text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* RANK MATH BASIC SEO AUDIT CHECKLIST */}
                      <div className="space-y-2.5 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <span className="font-bold text-white text-[11px] uppercase block border-b border-white/10 pb-2">
                          Basic SEO Audit Tests
                        </span>

                        <div className="flex items-center gap-2 text-[11px]">
                          {testTitleHasKw ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <X className="w-4 h-4 text-red-400" />}
                          <span className={testTitleHasKw ? 'text-gray-200' : 'text-gray-400'}>Focus Keyword in SEO Title</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          {testDescHasKw ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <X className="w-4 h-4 text-red-400" />}
                          <span className={testDescHasKw ? 'text-gray-200' : 'text-gray-400'}>Focus Keyword in Meta Description</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          {testSlugHasKw ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <X className="w-4 h-4 text-red-400" />}
                          <span className={testSlugHasKw ? 'text-gray-200' : 'text-gray-400'}>Focus Keyword in URL Permalink</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          {testContentHasKw ? <Check className="w-4 h-4 text-[#3B82F6]" /> : <X className="w-4 h-4 text-red-400" />}
                          <span className={testContentHasKw ? 'text-gray-200' : 'text-gray-400'}>Focus Keyword in Article Content</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RANK MATH ADVANCED TAB */}
                  {rankMathTab === 'advanced' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                        <label className="font-bold text-white uppercase text-[11px] block">Robots Meta</label>
                        <div className="flex items-center justify-between">
                          <span>Index</span>
                          <input
                            type="checkbox"
                            checked={!isNoIndex}
                            onChange={(e) => setIsNoIndex(!e.target.checked)}
                            className="accent-[#3B82F6]"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>NoFollow</span>
                          <input type="checkbox" className="accent-[#3B82F6]" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-gray-300 uppercase text-[11px] block">Canonical URL</label>
                        <input
                          type="text"
                          value={canonicalUrl}
                          onChange={(e) => setCanonicalUrl(e.target.value)}
                          placeholder="https://cubix.lab/blog/..."
                          className="w-full bg-white/5 text-white p-2.5 rounded-xl border border-white/10 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* RANK MATH SCHEMA TAB */}
                  {rankMathTab === 'schema' && (
                    <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <label className="font-bold text-white uppercase text-[11px] block">Schema Generator</label>
                      <select
                        value={schemaType}
                        onChange={(e) => setSchemaType(e.target.value)}
                        className="w-full bg-black text-white p-2.5 rounded-xl border border-white/10 focus:outline-none"
                      >
                        <option value="Article">Article Schema</option>
                        <option value="BlogPosting">BlogPosting Schema</option>
                        <option value="NewsArticle">NewsArticle Schema</option>
                      </select>
                      <span className="text-[10px] text-[#3B82F6] font-mono block">
                        Auto-injects Schema.org JSON-LD for rich snippets
                      </span>
                    </div>
                  )}

                  {/* RANK MATH SOCIAL TAB */}
                  {rankMathTab === 'social' && (
                    <div className="space-y-3">
                      <span className="font-bold text-gray-300 uppercase text-[11px] block">Facebook / OpenGraph Card</span>
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                        <img src={featuredImage} alt="Social OG" className="w-full h-28 object-cover" />
                        <div className="p-3.5 space-y-1">
                          <span className="text-[9px] uppercase text-gray-500 font-mono">CUBIX.LAB</span>
                          <div className="text-xs font-bold text-white line-clamp-1">{seoTitle || title}</div>
                          <div className="text-[10px] text-gray-400 line-clamp-2">{metaDescription || excerpt}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* POST SETTINGS TAB */}
              {sidebarTab === 'post' && (
                <div className="space-y-5 text-xs">
                  <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="font-bold text-white uppercase text-[11px] border-b border-white/10 pb-2">
                      Status & Visibility
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                      <span>Status:</span>
                      <select
                        value={postStatus}
                        onChange={(e) => setPostStatus(e.target.value as any)}
                        className="bg-black text-[#3B82F6] font-bold px-2 py-1 rounded border border-white/10 focus:outline-none"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center text-gray-400">
                      <span>Permalink Slug:</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-black text-white px-2 py-1 rounded border border-white/10 w-36 text-right font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-300 uppercase text-[11px] block">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black text-white p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-300 uppercase text-[11px] block">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full bg-white/5 text-white p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold text-gray-300 uppercase text-[11px] block">Featured Image</label>
                    <input
                      type="text"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="w-full bg-white/5 text-white p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    />
                    {featuredImage && (
                      <div className="rounded-xl overflow-hidden border border-white/10 h-28 bg-black mt-2">
                        <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div className="p-10 text-[#3B82F6] font-bold text-xs">Loading Rank Math SEO Suite...</div>}>
      <RankMathBlogEditorForm />
    </Suspense>
  );
}
