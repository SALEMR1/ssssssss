'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function Hero() {
  const { t, isRTL } = useI18n();
  const words = t.hero.words;
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Decorative glows — hidden on mobile to save GPU */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center pt-24 md:pt-0">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black leading-[1.2] sm:leading-[1.15] tracking-tight mb-6">
          <span className="text-white">{t.hero.line1}</span>
          <br />
          <span className="text-white">{t.hero.line2}</span>
          <br />
          <span className="text-white">{t.hero.line3} </span>
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
            {words[wordIndex]}
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          {t.hero.sub}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-gray-500 text-xs tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#projects"
            id="hero-view-portfolio"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-lg transition-all duration-300"
          >
            {t.hero.cta_primary}
            <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
          </Link>
          <Link
            href="/#contact"
            id="hero-contact"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
          >
            {t.hero.cta_secondary}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest">{t.hero.scroll}</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
