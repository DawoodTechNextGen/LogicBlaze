import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const [rows] = await pool.query('SELECT * FROM case_studies ORDER BY created_at DESC');
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
      category,
      tag,
      region,
      metrics,
      image_bg,
      rating,
      description,
      tech,
      seo_title,
      meta_description,
      focus_keywords
    } = body;

    const id = Date.now().toString();

    await pool.query(
      `INSERT INTO case_studies (id, title, category, tag, region, metrics, image_bg, rating, description, tech, seo_title, meta_description, focus_keywords)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        category || 'Software Engineering',
        tag || 'Software',
        region || 'Global (USA, EU, PK)',
        metrics || '100% Impact',
        image_bg || 'from-blue-900/40 to-black',
        rating || '5.0/5',
        description,
        typeof tech === 'string' ? tech : (tech || []).join(','),
        seo_title || title,
        meta_description || description,
        focus_keywords || tag
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();
    const {
      id,
      title,
      category,
      tag,
      region,
      metrics,
      image_bg,
      rating,
      description,
      tech,
      seo_title,
      meta_description,
      focus_keywords
    } = body;

    await pool.query(
      `UPDATE case_studies SET
        title = ?, category = ?, tag = ?, region = ?, metrics = ?, image_bg = ?, rating = ?, description = ?, tech = ?, seo_title = ?, meta_description = ?, focus_keywords = ?
       WHERE id = ?`,
      [
        title,
        category,
        tag,
        region,
        metrics,
        image_bg,
        rating,
        description,
        typeof tech === 'string' ? tech : (tech || []).join(','),
        seo_title,
        meta_description,
        focus_keywords,
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await pool.query('DELETE FROM case_studies WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
