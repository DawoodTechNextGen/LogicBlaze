'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BlogPost } from '../../../lib/data';
import { FileText, Plus, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminBlogsListPage(): JSX.Element {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--logo-deep-navy)', marginBottom: '4px' }}>
            WordPress & RankMath SEO Blog Manager
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Manage blog posts, focus keywords, permalinks, and real-time RankMath SEO scores.
          </p>
        </div>

        <Link href="/admin/blogs/new" className="btn btn-primary">
          <Plus size={18} />
          <span>Add New Post (RankMath SEO)</span>
        </Link>
      </div>

      {/* Posts Table Card */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)', fontSize: '13px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Title & Slug</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>RankMath SEO Score</th>
              <th style={{ padding: '12px 16px' }}>Date</th>
              <th style={{ padding: '12px 16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={post.slug} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '14px' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
                    /blog/{post.slug}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 10px', background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', borderRadius: '99px' }}>
                    {post.category}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: idx === 0 ? '#DCFCE7' : '#FEF9C3', color: idx === 0 ? '#15803D' : '#A16207', fontWeight: '800', fontSize: '13px' }}>
                    <Sparkles size={14} />
                    <span>{idx === 0 ? '92 / 100 Great' : '84 / 100 Good'}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#64748B', fontSize: '13px' }}>
                  {post.date}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href={`/blog/${post.slug}`} target="_blank" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--logo-electric-cyan)' }}>
                      View
                    </Link>
                    <Link href="/admin/blogs/new" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--logo-royal-blue)' }}>
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
