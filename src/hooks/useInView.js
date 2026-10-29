import { useRef, useState, useEffect } from 'react';
import { useLoaderFinished } from './useLoaderState.js';

/**
 * One-shot IntersectionObserver hook. Returns [ref, visible, extraDelay].
 * Waits for the initial loading screen curtain to lift before triggering
 * entrance animations for above-the-fold content.
 */
export function useInView(margin = '0px 0px -4% 0px') {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const loaderFinished = useLoaderFinished();
  const hasIntersectedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      hasIntersectedRef.current = true;
      if (loaderFinished) {
        setOn(true);
      }
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          hasIntersectedRef.current = true;
          if (loaderFinished) {
            setOn(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: margin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin, loaderFinished]);

  useEffect(() => {
    if (loaderFinished) {
      if (hasIntersectedRef.current && !on) {
        setOn(true);
      }
    } else {
      // When loader is replayed or active, reset to initial hidden state
      if (on) {
        setOn(false);
      }
    }
  }, [loaderFinished, on]);

  return [ref, on, 0];
}

export default useInView;
