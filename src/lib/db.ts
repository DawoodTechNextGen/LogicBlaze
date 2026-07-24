import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'logic_blaze',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let isInitialized = false;

export async function initDatabase() {
  if (isInitialized) return;
  
  try {
    // 1. Ensure Database exists (Try root creation if user has privileges; bypass on shared hosting)
    try {
      const rootConn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
      });
      await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'logic_blaze'}\`;`);
      await rootConn.end();
    } catch (dbErr) {
      // Shared hosting / cPanel users don't have global DB creation privileges; pool handles connection directly
    }

    // 2. Create Tables & Cleanup unused tables
    await pool.query(`DROP TABLE IF EXISTS admin_credentials;`);

    // Reviews Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(255) PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        quote TEXT NOT NULL,
        image TEXT NOT NULL,
        rating INT DEFAULT 5,
        featured BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Analytics / Page Views Tracking Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_path VARCHAR(255) NOT NULL,
        user_agent TEXT,
        ip_address VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Blogs Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        category VARCHAR(100),
        author_name VARCHAR(255),
        author_role VARCHAR(255),
        author_avatar TEXT,
        published_at VARCHAR(100),
        read_time VARCHAR(100),
        cover_image TEXT,
        seo_title VARCHAR(255),
        meta_description TEXT,
        canonical_url TEXT,
        focus_keywords TEXT,
        is_no_index BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default blogs if empty
    const [blogRows]: any = await pool.query(`SELECT COUNT(*) as count FROM blogs`);
    if (blogRows[0].count === 0) {
      const { INITIAL_BLOGS } = await import('./blog-store');
      for (const blog of INITIAL_BLOGS) {
        await pool.query(
          `INSERT INTO blogs (id, title, slug, excerpt, content, category, author_name, author_role, author_avatar, published_at, read_time, cover_image, seo_title, meta_description, canonical_url, focus_keywords)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            blog.id,
            blog.title,
            blog.slug,
            blog.excerpt,
            blog.content,
            blog.category,
            blog.author.name,
            blog.author.role,
            blog.author.avatar,
            blog.publishedAt,
            blog.readTime,
            blog.featuredImage,
            blog.seo.seoTitle,
            blog.seo.metaDescription,
            blog.seo.canonicalUrl,
            blog.seo.focusKeywords.join(', ')
          ]
        );
      }
    }

    // Case Studies Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        tag VARCHAR(100) NOT NULL,
        region VARCHAR(100) NOT NULL,
        metrics VARCHAR(255) NOT NULL,
        image_bg VARCHAR(255) DEFAULT 'from-blue-900/40 to-black',
        rating VARCHAR(50) DEFAULT '4.9/5',
        description TEXT NOT NULL,
        tech TEXT NOT NULL,
        seo_title VARCHAR(255),
        meta_description TEXT,
        focus_keywords TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default case studies if empty
    const [csRows]: any = await pool.query(`SELECT COUNT(*) as count FROM case_studies`);
    if (csRows[0].count === 0) {
      await pool.query(`
        INSERT INTO case_studies (id, title, category, tag, region, metrics, image_bg, rating, description, tech, seo_title, meta_description, focus_keywords) VALUES
        ('fintech-us-pk', 'PaySwift - US-Pakistan Instant Cross-Border Remittance & Digital Wallet', 'FinTech', 'FinTech', 'USA & Pakistan', '$450M+ Annual Volume', 'from-blue-900/40 to-black', '4.9/5', 'Engineered a state-of-the-art fintech app enabling seamless low-cost cross-border payments between overseas Pakistanis in the US/UK and local Pakistani banks via SBP Raast API integration.', 'React Native,Node.js,PostgreSQL,AWS Cloud', 'US-Pakistan Cross Border Remittance App | LogicBlaze Case Study', 'Discover how LogicBlaze built a high-speed remittance fintech app for US-Pakistan money transfers.', 'remittance app Pakistan, cross border payment US PK'),
        ('ai-health-eu', 'MediVision EU - AI Telemedicine & Diagnostic Portal for Europe', 'Healthcare AI', 'Healthcare', 'Europe (UK, Germany)', '1.2M Patient Consultations', 'from-cyan-900/40 to-black', '5.0/5', 'GDPR-compliant AI healthcare platform serving European medical clinics with automated patient diagnostic triage, encrypted video streams, and multi-language EHR records.', 'Next.js,Python AI,WebRTC,Docker', 'European AI Telemedicine & Diagnostics Portal | LogicBlaze', 'Case study on building GDPR compliant AI healthcare platform for European clinics.', 'AI healthcare Europe, telemedicine software UK Germany'),
        ('web3-us-eu', 'Aether DEX - High-Speed Multi-Chain Protocol for US & European Traders', 'Web3 & DeFi', 'Web3', 'Global (USA & EU)', '<35ms Sub-Second Execution', 'from-purple-900/40 to-black', '4.9/5', 'Formally verified DeFi exchange protocol engineered for institutional traders in North America and EU, featuring zero-knowledge proof privacy and automated market maker liquidity.', 'Solidity,Rust,Ethers.js,TailwindCSS', 'Institutional Web3 DeFi Exchange Protocol | LogicBlaze', 'How LogicBlaze developed sub-second execution DEX protocol for US and EU institutional traders.', 'Web3 DeFi protocol USA EU, smart contract audit'),
        ('ai-enterprise-pk-us', 'LogiFlow - Autonomous Supply Chain Engine for PK-US Logistics', 'AI Enterprise', 'AI Enterprise', 'Pakistan & USA', '38% Cost Reduction', 'from-blue-950/50 to-black', '4.8/5', 'Enterprise AI fleet management and predictive route optimization system handling global freight shipping routes between South Asia, Middle East, and North America.', 'Python,TensorFlow,Go,Kubernetes', 'AI Fleet Management & Logistics Optimization | LogicBlaze', 'Case study on enterprise AI freight and supply chain route optimization between PK and US.', 'AI logistics software Pakistan USA, fleet management AI');
      `);
    }

    // Seed default reviews if empty
    const [reviewRows]: any = await pool.query(`SELECT COUNT(*) as count FROM reviews`);
    if (reviewRows[0].count === 0) {
      await pool.query(`
        INSERT INTO reviews (id, author, role, quote, image, rating, featured) VALUES
        ('1', 'Sarah Jenkins', 'CTO at FinScale Inc.', 'LogicBlaze delivered our mobile banking app 3 weeks ahead of schedule. Their technical architecture handled over 100k peak concurrent users on day one without a single hitch.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 5, true),
        ('2', 'Marcus Vance', 'VP of Product, NeuroTech', 'The custom AI agent infrastructure built by LogicBlaze automated 65% of our manual customer diagnostics. Their engineering team is top 1% globally.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 5, true),
        ('3', 'Elena Rostova', 'Head of Ecosystem, Aether Protocol', 'From smart contract audits to the web frontend, LogicBlaze''s Web3 team executed flawlessly. Highly recommended for complex high-throughput systems.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 5, true);
      `);
    }

    // Admin Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(100) DEFAULT 'Co-Founder',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed default admin user (admin@logicblaze.co / admin123)
    const [userRows]: any = await pool.query(`SELECT COUNT(*) as count FROM users`);
    if (userRows[0].count === 0) {
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.hash('admin123', 10);
      await pool.query(
        `INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
        ['1', 'Super Admin', 'admin@logicblaze.co', hash, 'Founder & CTO']
      );
    }

    isInitialized = true;
    console.log('✅ MySQL Database tables & users initialized successfully.');
  } catch (err) {
    console.error('❌ Error initializing MySQL Database:', err);
  }
}

export default pool;
