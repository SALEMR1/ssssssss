'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useI18n } from '@/lib/i18n/context';
import {
  LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code, Globe,
  CheckCircle2, Award, Users,
} from 'lucide-react';

const expertiseIcons = [LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code, Globe];
const expertiseColors = ['violet', 'rose', 'amber', 'emerald', 'sky', 'indigo', 'purple', 'teal'];
const statIcons = [Award, Users, CheckCircle2];
const statColors = ['violet', 'rose', 'amber'];

const colorMap: Record<string, string> = {
  violet: 'text-violet-400',
  rose: 'text-rose-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
  sky: 'text-sky-400',
  indigo: 'text-indigo-400',
  purple: 'text-purple-400',
  teal: 'text-teal-400',
};

const gradientMap: Record<string, string> = {
  violet: 'from-violet-600 to-violet-400',
  rose: 'from-rose-600 to-pink-400',
  amber: 'from-amber-600 to-yellow-400',
};

const badgeColors = ['text-violet-400', 'text-pink-400', 'text-amber-400', 'text-emerald-400'];

export default function About() {
  const { t, isRTL } = useI18n();

  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-950/60 to-pink-950/40 border border-white/10 p-1">
              <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 space-y-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl shadow-violet-500/30 mx-auto">
                  <img src="https://ik.imagekit.io/effect/b_%D8%A7%D9%86%D8%A7_%D8%B9%D8%A7%D9%8A%D8%B2_%D8%A7%D9%84%D8%B1%D8%A7%D8%B3_%D8%A8%D8%B3_%D8%B2%D9%8A.png?updatedAt=1781361466755" alt="Salem Rizk" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-white">Salem Rizk</h3>
                  <p className="text-violet-400 text-sm font-medium mt-1">{t.about.role}</p>
                  <p className="text-gray-500 text-sm mt-1">{t.about.location} 🇪🇬</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  {t.about.expertise.map((label, i) => {
                    const Icon = expertiseIcons[i] || Globe;
                    return (
                      <span
                        key={label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                      >
                        <Icon size={12} className={colorMap[expertiseColors[i]]} />
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            {t.about.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className={`absolute ${i === 0 ? '-top-6 -right-6' : i === 1 ? '-bottom-6 -left-6' : '-bottom-4 right-10'} bg-black border border-white/10 rounded-2xl px-5 py-4 shadow-xl shadow-black/50 backdrop-blur-xl`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientMap[statColors[i]]} flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-violet-500/30 bg-violet-500/10 text-violet-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                {t.about.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {t.about.title}{' '}
                <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
                  {t.about.highlight}
                </span>
              </h2>
            </motion.div>

            <motion.p variants={fadeIn('up', 0.1)} className="text-gray-400 text-lg leading-relaxed">
              {t.about.p1}
            </motion.p>
            <motion.p variants={fadeIn('up', 0.2)} className="text-gray-400 leading-relaxed">
              {t.about.p2} <span className="text-white font-semibold">{t.about.p2_highlight}</span>.
            </motion.p>

            <motion.div variants={fadeIn('up', 0.3)} className="grid grid-cols-2 gap-4">
              {t.about.badges.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className={badgeColors[i]} />
                  <span className="text-gray-300 text-sm font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn('up', 0.4)} className="flex gap-4 pt-2">
              <a href="/#contact" className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold transition-all duration-300">
                {t.about.cta_work}
              </a>
              <a href="/#projects" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all duration-300">
                {t.about.cta_portfolio}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
