import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const [rows] = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author_name,
      author_role,
      author_avatar,
      published_at,
      read_time,
      cover_image,
      seo_title,
      meta_description,
      canonical_url,
      focus_keywords,
      is_no_index
    } = body;

    const id = Date.now().toString();

    await pool.query(
      `INSERT INTO blogs (id, title, slug, excerpt, content, category, author_name, author_role, author_avatar, published_at, read_time, cover_image, seo_title, meta_description, canonical_url, focus_keywords, is_no_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt,
        content,
        category || 'Enterprise Web',
        author_name || 'LogicBlaze Admin',
        author_role || 'Founder & CTO',
        author_avatar || '/logo-transparent.png',
        published_at || new Date().toISOString().split('T')[0],
        read_time || '5 min read',
        cover_image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
        seo_title || title,
        meta_description || excerpt,
        canonical_url || `https://logicblaze.co/blog/${slug}`,
        focus_keywords || category,
        is_no_index ? true : false
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
