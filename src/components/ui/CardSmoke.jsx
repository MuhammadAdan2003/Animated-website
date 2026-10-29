import React from 'react';

/**
 * Lightweight GPU-accelerated subtle ambient smoke inside card components.
 */
export function CardSmoke({ tone = 'dark' }) {
  const isLight = tone === 'light';
  const isAqua = tone === 'aqua';

  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden rounded-[inherit] z-0"
      aria-hidden="true"
    >
      <div
        className="absolute -inset-6 opacity-60"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 46% 38% at 24% 26%, rgba(255,255,255,0.38), rgba(77,232,207,0.14) 52%, transparent 74%), radial-gradient(ellipse 42% 36% at 78% 72%, rgba(6,16,13,0.06), rgba(200,255,77,0.15) 50%, transparent 74%)'
            : isAqua
            ? 'radial-gradient(ellipse 46% 38% at 22% 28%, rgba(77,232,207,0.13), rgba(200,255,77,0.05) 52%, transparent 74%), radial-gradient(ellipse 42% 38% at 78% 74%, rgba(200,255,77,0.08), transparent 72%)'
            : 'radial-gradient(ellipse 46% 38% at 22% 28%, rgba(200,255,77,0.10), rgba(77,232,207,0.05) 52%, transparent 74%), radial-gradient(ellipse 42% 38% at 78% 74%, rgba(77,232,207,0.08), transparent 72%)',
        }}
      />
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

export default CardSmoke;

