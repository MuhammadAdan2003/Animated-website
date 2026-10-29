import React from 'react';

/**
 * Standard page transition wrapper establishing min-height and relative positioning.
 */
export function PageTransition({ children, className = '' }) {
  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      {children}
    </div>
  );
}

export default PageTransition;

