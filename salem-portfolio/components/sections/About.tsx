'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useI18n } from '@/lib/i18n/context';
import {
  LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code, Globe,
  CheckCircle2, Award, Users,
} from 'lucide-react';

const expertiseIcons = [LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code, Globe];
const expertiseColors = ['violet', 'blue', 'violet', 'blue', 'violet', 'blue', 'violet', 'blue'];
const statIcons = [Award, Users, CheckCircle2];

const colorMap: Record<string, string> = {
  violet: 'text-saey-violet',
  blue: 'text-saey-blue',
};

const badgeColors = ['text-saey-blue', 'text-saey-violet', 'text-saey-blue', 'text-saey-violet'];

export default function About() {
  const { t, isRTL } = useI18n();

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Visual card */}
          <motion.div
            variants={fadeIn(isRTL ? 'left' : 'right', 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-white border border-blue-100 p-1 shadow-lg shadow-blue-100/50">
              <div className="rounded-2xl bg-white p-8 space-y-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg shadow-saey-blue/20 mx-auto">
                  <Image src="/logo.png" alt="Salem Rizk" width={128} height={128} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-saey-navy">Salem Rizk</h3>
                  <p className="text-saey-blue text-sm font-medium mt-1">{t.about.role}</p>
                  <p className="text-saey-muted text-sm mt-1">{t.about.location} 🇪🇬</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {t.about.expertise.map((label, i) => {
                    const Icon = expertiseIcons[i] || Globe;
                    return (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'rgba(20,108,255,0.06)', border: '1px solid rgba(20,108,255,0.14)', color: '#146CFF' }}
                      >
                        <Icon size={12} className={colorMap[expertiseColors[i]]} />
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating stat cards — desktop only to avoid CLS on mobile */}
            {t.about.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className={`hidden md:flex absolute ${i === 0 ? '-top-6 -right-6' : i === 1 ? '-bottom-6 -left-6' : '-bottom-4 right-10'} bg-white border border-blue-100 rounded-2xl px-5 py-4 shadow-lg shadow-blue-100/50`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-saey-blue to-saey-violet flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-saey-navy">{stat.value}</div>
                      <div className="text-xs text-saey-muted">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Text */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={fadeIn('up', 0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-saey-blue/30 bg-saey-blue/10 text-saey-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-saey-blue animate-pulse" />
                {t.about.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#111827] leading-tight">
                {t.about.title}{' '}
                <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">
                  {t.about.highlight}
                </span>
              </h2>
            </motion.div>

            <motion.p variants={fadeIn('up', 0.1)} className="text-[#6B7280] text-lg leading-relaxed">
              {t.about.p1}
            </motion.p>
            <motion.p variants={fadeIn('up', 0.2)} className="text-[#6B7280] leading-relaxed">
              {t.about.p2} <span className="text-[#111827] font-semibold">{t.about.p2_highlight}</span>.
            </motion.p>

            <motion.div variants={fadeIn('up', 0.3)} className="grid grid-cols-2 gap-4">
              {t.about.badges.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className={badgeColors[i]} />
                  <span className="text-[#6B7280] text-sm font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn('up', 0.4)} className="flex gap-4 pt-2">
              <Link href="/#contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-saey-blue to-saey-violet text-white font-semibold transition-all duration-300">
                {t.about.cta_work}
              </Link>
              <Link href="/#projects" className="px-6 py-3 rounded-xl bg-white border border-saey-blue/20 text-[#111827] font-semibold transition-all duration-300 hover:border-saey-blue/40">
                {t.about.cta_portfolio}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
