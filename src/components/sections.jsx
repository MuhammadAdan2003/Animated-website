import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Quote, ArrowUpRight, Star } from 'lucide-react';
import { Heading, Reveal, WaterButton, Marquee, Magnetic, Eyebrow, Counter } from './ui.jsx';

/* ---------------- Page hero (inner pages) ---------------- */
export function PageHero({ eyebrow, lines, text, children }) {
  return (
    <section className="relative gutter pt-44 pb-20 sm:pb-28">
      <Eyebrow className="text-lime mb-8">{eyebrow}</Eyebrow>
      <Heading as="h1" lines={lines} className="font-display font-extrabold text-[clamp(3rem,9vw,9rem)] leading-[0.95] text-sand" />
      <div className="mt-10 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
        <Reveal delay={0.3} className="max-w-2xl text-lg sm:text-xl text-sand/65 leading-relaxed">{text}</Reveal>
        {children && <Reveal delay={0.4}>{children}</Reveal>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, lines, text, light = false, className = '' }) {
  return (
    <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 ${className}`}>
      <div>
        <Eyebrow className={`mb-6 ${light ? 'text-ink/70' : 'text-lime'}`}>{eyebrow}</Eyebrow>
        <Heading lines={lines} className={`font-display font-extrabold text-[clamp(2.4rem,6vw,5.5rem)] leading-[1] ${light ? 'text-ink' : 'text-sand'}`} />
      </div>
      {text && <Reveal className={`max-w-md text-lg leading-relaxed ${light ? 'text-ink/65' : 'text-sand/60'}`}>{text}</Reveal>}
    </div>
  );
}

import { LiveDashboard } from './charts.jsx';

/* ---------------- Dashboard mock (real interactive product visual) ---------------- */
export function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-gradient-to-r from-lime/15 via-aqua/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="relative glass rounded-[2.5rem] p-3 sm:p-5 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-coral/80" />
            <span className="w-3 h-3 rounded-full bg-lime/80" />
            <span className="w-3 h-3 rounded-full bg-aqua/80" />
            <span className="ml-3 font-mono text-[11px] text-sand/50">aura.app // telemetry // realtime-stream</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-mono text-[10px] text-lime uppercase tracking-widest">Connected (WebSockets: 14ms)</span>
          </div>
        </div>

        {/* Real Interactive Live Chart Engine */}
        <LiveDashboard />
      </div>

      <div className="hidden md:flex absolute -left-6 -bottom-6 glass rounded-2xl p-4 items-center gap-3 animate-float border border-white/10 shadow-xl backdrop-blur-xl">
        <span className="w-10 h-10 rounded-xl bg-lime/20 text-lime flex items-center justify-center font-bold">✓</span>
        <div>
          <p className="text-sm font-bold text-sand">Dynamic Airflow Optimized</p>
          <p className="text-xs text-sand/50">Saved 42% HVAC peak load</p>
        </div>
      </div>
      <div className="hidden md:flex absolute -right-6 -top-6 glass rounded-2xl p-4 items-center gap-3 animate-float border border-white/10 shadow-xl backdrop-blur-xl" style={{ animationDelay: '-3.5s' }}>
        <span className="w-10 h-10 rounded-xl bg-aqua/20 text-aqua flex items-center justify-center"><Check size={18} /></span>
        <div>
          <p className="text-sm font-bold text-sand">Live NeRF Twin Active</p>
          <p className="text-xs text-sand/50">12,400 sensor data points</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Logo cloud ---------------- */
const LOGOS = ['NORTHWIND', 'Halcyon®', 'KYOTO/LAB', 'Meridian', 'ORBITAL', 'Foundry+', 'Lumière', 'TERRAFORM', 'Atlas&Co', 'Nimbus'];
export function LogoCloud() {
  return (
    <section className="relative py-14 border-y border-white/10 bg-ink/50 backdrop-blur-sm">
      <p className="text-center font-mono text-[11px] tracking-[0.2em] uppercase text-sand/40 mb-8">Trusted by 1,800+ teams across 40 countries</p>
      <Marquee items={LOGOS} itemClass="font-display font-extrabold text-3xl text-sand/35 hover:text-lime transition-colors" />
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function StatsBand({ light = false }) {
  const stats = [
    { to: 1800, s: '+', l: 'Teams on Aura' },
    { to: 42, s: '%', l: 'Avg. energy reduction' },
    { to: 12, s: 'M', l: 'Sensors orchestrated' },
    { to: 99.99, s: '%', l: 'Platform uptime', d: 2 },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-current/10">
      {stats.map((s) => (
        <div key={s.l} className={`p-8 sm:p-12 ${light ? 'bg-sand text-ink border border-ink/10' : 'bg-ink2/80 border border-white/5'}`}>
          <Counter to={s.to} suffix={s.s} decimals={s.d || 0} className="font-display font-extrabold text-[clamp(2.6rem,6vw,6rem)] leading-none" />
          <p className={`mt-4 text-sm ${light ? 'text-ink/60' : 'text-sand/55'}`}>{s.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Testimonials ---------------- */
const QUOTES = [
  { q: 'Aura replaced four tools and cut our commissioning time from months to days. The simulation engine is genuinely uncanny.', n: 'Mira Okafor', r: 'VP Facilities, Northwind', c: 'bg-lime text-ink' },
  { q: 'We run 14 venues on a single live model. When a crowd surges, the space already knows what to do.', n: 'Daichi Mori', r: 'Head of Ops, Kyoto Lab', c: 'bg-ink3 text-sand' },
  { q: 'Beautiful, fast, and the API is a joy. Our engineers shipped a custom twin in a single sprint.', n: 'Elena Voss', r: 'CTO, Meridian', c: 'bg-sand text-ink' },
];
export function Testimonials() {
  return (
    <Reveal stagger={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      {QUOTES.map((t) => (
        <figure key={t.n} className={`rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[380px] ${t.c}`}>
          <div>
            <Quote size={34} className="opacity-60 mb-6" />
            <blockquote className="font-display font-bold text-2xl leading-snug tracking-tight">“{t.q}”</blockquote>
          </div>
          <figcaption className="mt-8 flex items-center gap-3">
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
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                <p className="pb-8 max-w-3xl text-sand/60 text-lg leading-relaxed">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Pricing ---------------- */
export const PLANS = [
  { name: 'Starter', m: 0, y: 0, d: 'For small teams exploring spatial intelligence.', f: ['1 building model', '50 connected sensors', 'Core simulation', 'Community support'], cta: 'Start free' },
  { name: 'Growth', m: 149, y: 119, d: 'For teams running multiple spaces in production.', f: ['Unlimited models', '5,000 sensors', 'Predictive automation', 'API & webhooks', 'Priority support'], cta: 'Start 14-day trial', hot: true },
  { name: 'Enterprise', m: null, y: null, d: 'For portfolios needing scale, security and SLAs.', f: ['Unlimited everything', 'SSO, SCIM & audit logs', 'On-prem / private cloud', 'Dedicated success team', '99.99% uptime SLA'], cta: 'Talk to sales' },
];
export function PricingCards({ yearly }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      {PLANS.map((p) => (
        <div key={p.name} className={`rounded-[2rem] p-8 sm:p-10 flex flex-col ${p.hot ? 'bg-lime text-ink' : 'panel'}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-extrabold text-3xl">{p.name}</h3>
            {p.hot && <span className="px-3 py-1 rounded-full bg-ink text-lime font-mono text-[10px] tracking-widest">POPULAR</span>}
          </div>
          <p className={`mt-3 ${p.hot ? 'text-ink/70' : 'text-sand/55'}`}>{p.d}</p>
          <div className="mt-8 flex items-end gap-2">
            {p.m === null ? (
              <span className="font-display font-extrabold text-6xl">Custom</span>
            ) : (
              <>
                <span className="font-display font-extrabold text-7xl leading-none">${yearly ? p.y : p.m}</span>
                <span className={`pb-2 ${p.hot ? 'text-ink/60' : 'text-sand/50'}`}>/ month</span>
              </>
            )}
          </div>
          <ul className="mt-8 space-y-3 flex-1">
            {p.f.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${p.hot ? 'bg-ink text-lime' : 'bg-lime/15 text-lime'}`}><Check size={12} /></span>
                {f}
              </li>
            ))}
          </ul>
          <WaterButton to="/contact" variant={p.hot ? 'dark' : 'ghost'} className="mt-10 w-full">{p.cta} <ArrowUpRight size={16} /></WaterButton>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Newsletter ---------------- */
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="panel rounded-[2rem] p-8 sm:p-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
      <div className="max-w-xl">
        <h3 className="font-display font-extrabold text-3xl sm:text-4xl">The Aura Dispatch</h3>
        <p className="text-sand/60 mt-3">One thoughtful email a month on spatial computing, smart buildings and the people shaping them.</p>
      </div>
      {done ? (
        <p className="text-lime font-bold flex items-center gap-2"><Check size={18} /> You’re on the list.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col sm:flex-row gap-3 w-full lg:w-[480px]">
          <input id="newsletter-email" required type="email" placeholder="you@company.com" className="field" />
          <WaterButton type="submit" variant="solid">Subscribe</WaterButton>
        </form>
      )}
    </div>
  );
}

/* ---------------- CTA band ---------------- */
export function CTABand() {
  return (
    <section className="relative z-10 bg-lime text-ink gutter py-28 sm:py-40 overflow-hidden">
      <div className="absolute -right-32 -top-32 w-[40rem] h-[40rem] rounded-full border-[3rem] border-ink/5" />
      <div className="absolute -right-10 -bottom-48 w-[30rem] h-[30rem] rounded-full border-[2rem] border-ink/5" />
      <Eyebrow className="text-ink/70 mb-8">Ready when you are</Eyebrow>
      <Heading as="h2" lines={['Build spaces that', 'think for themselves.']} className="font-display font-extrabold text-[clamp(3rem,9vw,9.5rem)] leading-[0.95]" />
      <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-4">
        <Magnetic><WaterButton to="/contact" variant="dark" className="!px-10 !py-5 text-base">Start for free <ArrowUpRight size={18} /></WaterButton></Magnetic>
        <WaterButton to="/pricing" variant="light" className="!px-10 !py-5 text-base border border-ink/20">See pricing</WaterButton>
      </Reveal>
    </section>
  );
}

export function Stars() {
  return <span className="flex gap-0.5 text-lime">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</span>;
}
