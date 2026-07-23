import { NextResponse } from 'next/server';
import { readDB, writeDB } from '../../../lib/backend-db';
import { getMySQLPool, autoMigrate } from '../../../lib/mysql-db';

export async function GET() {
  try {
    // 1. Attempt MySQL
    await autoMigrate();
    const pool = getMySQLPool();
    if (pool) {
      try {
        const [rows]: any = await pool.execute('SELECT * FROM leads ORDER BY createdAt DESC');
        return NextResponse.json({ success: true, leads: rows });
      } catch (err: any) {
        console.warn('MySQL leads GET warning:', err.message);
      }
    }

    // 2. Fallback
    const db = readDB();
    return NextResponse.json({ success: true, leads: db.leads });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const leadInput = await request.json();
    const newLead = {
      id: `lead-${Date.now()}`,
      type: leadInput.type || 'contact',
      name: leadInput.name || 'Anonymous',
      email: leadInput.email || '',
      phone: leadInput.phone || '',
      details: leadInput.details || '',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    // 1. Attempt MySQL Insert
    await autoMigrate();
    const pool = getMySQLPool();
    if (pool) {
      try {
        await pool.execute(
          'INSERT INTO leads (id, type, name, email, phone, details, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [newLead.id, newLead.type, newLead.name, newLead.email, newLead.phone, newLead.details, newLead.createdAt]
        );
      } catch (err: any) {
        console.warn('MySQL leads POST warning:', err.message);
      }
    }

    // 2. Save in Local JSON DB
    const db = readDB();
    db.leads = [newLead, ...db.leads];
    writeDB(db);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
