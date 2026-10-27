import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
 * useInView — one-shot IntersectionObserver. Returns [ref, visible, extraDelay].
 * extraDelay gives the page curtain time to lift for above-the-fold items.
 * Includes a safety fallback so content can never stay hidden.
 * ------------------------------------------------------------------ */
export function useInView(margin = '0px 0px -6% 0px') {
  const ref = useRef(null);
  const [state, setState] = useState({ on: false, extra: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mounted = performance.now();
    const fire = () => setState({ on: true, extra: performance.now() - mounted < 1500 ? 0.55 : 0 });
    if (typeof IntersectionObserver === 'undefined') { fire(); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { fire(); io.disconnect(); } },
      { rootMargin: margin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, state.on, state.extra];
}

/* ------------------------------------------------------------------
 * Heading — masked word reveal (each word rises out of an overflow mask)
 * lines: array of string | { t: string, c: className }
 * ------------------------------------------------------------------ */
export function Heading({ as: Tag = 'h2', lines, children, className = '', delay = 0, stagger = 0.07 }) {
  const [ref, on, extra] = useInView();
  const ls = lines || [children];
  let n = 0;
  return (
    <Tag ref={ref} className={`${className} ${on ? 'hw-in' : ''}`}>
      {ls.map((l, i) => {
        const t = typeof l === 'string' ? l : l.t;
        const c = typeof l === 'string' ? '' : l.c || '';
        return (
          <span key={i} className="block">
            {t.split(' ').map((w, j) => (
              <span key={j} className="inline-block overflow-hidden align-top pb-[0.16em] -mb-[0.16em] mr-[0.24em]">
                <span className={`hw inline-block ${c}`} style={{ transitionDelay: `${delay + extra + n++ * stagger}s` }}>{w}</span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

/* Fade/slide in on scroll; with `stagger`, animates direct children */
export function Reveal({ children, className = '', y = 40, delay = 0, stagger = 0, as: Tag = 'div' }) {
  const [ref, on, extra] = useInView();
  if (stagger) {
    const kids = React.Children.map(children, (c, i) =>
      React.isValidElement(c)
        ? React.cloneElement(c, {
          className: `${c.props.className || ''} rv ${on ? 'rv-in' : ''}`,
          style: { ...(c.props.style || {}), '--y': `${y}px`, '--d': `${delay + extra + i * stagger}s` },
        })
        : c
    );
    return <Tag ref={ref} className={className}>{kids}</Tag>;
  }
  return (
    <Tag ref={ref} className={`${className} rv ${on ? 'rv-in' : ''}`} style={{ '--y': `${y}px`, '--d': `${delay + extra}s` }}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
 * WaterButton — liquid fill expands from the exact cursor entry point
 * ------------------------------------------------------------------ */
export function WaterButton({ to, href, onClick, children, variant = 'solid', className = '', type, ...rest }) {
  const ref = useRef(null);
  const setPoint = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--wx', `${e.clientX - r.left}px`);
    el.style.setProperty('--wy', `${e.clientY - r.top}px`);
  };
  const props = {
    ref,
    onMouseEnter: setPoint,
    onMouseLeave: setPoint,
    onClick,
    className: `water-btn water-${variant} ${className}`,
    ...rest,
  };
  const inner = (
    <>
      <span className="water-fill" aria-hidden="true"><i /><i /><i /></span>
      <span className="water-label">{children}</span>
    </>
  );
  if (to) return <Link to={to} {...props}>{inner}</Link>;
  if (href) return <a href={href} {...props}>{inner}</a>;
  return <button type={type || 'button'} {...props}>{inner}</button>;
}

/* Magnetic wrapper */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={`inline-block ${className}`}>{children}</div>;
}

/* Animated counter */
export function Counter({ to, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [ref, on] = useInView();
  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const fmt = (v) => `${prefix}${v.toFixed(decimals)}${suffix}`;
    const obj = { v: 0 };
    const tween = gsap.to(obj, { v: to, duration: 2.4, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(obj.v); } });
    const fallback = setTimeout(() => { el.textContent = fmt(to); }, 3500);
    return () => { tween.kill(); clearTimeout(fallback); el.textContent = fmt(to); };
  }, [on, to]);
  return <span ref={ref} className={className}>{prefix}{to.toFixed(decimals)}{suffix}</span>;
}


/* Marquee */
export function Marquee({ items, reverse = false, className = '', itemClass = '' }) {
  const list = [...items, ...items];
  return (
    <div className={`mask-x overflow-hidden ${className}`}>
      <div className={`flex w-max gap-14 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {list.map((it, i) => (
          <span key={i} className={`shrink-0 ${itemClass}`}>{it}</span>
        ))}
      </div>
    </div>
  );
}

/* Transition overlay fallbacks (all overlays removed per user request) */
export function ArchitecturalTransition() {
  return null;
}
export function GlobalSmokeCurtain() {
  return null;
}
export function SmokeBlast() {
  return null;
}

/* Page transition container */
export function PageTransition({ children, className = '' }) {
  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
}

/* Modern Luxury Fluid Cursor — NO harsh difference inversion, pristine visibility on all sections */
export function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3.out' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3.out' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.38, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.38, ease: 'power3.out' });

    let isHovering = false;

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      const s = e.target.closest && e.target.closest('.panel,.spot');
      if (s) {
        const r = s.getBoundingClientRect();
        s.style.setProperty('--mx', `${e.clientX - r.left}px`);
        s.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };

    const over = (e) => {
      const hot = e.target.closest && e.target.closest('a,button,input,textarea,select,[data-hot]');
      if (hot) {
        isHovering = true;
        gsap.to(ring.current, {
          scale: 1.85,
          borderColor: '#c8ff4d',
          backgroundColor: 'rgba(200, 255, 77, 0.16)',
          boxShadow: '0 0 25px rgba(200, 255, 77, 0.45), 0 4px 16px rgba(0,0,0,0.5)',
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.to(dot.current, {
          scale: 0.35,
          opacity: 0.6,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    const out = (e) => {
      const hot = e.target.closest && e.target.closest('a,button,input,textarea,select,[data-hot]');
      if (hot) {
        isHovering = false;
        gsap.to(ring.current, {
          scale: 1,
          borderColor: 'rgba(200, 255, 77, 0.6)',
          backgroundColor: 'rgba(200, 255, 77, 0.03)',
          boxShadow: '0 0 15px rgba(200, 255, 77, 0.2), 0 2px 8px rgba(0,0,0,0.4)',
          duration: 0.45,
          ease: 'power3.out',
        });
        gsap.to(dot.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    const down = () => {
      gsap.to(ring.current, { scale: isHovering ? 1.5 : 0.85, duration: 0.2, ease: 'power2.out' });
      gsap.to(dot.current, { scale: 0.7, duration: 0.2, ease: 'power2.out' });
    };

    const up = () => {
      gsap.to(ring.current, { scale: isHovering ? 1.85 : 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' });
      gsap.to(dot.current, { scale: isHovering ? 0.35 : 1, duration: 0.3, ease: 'power3.out' });
    };

    const leave = () => {
      gsap.to([dot.current, ring.current], { opacity: 0, scale: 0.5, duration: 0.3 });
    };

    const enter = () => {
      gsap.to([dot.current, ring.current], { opacity: 1, scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot - Solid crisp lime with dark outline, visible everywhere */}
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime border border-black/80 shadow-[0_0_8px_#c8ff4d,0_1px_3px_rgba(0,0,0,0.8)] pointer-events-none z-[9999] hidden md:block"
      />
      {/* Fluid Trailing Halo - Glowing halo with subtle backdrop blur and dark rim shadow */}
      <div
        ref={ring}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-lime/60 bg-lime/5 shadow-[0_0_18px_rgba(200,255,77,0.22),0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur-[1px] pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
}



/* WebGL ambient background (Monochrome Fluid Smoke) */
const VS = `attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`;
const FS = `
precision highp float;
uniform float u_time; uniform vec2 u_resolution; uniform vec2 u_mouse;
mat2 rot(float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c); }
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x), u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; mat2 m=rot(0.5); for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p*2.02; a*=0.5;} return v; }
void main(){
  vec2 st=(gl_FragCoord.xy*2.0-u_resolution)/min(u_resolution.x,u_resolution.y);
  vec2 m=(u_mouse*2.0-u_resolution)/min(u_resolution.x,u_resolution.y);
  float mr=smoothstep(0.9,0.0,length(st-m));
  vec2 q=vec2(fbm(st+0.05*u_time), fbm(st+vec2(1.0)+0.04*u_time));
  vec2 r=vec2(fbm(st+1.1*q+vec2(1.7,9.2)+0.10*u_time+mr*0.3), fbm(st+1.1*q+vec2(8.3,2.8)+0.08*u_time-mr*0.2));
  float f=fbm(st+r*2.2);
  vec3 ink=vec3(0.018,0.04,0.038);
  vec3 teal=vec3(0.02,0.18,0.16);
  vec3 jade=vec3(0.06,0.38,0.30);
  vec3 lime=vec3(0.62,0.96,0.26);
  vec3 col=mix(ink,teal,clamp(f*f*2.6,0.0,1.0));
  col=mix(col,jade,clamp(length(q)*0.7,0.0,1.0));
  col=mix(col,lime*0.6,clamp(r.x*r.x*r.y*2.0,0.0,1.0)*0.6);
  col+=vec3(0.8,1.0,0.55)*pow(clamp(f*1.2,0.0,1.0),7.0)*0.38;
  col+=vec3(0.25,0.85,0.65)*mr*0.32;
  col*= (1.0-smoothstep(0.5,1.7,length(st)))*0.85+0.15;
  gl_FragColor=vec4(col*0.88,1.0);
}`;

export function WebGLBackground() {
  const ref = useRef(null);
  const location = useLocation();
  const isFirstMount = useRef(true);

  // Background smoke fade out on switch, then fade in on next page!
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const canvas = ref.current;
    if (!canvas) return;

    gsap.killTweensOf(canvas);
    // 1. Fade out the background smoke
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Fade in the background smoke on the next page
        gsap.to(canvas, {
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
        });
      },
    });
  }, [location.pathname]);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    const mk = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh; };
    const vs = mk(gl.VERTEX_SHADER, VS), fs = mk(gl.FRAGMENT_SHADER, FS);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(fs)); return; }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, 'u_time'), uR = gl.getUniformLocation(prog, 'u_resolution'), uM = gl.getUniformLocation(prog, 'u_mouse');
    const scale = () => Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    const resize = () => {
      canvas.width = window.innerWidth * scale(); canvas.height = window.innerHeight * scale();
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uR, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    const mv = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', mv);
    let id; const t0 = performance.now();
    const loop = (now) => {
      cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
      gl.uniform1f(uT, (now - t0) * 0.001);
      gl.uniform2f(uM, cx * scale(), (innerHeight - cy) * scale());
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize); window.removeEventListener('mousemove', mv);
    };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 1 }} />;
}

/* Small section label */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </p>
  );
}
