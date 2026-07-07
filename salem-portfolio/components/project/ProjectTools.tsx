'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Wrench } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Props { project: { tools: string[]; color: string; }; }

export default function ProjectTools({ project }: Props) {
  const { t } = useI18n();
  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
              <Wrench size={18} style={{ color: project.color }} />
            </div>
            <h3 className="text-xl font-bold text-white">{t.project.tools.title}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {project.tools.map((tool, i) => (
              <motion.span key={tool} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: `${project.color}08`, borderColor: `${project.color}25`, color: '#d1d5db' }}>
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
