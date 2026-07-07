'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface BAItem { metric: string; metric_ar?: string; before: string; after: string; improvement: string; }
interface Props { project: { beforeAfter: BAItem[]; color: string; }; }

export default function ProjectBeforeAfter({ project }: Props) {
  const { t, lang } = useI18n();
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
            {t.project.beforeAfter.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.project.beforeAfter.title}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">{t.project.beforeAfter.highlight}</span>
          </h2>
        </motion.div>
        {/* Headers */}
        <div className="grid grid-cols-3 gap-4 mb-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 justify-center px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <TrendingDown size={14} className="text-rose-400" />
            <span className="text-rose-400 text-xs font-bold tracking-wider uppercase">{t.project.beforeAfter.beforeLabel}</span>
          </div>
          <div />
          <div className="flex items-center gap-2 justify-center px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">{t.project.beforeAfter.afterLabel}</span>
          </div>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {project.beforeAfter.map((item, i) => {
            const metric = lang === 'ar' ? item.metric_ar || item.metric : item.metric;
            return (
              <motion.div key={item.metric} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="grid grid-cols-3 gap-4 items-center">
                <div className="rounded-2xl bg-rose-950/20 border border-rose-500/15 p-4 text-center">
                  <p className="text-rose-300 font-bold text-lg">{item.before}</p>
                  <p className="text-gray-500 text-xs mt-1">{metric}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                    <ArrowRight size={16} style={{ color: project.color }} />
                  </div>
                  <span className="text-xs font-black text-center leading-tight" style={{ color: project.color }}>{item.improvement}</span>
                </div>
                <div className="rounded-2xl p-4 text-center border" style={{ backgroundColor: `${project.color}10`, borderColor: `${project.color}30` }}>
                  <p className="font-bold text-lg text-white">{item.after}</p>
                  <p className="text-gray-500 text-xs mt-1">{metric}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
