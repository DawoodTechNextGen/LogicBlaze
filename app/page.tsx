import Link from 'next/link';
import TechStackExplorer from '../components/TechStackExplorer';
import EstimationCalculator from '../components/EstimationCalculator';
import FaqAccordion from '../components/FaqAccordion';
import AnimatedCounter from '../components/AnimatedCounter';
import CursorGlowHero from '../components/CursorGlowHero';
import { SERVICES_DATA, BLOG_POSTS, FAQS_LIST } from '../lib/data';
import { getFaqSchema } from '../lib/seo-schemas';
import { Code2, Bot, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage(): JSX.Element {
  const faqSchema = getFaqSchema(FAQS_LIST);

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section (Synex Home 01 Exact Clean Layout with Mouse Cursor Spotlight) */}
      <CursorGlowHero>
        <div className="container text-center" style={{ padding: '60px 0 30px 0' }}>
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Premier Software & Custom AI Solutions Agency 2026
          </div>

          <h1 className="hero-title">
            Engineering High-Performance Custom Software & AI Systems
          </h1>

          <p className="hero-subtitle">
            We deliver state-of-the-art enterprise web platforms, mobile apps, custom AI LLM integrations, and rank-boosting technical SEO strategies to scale startups and automate companies.
          </p>

          <div className="hero-actions" style={{ marginBottom: '20px' }}>
            <Link href="/calculator" className="btn btn-primary">
              <span>Calculate Project Cost</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn btn-secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </CursorGlowHero>

      {/* Metrics Trust Counter Banner with Smooth Animated Counters */}
      <section style={{ background: 'var(--logo-deep-navy)', color: '#ffffff', padding: '60px 0' }}>
        <div className="container">
          <div className="grid-3" style={{ textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '46px', fontWeight: '800', color: 'var(--logo-electric-cyan)', lineHeight: '1.1' }}>
                <AnimatedCounter end={150} suffix="+" duration={2000} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '15px', fontWeight: '600', marginTop: '6px' }}>
                Custom Projects Delivered
              </div>
            </div>
            <div>
              <div style={{ fontSize: '46px', fontWeight: '800', color: 'var(--logo-electric-cyan)', lineHeight: '1.1' }}>
                <AnimatedCounter end={99.4} decimals={1} suffix="%" duration={2200} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '15px', fontWeight: '600', marginTop: '6px' }}>
                Client Satisfaction Rate
              </div>
            </div>
            <div>
              <div style={{ fontSize: '46px', fontWeight: '800', color: 'var(--logo-electric-cyan)', lineHeight: '1.1' }}>
                <AnimatedCounter end={24} suffix="/7" duration={1800} />
              </div>
              <div style={{ color: '#94A3B8', fontSize: '15px', fontWeight: '600', marginTop: '6px' }}>
                Automated AI Support & SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="header-meta text-center">
            <div className="badge-pill">
              <span className="badge-dot"></span>
              Core Capabilities
            </div>
            <h2 className="section-title">End-to-End Digital Solutions</h2>
            <p className="section-desc">
              We specialize in three core verticals engineered to accelerate startup velocity and enterprise efficiency.
            </p>
          </div>

          <div className="grid-3">
            {SERVICES_DATA.map((service) => {
              const IconComponent = service.iconName === 'Code2' ? Code2 : service.iconName === 'Bot' ? Bot : TrendingUp;
              return (
                <div key={service.id} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="feature-title">{service.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--logo-royal-blue)', fontWeight: '700', marginBottom: '12px' }}>
                    {service.subtitle}
                  </p>
                  <p className="feature-desc">{service.description}</p>
                  
                  <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Key Deliverables:</div>
                    <ul style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={14} color="var(--logo-royal-blue)" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="btn btn-secondary"
                    style={{ marginTop: '24px', width: '100%', fontSize: '14px', justifyContent: 'center' }}
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cubix.co Style Tech Stack Explorer Component */}
      <TechStackExplorer />

      {/* Process Stepper Section */}
      <section className="section-padding">
        <div className="container">
          <div className="header-meta text-center">
            <div className="badge-pill">
              <span className="badge-dot"></span>
              Proven Workflow
            </div>
            <h2 className="section-title">Four Steps to Software Success</h2>
            <p className="section-desc">Agile development methodology with total transparency and fixed milestones.</p>
          </div>

          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div className="process-step">
              <div className="step-num">01.</div>
              <h3 className="feature-title">Discovery & Strategy</h3>
              <p className="feature-desc">We analyze your business objectives, target audience, technical specifications, and system architecture.</p>
            </div>

            <div className="process-step">
              <div className="step-num">02.</div>
              <h3 className="feature-title">Architecture & UX</h3>
              <p className="feature-desc">Interactive wireframes, high-fidelity UI designs using Synex design tokens, and database schema setup.</p>
            </div>

            <div className="process-step">
              <div className="step-num">03.</div>
              <h3 className="feature-title">Development & AI</h3>
              <p className="feature-desc">Full-stack web/mobile/desktop code engineering with OpenAI LLM RAG pipelines and REST/GraphQL APIs.</p>
            </div>

            <div className="process-step">
              <div className="step-num">04.</div>
              <h3 className="feature-title">QA, SEO & Launch</h3>
              <p className="feature-desc">Automated security testing, technical On-Page SEO optimization, schema validation, and cloud deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Estimation Calculator Section */}
      <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <EstimationCalculator />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding" style={{ background: 'var(--primary-50)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <div className="badge-pill">Client Testimonials</div>
          <blockquote style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4', marginBottom: '24px' }}>
            “LogicBlaze built our enterprise Web & Mobile SaaS platform with AI chatbot automation ahead of schedule. Their attention to Synex design aesthetics and technical SEO is unmatched.”
          </blockquote>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--logo-royal-blue)' }}>Dianne Russell</div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>VP of Product | Enterprise SaaS Solutions</div>
        </div>
      </section>

      {/* Latest SEO Blogs Teaser */}
      <section className="section-padding">
        <div className="container">
          <div className="header-meta text-center">
            <div className="badge-pill">Knowledge Base</div>
            <h2 className="section-title">Latest Insights & SEO Guides</h2>
            <p className="section-desc">Stay updated with software development, AI breakthroughs, and search growth strategies.</p>
          </div>

          <div className="grid-3">
            {BLOG_POSTS.map((post) => (
              <div key={post.slug} className="feature-card">
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--logo-electric-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {post.category} • {post.readTime}
                </div>
                <h3 className="feature-title" style={{ fontSize: '20px', marginBottom: '12px' }}>{post.title}</h3>
                <p className="feature-desc" style={{ marginBottom: '20px' }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="btn btn-secondary" style={{ marginTop: 'auto', fontSize: '13px' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div className="header-meta text-center">
            <div className="badge-pill">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Got questions about working with LogicBlaze? We have clear answers.</p>
          </div>

          <FaqAccordion items={FAQS_LIST} />
        </div>
      </section>
    </>
  );
}
