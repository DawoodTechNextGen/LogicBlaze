import Link from 'next/link';
import { BLOG_POSTS } from '../../lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Tech Insights, AI & SEO Growth Guides',
  description: 'Read the latest technical articles on Next.js software architecture, OpenAI LLM chatbot integration, and On-Page SEO strategies by LogicBlaze.'
};

export default function BlogDirectoryPage(): JSX.Element {
  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            LogicBlaze Blog & Insights
          </div>
          <h1 className="hero-title">Software Development, AI & Growth Engineering</h1>
          <p className="hero-subtitle">
            Expert insights, architectural best practices, and search optimization guides written by our engineering team.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {BLOG_POSTS.map((post) => (
              <div key={post.slug} className="feature-card" style={{ padding: '36px' }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--logo-electric-cyan)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {post.category} • {post.readTime}
                </div>
                <h2 className="feature-title" style={{ fontSize: '22px', marginBottom: '12px' }}>{post.title}</h2>
                <p className="feature-desc" style={{ marginBottom: '20px' }}>{post.excerpt}</p>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  By <strong>{post.author}</strong> on {post.date}
                </div>
                <Link href={`/blog/${post.slug}`} className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                  Read Full Article →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
