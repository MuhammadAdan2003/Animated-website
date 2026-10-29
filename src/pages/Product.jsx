import React from 'react';
import {
  ArrowUpRight,
  Monitor,
  Box,
  Server,
  Sparkles,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { PageTransition, Reveal, WaterButton, CardSmoke } from '../components/ui.jsx';
import { PageHero, SectionHead, FAQ, CTABand } from '../components/sections.jsx';

export const PRODUCT_CAPABILITIES = [
  { i: Monitor, t: 'Full-Stack Web Apps', d: 'High-performance Next.js 15, React 19, and progressive web apps engineered for sub-second LCP and high conversion.' },
  { i: Box, t: 'Custom Enterprise Software', d: 'Scalable multi-tenant SaaS platforms, internal ERP/CRM workflow engines, and mission-critical transactional software.' },
  { i: Server, t: 'Cloud Microservices & APIs', d: 'High-throughput GraphQL, gRPC, and REST API architectures written in Go, Node.js, and Rust with zero bottlenecks.' },
  { i: Sparkles, t: 'AI Engineering & Agents', d: 'Proprietary LLM integrations, autonomous AI agents, intelligent vector search engines, and automated data pipelines.' },
  { i: Layers, t: 'Interactive WebGL & 3D Web', d: 'Bespoke 3D WebGL experiences, interactive product customizers, and GPU-accelerated shader engines running at 120 FPS.' },
  { i: Cpu, t: 'DevOps & Multi-Region Cloud', d: 'Kubernetes orchestration, automated CI/CD canary pipelines, Docker containerization, and automated auto-scaling.' },
  { i: Database, t: 'Distributed Database Systems', d: 'PostgreSQL sharding, Redis in-memory caching clusters, Vector databases, and sub-millisecond query optimization.' },
  { i: ShieldCheck, t: 'Enterprise Security & SOC 2', d: 'Bank-grade zero-trust encryption, penetration testing, compliance assurance, and dedicated 99.999% SLA support.' },
];

export default function ProductPage() {
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
                <h3 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{m.t}</h3>
                <p className="text-base sm:text-lg leading-relaxed max-w-md opacity-80">{m.d}</p>
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

export { ProductPage };

