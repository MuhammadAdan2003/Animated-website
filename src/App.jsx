import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Lenis from 'lenis';
import { WebGLBackground, CustomCursor } from './components/ui.jsx';
import { ScrollProgress } from './components/wow.jsx';
import { Navbar, Footer } from './components/Layout.jsx';
import HomePage from './pages/Home.jsx';

const ProductPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.ProductPage })));
const SolutionsPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.SolutionsPage })));
const CustomersPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.CustomersPage })));
const PricingPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.PricingPage })));
const AboutPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.AboutPage })));
const JournalPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.JournalPage })));
const ContactPage = lazy(() => import('./pages/Pages.jsx').then((m) => ({ default: m.ContactPage })));

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    });
    window.__lenis = lenis;
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
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
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="w-full"
          >
            <Suspense fallback={<div className="min-h-screen w-full" />}>
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
            </Suspense>
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
