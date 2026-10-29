import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageTransition, WaterButton } from '../components/ui.jsx';

export default function NotFoundPage() {
  return (
    <PageTransition className="flex items-center justify-center min-h-[70vh] gutter py-32 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="font-mono text-xs text-lime uppercase tracking-widest px-3 py-1 rounded-full border border-lime/30 bg-lime/10">
          404 · ROUTE NOT FOUND
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-sand tracking-tight">
          Page not located.
        </h1>
        <p className="text-sand/65 text-base sm:text-lg leading-relaxed">
          The requested engineering blueprint or route does not exist. Return to the home overview to explore our flagship applications.
        </p>
        <div className="pt-4 flex justify-center">
          <WaterButton to="/" variant="solid">
            <ArrowLeft size={16} /> Return to Home
          </WaterButton>
        </div>
      </div>
    </PageTransition>
  );
}

export { NotFoundPage };

