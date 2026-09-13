'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const LOGO_URL = '/logo.png';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after max 800ms — don't block LCP longer than needed
    const id = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Fast fade-out — 250ms
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[200] bg-[#080808] flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={LOGO_URL}
                alt=""
                width={64}
                height={64}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white font-bold text-base tracking-wide">Salem Rizk</p>
            {/* Simple CSS progress bar — no framer-motion weight */}
            <div className="w-32 h-px bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-saey-blue to-saey-violet rounded-full animate-[loading_0.35s_ease-out_forwards]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
