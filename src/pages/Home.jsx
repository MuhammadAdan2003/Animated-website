import React from 'react';
import { ArrowUpRight, Play, Code2, Cpu, Workflow, Sparkles } from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic } from '../components/ui.jsx';
import { DashboardMock, LogoCloud, StatsBand, Testimonials, SectionHead, CTABand, Newsletter } from '../components/sections.jsx';
import { SpaceExplorer, NeuralSpatialCore, AnimatedGeometricCircles } from '../components/wow.jsx';

export const FEATURES = [];

export default function HomePage() {
  return (
    <PageTransition>
      {/* HERO — MONUMENTAL EDITORIAL HEADLINE WITH ANIMATED ORBITAL CIRCLES */}
      <section className="relative gutter pt-36 sm:pt-48 pb-20 sm:pb-28 min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Background Ambient Aura Glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/3 w-[36rem] h-[24rem] bg-lime/10 blur-[130px] rounded-full" />

        {/* Ambient Animated Concentric Orbital Circles (Subtle Hypnotic Depth) */}
        <div className="pointer-events-none absolute right-[-8%] sm:right-[2%] top-[38%] -translate-y-1/2 w-[480px] sm:w-[600px] h-[480px] sm:h-[600px] flex items-center justify-center opacity-30 sm:opacity-45">
          <AnimatedGeometricCircles size={560} />
        </div>

        {/* Top Eyebrow Badge */}
        <Reveal y={15} delay={0.1} className="relative z-10 mb-7">
          <span className="glass inline-flex items-center gap-3 rounded-full pl-2.5 pr-5 py-2 text-xs sm:text-sm cursor-pointer hover:border-lime/40 transition-colors" data-hot>
            <span className="px-3 py-1 rounded-full bg-lime text-ink font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ink animate-ping" />
              AURA 2026
            </span>
            <span className="text-sand/90 font-medium">Software Engineering & Digital Web Agency</span>
            <ArrowUpRight size={14} className="text-lime" />
          </span>
        </Reveal>

        {/* Monumental Impact Heading — Full Width & Grand Typography with Solid Colors */}
        <Heading
          as="h1"
          lines={[
            'Architecting software.',
            { t: 'Engineering the web.', c: 'text-lime' },
            'Scaling ventures.',
          ]}
          className="relative z-10 font-display font-extrabold text-[clamp(3.3rem,9.4vw,11rem)] leading-[0.92] tracking-[-0.04em] text-sand"
        />

        {/* Editorial Narrative & Direct Action Controls */}
        <div className="relative z-10 mt-10 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
          <Reveal delay={0.25} className="max-w-2xl text-lg sm:text-xl text-sand/70 leading-relaxed font-normal">
            We partner with ambitious founders and global category leaders to build sub-second digital flagships, scalable multi-tenant cloud platforms, and autonomous AI systems with unmistakable digital craft.
          </Reveal>
          <Reveal delay={0.35} className="flex flex-wrap items-center gap-4 shrink-0">
            <Magnetic>
              <WaterButton to="/contact" variant="solid" className="!px-9 !py-5 text-base shadow-[0_0_30px_rgba(200,255,77,0.35)]">
                Start a project <ArrowUpRight size={18} />
              </WaterButton>
            </Magnetic>
            <WaterButton to="/product" variant="ghost" className="!px-9 !py-5 text-base">
              <Play size={16} fill="currentColor" /> Explore engineering
            </WaterButton>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT VISUAL - REAL INTERACTIVE CHARTS & TELEMETRY */}
      <section className="relative z-10 gutter pb-28">
        <Reveal y={40} delay={0.1}><DashboardMock /></Reveal>
      </section>

      <LogoCloud />

      {/* 1. AWWWARDS STICKY SCROLL-OVERLAP DECK */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-ink/40 backdrop-blur-[2px] border-t border-white/5">
        <SectionHead
          eyebrow="Core Software & Web Disciplines"
          lines={['Engineered for speed.', 'Built to scale.']}
          text="Scroll through our four core engineering pillars — from high-velocity web flagships and scalable SaaS to autonomous AI agents and 120Hz mobile apps."
        />
        <NeuralSpatialCore />
      </section>

      {/* 2. AWWWARDS HORIZONTAL SCROLL REEL & KINETIC CAPABILITIES */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-ink/30 backdrop-blur-[2px] border-t border-white/5">
        <SectionHead
          eyebrow="Selected Flagships & Architecture"
          lines={['Craft in motion.', 'Proven at scale.']}
          text="Glide through our recent production flagships and explore our full-stack capabilities engineered for global category leaders."
        />
        <SpaceExplorer />
      </section>

      {/* HOW IT WORKS / METHODOLOGY — ENHANCED CARDS */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-sand text-ink">
        <SectionHead
          light
          eyebrow="Our Methodology"
          lines={['From product architecture', 'to production scale.']}
          text="Three disciplined phases transform complex software visions into production-grade digital flagships."
        />
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              n: '01',
              t: 'Architecture & Strategy',
              d: 'We dissect your product vision, architect resilient multi-region cloud topology, and select optimal tech stacks for high concurrency.',
              i: Code2,
              tag: 'Weeks 1–2 · Foundation'
            },
            {
              n: '02',
              t: 'High-Craft Engineering',
              d: 'Next.js 15, React 19, Go microservices, and bespoke interactive WebGL shaders meticulously engineered with zero technical debt.',
              i: Cpu,
              tag: 'Weeks 3–6 · Production Code'
            },
            {
              n: '03',
              t: 'Cloud Scale & Assurance',
              d: 'Sub-second global performance, automated CI/CD canary deployments, SOC-2 grade security, and 99.999% uptime assurance.',
              i: Workflow,
              tag: 'Ongoing · 99.999% SLA'
            },
          ].map((s) => (
            <div
              key={s.n}
              data-hot
              className="group relative rounded-[2.2rem] bg-[#071311] text-sand p-8 sm:p-10 min-h-[380px] flex flex-col justify-between border border-white/10 hover:border-lime/60 shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(200,255,77,0.2)] transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Subtle ambient card glow on hover */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-lime/10 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <span className="font-display font-extrabold text-7xl text-lime tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {s.n}
                </span>
                <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-aqua group-hover:bg-lime group-hover:text-ink transition-all duration-300">
                  <s.i size={24} />
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-sand/50 mb-2">
                  {s.tag}
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl mb-3 text-sand group-hover:text-lime transition-colors duration-300">
                  {s.t}
                </h3>
                <p className="text-sand/65 text-sm sm:text-base leading-relaxed">
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* STATS */}
      <section className="relative z-10 bg-ink/60 backdrop-blur-[2px]">
        <StatsBand />
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-ink/50 backdrop-blur-[2px]">
        <SectionHead eyebrow="Client Recognition" lines={['Loved by founders', 'and engineering leaders.']} />
        <Testimonials />
      </section>

      <section className="relative z-10 gutter pb-28 bg-ink/50 backdrop-blur-[2px]"><Newsletter /></section>
      <CTABand />
    </PageTransition>
  );
}
