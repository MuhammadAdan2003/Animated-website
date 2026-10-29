import React from 'react';

/**
 * Small editorial section label with a solid ambient indicator dot.
 */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </p>
  );
}

export default Eyebrow;

