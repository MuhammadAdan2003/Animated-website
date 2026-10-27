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
  Linkedin
} from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic, Eyebrow, Counter, Marquee } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, FAQ, PricingCards, CTABand, Testimonials, Newsletter } from '../components/sections.jsx';
import { AnalyticsGrid } from '../components/charts.jsx';

/* ============================ PRODUCT ============================ */
export function ProductPage() {
  const modules = [
    { i: Layers3, t: 'Studio', d: 'Design environment with generative layouts, material libraries and real-time collaboration.', tag: 'Design', stat: 'Generative BIM' },
    { i: Cpu, t: 'Simulate', d: 'Physics-grade crowd, thermal, acoustic and daylight simulation, running in the cloud.', tag: 'Test', stat: 'Sub-second Physics' },
    { i: Cable, t: 'Connect', d: '300+ integrations for BMS, IoT, access, lighting and AV. Bring your own protocols.', tag: 'Integrate', stat: '300+ Connectors' },
    { i: Code2, t: 'Platform API', d: 'Typed SDKs, webhooks and a streaming graph API for building on top of your spaces.', tag: 'Build', stat: 'GraphQL / WebSockets' },
  ];
  const faq = [
    { q: 'How long does setup take?', a: 'Most teams import a model and connect their first sensors within a day. Full portfolio rollouts usually take two to four weeks.' },
    { q: 'Do I need to replace my existing systems?', a: 'No. Aura sits on top of your BMS, IoT and access control stack through our connectors and open protocols.' },
    { q: 'Where is my data stored?', a: 'In your region of choice, encrypted at rest and in transit. Enterprise plans can deploy to a private cloud or on-prem.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Product"
        lines={['Everything your', { t: 'space needs', c: 'text-lime' }, 'to be smart.']}
        text="Four connected modules cover the full lifecycle — from the first generative sketch to the thousandth day of operation."
      >
        <WaterButton to="/contact" variant="solid">Book a walkthrough <ArrowUpRight size={16} /></WaterButton>
      </PageHero>

      {/* Modules */}
      <section className="relative z-10 gutter py-24 bg-ink">
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {modules.map((m, idx) => (
            <article
              key={m.t}
              data-hot
              className={`rounded-[2rem] p-8 sm:p-12 min-h-[400px] flex flex-col justify-between cursor-pointer spot group hover:-translate-y-1.5 transition-all duration-500 ${idx === 0 ? 'bg-lime text-ink' : idx === 3 ? 'bg-aqua text-ink' : 'panel'
                }`}
            >
              <div className="flex justify-between items-center">
                <m.i size={34} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full border border-current/20">
                  {m.tag}
                </span>
              </div>
              <div>
                <span className="font-mono text-xs opacity-60 block mb-2">{m.stat}</span>
                <h3 className="font-display font-extrabold text-5xl sm:text-6xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{m.t}</h3>
                <p className="text-lg leading-relaxed max-w-md opacity-80">{m.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      {/* Real Interactive Analytics Section */}
      <section className="relative z-10 gutter py-28 bg-ink2 border-y border-white/10">
        <SectionHead
          eyebrow="Live Analytics Engine"
          lines={['Real telemetry.', 'Interactive insights.']}
          text="Inspect multi-building metrics in real time. Switch views, hover data bars, and analyze power distributions across systems."
        />
        <AnalyticsGrid />
      </section>

      {/* Capabilities */}
      <section className="relative z-10 gutter py-28 bg-sand text-ink">
        <SectionHead light eyebrow="Capabilities" lines={['Built for', 'serious scale.']} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-[2rem] overflow-hidden">
          {FEATURES.concat([{ i: Check, t: '99.99% SLA', d: 'Multi-region redundancy with automatic failover.' }]).map((f) => (
            <div key={f.t} className="bg-sand p-8 min-h-[240px] hover:bg-lime transition-colors duration-700 cursor-pointer" data-hot>
              <f.i size={24} className="mb-10 text-ink" />
              <h3 className="font-display font-extrabold text-2xl mb-2">{f.t}</h3>
              <p className="text-ink/65 text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink">
        <SectionHead eyebrow="FAQ" lines={['Questions,', 'answered.']} />
        <FAQ items={faq} />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ SOLUTIONS ============================ */
export function SolutionsPage() {
  const [selectedSector, setSelectedSector] = useState(null);

  const items = [
    { i: Building2, t: 'Commercial real estate', d: 'Raise occupancy, cut energy and give tenants buildings that feel effortless.', m: '−38% energy', full: 'Autonomous zoning balances fresh airflow, ambient lux, and elevator dispatching based on predictive tenant habits.' },
    { i: Music4, t: 'Venues & live events', d: 'Orchestrate crowd flow, sound and light across stadiums, festivals and theatres.', m: '2.4× faster ingress', full: 'Volumetric NeRF heatmaps predict bottleneck choke points 15 minutes before they happen, routing attendees dynamically.' },
    { i: Hospital, t: 'Healthcare', d: 'Optimise patient flow, air quality and asset tracking across campuses.', m: '−22% wait time', full: 'Sub-millimeter asset localization and positive-pressure clean-room pressure regulation linked directly to scheduling.' },
    { i: Factory, t: 'Industrial', d: 'Digital twins of plants that predict downtime before it costs you.', m: '−31% downtime', full: 'Machine acoustic harmonics and vibration telemetries detect mechanical bearing stress before failure.' },
    { i: GraduationCap, t: 'Campuses', d: 'Dynamic room scheduling and comfort that follows the timetable.', m: '+47% utilisation', full: 'Multi-building HVAC pre-conditioning syncs with student registrar timetables and weather radar.' },
    { i: Plane, t: 'Transport hubs', d: 'Passenger flow modelling for airports, stations and ports.', m: '−18% dwell time', full: 'LiDAR passenger queues dynamically adjust security lane throughput and baggage carousel routing.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Solutions"
        lines={['One platform.', { t: 'Every kind', c: 'text-aqua' }, 'of place.']}
        text="Wherever people gather and work, Aura gives operators a clearer picture and a faster hand."
      />
      <section className="relative z-10 gutter pb-28 bg-ink pt-10">
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

/* ============================ CUSTOMERS ============================ */
const CASES = [
  { n: 'Northwind Tower', k: 'Commercial', s: '−41% energy', d: 'A 60-storey HQ now adapts air and light floor-by-floor.', c: 'from-lime/60 to-aqua/30' },
  { n: 'Kyoto Lab Arena', k: 'Venues', s: '2.4× ingress', d: '38,000 fans through the gates in under 25 minutes.', c: 'from-aqua/60 to-lime/20' },
  { n: 'Meridian Health', k: 'Healthcare', s: '−22% waits', d: 'Predictive flow modelling across six hospital campuses.', c: 'from-coral/60 to-sand/20' },
  { n: 'Halcyon Campus', k: 'Education', s: '+47% usage', d: 'Rooms that book themselves around real demand.', c: 'from-sand/50 to-aqua/30' },
];
export function CustomersPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Customers" lines={['Proof, not', { t: 'promises.', c: 'text-lime' }]} text="A few of the teams using Aura to run better places — and the numbers they shared with us." />
      <section className="relative z-10 gutter pb-28 bg-ink pt-10">
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CASES.map((c, i) => (
            <article key={c.n} data-hot className={`group relative rounded-[2rem] overflow-hidden min-h-[480px] p-8 sm:p-10 flex flex-col justify-between panel cursor-pointer hover:-translate-y-2 transition-all duration-700 ${i % 2 ? 'md:mt-20' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.c} opacity-30 group-hover:opacity-70 transition-opacity duration-1000`} />
              <div className="absolute inset-0 dots opacity-60" />
              <div className="relative flex justify-between">
                <span className="glass rounded-full px-4 py-1.5 font-mono text-xs">{c.k}</span>
                <span className="w-12 h-12 rounded-full bg-sand text-ink flex items-center justify-center group-hover:rotate-45 transition-transform duration-700"><ArrowUpRight size={20} /></span>
              </div>
              <div className="relative">
                <p className="font-display font-extrabold text-7xl text-lime mb-4">{c.s}</p>
                <h3 className="font-display font-extrabold text-3xl mb-2">{c.n}</h3>
                <p className="text-sand/70 max-w-sm">{c.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>
      <section className="relative z-10 bg-ink2"><StatsBand /></section>
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink">
        <SectionHead eyebrow="In their words" lines={['Straight from', 'the operators.']} />
        <Testimonials />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ PRICING ============================ */
export function PricingPage() {
  const [yearly, setYearly] = useState(true);
  const faq = [
    { q: 'Can I change plans later?', a: 'Yes — upgrade, downgrade or cancel at any time. Changes are prorated automatically.' },
    { q: 'What counts as a connected sensor?', a: 'Any device that streams data into Aura: occupancy sensors, meters, door controllers, thermostats and more.' },
    { q: 'Is there a discount for non-profits?', a: 'Absolutely. Non-profits and education teams get 40% off Growth. Contact us to apply.' },
  ];
  return (
    <PageTransition>
      <PageHero eyebrow="Pricing" lines={['Simple plans.', { t: 'Serious', c: 'text-lime' }, 'returns.']} text="Start free, scale when you’re ready. No sensor surcharges, no surprise invoices.">
        <div className="glass rounded-full p-1.5 flex">
          {[['Monthly', false], ['Yearly −20%', true]].map(([l, v]) => (
            <button key={l} id={`billing-${v ? 'yearly' : 'monthly'}`} onClick={() => setYearly(v)} className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 cursor-pointer ${yearly === v ? 'bg-lime text-ink' : 'text-sand/70'}`}>{l}</button>
          ))}
        </div>
      </PageHero>
      <section className="relative z-10 gutter py-16 bg-ink"><PricingCards yearly={yearly} /></section>
      <section className="relative z-10 gutter py-28 bg-ink">
        <SectionHead eyebrow="FAQ" lines={['Billing', 'questions.']} />
        <FAQ items={faq} />
      </section>
      <CTABand />
    </PageTransition>
  );
}

/* ============================ ABOUT (IMAGES + EFFECTS) ============================ */
export function AboutPage() {
  const team = [
    {
      n: 'Amara Lindqvist',
      r: 'CEO & Co-founder',
      img: '/images/amara.jpg',
      bio: 'Former architect & spatial computing pioneer at ETH Zurich. Led generative acoustic pavilions across Europe.',
      handle: '@amaralind'
    },
    {
      n: 'Rafael Duarte',
      r: 'CTO & Co-founder',
      img: '/images/rafael.jpg',
      bio: 'Distributed systems & robotics lead, ex-MIT Media Lab. Author of real-time sensor consensus protocols.',
      handle: '@rafaduarte'
    },
    {
      n: 'Yuki Tanaka',
      r: 'Head of Research',
      img: '/images/yuki.jpg',
      bio: 'Ph.D. in neural environmental acoustics from Tokyo University. Researches sentient living spatial topologies.',
      handle: '@yukitanaka'
    },
    {
      n: 'Sam Okoye',
      r: 'VP Design',
      img: '/images/sam.jpg',
      bio: 'Award-winning industrial & interface designer, ex-Apple Spatial. Obsessed with visceral spatial feedback.',
      handle: '@samokoye'
    },
  ];

  const values = [
    {
      t: 'Humans first',
      d: 'Technology should make places feel more human, not less. We calibrate every sensor to human emotional comfort.',
      img: '/images/human.jpg',
      badge: 'Embodied Tech',
      tone: 'bg-lime text-ink'
    },
    {
      t: 'Radical clarity',
      d: 'Complex systems deserve simple, honest interfaces. No hidden dials or opaque algorithms.',
      img: '/images/clarity.jpg',
      badge: 'Zero Friction',
      tone: 'panel text-sand'
    },
    {
      t: 'Built to last',
      d: 'We design for decades of operation, not quarters of hype. Reliable hardware protocols with 100-year endurance.',
      img: '/images/lasting.jpg',
      badge: 'Decadal Design',
      tone: 'bg-aqua text-ink'
    },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="About Aura"
        lines={['We believe', { t: 'places', c: 'text-aqua' }, 'should listen.']}
        text="Aura was founded in 2022 by architects, roboticists and engineers who were tired of buildings that never learn."
      />

      <section className="relative z-10 bg-ink2"><StatsBand /></section>

      {/* Values with Rich Architectural Images & Hover Effects */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-ink">
        <SectionHead eyebrow="Our values" lines={['What we', 'stand for.']} />
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={v.t}
              data-hot
              className="group rounded-[2.5rem] overflow-hidden panel border border-white/10 flex flex-col justify-between min-h-[460px] cursor-pointer hover:-translate-y-2 transition-all duration-700 shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink3">
                <img
                  src={v.img}
                  alt={v.t}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-mono font-bold text-sand">
                  0{i + 1} // {v.badge}
                </span>
              </div>
              <div className="p-8">
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

      {/* Leadership Team with Real Generated Photographic Portraits */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-sand text-ink">
        <SectionHead light eyebrow="Leadership" lines={['The people', 'behind Aura.']} />
        <Reveal stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.n}
              data-hot
              className="group rounded-[2.2rem] bg-white p-4 pb-6 shadow-xl border border-ink/10 cursor-pointer hover:-translate-y-3 transition-all duration-500"
            >
              <div className="aspect-[4/5] rounded-[1.8rem] overflow-hidden relative bg-ink">
                <img
                  src={m.img}
                  alt={m.n}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="flex gap-2 text-white">
                    <span className="w-8 h-8 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Twitter size={14} />
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Linkedin size={14} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-xl text-ink group-hover:text-lime transition-colors">
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

/* ============================ JOURNAL (WITH RICH ARTICLE MODALS) ============================ */
const POSTS = [
  {
    id: 1,
    t: 'Why every building will have a digital twin by 2030',
    c: 'Insight',
    d: 'Mar 12, 2026',
    r: '8 min',
    g: 'from-lime to-aqua',
    author: 'Amara Lindqvist',
    lead: 'Physical envelopes can no longer be passive concrete slabs. The convergence of sub-centimeter sensors, generative neural models, and real-time GPU fluid dynamics is turning architecture into an operating system.',
    takeaways: [
      'Static HVAC setpoints waste up to 40% of building energy every winter.',
      'Spatial NeRF engines run at 120 FPS locally on edge compute nodes.',
      'Tenant retention jumps 34% in adaptive-response office complexes.'
    ],
    quote: 'Architecture is frozen music no more. Today, architecture is a living, breathing compute mesh.'
  },
  {
    id: 2,
    t: 'Inside Aura 3.0: generative layouts explained',
    c: 'Product',
    d: 'Feb 27, 2026',
    r: '6 min',
    g: 'from-aqua to-sand',
    author: 'Rafael Duarte',
    lead: 'How our proprietary tensor graph evaluates 10,000 spatial permutations in seconds to balance acoustic privacy, natural solar lux, and fire safety egress paths.',
    takeaways: [
      'Direct CAD/Revit export without manual polygon retopology.',
      'Multi-objective genetic solvers for sunlight and acoustic comfort.',
      'Instant human feedback loop via web-based collaborative canvas.'
    ],
    quote: 'Generative design is not about replacing architects. It is about giving architects superpowers.'
  },
  {
    id: 3,
    t: 'How Kyoto Lab Arena cut ingress time by 58%',
    c: 'Case study',
    d: 'Feb 03, 2026',
    r: '5 min',
    g: 'from-coral to-lime',
    author: 'Yuki Tanaka',
    lead: 'Orchestrating 38,000 concertgoers through 12 entry gates without metal turnstiles using harmless optical density arrays and directional acoustic cues.',
    takeaways: [
      'Zero physical ticket scans—ambient biometric validation.',
      'Ingress wait times dropped from 55 minutes to under 22 minutes.',
      'Crowd turbulence eliminated across all main concourses.'
    ],
    quote: 'When crowds move like fluid, safety and joy arrive at the same destination.'
  },
  {
    id: 4,
    t: 'The quiet revolution in building energy',
    c: 'Research',
    d: 'Jan 18, 2026',
    r: '9 min',
    g: 'from-sand to-aqua',
    author: 'Sam Okoye',
    lead: 'Why traditional building management systems (BMS) are fundamentally broken, and how distributed micro-zoning achieves net-zero performance without capital retrofit.',
    takeaways: [
      'HVAC accounts for 42% of commercial electricity consumption.',
      'Occupancy-prediction models eliminate empty-room air tempering.',
      'Payback period under 4 months on standard commercial leases.'
    ],
    quote: 'Net zero is not achieved through sacrifice, but through mathematical precision.'
  },
  {
    id: 5,
    t: 'Designing interfaces for operators, not dashboards',
    c: 'Design',
    d: 'Jan 04, 2026',
    r: '7 min',
    g: 'from-aqua to-coral',
    author: 'Sam Okoye',
    lead: 'Operators do not need 500 static line charts. They need visceral spatial intuition. Here is how we engineered the Aura live interface.',
    takeaways: [
      '3D spatial context reduces alarm fatigue by 76%.',
      'One-click automated remediations replace 14-step manual checklists.',
      'High-contrast dark mode optimized for control-room fatigue.'
    ],
    quote: 'If an operator cannot understand the building in 3 seconds, the UI has failed.'
  },
  {
    id: 6,
    t: 'A field guide to spatial sensing',
    c: 'Guide',
    d: 'Dec 15, 2025',
    r: '12 min',
    g: 'from-lime to-sand',
    author: 'Rafael Duarte',
    lead: 'LiDAR vs. Millimeter-Wave Radar vs. Ambient Optical arrays: an exhaustive engineering comparison of modern spatial sensing hardware.',
    takeaways: [
      'Radar penetrates drywall and glass with zero privacy liability.',
      'Optical density provides the highest resolution crowd velocity vectors.',
      'Edge federated compute guarantees zero identifiable images leave the device.'
    ],
    quote: 'Privacy is not a toggle. It is an architectural primitive.'
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
        eyebrow="Journal & Field Notes"
        lines={['Ideas for', { t: 'smarter', c: 'text-lime' }, 'spaces.']}
        text="Research papers, product releases, and candid field notes from the architects and roboticists building Aura."
      />

      <section className="relative z-10 gutter py-16 bg-ink">
        <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14">
          {POSTS.map((p) => (
            <article
              key={p.id}
              data-hot
              onClick={() => setActiveArticle(p)}
              className="group cursor-pointer spot panel p-6 rounded-[2.5rem] border border-white/10 hover:-translate-y-2.5 transition-all duration-500 shadow-xl"
            >
              <div className={`aspect-[16/10] rounded-[2rem] bg-gradient-to-br ${p.g} relative overflow-hidden`}>
                <div className="absolute inset-0 dots opacity-40" />
                <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full border-[28px] border-ink/10 group-hover:scale-125 transition-transform duration-1000" />
                <span className="absolute top-4 left-4 bg-ink/80 text-sand backdrop-blur-md rounded-full px-4 py-1.5 font-mono text-xs font-bold border border-white/10">
                  {p.c}
                </span>
                <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-ink/80 text-sand flex items-center justify-center group-hover:rotate-45 group-hover:bg-lime group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-sand/45 mt-5">
                <span>{p.d}</span>
                <span>·</span>
                <span>{p.r} read</span>
                <span>·</span>
                <span className="text-lime">{p.author}</span>
              </div>
              <h3 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-tight text-sand group-hover:text-lime transition-colors duration-500">
                {p.t}
              </h3>
              <p className="mt-3 text-sand/60 text-sm line-clamp-2 leading-relaxed">
                {p.lead}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime group-hover:translate-x-1 transition-transform">
                Read full article <ArrowRight size={16} />
              </span>
            </article>
          ))}
        </Reveal>

        {/* INTERACTIVE ARTICLE MODAL (WOW MOMENT) */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-2xl"
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
                  <span>// Aura Research Laboratories</span>
                </div>

                {/* Modal Body */}
                <div className="mt-8 space-y-6 text-sand/80 leading-relaxed text-base sm:text-lg">
                  <p className="text-xl sm:text-2xl font-light text-sand leading-relaxed border-l-2 border-lime pl-4">
                    {activeArticle.lead}
                  </p>

                  <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-lime mb-4">Key Takeaways & Findings</h4>
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
                    Across millions of square meters deployed in production, the data shows that reactive architectural computing produces compounding returns. By removing the friction between occupant needs and building response, spaces feel weightless, intuitive, and calm.
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
                      <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                    </button>
                    <button
                      className="px-4 py-2 rounded-full border border-white/20 hover:border-lime text-xs font-mono flex items-center gap-2 text-sand hover:text-lime transition-colors cursor-pointer"
                    >
                      <Bookmark size={14} />
                      <span>Save for later</span>
                    </button>
                  </div>
                  <WaterButton onClick={() => setActiveArticle(null)} variant="solid" className="!py-2.5 !px-6">
                    Close Story
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

/* ============================ CONTACT ============================ */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('Demo');

  return (
    <PageTransition>
      <PageHero eyebrow="Contact" lines={['Let’s talk', { t: 'spaces.', c: 'text-aqua' }]} text="Tell us about your portfolio and we’ll show you what Aura can do — usually within one business day." />
      <section className="relative z-10 gutter py-16 pb-32 bg-ink grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7 panel rounded-[2rem] p-8 sm:p-12">
          {sent ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
              <span className="w-20 h-20 rounded-full bg-lime text-ink flex items-center justify-center mb-6"><Check size={36} /></span>
              <h3 className="font-display font-extrabold text-4xl mb-2">Message received.</h3>
              <p className="text-sand/60">We’ll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {['Demo', 'Pricing', 'Partnership', 'Support'].map((t) => (
                  <button type="button" key={t} onClick={() => setTopic(t)} className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-500 cursor-pointer ${topic === t ? 'bg-lime text-ink border-lime' : 'border-white/15 text-sand/70 hover:border-lime'}`}>{t}</button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input id="contact-name" required placeholder="Full name" className="field" />
                <input id="contact-email" required type="email" placeholder="Work email" className="field" />
              </div>
              <input id="contact-company" placeholder="Company" className="field" />
              <textarea id="contact-message" required rows={6} placeholder="How can we help?" className="field resize-none" />
              <WaterButton type="submit" variant="solid" className="!px-10 !py-5">Send message <ArrowUpRight size={18} /></WaterButton>
            </form>
          )}
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 space-y-4">
          {[[Mail, 'Email', 'hello@aura.studio'], [Phone, 'Phone', '+1 (415) 555-0142'], [MapPin, 'HQ', '88 Mission St, San Francisco']].map(([I, l, v]) => (
            <div key={l} className="panel rounded-3xl p-6 flex items-center gap-5 hover:border-lime/50 transition-colors duration-500">
              <span className="w-14 h-14 rounded-2xl bg-lime/15 text-lime flex items-center justify-center"><I size={22} /></span>
              <div><p className="font-mono text-[11px] uppercase tracking-widest text-sand/45">{l}</p><p className="font-display font-bold text-xl">{v}</p></div>
            </div>
          ))}
          <div className="rounded-3xl bg-aqua text-ink p-8">
            <p className="font-display font-extrabold text-3xl leading-tight">Prefer a live walkthrough?</p>
            <p className="mt-2 opacity-70">Book 30 minutes with a product specialist.</p>
            <WaterButton variant="dark" className="mt-6">Pick a time <ArrowUpRight size={16} /></WaterButton>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
