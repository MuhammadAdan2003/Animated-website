import React, { useState } from 'react';
import { ArrowUpRight, Check, Mail, Phone, MapPin } from 'lucide-react';
import { PageTransition, Reveal, WaterButton, CardSmoke } from '../components/ui.jsx';
import { PageHero } from '../components/sections.jsx';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('Web Flagship');

  const contactMethods = [
    { icon: Mail, label: 'Direct Inquiries', value: 'engineering@aura.dev' },
    { icon: Phone, label: 'Engineering Desk', value: '+1 (415) 890-2287' },
    { icon: MapPin, label: 'Global Hubs', value: 'San Francisco · London · Zurich · Tokyo' },
  ];

  const projectTypes = [
    'Web Flagship',
    'Custom Software / SaaS',
    'Cloud & Microservices',
    'Engineering Pod Retainer',
  ];

  return (
    <PageTransition>
      <PageHero
        eyebrow="Start a Collaboration"
        lines={['Let’s build something', { t: 'extraordinary.', c: 'text-aqua' }]}
        text="Tell us about your product vision, tech stack requirements, and target launch timeline. Our engineering leads review every inquiry and reply within 24 hours."
      />
      <section className="relative z-10 gutter py-16 pb-32 bg-transparent grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-7 panel card-smoke rounded-[2rem] p-8 sm:p-12">
          <CardSmoke tone="dark" />
          {sent ? (
            <div className="relative z-10 min-h-[420px] flex flex-col items-center justify-center text-center">
              <span className="w-20 h-20 rounded-full bg-lime text-ink flex items-center justify-center mb-6">
                <Check size={36} />
              </span>
              <h3 className="font-display font-extrabold text-4xl mb-2">Inquiry Received.</h3>
              <p className="text-sand/60">
                A lead software architect will review your technical requirements and schedule a discovery session within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="relative z-10 space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-sand/50 mb-3">Project Type</p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-500 cursor-pointer ${
                        topic === t
                          ? 'bg-lime text-ink border-lime'
                          : 'border-white/15 text-sand/70 hover:border-lime'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input id="contact-name" required placeholder="Your full name" className="field" />
                <input id="contact-email" required type="email" placeholder="Business email" className="field" />
              </div>
              <input id="contact-company" placeholder="Company / Organization name" className="field" />
              <textarea
                id="contact-message"
                required
                rows={6}
                placeholder="Tell us about your software vision, desired tech stack, and target launch date..."
                className="field resize-none"
              />
              <WaterButton type="submit" variant="solid">
                Submit Project Brief <ArrowUpRight size={18} />
              </WaterButton>
            </form>
          )}
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5 space-y-4">
          {contactMethods.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="panel card-smoke rounded-3xl p-6 flex items-center gap-5 hover:border-lime/50 transition-colors duration-500"
            >
              <CardSmoke tone="dark" />
              <span className="relative z-10 w-14 h-14 rounded-2xl bg-lime/15 text-lime flex items-center justify-center">
                <Icon size={22} />
              </span>
              <div className="relative z-10">
                <p className="font-mono text-[11px] uppercase tracking-widest text-sand/45">{label}</p>
                <p className="font-display font-bold text-xl">{value}</p>
              </div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-3xl bg-aqua text-ink p-8 card-smoke-light">
            <CardSmoke tone="light" />
            <div className="relative z-10">
              <p className="font-display font-extrabold text-3xl leading-tight">Need a direct technical consultation?</p>
              <p className="mt-2 opacity-70">Schedule a 30-minute system architecture review with our Lead Software Architect.</p>
              <WaterButton variant="dark" className="mt-6">
                Schedule Consultation <ArrowUpRight size={16} />
              </WaterButton>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}

export { ContactPage };

