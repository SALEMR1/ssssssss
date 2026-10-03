'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function StickyCTA() {
  const { t, isRTL } = useI18n();
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    try {
      if (sessionStorage.getItem('saey_sticky_dismissed')) {
        setDismissed(true);
        return;
      }
    } catch { /* */ }

    const onScroll = () => {
      // Show after scrolling past ~80vh (past the hero)
      const threshold = window.innerHeight * 0.8;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
    try { sessionStorage.setItem('saey_sticky_dismissed', '1'); } catch { /* */ }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: -80,  opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          className="fixed top-20 left-0 right-0 z-[45] flex items-center justify-center"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="w-full bg-[#07152E]/95 backdrop-blur-md border-b border-saey-blue/20 shadow-lg shadow-blue-900/20">
            <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between gap-4">

              {/* Message */}
              <p className="text-white/70 text-xs sm:text-sm font-medium truncate">
                <span className="text-saey-blue font-bold">سعي للتسويق الرقمي</span>
                {' — '}
                <span className="hidden sm:inline">جاهزين نساعدك تنمّي نشاطك التجاري</span>
                <span className="sm:hidden">هيا نتعاون</span>
              </p>

              {/* CTA + Dismiss */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/#contact"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-saey-blue hover:bg-blue-700 text-white text-xs font-bold transition-colors duration-200 whitespace-nowrap"
                >
                  {t.nav.cta}
                  <ArrowLeft size={12} className={isRTL ? 'rotate-180' : ''} />
                </Link>

                <button
                  onClick={dismiss}
                  aria-label="إغلاق"
                  className="w-6 h-6 flex items-center justify-center rounded-full text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
