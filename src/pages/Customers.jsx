import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageTransition, Reveal, CardSmoke } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, Testimonials, CTABand } from '../components/sections.jsx';

export const CASES = [
  { n: 'Kinetix Web Platform', k: 'Headless Web App', s: '+310% Speed Lift', d: 'A high-performance Next.js 15 web application with real-time 3D WebGL product configurators and 0.4s LCP.', c: 'from-lime/60 to-aqua/30' },
  { n: 'CloudSphere Microservices', k: 'Distributed Cloud', s: '48M Daily Requests', d: 'High-concurrency microservices mesh with automated multi-region Kubernetes routing and sub-10ms latency.', c: 'from-aqua/60 to-lime/20' },
  { n: 'Apex FinTech Terminal', k: 'Real-Time Trading', s: '4ms Feed Latency', d: 'Ultra-low latency institutional trading web application with real-time WebSocket feeds and Rust WASM compute.', c: 'from-coral/60 to-sand/20' },
  { n: 'Nexus AI Enterprise Portal', k: 'Agentic SaaS', s: '3.8× Workflow Lift', d: 'Autonomous AI agent orchestration platform with custom vector embeddings and real-time collaborative canvas.', c: 'from-sand/50 to-aqua/30' },
];

export default function CustomersPage() {
  return (
    <PageTransition>
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
              className={`group relative rounded-[2rem] overflow-hidden min-h-[480px] p-8 sm:p-10 flex flex-col justify-between panel card-smoke cursor-pointer hover:-translate-y-2 transition-all duration-700 ${i % 2 ? 'md:mt-20' : ''}`}
            >
              <CardSmoke tone="dark" />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.c} opacity-30 group-hover:opacity-70 transition-opacity duration-1000`} />
              <div className="absolute inset-0 dots opacity-60" />
              <div className="relative z-10 flex justify-between">
                <span className="glass rounded-full px-4 py-1.5 font-mono text-xs">{c.k}</span>
                <span className="w-12 h-12 rounded-full bg-sand text-ink flex items-center justify-center group-hover:rotate-45 transition-transform duration-700">
                  <ArrowUpRight size={20} />
                </span>
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

export { CustomersPage };

