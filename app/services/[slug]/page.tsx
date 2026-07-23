import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA } from '../../../lib/data';
import { getServiceSchema } from '../../../lib/seo-schemas';
import EstimationCalculator from '../../../components/EstimationCalculator';
import { Metadata } from 'next';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} Services | LogicBlaze`,
    description: service.description,
    openGraph: {
      title: `${service.title} - LogicBlaze Software & AI Agency`,
      description: service.description,
      url: `https://logicblaze.com/services/${service.slug}`
    }
  };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceSchema = getServiceSchema(service.title, service.description, `https://logicblaze.com/services/${service.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            {service.heroBadge}
          </div>
          <h1 className="hero-title">{service.title}</h1>
          <p className="hero-subtitle">{service.subtitle}</p>
          <div className="hero-actions">
            <Link href="/calculator" className="btn btn-primary">
              Estimate {service.title} Cost →
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Book Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="header-meta text-center">
            <h2 className="section-title">What We Deliver in {service.title}</h2>
            <p className="section-desc">{service.description}</p>
          </div>

          {/* Sub-services Grid */}
          <div className="grid-3" style={{ marginBottom: '60px' }}>
            {service.subServices.map((sub, idx) => (
              <div key={idx} className="feature-card">
                <h3 className="feature-title" style={{ fontSize: '22px' }}>{sub.title}</h3>
                <p className="feature-desc" style={{ marginBottom: '20px' }}>{sub.description}</p>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                    Engineered Tech Stack:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {sub.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--primary-50)',
                          color: 'var(--logo-royal-blue)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Calculator Embed */}
          <EstimationCalculator />
        </div>
      </section>
    </>
  );
}
