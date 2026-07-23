import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let migrated = false;

export function getMySQLPool(): mysql.Pool | null {
  if (!process.env.DB_HOST) {
    return null;
  }

  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
      });
    } catch (err) {
      console.error('Error creating MySQL connection pool:', err);
      pool = null;
    }
  }

  return pool;
}

// Auto-migrate: Create tables + seed admin credentials on first connection
export async function autoMigrate(): Promise<boolean> {
  if (migrated) return true;

  const activePool = getMySQLPool();
  if (!activePool) return false;

  try {
    // Create tables if they don't exist
    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS admin_credentials (
        email VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      )
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY DEFAULT 1,
        fbPixelId VARCHAR(255),
        gaMeasurementId VARCHAR(255),
        customHeadScripts TEXT,
        defaultMetaTitle TEXT,
        defaultMetaDesc TEXT,
        contactPhone VARCHAR(255),
        contactEmail VARCHAR(255),
        contactAddress TEXT
      )
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        details TEXT NOT NULL,
        createdAt VARCHAR(50) NOT NULL
      )
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        slug VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        tags TEXT,
        author VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL
      )
    `);

    // Seed default admin credentials
    await activePool.execute(
      `INSERT INTO admin_credentials (email, password) 
       VALUES ('admin@logicblaze.com', 'LogicBlazeSecure2026!') 
       ON DUPLICATE KEY UPDATE email = email`
    );

    // Seed default settings
    await activePool.execute(
      `INSERT INTO settings (id, fbPixelId, gaMeasurementId, customHeadScripts, defaultMetaTitle, defaultMetaDesc, contactPhone, contactEmail, contactAddress) 
       VALUES (1, '', 'G-LOGICBLAZE123', '', 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency', 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.', '+1 (800) 555-0123', 'hello@logicblaze.com', '374 William S Canning Blvd, Fall River, MA 02721 USA')
       ON DUPLICATE KEY UPDATE id = id`
    );

    migrated = true;
    console.log('✅ MySQL auto-migration & seeding completed successfully.');
    return true;
  } catch (err: any) {
    console.error('MySQL auto-migration failed:', err.message);
    return false;
  }
}

// Check connection helper
export async function testMySQLConnection(): Promise<boolean> {
  const activePool = getMySQLPool();
  if (!activePool) return false;
  try {
    const connection = await activePool.getConnection();
    connection.release();
    return true;
  } catch (err) {
    console.error('MySQL connection failed:', err);
    return false;
  }
}
