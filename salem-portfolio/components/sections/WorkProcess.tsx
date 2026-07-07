'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { Search, Map, PenTool, Palette, Send, Megaphone, TrendingUp, BarChart3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const stepIcons = [Search, Map, PenTool, Palette, Send, Megaphone, TrendingUp, BarChart3];
const stepColors = ['violet','rose','amber','emerald','sky','indigo','purple','pink'];
const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string; connector: string }> = {
  violet: { gradient: 'from-violet-600 to-violet-400', bg: 'from-violet-600/15 to-transparent', border: 'border-violet-500/20', text: 'text-violet-400', connector: 'bg-violet-500/30' },
  rose: { gradient: 'from-rose-600 to-pink-400', bg: 'from-rose-600/15 to-transparent', border: 'border-rose-500/20', text: 'text-rose-400', connector: 'bg-rose-500/30' },
  amber: { gradient: 'from-amber-600 to-yellow-400', bg: 'from-amber-600/15 to-transparent', border: 'border-amber-500/20', text: 'text-amber-400', connector: 'bg-amber-500/30' },
  emerald: { gradient: 'from-emerald-600 to-teal-400', bg: 'from-emerald-600/15 to-transparent', border: 'border-emerald-500/20', text: 'text-emerald-400', connector: 'bg-emerald-500/30' },
  sky: { gradient: 'from-sky-600 to-blue-400', bg: 'from-sky-600/15 to-transparent', border: 'border-sky-500/20', text: 'text-sky-400', connector: 'bg-sky-500/30' },
  indigo: { gradient: 'from-indigo-600 to-violet-400', bg: 'from-indigo-600/15 to-transparent', border: 'border-indigo-500/20', text: 'text-indigo-400', connector: 'bg-indigo-500/30' },
  purple: { gradient: 'from-purple-600 to-violet-400', bg: 'from-purple-600/15 to-transparent', border: 'border-purple-500/20', text: 'text-purple-400', connector: 'bg-purple-500/30' },
  pink: { gradient: 'from-pink-600 to-rose-400', bg: 'from-pink-600/15 to-transparent', border: 'border-pink-500/20', text: 'text-pink-400', connector: 'bg-pink-500/30' },
};

export default function WorkProcess() {
  const { t } = useI18n();
  return (
    <section id="process" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.process.badge} title={t.process.title} highlight={t.process.highlight} subtitle={t.process.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, index) => {
            const colors = colorMap[stepColors[index]];
            const Icon = stepIcons[index];
            return (
              <motion.div key={step.title} variants={fadeIn('up', index * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -6 }}
                className={`group relative rounded-3xl overflow-hidden border ${colors.border} bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-6 transition-all duration-500 hover:shadow-xl`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent opacity-30`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon size={18} className={colors.text} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {index % 4 !== 3 && <div className={`hidden lg:block absolute top-1/2 -right-3 w-6 h-px ${colors.connector}`} />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
