'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Trophy, Zap, Users, DollarSign, Star, TrendingUp, Heart, Award, MessageSquare, GraduationCap } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const iconMap: Record<string, React.ElementType> = { Trophy, Zap, Users, DollarSign, Star, TrendingUp, Heart, Award, MessageSquare, GraduationCap };

interface Achievement { icon: string; title: string; title_ar?: string; desc: string; desc_ar?: string; }
interface Props { project: { achievements: Achievement[]; color: string; }; }

export default function ProjectAchievements({ project }: Props) {
  const { t, lang } = useI18n();
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
            {t.project.achievements.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.project.achievements.title}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">{t.project.achievements.highlight}</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {project.achievements.map((item, i) => {
            const Icon = iconMap[item.icon] || Trophy;
            const title = lang === 'ar' ? item.title_ar || item.title : item.title;
            const desc = lang === 'ar' ? item.desc_ar || item.desc : item.desc;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/8 p-6 space-y-4 hover:border-white/15 transition-all duration-500 hover:shadow-xl group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                  <Icon size={24} style={{ color: project.color }} />
                </div>
                <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
