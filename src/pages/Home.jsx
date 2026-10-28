import React from 'react';
import { ArrowUpRight, Play, Code2, Cpu, Workflow } from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic, CardSmoke } from '../components/ui.jsx';
import { LogoCloud, StatsBand, Testimonials, SectionHead, CTABand, Newsletter } from '../components/sections.jsx';
import { SpaceExplorer, NeuralSpatialCore, AnimatedGeometricCircles, HeroExpandShowcase } from '../components/wow.jsx';

export const FEATURES = [];

export default function HomePage() {
  return (
    <PageTransition>
      {/* HERO — MONUMENTAL EDITORIAL HEADLINE + FULL-SCREEN SCROLL-EXPANDING SHOWCASE */}
      <section className="relative pt-32 sm:pt-40 pb-0">
        <div className="relative gutter">
          {/* Background Ambient Aura Glow */}
          <div
            className="pointer-events-none absolute top-16 left-1/4 w-[42rem] h-[28rem] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.11) 0%, transparent 70%)' }}
          />

          {/* Ambient Animated Concentric Orbital Circles */}
          <div className="pointer-events-none absolute right-[-8%] sm:right-[2%] top-[22rem] -translate-y-1/2 w-[480px] sm:w-[600px] h-[480px] sm:h-[600px] flex items-center justify-center opacity-30 sm:opacity-45">
            <AnimatedGeometricCircles size={560} />
          </div>

          {/* Top Eyebrow Badge */}
          <Reveal y={15} delay={0.08} className="relative z-10 mb-6">
            <span className="glass inline-flex items-center gap-3 rounded-full pl-2.5 pr-5 py-2 text-xs sm:text-sm cursor-pointer hover:border-lime/40 transition-colors" data-hot>
              <span className="px-3 py-1 rounded-full bg-lime text-ink font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink animate-ping" />
                AURA 2026
              </span>
              <span className="text-sand/90 font-medium">Software Engineering & Digital Web Agency</span>
              <ArrowUpRight size={14} className="text-lime" />
            </span>
          </Reveal>

          {/* Monumental Impact Heading — Solid Colors */}
          <Heading
            as="h1"
            lines={[
              'Architecting software.',
              { t: 'Engineering the web.', c: 'text-lime' },
              'Scaling ventures.',
            ]}
            className="relative z-10 font-display font-extrabold text-[clamp(3.2rem,8.8vw,10.2rem)] leading-[0.98] tracking-[-0.035em] text-sand"
          />

          {/* Editorial Narrative & Uniform Action Controls */}
          <div className="relative z-10 mt-8 sm:mt-10 flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
            <Reveal delay={0.2} className="max-w-2xl text-lg sm:text-xl text-sand/70 leading-relaxed font-normal">
              We partner with ambitious founders and global category leaders to build sub-second digital flagships, scalable multi-tenant cloud platforms, and autonomous AI systems with unmistakable digital craft.
            </Reveal>
            <Reveal delay={0.28} className="flex flex-wrap items-center gap-4 shrink-0">
              <Magnetic>
                <WaterButton to="/contact" variant="solid" className="shadow-[0_0_30px_rgba(200,255,77,0.3)]">
                  Start a project <ArrowUpRight size={17} />
                </WaterButton>
              </Magnetic>
              <Magnetic>
                <WaterButton to="/product" variant="ghost">
                  <Play size={15} fill="currentColor" /> Explore engineering
                </WaterButton>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        {/* FULL-WIDTH SCROLL-EXPANDING HERO IMAGE SHOWCASE */}
        <div className="relative z-10 mt-10 sm:mt-12 w-full">
          <HeroExpandShowcase />
        </div>
      </section>

      <LogoCloud />

      {/* 1. AWWWARDS STICKY SCROLL-OVERLAP DECK */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-transparent border-t border-white/5">
        <SectionHead
          eyebrow="Core Software & Web Disciplines"
          lines={['Engineered for speed.', 'Built to scale.']}
          text="Scroll through our four core engineering pillars — from high-velocity web flagships and scalable SaaS to autonomous AI agents and 120Hz mobile apps."
        />
        <NeuralSpatialCore />
      </section>

      {/* 2. FULL-WIDTH UNBOXED STICKY HORIZONTAL SCROLL REEL & KINETIC CAPABILITIES */}
      <section className="relative z-10 py-24 sm:py-32 bg-transparent border-t border-white/5">
        <div className="gutter">
          <SectionHead
            eyebrow="Selected Flagships & Architecture"
            lines={['Craft in motion.', 'Proven at scale.']}
            text="Glide through our recent production flagships and explore our full-stack capabilities engineered for global category leaders."
          />
        </div>
        <SpaceExplorer />
      </section>

      {/* HOW IT WORKS / METHODOLOGY — ENHANCED INTERACTIVE CARDS WITH MULTI-LAYER HOVER EFFECTS */}
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
              tag: 'Weeks 1–2 · Foundation',
              status: 'SYSTEM BLUEPRINT',
              metric: '100%',
              metricSub: 'Zero-Debt RFC Spec',
              pipeline: ['DISCOVERY', 'TOPOLOGY', 'API MESH'],
              chips: ['System Design', 'Cloud Topology', 'Data Modeling', 'Security Audit'],
            },
            {
              n: '02',
              t: 'High-Craft Engineering',
              d: 'Next.js 15, React 19, Go microservices, and bespoke interactive WebGL shaders meticulously engineered with zero technical debt.',
              i: Cpu,
              tag: 'Weeks 3–6 · Production Code',
              status: 'FULL-STACK BUILD',
              metric: '120 FPS',
              metricSub: '0.3s LCP Edge Hydration',
              pipeline: ['REACT 19', 'WEBGL GPU', 'GO APIS'],
              chips: ['Next.js 15', 'WebGL Shaders', 'Rust / Go', 'Design Tokens'],
            },
            {
              n: '03',
              t: 'Cloud Scale & Assurance',
              d: 'Sub-second global performance, automated CI/CD canary deployments, SOC-2 grade security, and 99.999% uptime assurance.',
              i: Workflow,
              tag: 'Ongoing · 99.999% SLA',
              status: 'GLOBAL PRODUCTION',
              metric: '99.999%',
              metricSub: 'Multi-Region SLA Uptime',
              pipeline: ['CANARY CI/CD', 'KUBERNETES', 'EDGE POPS'],
              chips: ['Auto-Scaling', 'SOC 2 Type II', '140+ Edge Nodes', '24/7 Telemetry'],
            },
          ].map((s) => (
            <div
              key={s.n}
              data-hot
              className="group relative rounded-[2.2rem] bg-[#071311] text-sand p-8 sm:p-10 min-h-[490px] flex flex-col justify-between border border-white/10 hover:border-lime/70 shadow-2xl hover:shadow-[0_30px_80px_-15px_rgba(200,255,77,0.28)] transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden spot card-smoke"
            >
              <CardSmoke tone="dark" />

              {/* Top Sweeping Laser Accent Line on Hover */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-lime via-aqua to-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20" />

              {/* Ambient Corner Glow Bloom on Hover */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 group-hover:opacity-80 group-hover:scale-150 transition-all duration-700 z-0"
                style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.22) 0%, rgba(77,232,207,0.08) 45%, transparent 70%)' }}
              />

              {/* Subtle Architectural Dot Grid that brightens on Hover */}
              <div className="pointer-events-none absolute inset-0 dots opacity-25 group-hover:opacity-60 transition-opacity duration-500 z-0" />

              {/* Giant Watermark Number in Background */}
              <span
                className="pointer-events-none select-none absolute -right-4 top-20 font-display font-extrabold text-[10rem] leading-none text-transparent opacity-10 group-hover:opacity-25 group-hover:-translate-x-3 transition-all duration-700 z-0"
                style={{ WebkitTextStroke: '1px rgba(200, 255, 77, 0.35)' }}
              >
                {s.n}
              </span>

              {/* Top Row: Number + Live Status Pill + Animated Icon */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="font-display font-extrabold text-6xl sm:text-7xl text-lime bg-transparent tracking-tight block leading-none group-hover:translate-x-1 transition-transform duration-500">
                    {s.n}
                  </span>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime/10 border border-lime/25 font-mono text-[10px] text-lime font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                    {s.status}
                  </span>
                </div>
                <span className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-aqua group-hover:bg-lime group-hover:text-ink group-hover:border-lime group-hover:rotate-12 group-hover:scale-110 shadow-lg transition-all duration-500">
                  <s.i size={26} />
                </span>
              </div>

              {/* Middle Interactive Telemetry & Architecture Schematic Box */}
              <div className="relative z-10 my-6 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.06] border border-white/10 group-hover:border-lime/35 p-4 transition-all duration-500">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] text-sand/45 uppercase block">PHASE BENCHMARK</span>
                    <span className="font-mono text-xs text-sand/80">{s.metricSub}</span>
                  </div>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-lime group-hover:text-aqua transition-colors duration-300">
                    {s.metric}
                  </span>
                </div>

                {/* 3-Node Architecture Flow Schematic */}
                <div className="flex items-center justify-between gap-1.5 mb-3">
                  {s.pipeline.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span className="px-2.5 py-1 rounded-lg bg-ink/80 border border-white/10 group-hover:border-lime/40 font-mono text-[10px] text-sand/85 group-hover:text-lime transition-colors duration-300 truncate">
                        {step}
                      </span>
                      {idx < s.pipeline.length - 1 && (
                        <span className="text-lime/50 group-hover:text-lime font-mono text-xs transition-colors">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Deliverable Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {s.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-sand/65 group-hover:text-sand group-hover:border-white/25 transition-all duration-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Narrative & Interactive Action Footer */}
              <div className="relative z-10">
                <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-lime/80 mb-1.5">
                  // {s.tag}
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl mb-2.5 text-sand group-hover:text-lime transition-colors duration-300">
                  {s.t}
                </h3>
                <p className="text-sand/65 group-hover:text-sand/85 text-sm sm:text-base leading-relaxed transition-colors duration-300">
                  {s.d}
                </p>

                {/* Interactive Hover Footer Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-lime/30 flex items-center justify-between transition-colors duration-300">
                  <span className="font-mono text-xs text-sand/55 group-hover:text-lime font-bold uppercase tracking-wider transition-colors duration-300">
                    Explore Phase Deliverables
                  </span>
                  <span className="w-9 h-9 rounded-full border border-white/15 bg-white/5 group-hover:bg-lime group-hover:text-ink group-hover:border-lime group-hover:rotate-45 flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* STATS & TESTIMONIALS IN THE SAME SECTION */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-transparent">
        <StatsBand />
        <SectionHead eyebrow="Client Recognition" lines={['Loved by founders', 'and engineering leaders.']} />
        <Testimonials />
      </section>

      <section className="relative z-10 gutter pb-28 bg-transparent"><Newsletter /></section>
      <CTABand />
    </PageTransition>
  );
}
