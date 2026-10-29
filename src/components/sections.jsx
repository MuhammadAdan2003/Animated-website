import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Quote, ArrowUpRight, Star } from 'lucide-react';
import { Heading, Reveal, WaterButton, Marquee, Magnetic, Eyebrow, Counter, CardSmoke } from './ui.jsx';

/* ---------------- Page hero (inner pages) ---------------- */
export function PageHero({ eyebrow, lines, text, children, className = '' }) {
  return (
    <section className={`relative gutter pt-36 sm:pt-48 pb-18 sm:pb-24 overflow-hidden ${className}`}>
      {/* Background Subtle Ambient Aura Glow (Zero-Cost Radial Gradient) */}
      <div
        className="pointer-events-none absolute top-16 left-1/4 w-[38rem] h-[24rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.11) 0%, transparent 70%)' }}
      />

      <Reveal y={15} delay={0.08}>
        <Eyebrow className="text-lime mb-6">{eyebrow}</Eyebrow>
      </Reveal>
      <Heading
        as="h1"
        lines={lines}
        className="font-display font-extrabold text-[clamp(2.35rem,8.4vw,9.2rem)] leading-[0.98] tracking-[-0.035em] text-sand"
      />
      <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
        <Reveal delay={0.2} className="max-w-2xl text-lg sm:text-xl text-sand/70 leading-relaxed font-normal">
          {text}
        </Reveal>
        {children && <Reveal delay={0.28} className="shrink-0">{children}</Reveal>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, lines, text, light = false, className = '' }) {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 ${className}`}>
      <div>
        <Eyebrow className={`mb-6 ${light ? 'text-ink/70' : 'text-lime'}`}>{eyebrow}</Eyebrow>
        <Heading lines={lines} className={`font-display font-extrabold text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] ${light ? 'text-ink' : 'text-sand'}`} />
      </div>
      {text && <Reveal className={`max-w-md text-lg leading-relaxed ${light ? 'text-ink/65' : 'text-sand/60'}`}>{text}</Reveal>}
    </div>
  );
}

/* ---------------- Dashboard mock (removed per user request) ---------------- */
export function DashboardMock() {
  return null;
}

/* ---------------- Logo cloud ---------------- */
const LOGOS = ['NORTHWIND', 'Halcyon®', 'KYOTO LAB', 'Meridian', 'ORBITAL', 'Foundry+', 'Lumière', 'TERRAFORM', 'Atlas&Co', 'Balenciaga Studio', 'Monolith'];
export function LogoCloud() {
  return (
    <section className="relative py-14 border-y border-white/10 bg-transparent">
      <p className="text-center font-mono text-[11px] tracking-[0.2em] uppercase text-sand/40 mb-8">Trusted by visionary tech founders, enterprise leaders & scaling startups</p>
      <Marquee items={LOGOS} itemClass="font-display font-extrabold text-3xl text-sand/35 hover:text-lime transition-colors" />
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function StatsBand({ light = false }) {
  const stats = [
    { to: 140, s: '+', l: 'Global Web & Software Awards' },
    { to: 99.9, s: '%', l: 'Production SLA & Uptime Record', d: 1 },
    { to: 450, s: 'M', l: 'Monthly API Requests Handled' },
    { to: 4.9, s: '★', l: 'Client Satisfaction Rating', d: 1 },
  ];
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-transparent text-sand p-5"
      style={{ backgroundColor: 'rgb(5 10 10 / 0.5)' }}
    >
      {stats.map((s) => (
        <div key={s.l} className="bg-transparent min-w-0">
          <Counter to={s.to} suffix={s.s} decimals={s.d || 0} className="font-display font-extrabold text-[clamp(2.15rem,6vw,6rem)] leading-none bg-transparent" />
          <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${light ? 'text-ink/60' : 'text-sand/55'}`}>{s.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Testimonials ---------------- */
const QUOTES = [
  { q: 'Aura completely modernized our customer platform into a blistering, high-converting digital web flagship. Page load dropped to 0.4s and enterprise conversions tripled within 60 days of launch.', n: 'Julian Sterling', r: 'Chief Technology Officer, Kinetix Luxury', c: 'bg-lime text-ink card-smoke-light', tone: 'light' },
  { q: 'The full-stack engineering rigor here is unmatched. They delivered distributed microservices, a custom React 19 design system, and sub-second APIs with zero technical compromises.', n: 'Aya Takahashi', r: 'VP of Engineering, Kyoto Systems', c: 'bg-[#091514] text-sand border border-white/10 card-smoke', tone: 'dark' },
  { q: 'Collaborating with Aura felt like having the world’s elite software engineering minds in our corner. They push the boundaries of modern web applications while obsessing over clean architecture.', n: 'Marc Vance', r: 'Founder & CEO, Horizon Cloud', c: 'bg-sand text-ink card-smoke-light', tone: 'light' },
];
export function Testimonials() {
  return (
    <Reveal stagger={0.12} className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
      {QUOTES.map((t) => (
        <figure
          key={t.n}
          data-hot
          className={`group rounded-[2.2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ${t.c}`}
        >
          <CardSmoke tone={t.tone} />
          <div className="relative z-10">
            <Quote size={34} className="opacity-60 mb-6" />
            <blockquote className="font-display font-bold text-2xl leading-snug tracking-tight">“{t.q}”</blockquote>
          </div>
          <figcaption className="relative z-10 mt-8 flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-current/20 flex items-center justify-center font-bold border border-current/20">{t.n[0]}</span>
            <span><span className="block font-bold">{t.n}</span><span className="text-sm opacity-60">{t.r}</span></span>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((it, i) => (
        <div key={it.q}>
          <button id={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-6 py-7 text-left group">
            <span className="font-display font-bold text-xl sm:text-3xl tracking-tight group-hover:text-lime transition-colors">{it.q}</span>
            <span className={`shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center transition-all duration-500 ${open === i ? 'bg-lime text-ink rotate-180 border-lime' : ''}`}>
              {open === i ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                <p className="pb-8 max-w-3xl text-sand/60 text-lg leading-relaxed">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Partnership Models / Pricing ---------------- */
export const PLANS = [
  { name: 'Web Flagship Sprint', m: 18500, y: 16000, d: 'For startups & brands launching high-performance web applications, SaaS MVPs, or brand flagships.', f: ['4-week high-velocity engineering sprint', 'Dedicated Lead Full-Stack & UI/UX Engineer', 'Next.js 15, React 19 & bespoke WebGL shaders', 'Core Web Vitals optimization (<0.6s LCP, 100 Perf)', 'Production source code, CI/CD pipeline & docs'], cta: 'Inquire for Sprint' },
  { name: 'Dedicated Engineering Pod', m: 32000, y: 28000, d: 'Our flagship embedded agency partnership for high-growth tech companies & enterprise products.', f: ['Full multidisciplinary pod (Lead, Frontend, Backend, DevOps)', 'Continuous sprint delivery & roadmap execution', 'Custom software, microservices & AI automation', 'Private Slack war-room & daily standups', 'Unlimited code reviews & performance audits'], cta: 'Book Engineering Pod', hot: true },
  { name: 'Enterprise Transformation', m: null, y: null, d: 'For enterprise organizations modernizing legacy monolithic software into distributed cloud systems.', f: ['Comprehensive multi-quarter cloud transformation', 'End-to-end cloud architecture & distributed microservices', 'Custom enterprise software & AI workflow pipelines', 'Global multi-region cloud deployment & SOC 2 compliance', 'Executive technical directorship & team training'], cta: 'Request Technical Briefing' },
];
export function PricingCards({ yearly }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
      {PLANS.map((p) => (
        <div
          key={p.name}
          data-hot
          className={`rounded-[2.2rem] p-8 sm:p-10 flex flex-col shadow-xl hover:-translate-y-2 transition-all duration-500 ${p.hot ? 'bg-lime text-ink card-smoke-light' : 'panel card-smoke'
            }`}
        >
          <CardSmoke tone={p.hot ? 'light' : 'dark'} />
          <div className="relative z-10 flex items-center justify-between">
            <h3 className="font-display font-extrabold text-3xl">{p.name}</h3>
            {p.hot && <span className="px-3 py-1 rounded-full bg-transparent text-lime font-mono text-[10px] tracking-widest uppercase">MOST REQUESTED</span>}
          </div>
          <p className={`relative z-10 mt-3 ${p.hot ? 'text-ink/70' : 'text-sand/55'}`}>{p.d}</p>
          <div className="relative z-10 mt-8 flex items-end gap-2">
            {p.m === null ? (
              <span className="font-display font-extrabold text-4xl sm:text-6xl">Bespoke</span>
            ) : (
              <>
                <span className="font-display font-extrabold text-4xl sm:text-6xl leading-none">${(yearly ? p.y : p.m).toLocaleString()}</span>
                <span className={`pb-1 sm:pb-2 text-sm sm:text-base ${p.hot ? 'text-ink/60' : 'text-sand/50'}`}>/ {p.name.includes('Sprint') ? 'sprint' : 'month'}</span>
              </>
            )}
          </div>
          <ul className="relative z-10 mt-8 space-y-3 flex-1">
            {p.f.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${p.hot ? 'bg-transparent text-lime' : 'bg-lime/15 text-lime'}`}><Check size={12} /></span>
                {f}
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-10">
            <WaterButton to="/contact" variant={p.hot ? 'dark' : 'ghost'} className="w-full">{p.cta} <ArrowUpRight size={16} /></WaterButton>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Newsletter ---------------- */
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="panel card-smoke rounded-[2.2rem] p-8 sm:p-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between shadow-xl">
      <CardSmoke tone="dark" />
      <div className="relative z-10 max-w-xl">
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl">The Engineering Perspective</h3>
        <p className="text-sand/60 mt-3">Monthly curated essays on modern web architecture, Next.js / React 19, distributed cloud infrastructure, and generative AI engineering.</p>
      </div>
      {done ? (
        <p className="relative z-10 text-lime font-bold flex items-center gap-2"><Check size={18} /> Welcome to the developer circle.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-[500px]">
          <input id="newsletter-email" required type="email" placeholder="you@techcompany.com" className="field h-14" />
          <WaterButton type="submit" variant="solid" className="shrink-0">Join dispatch <ArrowUpRight size={16} /></WaterButton>
        </form>
      )}
    </div>
  );
}

/* ---------------- CTA band ---------------- */
export function CTABand() {
  return (
    <section className="relative z-10 bg-lime text-ink gutter py-28 sm:py-40 overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 w-[40rem] h-[40rem] rounded-full border-[3rem] border-ink/5" />
      <div className="pointer-events-none absolute -right-10 -bottom-48 w-[30rem] h-[30rem] rounded-full border-[2rem] border-ink/5" />
      <div className="relative z-10">
        <Eyebrow className="text-ink/70 mb-8">Ready to engineer what comes next?</Eyebrow>
        <Heading as="h2" lines={['Let’s build something', 'extraordinary together.']} className="font-display font-extrabold text-[clamp(2.35rem,9vw,9.5rem)] leading-[0.95]" />
        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <WaterButton to="/contact" variant="dark">
              Start a project <ArrowUpRight size={17} />
            </WaterButton>
          </Magnetic>
          <Magnetic>
            <WaterButton to="/pricing" variant="light">
              View engineering models <ArrowUpRight size={17} />
            </WaterButton>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export function Stars() {
  return <span className="flex gap-0.5 text-lime">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</span>;
}
