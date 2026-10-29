import React from 'react';

/**
 * Continuous infinite ticker marquee with horizontal masking.
 */
export function Marquee({ items, reverse = false, className = '', itemClass = '' }) {
  const list = [...items, ...items];
  return (
    <div className={`mask-x overflow-hidden ${className}`}>
      <div className={`flex w-max gap-14 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {list.map((it, i) => (
          <span key={i} className={`shrink-0 ${itemClass}`}>{it}</span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;

