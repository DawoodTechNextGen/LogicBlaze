import Link from 'next/link';
import { ArrowRight, FileQuestion } from 'lucide-react';

export default function NotFound(): JSX.Element {
  return (
    <div className="section-padding text-center" style={{ background: 'var(--bg-page)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ width: '72px', height: '72px', background: 'var(--primary-50)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: 'var(--logo-royal-blue)' }}>
          <FileQuestion size={36} />
        </div>
        <h1 className="hero-title" style={{ fontSize: '42px', marginBottom: '16px' }}>404 - Page Not Found</h1>
        <p className="hero-subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>
          The requested page could not be found. Check the URL or return to the main website.
        </p>
        <Link href="/" className="btn btn-primary">
          <span>Return to Homepage</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
