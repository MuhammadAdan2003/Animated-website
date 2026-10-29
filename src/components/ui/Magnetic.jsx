import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Magnetic interaction wrapper pulling the element gently toward cursor entry coordinates.
 */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(hover: none), (pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', move, { passive: true });
    el.addEventListener('mouseleave', leave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, [strength]);

  return <div ref={ref} className={`inline-block ${className}`}>{children}</div>;
}

export default Magnetic;

