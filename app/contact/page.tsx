'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { getLocalSettings } from '../../lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', service: 'software', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Dynamic contact details state
  const [phone, setPhone] = useState<string>('+1 (800) 555-0123');
  const [email, setEmail] = useState<string>('hello@logicblaze.com');
  const [address, setAddress] = useState<string>('374 William S Canning Blvd, Fall River, MA 02721 USA');

  useEffect(() => {
    const settings = getLocalSettings();
    if (settings.contactPhone) setPhone(settings.contactPhone);
    if (settings.contactEmail) setEmail(settings.contactEmail);
    if (settings.contactAddress) setAddress(settings.contactAddress);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Get In Touch
          </div>
          <h1 className="hero-title">Let's Discuss Your Next Big Project</h1>
          <p className="hero-subtitle">
            Have a question about custom software development, AI chatbot automation, or SEO strategy? Reach out to our expert team.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
            {/* Contact Info & Office details */}
            <div>
              <h2 className="section-title" style={{ fontSize: '32px', marginBottom: '20px' }}>Contact Information</h2>
              <p className="section-desc" style={{ marginBottom: '32px' }}>
                Fill out the form or reach out directly to schedule a 30-minute discovery call with our senior architects.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>Call Us Directly</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>{phone}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>Email Inquiries</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>{email}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700' }}>Headquarters</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>{address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>Send Us a Message</h3>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>Service Category</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', outline: 'none', background: '#fff' }}
                    >
                      <option value="software">Software Development (Web/Mobile/Desktop)</option>
                      <option value="ai">AI Solutions & Automation</option>
                      <option value="marketing">Digital Marketing & SEO</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>Project Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your project scope, features, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', outline: 'none' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    <span>Submit Message</span>
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle2 size={56} color="var(--logo-electric-cyan)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--logo-royal-blue)', marginBottom: '8px' }}>Message Received!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                    Thank you <strong>{formData.name}</strong>. A LogicBlaze project consultant will contact you at <strong>{formData.email}</strong> within 2 business hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
