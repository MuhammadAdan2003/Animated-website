import React, { useState } from 'react';
import { PageTransition } from '../components/ui.jsx';
import { PageHero, PricingCards, SectionHead, FAQ, CTABand } from '../components/sections.jsx';

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  const faq = [
    { q: 'How do agency engagement payments work?', a: 'Sprint engagements are structured as 50% upon project kickoff and 50% upon final delivery & code handoff. Engineering Pod partnerships are billed as a monthly ongoing retainer.' },
    { q: 'What deliverables are included in a Web Flagship Sprint?', a: 'You receive complete visual design source files, interactive design token specifications, production-ready Next.js / React / WebGL source code, CI/CD setup, and full launch assurance.' },
    { q: 'Can we transition from a Sprint to an ongoing Engineering Pod?', a: 'Yes. Over 80% of our clients choose to continue with an ongoing Engineering Pod retainer to continuously ship new product features, interactive campaigns, and platform expansions.' },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Engagement Models"
        lines={['Bespoke tiers.', { t: 'Production-grade', c: 'text-lime' }, 'results.']}
        text="Collaborate through focused high-velocity sprints, dedicated multidisciplinary engineering pods, or enterprise platform transformations."
      >
        <div className="glass rounded-full p-1.5 flex flex-wrap sm:flex-nowrap justify-center max-w-full">
          {[['Quarterly Retainer', false], ['Annual Partnership −20%', true]].map(([l, v]) => (
            <button
              key={l}
              id={`billing-${v ? 'yearly' : 'monthly'}`}
              onClick={() => setYearly(v)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-500 cursor-pointer ${
                yearly === v ? 'bg-lime text-ink' : 'text-sand/70'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </PageHero>
      <section className="relative z-10 gutter py-16 bg-transparent">
        <PricingCards yearly={yearly} />
      </section>
      <section className="relative z-10 gutter py-28 bg-transparent">
        <SectionHead eyebrow="Partnership FAQ" lines={['Collaboration', 'clarity.']} />
        <FAQ items={faq} />
      </section>
      <CTABand />
    </PageTransition>
  );
}

export { PricingPage };

