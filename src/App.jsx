import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { WebGLBackground, CustomCursor } from './components/ui.jsx';
import { ScrollProgress } from './components/wow.jsx';
import { Navbar, Footer } from './components/Layout.jsx';
import HomePage from './pages/Home.jsx';
import { ProductPage, SolutionsPage, CustomersPage, PricingPage, AboutPage, JournalPage, ContactPage } from './pages/Pages.jsx';

gsap.registerPlugin(ScrollTrigger);

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = null; };
  }, []);
}

function MainLayout() {
  const location = useLocation();
  useSmoothScroll();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="relative bg-ink text-sand min-h-screen">
      <ScrollProgress />
      <WebGLBackground />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.error('Recovered from UI error:', err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink text-sand flex flex-col items-center justify-center p-8 text-center">
          <p className="font-mono text-xs text-lime uppercase tracking-widest mb-3">AURA RUNTIME RECOVERY</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl mb-6">View refreshed.</h2>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="px-6 py-3 rounded-full bg-lime text-ink font-bold cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
