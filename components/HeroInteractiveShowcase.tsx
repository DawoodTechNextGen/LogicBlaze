'use client';

import { useState } from 'react';
import { Terminal, Activity, Smartphone, Cpu, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function HeroInteractiveShowcase(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'code' | 'analytics' | 'preview'>('code');

  return (
    <div className="hero-mockup">
      {/* Mockup Top Header */}
      <div className="mockup-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginLeft: '12px' }}>
            logicblaze-engine.v2.5.ts
          </span>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button
            onClick={() => setActiveTab('code')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'code' ? 'var(--primary-50)' : 'transparent',
              color: activeTab === 'code' ? 'var(--logo-royal-blue)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Terminal size={14} /> AI Code Engine
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'analytics' ? 'var(--primary-50)' : 'transparent',
              color: activeTab === 'analytics' ? 'var(--logo-royal-blue)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Activity size={14} /> Analytics & Metrics
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            style={{
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'preview' ? 'var(--primary-50)' : 'transparent',
              color: activeTab === 'preview' ? 'var(--logo-royal-blue)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Smartphone size={14} /> Web & Mobile SaaS
          </button>
        </div>
      </div>

      {/* Mockup Body Content */}
      <div className="mockup-body" style={{ minHeight: '380px', padding: '24px', alignItems: 'stretch' }}>
        {activeTab === 'code' && (
          <div style={{ width: '100%', fontFamily: 'monospace', textAlign: 'left', fontSize: '14px', lineHeight: '1.8' }}>
            <div style={{ color: '#64748B', marginBottom: '12px' }}>// LogicBlaze Enterprise AI & Full-Stack Application Initializer</div>
            <div>
              <span style={{ color: '#F43F5E' }}>import</span> {'{'} <span style={{ color: '#38BDF8' }}>LogicBlazeAI</span>, <span style={{ color: '#38BDF8' }}>NextAppRouter</span> {'}'} <span style={{ color: '#F43F5E' }}>from</span> <span style={{ color: '#A3E635' }}>'@logicblaze/core'</span>;
            </div>
            <br />
            <div>
              <span style={{ color: '#F43F5E' }}>const</span> <span style={{ color: '#FACC15' }}>agent</span> = <span style={{ color: '#F43F5E' }}>new</span> <span style={{ color: '#38BDF8' }}>LogicBlazeAI</span>({'{'}
            </div>
            <div style={{ paddingLeft: '20px' }}>
              model: <span style={{ color: '#A3E635' }}>'gpt-4o-enterprise'</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              vectorDB: <span style={{ color: '#A3E635' }}>'pinecone-rag'</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              latencyTargetMs: <span style={{ color: '#FACC15' }}>12</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              security: <span style={{ color: '#A3E635' }}>'end-to-end-encrypted'</span>
            </div>
            <div>{'}'});</div>
            <br />
            <div>
              <span style={{ color: '#64748B' }}>// Output stream:</span>
            </div>
            <div style={{ background: 'rgba(31, 167, 230, 0.1)', borderLeft: '3px solid var(--logo-electric-cyan)', padding: '10px 14px', borderRadius: '4px', color: '#38BDF8' }}>
              ⚡ [SUCCESS] Application initialized. Next.js 15 SSR active. AI Chatbot RAG connected.
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <Cpu size={24} color="#38BDF8" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>12 ms</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>Average API Latency</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <Zap size={24} color="#A3E635" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>99.99%</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>Cloud Uptime SLA</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <ShieldCheck size={24} color="#FACC15" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>256-Bit</div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>AES Security Protocol</div>
              </div>
            </div>

            <div style={{ background: 'rgba(31, 167, 230, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(31, 167, 230, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={20} color="#38BDF8" />
                <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: '600' }}>Autonomous AI RAG Pipeline Status: Operational</span>
              </div>
              <span style={{ fontSize: '12px', padding: '4px 10px', background: '#27C93F', color: '#000000', borderRadius: '99px', fontWeight: '800' }}>LIVE</span>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>Cross-Platform Ecosystem Preview</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '500px', textAlign: 'center' }}>
              Web App (Next.js 15), Mobile (Flutter iOS/Android), and Desktop (Electron & Tauri) synchronized via unified Cloud GraphQL API.
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
              <span style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '13px', color: '#38BDF8', fontWeight: '700', border: '1px solid rgba(56,189,248,0.3)' }}>
                🌐 Web App (Next.js)
              </span>
              <span style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '13px', color: '#A3E635', fontWeight: '700', border: '1px solid rgba(163,230,53,0.3)' }}>
                📱 Mobile App (Flutter)
              </span>
              <span style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '13px', color: '#FACC15', fontWeight: '700', border: '1px solid rgba(250,204,21,0.3)' }}>
                💻 Desktop App (Tauri)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
