'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Search, Inbox, Sparkles, Users } from 'lucide-react';

export default function SidebarNav(): JSX.Element {
  const pathname = usePathname();

  const links = [
    {
      href: '/admin',
      label: 'Site Kit Analytics',
      icon: LayoutDashboard,
      iconColor: 'var(--logo-electric-cyan)'
    },
    {
      href: '/admin/blogs',
      label: 'WordPress Blog CMS',
      icon: FileText,
      iconColor: 'var(--logo-electric-cyan)'
    },
    {
      href: '/admin/blogs/new',
      label: 'New Post (RankMath)',
      icon: Sparkles,
      iconColor: '#A3E635'
    },
    {
      href: '/admin/settings',
      label: 'Search Console & Meta',
      icon: Search,
      iconColor: 'var(--logo-electric-cyan)'
    },
    {
      href: '/admin/leads',
      label: 'Leads & Quotes Inbox',
      icon: Inbox,
      iconColor: 'var(--logo-electric-cyan)'
    },
    {
      href: '/admin/users',
      label: 'User Management',
      icon: Users,
      iconColor: 'var(--logo-electric-cyan)'
    }
  ];

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: isActive ? '700' : '600',
              color: isActive ? '#FFFFFF' : '#94A3B8',
              background: isActive ? 'var(--gradient-primary)' : 'transparent',
              boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
              transition: 'var(--transition)'
            }}
          >
            <Icon size={18} color={isActive ? '#FFFFFF' : link.iconColor} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
