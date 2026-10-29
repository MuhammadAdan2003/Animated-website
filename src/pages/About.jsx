import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import { PageTransition, Reveal, CardSmoke } from '../components/ui.jsx';
import { PageHero, SectionHead, StatsBand, CTABand } from '../components/sections.jsx';

export default function AboutPage() {
  const team = [
    {
      n: 'Amara Lindqvist',
      r: 'Chief Technology & Engineering Officer',
      img: '/images/amara.jpg',
      fallback: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Former Stripe and Vercel engineering lead. Specializes in distributed microservices, edge routing, and resilient cloud architecture.',
      handle: '@amaralind',
    },
    {
      n: 'Rafael Duarte',
      r: 'Head of Web Architecture & WebGL',
      img: '/images/rafael.jpg',
      fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Ex-MIT Media Lab fellow. Shipped real-time 3D web engines, WebGL physics shaders, and high-speed micro-frontends.',
      handle: '@rafaduarte',
    },
    {
      n: 'Yuki Tanaka',
      r: 'Principal Full-Stack Architect',
      img: '/images/yuki.jpg',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Distributed systems veteran specializing in Next.js 15, Go microservices, GraphQL mesh pipelines, and fluid human interfaces.',
      handle: '@yukitanaka',
    },
    {
      n: 'Sam Okoye',
      r: 'VP of UI Systems & Performance',
      img: '/images/sam.jpg',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Ex-Apple UI systems engineer. Obsessed with Core Web Vitals, sub-millisecond interaction speed, and design tokens.',
      handle: '@samokoye',
    },
  ];

  const values = [
    {
      t: 'Clean Architecture',
      d: 'Every line of code, database query, and API contract is engineered with modular precision. We build software that scales effortlessly without technical debt.',
      img: '/images/human.jpg',
      fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      badge: 'Zero Technical Debt',
      tag: 'ARCHITECTURE',
    },
    {
      t: 'Sub-Second Speed',
      d: 'Performance is a core feature. We engineer sub-second web flagships with 100/100 Core Web Vitals, instant hydration, and fluid micro-interactions.',
      img: '/images/clarity.jpg',
      fallback: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      badge: '100/100 Lighthouse',
      tag: 'VELOCITY',
    },
    {
      t: 'Scalable Reliability',
      d: 'We build digital products and cloud systems designed to handle millions of concurrent users with 99.999% uptime assurance.',
      img: '/images/lasting.jpg',
      fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      badge: '99.999% SLA Uptime',
      tag: 'RESILIENCE',
    },
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Our Engineering Philosophy"
        lines={['We engineer', { t: 'digital software', c: 'text-aqua' }, 'that scales ventures.']}
        text="Aura is an independent software development and modern web development agency founded by elite engineers, systems architects, and product designers who refuse mediocrity."
      />

      {/* Values */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-transparent">
        <StatsBand />
        <SectionHead eyebrow="Engineering Pillars" lines={['What guides', 'our code.']} />
        <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={v.t}
              data-hot
              className="group relative rounded-[2.5rem] overflow-hidden panel card-smoke border border-white/10 hover:border-lime/40 flex flex-col justify-between min-h-[480px] cursor-pointer hover:-translate-y-2 transition-all duration-700 shadow-2xl"
            >
              <CardSmoke tone="dark" />
              <div className="relative z-10 aspect-[16/10] overflow-hidden bg-ink3">
                <img
                  src={v.img}
                  alt={v.t}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== v.fallback) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = v.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90" />
                <span className="absolute top-4 left-4 glass px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-sand border border-white/15 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                  0{i + 1} · {v.badge}
                </span>
              </div>
              <div className="relative z-10 p-8 sm:p-9">
                <span className="font-mono text-[10px] uppercase tracking-widest text-lime font-bold block mb-2">
                  {v.tag}
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl mb-3 text-sand group-hover:text-lime transition-colors">
                  {v.t}
                </h3>
                <p className="text-sand/70 text-sm sm:text-base leading-relaxed">
                  {v.d}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Leadership Team */}
      <section className="relative z-10 gutter py-28 sm:py-36 bg-sand text-ink">
        <SectionHead light eyebrow="Agency Leadership" lines={['The minds', 'behind Aura.']} />
        <Reveal stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.n}
              data-hot
              className="group relative overflow-hidden rounded-[2.2rem] bg-white p-4 pb-6 shadow-xl border border-ink/10 cursor-pointer hover:-translate-y-3 transition-all duration-500 card-smoke-light"
            >
              <CardSmoke tone="light" />
              <div className="aspect-[4/5] rounded-[1.8rem] overflow-hidden relative z-10 bg-ink">
                <img
                  src={m.img}
                  alt={m.n}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== m.fallback) {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = m.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="flex gap-2 text-white">
                    <span className="w-9 h-9 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Twitter size={15} />
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white/20 hover:bg-lime hover:text-black flex items-center justify-center transition-colors">
                      <Linkedin size={15} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 mt-4 px-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-xl text-ink group-hover:text-lime-700 transition-colors">
                    {m.n}
                  </h3>
                  <span className="font-mono text-[10px] text-ink/50 uppercase">{m.handle}</span>
                </div>
                <p className="text-lime-700 font-bold text-xs mt-0.5">{m.r}</p>
                <p className="text-ink/65 text-xs leading-relaxed mt-2.5 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <CTABand />
    </PageTransition>
  );
}

export { AboutPage };

