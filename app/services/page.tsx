import Link from 'next/link';
import { SERVICES_DATA } from '../../lib/data';
import TechStackExplorer from '../../components/TechStackExplorer';
import { Metadata } from 'next';
import { Code2, Bot, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services - Software Development, AI Solutions & Marketing',
  description: 'Explore LogicBlaze services: Web Applications, Mobile App Development (iOS/Android), Desktop Software, AI Chatbots, Intelligent Automation, and Technical SEO.'
};

export default function ServicesPage(): JSX.Element {
  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            End-to-End Capabilities
          </div>
          <h1 className="hero-title">Our Specialized Engineering & Growth Services</h1>
          <p className="hero-subtitle">
            From initial concept and architectural design to full-stack development, AI model integration, and search engine dominance.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {SERVICES_DATA.map((service) => {
              const IconComponent = service.iconName === 'Code2' ? Code2 : service.iconName === 'Bot' ? Bot : TrendingUp;
              return (
                <div key={service.id} className="feature-card" style={{ padding: '40px' }}>
                  <div className="feature-icon">
                    <IconComponent size={28} />
                  </div>
                  <h2 className="feature-title" style={{ fontSize: '26px' }}>{service.title}</h2>
                  <p style={{ color: 'var(--logo-royal-blue)', fontWeight: '700', marginBottom: '16px' }}>{service.subtitle}</p>
                  <p className="feature-desc" style={{ marginBottom: '24px' }}>{service.description}</p>
                  
                  <div style={{ background: 'var(--bg-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>Specialized Offerings:</div>
                    <ul style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                      {service.subServices.map((sub, idx) => (
                        <li key={idx}><strong>• {sub.title}</strong>: {sub.description}</li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/services/${service.slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Explore {service.title}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TechStackExplorer />
    </>
  );
}
