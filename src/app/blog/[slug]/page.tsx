import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
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
      <header className="sticky top-0 z-50 bg-[#081b33]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-[#3B82F6] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#3B82F6]" />
            Back to Journal
          </Link>

          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
              <Sparkles className="w-5 h-5 text-black font-extrabold" />
            </div>
            <span className="text-xl font-black text-white">CUBIX<span className="text-[#3B82F6]">.BLOG</span></span>
          </Link>

          <Link href="/admin" className="text-xs font-bold text-gray-400 hover:text-[#3B82F6]">
            Admin Portal
          </Link>
        </div>
      </header>

      {/* ARTICLE ARTICLE CONTENT */}
      <article className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-10">
        {/* Category & Tags */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-bold uppercase">
              {post.category}
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {post.publishedAt}
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border border-[#3B82F6]" />
            <div>
              <span className="text-sm font-bold text-white block">{post.author.name}</span>
              <span className="text-xs text-gray-400">{post.author.role}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 h-[450px] bg-black">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Body HTML Content */}
        <div
          className="prose prose-invert prose-indigo max-w-none text-gray-300 text-base leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
      </article>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-10 text-center text-xs text-gray-500">
        © 2026 CUBIX.LAB. All rights reserved.
      </footer>
    </div>
  );
}
