import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Check, Quote, Share2, Bookmark } from 'lucide-react';
import { WaterButton } from '../ui.jsx';

/**
 * Interactive full-screen reader modal for technical essays and architectural manifestos.
 */
export function ArticleModal({ article, onClose, onShare, copied }) {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass bg-ink/95 border border-white/15 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-lime text-ink font-mono text-xs font-bold">
                  {article.c}
                </span>
                <span className="font-mono text-xs text-sand/50">
                  {article.d} · {article.r} read
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-lime hover:text-black flex items-center justify-center text-sand transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Title */}
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-sand mt-6 leading-tight">
              {article.t}
            </h2>

            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-sand/60">
              <User size={14} className="text-lime" />
              <span>By {article.author}</span>
              <span>· Aura Engineering Lab</span>
            </div>

            {/* Modal Body */}
            <div className="mt-8 space-y-6 text-sand/80 leading-relaxed text-base sm:text-lg">
              <p className="text-xl sm:text-2xl font-light text-sand leading-relaxed border-l-2 border-lime pl-4">
                {article.lead}
              </p>

              <div className="my-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-lime mb-4">
                  Architectural Key Takeaways
                </h4>
                <ul className="space-y-3">
                  {article.takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-sand/90">
                      <Check size={18} className="text-lime shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="my-8 p-6 rounded-2xl bg-lime text-ink">
                <Quote size={28} className="opacity-60 mb-2" />
                <p className="font-display font-bold text-xl sm:text-2xl leading-snug">
                  "{article.quote}"
                </p>
                <span className="font-mono text-xs font-bold block mt-3">
                  — {article.author}
                </span>
              </blockquote>

              <p>
                Across millions of visitor interactions logged across our shipped software flagships, the data confirms that creative boldness combined with technical rigor produces compounding brand equity. When an application is blisteringly fast and intuitive, users don't just use it — they advocate for it.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onShare(article)}
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-lime text-xs font-mono flex items-center gap-2 text-sand hover:text-lime transition-colors cursor-pointer"
                >
                  <Share2 size={14} />
                  <span>{copied ? 'Link Copied!' : 'Share Essay'}</span>
                </button>
                <button
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-lime text-xs font-mono flex items-center gap-2 text-sand hover:text-lime transition-colors cursor-pointer"
                >
                  <Bookmark size={14} />
                  <span>Save for later</span>
                </button>
              </div>
              <WaterButton onClick={onClose} variant="solid">
                Close Essay
              </WaterButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArticleModal;

