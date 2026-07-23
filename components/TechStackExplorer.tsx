'use client';

import { useState } from 'react';
import { TECH_STACK_CATEGORIES } from '../lib/data';

export default function TechStackExplorer(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(TECH_STACK_CATEGORIES[0].id);

  const activeCategory = TECH_STACK_CATEGORIES.find((cat) => cat.id === activeTab) || TECH_STACK_CATEGORIES[0];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="header-meta text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            LogicBlaze Capabilities
          </div>
          <h2 className="section-title">
            Enterprise Technology Ecosystem
          </h2>
          <p className="section-desc">
            Explore the modern frameworks, programming languages, AI engines, and marketing strategies we leverage to build world-class products.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}
        >
          {TECH_STACK_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--logo-electric-cyan)' : '1px solid var(--border-light)',
                  background: isActive ? 'var(--gradient-primary)' : 'var(--bg-subtle)',
                  color: isActive ? '#FFFFFF' : 'var(--text-main)',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                  transition: 'var(--transition)'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontSize: '16px', color: 'var(--logo-royal-blue)', fontWeight: '700' }}>
            {activeCategory.description}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid-3">
          {activeCategory.techs.map((tech, idx) => (
            <div
              key={idx}
              className="feature-card"
              style={{
                padding: '28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                position: 'relative'
              }}
            >
              {/* Official Brand Logo */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-50)',
                  border: '1px solid var(--primary-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.logoUrl}
                  alt={`${tech.name} Logo`}
                  style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
                    {tech.name}
                  </h3>
                </div>

                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'var(--primary-50)',
                    color: 'var(--logo-royal-blue)',
                    marginBottom: '8px'
                  }}
                >
                  {tech.category}
                </span>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
