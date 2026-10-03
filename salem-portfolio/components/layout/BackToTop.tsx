'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="العودة للأعلى"
          className={[
            'fixed z-[9970]',
            // موبايل: فوق WhatsApp (76px + 52px height + 8px gap = 136px)
            'right-4 bottom-[136px]',
            // ديسكتوب: فوق WhatsApp (24px + 52px + 8px = 84px)
            'lg:right-6 lg:bottom-[84px]',
          ].join(' ') +
            ' w-10 h-10 rounded-xl bg-white border border-blue-100 text-saey-navy flex items-center justify-center shadow-md hover:border-saey-blue hover:text-saey-blue transition-colors duration-200'
          }
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
