import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '../../../lib/data';
import { getBlogSchema } from '../../../lib/seo-schemas';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | LogicBlaze Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author]
    }
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: BlogPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const blogSchema = getBlogSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <section className="hero" style={{ padding: '80px 0 40px 0' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <div className="badge-pill">
            <span className="badge-dot"></span>
            {post.category}
          </div>
          <h1 className="hero-title" style={{ fontSize: '42px' }}>{post.title}</h1>
          <div style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            By <strong>{post.author}</strong> • {post.date} • {post.readTime}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            boxShadow: 'var(--shadow-md)',
            fontSize: '17px',
            lineHeight: '1.8',
            color: 'var(--text-body)'
          }}>
            <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--logo-royal-blue)', marginBottom: '24px', fontStyle: 'italic' }}>
              "{post.excerpt}"
            </div>
            
            <div style={{ whiteSpace: 'pre-line' }}>
              {post.content}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/blog" className="btn btn-secondary">
                ← Back to All Articles
              </Link>
              <Link href="/calculator" className="btn btn-primary">
                Discuss Your Project →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
