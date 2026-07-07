'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { LayoutGrid, Target, Palette, Video, TrendingUp, BarChart3, Sparkles, Film, GraduationCap, Code } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const iconMap: Record<string, React.ElementType> = { LayoutGrid, Target, Palette, Video, TrendingUp, BarChart3, Sparkles, Film, GraduationCap, Code };

interface Service { icon: string; title: string; title_ar?: string; desc: string; desc_ar?: string; }
interface Props { project: { overview: string; overview_ar?: string; services: Service[]; color: string; }; }

export default function ProjectOverview({ project }: Props) {
  const { t, lang } = useI18n();
  const overview = lang === 'ar' ? project.overview_ar || project.overview : project.overview;
  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div variants={fadeIn('right', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
                style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                {t.project.overview.badge}
              </span>
              <h2 className="text-4xl font-black text-white leading-tight">{t.project.overview.title}</h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">{overview}</p>
          </motion.div>
          <motion.div variants={fadeIn('left', 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">{t.project.overview.servicesTitle}</h3>
            <div className="grid grid-cols-1 gap-3">
              {project.services.map((service, i) => {
                const Icon = iconMap[service.icon] || LayoutGrid;
                const title = lang === 'ar' ? service.title_ar || service.title : service.title;
                const desc = lang === 'ar' ? service.desc_ar || service.desc : service.desc;
                return (
                  <motion.div key={service.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                      <Icon size={18} style={{ color: project.color }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{title}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
