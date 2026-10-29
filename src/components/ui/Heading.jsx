import React from 'react';
import { useInView } from '../../hooks/useInView.js';

/**
 * Masked word reveal heading (each word rises out of an overflow mask).
 * lines: array of string | { t: string, c: className }
 */
export function Heading({ as: Tag = 'h2', lines, children, className = '', delay = 0, stagger = 0.07 }) {
  const [ref, on, extra] = useInView();
  const ls = lines || [children];
  let n = 0;

  return (
    <Tag ref={ref} className={`${className} ${on ? 'hw-in' : ''}`}>
      {ls.map((l, i) => {
        if (!l) return null;
        const t = typeof l === 'string' ? l : (l.t || '');
        const c = typeof l === 'string' ? '' : l.c || '';
        const words = String(t).split(' ');
        return (
          <span key={i} className="block">
            {words.map((w, j) => (
              <React.Fragment key={j}>
                <span className="inline-block overflow-hidden align-top pt-[0.22em] -mt-[0.22em] pb-[0.24em] -mb-[0.24em] px-[0.14em] -mx-[0.14em] mr-[0.12em]">
                  <span
                    className={`hw inline-block ${c}`}
                    style={{ transitionDelay: `${delay + extra + n++ * stagger}s` }}
                  >
                    {w}
                  </span>
                </span>
                {j < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

export default Heading;

