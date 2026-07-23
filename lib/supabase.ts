import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fhrmpxjjczcnclzsnede.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_p7QIr2OKcEzdRhdhHsdWtA_7YfwU_qF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteSettings {
  fbPixelId: string;
  gaMeasurementId: string;
  customHeadScripts: string;
  defaultMetaTitle: string;
  defaultMetaDesc: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export interface LeadSubmission {
  id: string;
  type: 'contact' | 'estimate';
  name: string;
  email: string;
  phone?: string;
  details: string;
  createdAt: string;
}

// Local Storage Keys & Supabase Table Helpers
const SETTINGS_STORAGE_KEY = 'logicblaze_settings';
const LEADS_STORAGE_KEY = 'logicblaze_leads';

export function getLocalSettings(): SiteSettings {
  if (typeof window === 'undefined') {
    return {
      fbPixelId: '',
      gaMeasurementId: 'G-LOGICBLAZE123',
      customHeadScripts: '',
      defaultMetaTitle: 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency',
      defaultMetaDesc: 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.',
      contactPhone: '+1 (800) 555-0123',
      contactEmail: 'hello@logicblaze.com',
      contactAddress: '374 William S Canning Blvd, Fall River, MA 02721 USA'
    };
  }

  const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    fbPixelId: '',
    gaMeasurementId: 'G-LOGICBLAZE123',
    customHeadScripts: '',
    defaultMetaTitle: 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency',
    defaultMetaDesc: 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.',
    contactPhone: '+1 (800) 555-0123',
    contactEmail: 'hello@logicblaze.com',
    contactAddress: '374 William S Canning Blvd, Fall River, MA 02721 USA'
  };
}

export function saveLocalSettings(settings: SiteSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
}

export function getLocalLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(LEADS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return [
    {
      id: 'lead-1',
      type: 'estimate',
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.io',
      phone: '+1 (555) 234-5678',
      details: 'Calculated Quote: Mobile App (iOS & Android) + MVP Scope + Stripe Payments & AI Chatbot ($3,400 est / 4 wks)',
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
  ];
}

export function saveLocalLead(lead: Omit<LeadSubmission, 'id' | 'createdAt'>): LeadSubmission {
  const current = getLocalLeads();
  const newLead: LeadSubmission = {
    ...lead,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
  const updated = [newLead, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  }

  // Attempt Supabase async insert if configured
  try {
    supabase.from('leads').insert([
      {
        type: lead.type,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        details: lead.details
      }
    ]).then(({ error }) => {
      if (error) console.log('Supabase insert note:', error.message);
    });
  } catch (err) {
    console.log('Supabase client note:', err);
  }

  return newLead;
}
