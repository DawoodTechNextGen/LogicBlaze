'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Star,
  CheckCircle2,
  Save,
  X,
  User,
  Quote
} from 'lucide-react';
import { Review, getStoredReviews, saveStoredReviews } from '@/lib/reviews-store';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (e) {
      setReviews(getStoredReviews());
    }
  };

  const resetForm = () => {
    setAuthor('');
    setRole('');
    setQuote('');
    setImage('');
    setRating(5);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote) return;

    const defaultAvatar = image || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`;

    if (editingId) {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, author, role, quote, image: defaultAvatar, rating })
      });
      setSuccessMessage('Review updated successfully in MySQL DB!');
    } else {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, role: role || 'Client', quote, image: defaultAvatar, rating })
      });
      setSuccessMessage('New client review saved to MySQL DB!');
    }

    fetchReviews();
    resetForm();
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setAuthor(review.author);
    setRole(review.role);
    setQuote(review.quote);
    setImage(review.image);
    setRating(review.rating || 5);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      fetchReviews();
      setSuccessMessage('Review deleted from MySQL DB.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-[#3B82F6]" />
            Client Reviews & Testimonials
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Manage live client reviews displayed on the website homepage in real-time.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-neon px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New Review
          </button>
        )}
      </div>

      {/* Alert Message */}
      {successMessage && (
        <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Add / Edit Review Modal / Form */}
      {isAdding && (
        <form onSubmit={handleSave} className="bg-[#0c0f15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5 text-[#3B82F6]" /> : <Plus className="w-5 h-5 text-[#3B82F6]" />}
              {editingId ? 'Edit Client Review' : 'Add New Client Review'}
            </h3>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Client / Author Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Role / Company *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. CTO at FinScale Inc."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Review / Testimonial Quote *
              </label>
              <textarea
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Write what the client said about LogicBlaze..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Avatar Image URL (Optional)
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Rating Stars (1-5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
              >
                <option value={5} className="bg-black">5 Stars (★ ★ ★ ★ ★)</option>
                <option value={4} className="bg-black">4 Stars (★ ★ ★ ★ ☆)</option>
                <option value={3} className="bg-black">3 Stars (★ ★ ★ ☆ ☆)</option>
              </select>
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
              {editingId ? 'Update Review' : 'Save Review'}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Quote className="w-5 h-5 text-[#3B82F6]" />
          Active Live Reviews ({reviews.length})
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400 text-xs">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(rev)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                      title="Edit Review"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-300 italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src={rev.image}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#3B82F6]/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-gray-400">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
