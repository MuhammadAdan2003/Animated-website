import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Thermometer, Users, Wind, Sparkles, Check, Activity, ShieldCheck, 
  Layers, Sliders, Play, Pause, RefreshCw, Zap, Volume2, Maximize2, 
  Compass, Eye, ArrowUpRight, Cpu, Radio, ChevronRight
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
      ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
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


/* ==================================================================
 * 1. NEURAL SPATIAL CORE — Multi-Layer Simulation Engine
 * Replaces the static Bento with a live, interactive spatial matrix
 * ================================================================== */
export function NeuralSpatialCore() {
  const [mode, setMode] = useState('flow'); // 'flow' | 'thermal' | 'acoustic' | 'layout'
  const [timeHour, setTimeHour] = useState(14); // 08:00 to 22:00
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeLayer, setActiveLayer] = useState(null);
  const canvasRef = useRef(null);
  const [ref, inView] = useInView();

  // Metrics driven by time-of-day slider
  const metrics = useMemo(() => {
    const timeRatio = (timeHour - 8) / 14; // 0 to 1
    const peakCurve = Math.sin(timeRatio * Math.PI); // 0 at morning/night, 1 at midday
    const occ = Math.round(180 + peakCurve * 340);
    const hvac = Math.round(38 + peakCurve * 44);
    const co2 = Math.round(410 + peakCurve * 190);
    const eff = Math.round(92 + (1 - peakCurve * 0.15) * 6);
    return { occ, hvac, co2, eff };
  }, [timeHour]);

  // Live simulation canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle pool for flow dynamics
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 420,
      vx: (Math.random() - 0.5) * 1.5 + 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1.5,
      alpha: Math.random() * 0.7 + 0.3,
      corridor: Math.floor(Math.random() * 3),
    }));

    const corridors = [
      { y: 110, h: 60, speed: 1.2 },
      { y: 220, h: 70, speed: 1.6 },
      { y: 320, h: 55, speed: 1.0 },
    ];

    const loop = () => {
      t += 0.018;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      // Subtle architectural blueprint grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Draw active mode simulation
      if (mode === 'flow') {
        // --- 1. FLOW DYNAMICS: Vector streams & pedestrian particles ---
        // Corridor velocity bands
        corridors.forEach((c) => {
          const grad = ctx.createLinearGradient(0, c.y, 0, c.y + c.h);
          grad.addColorStop(0, 'rgba(200,255,77,0.03)');
          grad.addColorStop(0.5, 'rgba(200,255,77,0.09)');
          grad.addColorStop(1, 'rgba(200,255,77,0.03)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, c.y, w, c.h);

          // Flow stream lines
          ctx.strokeStyle = 'rgba(200,255,77,0.18)';
          ctx.setLineDash([12, 18]);
          ctx.lineDashOffset = -t * 40 * c.speed;
          ctx.beginPath();
          ctx.moveTo(0, c.y + c.h / 2);
          ctx.lineTo(w, c.y + c.h / 2);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Moving particles
        particles.forEach((p) => {
          if (isSimulating) {
            const corr = corridors[p.corridor];
            p.x += p.vx * corr.speed;
            p.y += p.vy;
            if (p.y < corr.y + 4) p.vy = Math.abs(p.vy);
            if (p.y > corr.y + corr.h - 4) p.vy = -Math.abs(p.vy);
            if (p.x > w + 20) p.x = -20;
          }

          ctx.fillStyle = `rgba(200,255,77,${p.alpha * 0.9})`;
          ctx.shadowColor = '#c8ff4d';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

      } else if (mode === 'thermal') {
        // --- 2. THERMAL ENVELOPE: Radiant isotherms & air diffusers ---
        const centers = [
          { x: w * 0.28, y: h * 0.45, temp: 24.8, type: 'hot' },
          { x: w * 0.65, y: h * 0.38, temp: 20.4, type: 'cool' },
          { x: w * 0.50, y: h * 0.75, temp: 22.1, type: 'bal' },
        ];

        centers.forEach((c, idx) => {
          const r = 110 + Math.sin(t * 1.5 + idx) * 15;
          const grad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, r);
          if (c.type === 'hot') {
            grad.addColorStop(0, 'rgba(255,107,74,0.35)');
            grad.addColorStop(0.6, 'rgba(255,107,74,0.12)');
            grad.addColorStop(1, 'rgba(255,107,74,0)');
          } else if (c.type === 'cool') {
            grad.addColorStop(0, 'rgba(56,224,204,0.35)');
            grad.addColorStop(0.6, 'rgba(56,224,204,0.12)');
            grad.addColorStop(1, 'rgba(56,224,204,0)');
          } else {
            grad.addColorStop(0, 'rgba(200,255,77,0.28)');
            grad.addColorStop(0.6, 'rgba(200,255,77,0.08)');
            grad.addColorStop(1, 'rgba(200,255,77,0)');
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Diffuser badge
          ctx.strokeStyle = c.type === 'hot' ? '#ff6b4a' : c.type === 'cool' ? '#38e0cc' : '#c8ff4d';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#f3eee3';
          ctx.font = '11px JetBrains Mono';
          ctx.fillText(`${c.temp}°C`, c.x + 14, c.y + 4);
        });

      } else if (mode === 'acoustic') {
        // --- 3. ACOUSTIC ZONING: Propagating soundwaves & damping barriers ---
        const emitters = [
          { x: w * 0.3, y: h * 0.5, label: 'Collaboration Hub' },
          { x: w * 0.72, y: h * 0.45, label: 'Acoustic Sound Pod' },
        ];

        emitters.forEach((em, idx) => {
          for (let i = 0; i < 4; i++) {
            const rad = ((t * 45 + i * 40) % 160) + 12;
            const alpha = Math.max(0, 1 - rad / 160) * 0.45;
            ctx.strokeStyle = idx === 0 ? `rgba(200,255,77,${alpha})` : `rgba(56,224,204,${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(em.x, em.y, rad, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.fillStyle = idx === 0 ? '#c8ff4d' : '#38e0cc';
          ctx.beginPath();
          ctx.arc(em.x, em.y, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#f3eee3';
          ctx.font = '11px JetBrains Mono';
          ctx.fillText(em.label, em.x - 40, em.y - 14);
        });

        // Acoustic baffle partition wall
        ctx.strokeStyle = '#c8ff4d';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.52, h * 0.2);
        ctx.lineTo(w * 0.52, h * 0.8);
        ctx.stroke();
        ctx.fillStyle = 'rgba(200,255,77,0.7)';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('ACTIVE SOUND-MASKING BAFFLE (98.4% ISOLATION)', w * 0.53, h * 0.5);

      } else if (mode === 'layout') {
        // --- 4. GENERATIVE LAYOUTS: Morphing modular partition grid ---
        const morph = Math.sin(t * 0.8) * 0.5 + 0.5;
        const boxes = [
          { x: 40 + morph * 30, y: 50, w: 220 - morph * 20, h: 140, name: 'Team Cluster A' },
          { x: 300 - morph * 20, y: 50, w: 200 + morph * 40, h: 140, name: 'Open Lounge' },
          { x: 540 + morph * 20, y: 50, w: 200 - morph * 20, h: 140, name: 'Focus Enclave' },
          { x: 60, y: 230 + morph * 15, w: 320 - morph * 30, h: 130, name: 'Executive Pod' },
          { x: 420 - morph * 15, y: 230, w: 320 + morph * 30, h: 130, name: 'Townhall Forum' },
        ];

        boxes.forEach((b) => {
          ctx.fillStyle = 'rgba(255,255,255,0.03)';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = 'rgba(200,255,77,0.45)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(b.x, b.y, b.w, b.h);

          ctx.fillStyle = '#c8ff4d';
          ctx.font = '12px Bricolage Grotesque';
          ctx.fillText(b.name, b.x + 14, b.y + 28);
          ctx.fillStyle = 'rgba(243,238,227,0.5)';
          ctx.font = '10px JetBrains Mono';
          ctx.fillText(`Efficiency Score: ${(92 + morph * 6).toFixed(1)}%`, b.x + 14, b.y + b.h - 14);
        });
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [mode, isSimulating]);

  return (
    <div ref={ref} className="w-full">
      {/* Top Controller Bar */}
      <div className="glass rounded-3xl p-4 sm:p-6 mb-6 flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {[
            { id: 'flow', label: 'Pedestrian Flow', icon: Activity, metric: '14ms Telemetry' },
            { id: 'thermal', label: 'Thermal Envelope', icon: Thermometer, metric: '±0.2°C Delta' },
            { id: 'acoustic', label: 'Acoustic Zoning', icon: Volume2, metric: '38dB Floor' },
            { id: 'layout', label: 'Generative Layout', icon: Sliders, metric: '120 Permutations' },
          ].map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  active 
                    ? 'bg-lime text-ink font-bold shadow-[0_0_24px_rgba(200,255,77,0.35)]' 
                    : 'text-sand/70 hover:text-sand hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{m.label}</span>
                <span className={`hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded-full ${
                  active ? 'bg-ink/15 text-ink' : 'bg-white/10 text-sand/50'
                }`}>
                  {m.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time-of-Day Interactive Scrubber */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-2 bg-ink/50 px-4 py-2 rounded-2xl border border-white/10">
            <Radio size={14} className="text-lime animate-pulse" />
            <span className="font-mono text-xs text-sand/70">TIME OF DAY:</span>
            <span className="font-mono text-xs font-bold text-lime tabular-nums">
              {timeHour.toString().padStart(2, '0')}:00
            </span>
            <input
              type="range"
              min="8"
              max="22"
              value={timeHour}
              onChange={(e) => setTimeHour(+e.target.value)}
              className="w-24 sm:w-32 accent-lime cursor-pointer ml-2"
              aria-label="Time of day scrubber"
            />
          </div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-sand border border-white/10 transition-colors"
            title={isSimulating ? 'Pause simulation' : 'Play simulation'}
          >
            {isSimulating ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Side Telemetry Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Simulation Stage */}
        <div className="lg:col-span-8 glass rounded-[2.5rem] p-4 sm:p-6 relative overflow-hidden border border-white/10 min-h-[460px] flex flex-col justify-between shadow-2xl">
          {/* Top Stage Header */}
          <div className="flex items-center justify-between z-10 px-2 pt-1">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-ping" />
              <span className="font-mono text-xs tracking-widest uppercase text-lime font-bold">
                SPATIAL KERNEL // {mode.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-sand/50">
              <span>LATENCY: 11.4ms</span>
              <span>·</span>
              <span>RESOLUTION: 1440 DPI</span>
            </div>
          </div>

          {/* Canvas Element */}
          <div className="relative w-full h-[340px] sm:h-[380px] my-2 rounded-2xl overflow-hidden border border-white/5 bg-ink/60">
            <canvas ref={canvasRef} className="w-full h-full block" />
            
            {/* Live Mode Watermark Tag */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono text-[10px] text-sand/60">
              <Layers size={12} className="text-lime" />
              <span>ACTIVE SIMULATION: {mode === 'flow' ? 'PEDESTRIAN VECTOR CORRIDORS' : mode === 'thermal' ? 'RADIANT ISOTHERM GAIN' : mode === 'acoustic' ? 'SOUND-MASKING DECIBEL ENVELOPE' : 'PARAMETRIC RECONFIGURABLE MODULES'}</span>
            </div>
          </div>

          {/* Bottom Diagnostics HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 z-10 pt-2 font-mono">
            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl">
              <p className="text-[10px] uppercase text-sand/50">Occupancy</p>
              <p className="text-xl font-bold text-sand mt-0.5">{metrics.occ} <span className="text-xs font-normal text-sand/40">pax</span></p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl">
              <p className="text-[10px] uppercase text-sand/50">HVAC Load</p>
              <p className="text-xl font-bold text-aqua mt-0.5">{metrics.hvac}% <span className="text-xs font-normal text-sand/40">cap</span></p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl">
              <p className="text-[10px] uppercase text-sand/50">Indoor CO₂</p>
              <p className="text-xl font-bold text-lime mt-0.5">{metrics.co2} <span className="text-xs font-normal text-sand/40">ppm</span></p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl">
              <p className="text-[10px] uppercase text-sand/50">Spatial Eff.</p>
              <p className="text-xl font-bold text-sand mt-0.5">{metrics.eff}% <span className="text-xs font-normal text-sand/40">opt</span></p>
            </div>
          </div>
        </div>

        {/* Side Capability Cards (Interactive Glass Tiles) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {[
            {
              id: 'twin',
              title: 'Live Digital Twin Sync',
              desc: 'Every sensor, damper and access turnstile mirrored in real time with 14ms compute latency.',
              stat: '99.98% Fidelity',
              icon: Cpu,
              accent: 'border-lime/30 group-hover:border-lime',
            },
            {
              id: 'predict',
              title: 'Predictive HVAC Autopilot',
              desc: 'Deep models forecast crowd surges 90 minutes ahead, pre-cooling zones to slash peak kWh tariffs.',
              stat: '-34% Energy Load',
              icon: Zap,
              accent: 'border-aqua/30 group-hover:border-aqua',
            },
            {
              id: 'generative',
              title: 'Generative Spatial Layouts',
              desc: 'Input headcount and focus requirements. Aura calculates, scores and verifies 120+ variations.',
              stat: 'Instant Solver',
              icon: Sparkles,
              accent: 'border-lime/30 group-hover:border-lime',
            },
            {
              id: 'trust',
              title: 'Zero-Trust Physical Enclave',
              desc: 'SOC 2 Type II certified. Per-zone cryptographic access credentials with continuous audit playback.',
              stat: 'Enterprise Trust',
              icon: ShieldCheck,
              accent: 'border-white/20 group-hover:border-white/40',
            },
          ].map((c) => {
            const Icon = c.icon;
            const active = activeLayer === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setActiveLayer(active ? null : c.id)}
                className={`group glass rounded-3xl p-6 border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  active ? 'bg-white/10 border-lime shadow-[0_0_24px_rgba(200,255,77,0.2)]' : 'border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lime group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-sand/60 border border-white/10">
                    {c.stat}
                  </span>
                </div>
                <h4 className="font-display font-bold text-xl text-sand group-hover:text-lime transition-colors flex items-center justify-between">
                  {c.title}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-lime" />
                </h4>
                <p className="text-sand/60 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ==================================================================
 * 2. SPACE EXPLORER — Holographic 3D Isometric Facility Twin
 * Replaces the flat 2D brown/olive room boxes with a 3D command deck
 * ================================================================== */
const FACILITY_ZONES = [
  {
    id: 'ai-cluster',
    name: 'Quantum AI Computing Cluster',
    type: 'Critical Infrastructure',
    iso: { x: 50, y: 50, w: 180, h: 140, z: 24 },
    temp: 18.2,
    targetTemp: 18.0,
    cap: 20,
    occ: 6,
    co2: 395,
    noise: 48,
    status: 'Optimal Cryo-Balance',
    color: '#38e0cc', // cyan/aqua
  },
  {
    id: 'biophilic-atrium',
    name: 'Biophilic Sky Atrium',
    type: 'Circadian Commons',
    iso: { x: 250, y: 50, w: 260, h: 150, z: 32 },
    temp: 22.4,
    targetTemp: 22.0,
    cap: 180,
    occ: 124,
    co2: 440,
    noise: 41,
    status: 'Daylight Harvest 94%',
    color: '#c8ff4d', // lime
  },
  {
    id: 'studio-wing',
    name: 'Precision Engineering Wing',
    type: 'Collaborative Studio',
    iso: { x: 50, y: 220, w: 240, h: 160, z: 20 },
    temp: 24.8, // hot zone
    targetTemp: 22.2,
    cap: 120,
    occ: 98,
    co2: 580,
    noise: 54,
    status: 'High Density Alert',
    color: '#ff6b4a', // amber/coral
  },
  {
    id: 'acoustic-pods',
    name: 'Acoustic Deep Work Pods',
    type: 'Focus Enclave',
    iso: { x: 310, y: 230, w: 150, h: 150, z: 28 },
    temp: 21.6,
    targetTemp: 21.5,
    cap: 30,
    occ: 14,
    co2: 410,
    noise: 28,
    status: 'Active Sound-Masking',
    color: '#38e0cc',
  },
  {
    id: 'executive-deck',
    name: 'Executive Hologram Deck',
    type: 'Confidential Zone',
    iso: { x: 480, y: 230, w: 160, h: 150, z: 26 },
    temp: 22.0,
    targetTemp: 22.0,
    cap: 24,
    occ: 16,
    co2: 420,
    noise: 32,
    status: 'Smart Glass 85% Opacity',
    color: '#c8ff4d',
  },
];

export function SpaceExplorer() {
  const [zones, setZones] = useState(FACILITY_ZONES);
  const [selectedId, setSelectedId] = useState('studio-wing');
  const [filterMode, setFilterMode] = useState('radar'); // 'radar' | 'thermal' | 'airflow'
  const [stabilized, setStabilized] = useState({});
  const [lidarX, setLidarX] = useState(0);
  const [ref, inView] = useInView();

  // Selected zone
  const activeZone = zones.find((z) => z.id === selectedId) || zones[0];
  const isHot = activeZone.temp > 23.5 && !stabilized[activeZone.id];
  const isBalanced = stabilized[activeZone.id];

  // Auto-stabilize action
  const handleAutoAdjust = (id) => {
    setStabilized((prev) => ({ ...prev, [id]: true }));
    setZones((prev) =>
      prev.map((z) =>
        z.id === id
          ? { ...z, temp: z.targetTemp, co2: 415, status: 'Aura Autonomous Airflow Balanced' }
          : z
      )
    );
  };

  // Continuous subtle sensor jitter + Lidar sweep animation
  useEffect(() => {
    const timer = setInterval(() => {
      setZones((prev) =>
        prev.map((z) => {
          if (stabilized[z.id]) return z;
          const delta = (Math.random() - 0.5) * 0.15;
          return { ...z, temp: +(z.temp + delta).toFixed(1) };
        })
      );
      setLidarX((prev) => (prev > 800 ? 0 : prev + 25));
    }, 1200);
    return () => clearInterval(timer);
  }, [stabilized]);

  // Isometric projection helper: converts (x, y, z) to 2D SVG space (sx, sy)
  const isoProject = (x, y, z = 0) => {
    const originX = 410;
    const originY = 80;
    // 30 degree isometric angle
    const sx = originX + (x - y) * 0.866;
    const sy = originY + (x + y) * 0.5 - z;
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  };

  return (
    <div ref={ref} className="w-full">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-sand/50 uppercase tracking-widest">LAYER FILTER:</span>
          {[
            { id: 'radar', label: 'Occupancy Radar' },
            { id: 'thermal', label: 'Thermal Infrared' },
            { id: 'airflow', label: 'HVAC Streamlines' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterMode(f.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors ${
                filterMode === f.id
                  ? 'bg-lime text-ink font-bold shadow-md'
                  : 'bg-white/5 text-sand/60 hover:text-sand hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-lime">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span>ISOMETRIC 3D DIGITAL TWIN // LIVE STREAM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* 3D Isometric Viewport */}
        <div className="xl:col-span-8 glass rounded-[2.5rem] p-4 sm:p-8 relative overflow-hidden border border-white/10 min-h-[480px] flex flex-col justify-between shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-lime/10 blur-[100px] pointer-events-none rounded-full" />

          {/* SVG Isometric Floorplan */}
          <svg viewBox="0 0 820 480" className="w-full h-auto block select-none" role="img" aria-label="3D Isometric Digital Twin Floorplan">
            <defs>
              <linearGradient id="lidarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#c8ff4d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
              </linearGradient>
            </defs>

            {/* Isometric Base Grid Platform */}
            <g opacity="0.35">
              {[0, 100, 200, 300, 400, 500, 600, 700].map((gx) => (
                <line
                  key={`gx-${gx}`}
                  x1={isoProject(gx, 0, 0).split(',')[0]}
                  y1={isoProject(gx, 0, 0).split(',')[1]}
                  x2={isoProject(gx, 440, 0).split(',')[0]}
                  y2={isoProject(gx, 440, 0).split(',')[1]}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              ))}
              {[0, 80, 160, 240, 320, 400, 440].map((gy) => (
                <line
                  key={`gy-${gy}`}
                  x1={isoProject(0, gy, 0).split(',')[0]}
                  y1={isoProject(0, gy, 0).split(',')[1]}
                  x2={isoProject(700, gy, 0).split(',')[0]}
                  y2={isoProject(700, gy, 0).split(',')[1]}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* 3D Extruded Zones */}
            {zones.map((z) => {
              const { x, y, w, h } = z.iso;
              const isSelected = selectedId === z.id;
              const lift = isSelected ? 14 : 0;
              const elevation = z.iso.z + lift;

              // Polygon coordinates for 3D faces
              const p0 = isoProject(x, y, elevation);
              const p1 = isoProject(x + w, y, elevation);
              const p2 = isoProject(x + w, y + h, elevation);
              const p3 = isoProject(x, y + h, elevation);

              // Bottom points for vertical wall extrusion
              const b0 = isoProject(x, y, 0);
              const b1 = isoProject(x + w, y, 0);
              const b2 = isoProject(x + w, y + h, 0);
              const b3 = isoProject(x, y + h, 0);

              // Color determination based on filterMode
              let fillColor = 'rgba(255,255,255,0.04)';
              let strokeColor = isSelected ? '#c8ff4d' : 'rgba(255,255,255,0.2)';
              if (filterMode === 'thermal') {
                fillColor = z.temp > 23.5 ? 'rgba(255,107,74,0.25)' : 'rgba(56,224,204,0.22)';
                strokeColor = z.temp > 23.5 ? '#ff6b4a' : '#38e0cc';
              } else if (filterMode === 'radar') {
                const ratio = z.occ / z.cap;
                fillColor = `rgba(200,255,77,${0.08 + ratio * 0.25})`;
                if (isSelected) strokeColor = '#c8ff4d';
              } else if (filterMode === 'airflow') {
                fillColor = 'rgba(56,224,204,0.14)';
                strokeColor = '#38e0cc';
              }

              return (
                <g
                  key={z.id}
                  onClick={() => setSelectedId(z.id)}
                  className="cursor-pointer transition-all duration-500"
                >
                  {/* Front-facing 3D wall extrusions */}
                  <polygon
                    points={`${p3} ${p2} ${b2} ${b3}`}
                    fill="url(#wallGrad)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                  <polygon
                    points={`${p1} ${p2} ${b2} ${b1}`}
                    fill="rgba(0,0,0,0.5)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />

                  {/* Top Roof / Floor Surface */}
                  <polygon
                    points={`${p0} ${p1} ${p2} ${p3}`}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    className="transition-colors duration-300"
                  />

                  {/* Zone Name Label & Floating Telemetry Tag */}
                  <g>
                    {/* Calculate center of top surface */}
                    {(() => {
                      const cx = (x + w / 2);
                      const cy = (y + h / 2);
                      const [sx, sy] = isoProject(cx, cy, elevation).split(',').map(Number);
                      return (
                        <>
                          {/* Pulsing selection ring */}
                          {isSelected && (
                            <circle
                              cx={sx}
                              cy={sy - 6}
                              r="16"
                              fill="none"
                              stroke="#c8ff4d"
                              strokeWidth="1.5"
                              opacity="0.8"
                              className="animate-ping"
                            />
                          )}

                          <circle cx={sx} cy={sy - 6} r="4" fill={isSelected ? '#c8ff4d' : '#f3eee3'} />
                          <text
                            x={sx}
                            y={sy + 14}
                            textAnchor="middle"
                            fill="#f3eee3"
                            fontFamily="Bricolage Grotesque"
                            fontWeight="800"
                            fontSize="13"
                            className="drop-shadow-md pointer-events-none"
                          >
                            {z.name.split(' ')[0]}
                          </text>
                          <text
                            x={sx}
                            y={sy + 28}
                            textAnchor="middle"
                            fill={z.temp > 23.5 && !stabilized[z.id] ? '#ff6b4a' : 'rgba(200,255,77,0.85)'}
                            fontFamily="JetBrains Mono"
                            fontSize="10"
                            className="pointer-events-none"
                          >
                            {z.temp}°C · {z.occ} pax
                          </text>
                        </>
                      );
                    })()}
                  </g>
                </g>
              );
            })}

            {/* Moving Laser LIDAR Scan Line */}
            <line
              x1={lidarX}
              y1="0"
              x2={lidarX - 80}
              y2="480"
              stroke="url(#lidarGrad)"
              strokeWidth="2"
              opacity="0.6"
              className="pointer-events-none"
            />
          </svg>

          {/* Bottom Interactive Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 font-mono text-[11px] text-sand/60">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-lime/60" /> Comfort Optimal</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-coral/60" /> Thermal Surge</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-aqua/60" /> Cryo-Ventilated</span>
            </div>
            <span>Click any zone to inspect & balance</span>
          </div>
        </div>

        {/* Cybernetic Command Inspector (Right Panel) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`glass rounded-[2.5rem] p-6 sm:p-8 border transition-all duration-500 flex flex-col justify-between shadow-2xl relative overflow-hidden ${
              isHot ? 'border-coral/40 bg-coral/5' : 'border-lime/30 bg-lime/5'
            }`}
          >
            {/* Top Inspector Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] tracking-widest uppercase text-sand/50">
                  {activeZone.type}
                </span>
                <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isHot 
                    ? 'bg-coral/10 text-coral border-coral/30' 
                    : 'bg-lime/10 text-lime border-lime/30'
                }`}>
                  {isHot ? 'THERMAL DELTA' : isBalanced ? 'AUTONOMOUSLY OPTIMIZED' : 'ONLINE'}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-sand leading-snug">
                {activeZone.name}
              </h3>
              <p className="font-mono text-xs text-sand/50 mt-1">
                ZONE ID: {activeZone.id.toUpperCase()} // SENSOR ID: SEN-4482
              </p>

              {/* Real-time Oscilloscope Telemetry Sparkline */}
              <div className="my-6 p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between mb-2 font-mono text-[10px] text-sand/50">
                  <span>LIVE SENSOR TELEMETRY</span>
                  <span className="text-lime">100Hz FEED</span>
                </div>
                <svg viewBox="0 0 280 40" className="w-full h-10">
                  <path
                    d="M0,20 Q35,5 70,20 T140,20 T210,10 T280,20"
                    fill="none"
                    stroke={isHot ? '#ff6b4a' : '#c8ff4d'}
                    strokeWidth="2"
                    className="opacity-80"
                  />
                  <path
                    d="M0,20 Q35,5 70,20 T140,20 T210,10 T280,20 L280,40 L0,40 Z"
                    fill={isHot ? 'rgba(255,107,74,0.1)' : 'rgba(200,255,77,0.1)'}
                  />
                </svg>
              </div>

              {/* 4 Sensor Gauges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-sand/60 text-xs font-mono mb-1">
                    <Thermometer size={14} className={isHot ? 'text-coral' : 'text-lime'} />
                    <span>Temperature</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-sand tabular-nums">
                    {activeZone.temp}°C
                  </p>
                  <p className="font-mono text-[10px] text-sand/40">Target {activeZone.targetTemp}°C</p>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-sand/60 text-xs font-mono mb-1">
                    <Users size={14} className="text-aqua" />
                    <span>Occupancy</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-sand tabular-nums">
                    {activeZone.occ}
                  </p>
                  <p className="font-mono text-[10px] text-sand/40">Capacity {activeZone.cap}</p>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-sand/60 text-xs font-mono mb-1">
                    <Wind size={14} className="text-sand/70" />
                    <span>Indoor CO₂</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-sand tabular-nums">
                    {activeZone.co2} <span className="text-xs font-normal">ppm</span>
                  </p>
                  <p className="font-mono text-[10px] text-sand/40">Threshold 800ppm</p>
                </div>

                <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-sand/60 text-xs font-mono mb-1">
                    <Volume2 size={14} className="text-sand/70" />
                    <span>Acoustic Floor</span>
                  </div>
                  <p className="font-display font-bold text-2xl text-sand tabular-nums">
                    {activeZone.noise} <span className="text-xs font-normal">dB</span>
                  </p>
                  <p className="font-mono text-[10px] text-sand/40">Target &lt; 45dB</p>
                </div>
              </div>

              {/* Status Notice */}
              <div className="flex items-start gap-2.5 text-xs text-sand/70 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/5">
                <Sparkles size={16} className="text-lime shrink-0 mt-0.5" />
                <span>
                  {isBalanced
                    ? 'Aura adjusted airflow diffusers & solar blinds. Micro-climate stabilized within target comfort envelope.'
                    : isHot
                    ? 'Thermal load is elevated due to occupancy density. Autonomous cooling sequence ready.'
                    : 'Facility conditions are operating within optimal environmental parameters.'}
                </span>
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <WaterButton
                variant={isBalanced ? 'ghost' : 'solid'}
                className="w-full !py-4 text-sm"
                onClick={() => handleAutoAdjust(activeZone.id)}
              >
                {isBalanced ? (
                  <>
                    <Check size={16} className="text-lime" /> Zone Stabilized
                  </>
                ) : (
                  <>
                    <Zap size={16} /> Auto-Balance Zone
                  </>
                )}
              </WaterButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
