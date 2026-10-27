import React, { useState, useEffect, useMemo, useId, useRef } from 'react';
import { useInView } from './ui.jsx';

/* ------------------------------------------------------------------
 * Deterministic "real" datasets (kWh) — baseline building vs. Aura-managed
 * ------------------------------------------------------------------ */
const noise = (i, s = 1) => {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function buildData(range) {
  if (range === '24H') {
    return {
      unit: 'kWh', tick: 4, rows: Array.from({ length: 24 }, (_, h) => {
        const base = 150 + 160 * Math.max(0, Math.sin(((h - 5) / 14) * Math.PI)) + noise(h) * 16;
        return { label: `${String(h).padStart(2, '0')}:00`, base: Math.round(base), aura: Math.round(base * (0.5 + 0.14 * noise(h, 2))) };
      })
    };
  }
  if (range === '7D') {
    const b = [1840, 1920, 1985, 1960, 1890, 1210, 1040];
    return { unit: 'kWh', tick: 1, rows: b.map((v, i) => ({ label: DAYS[i], base: v, aura: Math.round(v * (0.56 + 0.07 * noise(i, 3))) })) };
  }
  if (range === '30D') {
    return {
      unit: 'kWh', tick: 5, rows: Array.from({ length: 30 }, (_, i) => {
        const v = 1500 + 380 * Math.sin((i / 30) * Math.PI * 2) + (i % 7 > 4 ? -420 : 0) + noise(i, 4) * 90;
        return { label: `${i + 1}`, base: Math.round(v), aura: Math.round(v * (0.55 + 0.08 * noise(i, 5))) };
      })
    };
  }
  const m = [52, 49, 45, 41, 44, 58, 66, 69, 56, 46, 48, 53];
  return { unit: 'MWh', tick: 1, rows: m.map((v, i) => ({ label: MONTHS[i], base: v, aura: +(v * (0.6 + 0.05 * noise(i, 6))).toFixed(1) })) };
}

const smooth = (pts) => {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
};
const niceMax = (v) => {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / p / 0.5) * 0.5 * p;
};
const fmt = (n) => (n >= 1000 ? n.toLocaleString() : `${n}`);

/* ------------------------------------------------------------------
 * AreaChart — interactive, animated, with axes + tooltip
 * ------------------------------------------------------------------ */
export function AreaChart({ rows, unit, tick = 1, show = { base: true, aura: true }, className = '' }) {
  const [ref, on] = useInView();
  const [hover, setHover] = useState(null);
  const id = useId().replace(/:/g, '');
  const W = 800, H = 320, pad = { l: 56, r: 18, t: 18, b: 36 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = niceMax(Math.max(...rows.map((r) => r.base)) * 1.05);
  const x = (i) => pad.l + (i / (rows.length - 1)) * iw;
  const y = (v) => pad.t + ih - (v / max) * ih;
  const line = (k) => smooth(rows.map((r, i) => [x(i), y(r[k])]));
  const area = (k) => `${line(k)} L${x(rows.length - 1)},${pad.t + ih} L${x(0)},${pad.t + ih} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - pad.l) / iw) * (rows.length - 1));
    setHover(Math.max(0, Math.min(rows.length - 1, i)));
  };
  const hr = hover !== null ? rows[hover] : null;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label="Energy consumption chart">
        <defs>
          <linearGradient id={`g-aura-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8ff4d" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c8ff4d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`g-base-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3eee3" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#f3eee3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + ih - t * ih} y2={pad.t + ih - t * ih} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 6" />
            <text x={pad.l - 10} y={pad.t + ih - t * ih + 4} textAnchor="end" fontSize="11" fill="rgba(243,238,227,0.4)" fontFamily="JetBrains Mono">{fmt(Math.round(max * t))}</text>
          </g>
        ))}
        {rows.map((r, i) => (i % tick === 0 ? (
          <text key={i} x={x(i)} y={H - 10} textAnchor="middle" fontSize="11" fill="rgba(243,238,227,0.4)" fontFamily="JetBrains Mono">{r.label}</text>
        ) : null))}

        {show.base && (
          <g style={{ opacity: show.base ? 1 : 0, transition: 'opacity .6s' }}>
            <path d={area('base')} fill={`url(#g-base-${id})`} style={{ opacity: on ? 1 : 0, transition: 'opacity 1.6s ease .5s' }} />
            <path d={line('base')} pathLength="1" fill="none" stroke="rgba(243,238,227,0.55)" strokeWidth="2" strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={{ transition: 'stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)' }} strokeLinecap="round" />
          </g>
        )}
        {show.aura && (
          <g>
            <path d={area('aura')} fill={`url(#g-aura-${id})`} style={{ opacity: on ? 1 : 0, transition: 'opacity 1.6s ease .8s' }} />
            <path d={line('aura')} pathLength="1" fill="none" stroke="#c8ff4d" strokeWidth="3" strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={{ transition: 'stroke-dashoffset 2.4s cubic-bezier(.16,1,.3,1) .2s', filter: 'drop-shadow(0 0 8px rgba(200,255,77,.55))' }} strokeLinecap="round" />
          </g>
        )}

        {hr && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="rgba(200,255,77,0.5)" strokeDasharray="4 4" />
            {show.base && <circle cx={x(hover)} cy={y(hr.base)} r="5" fill="#050a0a" stroke="#f3eee3" strokeWidth="2" />}
            {show.aura && <circle cx={x(hover)} cy={y(hr.aura)} r="6" fill="#050a0a" stroke="#c8ff4d" strokeWidth="3" />}
          </g>
        )}
      </svg>
      {hr && (
        <div className="absolute pointer-events-none glass rounded-xl px-4 py-3 text-xs font-mono whitespace-nowrap z-10" style={{ left: `${(x(hover) / W) * 100}%`, top: 0, transform: `translate(${hover > rows.length * 0.7 ? '-105%' : '12px'}, 8px)` }}>
          <p className="text-sand/50 mb-1.5">{hr.label}</p>
          {show.base && <p className="text-sand/80">Baseline <b className="text-sand ml-2">{fmt(hr.base)} {unit}</b></p>}
          {show.aura && <p className="text-lime">With Aura <b className="ml-2">{fmt(hr.aura)} {unit}</b></p>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * BarChart — hoverable, animated growth
 * ------------------------------------------------------------------ */
export function BarChart({ data, unit = '', height = 260, color = '#c8ff4d', className = '' }) {
  const [ref, on] = useInView();
  const [hov, setHov] = useState(null);
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const top = data.reduce((a, b) => (b.value > a.value ? b : a)).label;
  return (
    <div ref={ref} className={`relative ${className}`} style={{ height }}>
      <div className="absolute inset-0 pl-12 pb-7">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <div key={t} className="absolute left-12 right-0 border-t border-dashed border-white/10" style={{ bottom: `calc(${t * 100}% * (1) + 28px - ${t * 28}px)` }}>
            <span className="absolute -left-12 -translate-y-1/2 w-9 text-right font-mono text-[11px] text-sand/40">{Math.round(max * t)}</span>
          </div>
        ))}
        <div className="relative h-full flex items-end gap-2 sm:gap-3">
          {data.map((d, i) => (
            <div key={d.label} className="relative flex-1 h-full flex items-end" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <div
                className="w-full rounded-t-xl relative"
                style={{
                  height: on ? `${(d.value / max) * 100}%` : '0%',
                  transition: `height 1.4s cubic-bezier(.16,1,.3,1) ${i * 70}ms, opacity .4s, filter .4s`,
                  background: d.label === top ? `linear-gradient(to top, ${color}22, ${color})` : 'linear-gradient(to top, rgba(77,232,207,.08), rgba(77,232,207,.65))',
                  opacity: hov === null || hov === i ? 1 : 0.35,
                  filter: hov === i ? 'brightness(1.25)' : 'none',
                }}
              >
                {hov === i && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 glass rounded-lg px-3 py-1.5 text-xs font-mono whitespace-nowrap">{d.value.toLocaleString()}{unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-12 right-0 bottom-0 flex gap-2 sm:gap-3">
        {data.map((d) => <span key={d.label} className="flex-1 text-center font-mono text-[11px] text-sand/45">{d.label}</span>)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Donut — interactive legend
 * ------------------------------------------------------------------ */
export function Donut({ data, unit = '%', className = '' }) {
  const [ref, on] = useInView();
  const [act, setAct] = useState(null);
  const total = data.reduce((a, b) => a + b.value, 0);
  const R = 74, C = 2 * Math.PI * R;
  let cum = 0;
  return (
    <div ref={ref} className={`flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-8 ${className}`}>
      <div className="relative w-52 h-52 shrink-0">
        <svg viewBox="0 0 200 200" className="-rotate-90 w-full h-full">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="22" />
          {data.map((d, i) => {
            const len = (d.value / total) * C;
            const off = cum;
            cum += len;
            return (
              <circle
                key={d.label}
                cx="100" cy="100" r={R} fill="none"
                stroke={d.color}
                strokeWidth={act === i ? 28 : 22}
                strokeDasharray={on ? `${Math.max(len - 3, 0)} ${C - len + 3}` : `0 ${C}`}
                strokeDashoffset={-off}
                strokeLinecap="butt"
                style={{ transition: `stroke-dasharray 1.6s cubic-bezier(.16,1,.3,1) ${i * 150}ms, stroke-width .4s, opacity .4s`, opacity: act === null || act === i ? 1 : 0.3, cursor: 'pointer' }}
                onMouseEnter={() => setAct(i)}
                onMouseLeave={() => setAct(null)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display font-extrabold text-4xl">{act === null ? total : data[act].value}{unit}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-sand/45">{act === null ? 'Total load' : data[act].label}</span>
        </div>
      </div>
      <ul className="w-full space-y-2">
        {data.map((d, i) => (
          <li key={d.label} onMouseEnter={() => setAct(i)} onMouseLeave={() => setAct(null)} className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl transition-colors duration-300 ${act === i ? 'bg-white/[0.06]' : ''}`}>
            <span className="flex items-center gap-3 text-sm"><span className="w-3 h-3 rounded-full" style={{ background: d.color }} />{d.label}</span>
            <span className="font-mono text-sm text-sand/70">{d.value}{unit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Sparkline */
export function Sparkline({ values, color = '#c8ff4d', className = '' }) {
  const [ref, on] = useInView();
  const W = 120, H = 36;
  const mn = Math.min(...values), mx = Math.max(...values);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * W, H - 4 - ((v - mn) / (mx - mn || 1)) * (H - 8)]);
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className={`w-full h-9 ${className}`} preserveAspectRatio="none">
      <path d={smooth(pts)} pathLength="1" fill="none" stroke={color} strokeWidth="2" strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={{ transition: 'stroke-dashoffset 2s cubic-bezier(.16,1,.3,1)' }} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const sum = (rows, k) => rows.reduce((a, r) => a + r[k], 0);

/* ------------------------------------------------------------------
 * LiveDashboard — range tabs, toggleable series, ticking live KPI
 * ------------------------------------------------------------------ */
export function LiveDashboard({ compact = false }) {
  const [range, setRange] = useState('7D');
  const [show, setShow] = useState({ base: true, aura: true });
  const [occ, setOcc] = useState(1284);
  const { rows, unit, tick } = useMemo(() => buildData(range), [range]);

  useEffect(() => {
    const t = setInterval(() => setOcc((o) => Math.max(1100, Math.min(1460, o + Math.round((Math.random() - 0.48) * 28)))), 1800);
    return () => clearInterval(t);
  }, []);

  const saved = Math.round((1 - sum(rows, 'aura') / sum(rows, 'base')) * 100);
  const totalAura = sum(rows, 'aura');
  const co2 = Math.round((sum(rows, 'base') - totalAura) * (unit === 'MWh' ? 1000 : 1) * 0.00042 * 10) / 10;

  const kpis = [
    { l: 'Live occupancy', v: occ.toLocaleString(), s: 'people on site', spark: [8, 9, 7, 10, 12, 11, 13, 12, 14, 13], c: '#4de8cf', live: true },
    { l: 'Energy saved', v: `−${saved}%`, s: `${unit} vs. baseline`, spark: [3, 4, 4, 6, 5, 7, 8, 8, 9, 10], c: '#c8ff4d' },
    { l: 'CO₂ avoided', v: `${co2.toLocaleString()} t`, s: 'this period', spark: [2, 3, 3, 4, 6, 5, 7, 9, 9, 11], c: '#ff7a5c' },
  ];

  return (
    <div className="grid grid-cols-12 gap-3 sm:gap-4 p-1">
      <div className="col-span-12 lg:col-span-8 panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p className="font-mono text-[11px] text-sand/50 uppercase tracking-widest">Energy consumption · Tower North</p>
            <p className="font-display font-extrabold text-3xl sm:text-4xl mt-1">{totalAura.toLocaleString()} <span className="text-lg text-sand/50">{unit}</span></p>
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
            {['24H', '7D', '30D', '12M'].map((r) => (
              <button key={r} id={`range-${r}`} onClick={() => setRange(r)} className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-500 ${range === r ? 'bg-lime text-ink' : 'text-sand/60 hover:text-sand'}`}>{r}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mb-2">
          {[['base', 'Baseline', 'bg-sand/60'], ['aura', 'With Aura', 'bg-lime']].map(([k, l, c]) => (
            <button key={k} onClick={() => setShow((s) => ({ ...s, [k]: !s[k] }))} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-500 ${show[k] ? 'border-white/20 text-sand' : 'border-white/5 text-sand/30'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${c} ${show[k] ? '' : 'opacity-30'}`} />{l}
            </button>
          ))}
        </div>
        <AreaChart key={range} rows={rows} unit={unit} tick={tick} show={show} />
      </div>
      <div className="col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
        {kpis.map((k) => (
          <div key={k.l} className="panel rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <p className="font-mono text-[11px] text-sand/50 uppercase tracking-widest">{k.l}</p>
              {k.live && <span className="flex items-center gap-1.5 font-mono text-[10px] text-lime"><span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />LIVE</span>}
            </div>
            <p key={k.v} className="font-display font-extrabold text-4xl mt-2 tabular-nums" style={{ color: k.c }}>{k.v}</p>
            <p className="text-xs text-sand/45 mb-2">{k.s}</p>
            <Sparkline values={k.spark} color={k.c} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * AnalyticsGrid — bar chart + donut
 * ------------------------------------------------------------------ */
export const OCCUPANCY = [
  { label: 'Mon', value: 1180 }, { label: 'Tue', value: 1420 }, { label: 'Wed', value: 1510 }, { label: 'Thu', value: 1465 },
  { label: 'Fri', value: 1120 }, { label: 'Sat', value: 340 }, { label: 'Sun', value: 210 },
];
export const LOAD = [
  { label: 'HVAC', value: 42, color: '#c8ff4d' }, { label: 'Lighting', value: 21, color: '#4de8cf' },
  { label: 'Plug loads', value: 19, color: '#ff7a5c' }, { label: 'Elevators', value: 11, color: '#f3eee3' }, { label: 'Other', value: 7, color: '#3b5b57' },
];
export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
      <div className="lg:col-span-7 panel rounded-[2rem] p-6 sm:p-10">
        <p className="font-mono text-[11px] text-sand/50 uppercase tracking-widest">Weekly occupancy</p>
        <h3 className="font-display font-extrabold text-3xl mt-1 mb-8">People on site, by day</h3>
        <BarChart data={OCCUPANCY} height={280} />
      </div>
      <div className="lg:col-span-5 panel rounded-[2rem] p-6 sm:p-10">
        <p className="font-mono text-[11px] text-sand/50 uppercase tracking-widest">Energy mix</p>
        <h3 className="font-display font-extrabold text-3xl mt-1 mb-8">Where the power goes</h3>
        <Donut data={LOAD} />
      </div>
    </div>
  );
}
