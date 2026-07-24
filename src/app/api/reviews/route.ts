import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();
    const { author, role, quote, image, rating } = body;

    const id = Date.now().toString();
    const avatar = image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    await pool.query(
      'INSERT INTO reviews (id, author, role, quote, image, rating, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, author, role || 'Client', quote, avatar, rating || 5, true]
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
    const { id, author, role, quote, image, rating } = body;

    await pool.query(
      'UPDATE reviews SET author = ?, role = ?, quote = ?, image = ?, rating = ? WHERE id = ?',
      [author, role, quote, image, rating, id]
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

    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
