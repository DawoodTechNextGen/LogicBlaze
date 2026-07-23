export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LogicBlaze",
    "url": "https://logicblaze.com",
    "logo": "https://logicblaze.com/logo.png",
    "description": "LogicBlaze is a premier Software Development, AI Solutions & Digital Marketing agency specializing in Web, Mobile, Desktop Apps, AI Chatbots, and Technical SEO.",
    "telephone": "+1-800-555-0123",
    "email": "hello@logicblaze.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "374 William S Canning Blvd",
      "addressLocality": "Fall River",
      "addressRegion": "MA",
      "postalCode": "02721",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/logicblaze",
      "https://linkedin.com/company/logicblaze",
      "https://github.com/logicblaze"
    ]
  };
}

export function getServiceSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "provider": {
      "@type": "Organization",
      "name": "LogicBlaze",
      "url": "https://logicblaze.com"
    },
    "description": description,
    "url": url,
    "serviceType": "Software Development & AI Services"
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question.replace(/^\d+\.\s*/, ''),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getBlogSchema(post: { title: string; excerpt: string; date: string; author: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "LogicBlaze"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://logicblaze.com/blog/${post.slug}`
    }
  };
}
