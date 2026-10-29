import React, { useRef } from 'react';
import { Link } from '../navigation/Link.jsx';

/**
 * WaterButton — liquid fill expands from the exact cursor entry point.
 * Supports to (router link), href (external link), or button click handler.
 */
export function WaterButton({ to, href, onClick, children, variant = 'solid', className = '', type, ...rest }) {
  const ref = useRef(null);

  const setPoint = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--wx', `${e.clientX - r.left}px`);
    el.style.setProperty('--wy', `${e.clientY - r.top}px`);
  };

  const props = {
    ref,
    onMouseEnter: setPoint,
    onMouseLeave: setPoint,
    onClick,
    className: `water-btn water-${variant} ${className}`,
    ...rest,
  };

  const inner = (
    <>
      <span className="water-fill" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="water-label">{children}</span>
    </>
  );

  if (to) return <Link to={to} {...props}>{inner}</Link>;
  if (href) return <a href={href} {...props}>{inner}</a>;
  return <button type={type || 'button'} {...props}>{inner}</button>;
}

export default WaterButton;

