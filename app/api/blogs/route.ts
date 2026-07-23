import { NextResponse } from 'next/server';
import { readDB, writeDB } from '../../../lib/backend-db';
import { getMySQLPool } from '../../../lib/mysql-db';

export async function GET() {
  try {
    // 1. Attempt MySQL
    const pool = getMySQLPool();
    if (pool) {
      try {
        const [rows]: any = await pool.execute('SELECT * FROM blogs ORDER BY date DESC');
        const posts = rows.map((post: any) => ({
          ...post,
          tags: post.tags ? post.tags.split(',').filter(Boolean) : []
        }));
        return NextResponse.json({ success: true, posts });
      } catch (err: any) {
        console.warn('MySQL blogs GET warning:', err.message);
      }
    }

    // 2. Fallback
    const db = readDB();
    return NextResponse.json({ success: true, posts: db.blogs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const postInput = await request.json();
    const tagsArray = postInput.tags || [];
    
    const newPost = {
      slug: postInput.slug || 'untitled-post',
      title: postInput.title || 'Untitled Post',
      category: postInput.category || 'Uncategorized',
      content: postInput.content || '',
      tags: tagsArray,
      author: postInput.author || 'LogicBlaze Tech Admin',
      date: new Date().toISOString().split('T')[0]
    };

    // 1. Attempt MySQL Upsert
    const pool = getMySQLPool();
    if (pool) {
      try {
        const tagsString = tagsArray.join(',');
        await pool.execute(
          `INSERT INTO blogs (slug, title, category, content, tags, author, date) 
           VALUES (?, ?, ?, ?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE 
           title = VALUES(title), 
           category = VALUES(category), 
           content = VALUES(content), 
           tags = VALUES(tags), 
           author = VALUES(author), 
           date = VALUES(date)`,
          [newPost.slug, newPost.title, newPost.category, newPost.content, tagsString, newPost.author, newPost.date]
        );
      } catch (err: any) {
        console.warn('MySQL blogs POST warning:', err.message);
      }
    }

    // 2. Local Fallback Database save
    const db = readDB();
    db.blogs = db.blogs.filter(p => p.slug !== newPost.slug);
    db.blogs = [newPost, ...db.blogs];
    writeDB(db);

    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
