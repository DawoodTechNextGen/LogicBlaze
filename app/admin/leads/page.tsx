'use client';

import { useState, useEffect } from 'react';
import { getLocalLeads, LeadSubmission } from '../../../lib/supabase';
import { Inbox, Calculator, Mail, Phone, Calendar } from 'lucide-react';

export default function AdminLeadsPage(): JSX.Element {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);

  useEffect(() => {
    setLeads(getLocalLeads());
  }, []);

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--logo-deep-navy)', marginBottom: '4px' }}>
          Leads & Estimate Calculator Inbox
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          All contact form submissions and project estimation quotes stored in database.
        </p>
      </div>

      {/* Leads List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {leads.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#64748B' }}>
            No submissions yet. Submit a contact form or project estimate calculator quote to view here!
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>{lead.name}</h3>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '99px',
                      background: lead.type === 'estimate' ? 'var(--primary-50)' : '#FEF9C3',
                      color: lead.type === 'estimate' ? 'var(--logo-royal-blue)' : '#A16207'
                    }}
                  >
                    {lead.type === 'estimate' ? 'Estimate Calculator Quote' : 'Contact Submission'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={15} color="var(--logo-royal-blue)" />
                    <span>{lead.email}</span>
                  </div>
                  {lead.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={15} color="var(--logo-royal-blue)" />
                      <span>{lead.phone}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} color="var(--logo-royal-blue)" />
                    <span>{lead.createdAt}</span>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '8px', fontSize: '14px', color: 'var(--text-main)', borderLeft: '3px solid var(--logo-electric-cyan)' }}>
                  {lead.details}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
