import { NextResponse } from 'next/server';
import { readDB, writeDB } from '../../../lib/backend-db';
import { getMySQLPool, autoMigrate } from '../../../lib/mysql-db';

export async function GET() {
  try {
    // 1. Attempt MySQL Retrieval (auto-migrate on first connection)
    await autoMigrate();
    const pool = getMySQLPool();
    if (pool) {
      try {
        const [rows]: any = await pool.execute('SELECT * FROM settings WHERE id = 1 LIMIT 1');
        if (rows && rows.length > 0) {
          return NextResponse.json({ success: true, settings: rows[0] });
        }
      } catch (err: any) {
        console.warn('MySQL settings GET warning:', err.message);
      }
    }

    // 2. Fallback to Local JSON Database
    const db = readDB();
    return NextResponse.json({ success: true, settings: db.settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const s = await request.json();

    // 1. Attempt MySQL Upsert (auto-migrate on first connection)
    await autoMigrate();
    const pool = getMySQLPool();
    if (pool) {
      try {
        await pool.execute(
          `INSERT INTO settings (id, fbPixelId, gaMeasurementId, customHeadScripts, defaultMetaTitle, defaultMetaDesc, contactPhone, contactEmail, contactAddress) 
           VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE 
           fbPixelId = VALUES(fbPixelId), 
           gaMeasurementId = VALUES(gaMeasurementId), 
           customHeadScripts = VALUES(customHeadScripts), 
           defaultMetaTitle = VALUES(defaultMetaTitle), 
           defaultMetaDesc = VALUES(defaultMetaDesc),
           contactPhone = VALUES(contactPhone),
           contactEmail = VALUES(contactEmail),
           contactAddress = VALUES(contactAddress)`,
          [
            s.fbPixelId || '', 
            s.gaMeasurementId || '', 
            s.customHeadScripts || '', 
            s.defaultMetaTitle || '', 
            s.defaultMetaDesc || '',
            s.contactPhone || '',
            s.contactEmail || '',
            s.contactAddress || ''
          ]
        );
      } catch (err: any) {
        console.warn('MySQL settings POST warning:', err.message);
      }
    }

    // 2. Update Local JSON Database
    const db = readDB();
    db.settings = {
      ...db.settings,
      ...s
    };
    writeDB(db);

    return NextResponse.json({ success: true, settings: db.settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
