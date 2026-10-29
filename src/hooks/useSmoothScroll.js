import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

/**
 * Initializes and binds smooth scrolling with Lenis and GSAP's ticker.
 * Provides 120 FPS hardware-accelerated smooth scrolling while preserving native wheel feel.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    });

    window.__lenis = lenis;

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}

export default useSmoothScroll;

