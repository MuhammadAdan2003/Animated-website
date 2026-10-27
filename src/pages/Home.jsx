import React from 'react';
import { ArrowUpRight, Play, Boxes, Workflow, Waves } from 'lucide-react';
import { PageTransition, Heading, Reveal, WaterButton, Magnetic } from '../components/ui.jsx';
import { DashboardMock, LogoCloud, StatsBand, Testimonials, SectionHead, CTABand, Newsletter } from '../components/sections.jsx';
import { SpaceExplorer, NeuralSpatialCore } from '../components/wow.jsx';

export const FEATURES = [];

export default function HomePage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative gutter pt-40 sm:pt-48 pb-24 min-h-screen flex flex-col justify-center">
        <Reveal y={20} delay={0.7} className="mb-8">
          <span className="glass inline-flex items-center gap-3 rounded-full pl-2 pr-5 py-2 text-sm cursor-pointer hover:border-lime/40 transition-colors" data-hot>
            <span className="px-3 py-1 rounded-full bg-lime text-ink font-bold text-xs uppercase tracking-wider">AURA 2026</span>
            Creative Engineering & Spatial Design Studio
            <ArrowUpRight size={14} className="text-lime" />
          </span>
        </Reveal>
        <Heading
          as="h1"
          lines={['Digital craft.', { t: 'Spatial wonder.', c: 'text-transparent bg-clip-text bg-gradient-to-r from-lime via-aqua to-lime' }, 'Real impact.']}
          className="font-display font-extrabold text-[clamp(3.4rem,11.5vw,12.5rem)] leading-[0.92] text-sand"
        />
        <div className="mt-12 flex flex-col lg:flex-row gap-10 lg:items-end justify-between">
          <Reveal delay={0.5} className="max-w-xl text-xl text-sand/65 leading-relaxed">
            Aura is an avant-garde digital design, creative engineering, and spatial innovation agency. We partner with visionary brands to architect category-defining digital flagships, bespoke immersive environments, and transformative brand platforms.
          </Reveal>
          <Reveal delay={0.6} className="flex flex-wrap gap-4">
            <Magnetic><WaterButton to="/contact" variant="solid" className="!px-9 !py-5 text-base">Start a project <ArrowUpRight size={18} /></WaterButton></Magnetic>
            <WaterButton to="/product" variant="ghost" className="!px-9 !py-5 text-base"><Play size={16} fill="currentColor" /> Explore services</WaterButton>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT VISUAL - REAL INTERACTIVE CHARTS */}
      <section className="relative gutter pb-28">
        <Reveal y={80}><DashboardMock /></Reveal>
      </section>

      <LogoCloud />

      {/* 1. NEURAL SPATIAL CORE (Interactive Multi-Layer Simulation Matrix) */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-ink/40 backdrop-blur-[2px] border-t border-white/5">
        <SectionHead
          eyebrow="Interactive Lab & Capabilities"
          lines={['Artistry meets', 'deep engineering.']}
          text="Our multidisciplinary studio bridges generative AI, real-time spatial physics, and luxury art direction to deliver digital flagships that mesmerize global audiences."
        />
        <Reveal y={40}><NeuralSpatialCore /></Reveal>
      </section>

      {/* 2. HOLOGRAPHIC 3D ISOMETRIC FACILITY DECK (Digital Twin Command Center) */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-ink/30 backdrop-blur-[2px] border-t border-white/5">
        <SectionHead
          eyebrow="Spatial Computing Studio"
          lines={['Step inside the', 'spatial future.']}
          text="Explore our interactive 3D spatial computing engine. From virtual flagships to architectural digital twins, we craft environments that elevate presence, storytelling, and conversion."
        />
        <Reveal y={40}><SpaceExplorer /></Reveal>
      </section>

      {/* HOW IT WORKS / METHODOLOGY */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-sand text-ink">
        <SectionHead light eyebrow="Our Methodology" lines={['From raw ambition', 'to digital folklore.']} text="Three disciplined phases transform audacious ideas into category-defining digital flagships." />
        <Reveal stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { n: '01', t: 'Discovery & Vision', d: 'We interrogate your brand DNA, map competitive whitespace, and architect an unassailable strategic foundation.', i: Boxes },
            { n: '02', t: 'Avant-Garde Craft', d: 'Bespoke art direction, kinetic typography, and fluid 3D WebGL shaders meticulously engineered for visceral delight.', i: Waves },
            { n: '03', t: 'Scale & Immersion', d: 'Production-grade engineering, sub-second global performance, and continuous post-launch evolution.', i: Workflow },
          ].map((s) => (
            <div key={s.n} className="rounded-[2rem] bg-ink text-sand p-8 sm:p-10 min-h-[360px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-display font-extrabold text-7xl text-lime">{s.n}</span>
                <s.i size={28} className="text-aqua" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-4xl mb-3">{s.t}</h3>
                <p className="text-sand/60 leading-relaxed">{s.d}</p>
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
        <SectionHead eyebrow="Client Recognition" lines={['Loved by founders', 'and visionary leaders.']} />
        <Testimonials />
      </section>

      <section className="relative z-10 gutter pb-28 bg-ink/50 backdrop-blur-[2px]"><Newsletter /></section>
      <CTABand />
    </PageTransition>
  );
}
