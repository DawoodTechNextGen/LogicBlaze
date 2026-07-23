import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Sparkles, Zap, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - LogicBlaze Story, Mission & Values',
  description: 'Learn about LogicBlaze: a premier software engineering & AI innovation agency dedicated to building high-converting products and search growth.'
};

export default function AboutPage(): JSX.Element {
  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            About LogicBlaze
          </div>
          <h1 className="hero-title">Engineering High-Impact Software & AI Products</h1>
          <p className="hero-subtitle">
            LogicBlaze was founded with a single mission: to empower ambitious businesses with world-class web applications, mobile platforms, AI automation, and search dominance.
          </p>
        </div>
      </section>

      {/* Core Values (Synex Home 01 Values Block) */}
      <section className="section-padding">
        <div className="container">
          <div className="header-meta text-center">
            <div className="badge-pill">Core Pillars</div>
            <h2 className="section-title">The Values That Drive Our Engineering</h2>
            <p className="section-desc">We combine technical rigour with intuitive user experience.</p>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck size={28} />
              </div>
              <h3 className="feature-title">Reliability</h3>
              <p className="feature-desc">We build enterprise-grade software architecture engineered for 99.99% uptime, data security, and seamless scalability.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sparkles size={28} />
              </div>
              <h3 className="feature-title">Simplicity</h3>
              <p className="feature-desc">Intuitive, clean UI/UX designs based on the Synex design system that eliminate friction and boost conversion.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={28} />
              </div>
              <h3 className="feature-title">Efficiency</h3>
              <p className="feature-desc">Leveraging AI automation, RAG LLMs, and high-speed Next.js SSR to accelerate product launches and cut operational costs.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <h3 className="feature-title">Support</h3>
              <p className="feature-desc">Dedicated senior software architects providing 24/7 technical monitoring, SLA guarantees, and monthly maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ marginBottom: '20px' }}>Ready to Build Your Next Project?</h2>
          <p className="section-desc" style={{ marginBottom: '32px' }}>Let's discuss how LogicBlaze can bring your software, AI, or marketing vision to life.</p>
          <Link href="/calculator" className="btn btn-primary">
            <span>Calculate Project Estimate Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
