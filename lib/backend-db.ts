import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'lib', 'db.json');

export interface DBData {
  settings: {
    fbPixelId: string;
    gaMeasurementId: string;
    customHeadScripts: string;
    defaultMetaTitle: string;
    defaultMetaDesc: string;
    adminEmail: string;
    adminPasswordHash: string;
    denyOtherAccess: boolean;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
  };
  leads: Array<{
    id: string;
    type: string;
    name: string;
    email: string;
    phone?: string;
    details: string;
    createdAt: string;
  }>;
  blogs: Array<{
    slug: string;
    title: string;
    category: string;
    content: string;
    tags: string[];
    author: string;
    date: string;
  }>;
}

const DEFAULT_DB: DBData = {
  settings: {
    fbPixelId: '',
    gaMeasurementId: 'G-LOGICBLAZE123',
    customHeadScripts: '',
    defaultMetaTitle: 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency',
    defaultMetaDesc: 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.',
    adminEmail: 'admin@logicblaze.com',
    adminPasswordHash: 'LogicBlazeSecure2026!',
    denyOtherAccess: false,
    contactPhone: '+1 (800) 555-0123',
    contactEmail: 'hello@logicblaze.com',
    contactAddress: '374 William S Canning Blvd, Fall River, MA 02721 USA'
  },
  leads: [
    {
      id: 'lead-1',
      type: 'estimate',
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.io',
      phone: '+1 (555) 234-5678',
      details: 'Calculated Quote: Mobile App (iOS & Android) + Stripe Payments & AI Chatbot ($3,400 est / 4 wks)',
      createdAt: '2026-07-23 18:40'
    },
    {
      id: 'lead-2',
      type: 'contact',
      name: 'Sarah Connor',
      email: 'sarah@cyberdyne.org',
      phone: '+1 (555) 987-6543',
      details: 'Interested in RAG AI Chatbot automation for 24/7 customer support integration.',
      createdAt: '2026-07-22 14:15'
    }
  ],
  blogs: []
};

export function readDB(): DBData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      writeDB(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON fallback database:', err);
    return DEFAULT_DB;
  }
}

export function writeDB(data: DBData): void {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to JSON fallback database:', err);
  }
}
