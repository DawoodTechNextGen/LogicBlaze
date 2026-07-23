'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Bell } from 'lucide-react';
import SidebarNav from './SidebarNav';

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
      
      if (pathname === '/admin/login') {
        setIsAuthenticated(true);
        return;
      }

      if (!loggedIn) {
        setIsAuthenticated(false);
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthenticated === null) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        background: 'var(--logo-midnight)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontFamily: 'var(--font-family)',
        fontSize: '15px',
        fontWeight: '700'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: 'var(--logo-electric-cyan)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }} />
          <span>Authenticating Administrator...</span>
          <style jsx global>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // If we are on the login page, render children directly without sidebar/header wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Render full dashboard layout for authenticated users
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        background: 'var(--bg-page)',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(31, 167, 230, 0.12) 0%, rgba(61, 30, 109, 0.04) 45%, transparent 70%), radial-gradient(rgba(8, 27, 51, 0.04) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 28px 28px',
        overflow: 'hidden'
      }}
    >
      {/* Synex Midnight Sidebar */}
      <aside
        style={{
          width: '280px',
          background: 'linear-gradient(180deg, var(--logo-midnight) 0%, var(--logo-dark-violet) 100%)',
          color: '#FFFFFF',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          flexShrink: 0,
          height: '100vh',
          boxShadow: '0 0 32px rgba(8, 27, 51, 0.25)'
        }}
      >
        <div>
          {/* Logo */}
          <Link href="/admin" className="brand-logo" style={{ color: '#FFFFFF', marginBottom: '36px' }}>
            <img src="/logo.jpg" alt="LogicBlaze Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', borderRadius: '6px' }} />
            LogicBlaze Admin
          </Link>

          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '12px', paddingLeft: '10px', letterSpacing: '0.8px' }}>
            Main Workspace
          </div>

          <SidebarNav />
        </div>

        {/* View Live Website Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            onClick={() => {
              localStorage.removeItem('admin_logged_in');
              router.push('/admin/login');
            }}
            className="btn btn-secondary"
            style={{
              width: '100%',
              fontSize: '13px',
              padding: '10px 16px',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#F87171',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
          
          <Link
            href="/"
            target="_blank"
            className="btn btn-secondary"
            style={{
              width: '100%',
              fontSize: '13px',
              padding: '10px 16px',
              justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <span>View Live Website</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Admin Scrollable Area */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Bar */}
        <header
          style={{
            height: '70px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-light)',
            padding: '0 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div className="badge-pill" style={{ marginBottom: 0 }}>
            <span className="badge-dot"></span>
            LogicBlaze Admin Control Center
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--logo-royal-blue)' }}>
              <Bell size={18} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-surface)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '14px', fontWeight: '800' }}>
                A
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>Admin Workspace</span>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main style={{ flexGrow: 1, padding: '36px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
