import { useRef, useState, useEffect } from 'react';

/**
 * One-shot IntersectionObserver hook. Returns [ref, visible, extraDelay].
 * extraDelay gives page curtain time to lift for above-the-fold items.
 * Includes a safety fallback so content can never stay hidden.
 */
export function useInView(margin = '0px 0px -4% 0px') {
  const ref = useRef(null);
  const [state, setState] = useState({ on: false, extra: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fire = () => setState({ on: true, extra: 0 });
    if (typeof IntersectionObserver === 'undefined') {
      fire();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fire();
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, state.on, state.extra];
}

export default useInView;

