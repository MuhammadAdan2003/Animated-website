import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PageTransition, Reveal, CardSmoke } from '../components/ui.jsx';
import { PageHero, Newsletter } from '../components/sections.jsx';
import { ArticleModal } from '../components/journal/ArticleModal.jsx';

export const POSTS = [
  {
    id: 1,
    t: 'The Architecture of Next.js 15 and React 19: Why Sub-Second LCP Defines Conversion',
    c: 'Web Architecture',
    d: 'Mar 12, 2026',
    r: '7 min',
    g: 'from-lime to-aqua',
    author: 'Amara Lindqvist',
    lead: 'Modern digital web applications can no longer afford sluggish load times or heavy client-side waterfalls. The convergence of React Server Components, streaming SSR, and edge hydration is setting a new bar for high-converting web engineering.',
    takeaways: [
      'Every 100ms improvement in page load increases user conversion by up to 8.4%.',
      'React Server Components eliminate client JavaScript bundle bloat by over 60%.',
      'Edge routing ensures sub-50ms response times for users globally.'
    ],
    quote: 'Speed is not a luxury optimization. Speed is the fundamental foundation of user trust and revenue.'
  },
  {
    id: 2,
    t: 'Building Resilient Cloud Microservices: From Monolith to Distributed Event Mesh',
    c: 'Backend & Cloud',
    d: 'Feb 27, 2026',
    r: '9 min',
    g: 'from-aqua to-sand',
    author: 'Rafael Duarte',
    lead: 'How we engineer high-concurrency Go microservices, distributed GraphQL gateways, and Redis caching layers to withstand 100k+ concurrent requests per second with zero downtime.',
    takeaways: [
      'Asynchronous event buses decouple critical business logic and prevent cascading failures.',
      'Distributed caching strategies cut database CPU utilization by over 78%.',
      'Automated canary rollouts in Kubernetes eliminate production regression risks.'
    ],
    quote: 'Architecture is about making the critical decisions that prevent systemic failure when traffic surges 100x.'
  },
  {
    id: 3,
    t: 'AI Agents in Production: Beyond Chatbots to Autonomous Enterprise Workflows',
    c: 'AI Engineering',
    d: 'Feb 10, 2026',
    r: '6 min',
    g: 'from-coral to-lime',
    author: 'Yuki Tanaka',
    lead: 'Why forward-thinking software platforms are embedding autonomous multi-agent pipelines with vector retrieval to automate complex end-to-end business workflows.',
    takeaways: [
      'Deterministic verification loops prevent LLM hallucination in mission-critical software.',
      'Vector databases with hybrid keyword-semantic search provide sub-10ms retrieval.',
      'Agentic architectures reduce human operational hours by up to 80% across data-heavy processes.'
    ],
    quote: 'The future of software is not software you merely operate, but software that collaborates with you.'
  },
];

export default function JournalPage() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="Engineering Perspectives"
        lines={['Ideas from', { t: 'the frontier', c: 'text-lime' }, 'of software.']}
        text="Technical deep-dives, architectural manifestos, and engineering essays from the developers and systems architects at Aura."
      />

      <section className="relative z-10 gutter py-16 bg-transparent">
        <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14">
          {POSTS.map((p) => (
            <article
              key={p.id}
              data-hot
              onClick={() => setActiveArticle(p)}
              className="group cursor-pointer spot panel card-smoke p-6 rounded-[2.5rem] border border-white/10 hover:-translate-y-2.5 transition-all duration-500 shadow-xl"
            >
              <CardSmoke tone="dark" />
              <div className={`aspect-[16/10] rounded-[2rem] bg-gradient-to-br ${p.g} relative z-10 overflow-hidden`}>
                <div className="absolute inset-0 dots opacity-40" />
                <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full border-[28px] border-ink/10 group-hover:scale-125 transition-transform duration-1000" />
                <span className="absolute top-4 left-4 bg-ink/85 text-sand rounded-full px-4 py-1.5 font-mono text-xs font-bold border border-white/10">
                  {p.c}
                </span>
                <span className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-ink/85 text-sand flex items-center justify-center group-hover:rotate-45 group-hover:bg-lime group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="relative z-10 flex items-center gap-3 font-mono text-xs text-sand/45 mt-5">
                <span>{p.d}</span>
                <span>·</span>
                <span>{p.r} read</span>
                <span>·</span>
                <span className="text-lime">{p.author}</span>
              </div>
              <h3 className="relative z-10 mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-tight text-sand group-hover:text-lime transition-colors duration-500">
                {p.t}
              </h3>
              <p className="relative z-10 mt-3 text-sand/60 text-sm line-clamp-2 leading-relaxed">
                {p.lead}
              </p>
              <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-bold text-lime group-hover:translate-x-1 transition-transform">
                Read engineering essay <ArrowRight size={16} />
              </span>
            </article>
          ))}
        </Reveal>

        {/* Reusable Article Detail Modal */}
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          onShare={handleShare}
          copied={copied}
        />

        <div className="mt-24"><Newsletter /></div>
      </section>
    </PageTransition>
  );
}

export { JournalPage };

