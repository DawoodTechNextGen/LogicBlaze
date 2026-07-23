const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load env variables
const envPath = path.join(__dirname, '..', '.env.local');
const envVars = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: 'logic_blaze',
  DB_PORT: '3306'
};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
      envVars[parts[0].trim()] = parts[1].trim();
    }
  });
}

async function seed() {
  console.log(`Connecting to MySQL database server at ${envVars.DB_HOST}...`);

  try {
    // Connect without db first to create database if not exists
    const connectionWithoutDB = await mysql.createConnection({
      host: envVars.DB_HOST,
      user: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
      port: parseInt(envVars.DB_PORT || '3306')
    });

    console.log(`Ensuring database '${envVars.DB_NAME}' exists...`);
    await connectionWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${envVars.DB_NAME}\``);
    await connectionWithoutDB.end();

    // Now connect to the database
    const connection = await mysql.createConnection({
      host: envVars.DB_HOST,
      user: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
      database: envVars.DB_NAME,
      port: parseInt(envVars.DB_PORT || '3306')
    });

    console.log('✅ Connected to database successfully!');

    // 1. Create Tables
    console.log('Creating database tables if they do not exist...');

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_credentials (
        email VARCHAR(255) PRIMARY KEY,
        password VARCHAR(255) NOT NULL
      )
    `);

    await connection.execute(`
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

    await connection.execute(`
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

    await connection.execute(`
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

    console.log('✅ All tables verified/created successfully!');
    
    // 2. Seed default credentials
    console.log('Seeding default administrator credentials...');
    await connection.execute(
      `INSERT INTO admin_credentials (email, password) 
       VALUES ('admin@logicblaze.com', 'LogicBlazeSecure2026!') 
       ON DUPLICATE KEY UPDATE password = VALUES(password)`
    );

    // 3. Seed default settings
    console.log('Seeding default settings configurations...');
    await connection.execute(
      `INSERT INTO settings (id, fbPixelId, gaMeasurementId, customHeadScripts, defaultMetaTitle, defaultMetaDesc, contactPhone, contactEmail, contactAddress) 
       VALUES (1, '', 'G-LOGICBLAZE123', '', 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency', 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.', '+1 (800) 555-0123', 'hello@logicblaze.com', '374 William S Canning Blvd, Fall River, MA 02721 USA')
       ON DUPLICATE KEY UPDATE id=id`
    );

    console.log('🎉 MySQL database seeding completed successfully!');
    await connection.end();
  } catch (err) {
    console.error('❌ Seeding failed with error:', err.message);
  }
}

seed();
