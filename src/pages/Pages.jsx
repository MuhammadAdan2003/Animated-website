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
  Layers
} from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic, Eyebrow, Counter, Marquee } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, FAQ, PricingCards, CTABand, Testimonials, Newsletter } from '../components/sections.jsx';
import { AnalyticsGrid } from '../components/charts.jsx';

const PRODUCT_CAPABILITIES = [
  { i: Palette, t: 'Brand Architecture', d: 'Comprehensive visual languages, kinetic typography systems, and luxury art direction that commands attention.' },
  { i: Layers, t: 'Digital Flagships', d: 'High-performance interactive web flagships with bespoke WebGL shaders, fluid physics, and sub-second load times.' },
  { i: Compass, t: 'Spatial Computing', d: '3D interactive environments, virtual architectural walkthroughs, and spatial web experiences rendered at 120 FPS.' },
  { i: Zap, t: 'Creative Technology', d: 'Bespoke GLSL fragment shaders, interactive particle engines, and fluid micro-interactions engineered without compromise.' },
  { i: Sparkles, t: 'Generative AI Systems', d: 'Custom proprietary AI pipelines, automated design variation engines, and generative spatial asset generators.' },
  { i: Cpu, t: 'Full-Stack Performance', d: 'Headless cloud architectures, modern React/Vite frameworks, and global edge CDN caching for instant latency.' },
  { i: Globe2, t: 'Global Launch QA', d: 'Cross-browser, cross-device sensory testing and precision polish before unveiling to the international stage.' },
  { i: ShieldCheck, t: 'Enterprise SLA & Security', d: 'Bank-grade compliance, SOC 2 assurance, high-availability hosting, and dedicated post-launch support pods.' },
];

/* ============================ SERVICES (PRODUCT PAGE) ============================ */
export function ProductPage() {
  const modules = [
    { i: Layers3, t: 'Brand Architecture', d: 'We forge distinct, magnetic brand systems — from generative logos and dynamic design tokens to high-fashion typographic systems.', tag: 'Brand Craft', stat: 'Identity Systems' },
    { i: Cpu, t: 'Digital Flagships', d: 'Immersive, boundary-pushing web platforms engineered with custom WebGL shaders, seamless routing, and uncompromising speed.', tag: 'Engineering', stat: '120 FPS WebGL' },
    { i: Cable, t: 'Spatial Computing', d: 'Interactive 3D digital twins, virtual luxury showrooms, and spatial computing environments tailored for modern browsers & headsets.', tag: 'Spatial Lab', stat: 'Interactive 3D' },
    { i: Code2, t: 'Creative Intelligence', d: 'Bespoke generative AI models, custom interactive simulation matrixes, and algorithmic content pipelines built for scale.', tag: 'AI & Systems', stat: 'Proprietary Tech' },
  ];

  const faq = [
    { q: 'What is Aura Studio’s creative philosophy?', a: 'We reject commoditized templates and uninspired conventions. We believe the modern web should evoke the emotional reverence of high architecture, luxury craft, and cutting-edge interactive physics.' },
    { q: 'How does an agency engagement kick off?', a: 'Every engagement begins with an intensive Strategic Immersion Sprint. We interrogate your brand DNA, map competitive whitespace, and establish an unassailable artistic and technical brief.' },
    { q: 'Do you collaborate with internal design and engineering teams?', a: 'Yes. We frequently embed as an elite creative acceleration squad, delivering turnkey flagships or comprehensive design token systems that in-house teams can scale effortlessly.' },
    { q: 'What is your typical project delivery timeline?', a: 'High-velocity bespoke flagships ship within 4–8 weeks; comprehensive corporate brand and multi-platform transformations typically span 8–14 weeks.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Services & Studio Capabilities"
        lines={['Bespoke craft.', { t: 'Unrivalled', c: 'text-lime' }, 'engineering.']}
        text="Four core disciplines cover the entire creative lifecycle — from visionary brand architecture to production-grade interactive spatial flagships."
      >
        <WaterButton to="/contact" variant="solid">Start a project <ArrowUpRight size={16} /></WaterButton>
      </PageHero>

      {/* Services Grid */}
      <section className="relative z-10 gutter py-24 bg-ink/40 backdrop-blur-[2px]">
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
      <section className="relative z-10 gutter py-28 bg-ink/30 backdrop-blur-[2px] border-y border-white/10">
        <SectionHead
          eyebrow="Quantified Impact Engine"
          lines={['Real performance.', 'Measurable prestige.']}
          text="We validate creative excellence through hard metrics: sub-second time to interactive, 3.4x average session dwell, and award-winning international recognition."
        />
        <AnalyticsGrid />
      </section>

      {/* Capabilities */}
      <section className="relative z-10 gutter py-28 bg-sand text-ink">
        <SectionHead light eyebrow="Agency Capabilities" lines={['Engineered for', 'global category leaders.']} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-[2rem] overflow-hidden">
          {PRODUCT_CAPABILITIES.map((f) => (
            <div key={f.t} className="bg-sand p-8 min-h-[240px] hover:bg-lime transition-colors duration-700 cursor-pointer" data-hot>
              <f.i size={24} className="mb-10 text-ink" />
              <h3 className="font-display font-extrabold text-2xl mb-2">{f.t}</h3>
              <p className="text-ink/65 text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink/50 backdrop-blur-[2px]">
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
    { i: Building2, t: 'Luxury & Haute Horlogerie', d: 'Digital flagships, interactive 3D product customizers, and sensory brand worlds for world-renowned maisons.', m: '+84% engagement', full: 'Multi-sensory WebGL materials replicate light reflection on platinum and sapphire glass with physical accuracy, boosting client dwell time and VIP appointments.' },
    { i: Music4, t: 'Spatial Computing & XR', d: 'Interactive 3D environments, virtual architectural walkthroughs, and spatial computing hubs for modern browsers and spatial vision.', m: '3.8× dwell time', full: 'Volumetric real-time rendering lets collectors and patrons explore spatial environments with zero latency, spatial audio, and photorealistic physics.' },
    { i: Hospital, t: 'Enterprise Deep Tech & AI', d: 'Translating complex neural models, quantum architectures, and telemetry infrastructure into captivating visual narratives.', m: '3.4× pipeline', full: 'We transform abstract technical density into clear, magnetic digital flagships that command respect from sovereign funds and enterprise buyers.' },
    { i: Factory, t: 'Mobility & Clean Energy', d: 'Next-gen vehicle configurators, interactive battery telemetry twins, and spatial design languages for tomorrow’s transport.', m: '120 FPS render', full: 'Full cinematic real-time 3D vehicle customization with dynamic lighting, material swaps, and seamless mobile-responsive performance.' },
    { i: GraduationCap, t: 'Culture & Contemporary Art', d: 'Virtual pavilions, digital museum flagships, and kinetic archival platforms for cultural institutions.', m: 'Global Awards', full: 'We craft immersive digital spaces for global biennials and leading galleries that preserve cultural heritage through kinetic interactive craft.' },
    { i: Plane, t: 'Financial Architecture & Crypto', d: 'Trust-evoking institutional platforms, kinetic market visualization engines, and bank-grade digital identity systems.', m: '99.99% uptime', full: 'Ultra-low latency data feeds combined with high-fashion typography and Swiss-inspired layout design for institutional asset managers.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Industry Expertise"
        lines={['Tailored craft.', { t: 'Across leading', c: 'text-aqua' }, 'sectors.']}
        text="From haute luxury and spatial computing to autonomous mobility and enterprise tech, we shape how forward-thinking sectors captivate global audiences."
      />
      <section className="relative z-10 gutter pb-28 bg-ink/50 backdrop-blur-[2px] pt-10">
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
  { n: 'Kinetix Spatial Deck', k: 'Luxury Spatial', s: '+184% Engagement', d: 'An interactive 3D digital flagship with real-time physical shaders and bespoke sound design.', c: 'from-lime/60 to-aqua/30' },
  { n: 'Kyoto Interactive Lab', k: 'Cultural XR', s: '3.2M Global Visitors', d: 'Generative digital twin and virtual exhibition celebrating contemporary kinetic sculpture.', c: 'from-aqua/60 to-lime/20' },
  { n: 'Horizon Deep Tech', k: 'Enterprise Brand', s: '3.4× Pipeline Lift', d: 'Complete brand architecture, design token system, and interactive developer platform.', c: 'from-coral/60 to-sand/20' },
  { n: 'Lumière Haute Couture', k: 'Flagship Commerce', s: '+76% AOV Growth', d: 'A high-fashion headless digital commerce experience with sub-second page transitions.', c: 'from-sand/50 to-aqua/30' },
];
export function CustomersPage() {
  return (
    <PageTransition>
      <PageHero eyebrow="Selected Case Studies" lines={['Proof, not', { t: 'promises.', c: 'text-lime' }]} text="A curated selection of digital flagships, spatial environments, and transformative brand platforms architected by Aura Studio." />
      <section className="relative z-10 gutter pb-28 bg-ink/50 backdrop-blur-[2px] pt-10">
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
                <p className="font-display font-extrabold text-5xl sm:text-6xl text-lime mb-4">{c.s}</p>
                <h3 className="font-display font-extrabold text-3xl mb-2">{c.n}</h3>
                <p className="text-sand/70 max-w-sm">{c.d}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>
      <section className="relative z-10 bg-ink/60 backdrop-blur-[2px]"><StatsBand /></section>
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink/50 backdrop-blur-[2px]">
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
    { q: 'How do studio partnership payments work?', a: 'Sprint engagements are structured as 50% upon project kickoff and 50% upon final delivery & code handoff. Studio Pod partnerships are billed as a monthly ongoing retainer.' },
    { q: 'What deliverables are included in a Flagship Sprint?', a: 'You receive complete visual design source files, interactive design token specifications, production-ready React/Vite/WebGL source code, and full launch assurance.' },
    { q: 'Can we transition from a Sprint to an ongoing Studio Pod?', a: 'Yes. Over 80% of our clients choose to continue with an ongoing Studio Pod retainer to continuously ship new product features, interactive campaigns, and brand expansions.' },
  ];
  return (
    <PageTransition>
      <PageHero eyebrow="Partnership Models" lines={['Bespoke tiers.', { t: 'Transformative', c: 'text-lime' }, 'results.']} text="Collaborate through focused high-velocity sprints, dedicated multidisciplinary studio pods, or enterprise venture transformations.">
        <div className="glass rounded-full p-1.5 flex">
          {[['Quarterly Retainer', false], ['Annual Partnership −20%', true]].map(([l, v]) => (
            <button key={l} id={`billing-${v ? 'yearly' : 'monthly'}`} onClick={() => setYearly(v)} className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 cursor-pointer ${yearly === v ? 'bg-lime text-ink' : 'text-sand/70'}`}>{l}</button>
          ))}
        </div>
      </PageHero>
      <section className="relative z-10 gutter py-16 bg-ink/50 backdrop-blur-[2px]"><PricingCards yearly={yearly} /></section>
      <section className="relative z-10 gutter py-28 bg-ink/40 backdrop-blur-[2px]">
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
      r: 'Executive Creative Director',
      img: '/images/amara.jpg',
      bio: 'Former Pentagram partner and spatial computing pioneer. Directs visual architecture and luxury brand narratives.',
      handle: '@amaralind'
    },
    {
      n: 'Rafael Duarte',
      r: 'Head of Creative Engineering',
      img: '/images/rafael.jpg',
      bio: 'Ex-MIT Media Lab fellow. Shipped real-time WebGL engines, spatial physics shaders, and low-latency micro-frontends.',
      handle: '@rafaduarte'
    },
    {
      n: 'Yuki Tanaka',
      r: 'Principal Experience Designer',
      img: '/images/yuki.jpg',
      bio: 'Tokyo Arts alumna specializing in kinetic typography, generative layout morphing, and fluid human interfaces.',
      handle: '@yukitanaka'
    },
    {
      n: 'Sam Okoye',
      r: 'VP of Design Systems',
      img: '/images/sam.jpg',
      bio: 'Ex-Apple Spatial designer. Obsessed with micro-interaction frictionlessness, design tokens, and sensory physics.',
      handle: '@samokoye'
    },
  ];

  const values = [
    {
      t: 'Visceral Craft',
      d: 'Every pixel, easing curve, and shader is obsessively refined. We reject generic templates to build digital work that stirs emotion.',
      img: '/images/human.jpg',
      badge: 'Uncompromising Art',
      tone: 'bg-lime text-ink'
    },
    {
      t: 'Creative Engineering',
      d: 'Artistry is hollow without technical mastery. We engineer sub-second web flagships with fluid 120 FPS transitions and zero lag.',
      img: '/images/clarity.jpg',
      badge: 'Zero Friction',
      tone: 'panel text-sand'
    },
    {
      t: 'Enduring Legacy',
      d: 'We build digital flagships and brand systems designed to withstand the test of time, outpacing ephemeral hype cycles.',
      img: '/images/lasting.jpg',
      badge: 'Timeless Design',
      tone: 'bg-aqua text-ink'
    },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Our Studio Philosophy"
        lines={['We believe', { t: 'digital craft', c: 'text-aqua' }, 'can move culture.']}
        text="Aura is an independent digital innovation and creative engineering studio founded by designers, technologists, and architects who refuse mediocrity."
      />

      <section className="relative z-10 bg-ink/60 backdrop-blur-[2px]"><StatsBand /></section>

      {/* Values */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-ink/50 backdrop-blur-[2px]">
        <SectionHead eyebrow="Studio Pillars" lines={['What guides', 'our hands.']} />
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

      {/* Leadership Team */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-sand text-ink">
        <SectionHead light eyebrow="Studio Leadership" lines={['The minds', 'behind Aura.']} />
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

/* ============================ PERSPECTIVES (JOURNAL PAGE) ============================ */
const POSTS = [
  {
    id: 1,
    t: 'The Death of the Flat Web: Why 2026 Belongs to Spatial Flagships',
    c: 'Editorial',
    d: 'Mar 12, 2026',
    r: '7 min',
    g: 'from-lime to-aqua',
    author: 'Amara Lindqvist',
    lead: 'Modern digital storefronts can no longer afford to feel like flat corporate brochures. The convergence of fluid WebGL shaders, kinetic typography, and real-time spatial physics is turning the web into a multi-sensory art gallery.',
    takeaways: [
      'Commoditized template sites suffer an 80% higher bounce rate than bespoke flagships.',
      'Web-based 3D spatial environments retain visitors for 3.4× longer on average.',
      'Bespoke creative engineering drives tangible valuation premiums for enterprise brands.'
    ],
    quote: 'The web is not paper. It is an infinite canvas of light, kinetic motion, and spatial presence.'
  },
  {
    id: 2,
    t: 'Engineering Emotion: The Mathematics of 120 FPS WebGL Shaders',
    c: 'Craft & Tech',
    d: 'Feb 27, 2026',
    r: '9 min',
    g: 'from-aqua to-sand',
    author: 'Rafael Duarte',
    lead: 'How we engineer real-time fractional Brownian motion shaders and volumetric lighting in GLSL to evoke luxury and intrigue without dropping a single frame.',
    takeaways: [
      'GPU shader calculations run entirely in parallel with zero main-thread jank.',
      'Dynamic resolution scaling ensures flawless 60–120 FPS performance across mobile hardware.',
      'Subtle interactive mouse ripple physics elevate user engagement by 45%.'
    ],
    quote: 'Precision is invisible. When motion feels natural, the viewer forgets the technology and feels the brand.'
  },
  {
    id: 3,
    t: 'Bespoke Brand Architecture: Designing for Category Dominance',
    c: 'Strategy',
    d: 'Feb 10, 2026',
    r: '6 min',
    g: 'from-coral to-lime',
    author: 'Yuki Tanaka',
    lead: 'Why the world’s most valuable companies treat digital presence as their premier flagship gallery rather than a marketing checklist.',
    takeaways: [
      'Design tokens and kinetic motion identities create immediate brand recognition.',
      'Fluid transitions keep visitors in an uninterrupted state of cognitive flow.',
      'A bespoke digital flagship delivers 3× more inbound qualified leads than outbound ads.'
    ],
    quote: 'In an era of AI-generated sameness, human craft and taste become the ultimate competitive moat.'
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
        eyebrow="Perspectives & Studio Dispatches"
        lines={['Ideas from', { t: 'the frontier', c: 'text-lime' }, 'of craft.']}
        text="Essays, technical deep-dives, and creative manifestos from the designers, engineers, and strategists at Aura Studio."
      />

      <section className="relative z-10 gutter py-16 bg-ink/50 backdrop-blur-[2px]">
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
                Read full essay <ArrowRight size={16} />
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
                  <span>// Aura Creative Studio</span>
                </div>

                {/* Modal Body */}
                <div className="mt-8 space-y-6 text-sand/80 leading-relaxed text-base sm:text-lg">
                  <p className="text-xl sm:text-2xl font-light text-sand leading-relaxed border-l-2 border-lime pl-4">
                    {activeArticle.lead}
                  </p>

                  <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-lime mb-4">Strategic Key Findings</h4>
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
                    Across millions of visitor interactions logged across our shipped flagships, the data confirms that creative boldness combined with technical rigor produces compounding brand equity. When an experience feels alive, audiences don't just browse — they advocate.
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

/* ============================ CONTACT (START A PROJECT) ============================ */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('Digital Flagship');

  return (
    <PageTransition>
      <PageHero eyebrow="Start a Collaboration" lines={['Let’s create something', { t: 'extraordinary.', c: 'text-aqua' }]} text="Tell us about your brand vision, target timeline, and goals. Our studio partners review every inquiry and reply within 24 hours." />
      <section className="relative z-10 gutter py-16 pb-32 bg-ink/50 backdrop-blur-[2px] grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7 panel rounded-[2rem] p-8 sm:p-12">
          {sent ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
              <span className="w-20 h-20 rounded-full bg-lime text-ink flex items-center justify-center mb-6"><Check size={36} /></span>
              <h3 className="font-display font-extrabold text-4xl mb-2">Inquiry Received.</h3>
              <p className="text-sand/60">A studio director will review your brief and schedule an executive discovery call within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-sand/50 mb-3">Project Type</p>
                <div className="flex flex-wrap gap-2">
                  {['Digital Flagship', 'Brand Architecture', 'Spatial Computing', 'Studio Pod Retainer'].map((t) => (
                    <button type="button" key={t} onClick={() => setTopic(t)} className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-500 cursor-pointer ${topic === t ? 'bg-lime text-ink border-lime' : 'border-white/15 text-sand/70 hover:border-lime'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input id="contact-name" required placeholder="Your full name" className="field" />
                <input id="contact-email" required type="email" placeholder="Business email" className="field" />
              </div>
              <input id="contact-company" placeholder="Brand / Organization name" className="field" />
              <textarea id="contact-message" required rows={6} placeholder="Tell us about your vision, target launch date, and budget expectations..." className="field resize-none" />
              <WaterButton type="submit" variant="solid" className="!px-10 !py-5">Submit Project Brief <ArrowUpRight size={18} /></WaterButton>
            </form>
          )}
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 space-y-4">
          {[[Mail, 'Direct Inquiries', 'partnerships@aura.studio'], [Phone, 'Studio Desk', '+1 (415) 890-2287'], [MapPin, 'Global Studios', 'Tokyo · Zurich · London · San Francisco']].map(([I, l, v]) => (
            <div key={l} className="panel rounded-3xl p-6 flex items-center gap-5 hover:border-lime/50 transition-colors duration-500">
              <span className="w-14 h-14 rounded-2xl bg-lime/15 text-lime flex items-center justify-center"><I size={22} /></span>
              <div><p className="font-mono text-[11px] uppercase tracking-widest text-sand/45">{l}</p><p className="font-display font-bold text-xl">{v}</p></div>
            </div>
          ))}
          <div className="rounded-3xl bg-aqua text-ink p-8">
            <p className="font-display font-extrabold text-3xl leading-tight">Prefer a direct design briefing?</p>
            <p className="mt-2 opacity-70">Schedule a 30-minute vision consultation with our Creative Director.</p>
            <WaterButton variant="dark" className="mt-6">Schedule Consultation <ArrowUpRight size={16} /></WaterButton>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
