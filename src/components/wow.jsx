import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Code2, Globe, Cpu, Sparkles, Check, Activity, ShieldCheck,
  Layers, Zap, Terminal, ArrowUpRight, Server, Database,
  Box, Cloud, Workflow, Monitor, Smartphone, Rocket, Lock
} from 'lucide-react';
import { useInView, WaterButton } from './ui.jsx';

/* Image with clip reveal, slow zoom and hover zoom */
export function Img({ src, alt, className = '', imgClass = '' }) {
  const [ref, on] = useInView();
  return (
    <div ref={ref} className={`img-reveal ${on ? 'img-in' : ''} overflow-hidden ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${imgClass}`} />
    </div>
  );
}

/* Scroll parallax — moves children relative to viewport centre */
export function Parallax({ speed = 0.15, children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const upd = () => {
      const r = el.getBoundingClientRect();
      const d = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0)`;
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [speed]);
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
}

/* Top scroll progress bar */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      }
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div ref={ref} className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-aqua to-lime origin-left z-[95]" style={{ transform: 'scaleX(0)' }} />;
}

/* Smoke layer fallback */
export function Smoke() {
  return null;
}

/* ----------------------------------------------------------------------------
 * AnimatedGeometricCircles — Hypnotic, multi-layer orbital rings & pulsing nodes
 * Smooth GPU-accelerated concentric rotations, glowing satellites & wave pulses
 * ---------------------------------------------------------------------------- */
export function AnimatedGeometricCircles({ size = 520, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}
    >
      {/* Ambient Radial Core Glow - Solid Lime */}
      <div className="absolute inset-8 rounded-full bg-lime/10 blur-[85px] animate-pulse" />

      {/* Layer 1: Outermost Dashed Ring with Slow Drift */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />

      {/* Layer 2: Orbit Ring with 2 Glowing Nodes */}
      <div className="absolute inset-6 rounded-full border border-lime/20 animate-[spin_36s_linear_infinite]">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime shadow-[0_0_12px_#c8ff4d]" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-aqua shadow-[0_0_10px_#4de8cf]" />
      </div>

      {/* Layer 3: Counter-Rotating Dashed Aqua Orbit */}
      <div className="absolute inset-16 rounded-full border border-dashed border-aqua/30 animate-[spin_26s_linear_infinite_reverse]">
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sand shadow-[0_0_8px_#f3eee3]" />
      </div>

      {/* Layer 4: Fast Orbiting Lime Node */}
      <div className="absolute inset-28 rounded-full border border-lime/35 animate-[spin_16s_linear_infinite]">
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lime flex items-center justify-center shadow-[0_0_15px_#c8ff4d]">
          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        </span>
      </div>

      {/* Layer 5: Concentric Pulse Wave Rings */}
      <div className="absolute w-36 h-36 rounded-full border border-lime/30 pulse-ring" />
      <div className="absolute w-36 h-36 rounded-full border border-aqua/30 pulse-ring" style={{ animationDelay: '1.2s' }} />

      {/* Center Glass Core Sphere - Solid Fill */}
      <div className="relative w-28 h-28 rounded-full glass border border-white/20 flex items-center justify-center shadow-[0_0_35px_rgba(200,255,77,0.3)]">
        <div className="w-16 h-16 rounded-full bg-lime/20 blur-md animate-pulse" />
        <div className="absolute w-9 h-9 rounded-full bg-lime text-ink flex items-center justify-center font-bold shadow-lg">
          <Sparkles size={16} />
        </div>
      </div>
    </div>
  );
}

export function PulsingCircleRadar({ label = 'EDGE NETWORK ACTIVE', className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 glass px-3.5 py-1.5 rounded-full border border-lime/30 shadow-lg ${className}`}>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-lime" />
      </span>
      <span className="font-mono text-[11px] font-bold text-lime uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ============================================================================
 * 1. AWWWARDS STICKY SCROLL-OVERLAP DECK (Replaces NeuralSpatialCore)
 * 4 monumental full-screen cards that slide up and overlap each other on scroll
 * with smooth depth scaling, parallax inner visuals, and bold color contrast.
 * ============================================================================ */
const OVERLAP_SLIDES = [
  {
    id: '01',
    tag: '01 / 04 — BESPOKE WEB FLAGSHIPS',
    title: ['Next-Gen Web', '& 3D Flagships.'],
    subtitle: 'Category-defining websites and high-velocity web platforms engineered with fluid GSAP motion, WebGL shaders, and sub-second page loads that turn visitors into customers.',
    statVal: '0.3s',
    statLabel: 'LCP Page Load · 100/100 Lighthouse',
    stack: ['Next.js 15', 'React 19', 'GSAP & Lenis', 'WebGL / Three.js', 'TailwindCSS'],
    bullets: [
      'Awwwards-grade kinetic typography & smooth scroll choreography',
      'Server-rendered edge architecture with zero layout shift',
      'Headless CMS & high-converting e-commerce checkout flows',
    ],
    theme: {
      cardBg: 'bg-[#091413] border-lime/25 text-sand',
      accentText: 'text-lime',
      pillBg: 'bg-lime/15 text-lime border-lime/30',
      tagChip: 'bg-white/5 text-sand/80 border-white/10',
      glow: 'from-lime/20 via-aqua/10 to-transparent',
      btnVariant: 'solid',
    },
    visualType: 'web',
  },
  {
    id: '02',
    tag: '02 / 04 — FULL-STACK SAAS & CLOUD',
    title: ['Scalable SaaS &', 'Cloud Engines.'],
    subtitle: 'Production-grade multi-tenant SaaS applications, distributed microservices, and real-time APIs architected to handle millions of concurrent requests without breaking a sweat.',
    statVal: '99.999%',
    statLabel: 'Enterprise Uptime SLA · Multi-Region',
    stack: ['Node.js & Go', 'PostgreSQL', 'Redis Cache', 'GraphQL / gRPC', 'Kubernetes'],
    bullets: [
      'Multi-tenant database isolation, SSO auth & role-based permissions',
      'Sub-10ms API response latency across 140+ global edge nodes',
      'Automated Stripe subscription billing, metering & webhooks',
    ],
    theme: {
      cardBg: 'bg-[#071d1b] border-aqua/30 text-sand',
      accentText: 'text-aqua',
      pillBg: 'bg-aqua/15 text-aqua border-aqua/30',
      tagChip: 'bg-white/5 text-sand/80 border-white/10',
      glow: 'from-aqua/25 via-lime/10 to-transparent',
      btnVariant: 'ghost',
    },
    visualType: 'saas',
  },
  {
    id: '03',
    tag: '03 / 04 — AI SYSTEMS & AUTONOMOUS AGENTS',
    title: ['Autonomous AI &', 'Neural Workflows.'],
    subtitle: 'Custom LLM pipelines, semantic vector search, and intelligent multi-agent systems embedded directly into your product to automate complex business operations 24/7.',
    statVal: '10×',
    statLabel: 'Workflow Velocity · Sub-Second RAG',
    stack: ['OpenAI / Claude', 'Python & FastAPI', 'pgvector / Pinecone', 'LangGraph', 'Streaming UI'],
    bullets: [
      'Deterministic agentic workflows with zero-hallucination guardrails',
      'Private enterprise knowledge retrieval (RAG) with bank-grade security',
      'Real-time streaming AI copilots and generative UI interfaces',
    ],
    theme: {
      cardBg: 'bg-lime border-ink/15 text-ink',
      accentText: 'text-ink',
      pillBg: 'bg-ink text-lime border-ink',
      tagChip: 'bg-ink/10 text-ink border-ink/15 font-semibold',
      glow: 'from-white/40 via-aqua/20 to-transparent',
      btnVariant: 'dark',
    },
    visualType: 'ai',
  },
  {
    id: '04',
    tag: '04 / 04 — MOBILE APPS & DESIGN SYSTEMS',
    title: ['Fluid Mobile Apps', '& Design Systems.'],
    subtitle: 'Cross-platform iOS and Android applications with silky 120Hz native gesture physics, paired with comprehensive multi-brand design token libraries.',
    statVal: '4.9★',
    statLabel: 'App Store Rating · 120Hz Native Feel',
    stack: ['React Native', 'Expo', 'Swift / Kotlin', 'Figma Tokens', 'Offline-First Sync'],
    bullets: [
      'Native-grade gesture animations, haptics & biometric authentication',
      'Instant offline data synchronization with background cloud workers',
      'Unified design systems that keep web and mobile 100% consistent',
    ],
    theme: {
      cardBg: 'bg-sand border-ink/15 text-ink',
      accentText: 'text-[#ff5a36]',
      pillBg: 'bg-ink text-sand border-ink',
      tagChip: 'bg-ink/[0.07] text-ink border-ink/15 font-semibold',
      glow: 'from-lime/40 via-aqua/20 to-transparent',
      btnVariant: 'dark',
    },
    visualType: 'mobile',
  },
];

function SlideVisualArt({ type, index }) {
  if (type === 'web') {
    return (
      <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] rounded-[2rem] bg-[#050b0a] border border-white/10 p-5 sm:p-7 overflow-hidden flex flex-col justify-between group">
        {/* Ambient radial glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-lime/20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute inset-0 dots opacity-40 pointer-events-none" />

        {/* Top Browser Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-coral/80" />
            <span className="w-3 h-3 rounded-full bg-lime/80" />
            <span className="w-3 h-3 rounded-full bg-aqua/80" />
            <span className="ml-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-sand/70">
              https://flagship.aura.studio
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-lime/15 text-lime font-mono text-[10px] font-bold border border-lime/30">
            120 FPS
          </span>
        </div>

        {/* Center Layered Visual Mockup */}
        <div className="relative z-10 my-auto py-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime mb-2">
            // INTERACTIVE FLAGSHIP ENGINE
          </div>
          <div className="font-display font-extrabold text-3xl sm:text-5xl text-sand leading-[0.95] tracking-tight">
            Kinetic craft.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-aqua to-lime">
              Zero friction.
            </span>
          </div>

          {/* Floating layered glass cards */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-xs font-mono text-sand/50 mb-1">
                <span>CORE VITALS</span>
                <Zap size={13} className="text-lime" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-lime">100 / 100</div>
              <div className="text-[11px] text-sand/50 mt-0.5">Sub-second First Paint</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 group-hover:translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-xs font-mono text-sand/50 mb-1">
                <span>CONVERSION</span>
                <ArrowUpRight size={13} className="text-aqua" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-aqua">+240%</div>
              <div className="text-[11px] text-sand/50 mt-0.5">Average Client Lift</div>
            </div>
          </div>
        </div>

        {/* Bottom Marquee Ribbon inside card */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-sand/50">
          <span>SSR STREAMING: ACTIVE</span>
          <span className="text-lime">● EDGE CACHED (14ms)</span>
        </div>
      </div>
    );
  }

  if (type === 'saas') {
    return (
      <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] rounded-[2rem] bg-[#04100f] border border-aqua/25 p-5 sm:p-7 overflow-hidden flex flex-col justify-between group">
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-aqua/20 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dots opacity-40 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2 font-mono text-xs text-aqua">
            <Server size={15} />
            <span>CLOUD CLUSTER // MULTI-REGION MESH</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-aqua/15 text-aqua font-mono text-[10px] border border-aqua/30">
            HEALTHY
          </span>
        </div>

        {/* Interactive Node Stack */}
        <div className="relative z-10 my-auto py-4 space-y-3">
          {[
            { region: 'US-EAST · Virginia Edge', qps: '42.8k req/s', lat: '4.2ms', bar: 'w-[92%]', c: 'bg-lime' },
            { region: 'EU-CENTRAL · Frankfurt', qps: '31.4k req/s', lat: '7.8ms', bar: 'w-[78%]', c: 'bg-aqua' },
            { region: 'AP-EAST · Tokyo Cluster', qps: '28.9k req/s', lat: '6.1ms', bar: 'w-[84%]', c: 'bg-lime' },
          ].map((node, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 p-3.5 hover:border-aqua/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-sand font-semibold">{node.region}</span>
                <span className="text-aqua">{node.qps} · <b className="text-lime">{node.lat}</b></span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full rounded-full ${node.c} ${node.bar} transition-all duration-700`} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-sand/50">
          <span>ZERO-DOWNTIME CI/CD</span>
          <span className="text-aqua">● AUTO-SCALING: 64 PODS</span>
        </div>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] rounded-[2rem] bg-ink text-sand p-5 sm:p-7 overflow-hidden flex flex-col justify-between shadow-2xl group">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-lime/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2 font-mono text-xs text-lime">
            <Sparkles size={15} />
            <span>AURA NEURAL AGENT // ORCHESTRATOR</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-lime text-ink font-mono text-[10px] font-bold">
            LIVE STREAM
          </span>
        </div>

        {/* Neural Pipeline Steps */}
        <div className="relative z-10 my-auto py-4 space-y-3 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-sand/40 block mb-1">01 // SEMANTIC VECTOR RETRIEVAL</span>
            <p className="text-sand/90">Indexed 1.4M enterprise docs in <span className="text-lime font-bold">11.2ms</span></p>
          </div>
          <div className="p-3.5 rounded-2xl bg-lime/10 border border-lime/30">
            <span className="text-[10px] text-lime block mb-1">02 // AUTONOMOUS REASONING LOOP</span>
            <p className="text-sand">Executing multi-step SQL & API tool calls with deterministic verification ✓</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-sand/40 block">03 // PRODUCTION OUTPUT</span>
              <span className="text-aqua font-bold">Zero Hallucination Guardrails Passed</span>
            </div>
            <span className="w-8 h-8 rounded-full bg-lime text-ink flex items-center justify-center font-bold">✓</span>
          </div>
        </div>

        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-sand/50">
          <span>MODEL: CUSTOM RAG + CLAUDE / GPT</span>
          <span className="text-lime">185 TOKENS / SEC</span>
        </div>
      </div>
    );
  }

  // Mobile & Design Systems
  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] rounded-[2rem] bg-ink text-sand p-5 sm:p-7 overflow-hidden flex flex-col justify-between shadow-2xl group">
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-coral/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2 font-mono text-xs text-lime">
          <Smartphone size={15} />
          <span>120Hz NATIVE GESTURE ENGINE</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-sand font-mono text-[10px]">
          iOS & ANDROID
        </span>
      </div>

      {/* Dual Floating App Cards */}
      <div className="relative z-10 my-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 p-4 flex flex-col justify-between min-h-[170px] group-hover:-rotate-1 transition-transform duration-500">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-lime text-ink font-mono text-[10px] font-bold">APP STORE</span>
            <span className="font-mono text-xs text-lime">★ 4.9</span>
          </div>
          <div>
            <p className="font-display font-extrabold text-2xl text-sand mt-3">Fluid Touch Physics</p>
            <p className="text-xs text-sand/60 mt-1">Spring-driven gestures & instant offline SQLite sync.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-lime/20 to-aqua/10 border border-lime/30 p-4 flex flex-col justify-between min-h-[170px] group-hover:rotate-1 transition-transform duration-500">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-aqua text-ink font-mono text-[10px] font-bold">DESIGN TOKENS</span>
            <Layers size={14} className="text-aqua" />
          </div>
          <div>
            <p className="font-display font-extrabold text-2xl text-sand mt-3">60+ UI Primitives</p>
            <p className="text-xs text-sand/70 mt-1">WCAG AAA accessible components synced with Figma.</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-sand/50">
        <span>OTA INSTANT UPDATES</span>
        <span className="text-lime">● 99.98% CRASH-FREE SESSIONS</span>
      </div>
    </div>
  );
}

function StickyOverlapCard({ slide, index, total, scrollYProgress }) {
  // As the user scrolls past this card's threshold, scale it down slightly so the next card overlaps with depth
  const startScale = index * (1 / total);
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(scrollYProgress, [startScale, 1], [1, targetScale]);

  return (
    <div
      className="sticky w-full pb-12 sm:pb-16"
      style={{
        top: `calc(5.5rem + ${index * 22}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className={`relative w-full rounded-[2.2rem] sm:rounded-[3rem] border p-6 sm:p-10 lg:p-14 shadow-[0_-25px_70px_-15px_rgba(0,0,0,0.75)] overflow-hidden transition-colors ${slide.theme.cardBg}`}
      >
        {/* Background gradient glow */}
        <div className={`absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br ${slide.theme.glow} blur-3xl pointer-events-none`} />

        {/* Top Index & Category Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-current/10">
          <div className="flex items-center gap-3">
            <span className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold border ${slide.theme.pillBg}`}>
              {slide.tag}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs opacity-60">
            <span>SCROLL TO OVERLAP</span>
            <span>↓</span>
          </div>
        </div>

        {/* Main 12-Col Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[0.94] tracking-tight">
                {slide.title[0]}
                <span className={`block ${slide.theme.accentText}`}>{slide.title[1]}</span>
              </h3>

              <p className="mt-5 text-base sm:text-lg opacity-80 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Key Deliverables */}
              <ul className="mt-6 space-y-2.5">
                {slide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base opacity-90">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${slide.theme.pillBg}`}>
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {slide.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs border ${slide.theme.tagChip}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Stat + CTA Row */}
            <div className="mt-8 pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className={`font-display font-extrabold text-4xl sm:text-5xl leading-none ${slide.theme.accentText}`}>
                  {slide.statVal}
                </div>
                <div className="font-mono text-xs opacity-65 mt-1">{slide.statLabel}</div>
              </div>

              <WaterButton to="/contact" variant={slide.theme.btnVariant} className="!px-7 !py-4 text-sm">
                Build with this stack <ArrowUpRight size={16} />
              </WaterButton>
            </div>
          </div>

          {/* Right Column: Layered Visual Art */}
          <div className="lg:col-span-5 h-full">
            <SlideVisualArt type={slide.visualType} index={index} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SoftwareSolutionsBento() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative w-full pt-4">
      {OVERLAP_SLIDES.map((slide, index) => (
        <StickyOverlapCard
          key={slide.id}
          slide={slide}
          index={index}
          total={OVERLAP_SLIDES.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

export const NeuralSpatialCore = SoftwareSolutionsBento;
export const SoftwareEngineCore = SoftwareSolutionsBento;


/* ============================================================================
 * 2. AWWWARDS HORIZONTAL SCROLL SHOWCASE + KINETIC CURTAIN LIST (Replaces SpaceExplorer)
 * Part A: Pinned Horizontal Scroll Case-Study & Architecture Gallery on vertical scroll
 * Part B: Interactive Hover-Curtain Capabilities List
 * ============================================================================ */
const HORIZONTAL_REEL = [
  {
    num: '01',
    client: 'KINETIX LUXURY',
    category: 'Headless Web Flagship · Next.js 15 & WebGL',
    metric: '+310% Conversion Lift',
    title: 'Global E-Commerce & Interactive 3D Configurator',
    desc: 'Sub-second global page loads paired with real-time physical shaders and instant Stripe one-click checkout.',
    accent: 'from-lime/30 via-aqua/15 to-ink',
    badgeColor: 'bg-lime text-ink',
    tags: ['Next.js 15', 'WebGL Shaders', 'Headless Shopify', '0.3s LCP'],
  },
  {
    num: '02',
    client: 'HYPERION FINTECH',
    category: 'High-Frequency Web Platform · Rust & React 19',
    metric: '4ms Socket Latency',
    title: 'Real-Time Institutional Trading & Analytics Terminal',
    desc: 'Streaming WebSocket order books, multi-window workspace management, and bank-grade SOC 2 encryption.',
    accent: 'from-aqua/30 via-lime/10 to-ink',
    badgeColor: 'bg-aqua text-ink',
    tags: ['React 19', 'Rust WASM', 'WebSockets', '99.999% SLA'],
  },
  {
    num: '03',
    client: 'SYNAPSE AI LABS',
    category: 'Agentic SaaS Platform · Python, RAG & Vector DB',
    metric: '10× Workflow Speed',
    title: 'Autonomous Multi-Agent Enterprise Workspace',
    desc: 'Custom LLM orchestration and hybrid semantic search over 10M+ proprietary documents with zero data leakage.',
    accent: 'from-coral/30 via-lime/15 to-ink',
    badgeColor: 'bg-coral text-ink',
    tags: ['OpenAI / Claude', 'pgvector', 'FastAPI', 'Multi-Agent'],
  },
  {
    num: '04',
    client: 'ORBITAL CLOUD',
    category: 'Distributed Microservices · Go & Kubernetes',
    metric: '48M Daily Requests',
    title: 'Global Multi-Region API Mesh & DevOps Portal',
    desc: 'Zero-downtime canary deployments, automated container auto-scaling, and real-time telemetry across 140 edge PoPs.',
    accent: 'from-lime/25 via-sand/15 to-ink',
    badgeColor: 'bg-sand text-ink',
    tags: ['Golang', 'Kubernetes', 'GraphQL Mesh', 'Terraform'],
  },
  {
    num: '05',
    client: 'VORTEX MOBILE',
    category: 'iOS & Android Super-App · React Native',
    metric: '4.9★ App Store (2.4M Users)',
    title: '120Hz Cross-Platform Consumer Fintech App',
    desc: 'Silky gesture-driven navigation, biometric passkeys, and instant offline-first SQLite synchronization.',
    accent: 'from-aqua/30 via-coral/15 to-ink',
    badgeColor: 'bg-lime text-ink',
    tags: ['React Native', '120Hz Reanimated', 'Biometrics', 'Offline Sync'],
  },
];

const KINETIC_ROWS = [
  { num: '01', name: 'Custom Web Applications', detail: 'Next.js 15 · React 19 · GSAP · Sub-Second LCP', stat: '100/100 Vitals' },
  { num: '02', name: 'Full-Stack SaaS Platforms', detail: 'Multi-Tenant · Stripe Billing · SSO & RBAC', stat: '99.999% Uptime' },
  { num: '03', name: 'AI Agents & LLM Workflows', detail: 'Custom RAG · Vector Search · Tool Calling', stat: '10× Efficiency' },
  { num: '04', name: 'Cloud & API Microservices', detail: 'Go · Node.js · GraphQL · Kubernetes · AWS', stat: '<8ms Latency' },
  { num: '05', name: 'Mobile Apps & Design Systems', detail: 'iOS & Android · React Native · Figma Tokens', stat: '4.9★ Rated' },
];

export function TechStackAndWhyUs() {
  const scrollRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 });

  // Horizontal translation for the 5-card reel
  const xReel = useTransform(smoothProgress, [0, 1], ['0%', '-66%']);
  // Counter-moving giant background typography
  const xBgText = useTransform(smoothProgress, [0, 1], ['-10%', '18%']);

  return (
    <div className="w-full space-y-24">
      {/* PART A: PINNED HORIZONTAL SCROLL SHOWCASE REEL */}
      <div ref={scrollRef} className="relative h-[270vh]">
        <div className="sticky top-20 h-[84vh] flex flex-col justify-between overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 bg-[#060d0c]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          {/* Giant Counter-Moving Background Watermark */}
          <motion.div
            style={{ x: xBgText }}
            className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap font-display font-extrabold text-[18vw] leading-none text-transparent opacity-25"
          >
            <span style={{ WebkitTextStroke: '1px rgba(200, 255, 77, 0.22)' }}>
              AURA ENGINEERING // SELECTED SHOWCASE // 2026 //
            </span>
          </motion.div>

          {/* Top Bar inside Pinned Stage */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold">
                HORIZONTAL SCROLL REEL // ENGINEERED FLAGSHIPS
              </span>
            </div>

            {/* Scroll Progress Scrubber */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-sand/50 hidden sm:inline">SCROLL DOWN TO GLIDE →</span>
              <div className="w-32 sm:w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
                  className="w-full h-full bg-gradient-to-r from-lime to-aqua"
                />
              </div>
            </div>
          </div>

          {/* Horizontal Sliding Track */}
          <div className="relative z-10 my-auto flex items-center">
            <motion.div style={{ x: xReel }} className="flex gap-6 sm:gap-8 pr-[30vw] will-change-transform">
              {HORIZONTAL_REEL.map((item) => (
                <Link
                  to="/customers"
                  key={item.num}
                  data-hot
                  className="group relative w-[82vw] sm:w-[56vw] lg:w-[42vw] shrink-0 min-h-[370px] sm:min-h-[430px] rounded-[2.2rem] border border-white/15 bg-[#0a1514] p-7 sm:p-10 flex flex-col justify-between overflow-hidden hover:border-lime/60 transition-colors duration-500"
                >
                  {/* Dynamic Gradient Backdrop */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700`} />
                  <div className="absolute inset-0 dots opacity-40" />

                  {/* Giant Background Number */}
                  <span className="pointer-events-none select-none absolute -right-4 -bottom-8 font-display font-extrabold text-[11rem] sm:text-[14rem] leading-none text-white/[0.04] group-hover:text-lime/[0.09] transition-colors duration-500">
                    {item.num}
                  </span>

                  {/* Card Top */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-sand/60 block">
                        {item.client}
                      </span>
                      <span className="font-mono text-xs text-lime">{item.category}</span>
                    </div>
                    <span className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold ${item.badgeColor}`}>
                      {item.metric}
                    </span>
                  </div>

                  {/* Card Middle: Title & Description */}
                  <div className="relative z-10 my-6">
                    <h4 className="font-display font-extrabold text-2xl sm:text-4xl text-sand leading-[1.05] group-hover:text-lime transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm sm:text-base text-sand/70 max-w-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Card Bottom: Tech Tags & Magnetic Arrow */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[11px] text-sand/80">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="w-11 h-11 rounded-full bg-sand text-ink flex items-center justify-center shrink-0 group-hover:bg-lime group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Bottom Bar inside Pinned Stage */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-sand/50">
            <span>01 — 05 PRODUCTION FLAGSHIPS</span>
            <Link to="/customers" className="text-lime hover:underline inline-flex items-center gap-1.5 font-bold">
              Explore all case studies <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* PART B: AWWWARDS KINETIC HOVER-CURTAIN CAPABILITIES MATRIX */}
      <div className="rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 bg-[#071110]/90 p-6 sm:p-12 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-lime font-bold block mb-2">
              // INTERACTIVE CAPABILITIES INDEX
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-sand leading-none">
              Full-stack mastery. Zero templates.
            </h3>
          </div>
          <span className="font-mono text-xs text-sand/50">HOVER ANY DISCIPLINE TO EXPAND</span>
        </div>

        <div className="divide-y divide-white/10">
          {KINETIC_ROWS.map((row, i) => {
            const isActive = hoveredRow === i;
            return (
              <Link
                to="/product"
                key={row.num}
                data-hot
                onMouseEnter={() => setHoveredRow(i)}
                className="group relative block py-7 sm:py-9 px-4 sm:px-6 overflow-hidden rounded-2xl transition-colors"
              >
                {/* Sliding Lime Curtain Background on Hover */}
                <motion.div
                  initial={false}
                  animate={{
                    scaleY: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'bottom' }}
                  className="absolute inset-0 bg-lime pointer-events-none z-0 rounded-2xl"
                />

                <div className="relative z-10 grid grid-cols-12 items-center gap-4">
                  <span className={`col-span-2 sm:col-span-1 font-mono text-sm font-bold transition-colors duration-300 ${isActive ? 'text-ink' : 'text-lime'}`}>
                    /{row.num}
                  </span>

                  <div className="col-span-10 sm:col-span-6">
                    <h4 className={`font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-500 ${isActive ? 'text-ink translate-x-3' : 'text-sand'}`}>
                      {row.name}
                    </h4>
                  </div>

                  <div className={`col-span-8 sm:col-span-3 font-mono text-xs sm:text-sm transition-colors duration-300 ${isActive ? 'text-ink/80 font-semibold' : 'text-sand/55'}`}>
                    {row.detail}
                  </div>

                  <div className="col-span-4 sm:col-span-2 flex justify-end items-center gap-3">
                    <span className={`hidden xl:inline-block px-3 py-1 rounded-full font-mono text-xs font-bold border transition-colors duration-300 ${isActive ? 'bg-ink text-lime border-ink' : 'bg-white/5 text-sand/70 border-white/10'}`}>
                      {row.stat}
                    </span>
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-ink text-lime rotate-45 scale-110' : 'border border-white/20 text-sand'}`}>
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const SpaceExplorer = TechStackAndWhyUs;
