'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Star,
  CheckCircle2,
  Save,
  X,
  Globe2,
  Search,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tag: string;
  region: string;
  metrics: string;
  image_bg?: string;
  rating?: string;
  description: string;
  tech: string;
  seo_title?: string;
  meta_description?: string;
  focus_keywords?: string;
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FinTech');
  const [tag, setTag] = useState('FinTech');
  const [region, setRegion] = useState('USA & Pakistan');
  const [metrics, setMetrics] = useState('$100M+ Volume');
  const [imageBg, setImageBg] = useState('from-blue-900/40 to-black');
  const [rating, setRating] = useState('4.9/5');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('React Native, Node.js, AWS');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeywords, setFocusKeywords] = useState('');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('/api/case-studies');
      const data = await res.json();
      if (Array.isArray(data)) setCaseStudies(data);
    } catch (e) {}
  };

  const resetForm = () => {
    setTitle('');
    setCategory('FinTech');
    setTag('FinTech');
    setRegion('USA & Pakistan');
    setMetrics('');
    setImageBg('from-blue-900/40 to-black');
    setRating('4.9/5');
    setDescription('');
    setTech('');
    setSeoTitle('');
    setMetaDescription('');
    setFocusKeywords('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const payload = {
      id: editingId,
      title,
      category,
      tag,
      region,
      metrics: metrics || 'High Impact',
      image_bg: imageBg,
      rating: rating || '4.9/5',
      description,
      tech,
      seo_title: seoTitle || `${title} | LogicBlaze Case Study`,
      meta_description: metaDescription || description,
      focus_keywords: focusKeywords || `${tag}, ${region}`
    };

    if (editingId) {
      await fetch('/api/case-studies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSuccessMessage('Case study updated with SEO tags in MySQL DB!');
    } else {
      await fetch('/api/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSuccessMessage('New SEO Case Study created successfully!');
    }

    fetchCaseStudies();
    resetForm();
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleEdit = (cs: CaseStudy) => {
    setEditingId(cs.id);
    setTitle(cs.title);
    setCategory(cs.category);
    setTag(cs.tag);
    setRegion(cs.region);
    setMetrics(cs.metrics);
    setImageBg(cs.image_bg || 'from-blue-900/40 to-black');
    setRating(cs.rating || '4.9/5');
    setDescription(cs.description);
    setTech(cs.tech);
    setSeoTitle(cs.seo_title || '');
    setMetaDescription(cs.meta_description || '');
    setFocusKeywords(cs.focus_keywords || '');
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      await fetch(`/api/case-studies?id=${id}`, { method: 'DELETE' });
      fetchCaseStudies();
      setSuccessMessage('Case study deleted from MySQL DB.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#3B82F6]" />
            Dynamic Case Studies & SEO Portfolio
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage live portfolio case studies displayed on website with full Rank Math & Google SERP SEO controls.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New Case Study
          </button>
        )}
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Add / Edit Case Study Form */}
      {isAdding && (
        <form onSubmit={handleSave} className="bg-[#0c0f15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5 text-[#3B82F6]" /> : <Plus className="w-5 h-5 text-[#3B82F6]" />}
              {editingId ? 'Edit SEO Case Study' : 'Create New SEO Case Study'}
            </h3>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Project Title (SEO Optimized) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. PaySwift - US-Pakistan Instant Cross-Border Remittance App"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Category Tag Filter *
              </label>
              <select
                value={tag}
                onChange={(e) => { setTag(e.target.value); setCategory(e.target.value); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="FinTech" className="bg-black">FinTech</option>
                <option value="Healthcare" className="bg-black">Healthcare</option>
                <option value="Web3" className="bg-black">Web3</option>
                <option value="AI Enterprise" className="bg-black">AI Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Target Market Region *
              </label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. USA & Pakistan, Europe (UK, Germany)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Key Impact Metric *
              </label>
              <input
                type="text"
                required
                value={metrics}
                onChange={(e) => setMetrics(e.target.value)}
                placeholder="e.g. $450M+ Annual Volume, 1.2M Consultations"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Tech Stack (Comma Separated) *
              </label>
              <input
                type="text"
                required
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="e.g. React Native, Node.js, PostgreSQL, AWS"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Project Description & ROI Summary *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how LogicBlaze engineered this product for Pakistan, US or EU markets..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            {/* SEO SETTINGS SECTION */}
            <div className="md:col-span-2 space-y-4 bg-black/60 p-5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Globe2 className="w-4 h-4 text-[#3B82F6]" />
                <span className="font-bold text-white text-xs uppercase tracking-wider">Search Engine Optimization (SEO) Meta Control</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">SEO Meta Title Tag</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Auto-generated if empty..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Focus Target Keywords</label>
                  <input
                    type="text"
                    value={focusKeywords}
                    onChange={(e) => setFocusKeywords(e.target.value)}
                    placeholder="e.g. remittance app Pakistan, fintech US PK"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Meta Snippet Description</label>
                  <textarea
                    rows={2}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Google Search SERP description snippet..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-neon px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Update Case Study' : 'Publish Case Study'}
            </button>
          </div>
        </form>
      )}

      {/* Case Studies Grid List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#3B82F6]" />
          Active Live Portfolio Case Studies ({caseStudies.length})
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] text-[11px] font-bold border border-[#3B82F6]/30">
                      {cs.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-300 text-[10px] font-mono border border-white/10">
                      🌍 {cs.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(cs)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                      title="Edit Case Study"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cs.id)}
                      className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition-colors"
                      title="Delete Case Study"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {cs.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-gray-500 uppercase text-[10px]">Key Impact:</span>
                  <span className="font-bold text-[#3B82F6]">{cs.metrics}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(typeof cs.tech === 'string' ? cs.tech.split(',') : cs.tech || []).map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
