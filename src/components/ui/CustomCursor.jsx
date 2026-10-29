import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Crisp Precision Cursor — Zero blur filter, razor-sharp ring and core dot, zero layout thrashing.
 */
export function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!dot.current || !ring.current) return;
    if (window.matchMedia?.('(hover: none), (pointer: coarse)').matches) return;

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.06, ease: 'power3.out' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.06, ease: 'power3.out' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.24, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.24, ease: 'power3.out' });

    let isHovering = false;
    let activeSpot = null;
    let activeSpotRect = null;

    const invalidateRect = () => {
      activeSpotRect = null;
    };

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);

      if (activeSpot) {
        if (!activeSpotRect) {
          activeSpotRect = activeSpot.getBoundingClientRect();
        }
        activeSpot.style.setProperty('--mx', `${e.clientX - activeSpotRect.left}px`);
        activeSpot.style.setProperty('--my', `${e.clientY - activeSpotRect.top}px`);
      }
    };

    const over = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const s = target.closest('.panel,.spot,.card-smoke,.card-smoke-light');
      if (s !== activeSpot) {
        activeSpot = s;
        activeSpotRect = s ? s.getBoundingClientRect() : null;
      }

      const hot = target.closest('a,button,input,textarea,select,[data-hot]');
      if (hot && ring.current && dot.current && !isHovering) {
        isHovering = true;
        gsap.to(ring.current, {
          scale: 1.65,
          borderColor: '#c8ff4d',
          backgroundColor: 'transparent',
          duration: 0.32,
          ease: 'power3.out',
        });
        gsap.to(dot.current, {
          scale: 1.35,
          backgroundColor: '#4de8cf',
          duration: 0.25,
          ease: 'power3.out',
        });
      }
    };

    const out = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const nextTarget = e.relatedTarget;
      const stillInSpot =
        activeSpot && nextTarget && typeof nextTarget.closest === 'function' && activeSpot.contains(nextTarget);
      if (!stillInSpot) {
        activeSpot = null;
        activeSpotRect = null;
      }

      const hot = target.closest('a,button,input,textarea,select,[data-hot]');
      const stillInHot =
        hot && nextTarget && typeof nextTarget.closest === 'function' && hot.contains(nextTarget);
      if (hot && !stillInHot && ring.current && dot.current && isHovering) {
        isHovering = false;
        gsap.to(ring.current, {
          scale: 1,
          borderColor: '#c8ff4d',
          backgroundColor: 'transparent',
          duration: 0.35,
          ease: 'power3.out',
        });
        gsap.to(dot.current, {
          scale: 1,
          backgroundColor: '#c8ff4d',
          duration: 0.25,
          ease: 'power3.out',
        });
      }
    };

    const down = () => {
      gsap.to(ring.current, { scale: isHovering ? 1.35 : 0.82, duration: 0.18, ease: 'power2.out' });
      gsap.to(dot.current, { scale: 0.75, duration: 0.18, ease: 'power2.out' });
    };

    const up = () => {
      gsap.to(ring.current, { scale: isHovering ? 1.65 : 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
      gsap.to(dot.current, { scale: isHovering ? 1.35 : 1, duration: 0.25, ease: 'power3.out' });
    };

    const leave = () => {
      gsap.to([dot.current, ring.current], { opacity: 0, scale: 0.5, duration: 0.25 });
    };

    const enter = () => {
      gsap.to([dot.current, ring.current], { opacity: 1, scale: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mouseout', out, { passive: true });
    window.addEventListener('mousedown', down, { passive: true });
    window.addEventListener('mouseup', up, { passive: true });
    window.addEventListener('scroll', invalidateRect, { passive: true });
    window.addEventListener('resize', invalidateRect, { passive: true });
    document.addEventListener('mouseleave', leave, { passive: true });
    document.addEventListener('mouseenter', enter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('scroll', invalidateRect);
      window.removeEventListener('resize', invalidateRect);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot — Solid crisp lime, zero blur */}
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime pointer-events-none z-[9999] hidden md:block"
      />
      {/* Crisp Precision Ring — Solid 1.5px border, zero backdrop-blur, zero fuzzy glow */}
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-lime bg-transparent pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
}

export default CustomCursor;

