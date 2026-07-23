'use client';

import { useState, useEffect } from 'react';
import { getLocalSettings, saveLocalSettings, SiteSettings } from '../../../lib/supabase';
import { Save, CheckCircle2, Code, FileText, Share2, Shield, Eye, EyeOff, Lock, Unlock, PhoneCall } from 'lucide-react';

export default function AdminSettingsPage(): JSX.Element {
  const [settings, setSettings] = useState<SiteSettings>({
    fbPixelId: '',
    gaMeasurementId: 'G-LOGICBLAZE123',
    customHeadScripts: '',
    defaultMetaTitle: 'LogicBlaze - Enterprise Software Development, AI & Marketing Agency',
    defaultMetaDesc: 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.',
    contactPhone: '+1 (800) 555-0123',
    contactEmail: 'hello@logicblaze.com',
    contactAddress: '374 William S Canning Blvd, Fall River, MA 02721 USA'
  });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Security Credentials State
  const [adminEmail, setAdminEmail] = useState<string>('admin@logicblaze.com');
  const [adminPassword, setAdminPassword] = useState<string>('LogicBlazeSecure2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [denyOtherAccess, setDenyOtherAccess] = useState<boolean>(false);

  useEffect(() => {
    setSettings(getLocalSettings());
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('admin_email');
      const storedPassword = localStorage.getItem('admin_password');
      const storedDeny = localStorage.getItem('admin_deny_others');

      if (storedEmail !== null) setAdminEmail(storedEmail);
      if (storedPassword !== null) setAdminPassword(storedPassword);
      if (storedDeny !== null) setDenyOtherAccess(storedDeny === 'true');
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveLocalSettings(settings);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_email', adminEmail);
      localStorage.setItem('admin_password', adminPassword);
      localStorage.setItem('admin_deny_others', String(denyOtherAccess));
    }
    
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--logo-deep-navy)', marginBottom: '4px' }}>
          Meta Pixel & Global Configurations Tag Manager
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Inject verification tracking IDs, Facebook Meta Pixels, Google Analytics IDs, manage admin access security credentials, and modify corporate contact information dynamically.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: '700', boxShadow: 'var(--shadow-sm)' }}>
          <CheckCircle2 size={20} />
          Settings, Tracking Configurations, Contact Info, and Access Credentials successfully saved!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Card 1: Facebook Meta Pixel Setup */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Share2 size={22} color="#1877F2" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>
              Facebook Meta Pixel Setup
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
            Paste your Facebook Meta Pixel ID to enable customer conversion tracking, optimize ad performance, and build targeted marketing audiences.
          </p>

          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
            Facebook Pixel ID (e.g. 123456789012345):
          </label>
          <input
            type="text"
            value={settings.fbPixelId}
            onChange={(e) => setSettings({ ...settings, fbPixelId: e.target.value })}
            placeholder='e.g. 987654321098765'
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              fontSize: '14px',
              fontFamily: 'monospace',
              background: '#F8FAFC'
            }}
          />
        </div>

        {/* Card 2: Google Analytics 4 Measurement ID */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Code size={22} color="var(--logo-electric-cyan)" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>
              Google Analytics 4 (GA4) ID
            </h3>
          </div>

          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
            Measurement ID (e.g. G-XXXXXXXXXX):
          </label>
          <input
            type="text"
            value={settings.gaMeasurementId}
            onChange={(e) => setSettings({ ...settings, gaMeasurementId: e.target.value })}
            placeholder="G-LOGICBLAZE123"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              fontSize: '14px',
              fontFamily: 'monospace',
              background: '#F8FAFC'
            }}
          />
        </div>

        {/* Card 3: Default SEO Meta Title & Description */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <FileText size={22} color="#3D1E6D" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>
              Default Website Meta Title & Description
            </h3>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
              Default Site Title:
            </label>
            <input
              type="text"
              value={settings.defaultMetaTitle}
              onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
              Default Meta Description:
            </label>

            <textarea
              rows={3}
              value={settings.defaultMetaDesc}
              onChange={(e) => setSettings({ ...settings, defaultMetaDesc: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Card 4: Global Contact Information (New Feature) */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <PhoneCall size={22} color="var(--logo-royal-blue)" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>
              Global Contact Information
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
            Update the phone number, support email, and physical headquarters location rendered across your Navbar, Contact page, and Footer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Contact Phone:
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Support Email:
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
              Headquarters Physical Address:
            </label>
            <input
              type="text"
              value={settings.contactAddress}
              onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                fontSize: '14px',
                background: '#F8FAFC'
              }}
              required
            />
          </div>
        </div>

        {/* Card 5: Admin Access & Security Credentials */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Shield size={22} color="var(--logo-royal-blue)" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>
              Admin Access & Security Credentials
            </h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
            Configure primary administrator login credentials and restrict unauthorized workspace access settings.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Admin Email:
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-light)',
                  fontSize: '14px',
                  background: '#F8FAFC'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                Admin Password:
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    fontSize: '14px',
                    background: '#F8FAFC'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Access lock toggle */}
          <div style={{ 
            padding: '16px', 
            borderRadius: '12px', 
            background: denyOtherAccess ? 'rgba(239, 68, 68, 0.04)' : 'rgba(8, 27, 51, 0.02)',
            border: `1px solid ${denyOtherAccess ? '#FCA5A5' : 'var(--border-light)'}`,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                {denyOtherAccess ? <Lock size={16} color="#EF4444" /> : <Unlock size={16} color="#22C55E" />}
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>Deny Access to Others</h4>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {denyOtherAccess ? 'Locked: Restricting access to non-administrative viewers.' : 'Unlocked: Standard user read access allowed.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDenyOtherAccess(!denyOtherAccess)}
              style={{
                width: '46px',
                height: '24px',
                borderRadius: '99px',
                background: denyOtherAccess ? '#EF4444' : '#CBD5E1',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: denyOtherAccess ? '25px' : '3px',
                transition: 'left 0.2s'
              }} />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button type="submit" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            <Save size={18} />
            <span>Save Settings & Sync Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
