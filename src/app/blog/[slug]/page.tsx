import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Clock,
  Tag,
  Share2,
  CheckCircle2,
  Calendar,
  User,
  Globe2,
  Eye
} from 'lucide-react';
import { INITIAL_BLOGS, BlogPost } from '@/lib/blog-store';
import { DEFAULT_SEO_SETTINGS } from '@/lib/seo-store';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Next.js Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = INITIAL_BLOGS.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Cubix Lab',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: post.seo.seoTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.focusKeywords.join(', '),
    alternates: {
      canonical: post.seo.canonicalUrl || `https://cubix.lab/blog/${post.slug}`
    },
    openGraph: {
      title: post.seo.seoTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      url: `https://cubix.lab/blog/${post.slug}`,
      siteName: 'Cubix Lab',
      images: [
        {
          url: post.seo.ogImage || post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      type: 'article',
      publishedTime: post.publishedAt
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.seoTitle || post.title,
      description: post.seo.metaDescription || post.excerpt,
      images: [post.seo.ogImage || post.featuredImage]
    },
    robots: {
      index: !post.seo.noIndex,
      follow: !post.seo.noIndex
    }
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = INITIAL_BLOGS.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cubix Lab',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cubix.lab/logo.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#081b33] text-white selection:bg-[#3B82F6] selection:text-black font-sans relative overflow-x-hidden">
      {/* Dynamic Injection of G-Tag (Google Analytics) */}
      {DEFAULT_SEO_SETTINGS.gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${DEFAULT_SEO_SETTINGS.gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${DEFAULT_SEO_SETTINGS.gtagId}');
            `}
          </Script>
        </>
      )}

      {/* Dynamic Injection of Meta (Facebook) Pixel */}
      {DEFAULT_SEO_SETTINGS.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${DEFAULT_SEO_SETTINGS.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Background Glow */}
      <div className="glow-ambient top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#3B82F6]/15 animate-pulse-glow" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#0a0b0e]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo-transparent.png" alt="LogicBlaze Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black tracking-tight text-white">
              Logic<span className="text-[#3B82F6]">Blaze</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <Link href="/#services" className="hover:text-[#3B82F6] transition-colors">Capabilities</Link>
            <Link href="/#work" className="hover:text-[#3B82F6] transition-colors">Case Studies</Link>
            <Link href="/#process" className="hover:text-[#3B82F6] transition-colors">Process</Link>
            <Link href="/#testimonials" className="hover:text-[#3B82F6] transition-colors">Reviews</Link>
            <Link href="/#tech" className="hover:text-[#3B82F6] transition-colors">Tech Stack</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="btn-glass px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#3B82F6]" />
              Cost Estimator
            </Link>
            <Link
              href="/"
              className="btn-neon px-6 py-2.5 text-xs md:text-sm flex items-center gap-2 cursor-pointer"
            >
              Start Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative pt-12 pb-8 max-w-4xl mx-auto px-6 z-10">
        <div className="flex items-center gap-3 text-xs font-bold text-[#3B82F6] uppercase tracking-wider mb-6">
          <span>{post.category}</span>
          <span>•</span>
          <span className="text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {post.excerpt}
        </p>

        {/* Author Metadata Card */}
        <div className="flex items-center justify-between border-y border-white/10 py-4 mb-10">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-[#3B82F6]/40" />
            <div>
              <div className="text-sm font-bold text-white">{post.author.name}</div>
              <div className="text-xs text-gray-400">{post.author.role}</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {post.publishedAt}
          </div>
        </div>
      </section>

      {/* Main Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={post.featuredImage} alt={post.title} className="w-full h-[400px] object-cover" />
        </div>
      </div>

      {/* Content Article Body */}
      <main className="max-w-3xl mx-auto px-6 pb-20 prose prose-invert prose-blue max-w-none text-gray-300 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {/* SEO Focus Keywords Tags */}
        <div className="pt-8 border-t border-white/10 space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-gray-400 block">Focus Keywords & Tags</span>
          <div className="flex flex-wrap gap-2">
            {post.seo.focusKeywords.map((kw, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#3B82F6]/30 blur-sm rounded-full" />
                <img src="/logo-transparent.png" alt="LogicBlaze Logo" className="w-8 h-8 object-contain relative z-10" />
              </div>
              <span className="text-xl font-black text-white">Logic<span className="text-[#3B82F6]">Blaze</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              LogicBlaze is a global software transformation agency engineering high-scale mobile applications, enterprise AI models, and cloud systems.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Capabilities</div>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Mobile Engineering</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">AI & Machine Learning</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Enterprise Web</Link></li>
              <li><Link href="/#services" className="hover:text-[#3B82F6]">Web3 Protocols</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</div>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/#work" className="hover:text-[#3B82F6]">Case Studies</Link></li>
              <li><Link href="/#process" className="hover:text-[#3B82F6]">Process</Link></li>
              <li><Link href="/#testimonials" className="hover:text-[#3B82F6]">Client Reviews</Link></li>
              <li><Link href="/blog" className="text-[#3B82F6] hover:underline font-semibold flex items-center gap-1">Insights & Blog</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Global Hubs</div>
            <ul className="space-y-2.5 text-xs text-gray-500">
              <li>San Francisco, CA</li>
              <li>London, UK</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 gap-4">
          <div>© 2026 LOGICBLAZE. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Security SLA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
