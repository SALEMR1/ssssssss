'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import skillsData from '@/data/skills.json';
import { useI18n } from '@/lib/i18n/context';

const categoryColors = ['violet', 'rose', 'emerald', 'sky'];
const colorTextMap: Record<string, string> = { violet: 'text-violet-400', rose: 'text-rose-400', emerald: 'text-emerald-400', sky: 'text-sky-400' };
const colorBorderMap: Record<string, string> = { violet: 'border-violet-500/20', rose: 'border-rose-500/20', emerald: 'border-emerald-500/20', sky: 'border-sky-500/20' };

export default function Skills() {
  const { t, lang } = useI18n();
  return (
    <section id="skills" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.skills.badge} title={t.skills.title} highlight={t.skills.highlight} subtitle={t.skills.subtitle} />
        <motion.div variants={staggerContainer(0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, idx) => {
            const color = categoryColors[idx] || 'violet';
            const catLabel = lang === 'ar' ? t.skills.categories[idx]?.category || category.category : category.category;
            return (
              <motion.div key={category.id} variants={fadeIn('up', 0)} className={`rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border ${colorBorderMap[color]} p-8 space-y-6`}>
                <h3 className={`text-lg font-bold ${colorTextMap[color]} tracking-wide`}>{catLabel}</h3>
                <div className="space-y-5">
                  {category.skills.map((skill, i) => (
                    <ProgressBar key={skill.name} label={skill.name} level={skill.level} color={color} delay={i * 0.1} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-6 tracking-wider uppercase">{t.skills.toolsLabel}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Meta Ads Manager','Adobe Photoshop','Adobe Illustrator','Adobe Premiere Pro','After Effects','CapCut','Canva','Figma','Meta Business Suite','Google Analytics','Next.js','Database','SQL Server','Node.js'].map((tool) => (
              <span key={tool} className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default">{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
