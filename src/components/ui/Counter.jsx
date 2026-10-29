import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useInView } from '../../hooks/useInView.js';

/**
 * Animated numerical counter triggered when entering viewport.
 */
export function Counter({ to = 0, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [ref, on] = useInView();
  const safeTo = Number.isFinite(Number(to)) ? Number(to) : 0;

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;

    const fmt = (v) => `${prefix}${(Number(v) || 0).toFixed(decimals)}${suffix}`;
    const obj = { v: 0 };

    const tween = gsap.to(obj, {
      v: safeTo,
      duration: 2.4,
      ease: 'power3.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmt(obj.v);
      },
    });

    const fallback = setTimeout(() => {
      if (ref.current) ref.current.textContent = fmt(safeTo);
    }, 3500);

    return () => {
      tween.kill();
      clearTimeout(fallback);
      if (ref.current) ref.current.textContent = fmt(safeTo);
    };
  }, [on, safeTo, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{safeTo.toFixed(decimals)}{suffix}
    </span>
  );
}

export default Counter;

