import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.jsx';
import { AppErrorBoundary } from './components/AppErrorBoundary.jsx';

/**
 * Root Application Component.
 * Minimalist entrypoint orchestrating global error handling and TanStack Router.
 */
export default function App() {
  return (
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  );
}
