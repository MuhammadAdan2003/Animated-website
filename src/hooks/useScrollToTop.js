import { useEffect, useRef } from 'react';
import { useRouterState } from '@tanstack/react-router';

/**
 * Immediately resets both Lenis (if active) and native window scroll to top.
 */
export function resetScrollToTop() {
  if (typeof window === 'undefined') return;
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
}

/**
 * Resets the scroll position to top whenever the route pathname changes.
 */
export function useScrollToTop() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    resetScrollToTop();
  }, [pathname]);
}

export default useScrollToTop;
