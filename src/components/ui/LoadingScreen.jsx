import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setLoaderFinished } from '../../hooks/useLoaderState.js';

const PHASES = [
  { threshold: 0, text: 'INITIALIZING CORE ENGINE' },
  { threshold: 30, text: 'HYDRATING SHADERS' },
  { threshold: 65, text: 'PREPARING EXPERIENCE' },
  { threshold: 92, text: 'SYSTEM READY' },
];

export function LoadingScreen({ minDuration = 1800, onComplete }) {
  const [isFinished, setIsFinished] = useState(false);
  const [phaseText, setPhaseText] = useState(PHASES[0].text);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Expose replay hook for testing or developer trigger
    window.__replayLoadingScreen = () => {
      setLoaderFinished(false);
      setIsFinished(false);
      setPhaseText(PHASES[0].text);
      runAnimation();
    };

    return () => {
      delete window.__replayLoadingScreen;
    };
  }, []);

  const runAnimation = () => {
    // Lock background scroll during preloader
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(1, elapsed / minDuration);

      // Continuous smooth cubic easing (no steps, no sudden piecewise jerks)
      const eased = 1 - Math.pow(1 - rawRatio, 2.8);
      const percent = Math.min(100, Math.round(eased * 100));

      // Direct DOM update for zero React render lag (locked 120 FPS smoothness)
      if (counterRef.current) {
        counterRef.current.textContent = percent < 10 ? `0${percent}` : `${percent}`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${eased * 100}%`;
      }

      // Smooth phase text update
      if (percent >= 92) setPhaseText(PHASES[3].text);
      else if (percent >= 65) setPhaseText(PHASES[2].text);
      else if (percent >= 30) setPhaseText(PHASES[1].text);
      else setPhaseText(PHASES[0].text);

      if (rawRatio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        if (counterRef.current) counterRef.current.textContent = '100';
        if (barRef.current) barRef.current.style.width = '100%';
        setPhaseText(PHASES[3].text);

        // Perceptual pause at 100% before smooth cinematic curtain lift
        setTimeout(() => {
          setIsFinished(true);
          setLoaderFinished(true);
          if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
          }
          if (onComplete) onComplete();
        }, 220);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  };

  useEffect(() => {
    const cancel = runAnimation();
    return () => {
      if (cancel) cancel();
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    if (counterRef.current) counterRef.current.textContent = '100';
    if (barRef.current) barRef.current.style.width = '100%';
    setIsFinished(true);
    setLoaderFinished(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="aura-loading-screen"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Smooth cinematic shutter wipe
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#050a0a] text-sand flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden border-b border-white/10 pointer-events-auto"
        >
          {/* Top Architectural Telemetry Bar (No slashes, no blinking dots) */}
          <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-sand/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="text-sand/90 font-bold">AURA STUDIO 2026</span>
            </div>

            <button
              onClick={handleSkip}
              className="text-sand/40 hover:text-lime transition-colors tracking-widest text-[10px] py-1 px-3 rounded-full border border-white/10 hover:border-lime/30"
            >
              [ SKIP ]
            </button>
          </div>

          {/* Center Stage: Minimal Masked Wordmark & Progress Indicator */}
          <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-4xl mx-auto w-full">
            {/* Masked Monumental Wordmark Reveal (Zero background glow, zero drop shadow) */}
            <div className="overflow-hidden py-1 mb-8 sm:mb-10">
              <motion.h1
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.92] tracking-[-0.04em] flex flex-wrap items-baseline justify-center gap-x-3 sm:gap-x-6"
              >
                <span
                  className="text-transparent"
                  style={{
                    WebkitTextStroke: 'clamp(1.5px, 0.25vw, 3px) rgba(243, 238, 227, 0.65)',
                  }}
                >
                  aura
                </span>
                <span className="text-lime">
                  studio
                </span>
              </motion.h1>
            </div>

            {/* Hairline Progress Bar (Clean, solid lime-aqua track) */}
            <div className="w-56 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-lime to-aqua will-change-[width]"
                style={{ width: '0%' }}
              />
            </div>

            {/* Monumental Telemetry Counter (Direct DOM for silky 120 FPS numbers) */}
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span
                ref={counterRef}
                className="font-mono font-extrabold text-4xl sm:text-6xl tracking-tight text-sand tabular-nums"
              >
                00
              </span>
              <span className="font-mono text-sm sm:text-base text-lime font-bold">%</span>
            </div>

            {/* Dynamic Telemetry Status Phase (Clean text, no // slashes, no 120fps) */}
            <div className="h-6 overflow-hidden flex items-center justify-center">
              <motion.p
                key={phaseText}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[10px] sm:text-xs text-sand/60 uppercase tracking-[0.2em]"
              >
                {phaseText}
              </motion.p>
            </div>
          </div>

          {/* Bottom Coordinates & Architecture Telemetry (No latency, no 120fps, no slashes) */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono tracking-[0.16em] text-sand/50 uppercase">
            <span>SAN FRANCISCO · LONDON · ZURICH · TOKYO</span>
            <span className="text-sand/40">DIGITAL FLAGSHIP ARCHITECTURE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
