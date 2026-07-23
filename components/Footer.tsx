'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight, Calculator } from 'lucide-react';
import { getLocalSettings } from '../lib/supabase';

export default function Footer(): JSX.Element {
  const [phone, setPhone] = useState<string>('+1 (800) 555-0123');
  const [email, setEmail] = useState<string>('hello@logicblaze.com');
  const [address, setAddress] = useState<string>('374 William S Canning Blvd, Fall River, MA 02721 USA');

  useEffect(() => {
    const settings = getLocalSettings();
    if (settings.contactPhone) setPhone(settings.contactPhone);
    if (settings.contactEmail) setEmail(settings.contactEmail);
    if (settings.contactAddress) setAddress(settings.contactAddress);
  }, []);

  return (
    <>
      {/* Pre-Footer CTA Banner */}
      <section className="pre-footer-banner">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
              Bring in your business data from different tools into one platform.
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Calculate your software, AI, or SEO project scope and cost in 2 minutes.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/calculator" className="btn btn-primary">
              <Calculator size={16} />
              <span>Cost Estimate</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dark Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand Info & Contact */}
            <div className="footer-brand">
              <Link href="/" className="brand-logo" style={{ color: '#ffffff' }}>
                <img src="/logo.jpg" alt="LogicBlaze Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '6px' }} />
                LogicBlaze
              </Link>
              <p>
                Premier Software Development & AI Agency. We engineer high-performance web applications, mobile platforms, desktop tools, AI chatbots, and technical SEO growth strategies.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#CBD5E1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} color="var(--logo-electric-cyan)" />
                  <span>{phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} color="var(--logo-electric-cyan)" />
                  <span>{email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={16} color="var(--logo-electric-cyan)" />
                  <span>{address}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Pages Navigation */}
            <div className="footer-col">
              <h4>Pages</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/calculator">Cost Estimator</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><Link href="/services/software-development">Web Application Dev</Link></li>
                <li><Link href="/services/software-development">Mobile App Dev (iOS/Android)</Link></li>
                <li><Link href="/services/software-development">Desktop Apps (Electron/Tauri)</Link></li>
                <li><Link href="/services/ai-solutions-automation">AI Chatbots & Agents</Link></li>
                <li><Link href="/services/ai-solutions-automation">Workflow Automation</Link></li>
                <li><Link href="/services/digital-marketing">On-Page SEO & Growth</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Inquiries */}
            <div className="footer-col">
              <h4>Contact Us</h4>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '16px', lineHeight: '1.6' }}>
                General information or new project inquiries.
              </p>
              <div style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '700', color: 'var(--logo-electric-cyan)' }}>
                {phone}
              </div>
              <div style={{ marginBottom: '16px', fontSize: '14px', color: '#94A3B8' }}>
                {email}
              </div>
              <Link href="/calculator" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px', width: '100%' }}>
                <Calculator size={16} />
                <span>Cost Estimate</span>
              </Link>
            </div>
          </div>

          {/* Sub-Footer Bottom Bar */}
          <div className="footer-bottom">
            <div>© 2026 LogicBlaze. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/contact" style={{ color: '#94A3B8' }}>Privacy policy</Link>
              <span>|</span>
              <Link href="/contact" style={{ color: '#94A3B8' }}>Terms & conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
