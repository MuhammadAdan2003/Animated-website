import React from 'react';
import { Link as TanStackLink, useLocation } from '@tanstack/react-router';

/**
 * Enhanced Link component powered by TanStack Router.
 * Supports standard 'to', 'activeProps', and function children/className
 * for seamless compatibility across the design system.
 */
export const Link = React.forwardRef(function Link({ to, className, children, ...props }, ref) {
  return (
    <TanStackLink
      ref={ref}
      to={to}
      className={className}
      {...props}
    >
      {children}
    </TanStackLink>
  );
});

/**
 * NavLink component for navigation menus with active state styling.
 * Supports ({ isActive }) => className and ({ isActive }) => children.
 */
export const NavLink = React.forwardRef(function NavLink(
  { to, className, children, activeClassName = '', ...props },
  ref
) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const resolvedClassName = typeof className === 'function'
    ? className({ isActive })
    : `${className || ''} ${isActive ? activeClassName : ''}`.trim();

  const resolvedChildren = typeof children === 'function'
    ? children({ isActive })
    : children;

  return (
    <TanStackLink
      ref={ref}
      to={to}
      className={resolvedClassName}
      data-status={isActive ? 'active' : undefined}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {resolvedChildren}
    </TanStackLink>
  );
});

export default Link;

