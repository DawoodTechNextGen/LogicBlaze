'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, ChevronDown, Code2, Bot, TrendingUp, Calculator } from 'lucide-react';
import { getLocalSettings } from '../lib/supabase';

export default function Navbar(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [servicesDropdown, setServicesDropdown] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('+1 (800) 555-0123');

  useEffect(() => {
    const settings = getLocalSettings();
    if (settings.contactPhone) {
      setPhone(settings.contactPhone);
    }
  }, []);

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo">
          <img src="/logo.jpg" alt="LogicBlaze Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '6px' }} />
          LogicBlaze
        </Link>

        {/* User Requested Clean Nav Menu */}
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-link">Home</Link>
          
          {/* Services Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <Link href="/services" className="nav-link">
              <span>Services</span>
              <ChevronDown size={14} />
            </Link>
            
            {servicesDropdown && (
              <div className="dropdown-menu" style={{ width: '280px' }}>
                <Link href="/services/software-development" className="dropdown-item">
                  <Code2 size={18} color="var(--logo-royal-blue)" />
                  <span>Software Development</span>
                </Link>
                <Link href="/services/ai-solutions-automation" className="dropdown-item">
                  <Bot size={18} color="var(--logo-royal-blue)" />
                  <span>AI & Automation</span>
                </Link>
                <Link href="/services/digital-marketing" className="dropdown-item">
                  <TrendingUp size={18} color="var(--logo-royal-blue)" />
                  <span>Digital Marketing & SEO</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Header Right Actions: Phone + "Cost Estimate" Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--logo-deep-navy)' }}>
            <Phone size={16} color="var(--logo-royal-blue)" />
            <span>{phone}</span>
          </div>

          {/* User Requested "Cost Estimate" Button */}
          <Link href="/calculator" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
            <Calculator size={16} />
            <span>Cost Estimate</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
