import React, { useRef, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import gsap from 'gsap';

/* WebGL ambient background (Monochrome Fluid Smoke — GPU Optimized) */
const VS = `attribute vec2 position; void main(){ gl_Position = vec4(position,0.0,1.0); }`;
const FS = `
precision mediump float;
uniform float u_time; uniform vec2 u_resolution; uniform vec2 u_mouse;
mat2 rot(float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c); }
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x), mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x), u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; mat2 m=rot(0.5); for(int i=0;i<4;i++){ v+=a*noise(p); p=m*p*2.02; a*=0.5;} return v; }
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
  const prevPath = useRef(location.pathname);

  // Background smoke fade out on switch, then fade in on next page!
  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    const canvas = ref.current;
    if (!canvas) return;

    gsap.killTweensOf(canvas);
    gsap.to(canvas, {
      opacity: 0,
      duration: 0.24,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(canvas, {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
        });
      },
    });
  }, [location.pathname]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let gl;
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }
    if (!gl) return;
    const mk = (t, s) => {
      const sh = gl.createShader(t);
      gl.shaderSource(sh, s);
      gl.compileShader(sh);
      return sh;
    };
    const vs = mk(gl.VERTEX_SHADER, VS), fs = mk(gl.FRAGMENT_SHADER, FS);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fs));
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, 'u_time');
    const uR = gl.getUniformLocation(prog, 'u_resolution');
    const uM = gl.getUniformLocation(prog, 'u_mouse');

    let curScale = 0.45;
    let vh = window.innerHeight;

    const resize = () => {
      if (!ref.current) return;
      const vw = window.innerWidth;
      vh = window.innerHeight;
      curScale = Math.min(window.devicePixelRatio || 1, 1.25) * (vw < 768 ? 0.36 : 0.46);
      canvas.width = Math.max(1, Math.floor(vw * curScale));
      canvas.height = Math.max(1, Math.floor(vh * curScale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let tx = window.innerWidth / 2, ty = vh / 2, cx = tx, cy = ty;
    const mv = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener('mousemove', mv, { passive: true });

    let id = 0;
    const t0 = performance.now();
    const loop = (now) => {
      if (!document.hidden) {
        cx += (tx - cx) * 0.05;
        cy += (ty - cy) * 0.05;
        gl.uniform1f(uT, (now - t0) * 0.001);
        gl.uniform2f(uM, cx * curScale, (vh - cy) * curScale);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mv);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 1 }} />;
}

export default WebGLBackground;

