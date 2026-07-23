'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, Users, Search, DollarSign, Clock, ArrowUpRight, 
  Sparkles, Plus, Database, Zap, CheckCircle2, XCircle 
} from 'lucide-react';

export default function AdminDashboardPage(): JSX.Element {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  
  // Connection and Setup state (moved from sidebar)
  const [isMySQLConnected, setIsMySQLConnected] = useState<boolean>(true);
  const [isSiteKitActive, setIsSiteKitActive] = useState<boolean>(true);
  
  // Real-time Traffic Data State
  const [trafficData, setTrafficData] = useState<number[]>([45, 60, 35, 80, 65, 90, 75, 100, 85, 95, 110, 125, 90, 105, 120]);

  useEffect(() => {
    if (!isSiteKitActive) return;

    const interval = setInterval(() => {
      setTrafficData((prev) => {
        const newData = [...prev.slice(1)];
        const nextVal = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // values between 20% and 100%
        newData.push(nextVal);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSiteKitActive]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMySQL = localStorage.getItem('admin_mysql_connected');
      const storedSiteKit = localStorage.getItem('admin_sitekit_active');

      if (storedMySQL !== null) setIsMySQLConnected(storedMySQL === 'true');
      if (storedSiteKit !== null) setIsSiteKitActive(storedSiteKit === 'true');
    }
  }, []);

  // Update localStorage when integration switches change
  const toggleMySQL = () => {
    const nextVal = !isMySQLConnected;
    setIsMySQLConnected(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_mysql_connected', String(nextVal));
    }
  };

  const toggleSiteKit = () => {
    const nextVal = !isSiteKitActive;
    setIsSiteKitActive(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_sitekit_active', String(nextVal));
    }
  };

  // Generate points from trafficData dynamically for the real-time SVG chart
  const chartPoints = trafficData.map((val, idx) => {
    const x = 50 + idx * 37; // spaced coordinates from 50 to 568
    const y = 140 - (val / 150) * 105; // scaled height from y=35 to y=140
    return { x, y };
  });

  const linePath = chartPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L 568 140 L 50 140 Z`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Dashboard Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Site Kit Analytics & Command Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '650px', lineHeight: '1.5' }}>
            Monitor real-time traffic data and manage external integrations.
          </p>
        </div>

        {/* Time Selector Pills */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-surface)', padding: '6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          {(['24h', '7d', '30d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                background: timeRange === t ? 'var(--gradient-primary)' : 'transparent',
                color: timeRange === t ? '#FFFFFF' : 'var(--text-body)',
                boxShadow: timeRange === t ? 'var(--shadow-glow)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              {t === '24h' ? '24 Hours' : t === '7d' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Premium Glassmorphic Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Card 1: Unique Visitors */}
        <div className="feature-card" style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--logo-royal-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Visitors</span>
            <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '16px', marginBottom: 0, background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
            {isSiteKitActive ? (timeRange === '24h' ? '1,420' : timeRange === '7d' ? '12,850' : '54,200') : '—'}
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: isSiteKitActive ? '#22C55E' : 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isSiteKitActive ? (
              <>
                <ArrowUpRight size={14} /> +18.4% vs previous period
              </>
            ) : (
              'Site Kit Integration Disabled'
            )}
          </div>
        </div>

        {/* Card 2: GSC Impressions */}
        <div className="feature-card" style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--logo-royal-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GSC Impressions</span>
            <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '16px', marginBottom: 0, background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <Search size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
            {isSiteKitActive ? (timeRange === '24h' ? '8,900' : timeRange === '7d' ? '74,200' : '310,000') : '—'}
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: isSiteKitActive ? '#22C55E' : 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isSiteKitActive ? (
              <>
                <ArrowUpRight size={14} /> +24.1% Search Growth
              </>
            ) : (
              'Site Kit Integration Disabled'
            )}
          </div>
        </div>

        {/* Card 3: Calculator Leads */}
        <div className="feature-card" style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--logo-royal-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Calculator Leads</span>
            <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '16px', marginBottom: 0, background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
            {isMySQLConnected ? (timeRange === '24h' ? '14' : timeRange === '7d' ? '86' : '340') : '—'}
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: isMySQLConnected ? '#22C55E' : 'var(--text-muted)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isMySQLConnected ? (
              <>
                <ArrowUpRight size={14} /> 4.2% Lead Conv. Rate
              </>
            ) : (
              'Database disconnected'
            )}
          </div>
        </div>

        {/* Card 4: Session Duration */}
        <div className="feature-card" style={{ padding: '24px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--logo-royal-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Engagement</span>
            <div className="feature-icon" style={{ width: '40px', height: '40px', fontSize: '16px', marginBottom: 0, background: 'var(--primary-50)', color: 'var(--logo-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.1' }}>
            3m 42s
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#22C55E', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} /> +32s session depth
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        
        {/* Left Column: Traffic Monitor + Connections Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Traffic Monitor */}
          <div className="feature-card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={20} color="var(--logo-electric-cyan)" />
                Real-Time Traffic Monitor (GA4 Stream)
              </h3>
              <div className="badge-pill" style={{ marginBottom: 0 }}>
                <span className="badge-dot" style={{ backgroundColor: isSiteKitActive ? '#22C55E' : '#EF4444' }}></span>
                {isSiteKitActive ? 'LIVE DATA STREAM' : 'STREAM STOPPED'}
              </div>
            </div>

            <div style={{ 
              height: '240px', 
              background: '#FFFFFF', 
              borderRadius: 'var(--radius-lg)', 
              padding: '24px 20px 10px 20px', 
              border: '1px solid var(--border-light)',
              position: 'relative'
            }}>
              {isSiteKitActive ? (
                <svg viewBox="0 0 600 180" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--logo-electric-cyan)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--logo-electric-cyan)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="45" y1="30" x2="570" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="45" y1="70" x2="570" y2="70" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="45" y1="110" x2="570" y2="110" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="45" y1="140" x2="570" y2="140" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Y-Axis Labels */}
                  <text x="15" y="34" fontSize="10" fill="#94A3B8" fontWeight="700">10k</text>
                  <text x="15" y="74" fontSize="10" fill="#94A3B8" fontWeight="700">5k</text>
                  <text x="15" y="114" fontSize="10" fill="#94A3B8" fontWeight="700">2k</text>
                  <text x="15" y="144" fontSize="10" fill="#94A3B8" fontWeight="700">0</text>

                  {/* The Area Fill */}
                  <path
                    d={areaPath}
                    fill="url(#chartGradient)"
                    style={{ transition: 'd 0.5s ease-in-out' }}
                  />

                  {/* The Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--logo-electric-cyan)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'd 0.5s ease-in-out' }}
                  />

                  {/* Node points */}
                  {chartPoints.map((p, idx) => {
                    const isLast = idx === chartPoints.length - 1;
                    return (
                      <circle
                        key={idx}
                        cx={p.x}
                        cy={p.y}
                        r={isLast ? 4.5 : 3}
                        fill={isLast ? '#EF4444' : '#FFFFFF'}
                        stroke={isLast ? '#FFFFFF' : 'var(--logo-royal-blue)'}
                        strokeWidth="2"
                        style={{ transition: 'cy 0.5s ease-in-out' }}
                      />
                    );
                  })}

                  {/* X-Axis Labels */}
                  <text x="50" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Mon</text>
                  <text x="130" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Tue</text>
                  <text x="210" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Wed</text>
                  <text x="290" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Thu</text>
                  <text x="370" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Fri</text>
                  <text x="450" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Sat</text>
                  <text x="530" y="162" fontSize="9" fill="#64748B" fontWeight="700" textAnchor="middle">Sun (Live)</text>
                </svg>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '13px', fontWeight: '700' }}>
                  Site Kit Connection Setup Deactivated
                </div>
              )}
            </div>
          </div>

          {/* Connections & Integrations Panel */}
          <div className="feature-card" style={{ padding: '28px', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="var(--logo-royal-blue)" />
              System Integrations & Setup
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* MySQL Database Connection setup component */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '16px', 
                borderRadius: 'var(--radius-md)', 
                background: isMySQLConnected ? 'rgba(34, 197, 94, 0.04)' : 'rgba(239, 68, 68, 0.04)',
                border: `1px solid ${isMySQLConnected ? '#DCFCE7' : '#FEE2E2'}`,
                transition: 'var(--transition)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: isMySQLConnected ? '#DCFCE7' : '#FEE2E2', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isMySQLConnected ? '#15803D' : '#991B1B'
                  }}>
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>MySQL Database (cPanel)</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {isMySQLConnected ? 'Connected to MySQL database. Lead capture active.' : 'Database link disconnected.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleMySQL}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)',
                    background: isMySQLConnected ? '#DCFCE7' : '#FEE2E2',
                    color: isMySQLConnected ? '#15803D' : '#991B1B',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isMySQLConnected ? <><CheckCircle2 size={14} /> Connected</> : <><XCircle size={14} /> Disconnected</>}
                </button>
              </div>

              {/* Site Kit active setup component */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '16px', 
                borderRadius: 'var(--radius-md)', 
                background: isSiteKitActive ? 'rgba(31, 167, 230, 0.04)' : 'rgba(239, 68, 68, 0.04)',
                border: `1px solid ${isSiteKitActive ? '#E6F5FC' : '#FEE2E2'}`,
                transition: 'var(--transition)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: isSiteKitActive ? '#C2E7F7' : '#FEE2E2', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isSiteKitActive ? 'var(--logo-royal-blue)' : '#991B1B'
                  }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>GA4 Site Kit Dashboard Sync</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {isSiteKitActive ? 'Google Analytics 4 active. Fetching traffic metrics.' : 'Analytics sync disabled.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleSiteKit}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-light)',
                    background: isSiteKitActive ? '#E2E8F0' : 'var(--gradient-primary)',
                    color: isSiteKitActive ? 'var(--text-main)' : '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  {isSiteKitActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="feature-card" style={{ padding: '28px', background: 'linear-gradient(135deg, var(--logo-deep-navy) 0%, var(--logo-dark-indigo) 100%)', color: '#FFFFFF', borderRadius: 'var(--radius-lg)' }}>
            <div className="badge-pill" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--logo-electric-cyan)', borderColor: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}>
              <Sparkles size={14} color="var(--logo-electric-cyan)" /> RankMath SEO Publisher
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px', color: '#FFFFFF' }}>
              Publish SEO Content
            </h3>

            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' }}>
              Create articles with real-time RankMath SEO scoring and Google SERP snippet previews.
            </p>

            <Link href="/admin/blogs/new" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={16} />
              <span>Create New Article</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
