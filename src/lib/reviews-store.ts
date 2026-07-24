export interface Review {
  id: string;
  author: string;
  role: string;
  quote: string;
  image: string;
  rating?: number;
  featured?: boolean;
}

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    quote: "LogicBlaze delivered our mobile banking app 3 weeks ahead of schedule. Their technical architecture handled over 100k peak concurrent users on day one without a single hitch.",
    author: "Sarah Jenkins",
    role: "CTO at FinScale Inc.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true
  },
  {
    id: '2',
    quote: "The custom AI agent infrastructure built by LogicBlaze automated 65% of our manual customer diagnostics. Their engineering team is top 1% globally.",
    author: "Marcus Vance",
    role: "VP of Product, NeuroTech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true
  },
  {
    id: '3',
    quote: "From smart contract audits to the web frontend, LogicBlaze's Web3 team executed flawlessly. Highly recommended for complex high-throughput systems.",
    author: "Elena Rostova",
    role: "Head of Ecosystem, Aether Protocol",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    featured: true
  }
];

const REVIEWS_STORAGE_KEY = 'logicblaze_client_reviews';

export function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_REVIEWS;
  }
}

export function saveStoredReviews(reviews: Review[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}
