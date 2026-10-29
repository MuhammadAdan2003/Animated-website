import React from 'react';
import { useInView } from '../../hooks/useInView.js';

/**
 * Fade/slide in on scroll container; with `stagger`, animates direct children.
 */
export function Reveal({ children, className = '', y = 40, delay = 0, stagger = 0, as: Tag = 'div' }) {
  const [ref, on, extra] = useInView();

  if (stagger) {
    const kids = React.Children.map(children, (c, i) =>
      React.isValidElement(c)
        ? React.cloneElement(c, {
            className: `${c.props.className || ''} rv ${on ? 'rv-in' : ''}`,
            style: {
              ...(c.props.style || {}),
              '--y': `${y}px`,
              '--d': `${delay + extra + i * stagger}s`,
            },
          })
        : c
    );
    return (
      <Tag ref={ref} className={className}>
        {kids}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`${className} rv ${on ? 'rv-in' : ''}`}
      style={{ '--y': `${y}px`, '--d': `${delay + extra}s` }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;

