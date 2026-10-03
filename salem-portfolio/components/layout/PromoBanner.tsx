'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import settings from '@/data/settings.json';

type Variant = 'facebook' | 'youtube';

const SESSION_KEY = 'saey_promo_v3';
const VISIT_KEY   = 'saey_visits_v3';
const SHOW_AFTER  = 0;    // TEST: show immediately
const AUTO_CLOSE  = 14000;

const CONFIG: Record<Variant, {
  platform: string; action: string; sub: string;
  followers: string; accentColor: string; borderRgb: string;
  href: string; svgPath: string;
}> = {
  facebook: {
    platform:    'فيسبوك',
    action:      'تابع الصفحة',
    sub:         'محتوى، حملات وكواليس العمل',
    followers:   '+12K متابع',
    accentColor: '#1877F2',
    borderRgb:   '24,119,242',
    href:        settings.facebook,
    svgPath:     'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  youtube: {
    platform:    'يوتيوب',
    action:      'اشترك الآن',
    sub:         'نصائح تسويقية وتحليل دراسات الحالة',
    followers:   '+12K مشترك',
    accentColor: '#FF0000',
    borderRgb:   '255,0,0',
    href:        settings.youtube,
    svgPath:     'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
};

export default function PromoBanner() {
  const [show,    setShow]    = useState(false);
  const [variant, setVariant] = useState<Variant>('facebook');
  const [prog,    setProg]    = useState(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Already dismissed this session — skip
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch { return; }

    // Pick variant based on visit parity
    let count = 0;
    try {
      count = parseInt(localStorage.getItem(VISIT_KEY) ?? '0', 10) || 0;
      localStorage.setItem(VISIT_KEY, String(count + 1));
    } catch { /* incognito — just use default */ }

    setVariant(count % 2 === 0 ? 'facebook' : 'youtube');

    // Show after delay
    timerRef.current = setTimeout(() => {
      setShow(true);

      // Auto-dismiss progress
      const step = AUTO_CLOSE / 100;
      intervalRef.current = setInterval(() => {
        setProg(p => {
          if (p >= 99) {
            close();
            return 100;
          }
          return p + 1;
        });
      }, step);
    }, SHOW_AFTER);

    return () => {
      if (timerRef.current)   clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShow(false);
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* */ }
  };

  const v = CONFIG[variant];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="promo-banner"
          dir="rtl"
          role="dialog"
          aria-label={`تابعنا على ${v.platform}`}
          initial={{ opacity: 0, y: 90, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 70, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100vw-24px)] max-w-[360px]"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-2xl opacity-25 pointer-events-none"
            style={{ background: v.accentColor }}
          />

          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden bg-[#06112A]"
            style={{ border: `1px solid rgba(${v.borderRgb},0.35)` }}
          >
            {/* Top line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg,transparent,${v.accentColor},transparent)` }}
            />

            <div className="p-4 pb-3">
              <div className="flex items-center gap-3">
                {/* Logo + live dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden"
                    style={{ boxShadow: `0 0 0 2px rgba(${v.borderRgb},0.4)` }}
                  >
                    <Image src="/logo.png" alt="سعي" width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#06112A]">
                    <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-75" />
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                      style={{ backgroundColor: `rgba(${v.borderRgb},0.15)`, color: v.accentColor }}
                    >
                      <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={v.svgPath} />
                      </svg>
                      {v.platform}
                    </span>
                    <span className="text-[10px] text-white/40">{v.followers}</span>
                  </div>
                  <p className="text-white font-bold text-sm leading-tight">سعي للتسويق الرقمي</p>
                  <p className="text-white/45 text-[11px] mt-0.5 truncate">{v.sub}</p>
                </div>

                {/* Close */}
                <button
                  onClick={close}
                  aria-label="إغلاق"
                  className="-mt-4 -ml-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>

              {/* CTA */}
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm text-white active:scale-[0.97] transition-all duration-150"
                style={{
                  background: `linear-gradient(135deg,rgba(${v.borderRgb},0.85),${v.accentColor})`,
                  boxShadow:  `0 4px 16px rgba(${v.borderRgb},0.4)`,
                }}
              >
                {v.action}
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </a>

              {/* Skip */}
              <button
                onClick={close}
                className="mt-1.5 w-full text-center text-[11px] text-white/25 hover:text-white/50 transition-colors py-0.5"
              >
                لا شكراً
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 bg-white/5">
              <div
                className="h-full transition-none"
                style={{ width: `${prog}%`, background: v.accentColor, opacity: 0.45 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
