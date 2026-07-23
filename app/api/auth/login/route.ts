import { NextResponse } from 'next/server';
import { readDB } from '../../../../lib/backend-db';
import { getMySQLPool, autoMigrate } from '../../../../lib/mysql-db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Attempt MySQL Query (auto-migrate on first connection)
    await autoMigrate();
    const pool = getMySQLPool();
    if (pool) {
      try {
        const [rows]: any = await pool.execute(
          'SELECT * FROM admin_credentials WHERE email = ? LIMIT 1',
          [email]
        );
        if (rows && rows.length > 0) {
          if (rows[0].password === password) {
            return NextResponse.json({ success: true, token: 'session_mysql_token_valid' });
          }
        }
      } catch (err: any) {
        console.warn('MySQL auth query warning, using JSON DB fallback:', err.message);
      }
    }

    // 2. Fallback to Local JSON Database
    const db = readDB();
    if (db.settings.adminEmail === email && db.settings.adminPasswordHash === password) {
      return NextResponse.json({ success: true, token: 'session_json_token_valid' });
    }

    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
