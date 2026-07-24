export interface SEOSettings {
  siteTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  gtagId: string; // Google Analytics Measurement ID e.g. G-X89234KJS
  metaPixelId: string; // Meta/FB Pixel ID e.g. 9823471092837
  googleSearchConsoleVerified: boolean;
  sitemapEnabled: boolean;
  robotsTxtCustom: string;
}

export const DEFAULT_SEO_SETTINGS: SEOSettings = {
  siteTitle: 'LogicBlaze | Top Software Engineering & AI Agency in Pakistan, USA & Europe',
  defaultMetaDescription: 'LogicBlaze is a global software transformation agency engineering high-throughput mobile apps, enterprise AI models, Next.js web systems, and Web3 protocols.',
  defaultOgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  gtagId: 'G-LOGICBLAZE',
  metaPixelId: '9876543210123',
  googleSearchConsoleVerified: true,
  sitemapEnabled: true,
  robotsTxtCustom: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://logicblaze.co/sitemap.xml'
};

// Site Kit Analytics Metrics Simulation
export const SITE_KIT_ANALYTICS = {
  overview: {
    totalVisitors: '148,290',
    totalVisitorsChange: '+24.5%',
    searchImpressions: '1.42M',
    searchImpressionsChange: '+18.2%',
    averageCtr: '4.8%',
    averageCtrChange: '+0.6%',
    averagePosition: '8.2',
    averagePositionChange: '-1.4 (Improved)'
  },
  trafficSources: [
    { source: 'Organic Search (Google)', percentage: 58, visitors: '86,008' },
    { source: 'Direct', percentage: 22, visitors: '32,623' },
    { source: 'Social (LinkedIn/Twitter)', percentage: 12, visitors: '17,794' },
    { source: 'Referrals & News', percentage: 8, visitors: '11,865' }
  ],
  searchQueries: [
    { query: 'mobile app development agency', clicks: 12400, impressions: 185000, position: 2.1 },
    { query: 'custom AI agent engineering', clicks: 9200, impressions: 142000, position: 1.8 },
    { query: 'nextjs enterprise web development', clicks: 8100, impressions: 110000, position: 3.4 },
    { query: 'web3 smart contract audit cost', clicks: 5400, impressions: 89000, position: 2.7 }
  ]
};
