'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Radio, Heart, MousePointerClick, Megaphone, Users, TrendingUp } from 'lucide-react';
import statsData from '@/data/stats.json';
import { useI18n } from '@/lib/i18n/context';

const iconMap: Record<string, React.ElementType> = { Radio, Heart, MousePointerClick, Megaphone, Users, TrendingUp };
const colorMap: Record<string, { gradient: string; bg: string; text: string; border: string }> = {
  violet: { gradient: 'from-violet-600 to-violet-400', bg: 'from-violet-600/15 to-violet-900/5', text: 'text-violet-400', border: 'border-violet-500/20' },
  rose: { gradient: 'from-rose-600 to-pink-400', bg: 'from-rose-600/15 to-rose-900/5', text: 'text-rose-400', border: 'border-rose-500/20' },
  amber: { gradient: 'from-amber-600 to-yellow-400', bg: 'from-amber-600/15 to-amber-900/5', text: 'text-amber-400', border: 'border-amber-500/20' },
  emerald: { gradient: 'from-emerald-600 to-teal-400', bg: 'from-emerald-600/15 to-emerald-900/5', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  sky: { gradient: 'from-sky-600 to-blue-400', bg: 'from-sky-600/15 to-sky-900/5', text: 'text-sky-400', border: 'border-sky-500/20' },
  indigo: { gradient: 'from-indigo-600 to-violet-400', bg: 'from-indigo-600/15 to-indigo-900/5', text: 'text-indigo-400', border: 'border-indigo-500/20' },
};

export default function CampaignResults() {
  const { t } = useI18n();
  return (
    <section id="results" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.08)_0%,_transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.results.badge} title={t.results.title} highlight={t.results.highlight} subtitle={t.results.subtitle} />
        <motion.div variants={staggerContainer(0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || TrendingUp;
            const colors = colorMap[stat.color] || colorMap.violet;
            const numericValue = parseFloat(stat.value.toString());
            const isDecimal = !Number.isInteger(numericValue);
            const label = t.results.stats[idx]?.label || stat.label;
            return (
              <motion.div key={stat.id} variants={fadeIn('up', 0)} whileHover={{ y: -6 }}
                className={`group relative rounded-3xl overflow-hidden border ${colors.border} bg-gradient-to-br from-[#0d0d0d] to-[#080808] hover:shadow-xl transition-all duration-500`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-8 space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}><Icon size={24} className={colors.text} /></div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter target={numericValue} suffix={stat.suffix} decimals={isDecimal ? 1 : 0} />
                    {!stat.suffix && stat.display.includes('+') ? '+' : ''}
                  </div>
                  <p className="text-white font-semibold">{label}</p>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${colors.gradient}`} initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-white/8 bg-gradient-to-br from-violet-950/30 to-pink-950/20 text-center">
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            {t.results.context}{' '}<span className="text-white font-semibold">{t.results.clients}</span>{' '}{t.results.context2}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
