const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env variables
const envPath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = 'https://fhrmpxjjczcnclzsnede.supabase.co';
let supabaseAnonKey = 'sb_publishable_p7QIr2OKcEzdRhdhHsdWtA_7YfwU_qF';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
      envVars[parts[0].trim()] = parts[1].trim();
    }
  });
  if (envVars.NEXT_PUBLIC_SUPABASE_URL) supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
  if (envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY) supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding Supabase Database...');

  // 1. Seed Admin Credentials Table
  const defaultAdmin = {
    email: 'admin@logicblaze.com',
    password: 'LogicBlazeSecure2026!'
  };

  try {
    const { error: authError } = await supabase
      .from('admin_credentials')
      .upsert([defaultAdmin], { onConflict: 'email' });
      
    if (authError) {
      console.log('❌ Admin Credentials Table Error:', authError.message);
      console.log('👉 Make sure you ran the SQL query to create the "admin_credentials" table in Supabase dashboard SQL Editor.');
    } else {
      console.log('✅ Admin credentials successfully seeded in Supabase!');
    }
  } catch (err) {
    console.log('❌ Error seeding credentials:', err.message);
  }

  // 2. Seed Default Settings Table
  const defaultSettings = {
    id: 1,
    fbPixelId: '',
    gaMeasurementId: 'G-LOGICBLAZE123',
    customHeadScripts: '',
    defaultMetaTitle: 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency',
    defaultMetaDesc: 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.'
  };

  try {
    const { error: settingsError } = await supabase
      .from('settings')
      .upsert([defaultSettings], { onConflict: 'id' });
      
    if (settingsError) {
      console.log('❌ Settings Table Error:', settingsError.message);
      console.log('👉 Make sure you ran the SQL query to create the "settings" table in Supabase.');
    } else {
      console.log('✅ Default settings successfully seeded in Supabase!');
    }
  } catch (err) {
    console.log('❌ Error seeding settings:', err.message);
  }
}

seed();
