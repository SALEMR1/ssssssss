'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Props {
  project: {
    strategy: string; strategy_ar?: string;
    strategyPoints: string[]; strategyPoints_ar?: string[];
    color: string;
  };
}

export default function ProjectStrategy({ project }: Props) {
  const { t, lang } = useI18n();
  const strategy = lang === 'ar' ? project.strategy_ar || project.strategy : project.strategy;
  const points = lang === 'ar' ? project.strategyPoints_ar || project.strategyPoints : project.strategyPoints;

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <motion.div variants={fadeIn('right', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
              <Lightbulb size={28} style={{ color: project.color }} />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
                style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
                {t.project.strategy.badge}
              </span>
              <h2 className="text-4xl font-black text-white leading-tight">{t.project.strategy.title}</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">{strategy}</p>
          </motion.div>
          <motion.div variants={fadeIn('left', 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3 space-y-4">
            {points.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all duration-300 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm flex-1">{point}</p>
                <ArrowRight size={16} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: project.color }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
