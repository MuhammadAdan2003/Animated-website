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
            <span className="px-3 py-1 rounded-full bg-lime text-ink font-bold text-xs">NEW</span>
            Aura 3.0 — generative layouts are live
            <ArrowUpRight size={14} className="text-lime" />
          </span>
        </Reveal>
        <Heading
          as="h1"
          lines={['Spaces that', { t: 'sense, think', c: 'text-transparent bg-clip-text bg-gradient-to-r from-lime via-aqua to-lime' }, 'and adapt.']}
          className="font-display font-extrabold text-[clamp(3.4rem,11.5vw,12.5rem)] leading-[0.92] text-sand"
        />
        <div className="mt-12 flex flex-col lg:flex-row gap-10 lg:items-end justify-between">
          <Reveal delay={0.5} className="max-w-xl text-xl text-sand/65 leading-relaxed">
            Aura is the spatial intelligence platform that lets teams design, simulate and operate buildings, venues and experiences from one living model.
          </Reveal>
          <Reveal delay={0.6} className="flex flex-wrap gap-4">
            <Magnetic><WaterButton to="/contact" variant="solid" className="!px-9 !py-5 text-base">Start for free <ArrowUpRight size={18} /></WaterButton></Magnetic>
            <WaterButton to="/product" variant="ghost" className="!px-9 !py-5 text-base"><Play size={16} fill="currentColor" /> Explore features</WaterButton>
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
          eyebrow="The platform core"
          lines={['One model.', 'Every decision.']}
          text="From first sketch to daily operations, Aura keeps design intent, real-time pedestrian dynamics, and microclimate envelopes in the same living simulation."
        />
        <Reveal y={40}><NeuralSpatialCore /></Reveal>
      </section>

      {/* 2. HOLOGRAPHIC 3D ISOMETRIC FACILITY DECK (Digital Twin Command Center) */}
      <section className="relative z-10 gutter py-24 sm:py-32 bg-ink/30 backdrop-blur-[2px] border-t border-white/5">
        <SectionHead
          eyebrow="Live telemetry engine"
          lines={['Click any zone.', 'Watch it respond.']}
          text="Interactive 3D isometric digital twin streaming live sensor telemetry. Click zones to inspect occupancy & microclimate, or trigger autonomous airflow balancing."
        />
        <Reveal y={40}><SpaceExplorer /></Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 gutter py-28 sm:py-40 bg-sand text-ink">
        <SectionHead light eyebrow="How it works" lines={['From blueprint', 'to autopilot.']} text="Three steps take you from a floor plan to a space that runs itself." />
        <Reveal stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { n: '01', t: 'Connect', d: 'Import CAD or BIM files and plug in sensors, access systems and building controls in minutes.', i: Boxes },
            { n: '02', t: 'Simulate', d: 'Stress-test thousands of scenarios — crowds, weather, outages — before anything changes on site.', i: Waves },
            { n: '03', t: 'Automate', d: 'Deploy policies that adapt your space in real time, with humans always in the loop.', i: Workflow },
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
        <SectionHead eyebrow="Loved by operators" lines={['Teams don’t go', 'back after Aura.']} />
        <Testimonials />
      </section>

      <section className="relative z-10 gutter pb-28 bg-ink/50 backdrop-blur-[2px]"><Newsletter /></section>
      <CTABand />
    </PageTransition>
  );
}
