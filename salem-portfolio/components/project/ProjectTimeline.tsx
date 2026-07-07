'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useI18n } from '@/lib/i18n/context';

interface TimelineStep { phase: string; phase_ar?: string; desc: string; desc_ar?: string; }
interface Props { project: { timeline: TimelineStep[]; color: string; }; }

export default function ProjectTimeline({ project }: Props) {
  const { t, lang } = useI18n();
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
            {t.project.timeline.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.project.timeline.title}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">{t.project.timeline.highlight}</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-white/10 to-white/5 -translate-x-1/2" />
          <div className="space-y-8 lg:space-y-0">
            {project.timeline.map((step, i) => {
              const isLeft = i % 2 === 0;
              const phase = lang === 'ar' ? step.phase_ar || step.phase : step.phase;
              const desc = lang === 'ar' ? step.desc_ar || step.desc : step.desc;
              const card = (
                <div className="rounded-2xl p-6 border bg-gradient-to-br from-[#0d0d0d] to-[#080808] hover:border-white/15 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="inline-flex items-center gap-2 mb-3 font-black text-sm tracking-wider uppercase" style={{ color: project.color }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}>{i + 1}</span>
                    {phase}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              );
              return (
                <motion.div key={i} initial={{ opacity: 0, x: isLeft ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative lg:grid lg:grid-cols-2 lg:gap-12">
                  <div className={`${isLeft ? 'lg:text-right lg:pr-8' : 'lg:col-start-2 lg:pl-8'} lg:py-6`}>
                    {isLeft ? card : <div className="lg:hidden">{card}</div>}
                    {!isLeft && <div className="hidden lg:block">{card}</div>}
                  </div>
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: project.color, borderColor: '#080808' }} />
                  </div>
                  {isLeft && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
