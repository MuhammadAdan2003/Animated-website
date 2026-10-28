import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Check,
  Building2,
  Music4,
  Hospital,
  Factory,
  GraduationCap,
  Plane,
  Code2,
  Cpu,
  Layers3,
  Cable,
  X,
  Share2,
  Bookmark,
  Sparkles,
  Calendar,
  Clock,
  User,
  Quote,
  Twitter,
  Linkedin,
  Radar,
  Gauge,
  Workflow,
  ShieldCheck,
  Waves,
  Palette,
  Compass,
  Zap,
  Globe2,
  Box,
  Layers,
  Server,
  Database,
  Terminal,
  Monitor,
  Rocket
} from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic, Eyebrow, Counter, Marquee, CardSmoke } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, FAQ, PricingCards, CTABand, Testimonials, Newsletter } from '../components/sections.jsx';

const PRODUCT_CAPABILITIES = [
  { i: Monitor, t: 'Full-Stack Web Apps', d: 'High-performance Next.js 15, React 19, and progressive web apps engineered for sub-second LCP and high conversion.' },
  { i: Box, t: 'Custom Enterprise Software', d: 'Scalable multi-tenant SaaS platforms, internal ERP/CRM workflow engines, and mission-critical transactional software.' },
  { i: Server, t: 'Cloud Microservices & APIs', d: 'High-throughput GraphQL, gRPC, and REST API architectures written in Go, Node.js, and Rust with zero bottlenecks.' },
  { i: Sparkles, t: 'AI Engineering & Agents', d: 'Proprietary LLM integrations, autonomous AI agents, intelligent vector search engines, and automated data pipelines.' },
  { i: Layers, t: 'Interactive WebGL & 3D Web', d: 'Bespoke 3D WebGL experiences, interactive product customizers, and GPU-accelerated shader engines running at 120 FPS.' },
  { i: Cpu, t: 'DevOps & Multi-Region Cloud', d: 'Kubernetes orchestration, automated CI/CD canary pipelines, Docker containerization, and automated auto-scaling.' },
  { i: Database, t: 'Distributed Database Systems', d: 'PostgreSQL sharding, Redis in-memory caching clusters, Vector databases, and sub-millisecond query optimization.' },
  { i: ShieldCheck, t: 'Enterprise Security & SOC 2', d: 'Bank-grade zero-trust encryption, penetration testing, compliance assurance, and dedicated 99.999% SLA support.' },
];

/* ============================ SERVICES (PRODUCT PAGE) ============================ */
export function ProductPage() {
  const modules = [
    { i: Monitor, t: 'Full-Stack Web Development', d: 'We build high-performance web applications and digital flagships engineered with Next.js 15, React 19, and headless architectures with sub-second page loads.', tag: 'Frontend & Web', stat: 'Next.js 15 / React 19' },
    { i: Server, t: 'Custom Enterprise Software', d: 'End-to-end bespoke SaaS platforms, multi-tenant portals, workflow automation engines, and high-throughput transactional backends.', tag: 'SaaS & Enterprise', stat: 'Bespoke Architecture' },
    { i: Cpu, t: 'Cloud Microservices & DevOps', d: 'Resilient distributed microservices, gRPC & GraphQL meshes, automated CI/CD pipelines, and multi-region Kubernetes cloud infrastructure.', tag: 'Backend & Cloud', stat: '99.999% SLA' },
    { i: Sparkles, t: 'AI Systems & Intelligent Agents', d: 'Custom proprietary LLM pipelines, autonomous agentic workflows, intelligent semantic search engines, and real-time RAG systems.', tag: 'AI Engineering', stat: 'Proprietary Tech' },
  ];

  const faq = [
    { q: 'What is Aura Studio’s engineering philosophy?', a: 'We reject cookie-cutter templates, sluggish page loads, and fragile monolithic codebases. We believe software and web applications should be blistering fast, visually unforgettable, and architected for enterprise-scale traffic.' },
    { q: 'How does an agency engagement kick off?', a: 'Every engagement begins with an intensive Architecture & Discovery Sprint. We evaluate your product requirements, design high-concurrency cloud topology, and establish a milestone-driven engineering roadmap.' },
    { q: 'Do you collaborate with internal engineering teams?', a: 'Yes. We frequently embed alongside in-house tech teams as an elite acceleration pod, delivering turnkey products, complex microservices, or high-performance frontend flagships.' },
    { q: 'What is your typical project delivery timeline?', a: 'Bespoke web applications and campaign flagships ship within 4–8 weeks; complex enterprise software and multi-region platform transformations typically span 8–14 weeks.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Services & Engineering Capabilities"
        lines={['Bespoke software.', { t: 'Unrivalled', c: 'text-lime' }, 'web engineering.']}
        text="Four core disciplines cover the entire software lifecycle — from visionary web applications and SaaS platforms to cloud microservices and autonomous AI systems."
      >
        <WaterButton to="/contact" variant="solid">Start a project <ArrowUpRight size={16} /></WaterButton>
      </PageHero>

      {/* Services Grid */}
      <section className="relative z-10 gutter py-24 bg-transparent">
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {modules.map((m, idx) => (
            <article
              key={m.t}
              data-hot
              className={`rounded-[2rem] p-8 sm:p-12 min-h-[400px] flex flex-col justify-between cursor-pointer spot group hover:-translate-y-1.5 transition-all duration-500 ${idx === 0 ? 'bg-lime text-ink card-smoke-light' : idx === 3 ? 'bg-aqua text-ink card-smoke-light' : 'panel card-smoke'
                }`}
            >
              <CardSmoke tone={idx === 0 || idx === 3 ? 'light' : 'dark'} />
              <div className="relative z-10 flex justify-between items-center">
                <m.i size={34} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-current/20">
                  {m.tag}
                </span>
              </div>
              <div className="relative z-10">
                <span className="font-mono text-xs opacity-60 block mb-2">{m.stat}</span>
                <h3 className="font-display font-extrabold text-5xl sm:text-6xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{m.t}</h3>
                <p className="text-lg leading-relaxed max-w-md opacity-80">{m.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 gutter py-28 bg-sand text-ink">
        <SectionHead light eyebrow="Agency Capabilities" lines={['Engineered for', 'global category leaders.']} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-[2rem] overflow-hidden">
          {PRODUCT_CAPABILITIES.map((f) => (
            <div key={f.t} className="relative overflow-hidden bg-sand p-8 min-h-[240px] hover:bg-lime transition-colors duration-700 cursor-pointer card-smoke-light" data-hot>
              <CardSmoke tone="light" />
              <div className="relative z-10">
                <f.i size={24} className="mb-10 text-ink" />
                <h3 className="font-display font-extrabold text-2xl mb-2">{f.t}</h3>
                <p className="text-ink/65 text-sm leading-relaxed">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-transparent">
        <SectionHead eyebrow="Inquiries FAQ" lines={['Questions,', 'answered.']} />
        <FAQ items={faq} />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ EXPERTISE (SOLUTIONS PAGE) ============================ */
export function SolutionsPage() {
  const [selectedSector, setSelectedSector] = useState(null);

  const items = [
    { i: Building2, t: 'SaaS & High-Growth Tech', d: 'Multi-tenant cloud architectures, subscription billing, and interactive analytics dashboards for rapid scaling.', m: '+240% Speed Lift', full: 'We architect lightning-fast web applications with Next.js 15, automated tenant isolation, and sub-10ms query caches that reduce churn and boost user retention.' },
    { i: Box, t: 'E-Commerce & Digital Flagships', d: 'Headless commerce, lightning-fast checkout funnels, and bespoke 3D WebGL product customizers for luxury brands.', m: '0.4s LCP', full: 'By replacing bloated monoliths with headless React and edge-rendered catalogues, we increase conversion rates by up to 84% while delivering unforgettable visual craft.' },
    { i: Cpu, t: 'FinTech & High-Frequency Systems', d: 'Ultra-low latency transactional feeds, bank-grade encryption, and real-time financial data visualization engines.', m: '99.999% Uptime', full: 'Zero-latency WebSocket streams and Swiss-grade security protocols engineered for institutional trading terminals, crypto protocols, and wealth management platforms.' },
    { i: Sparkles, t: 'AI & Deep Tech Ventures', d: 'Developer portals, neural model visualization, agentic automation, and real-time vector search integration.', m: '3.4× Pipeline', full: 'We turn abstract algorithms and complex AI models into magnetic, intuitive digital interfaces that developers and enterprise buyers love to use.' },
    { i: Hospital, t: 'HealthTech & Telemedicine', d: 'HIPAA-compliant patient portals, real-time WebRTC audio/video consultations, and secure EHR synchronization.', m: 'SOC 2 Assured', full: 'Zero-trust architecture, end-to-end encrypted medical data pipelines, and fluid interfaces designed for practitioners and patients.' },
    { i: Factory, t: 'Enterprise Logistics & IoT', d: 'Real-time telemetry tracking, distributed inventory algorithms, fleet dashboards, and edge sensor analytics.', m: '120 FPS Render', full: 'Real-time interactive maps, event streaming via Kafka, and predictive anomaly detection interfaces built for global operations.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Industry Solutions"
        lines={['Software solutions.', { t: 'Across leading', c: 'text-aqua' }, 'industries.']}
        text="From high-growth SaaS and luxury e-commerce to fintech and autonomous AI ventures, we build software solutions that empower category leaders."
      />
      <section className="relative z-10 gutter pb-28 bg-transparent pt-10">
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((s, i) => (
            <Reveal key={s.t} y={30}>
              <div
                data-hot
                onClick={() => setSelectedSector(selectedSector === i ? null : i)}
                className={`group grid grid-cols-12 gap-4 items-center py-10 sm:py-14 cursor-pointer transition-all duration-500 rounded-2xl px-4 sm:px-6 ${selectedSector === i ? 'bg-white/[0.06] border border-lime/30' : 'hover:bg-white/[0.03]'
                  }`}
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-sand/40">0{i + 1}</span>
                <div className="col-span-10 sm:col-span-5 flex items-center gap-5">
                  <span className="hidden sm:flex w-14 h-14 rounded-2xl bg-lime/15 text-lime items-center justify-center group-hover:bg-lime group-hover:text-ink transition-colors duration-500">
                    <s.i size={24} />
                  </span>
                  <div>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl group-hover:text-lime transition-colors duration-500">
                      {s.t}
                    </h3>
                    {selectedSector === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-lime text-sm mt-2 leading-relaxed"
                      >
                        {s.full}
                      </motion.p>
                    )}
                  </div>
                </div>
                <p className="col-span-12 sm:col-span-4 text-sand/60 leading-relaxed">{s.d}</p>
                <div className="col-span-12 sm:col-span-2 flex sm:justify-end items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full border border-lime/40 text-lime font-mono text-xs">{s.m}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${selectedSector === i ? 'rotate-90 bg-lime text-ink' : 'group-hover:rotate-45'}`}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ SELECTED WORK (CUSTOMERS PAGE) ============================ */
const CASES = [
  { n: 'Kinetix Web Platform', k: 'Headless Web App', s: '+310% Speed Lift', d: 'A high-performance Next.js 15 web application with real-time 3D WebGL product configurators and 0.4s LCP.', c: 'from-lime/60 to-aqua/30' },
  { n: 'CloudSphere Microservices', k: 'Distributed Cloud', s: '48M Daily Requests', d: 'High-concurrency microservices mesh with automated multi-region Kubernetes routing and sub-10ms latency.', c: 'from-aqua/60 to-lime/20' },
  { n: 'Apex FinTech Terminal', k: 'Real-Time Trading', s: '4ms Feed Latency', d: 'Ultra-low latency institutional trading web application with real-time WebSocket feeds and Rust WASM compute.', c: 'from-coral/60 to-sand/20' },
  { n: 'Nexus AI Enterprise Portal', k: 'Agentic SaaS', s: '3.8× Workflow Lift', d: 'Autonomous AI agent orchestration platform with custom vector embeddings and real-time collaborative canvas.', c: 'from-sand/50 to-aqua/30' },
];

export function CustomersPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Selected Work" lines={['Software proof,', { t: 'not promises.', c: 'text-lime' }]} text="A curated selection of production web applications, scalable cloud platforms, and transformative enterprise software engineered by Aura." />
      <section className="relative z-10 gutter pb-28 bg-transparent pt-10">
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CASES.map((c, i) => (
            <article key={c.n} data-hot className={`group relative rounded-[2rem] overflow-hidden min-h-[480px] p-8 sm:p-10 flex flex-col justify-between panel card-smoke cursor-pointer hover:-translate-y-2 transition-all duration-700 ${i % 2 ? 'md:mt-20' : ''}`}>
              <CardSmoke tone="dark" />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.c} opacity-30 group-hover:opacity-70 transition-opacity duration-1000`} />
              <div className="absolute inset-0 dots opacity-60" />
              <div className="relative z-10 flex justify-between">
                <span className="glass rounded-full px-4 py-1.5 font-mono text-xs">{c.k}</span>
                <span className="w-12 h-12 rounded-full bg-sand text-ink flex items-center justify-center group-hover:rotate-45 transition-transform duration-700"><ArrowUpRight size={20} /></span>
              </div>
              <div className="relative z-10">
                <p className="font-display font-extrabold text-5xl sm:text-6xl text-lime mb-4">{c.s}</p>
                <h3 className="font-display font-extrabold text-3xl mb-2">{c.n}</h3>
                <p className="text-sand/70 max-w-sm">{c.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink/70">
        <StatsBand />
        <SectionHead eyebrow="In Their Words" lines={['Voices from', 'the partners.']} />
        <Testimonials />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ ENGAGEMENTS (PRICING PAGE) ============================ */
export function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const faq = [
    { q: 'How do agency engagement payments work?', a: 'Sprint engagements are structured as 50% upon project kickoff and 50% upon final delivery & code handoff. Engineering Pod partnerships are billed as a monthly ongoing retainer.' },
    { q: 'What deliverables are included in a Web Flagship Sprint?', a: 'You receive complete visual design source files, interactive design token specifications, production-ready Next.js / React / WebGL source code, CI/CD setup, and full launch assurance.' },
    { q: 'Can we transition from a Sprint to an ongoing Engineering Pod?', a: 'Yes. Over 80% of our clients choose to continue with an ongoing Engineering Pod retainer to continuously ship new product features, interactive campaigns, and platform expansions.' },
  ];
  return (
    <PageTransition>
      <PageHero eyebrow="Engagement Models" lines={['Bespoke tiers.', { t: 'Production-grade', c: 'text-lime' }, 'results.']} text="Collaborate through focused high-velocity sprints, dedicated multidisciplinary engineering pods, or enterprise platform transformations.">
        <div className="glass rounded-full p-1.5 flex">
          {[['Quarterly Retainer', false], ['Annual Partnership −20%', true]].map(([l, v]) => (
            <button key={l} id={`billing-${v ? 'yearly' : 'monthly'}`} onClick={() => setYearly(v)} className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 cursor-pointer ${yearly === v ? 'bg-lime text-ink' : 'text-sand/70'}`}>{l}</button>
          ))}
        </div>
      </PageHero>
      <section className="relative z-10 gutter py-16 bg-transparent"><PricingCards yearly={yearly} /></section>
      <section className="relative z-10 gutter py-28 bg-transparent">
        <SectionHead eyebrow="Partnership FAQ" lines={['Collaboration', 'clarity.']} />
        <FAQ items={faq} />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ STUDIO (ABOUT PAGE) ============================ */
export function AboutPage() {
  const team = [
    {
      n: 'Amara Lindqvist',
      r: 'Chief Technology & Engineering Officer',
      img: '/images/amara.jpg',
      fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Former Stripe and Vercel engineering lead. Specializes in distributed microservices, edge routing, and resilient cloud architecture.',
      handle: '@amaralind'
    },
    {
      n: 'Rafael Duarte',
      r: 'Head of Web Architecture & WebGL',
      img: '/images/rafael.jpg',
      fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Ex-MIT Media Lab fellow. Shipped real-time 3D web engines, WebGL physics shaders, and low-latency micro-frontends.',
      handle: '@rafaduarte'
    },
    {
      n: 'Yuki Tanaka',
      r: 'Principal Full-Stack Architect',
      img: '/images/yuki.jpg',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Distributed systems veteran specializing in Next.js 15, Go microservices, GraphQL mesh pipelines, and fluid human interfaces.',
      handle: '@yukitanaka'
    },
    {
      n: 'Sam Okoye',
      r: 'VP of UI Systems & Performance',
      img: '/images/sam.jpg',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Ex-Apple UI systems engineer. Obsessed with Core Web Vitals, sub-millisecond interaction latency, and design tokens.',
      handle: '@samokoye'
    },
  ];

  const values = [
    {
      t: 'Clean Architecture',
      d: 'Every line of code, database query, and API contract is engineered with modular precision. We build software that scales effortlessly without technical debt.',
      img: '/images/human.jpg',
      fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      badge: 'Zero Technical Debt',
      tag: 'ARCHITECTURE'
    },
    {
      t: 'Sub-Second Speed',
      d: 'Performance is a core feature. We engineer sub-second web flagships with 100/100 Core Web Vitals, instant hydration, and 120 FPS fluid micro-interactions.',
      img: '/images/clarity.jpg',
      fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      badge: '100/100 Lighthouse',
      tag: 'VELOCITY'
    },
    {
      t: 'Scalable Reliability',
      d: 'We build digital products and cloud systems designed to handle millions of concurrent users with 99.999% uptime assurance.',
      img: '/images/lasting.jpg',
      fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      badge: '99.999% SLA Uptime',
      tag: 'RESILIENCE'
    },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Our Engineering Philosophy"
        lines={['We engineer', { t: 'digital software', c: 'text-aqua' }, 'that scales ventures.']}
        text="Aura is an independent software development and modern web development agency founded by elite engineers, systems architects, and product designers who refuse mediocrity."
      />

      {/* Values */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-transparent">
        <StatsBand />
        <SectionHead eyebrow="Engineering Pillars" lines={['What guides', 'our code.']} />
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={v.t}
              data-hot
              className="group relative rounded-[2.5rem] overflow-hidden panel card-smoke border border-white/10 hover:border-lime/40 flex flex-col justify-between min-h-[480px] cursor-pointer hover:-translate-y-2 transition-all duration-700 shadow-2xl"
            >
              <CardSmoke tone="dark" />
              <div className="relative z-10 aspect-[16/10] overflow-hidden bg-ink3">
                <img
                  src={v.img}
                  alt={v.t}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== v.fallback) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = v.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />
                <span className="absolute top-4 left-4 glass px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-sand border border-white/15 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  0{i + 1} // {v.badge}
                </span>
              </div>
              <div className="relative z-10 p-8 sm:p-9">
                <span className="font-mono text-[10px] uppercase tracking-widest text-lime font-bold block mb-2">
                  // {v.tag}
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl mb-3 text-sand group-hover:text-lime transition-colors">
                  {v.t}
                </h3>
                <p className="text-sand/70 text-sm sm:text-base leading-relaxed">
                  {v.d}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Leadership Team */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-sand text-ink">
        <SectionHead light eyebrow="Agency Leadership" lines={['The minds', 'behind Aura.']} />
        <Reveal stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.n}
              data-hot
              className="group relative overflow-hidden rounded-[2.2rem] bg-white p-4 pb-6 shadow-xl border border-ink/10 cursor-pointer hover:-translate-y-3 transition-all duration-500 card-smoke-light"
            >
              <CardSmoke tone="light" />
              <div className="aspect-[4/5] rounded-[1.8rem] overflow-hidden relative z-10 bg-ink">
                <img
                  src={m.img}
                  alt={m.n}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== m.fallback) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = m.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="flex gap-2 text-white">
                    <span className="w-9 h-9 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Twitter size={15} />
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Linkedin size={15} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 mt-4 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-xl text-ink group-hover:text-lime-700 transition-colors">
                    {m.n}
                  </h3>
                  <span className="font-mono text-[10px] text-ink/50 uppercase">{m.handle}</span>
                </div>
                <p className="text-lime-700 font-bold text-xs mt-0.5">{m.r}</p>
                <p className="text-ink/65 text-xs leading-relaxed mt-2.5 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <CTABand />
    </PageTransition>
  );
}

/* ============================ PERSPECTIVES (JOURNAL PAGE) ============================ */
const POSTS = [
  {
    id: 1,
    t: 'The Architecture of Next.js 15 and React 19: Why Sub-Second LCP Defines Conversion',
    c: 'Web Architecture',
    d: 'Mar 12, 2026',
    r: '7 min',
    g: 'from-lime to-aqua',
    author: 'Amara Lindqvist',
    lead: 'Modern digital web applications can no longer afford sluggish load times or heavy client-side waterfalls. The convergence of React Server Components, streaming SSR, and edge hydration is setting a new bar for high-converting web engineering.',
    takeaways: [
      'Every 100ms improvement in page load increases user conversion by up to 8.4%.',
      'React Server Components eliminate client JavaScript bundle bloat by over 60%.',
      'Edge routing ensures sub-50ms response times for users globally.'
    ],
    quote: 'Speed is not a luxury optimization. Speed is the fundamental foundation of user trust and revenue.'
  },
  {
    id: 2,
    t: 'Building Resilient Cloud Microservices: From Monolith to Distributed Event Mesh',
    c: 'Backend & Cloud',
    d: 'Feb 27, 2026',
    r: '9 min',
    g: 'from-aqua to-sand',
    author: 'Rafael Duarte',
    lead: 'How we engineer high-concurrency Go microservices, distributed GraphQL gateways, and Redis caching layers to withstand 100k+ concurrent requests per second with zero downtime.',
    takeaways: [
      'Asynchronous event buses decouple critical business logic and prevent cascading failures.',
      'Distributed caching strategies cut database CPU utilization by over 78%.',
      'Automated canary rollouts in Kubernetes eliminate production regression risks.'
    ],
    quote: 'Architecture is about making the critical decisions that prevent systemic failure when traffic surges 100x.'
  },
  {
    id: 3,
    t: 'AI Agents in Production: Beyond Chatbots to Autonomous Enterprise Workflows',
    c: 'AI Engineering',
    d: 'Feb 10, 2026',
    r: '6 min',
    g: 'from-coral to-lime',
    author: 'Yuki Tanaka',
    lead: 'Why forward-thinking software platforms are embedding autonomous multi-agent pipelines with vector retrieval to automate complex end-to-end business workflows.',
    takeaways: [
      'Deterministic verification loops prevent LLM hallucination in mission-critical software.',
      'Vector databases with hybrid keyword-semantic search provide sub-10ms retrieval.',
      'Agentic architectures reduce human operational hours by up to 80% across data-heavy processes.'
    ],
    quote: 'The future of software is not software you merely operate, but software that collaborates with you.'
  },
];

export function JournalPage() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = (art) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="Engineering Perspectives"
        lines={['Ideas from', { t: 'the frontier', c: 'text-lime' }, 'of software.']}
        text="Technical deep-dives, architectural manifestos, and engineering essays from the developers and systems architects at Aura."
      />

      <section className="relative z-10 gutter py-16 bg-transparent">
        <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14">
          {POSTS.map((p) => (
            <article
              key={p.id}
              data-hot
              onClick={() => setActiveArticle(p)}
              className="group cursor-pointer spot panel card-smoke p-6 rounded-[2.5rem] border border-white/10 hover:-translate-y-2.5 transition-all duration-500 shadow-xl"
            >
              <CardSmoke tone="dark" />
              <div className={`aspect-[16/10] rounded-[2rem] bg-gradient-to-br ${p.g} relative z-10 overflow-hidden`}>
                <div className="absolute inset-0 dots opacity-40" />
                <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full border-[28px] border-ink/10 group-hover:scale-125 transition-transform duration-1000" />
                <span className="absolute top-4 left-4 bg-ink/85 text-sand rounded-full px-4 py-1.5 font-mono text-xs font-bold border border-white/10">
                  {p.c}
                </span>
                <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-ink/85 text-sand flex items-center justify-center group-hover:rotate-45 group-hover:bg-lime group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="relative z-10 flex items-center gap-3 font-mono text-xs text-sand/45 mt-5">
                <span>{p.d}</span>
                <span>·</span>
                <span>{p.r} read</span>
                <span>·</span>
                <span className="text-lime">{p.author}</span>
              </div>
              <h3 className="relative z-10 mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-tight text-sand group-hover:text-lime transition-colors duration-500">
                {p.t}
              </h3>
              <p className="relative z-10 mt-3 text-sand/60 text-sm line-clamp-2 leading-relaxed">
                {p.lead}
              </p>
              <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime group-hover:translate-x-1 transition-transform">
                Read engineering essay <ArrowRight size={16} />
              </span>
            </article>
          ))}
        </Reveal>

        {/* INTERACTIVE ARTICLE MODAL */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85"
              onClick={() => setActiveArticle(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.92, y: 30, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass bg-ink/95 border border-white/15 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-lime text-ink font-mono text-xs font-bold">
                      {activeArticle.c}
                    </span>
                    <span className="font-mono text-xs text-sand/50">{activeArticle.d} · {activeArticle.r} read</span>
                  </div>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime hover:text-black flex items-center justify-center text-sand transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Title */}
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-sand mt-6 leading-tight">
                  {activeArticle.t}
                </h2>

                <div className="flex items-center gap-3 mt-4 text-xs font-mono text-sand/60">
                  <User size={14} className="text-lime" />
                  <span>By {activeArticle.author}</span>
                  <span>// Aura Engineering Lab</span>
                </div>

                {/* Modal Body */}
                <div className="mt-8 space-y-6 text-sand/80 leading-relaxed text-base sm:text-lg">
                  <p className="text-xl sm:text-2xl font-light text-sand leading-relaxed border-l-2 border-lime pl-4">
                    {activeArticle.lead}
                  </p>

                  <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-lime mb-4">Architectural Key Takeaways</h4>
                    <ul className="space-y-3">
                      {activeArticle.takeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-sand/90">
                          <Check size={18} className="text-lime shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="my-8 p-6 rounded-2xl bg-lime text-ink">
                    <Quote size={28} className="opacity-60 mb-2" />
                    <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
                      "{activeArticle.quote}"
                    </p>
                    <span className="font-mono text-xs font-bold block mt-3">— {activeArticle.author}</span>
                  </blockquote>

                  <p>
                    Across millions of visitor interactions logged across our shipped software flagships, the data confirms that creative boldness combined with technical rigor produces compounding brand equity. When an application is blisteringly fast and intuitive, users don't just use it — they advocate for it.
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare(activeArticle)}
                      className="px-4 py-2 rounded-full border border-white/20 hover:border-lime text-xs font-mono flex items-center gap-2 text-sand hover:text-lime transition-colors cursor-pointer"
                    >
                      <Share2 size={14} />
                      <span>{copied ? 'Link Copied!' : 'Share Essay'}</span>
                    </button>
                    <button
                      className="px-4 py-2 rounded-full border border-white/20 hover:border-lime text-xs font-mono flex items-center gap-2 text-sand hover:text-lime transition-colors cursor-pointer"
                    >
                      <Bookmark size={14} />
                      <span>Save for later</span>
                    </button>
                  </div>
                  <WaterButton onClick={() => setActiveArticle(null)} variant="solid">
                    Close Essay
                  </WaterButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24"><Newsletter /></div>
      </section>
    </PageTransition>
  );
}

/* ============================ CONTACT (START A PROJECT) ============================ */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('Web Flagship');

  return (
    <PageTransition>
      <PageHero eyebrow="Start a Collaboration" lines={['Let’s build something', { t: 'extraordinary.', c: 'text-aqua' }]} text="Tell us about your product vision, tech stack requirements, and target launch timeline. Our engineering leads review every inquiry and reply within 24 hours." />
      <section className="relative z-10 gutter py-16 pb-32 bg-transparent grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7 panel card-smoke rounded-[2rem] p-8 sm:p-12">
          <CardSmoke tone="dark" />
          {sent ? (
            <div className="relative z-10 min-h-[420px] flex flex-col items-center justify-center text-center">
              <span className="w-20 h-20 rounded-full bg-lime text-ink flex items-center justify-center mb-6"><Check size={36} /></span>
              <h3 className="font-display font-extrabold text-4xl mb-2">Inquiry Received.</h3>
              <p className="text-sand/60">A lead software architect will review your technical requirements and schedule a discovery session within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="relative z-10 space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-sand/50 mb-3">Project Type</p>
                <div className="flex flex-wrap gap-2">
                  {['Web Flagship', 'Custom Software / SaaS', 'Cloud & Microservices', 'Engineering Pod Retainer'].map((t) => (
                    <button type="button" key={t} onClick={() => setTopic(t)} className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-500 cursor-pointer ${topic === t ? 'bg-lime text-ink border-lime' : 'border-white/15 text-sand/70 hover:border-lime'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input id="contact-name" required placeholder="Your full name" className="field" />
                <input id="contact-email" required type="email" placeholder="Business email" className="field" />
              </div>
              <input id="contact-company" placeholder="Company / Organization name" className="field" />
              <textarea id="contact-message" required rows={6} placeholder="Tell us about your software vision, desired tech stack, and target launch date..." className="field resize-none" />
              <WaterButton type="submit" variant="solid">Submit Project Brief <ArrowUpRight size={18} /></WaterButton>
            </form>
          )}
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 space-y-4">
          {[[Mail, 'Direct Inquiries', 'engineering@aura.dev'], [Phone, 'Engineering Desk', '+1 (415) 890-2287'], [MapPin, 'Global Hubs', 'San Francisco · London · Zurich · Tokyo']].map(([I, l, v]) => (
            <div key={l} className="panel card-smoke rounded-3xl p-6 flex items-center gap-5 hover:border-lime/50 transition-colors duration-500">
              <CardSmoke tone="dark" />
              <span className="relative z-10 w-14 h-14 rounded-2xl bg-lime/15 text-lime flex items-center justify-center"><I size={22} /></span>
              <div className="relative z-10"><p className="font-mono text-[11px] uppercase tracking-widest text-sand/45">{l}</p><p className="font-display font-bold text-xl">{v}</p></div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-3xl bg-aqua text-ink p-8 card-smoke-light">
            <CardSmoke tone="light" />
            <div className="relative z-10">
              <p className="font-display font-extrabold text-3xl leading-tight">Need a direct technical consultation?</p>
              <p className="mt-2 opacity-70">Schedule a 30-minute system architecture review with our Lead Software Architect.</p>
              <WaterButton variant="dark" className="mt-6">Schedule Consultation <ArrowUpRight size={16} /></WaterButton>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
