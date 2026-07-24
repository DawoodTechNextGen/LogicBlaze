export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  publishedAt: string;
  readTime: string;
  status: 'published' | 'draft';
  views: number;

  // WordPress-grade SEO Suite Fields
  seo: {
    seoTitle: string;
    metaDescription: string;
    focusKeywords: string[];
    canonicalUrl: string;
    ogImage: string;
    noIndex: boolean;
  };
}

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'How Artificial Intelligence is Reshaping Mobile App Development in 2026',
    slug: 'ai-reshaping-mobile-app-development-2026',
    excerpt: 'Explore how generative AI neural models and automated code agents are accelerating iOS and Android development lifecycles by 3x.',
    content: `
      <h2>The Shift Towards Autonomous Mobile Intelligence</h2>
      <p>The mobile application landscape is undergoing its most profound transformation since the introduction of the App Store. Artificial intelligence is no longer just a feature—it is the foundational layer upon which modern mobile software is built.</p>

      <h3>1. On-Device LLMs and Neural Processing Units</h3>
      <p>With modern smartphones featuring dedicated Neural Processing Units (NPUs), complex Machine Learning inference happens directly on-device. This ensures zero latency, offline usability, and maximum user privacy.</p>

      <pre><code>// Example: On-Device Model Initialization
const aiEngine = await LocalNeuralEngine.load({
  model: 'mobile-llm-v4',
  precision: 'int8'
});</code></pre>

      <h3>2. Predictive UX and Autonomous UI Adapters</h3>
      <p>Instead of static navigation menus, next-generation applications dynamically adjust layout elements based on user context, time of day, and predicted workflows.</p>
    `,
    category: 'AI & Machine Learning',
    tags: ['AI', 'Mobile Development', 'Swift', 'Kotlin', 'Tech Trends'],
    author: {
      name: 'Dr. Sarah Lin',
      role: 'Chief AI Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    publishedAt: '2026-07-20',
    readTime: '5 min read',
    status: 'published',
    views: 14200,
    seo: {
      seoTitle: 'AI in Mobile App Development 2026: The Complete Engineering Guide',
      metaDescription: 'Discover how generative AI neural models and on-device LLMs are reshaping iOS and Android mobile app development in 2026.',
      focusKeywords: ['AI mobile apps', 'mobile app development 2026', 'on-device LLM'],
      canonicalUrl: 'https://cubix.lab/blog/ai-reshaping-mobile-app-development-2026',
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      noIndex: false
    }
  },
  {
    id: '2',
    title: 'Architecting High-Throughput Microservices with Next.js 14 and Docker',
    slug: 'architecting-high-throughput-microservices-nextjs-docker',
    excerpt: 'A deep dive into distributed serverless caching, edge middleware, and Docker container orchestration for sub-100ms enterprise performance.',
    content: `
      <h2>Building for Uncompromising Speed & Reliability</h2>
      <p>Enterprise applications demand sub-100ms response times globally. Combining Next.js 14 Server Components with containerized Docker microservices yields unmatched scalability.</p>

      <h3>Key Architecture Components</h3>
      <ul>
        <li>Distributed Redis Caching at the Edge</li>
        <li>Standalone Next.js Docker Containers</li>
        <li>Automated Horizontal Pod Autoscaling (HPA) in Kubernetes</li>
      </ul>
    `,
    category: 'Enterprise Web',
    tags: ['Next.js', 'Docker', 'Microservices', 'DevOps', 'Cloud'],
    author: {
      name: 'Alex Vance',
      role: 'Principal Cloud Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    publishedAt: '2026-07-15',
    readTime: '8 min read',
    status: 'published',
    views: 9800,
    seo: {
      seoTitle: 'Next.js 14 & Docker Microservices Architecture Guide',
      metaDescription: 'Learn how to architect ultra-fast, scalable web microservices using Next.js 14, Docker, and Redis edge caching.',
      focusKeywords: ['Next.js microservices', 'Docker Nextjs', 'enterprise web architecture'],
      canonicalUrl: 'https://cubix.lab/blog/architecting-high-throughput-microservices-nextjs-docker',
      ogImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
      noIndex: false
    }
  },
  {
    id: '3',
    title: 'Formally Verified Smart Contracts: Preventing Multi-Million Dollar Web3 Hacks',
    slug: 'formally-verified-smart-contracts-web3-security',
    excerpt: 'Mathematical proof techniques for Solidity and Rust smart contracts to eliminate zero-day vulnerabilities in decentralized finance protocols.',
    content: `
      <h2>Zero-Tolerance Security for Decentralized Asset Protocols</h2>
      <p>With billions of dollars locked in Web3 smart contracts, traditional unit testing is insufficient. Formal verification proves mathematically that a smart contract obeys specified invariants under all possible execution paths.</p>
    `,
    category: 'Web3 & Crypto',
    tags: ['Web3', 'Solidity', 'Smart Contracts', 'Security', 'Blockchain'],
    author: {
      name: 'Elena Rostova',
      role: 'Lead Web3 Auditor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
    publishedAt: '2026-07-10',
    readTime: '6 min read',
    status: 'published',
    views: 11400,
    seo: {
      seoTitle: 'Formally Verified Smart Contracts: Complete Web3 Security Guide',
      metaDescription: 'Discover formal mathematical verification methods for Solidity smart contracts to protect DeFi protocols from security breaches.',
      focusKeywords: ['smart contract audit', 'Solidity security', 'formal verification Web3'],
      canonicalUrl: 'https://cubix.lab/blog/formally-verified-smart-contracts-web3-security',
      ogImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80',
      noIndex: false
    }
  }
];

export const CATEGORIES = [
  'AI & Machine Learning',
  'Mobile Engineering',
  'Enterprise Web',
  'Web3 & Crypto',
  'Game Studio',
  'DevOps & Cloud'
];
