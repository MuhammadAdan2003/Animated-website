import React, { useLayoutEffect, useRef } from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from '../hooks/useSmoothScroll.js';
import { resetScrollToTop } from '../hooks/useScrollToTop.js';
import { WebGLBackground, CustomCursor } from '../components/ui.jsx';
import { ScrollProgress } from '../components/wow.jsx';
import { Navbar, Footer } from '../components/Layout.jsx';

/**
 * Renders a frozen route component for its motion lifecycle.
 * Prevents TanStack Router's live <Outlet /> store subscription from swapping
 * to the incoming page inside an exiting <AnimatePresence> wrapper (which caused
 * the incoming page to mount and play its entrance animations twice).
 */
function RouteStage({ routeKey, Component, lastRouteKeyRef }) {
  useLayoutEffect(() => {
    if (lastRouteKeyRef.current !== routeKey) {
      lastRouteKeyRef.current = routeKey;
      resetScrollToTop();
    }
  }, [routeKey, lastRouteKeyRef]);

  return Component ? <Component /> : null;
}

/**
 * Monumental master layout for the application.
 * Manages smooth scroll orchestration, real-time scroll reset,
 * GPU shaders, custom cursor, navigation, page transitions, and footer.
 */
export function RootLayout() {
  const router = useRouter();

  // Select primitive active route key from committed matches so each transition fires once
  const activeRouteKey = useRouterState({
    select: (state) => {
      const matches = state.matches;
      const isNotFound = matches.some(
        (m) => m.globalNotFound || m._notFound || m.status === 'notFound'
      );
      if (isNotFound) {
        return `__404__:${state.resolvedLocation?.pathname || state.location.pathname}`;
      }
      const rootIdx = matches.findIndex((m) => m.routeId === '__root__');
      const childMatch = rootIdx >= 0 ? matches[rootIdx + 1] : matches[1];
      return childMatch?.routeId || '';
    },
  });

  const lastRouteKeyRef = useRef(activeRouteKey);

  // Initialize hardware-accelerated 120FPS smooth scrolling
  useSmoothScroll();

  const PageComponent = activeRouteKey.startsWith('__404__:')
    ? router.routesById['__root__']?.options?.notFoundComponent
    : router.routesById[activeRouteKey]?.options?.component;

  return (
    <div className="relative bg-ink text-sand min-h-screen">
      <ScrollProgress />
      <WebGLBackground />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait" initial={false}>
          {PageComponent && (
            <motion.div
              key={activeRouteKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="w-full"
            >
              <RouteStage
                routeKey={activeRouteKey}
                Component={PageComponent}
                lastRouteKeyRef={lastRouteKeyRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
