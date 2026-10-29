import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import {
  Sparkles, Zap, ArrowUpRight, ArrowLeft, ArrowRight, Server, Layers, Smartphone
} from 'lucide-react';
import { useInView, WaterButton, CardSmoke } from './ui.jsx';

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
    if (!el) return;
    let raf;
    const upd = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const d = r.top + r.height / 2 - window.innerHeight / 2;
      ref.current.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0)`;
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [speed]);
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>;
}

/* Top scroll progress bar (removed per user request) */
export function ScrollProgress() {
  return null;
}

/* Smoke layer fallback */
export function Smoke() {
  return null;
}

/* ----------------------------------------------------------------------------
 * AnimatedGeometricCircles — Hypnotic, multi-layer orbital rings & pulsing nodes
 * Pure GPU transform + radial-gradient lighting (zero filter:blur lag)
 * ---------------------------------------------------------------------------- */
export function AnimatedGeometricCircles({ size = 520, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative pointer-events-none select-none flex items-center justify-center ${className}`}
    >
      {/* Ambient Radial Core Glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.16) 0%, rgba(77,232,207,0.06) 45%, transparent 70%)' }}
      />

      {/* Layer 1: Outermost Dashed Ring with Slow Drift */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite] will-change-transform" />

      {/* Layer 2: Orbit Ring with 2 Glowing Nodes */}
      <div className="absolute inset-6 rounded-full border border-lime/20 animate-[spin_36s_linear_infinite] will-change-transform">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime shadow-[0_0_12px_#c8ff4d]" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-aqua shadow-[0_0_10px_#4de8cf]" />
      </div>

      {/* Layer 3: Counter-Rotating Dashed Aqua Orbit */}
      <div className="absolute inset-16 rounded-full border border-dashed border-aqua/30 animate-[spin_26s_linear_infinite_reverse] will-change-transform">
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sand shadow-[0_0_8px_#f3eee3]" />
      </div>

      {/* Layer 4: Fast Orbiting Lime Node */}
      <div className="absolute inset-28 rounded-full border border-lime/35 animate-[spin_16s_linear_infinite] will-change-transform">
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lime flex items-center justify-center shadow-[0_0_15px_#c8ff4d]">
          <span className="w-1.5 h-1.5 rounded-full bg-ink" />
        </span>
      </div>

      {/* Layer 5: Concentric Pulse Wave Rings */}
      <div className="absolute w-36 h-36 rounded-full border border-lime/30 pulse-ring" />
      <div className="absolute w-36 h-36 rounded-full border border-aqua/30 pulse-ring" style={{ animationDelay: '1.2s' }} />

      {/* Center Core Sphere */}
      <div className="relative w-28 h-28 rounded-full bg-ink/80 border border-white/20 flex items-center justify-center shadow-[0_0_35px_rgba(200,255,77,0.3)]">
        <div
          className="w-20 h-20 rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.35) 0%, transparent 70%)' }}
        />
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
 * 0. HERO SCROLL-EXPAND IMAGE PORTAL & MULTI-FRAME SHOWCASE
 * 1:1 Scroll-Synced (Zero Delay) Window Portal that scales from a compact Hero
 * preview into a full-viewport section with counter-parallax image zoom,
 * monumental headings, floating telemetry card, and real-time scroll scrubbers.
 * ============================================================================ */
const HERO_SHOWCASE_FRAMES = [
  {
    id: '01',
    eyebrow: '01 / 04 — BESPOKE WEB FLAGSHIPS',
    titleLine1: 'Sub-second web',
    titleLine2: 'architecture.',
    accentColor: 'text-lime',
    accentBg: 'bg-lime text-ink',
    desc: 'High-converting Next.js 15 & WebGL digital flagships engineered for instant edge hydration and 120 FPS motion.',
    metric: '0.3s LCP · 100/100 Vitals',
    statBig: '+310%',
    statSub: 'Average Client Conversion Lift',
    tags: ['Next.js 15', 'React 19', 'WebGL Shaders'],
    label: 'Web Flagships',
    img: '/images/flagship.jpg',
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '02',
    eyebrow: '02 / 04 — DISTRIBUTED CLOUD SYSTEMS',
    titleLine1: 'Multi-region',
    titleLine2: 'cloud engines.',
    accentColor: 'text-aqua',
    accentBg: 'bg-aqua text-ink',
    desc: 'Resilient Go & Node.js microservices, automated Kubernetes scaling, and sub-10ms global edge routing.',
    metric: '99.999% SLA · 450M+ Req/Mo',
    statBig: '4.2ms',
    statSub: 'Global Edge API Latency',
    tags: ['Golang', 'Kubernetes', 'GraphQL Mesh'],
    label: 'Cloud Systems',
    img: '/images/clarity.jpg',
    fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '03',
    eyebrow: '03 / 04 — AUTONOMOUS AI & RAG',
    titleLine1: 'Intelligent neural',
    titleLine2: 'workflows.',
    accentColor: 'text-lime',
    accentBg: 'bg-lime text-ink',
    desc: 'Production multi-agent pipelines, custom vector embeddings, and zero-hallucination enterprise automation.',
    metric: '10× Operational Velocity',
    statBig: '10×',
    statSub: 'Enterprise Workflow Acceleration',
    tags: ['LangGraph', 'pgvector', 'Custom RAG'],
    label: 'Neural AI',
    img: '/images/human.jpg',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '04',
    eyebrow: '04 / 04 — UNIFIED DESIGN SYSTEMS',
    titleLine1: 'Precision human',
    titleLine2: 'interfaces.',
    accentColor: 'text-aqua',
    accentBg: 'bg-aqua text-ink',
    desc: 'Cross-platform 120Hz applications and multi-brand token architectures built for global category leaders.',
    metric: '4.9★ Rated · Zero Debt',
    statBig: '120Hz',
    statSub: 'Native Gesture & UI Frame Rate',
    tags: ['Design Tokens', 'React Native', 'WCAG AAA'],
    label: 'Design Systems',
    img: '/images/lasting.jpg',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
  },
];

function ChapterScrubberButton({ frame, index, isCurrent, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      data-hot
      className={`text-left cursor-pointer rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3.5 border transition-all duration-300 flex items-center justify-between gap-2 sm:gap-3 min-w-0 ${
        isCurrent
          ? 'bg-lime text-ink border-lime shadow-[0_0_25px_rgba(200,255,77,0.35)]'
          : 'bg-black/45 text-sand border-white/12 hover:border-lime/50 hover:bg-white/10'
      }`}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs min-w-0">
        <span
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
            isCurrent ? 'bg-ink animate-ping' : 'bg-lime/50'
          }`}
        />
        <span className="font-bold tracking-wider uppercase truncate">
          {frame.id} // {frame.label}
        </span>
      </div>
      <span
        className={`hidden xs:inline-block sm:inline-block shrink-0 font-mono text-[9px] sm:text-[10px] uppercase px-1.5 sm:px-2 py-0.5 rounded-full ${
          isCurrent ? 'bg-ink/15 text-ink font-bold' : 'text-sand/45'
        }`}
      >
        {isCurrent ? 'LIVE' : `0${index + 1}`}
      </span>
    </button>
  );
}

export function HeroExpandShowcase() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const activeIdxRef = useRef(0);
  const expandedRef = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Direct 1:1 scroll binding (Lenis already smooths window.scrollY, so zero extra spring lag!)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end end'],
  });

  // Phase 1 (0.00 -> 0.30): 1:1 Scroll-Synced Expansion from compact Hero card to FULL SCREEN (1.0)
  const initialScale = isMobile ? 0.88 : 0.46;
  const initialRadius = isMobile ? 28 : 40;
  const scale = useTransform(scrollYProgress, [0, 0.30], [initialScale, 1], { clamp: true });
  const imgInnerScale = useTransform(scrollYProgress, [0, 0.30], [1.15, 1], { clamp: true });
  const borderRadius = useTransform(scrollYProgress, [0, 0.30], [initialRadius, 0], { clamp: true });
  const contentOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1], { clamp: true });
  const contentY = useTransform(scrollYProgress, [0.18, 0.32], [24, 0], { clamp: true });
  const miniBadgeOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0], { clamp: true });
  const miniBadgeScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.88], { clamp: true });

  // Phase 2 (0.30 -> 0.98): 1:1 Scroll-Synced switching across the 4 showcase frames
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!Number.isFinite(v)) return;
    const nextExpanded = v > 0.22;
    if (nextExpanded !== expandedRef.current) {
      expandedRef.current = nextExpanded;
      setIsExpanded(nextExpanded);
    }

    let nextIdx = 0;
    if (v > 0.30) {
      const norm = Math.min(0.9999, Math.max(0, (v - 0.30) / 0.68));
      nextIdx = Math.min(
        HERO_SHOWCASE_FRAMES.length - 1,
        Math.max(0, Math.floor(norm * HERO_SHOWCASE_FRAMES.length) || 0)
      );
    }
    if (nextIdx !== activeIdxRef.current) {
      activeIdxRef.current = nextIdx;
      setActiveIdx(nextIdx);
    }
  });

  const jumpToFrame = (idx) => {
    const safeTarget = Math.min(HERO_SHOWCASE_FRAMES.length - 1, Math.max(0, idx || 0));
    const el = containerRef.current;
    if (!el) {
      activeIdxRef.current = safeTarget;
      setActiveIdx(safeTarget);
      return;
    }
    const rect = el.getBoundingClientRect();
    const absTop = window.scrollY + rect.top;
    const totalScrollable = el.offsetHeight - window.innerHeight * 0.22;
    const targetProgress = 0.32 + (safeTarget / HERO_SHOWCASE_FRAMES.length) * 0.65;
    const targetY = absTop - window.innerHeight * 0.78 + targetProgress * totalScrollable;
    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 0.85 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const safeIdx =
    Number.isInteger(activeIdx) && activeIdx >= 0 && activeIdx < HERO_SHOWCASE_FRAMES.length
      ? activeIdx
      : 0;
  const activeFrame = HERO_SHOWCASE_FRAMES[safeIdx] || HERO_SHOWCASE_FRAMES[0];

  return (
    <div ref={containerRef} className="relative h-[280vh] sm:h-[330vh] w-full">
      <div
        style={{ position: 'sticky', top: 0 }}
        className="sticky top-0 h-[100dvh] w-full flex items-start justify-center overflow-hidden"
      >
        <motion.div
          style={{
            scale,
            borderRadius,
            transformOrigin: 'top center',
          }}
          className="relative w-full h-full overflow-hidden border-y border-white/15 bg-[#060f0e] shadow-[0_35px_100px_rgba(0,0,0,0.85)] transform-gpu will-change-transform card-smoke"
        >
          {/* Subtle Smoke inside this Showcase Card */}
          <CardSmoke tone="dark" />

          {/* 4 Stacked High-Resolution Images with Counter-Parallax Zoom */}
          <motion.div style={{ scale: imgInnerScale }} className="absolute inset-0 w-full h-full will-change-transform">
            {HERO_SHOWCASE_FRAMES.map((frame, i) => {
              const isCurrent = i === safeIdx;
              return (
                <div
                  key={frame.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={frame.img}
                    alt={frame.titleLine1}
                    decoding="async"
                    onError={(e) => {
                      if (e.currentTarget.src !== frame.fallback) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = frame.fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  {/* Multi-Stop Editorial Readability Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(5,10,10,0.42) 0%, rgba(5,10,10,0.35) 38%, rgba(5,10,10,0.82) 78%, rgba(5,10,10,0.96) 100%)',
                    }}
                  />
                </div>
              );
            })}
          </motion.div>

          {/* COMPACT HERO PORTAL OVERLAY (Shown when small on the Hero section) */}
          <motion.div
            style={{ opacity: miniBadgeOpacity, scale: miniBadgeScale }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-10"
          >
            {/* Top Viewfinder HUD Bar */}
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-ink/85 border border-lime/40 text-lime font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lime animate-ping shrink-0" />
                LIVE FLAGSHIP PORTAL
              </span>
              <span className="hidden sm:inline-block px-4 py-1.5 rounded-full bg-ink/85 border border-white/15 text-sand/80 font-mono text-xs">
                01 — 04 // 120 FPS
              </span>
            </div>

            {/* Center Expanding Portal Badge */}
            <div className="my-auto flex flex-col items-center text-center px-2">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-lime text-ink flex items-center justify-center shadow-[0_0_40px_rgba(200,255,77,0.5)] mb-3 sm:mb-4">
                <span className="absolute inset-0 rounded-full border border-lime pulse-ring" />
                <ArrowUpRight size={22} />
              </div>
              <span className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-ink/90 border border-white/20 text-sand font-mono text-[10px] sm:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] shadow-2xl">
                SCROLL TO EXPAND SHOWCASE ↓
              </span>
            </div>

            {/* Bottom Viewfinder Corner Marks */}
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-sand/60">
              <span>[ AURA SHOWREEL 2026 ]</span>
              <span className="text-lime">SYNCED WITH SCROLL ●</span>
            </div>
          </motion.div>

          {/* EXPANDED FULL-SECTION INTERFACE (Full-Screen Width with Gutter Alignment) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className={`relative z-20 w-full h-full gutter pt-20 pb-5 sm:pt-28 sm:pb-12 flex flex-col justify-between ${
              isExpanded ? '' : 'pointer-events-none'
            }`}
          >
            {/* Top Architectural HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 border-b border-white/15 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold shrink-0 ${activeFrame.accentBg}`}>
                  {activeFrame.id} / 04
                </span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-sand/90 font-bold truncate">
                  {activeFrame.eyebrow.split('—')[1] || activeFrame.eyebrow}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="hidden md:flex items-center gap-2">
                  {activeFrame.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-sand/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="hidden sm:inline-block px-3.5 py-1 rounded-full bg-lime/15 border border-lime/40 font-mono text-xs text-lime font-bold">
                  {activeFrame.metric}
                </span>
              </div>
            </div>

            {/* Center Editorial Split: Monumental Heading (Left) + Floating Spec Card (Right) */}
            <div className="my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-end">
              {/* Left 8 Cols: Monumental Switching Headings */}
              <div className="lg:col-span-8 relative min-h-[165px] sm:min-h-[250px] flex items-end">
                {HERO_SHOWCASE_FRAMES.map((frame, i) => {
                  const isCurrent = i === safeIdx;
                  return (
                    <div
                      key={frame.id}
                      className={`w-full transition-all duration-500 ease-out ${
                        isCurrent
                          ? 'opacity-100 translate-y-0 relative z-10'
                          : 'opacity-0 translate-y-5 absolute inset-x-0 bottom-0 pointer-events-none z-0'
                      }`}
                    >
                      <h2 className="font-display font-extrabold text-[clamp(2rem,6.4vw,6.4rem)] leading-[0.96] tracking-[-0.035em] text-sand">
                        {frame.titleLine1}
                        <span className={`block ${frame.accentColor}`}>{frame.titleLine2}</span>
                      </h2>
                      <p className="mt-2.5 sm:mt-4 max-w-2xl text-sm sm:text-xl text-sand/80 leading-relaxed">
                        {frame.desc}
                      </p>
                      {/* Compact Benchmark Badge on Mobile/Tablet */}
                      <div className="mt-3 flex lg:hidden items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-ink/80 border border-white/15 font-mono text-xs text-lime font-bold">
                          {frame.statBig} · {frame.statSub}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right 4 Cols: Floating Architectural Telemetry Card */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="rounded-[1.75rem] bg-[#071312]/90 border border-white/15 p-6 shadow-2xl card-smoke">
                  <CardSmoke tone="dark" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[11px] text-sand/55 mb-2">
                      <span>VERIFIED BENCHMARK</span>
                      <Sparkles size={14} className="text-lime" />
                    </div>
                    <div className={`font-display font-extrabold text-5xl leading-none bg-transparent ${activeFrame.accentColor}`}>
                      {activeFrame.statBig}
                    </div>
                    <p className="font-mono text-xs text-sand/70 mt-2">{activeFrame.statSub}</p>
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-sand/60">PRODUCTION CASE STUDY</span>
                      <Link
                        to="/customers"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-lime hover:underline"
                      >
                        Inspect <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4-Chapter Selector Tabs (No Progress Bars) */}
            <div className="pt-3 sm:pt-4 border-t border-white/15">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {HERO_SHOWCASE_FRAMES.map((frame, i) => (
                  <ChapterScrubberButton
                    key={frame.id}
                    frame={frame}
                    index={i}
                    isCurrent={i === safeIdx}
                    onSelect={jumpToFrame}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 1. AWWWARDS STICKY SCROLL-OVERLAP DECK (Hardware-Accelerated 120FPS)
 * 4 monumental full-screen cards that slide up and overlap each other on scroll
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
      cardBg: 'bg-[#091413] border-lime/25 text-sand card-smoke',
      smokeTone: 'dark',
      accentText: 'text-lime',
      pillBg: 'bg-lime/15 text-lime border-lime/30',
      tagChip: 'bg-white/5 text-sand/80 border-white/10',
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
      cardBg: 'bg-[#071d1b] border-aqua/30 text-sand card-smoke',
      smokeTone: 'aqua',
      accentText: 'text-aqua',
      pillBg: 'bg-aqua/15 text-aqua border-aqua/30',
      tagChip: 'bg-white/5 text-sand/80 border-white/10',
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
      cardBg: 'bg-lime border-ink/15 text-ink card-smoke-light',
      smokeTone: 'light',
      accentText: 'text-ink',
      pillBg: 'bg-ink text-lime border-ink',
      tagChip: 'bg-ink/10 text-ink border-ink/15 font-semibold',
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
      cardBg: 'bg-sand border-ink/15 text-ink card-smoke-light',
      smokeTone: 'light',
      accentText: 'text-[#ff5a36]',
      pillBg: 'bg-ink text-sand border-ink',
      tagChip: 'bg-ink/[0.07] text-ink border-ink/15 font-semibold',
      btnVariant: 'dark',
    },
    visualType: 'mobile',
  },
];

function SlideVisualArt({ type }) {
  if (type === 'web') {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-[#050b0a] border border-white/10 p-4 sm:p-7 overflow-hidden flex flex-col justify-between group">
        <div className="absolute inset-0 dots opacity-40 pointer-events-none" />

        {/* Top Browser Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-3.5">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-coral/80 shrink-0" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-lime/80 shrink-0" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-aqua/80 shrink-0" />
            <span className="ml-1 sm:ml-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] sm:text-[10px] text-sand/70 truncate">
              https://flagship.aura.studio
            </span>
          </div>
          <span className="px-2 sm:px-2.5 py-1 rounded-full bg-lime/15 text-lime font-mono text-[9px] sm:text-[10px] font-bold border border-lime/30 shrink-0">
            120 FPS
          </span>
        </div>

        {/* Center Layered Visual Mockup */}
        <div className="relative z-10 my-auto py-4 sm:py-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-lime mb-2">
            // INTERACTIVE FLAGSHIP ENGINE
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-5xl text-sand leading-[0.95] tracking-tight">
            Kinetic craft.<br />
            <span className="text-lime">Zero friction.</span>
          </div>

          {/* Inner metric cards */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 sm:p-4 group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-sand/50 mb-1">
                <span>CORE VITALS</span>
                <Zap size={13} className="text-lime shrink-0" />
              </div>
              <div className="font-display font-extrabold text-xl sm:text-3xl text-lime">100 / 100</div>
              <div className="text-[10px] sm:text-[11px] text-sand/50 mt-0.5">Sub-second First Paint</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 sm:p-4 group-hover:translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-sand/50 mb-1">
                <span>CONVERSION</span>
                <ArrowUpRight size={13} className="text-aqua shrink-0" />
              </div>
              <div className="font-display font-extrabold text-xl sm:text-3xl text-aqua">+240%</div>
              <div className="text-[10px] sm:text-[11px] text-sand/50 mt-0.5">Average Client Lift</div>
            </div>
          </div>
        </div>

        {/* Bottom Ribbon inside card */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-sand/50">
          <span>SSR STREAMING: ACTIVE</span>
          <span className="text-lime">● EDGE CACHED (14ms)</span>
        </div>
      </div>
    );
  }

  if (type === 'saas') {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-[#04100f] border border-aqua/25 p-4 sm:p-7 overflow-hidden flex flex-col justify-between group">
        <div className="absolute inset-0 dots opacity-40 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-3.5">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-aqua min-w-0">
            <Server size={15} className="shrink-0" />
            <span className="truncate">CLOUD CLUSTER // MULTI-REGION MESH</span>
          </div>
          <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-aqua/15 text-aqua font-mono text-[9px] sm:text-[10px] border border-aqua/30 shrink-0">
            HEALTHY
          </span>
        </div>

        {/* Interactive Node Stack (No Progress Bars) */}
        <div className="relative z-10 my-auto py-3 sm:py-4 space-y-2.5 sm:space-y-3">
          {[
            { region: 'US-EAST · Virginia Edge', qps: '42.8k req/s', lat: '4.2ms', status: '99.999% SLA', c: 'text-lime border-lime/30 bg-lime/10' },
            { region: 'EU-CENTRAL · Frankfurt', qps: '31.4k req/s', lat: '7.8ms', status: 'ACTIVE MESH', c: 'text-aqua border-aqua/30 bg-aqua/10' },
            { region: 'AP-EAST · Tokyo Cluster', qps: '28.9k req/s', lat: '6.1ms', status: 'EDGE SYNCED', c: 'text-lime border-lime/30 bg-lime/10' },
          ].map((node, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 sm:p-3.5 hover:border-aqua/40 transition-colors flex items-center justify-between gap-2 sm:gap-3">
              <div className="min-w-0">
                <span className="text-sand font-mono text-[11px] sm:text-xs font-semibold block truncate">{node.region}</span>
                <span className="text-aqua font-mono text-[10px] sm:text-[11px]">{node.qps} · <b className="text-lime">{node.lat}</b></span>
              </div>
              <span className={`px-2 sm:px-2.5 py-1 rounded-full border font-mono text-[9px] sm:text-[10px] font-bold shrink-0 ${node.c}`}>
                {node.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-sand/50">
          <span>ZERO-DOWNTIME CI/CD</span>
          <span className="text-aqua">● AUTO-SCALING: 64 PODS</span>
        </div>
      </div>
    );
  }

  if (type === 'ai') {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-ink text-sand p-4 sm:p-7 overflow-hidden flex flex-col justify-between shadow-2xl group">
        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-3.5">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-lime min-w-0">
            <Sparkles size={15} className="shrink-0" />
            <span className="truncate">AURA NEURAL AGENT // ORCHESTRATOR</span>
          </div>
          <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-lime text-ink font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
            LIVE STREAM
          </span>
        </div>

        {/* Neural Pipeline Steps */}
        <div className="relative z-10 my-auto py-3 sm:py-4 space-y-2.5 sm:space-y-3 font-mono text-[11px] sm:text-xs">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[9px] sm:text-[10px] text-sand/40 block mb-1">01 // SEMANTIC VECTOR RETRIEVAL</span>
            <p className="text-sand/90">Indexed 1.4M enterprise docs in <span className="text-lime font-bold">11.2ms</span></p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-lime/10 border border-lime/30">
            <span className="text-[9px] sm:text-[10px] text-lime block mb-1">02 // AUTONOMOUS REASONING LOOP</span>
            <p className="text-sand">Executing multi-step SQL & API tool calls with deterministic verification ✓</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] text-sand/40 block">03 // PRODUCTION OUTPUT</span>
              <span className="text-aqua font-bold">Zero Hallucination Guardrails Passed</span>
            </div>
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-lime text-ink flex items-center justify-center font-bold shrink-0">✓</span>
          </div>
        </div>

        <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-sand/50">
          <span>MODEL: CUSTOM RAG + CLAUDE / GPT</span>
          <span className="text-lime">185 TOKENS / SEC</span>
        </div>
      </div>
    );
  }

  // Mobile & Design Systems
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-ink text-sand p-4 sm:p-7 overflow-hidden flex flex-col justify-between shadow-2xl group">
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-3.5">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-lime min-w-0">
          <Smartphone size={15} className="shrink-0" />
          <span className="truncate">120Hz NATIVE GESTURE ENGINE</span>
        </div>
        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/10 text-sand font-mono text-[9px] sm:text-[10px] shrink-0">
          iOS & ANDROID
        </span>
      </div>

      {/* Dual Floating App Cards */}
      <div className="relative z-10 my-auto py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 p-3.5 sm:p-4 flex flex-col justify-between min-h-[135px] sm:min-h-[170px] group-hover:-rotate-1 transition-transform duration-500">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-lime text-ink font-mono text-[10px] font-bold">APP STORE</span>
            <span className="font-mono text-xs text-lime">★ 4.9</span>
          </div>
          <div>
            <p className="font-display font-extrabold text-xl sm:text-2xl text-sand mt-2.5 sm:mt-3">Fluid Touch Physics</p>
            <p className="text-xs text-sand/60 mt-1">Spring-driven gestures & instant offline SQLite sync.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-lime/20 to-aqua/10 border border-lime/30 p-3.5 sm:p-4 flex flex-col justify-between min-h-[135px] sm:min-h-[170px] group-hover:rotate-1 transition-transform duration-500">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-aqua text-ink font-mono text-[10px] font-bold">DESIGN TOKENS</span>
            <Layers size={14} className="text-aqua" />
          </div>
          <div>
            <p className="font-display font-extrabold text-xl sm:text-2xl text-sand mt-2.5 sm:mt-3">60+ UI Primitives</p>
            <p className="text-xs text-sand/70 mt-1">WCAG AAA accessible components synced with Figma.</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-sand/50">
        <span>OTA INSTANT UPDATES</span>
        <span className="text-lime">● 99.98% CRASH-FREE SESSIONS</span>
      </div>
    </div>
  );
}

function StickyOverlapCard({ slide, index, total, smoothScroll }) {
  const cardRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(84 + index * 20);
  const isLast = index === total - 1;
  const startScale = index * (1 / total);
  const targetScale = isLast ? 1 : 1 - (total - 1 - index) * 0.038;
  const scale = useTransform(smoothScroll, [startScale, 1], [1, targetScale], { clamp: true });

  // Viewport-aware sticky top: on desktop (where card fits in viewport), pins at top (84px + offset).
  // On mobile/short screens (where card is taller than viewport), allows scrolling through 100% of
  // the card until its bottom edge is visible before pinning and letting the next slide overlap!
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const calc = () => {
      if (!cardRef.current) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const cardH = cardRef.current.offsetHeight;
      const baseTop = (vw < 640 ? 72 : 84) + index * (vw < 640 ? 12 : 20);
      const bottomAlignedTop = vh - cardH - (vw < 640 ? 16 : 24);
      setStickyTop(Math.round(Math.min(baseTop, bottomAlignedTop)));
    };
    calc();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(calc);
      ro.observe(el);
    }
    window.addEventListener('resize', calc, { passive: true });
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, [index]);

  return (
    <div
      className="sticky w-full pb-10 sm:pb-16"
      style={{
        top: `${stickyTop}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        ref={cardRef}
        style={{ scale, transformOrigin: 'top center' }}
        className={`relative w-full rounded-[1.75rem] sm:rounded-[3rem] border p-5 sm:p-10 lg:p-14 shadow-2xl overflow-hidden transform-gpu will-change-transform [backface-visibility:hidden] ${slide.theme.cardBg}`}
      >
        {/* Subtle GPU Smoke Plumes inside every card component */}
        <CardSmoke tone={slide.theme.smokeTone} />

        {/* Top Index & Category Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-4 pb-4 mb-5 sm:pb-6 sm:mb-8 border-b border-current/10">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`px-3 sm:px-3.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold border truncate ${slide.theme.pillBg}`}>
              {slide.tag}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs opacity-60">
            <span>SCROLL TO OVERLAP</span>
            <span>↓</span>
          </div>
        </div>

        {/* Main 12-Col Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-[clamp(1.9rem,5.2vw,4.75rem)] leading-[0.98] sm:leading-[0.96] tracking-tight">
                {slide.title[0]}
                <span className={`block ${slide.theme.accentText}`}>{slide.title[1]}</span>
              </h3>

              <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg opacity-80 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Key Deliverables */}
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5">
                {slide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-base opacity-90">
                    <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] sm:text-xs font-bold ${slide.theme.pillBg}`}>
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="mt-5 sm:mt-7 flex flex-wrap gap-1.5 sm:gap-2">
                {slide.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-mono text-[10px] sm:text-xs border ${slide.theme.tagChip}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Stat + Standardized CTA Row */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-current/10 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
              <div>
                <div className={`font-display font-extrabold text-3xl sm:text-5xl leading-none bg-transparent ${slide.theme.accentText}`}>
                  {slide.statVal}
                </div>
                <div className="font-mono text-[11px] sm:text-xs opacity-65 mt-1">{slide.statLabel}</div>
              </div>

              <WaterButton to="/contact" variant={slide.theme.btnVariant}>
                Build with this stack <ArrowUpRight size={16} />
              </WaterButton>
            </div>
          </div>

          {/* Right Column: Layered Visual Art */}
          <div className="lg:col-span-5 h-full w-full">
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
          smoothScroll={scrollYProgress}
        />
      ))}
    </div>
  );
}

export const NeuralSpatialCore = SoftwareSolutionsBento;
export const SoftwareEngineCore = SoftwareSolutionsBento;


/* ============================================================================
 * 2. SUPAH 3D FANNED DRAG & WHEEL CAROUSEL (codepen.io/supah/pen/xxJMbbg)
 * Interactive diagonal fanned card stack with drag, wheel, and click-to-focus
 * + Awwwards Kinetic Hover-Curtain Capabilities Matrix
 * ============================================================================ */
const SUPAH_CAROUSEL_ITEMS = [
  {
    num: '01',
    client: 'KINETIX LUXURY',
    title: '3D WebGL Flagship',
    metric: '+310% Conversion',
    tag: 'Next.js 15 · Shaders',
    img: '/images/flagship.jpg',
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '02',
    client: 'HYPERION FINTECH',
    title: 'Trading Terminal',
    metric: '4ms Latency',
    tag: 'Rust WASM · React 19',
    img: '/images/clarity.jpg',
    fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '03',
    client: 'SYNAPSE AI LABS',
    title: 'Neural Agent Workspace',
    metric: '10× Velocity',
    tag: 'LangGraph · Vector DB',
    img: '/images/work1.jpg',
    fallback: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '04',
    client: 'ORBITAL CLOUD',
    title: 'Global API Mesh',
    metric: '48M Req / Day',
    tag: 'Golang · Kubernetes',
    img: '/images/lasting.jpg',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '05',
    client: 'VORTEX MOBILE',
    title: '120Hz Consumer App',
    metric: '4.9★ App Store',
    tag: 'React Native · Reanimated',
    img: '/images/work3.jpg',
    fallback: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '06',
    client: 'AETHER BIOTECH',
    title: 'Genomic Data Portal',
    metric: 'SOC 2 Assured',
    tag: 'Python · WebGPU',
    img: '/images/human.jpg',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '07',
    client: 'MONOLITH STUDIO',
    title: 'Spatial Design System',
    metric: '100/100 Vitals',
    tag: 'Multi-Brand Tokens',
    img: '/images/work4.jpg',
    fallback: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '08',
    client: 'NOVA COMMERCE',
    title: 'Headless Checkout Engine',
    metric: '0.28s LCP',
    tag: 'Edge SSR · Stripe',
    img: '/images/work2.jpg',
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
];

const KINETIC_ROWS = [
  { num: '01', name: 'Custom Web Applications', detail: 'Next.js 15 · React 19 · GSAP · Sub-Second LCP', stat: '100/100 Vitals' },
  { num: '02', name: 'Full-Stack SaaS Platforms', detail: 'Multi-Tenant · Stripe Billing · SSO & RBAC', stat: '99.999% Uptime' },
  { num: '03', name: 'AI Agents & LLM Workflows', detail: 'Custom RAG · Vector Search · Tool Calling', stat: '10× Efficiency' },
  { num: '04', name: 'Cloud & API Microservices', detail: 'Go · Node.js · GraphQL · Kubernetes · AWS', stat: '<8ms Latency' },
  { num: '05', name: 'Mobile Apps & Design Systems', detail: 'iOS & Android · React Native · Figma Tokens', stat: '4.9★ Rated' },
];

// Exact getZindex helper from Fabio Ottaviani (supah) CodePen xxJMbbg
function getZindex(array, index) {
  return array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));
}

export function TechStackAndWhyUs() {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(0);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const draggedRef = useRef(false);

  const total = SUPAH_CAROUSEL_ITEMS.length;
  const safeActive = Number.isInteger(active) ? Math.max(0, Math.min(total - 1, active)) : 0;
  const zIndexes = getZindex(SUPAH_CAROUSEL_ITEMS, safeActive);

  const commitProgress = (nextProg) => {
    const clamped = Math.max(0, Math.min(100, Number.isFinite(nextProg) ? nextProg : 0));
    progressRef.current = clamped;
    const nextIdx = Math.max(0, Math.min(total - 1, Math.round((clamped / 100) * (total - 1)) || 0));
    if (nextIdx !== activeRef.current) {
      activeRef.current = nextIdx;
      setActive(nextIdx);
    }
  };

  // Sticky Vertical Scroll -> 1:1 Synced with Horizontal Supah Carousel (Only re-renders when active card index changes!)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!Number.isFinite(v) || isDownRef.current) return;
    commitProgress(v * 100);
  });

  const handlePointerDown = (e) => {
    isDownRef.current = true;
    draggedRef.current = false;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    startXRef.current = Number.isFinite(clientX) ? clientX : 0;
    startYRef.current = Number.isFinite(clientY) ? clientY : 0;
  };

  const handlePointerMove = (e) => {
    if (!isDownRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? startYRef.current;
    if (!Number.isFinite(x)) return;
    const diffX = x - startXRef.current;
    const diffY = y - startYRef.current;
    // On touch screens, let vertical scroll pass through naturally unless user swipes horizontally
    if (e.touches && Math.abs(diffY) > Math.abs(diffX)) return;
    if (Math.abs(diffX) > 4) draggedRef.current = true;
    const mouseProgress = diffX * -0.18;
    startXRef.current = x;
    startYRef.current = y;
    commitProgress(progressRef.current + mouseProgress);
  };

  const handlePointerUp = () => {
    isDownRef.current = false;
  };

  const selectCard = (i) => {
    if (draggedRef.current) return;
    const safeTarget = Math.max(0, Math.min(total - 1, i || 0));
    const ratio = safeTarget / (total - 1);
    commitProgress(ratio * 100);
    // Sync window scroll position within the sticky runway so scroll & click stay aligned
    const el = scrollRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const absTop = window.scrollY + rect.top;
      const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
      const targetY = absTop + ratio * scrollable;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 0.9 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* PART A: FULL-WIDTH UNBOXED STICKY SUPAH 3D FANNED DRAG & SCROLL CAROUSEL */}
      <div ref={scrollRef} className="relative h-[280vh] sm:h-[360vh] w-full">
        <div
          style={{ position: 'sticky', top: 0 }}
          className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden"
        >
          {/* Full-Bleed 100vw Supah 3D Fanned Carousel Stage (Not in any box) */}
          <div
            ref={stageRef}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            className="supah-carousel w-full flex-1 min-h-0 cursor-grab active:cursor-grabbing"
          >
            {/* Ambient Background Watermark */}
            <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <span
                className="font-display font-extrabold text-[19vw] leading-none text-transparent whitespace-nowrap opacity-15"
                style={{ WebkitTextStroke: '1px rgba(200, 255, 77, 0.22)' }}
              >
                AURA FLAGSHIPS //
              </span>
            </div>

            {SUPAH_CAROUSEL_ITEMS.map((item, index) => {
              const isCurrent = index === safeActive;
              const activeRatio = (index - safeActive) / total;
              return (
                <div
                  key={item.num}
                  data-hot
                  onClick={() => selectCard(index)}
                  style={{
                    '--items': total,
                    '--zIndex': zIndexes[index],
                    '--active': activeRatio,
                  }}
                  className={`supah-carousel-item group border card-smoke ${
                    isCurrent ? 'border-lime/70' : 'border-white/15 hover:border-white/35'
                  }`}
                >
                  <div className="supah-carousel-box">
                    {/* Subtle Smoke Effect inside every Card Component */}
                    <CardSmoke tone="dark" />

                    {/* High-Res Background Image */}
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onError={(e) => {
                        if (e.currentTarget.src !== item.fallback) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = item.fallback;
                        }
                      }}
                      className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Top Row inside Card: Giant Supah Number + Metric Pill */}
                    <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex items-start justify-between gap-2">
                      <span className="font-display font-extrabold text-4xl sm:text-7xl leading-none text-sand/90 bg-transparent tracking-tight">
                        {item.num}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-lime text-ink font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        {item.metric}
                      </span>
                    </div>

                    {/* Bottom Row inside Card: Client, Title, Tech Tag & Link */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col justify-end">
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-lime font-bold mb-1">
                        {item.client}
                      </span>
                      <h4 className="font-display font-extrabold text-xl sm:text-3xl text-sand leading-tight">
                        {item.title}
                      </h4>
                      <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] sm:text-[11px] text-sand/75 truncate">{item.tag}</span>
                        <Link
                          to="/customers"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sand text-ink flex items-center justify-center hover:bg-lime transition-colors shrink-0"
                          aria-label={`View ${item.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART B: AWWWARDS KINETIC HOVER-CURTAIN CAPABILITIES MATRIX */}
      <div className="gutter">
        <div className="rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-[#071110]/95 p-5 sm:p-12 shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 mb-3 sm:mb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-lime font-bold block mb-2">
                // INTERACTIVE CAPABILITIES INDEX
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-5xl text-sand leading-tight sm:leading-none">
                Full-stack mastery. Zero templates.
              </h3>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-sand/50">HOVER ANY DISCIPLINE TO EXPAND</span>
          </div>

          <div className="relative z-10 divide-y divide-white/10">
            {KINETIC_ROWS.map((row, i) => {
              const isActive = hoveredRow === i;
              return (
                <Link
                  to="/product"
                  key={row.num}
                  data-hot
                  onMouseEnter={() => setHoveredRow(i)}
                  className="group relative block py-5 sm:py-9 px-3 sm:px-6 overflow-hidden rounded-2xl transition-colors"
                >
                  {/* Sliding Lime Curtain Background on Hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      scaleY: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'bottom' }}
                    className="absolute inset-0 bg-lime pointer-events-none z-0 rounded-2xl will-change-transform"
                  />

                  <div className="relative z-10 grid grid-cols-12 items-center gap-x-3 gap-y-2 sm:gap-4">
                    <span className={`col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm font-bold bg-transparent transition-colors duration-300 ${isActive ? 'text-ink' : 'text-lime'}`}>
                      /{row.num}
                    </span>

                    <div className="col-span-10 sm:col-span-6">
                      <h4 className={`font-display font-extrabold text-xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-500 ${isActive ? 'text-ink sm:translate-x-3' : 'text-sand'}`}>
                        {row.name}
                      </h4>
                    </div>

                    <div className={`col-span-9 sm:col-span-3 font-mono text-[11px] sm:text-sm transition-colors duration-300 ${isActive ? 'text-ink/80 font-semibold' : 'text-sand/55'}`}>
                      {row.detail}
                    </div>

                    <div className="col-span-3 sm:col-span-2 flex justify-end items-center gap-3">
                      <span className={`hidden xl:inline-block px-3 py-1 rounded-full font-mono text-xs font-bold border transition-colors duration-300 ${isActive ? 'bg-ink text-lime border-ink' : 'bg-white/5 text-sand/70 border-white/10'}`}>
                        {row.stat}
                      </span>
                      <span className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-ink text-lime rotate-45 scale-110' : 'border border-white/20 text-sand'}`}>
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SpaceExplorer = TechStackAndWhyUs;
