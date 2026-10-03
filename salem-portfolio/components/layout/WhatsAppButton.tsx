'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import settings from '@/data/settings.json';

const WA_URL = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('مرحباً، وصلت إليك من موقعك وأريد الاستفسار عن خدماتك 👋')}`;

export default function WhatsAppButton() {
  const [visible,     setVisible]     = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 1500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="wa-wrap"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className={[
            'fixed z-[9980]',
            // موبايل: فوق bottom nav (64px) + 12px مسافة = 76px
            'right-4 bottom-[76px]',
            // ديسكتوب: الكورنر العادي
            'lg:right-6 lg:bottom-6',
          ].join(' ')}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="wa-tooltip"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{   opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-1/2 right-full translate-y-1/2 mr-3 bg-[#07152E] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
                dir="rtl"
              >
                تحدث معي الآن 👋
                <span className="absolute top-1/2 -right-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#07152E] rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل عبر واتساب"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative flex w-[52px] h-[52px] rounded-full items-center justify-center shadow-xl shadow-green-900/25 hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
            <svg width={26} height={26} viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
