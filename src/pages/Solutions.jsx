import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Box,
  Cpu,
  Sparkles,
  Hospital,
  Factory,
} from 'lucide-react';
import { PageTransition, Reveal } from '../components/ui.jsx';
import { PageHero, CTABand } from '../components/sections.jsx';

export default function SolutionsPage() {
  const [selectedSector, setSelectedSector] = useState(null);

  const items = [
    { i: Building2, t: 'SaaS & High-Growth Tech', d: 'Multi-tenant cloud architectures, subscription billing, and interactive analytics dashboards for rapid scaling.', m: '+240% Speed Lift', full: 'We architect lightning-fast web applications with Next.js 15, automated tenant isolation, and sub-10ms query caches that reduce churn and boost user retention.' },
    { i: Box, t: 'E-Commerce & Digital Flagships', d: 'Headless commerce, lightning-fast checkout funnels, and bespoke 3D WebGL product customizers for luxury brands.', m: '0.4s LCP', full: 'By replacing bloated monoliths with headless React and edge-rendered catalogues, we increase conversion rates by up to 84% while delivering unforgettable visual craft.' },
    { i: Cpu, t: 'FinTech & High-Frequency Systems', d: 'Ultra-fast transactional feeds, bank-grade encryption, and real-time financial data visualization engines.', m: '99.999% Uptime', full: 'Real-time WebSocket streams and Swiss-grade security protocols engineered for institutional trading terminals, crypto protocols, and wealth management platforms.' },
    { i: Sparkles, t: 'AI & Deep Tech Ventures', d: 'Developer portals, neural model visualization, agentic automation, and real-time vector search integration.', m: '3.4× Pipeline', full: 'We turn abstract algorithms and complex AI models into magnetic, intuitive digital interfaces that developers and enterprise buyers love to use.' },
    { i: Hospital, t: 'HealthTech & Telemedicine', d: 'HIPAA-compliant patient portals, real-time WebRTC audio and video consultations, and secure EHR synchronization.', m: 'SOC 2 Assured', full: 'Zero-trust architecture, end-to-end encrypted medical data pipelines, and fluid interfaces designed for practitioners and patients.' },
    { i: Factory, t: 'Enterprise Logistics & IoT', d: 'Real-time telemetry tracking, distributed inventory algorithms, fleet dashboards, and edge sensor analytics.', m: 'Real-Time Render', full: 'Real-time interactive maps, event streaming via Kafka, and predictive anomaly detection interfaces built for global operations.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Industry Solutions"
        lines={['Software solutions.', { t: 'Across leading', c: 'text-aqua' }, 'industries.']}
        text="From high-growth SaaS and luxury e-commerce to fintech and autonomous AI ventures, we build software solutions that empower category leaders."
      />
      <section className="relative z-10 gutter pb-28 bg-transparent pt-10">
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

export { SolutionsPage };

