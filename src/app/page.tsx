'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Smartphone,
  Gamepad2,
  CheckCircle2,
  ChevronRight,
  Calculator,
  X,
  Star,
  Zap,
  Layers,
  Terminal,
  Activity,
  Send,
  ExternalLink
} from 'lucide-react';

import {
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiReact,
  SiGraphql,
  SiFirebase,
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiNextdotjs,
  SiNodedotjs,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiSolidity,
  SiRust,
  SiIpfs,
  SiChainlink,
  SiUnrealengine,
  SiUnity,
  SiCplusplus
} from 'react-icons/si';

// Custom Official OpenAI SVG Brand Icon Component
const OpenAIBrandIcon = ({ className = "w-6 h-6", style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7944.7944 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.47 4.47 0 0 1-.5355-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L8.74 19.9515a4.4992 4.4992 0 0 1-5.1408-1.6477zm-1.258-10.007a4.48 4.48 0 0 1 2.3658-1.9729v5.682a.7992.7992 0 0 0 .388.6814l5.8428 3.3685-2.0248 1.1686a.0804.0804 0 0 1-.0664.0047L3.921 14.5015a4.4992 4.4992 0 0 1-1.5618-5.2047zm15.4243 4.281l-5.8428-3.3732 2.0248-1.1686a.0804.0804 0 0 1 .0664-.0047l4.832 2.7866a4.4992 4.4992 0 0 1 .645 7.156l-.142-.0852-4.783-2.7582a.7759.7759 0 0 0-.8004 0zm2.02-3.8344l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L8.497 11.0028V8.6704a.0804.0804 0 0 1 .0332-.0615l4.832-2.7866a4.4992 4.4992 0 0 1 6.6433 4.7088zM9.5786 13.8055l-2.02-1.1686a.071.071 0 0 1-.038-.052V6.9975a4.504 4.504 0 0 1 7.3709-3.4536l-.1419.0804-4.7783 2.7582a.7744.7744 0 0 0-.3927.6813v6.7417zm.972-2.8139l2.7487-1.587 2.7488 1.587v3.174l-2.7488 1.587-2.7487-1.587z" />
  </svg>
);

// Custom Official AWS Brand SVG Icon Component
const AWSBrandIcon = ({ className = "w-6 h-6", style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M6.763 10.035c0 .36-.027.643-.082.848a1.64 1.64 0 0 1-.295.63.856.856 0 0 1-.505.313c-.206.04-.456.06-.75.06H4.254v-3.7h.881c.294 0 .544.02.75.06.206.04.375.144.505.313.13.17.228.38.295.63.055.205.082.488.082.848zm-1.628 3.535h-.88v-1.637h.88c.28 0 .506.023.68.07.173.046.307.127.4.242.093.115.14.267.14.455 0 .193-.047.348-.14.465-.093.117-.227.198-.4.243-.174.045-.4.062-.68.062zm4.72-3.535c0 .36-.027.643-.082.848a1.64 1.64 0 0 1-.295.63.856.856 0 0 1-.505.313c-.206.04-.456.06-.75.06h-.877v-3.7h.88c.294 0 .544.02.75.06.206.04.375.144.505.313.13.17.228.38.295.63.055.205.082.488.082.848zm-1.628 3.535h-.88v-1.637h.88c.28 0 .506.023.68.07.173.046.307.127.4.242.093.115.14.267.14.455 0 .193-.047.348-.14.465-.093.117-.227.198-.4.243-.174.045-.4.062-.68.062zm10.748-4.992c-.134.054-.3.08-.498.08h-1.258v7.05h-1.628v-7.05h-1.258c-.198 0-.364-.026-.498-.08a.508.508 0 0 1-.24-.225.753.753 0 0 1-.087-.375c0-.14.029-.265.087-.375a.508.508 0 0 1 .24-.225c.134-.054.3-.08.498-.08h3.76c.198 0 .364.026.498.08a.508.508 0 0 1 .24.225.753.753 0 0 1 .087.375c0 .14-.029.265-.087.375a.508.508 0 0 1-.24.225zm2.847 9.873c-2.316 1.71-5.674 2.613-9.522 2.613-5.367 0-9.606-1.748-12.87-4.475-.255-.213-.058-.507.245-.34 3.42 1.884 7.57 3.02 12.625 3.02 3.393 0 6.643-.654 9.533-1.928.435-.192.8.27.087.71a.006.006 0 0 1-.098.399z" />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);

  // Estimator State
  const [platform, setPlatform] = useState('mobile');
  const [features, setFeatures] = useState<string[]>(['auth', 'payments']);
  const [timeline, setTimeline] = useState('standard');

  const toggleFeature = (id: string) => {
    if (features.includes(id)) {
      setFeatures(features.filter((f) => f !== id));
    } else {
      setFeatures([...features, id]);
    }
  };

  const calculateEstimate = () => {
    let base = platform === 'mobile' ? 15000 : platform === 'ai' ? 25000 : platform === 'web3' ? 20000 : 12000;
    base += features.length * 3500;
    if (timeline === 'fast') base *= 1.25;
    return Math.round(base);
  };

  // Official Tech Stack with Real Official Brand Logos & Colors
  const servicesData = {
    mobile: {
      title: 'Next-Gen Mobile App Engineering',
      subtitle: 'Native iOS, Android & Cross-Platform Apps',
      desc: 'We build high-performance mobile apps used by millions worldwide with native performance, offline sync, biometric security, and 120fps animations.',
      features: [
        'Swift & Kotlin Native Architecture',
        'Flutter & React Native Cross-Platform',
        'Biometric Auth & Hardware Acceleration',
        'Low-Latency Real-Time Data Sync'
      ],
      metrics: '120+ Million Total App Downloads',
      techLogos: [
        { name: 'Swift / iOS', type: 'Native iOS', Icon: SiSwift, brandColor: '#F05138' },
        { name: 'Kotlin', type: 'Native Android', Icon: SiKotlin, brandColor: '#7F52FF' },
        { name: 'Flutter', type: 'Cross-Platform', Icon: SiFlutter, brandColor: '#02569B' },
        { name: 'React Native', type: 'Cross-Platform', Icon: SiReact, brandColor: '#61DAFB' },
        { name: 'GraphQL', type: 'API Layer', Icon: SiGraphql, brandColor: '#E10098' },
        { name: 'Firebase', type: 'Backend Cloud', Icon: SiFirebase, brandColor: '#FFCA28' }
      ]
    },
    ai: {
      title: 'Artificial Intelligence & Neural Models',
      subtitle: 'Custom LLMs, Generative AI & Autonomous Agents',
      desc: 'Transform enterprise data into competitive intelligence. We build custom neural networks, fine-tuned LLM pipelines, and computer vision systems.',
      features: [
        'Custom Fine-Tuned LLM Pipelines',
        'Computer Vision & Object Detection',
        'Predictive Analytics & Recommendation Engines',
        'RAG (Retrieval-Augmented Generation) Architecture'
      ],
      metrics: '99.4% Model Inference Precision',
      techLogos: [
        { name: 'Python', type: 'Core AI Engine', Icon: SiPython, brandColor: '#3776AB' },
        { name: 'PyTorch', type: 'Deep Learning', Icon: SiPytorch, brandColor: '#EE4C2C' },
        { name: 'TensorFlow', type: 'Neural Nets', Icon: SiTensorflow, brandColor: '#FF6F00' },
        { name: 'OpenAI API', type: 'LLM Agents', Icon: OpenAIBrandIcon, brandColor: '#10A37F' },
        { name: 'Node.js AI', type: 'Async Pipeline', Icon: SiNodedotjs, brandColor: '#5FA04E' },
        { name: 'Next.js AI', type: 'Streaming UI', Icon: SiNextdotjs, brandColor: '#FFFFFF' }
      ]
    },
    web: {
      title: 'Scalable Enterprise Web Systems',
      subtitle: 'Microservices, Jamstack & Cloud Edge',
      desc: 'High-throughput web systems engineered to handle millions of concurrent requests per second with sub-100ms response times.',
      features: [
        'Next.js 14 & React Server Components',
        'Distributed Microservices & Serverless',
        'Automated CI/CD & Infrastructure as Code',
        'Zero-Downtime Global Edge Deployment'
      ],
      metrics: '99.999% Guaranteed Uptime SLA',
      techLogos: [
        { name: 'Next.js', type: 'Web Framework', Icon: SiNextdotjs, brandColor: '#FFFFFF' },
        { name: 'React', type: 'UI Library', Icon: SiReact, brandColor: '#61DAFB' },
        { name: 'Node.js', type: 'Backend Runtime', Icon: SiNodedotjs, brandColor: '#5FA04E' },
        { name: 'Go (Golang)', type: 'High Concurrency', Icon: SiGo, brandColor: '#00ADD8' },
        { name: 'Docker', type: 'Containerization', Icon: SiDocker, brandColor: '#2496ED' },
        { name: 'Kubernetes', type: 'Orchestration', Icon: SiKubernetes, brandColor: '#326CE5' },
        { name: 'AWS Cloud', type: 'Cloud Infra', Icon: AWSBrandIcon, brandColor: '#FF9900' }
      ]
    },
    blockchain: {
      title: 'Web3 & Decentralized Ecosystems',
      subtitle: 'Smart Contracts, DeFi Protocols & Tokenomics',
      desc: 'Formally verified smart contracts and high-speed decentralized exchanges backed by zero-knowledge security and cross-chain bridges.',
      features: [
        'Formal Verification Smart Contracts',
        'Zero-Knowledge Proof (ZKP) Security',
        'Cross-Chain Interoperability Protocols',
        'DeFi & NFT Marketplace Engine'
      ],
      metrics: '$2.4B+ Total Value Locked Secured',
      techLogos: [
        { name: 'Solidity', type: 'Smart Contracts', Icon: SiSolidity, brandColor: '#888888' },
        { name: 'Rust', type: 'High-Perf Chain', Icon: SiRust, brandColor: '#CE412B' },
        { name: 'IPFS', type: 'Storage Network', Icon: SiIpfs, brandColor: '#65C2CB' },
        { name: 'Chainlink', type: 'Oracles Network', Icon: SiChainlink, brandColor: '#375BD2' },
        { name: 'React Web3', type: 'DApp Frontend', Icon: SiReact, brandColor: '#61DAFB' },
        { name: 'Node.js', type: 'Indexer Layer', Icon: SiNodedotjs, brandColor: '#5FA04E' }
      ]
    },
    game: {
      title: 'Immersive Game Studio & Metaverse',
      subtitle: 'Unreal Engine 5, Unity & AAA Graphics',
      desc: 'Cross-platform interactive gaming experiences with photorealistic Lumen raytracing, physics-based simulations, and global multiplayer server mesh.',
      features: [
        'Unreal Engine 5 Nanite & Lumen Lighting',
        'Unity High-Definition Render Pipeline',
        'Low-Latency Spatial Multiplayer Server',
        'VR/AR Immersive Simulation'
      ],
      metrics: '45M+ Hours Played Globally',
      techLogos: [
        { name: 'Unreal Engine', type: 'AAA Graphics', Icon: SiUnrealengine, brandColor: '#FFFFFF' },
        { name: 'Unity 3D', type: 'Cross-Platform', Icon: SiUnity, brandColor: '#FFFFFF' },
        { name: 'C++', type: 'Game Engine Core', Icon: SiCplusplus, brandColor: '#00599C' },
        { name: 'Python Tooling', type: 'Pipeline Automation', Icon: SiPython, brandColor: '#3776AB' },
        { name: 'AWS Gamelift', type: 'Multiplayer Cloud', Icon: AWSBrandIcon, brandColor: '#FF9900' },
        { name: 'Node.js Net', type: 'Matchmaking API', Icon: SiNodedotjs, brandColor: '#5FA04E' }
      ]
    }
  };

  const caseStudies = [
    {
      id: 'fintech-x',
      category: 'FinTech & AI',
      title: 'NeoBank AI - Global Banking & Wealth Platform',
      metrics: '$1.8B Transacted',
      imageBg: 'from-blue-900/40 to-black',
      tag: 'FinTech',
      rating: '4.9/5',
      desc: 'Built an AI-driven smart banking ecosystem serving 2M+ active users with instant automated fraud detection and multi-currency instant settlements.',
      tech: ['React Native', 'Node.js', 'PyTorch', 'AWS']
    },
    {
      id: 'health-core',
      category: 'Healthcare',
      title: 'PulseCare - Real-Time Patient Diagnostic Telemedicine',
      metrics: '99.8% Accuracy',
      imageBg: 'from-cyan-900/40 to-black',
      tag: 'Healthcare',
      rating: '5.0/5',
      desc: 'HIPAA-compliant remote diagnostic portal connecting patients with top specialists via low-latency encrypted video streams and AI vitals analysis.',
      tech: ['Next.js', 'WebRTC', 'Python', 'Docker']
    },
    {
      id: 'trade-flow',
      category: 'Web3 / Crypto',
      title: 'Aura DEX - High-Speed Decentralized Trading Desk',
      metrics: '<50ms Latency',
      imageBg: 'from-purple-900/40 to-black',
      tag: 'Web3',
      rating: '4.9/5',
      desc: 'Decentralized exchange protocol executing institutional-grade orders with automated liquidity routing and zero front-running protection.',
      tech: ['Solidity', 'Rust', 'Ethers.js', 'TailwindCSS']
    },
    {
      id: 'logix-ai',
      category: 'AI & Enterprise',
      title: 'FleetMind - Autonomous Supply Chain & Logistics Engine',
      metrics: '+42% Efficiency',
      imageBg: 'from-purple-900/40 to-black',
      tag: 'AI Enterprise',
      rating: '4.8/5',
      desc: 'Autonomous AI dispatch and route optimization algorithm reducing fuel emissions and delivery times for 15,000 global freight vehicles.',
      tech: ['Python', 'TensorFlow', 'Go', 'Kubernetes']
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter((c) => c.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#081b33] text-white selection:bg-[#3B82F6] selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="glow-ambient top-[-10%] left-[20%] w-[600px] h-[600px] bg-[#3B82F6]/15 animate-pulse-glow" />
      <div className="glow-ambient top-[35%] right-[-10%] w-[700px] h-[700px] bg-[#A855F7]/10 animate-pulse-glow" />
      <div className="glow-ambient bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#3B82F6]/10" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#081b33]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-black font-extrabold" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              CUBIX<span className="text-[#3B82F6]">.LAB</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            <a href="#services" className="hover:text-[#3B82F6] transition-colors">Capabilities</a>
            <a href="#work" className="hover:text-[#3B82F6] transition-colors">Case Studies</a>
            <a href="#process" className="hover:text-[#3B82F6] transition-colors">Process</a>
            <a href="#testimonials" className="hover:text-[#3B82F6] transition-colors">Reviews</a>
            <a href="#tech" className="hover:text-[#3B82F6] transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-glass px-5 py-2.5 text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#3B82F6]" />
              Cost Estimator
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-neon px-6 py-2.5 text-xs md:text-sm flex items-center gap-2 cursor-pointer"
            >
              Start Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 max-w-7xl mx-auto px-6 z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#3B82F6]/40 text-[#3B82F6] text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner animate-float">
          <Zap className="w-4 h-4 fill-[#3B82F6] animate-pulse" />
          <span>#1 Digital Transformation & Product Studio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-5xl mb-8">
          We Build Software That <br className="hidden sm:inline" />
          <span className="text-gradient-neon">Defines Future Industries.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl font-medium leading-relaxed mb-12">
          From custom AI neural models to multi-million user mobile apps and enterprise cloud systems, we engineer software that turns ambitious ideas into category leaders.
        </p>

        <div className="flex flex-wrap items-center gap-5 mb-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-neon px-8 py-4 text-base font-bold flex items-center gap-3 cursor-pointer"
          >
            Launch Your Product
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#work"
            className="btn-glass px-8 py-4 text-base font-bold flex items-center gap-3 cursor-pointer"
          >
            Explore Case Studies
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </a>
        </div>

        {/* Hero Interactive Stat Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-glass border border-white/10 shadow-2xl">
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#3B82F6]">1,200+</div>
            <div className="text-xs md:text-sm font-medium text-gray-400 mt-1">Products Shipped</div>
          </div>
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-3xl md:text-4xl font-extrabold text-white">99.2%</div>
            <div className="text-xs md:text-sm font-medium text-gray-400 mt-1">Client Retention</div>
          </div>
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#3B82F6]">$500M+</div>
            <div className="text-xs md:text-sm font-medium text-gray-400 mt-1">Client Capital Raised</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-extrabold text-white">18+</div>
            <div className="text-xs md:text-sm font-medium text-gray-400 mt-1">Global Tech Awards</div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE TICKER WITH OFFICIAL BRAND SVGS */}
      <section className="py-10 bg-black/50 border-y border-white/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">POWERING INDUSTRY LEADERS & INNOVATORS WORLDWIDE</span>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex items-center gap-16 font-mono text-xl font-bold text-gray-500">
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiReact className="text-[#61DAFB]" /> REACT NEXT.JS</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><AWSBrandIcon className="text-[#FF9900]" /> AWS CLOUD</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiTensorflow className="text-[#FF6F00]" /> TENSORFLOW AI</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiFlutter className="text-[#02569B]" /> FLUTTER MOBILE</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiKubernetes className="text-[#326CE5]" /> KUBERNETES</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><OpenAIBrandIcon className="text-[#10A37F]" /> OPENAI ENTERPRISE</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiDocker className="text-[#2496ED]" /> DOCKER DEPLOY</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiSolidity className="text-gray-300" /> SOLIDITY WEB3</span>
            {/* Duplicated for smooth endless loop */}
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiReact className="text-[#61DAFB]" /> REACT NEXT.JS</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><AWSBrandIcon className="text-[#FF9900]" /> AWS CLOUD</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiTensorflow className="text-[#FF6F00]" /> TENSORFLOW AI</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiFlutter className="text-[#02569B]" /> FLUTTER MOBILE</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiKubernetes className="text-[#326CE5]" /> KUBERNETES</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><OpenAIBrandIcon className="text-[#10A37F]" /> OPENAI ENTERPRISE</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiDocker className="text-[#2496ED]" /> DOCKER DEPLOY</span>
            <span className="hover:text-[#3B82F6] transition-colors flex items-center gap-2.5"><SiSolidity className="text-gray-300" /> SOLIDITY WEB3</span>
          </div>
        </div>
      </section>

      {/* OUR CORE CAPABILITIES & REAL OFFICIAL TECH STACK LOGOS */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">OUR CORE CAPABILITIES</div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Full-Spectrum Engineering Solutions
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-4">
            Select a capability domain to explore our specialized technology stack featuring official framework engines.
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="flex overflow-x-auto gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 mb-12 max-w-4xl mx-auto scrollbar-none shadow-xl">
          {[
            { id: 'mobile', label: 'Mobile Engineering', icon: Smartphone },
            { id: 'ai', label: 'AI & Machine Learning', icon: Cpu },
            { id: 'web', label: 'Enterprise Web', icon: Code2 },
            { id: 'blockchain', label: 'Web3 & Crypto', icon: Layers },
            { id: 'game', label: 'Game Studio', icon: Gamepad2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#3B82F6] text-black shadow-lg shadow-[#3B82F6]/30 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${active ? 'text-black' : 'text-[#3B82F6]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content Display with Official Tech SVGs */}
        {(() => {
          const current = servicesData[activeTab as keyof typeof servicesData];
          return (
            <div key={activeTab} className="animate-fade-in-up grid md:grid-cols-12 gap-8 items-stretch bg-glass-card p-8 md:p-12 rounded-3xl border border-white/10">
              <div className="md:col-span-7 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-xs font-bold mb-4">
                    {current.subtitle}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                    {current.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 py-2">
                  {current.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-gray-200">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-bold block">Production SLA Metric</span>
                    <span className="text-lg font-extrabold text-[#3B82F6]">{current.metrics}</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-neon px-7 py-3 text-sm flex items-center gap-2 cursor-pointer"
                  >
                    Build {activeTab.toUpperCase()} Product
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Official Technology SVG Icons Grid */}
              <div id="tech" className="md:col-span-5 bg-black/85 rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#3B82F6]" />
                      <span className="text-xs font-mono font-bold text-gray-300">OFFICIAL TECH STACK LOGOS</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded border border-[#3B82F6]/30">
                      Verified Stack
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Official frameworks & technologies used in production:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {current.techLogos.map((tech, idx) => {
                      const TechBrandIcon = tech.Icon;
                      return (
                        <div key={idx} className="tech-card group">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#3B82F6] transition-all">
                            <TechBrandIcon className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: tech.brandColor }} />
                          </div>
                          <span className="text-xs font-bold text-white group-hover:text-[#3B82F6] transition-colors mt-1">
                            {tech.name}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {tech.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-[#3B82F6]/15 to-transparent border border-[#3B82F6]/30 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6] animate-ping shrink-0" />
                  <div className="text-xs text-gray-300">
                    <span className="font-bold text-white block">Enterprise Ready & Scalable</span>
                    Official vendor certification & compliance audited.
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* FILTERABLE PORTFOLIO SHOWCASE */}
      <section id="work" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">FEATURED CASE STUDIES</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Products That Scaled To Millions
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'FinTech', 'Healthcare', 'Web3', 'AI Enterprise'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#3B82F6] text-black shadow-md shadow-[#3B82F6]/20'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedCaseStudy(project)}
              className="bg-glass-card rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#3B82F6]/50 transition-all duration-300"
            >
              <div className={`h-64 bg-gradient-to-br ${project.imageBg} p-8 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-[#3B82F6]">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full text-xs font-bold text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    {project.rating}
                  </div>
                </div>

                <div className="z-10">
                  <div className="text-xs uppercase font-mono text-gray-400 tracking-wider">Key Impact</div>
                  <div className="text-3xl font-black text-white group-hover:text-[#3B82F6] transition-colors">{project.metrics}</div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#3B82F6]/10 rounded-full blur-2xl group-hover:bg-[#3B82F6]/25 transition-all" />
              </div>

              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-extrabold text-white group-hover:text-[#3B82F6] transition-colors flex items-center justify-between">
                  {project.title}
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-[#3B82F6] transition-colors" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS ROADMAP */}
      <section id="process" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">HOW WE DELIVER EXCELLENCE</div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Our Battle-Tested Development Lifecycle
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Product Strategy', desc: 'Scope definition, architecture design & business ROI roadmap.' },
            { step: '02', title: 'UI/UX Design', desc: 'Interactive prototypes, design systems & micro-animations.' },
            { step: '03', title: 'Agile Engineering', desc: 'Bi-weekly sprint releases with continuous CI/CD automated deployments.' },
            { step: '04', title: 'QA & Security', desc: 'Automated test coverage, penetration tests & stress audits.' },
            { step: '05', title: 'Global Launch', desc: 'Cloud auto-scaling, analytics setup & 24/7 SLA maintenance.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-glass-card p-6 rounded-2xl border border-white/10 relative group hover:border-[#3B82F6]/40">
              <div className="text-4xl font-black text-[#3B82F6]/30 group-hover:text-[#3B82F6] transition-colors font-mono mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS & REVIEWS */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 border-t border-white/10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div>
            <div className="text-[#3B82F6] text-xs font-bold uppercase tracking-widest mb-3">VERIFIED CLIENT REVIEWS</div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Trusted By Founders & Tech Executives
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-white text-sm">4.9 / 5.0 Rating on Clutch & GoodFirms</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Cubix Lab delivered our mobile banking app 3 weeks ahead of schedule. Their technical architecture handled over 100k peak concurrent users on day one without a single hitch.",
              author: "Marcus Vance",
              role: "CTO @ FinTech Global",
              impact: "+340% User Growth"
            },
            {
              quote: "The custom AI agent infrastructure built by Cubix automated 65% of our manual customer diagnostics. Their engineering team is top 1% globally.",
              author: "Elena Rostova",
              role: "VP of Product @ HealthPulse",
              impact: "$1.2M Annual Savings"
            },
            {
              quote: "From smart contract audits to the web frontend, Cubix's Web3 team executed flawlessly. Highly recommended for complex high-throughput systems.",
              author: "David Chen",
              role: "Founder @ Aura Ecosystem",
              impact: "$40M TVL Secured"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
                <span className="text-xs font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded">
                  {t.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-r from-[#3B82F6]/20 via-black to-[#A855F7]/10 border border-[#3B82F6]/40 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Ready To Engineer Your Next <span className="text-[#3B82F6]">Breakthrough App?</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg">
              Get a detailed estimation, technical stack advice, and project roadmap within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-neon px-8 py-4 text-base font-bold flex items-center gap-3 cursor-pointer"
              >
                Calculate Cost & Estimate Now
                <Calculator className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-black font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">CUBIX<span className="text-[#3B82F6]">.LAB</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Cubix.Lab is a global software transformation agency engineering high-scale mobile applications, enterprise AI models, and cloud systems.
            </p>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Capabilities</div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-[#3B82F6]">Mobile Engineering</a></li>
              <li><a href="#services" className="hover:text-[#3B82F6]">AI & Machine Learning</a></li>
              <li><a href="#services" className="hover:text-[#3B82F6]">Enterprise Web</a></li>
              <li><a href="#services" className="hover:text-[#3B82F6]">Web3 Protocols</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#work" className="hover:text-[#3B82F6]">Case Studies</a></li>
              <li><a href="#process" className="hover:text-[#3B82F6]">Process</a></li>
              <li><a href="#testimonials" className="hover:text-[#3B82F6]">Client Reviews</a></li>
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
          <div>© 2026 CUBIX.LAB. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Security SLA</a>
          </div>
        </div>
      </footer>

      {/* COST ESTIMATOR INTERACTIVE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
          <div className="bg-[#0e1117] border border-[#3B82F6]/40 rounded-3xl max-w-2xl w-full p-8 relative overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6]">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Project Cost Estimator</h3>
                <p className="text-xs text-gray-400">Instant real-time calculation based on scope & features</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Select Platform */}
              <div>
                <label className="text-xs uppercase font-bold text-gray-400 block mb-2">1. Select Target Platform</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'mobile', label: 'Mobile App' },
                    { id: 'ai', label: 'AI Solution' },
                    { id: 'web3', label: 'Web3 / Crypto' },
                    { id: 'web', label: 'Web Platform' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        platform === p.id
                          ? 'bg-[#3B82F6] text-black border-[#3B82F6]'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Features */}
              <div>
                <label className="text-xs uppercase font-bold text-gray-400 block mb-2">2. Required Key Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'auth', label: 'Biometric Auth & User Accounts' },
                    { id: 'payments', label: 'Stripe / Crypto Payments' },
                    { id: 'ai_agent', label: 'Custom AI / LLM Agent' },
                    { id: 'realtime', label: 'Real-Time Chat & Sync' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-all cursor-pointer ${
                        features.includes(f.id)
                          ? 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]'
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}
                    >
                      <span>{f.label}</span>
                      {features.includes(f.id) && <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Result Card */}
              <div className="p-6 rounded-2xl bg-black/60 border border-[#3B82F6]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-gray-400 block">Estimated Budget Range</span>
                  <span className="text-3xl font-black text-white">
                    ${calculateEstimate().toLocaleString()} - ${(calculateEstimate() * 1.35).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-[#3B82F6] font-bold bg-[#3B82F6]/10 px-3 py-1.5 rounded-full border border-[#3B82F6]/30">
                  Estimated Timeline: 6-10 Weeks
                </span>
              </div>

              {/* Submit Form */}
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our engineering team will send you the formal proposal shortly."); setIsModalOpen(false); }} className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email Address"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-neon py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Request Full Technical Proposal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY MODAL */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-up">
          <div className="bg-[#0e1117] border border-white/20 rounded-3xl max-w-xl w-full p-8 relative">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="px-3 py-1 rounded-full bg-[#3B82F6]/20 text-[#3B82F6] text-xs font-bold mb-4 inline-block">
              {selectedCaseStudy.tag}
            </span>
            <h3 className="text-2xl font-black text-white mb-3">{selectedCaseStudy.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedCaseStudy.desc}</p>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 mb-6">
              <span className="text-xs text-gray-500 uppercase font-mono block mb-1">Key Impact Metric</span>
              <span className="text-2xl font-black text-[#3B82F6]">{selectedCaseStudy.metrics}</span>
            </div>

            <button
              onClick={() => { setSelectedCaseStudy(null); setIsModalOpen(true); }}
              className="w-full btn-neon py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              Build Similar Product
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
