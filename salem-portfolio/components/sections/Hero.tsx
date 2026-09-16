'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Glows */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-[100px] pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#146CFF15_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center pt-24 md:pt-0">

        {/* Brand identity badge */}
        <div className="flex flex-col items-center gap-3 mb-10">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-md shadow-blue-100">
              <img src="/logo.png" alt="سعي" className="w-full h-full object-cover" />
            </div>
            <div className="text-right">
              <p className="text-saey-navy font-black text-lg leading-tight">م. سالم رزق</p>
              <p className="text-saey-blue text-xs font-semibold tracking-wider">مؤسس سعي للتسويق الرقمي</p>
            </div>
          </div>
          {/* Saey badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-200 bg-blue-50 text-saey-blue">
            <Sparkles size={12} className="text-saey-blue" />
            سعي — Saey Digital Marketing
            <Sparkles size={12} className="text-saey-blue" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6">
          <span className="text-saey-navy">{t.hero.line1}</span>
          <br />
          <span className="text-saey-navy">{t.hero.line2}</span>
          <br />
          <span className="text-saey-navy">{t.hero.line3} </span>
          <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">
            {words[wordIndex]}
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-saey-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          {t.hero.sub}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 py-3 rounded-2xl bg-saey-gray border border-blue-100">
              <div className="text-2xl font-black bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-saey-muted text-xs tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#projects" id="hero-view-portfolio"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-saey-blue text-white font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-1">
            {t.hero.cta_primary}
            <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
          </Link>
          <Link href="/#contact" id="hero-contact"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border-2 border-blue-200 text-saey-navy font-semibold text-lg transition-all duration-300 hover:border-saey-blue hover:shadow-lg hover:shadow-blue-100">
            {t.hero.cta_secondary}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-saey-muted/50">
        <span className="text-xs tracking-widest">{t.hero.scroll}</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
