import { NextResponse } from 'next/server';
import pool, { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT * FROM site_settings WHERE id = "1"');
    if (rows && rows.length > 0) {
      return NextResponse.json(rows[0]);
    }
    return NextResponse.json({
      site_title: 'LogicBlaze | Top Software Engineering & AI Agency in Pakistan, USA & Europe',
      meta_description: 'LogicBlaze is a global software transformation agency engineering high-throughput mobile apps, enterprise AI models, Next.js web systems, and Web3 protocols.',
      og_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      gtag_id: 'G-LOGICBLAZE',
      meta_pixel_id: '',
      robots_txt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://logicblaze.co/sitemap.xml'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDatabase();
    const body = await request.json();
    const {
      site_title,
      meta_description,
      og_image,
      gtag_id,
      meta_pixel_id,
      robots_txt
    } = body;

    await pool.query(
      `INSERT INTO site_settings (id, site_title, meta_description, og_image, gtag_id, meta_pixel_id, robots_txt)
       VALUES ('1', ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       site_title = VALUES(site_title),
       meta_description = VALUES(meta_description),
       og_image = VALUES(og_image),
       gtag_id = VALUES(gtag_id),
       meta_pixel_id = VALUES(meta_pixel_id),
       robots_txt = VALUES(robots_txt)`,
      [
        site_title,
        meta_description,
        og_image,
        gtag_id,
        meta_pixel_id,
        robots_txt
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
