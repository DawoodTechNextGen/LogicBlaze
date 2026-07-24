import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password required' }, { status: 400 });
    }

    // Check if email already exists
    const [existing]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash Password with Bcrypt
    const password_hash = await bcrypt.hash(password, 10);
    const id = Date.now().toString();

    await pool.query(
      'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, password_hash, role || 'Co-Founder']
    );

    return NextResponse.json({ success: true, id });
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

    // Prevent deleting the main admin
    if (id === '1') {
      return NextResponse.json({ error: 'Cannot delete Super Admin' }, { status: 403 });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
