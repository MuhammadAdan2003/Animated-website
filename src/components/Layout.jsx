import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import { WaterButton, Heading, Reveal } from './ui.jsx';

export const NAV = [
  { to: '/product', label: 'Product' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/customers', label: 'Customers' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/journal', label: 'Journal' },
];

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Aura home">
      <span className="relative w-8 h-8 rounded-xl bg-lime flex items-center justify-center overflow-hidden">
        <span className="absolute w-5 h-5 rounded-full border-[3px] border-ink" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-ink" />
      </span>
      <span className="font-display font-extrabold text-xl tracking-tight text-sand">aura</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-[80] flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
            <WaterButton to="/contact" variant="light" className="!py-2.5 !px-5 hidden sm:inline-flex">
              Get started <ArrowUpRight size={15} />
            </WaterButton>
            <button
              id="menu-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
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
            className="fixed inset-0 z-[70] bg-ink/90 backdrop-blur-2xl lg:hidden flex flex-col justify-center gutter"
          >
            {[...NAV, { to: '/contact', label: 'Contact' }].map((n, i) => (
              <motion.div key={n.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <Link to={n.to} className="block font-display font-extrabold text-5xl py-2 text-sand hover:text-lime transition-colors">
                  {n.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const cols = [
    { h: 'Product', l: [['Platform', '/product'], ['Solutions', '/solutions'], ['Pricing', '/pricing'], ['Customers', '/customers']] },
    { h: 'Company', l: [['About', '/about'], ['Journal', '/journal'], ['Contact', '/contact'], ['Careers', '/about']] },
    { h: 'Resources', l: [['Docs', '/product'], ['API reference', '/product'], ['Status', '/contact'], ['Security', '/about']] },
  ];
  return (
    <footer className="relative z-10 bg-ink2 border-t border-white/10 gutter pt-20 pb-8 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-5">
          <Logo />
          <p className="mt-5 text-sand/60 max-w-sm leading-relaxed">
            The spatial intelligence platform for teams who design, simulate and run the places people love.
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
      <div className="mt-16 overflow-hidden">
        <p className="font-display font-extrabold text-[26vw] leading-[0.8] text-transparent select-none" style={{ WebkitTextStroke: '1px rgba(243,238,227,0.12)' }}>
          aura
        </p>
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-sand/50 font-mono">
        <span>© 2026 Aura Technologies, Inc.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  );
}
