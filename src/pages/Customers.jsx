import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition, Reveal, CardSmoke } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, Testimonials, CTABand } from '../components/sections.jsx';

export const CASES = [
  {
    n: 'Kinetix Web Platform',
    k: 'Headless Web App',
    s: '+310% Speed Lift',
    d: 'A high-performance Next.js 15 web application with real-time 3D WebGL product configurators and 0.4s LCP.',
    img: '/images/work1.jpg',
    c: 'from-lime/40 to-aqua/20',
  },
  {
    n: 'CloudSphere Microservices',
    k: 'Distributed Cloud',
    s: '48M Daily Requests',
    d: 'High-concurrency microservices mesh with automated multi-region Kubernetes routing and sub-10ms speed.',
    img: '/images/work2.jpg',
    c: 'from-aqua/40 to-lime/15',
  },
  {
    n: 'Apex FinTech Terminal',
    k: 'Real-Time Trading',
    s: '4ms Response Time',
    d: 'Ultra-high speed institutional trading web application with real-time WebSocket feeds and Rust WASM compute.',
    img: '/images/work3.jpg',
    c: 'from-coral/40 to-sand/15',
  },
  {
    n: 'Nexus AI Enterprise Portal',
    k: 'Agentic SaaS',
    s: '3.8× Workflow Lift',
    d: 'Autonomous AI agent orchestration platform with custom vector embeddings and real-time collaborative canvas.',
    img: '/images/work4.jpg',
    c: 'from-sand/30 to-aqua/20',
  },
];

export default function CustomersPage() {
  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        {/* Page-Level Ambient Light Enhancements */}
        <div
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[60rem] h-[34rem] rounded-full blur-[130px] opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(200,255,77,0.24) 0%, rgba(77,232,207,0.14) 45%, transparent 75%)',
          }}
        />
        <div
          className="pointer-events-none absolute top-[38%] -left-[12%] w-[42rem] h-[36rem] rounded-full blur-[140px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(77,232,207,0.22) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute top-[62%] -right-[12%] w-[45rem] h-[36rem] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.20) 0%, transparent 70%)' }}
        />

        <PageHero
          eyebrow="Selected Work"
          lines={['Software proof,', { t: 'not promises.', c: 'text-lime' }]}
          text="A curated selection of production web applications, scalable cloud platforms, and transformative enterprise software engineered by Aura."
        />

        <section className="relative z-10 gutter pb-28 bg-transparent pt-10">
          <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CASES.map((c, i) => (
              <article
                key={c.n}
                data-hot
                className={`group relative rounded-[2rem] overflow-hidden min-h-[480px] p-8 sm:p-10 flex flex-col justify-between panel card-smoke cursor-pointer border border-white/10 hover:border-lime/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_90px_rgba(200,255,77,0.14)] hover:-translate-y-2 transition-all duration-700 ${
                  i % 2 ? 'md:mt-20' : ''
                }`}
              >
                {/* Volumetric Card Lighting Highlights */}
                <CardSmoke tone="dark" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-lime/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-lime/20 blur-[75px] opacity-30 group-hover:opacity-90 group-hover:scale-125 transition-all duration-700" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-aqua/20 blur-[75px] opacity-25 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700" />

                {/* Rich Photographic Backdrop with Ambient Gradients */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.n}
                    className="w-full h-full object-cover opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.c} opacity-30 group-hover:opacity-60 transition-opacity duration-1000`}
                  />
                  <div className="absolute inset-0 dots opacity-40" />
                </div>

                {/* Top Architectural Badge & Action Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-ink/85 backdrop-blur-md border border-white/20 group-hover:border-lime/45 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                      <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sand/90">
                        {c.k}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-sand/40 hidden sm:inline-block">
                      0{i + 1}
                    </span>
                  </div>

                  <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-sand text-ink flex items-center justify-center group-hover:bg-lime group-hover:rotate-45 group-hover:shadow-[0_0_28px_rgba(200,255,77,0.6)] transition-all duration-500 shrink-0">
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                {/* Editorial Impact Metrics & Case Info */}
                <div className="relative z-10">
                  <p className="font-display font-extrabold text-5xl sm:text-6xl text-lime mb-4 drop-shadow-[0_0_25px_rgba(200,255,77,0.25)]">
                    {c.s}
                  </p>
                  <h3 className="font-display font-extrabold text-3xl mb-2 text-sand group-hover:text-sand transition-colors">
                    {c.n}
                  </h3>
                  <p className="text-sand/75 max-w-sm leading-relaxed text-sm sm:text-base">{c.d}</p>
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
      </div>
    </PageTransition>
  );
}

export { CustomersPage };

