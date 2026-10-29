import React, { useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { Link, NavLink } from './navigation/Link.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { WaterButton, Heading, Reveal } from './ui.jsx';
import { useLoaderFinished } from '../hooks/useLoaderState.js';

export const NAV = [
  { to: '/product', label: 'Services' },
  { to: '/solutions', label: 'Expertise' },
  { to: '/customers', label: 'Work' },
  { to: '/pricing', label: 'Engagements' },
  { to: '/about', label: 'Studio' },
  { to: '/journal', label: 'Perspectives' },
];

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Aura Agency home">
      <span className="relative w-8 h-8 rounded-xl bg-lime flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(200,255,77,0.35)]">
        <span className="absolute w-5 h-5 rounded-full border-[2.5px] border-dashed border-ink animate-[spin_14s_linear_infinite]" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-ink" />
      </span>
      <span className="font-display font-extrabold text-xl tracking-tight text-sand">
        aura<span className="text-lime text-xs font-mono ml-1 font-normal tracking-normal uppercase">studio</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = React.useRef(false);
  const location = useLocation();
  const loaderFinished = useLoaderFinished();

  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const on = () => {
      const next = window.scrollY > 40;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-[80] flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={loaderFinished ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`glass pointer-events-auto rounded-full flex items-center gap-3 lg:gap-8 pl-5 pr-2 py-2 transition-all duration-700 ${
            scrolled ? 'bg-ink/60 w-[min(1080px,100%)]' : 'w-[min(1180px,100%)]'
          }`}
          aria-label="Primary"
        >
          <Logo />
          <ul className="hidden lg:flex items-center gap-1 mx-auto">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      isActive ? 'text-ink' : 'text-sand/70 hover:text-sand'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span layoutId="navPill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative">{n.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="ml-auto lg:ml-0 flex items-center gap-2">
            <div className="hidden sm:block">
              <WaterButton to="/contact" variant="light" className="water-sm">
                Start a project <ArrowUpRight size={15} />
              </WaterButton>
            </div>
            <button
              id="menu-toggle"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-sand transition-all shrink-0"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[#050a0a]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 overflow-y-auto"
          >
            {/* Ambient Background Glow in Mobile Menu */}
            <div
              className="pointer-events-none absolute top-1/4 right-0 w-80 h-80 rounded-full blur-[100px] opacity-25"
              style={{ background: 'radial-gradient(circle, rgba(200,255,77,0.3) 0%, transparent 70%)' }}
            />

            {/* Menu Links */}
            <div className="flex flex-col space-y-3 sm:space-y-4 my-auto relative z-10">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lime/80 mb-2">
                Navigation
              </span>
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block font-display font-extrabold text-3xl sm:text-4xl text-sand hover:text-lime transition-colors py-1"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Mobile Action CTA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="pt-6 border-t border-white/10 flex flex-col gap-3 relative z-10"
            >
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="w-full py-3.5 px-6 rounded-full bg-lime text-ink font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(200,255,77,0.35)]"
              >
                Start a project <ArrowUpRight size={16} />
              </Link>
              <div className="flex items-center justify-between text-[11px] font-mono text-sand/40 pt-1">
                <span>AURA STUDIO 2026</span>
                <span className="text-lime">HIGH CRAFT</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const cols = [
    { h: 'Capabilities', l: [['Full-Stack Web Apps', '/product'], ['Enterprise SaaS', '/product'], ['Cloud Microservices', '/solutions'], ['AI Engineering & Agents', '/product']] },
    { h: 'Studio', l: [['About Aura', '/about'], ['Selected Work', '/customers'], ['Perspectives', '/journal'], ['Engagement Models', '/pricing']] },
    { h: 'Collaborate', l: [['Start a Project', '/contact'], ['Technical RFP', '/contact'], ['Architecture Inquiries', '/contact'], ['Careers & Fellows', '/about']] },
  ];
  return (
    <footer className="relative z-10 bg-ink/70 backdrop-blur-md border-t border-white/10 gutter pt-20 pb-8 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-5">
          <Logo />
          <p className="mt-5 text-sand/60 max-w-sm leading-relaxed">
            Aura is an elite software development & modern website development agency. We architect boundary-pushing web applications, scalable cloud backends, and transformative enterprise software.
          </p>
          <div className="flex gap-3 mt-6">
            {[Twitter, Linkedin, Github, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sand/70 hover:bg-lime hover:text-ink hover:border-lime transition-all duration-500">
                <I size={16} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h} className="md:col-span-2">
            <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-lime mb-5">{c.h}</h4>
            <ul className="space-y-3">
              {c.l.map(([t, to]) => (
                <li key={t}>
                  <Link to={to} className="text-sand/70 hover:text-sand transition-colors">{t}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative mt-16 sm:mt-24 pt-6 pb-2 overflow-hidden border-t border-white/5">
        {/* Masked Editorial Text Reveal When Reaching Footer (Container-driven intersection) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '60px' }}
          className="relative z-10 select-none flex flex-wrap items-baseline gap-x-4 sm:gap-x-10 w-full font-display font-extrabold text-[clamp(5rem,19.5vw,24rem)] leading-[0.80] tracking-[-0.055em]"
        >
          {/* Masked Clip Container for "aura" */}
          <div className="overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: '110%' },
                visible: {
                  y: '0%',
                  transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-transparent inline-block cursor-default select-none"
              style={{
                WebkitTextStroke: 'clamp(2px, 0.35vw, 4.5px) rgba(243, 238, 227, 0.55)',
              }}
            >
              aura
            </motion.span>
          </div>

          {/* Masked Clip Container for simple "studio" text */}
          <div className="overflow-hidden py-1">
            <motion.span
              variants={{
                hidden: { y: '110%' },
                visible: {
                  y: '0%',
                  transition: { duration: 1.05, delay: 0.14, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-lime inline-block cursor-default select-none"
            >
              studio
            </motion.span>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-sand/50 font-mono">
        <span>© 2026 Aura Software Engineering & Modern Web Agency Ltd.</span>
        <span>San Francisco · London · Zurich · Tokyo</span>
      </div>
    </footer>
  );
}
