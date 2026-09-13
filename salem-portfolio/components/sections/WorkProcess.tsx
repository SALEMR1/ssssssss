'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { Search, Map, PenTool, Palette, Send, Megaphone, TrendingUp, BarChart3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const stepIcons = [Search, Map, PenTool, Palette, Send, Megaphone, TrendingUp, BarChart3];
const stepColors = ['blue','violet','blue','violet','blue','violet','blue','violet'];
const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string; connector: string }> = {
  blue: { gradient: 'from-saey-blue to-saey-blue', bg: 'from-saey-blue/15 to-transparent', border: 'border-saey-blue/20', text: 'text-saey-blue', connector: 'bg-saey-blue/30' },
  violet: { gradient: 'from-saey-violet to-saey-violet', bg: 'from-saey-violet/15 to-transparent', border: 'border-saey-violet/20', text: 'text-saey-violet', connector: 'bg-saey-violet/30' },
};

export default function WorkProcess() {
  const { t } = useI18n();
  return (
    <section id="process" className="relative py-32 bg-saey-gray overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#146CFF0D_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.process.badge} title={t.process.title} highlight={t.process.highlight} subtitle={t.process.subtitle} light />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, index) => {
            const colors = colorMap[stepColors[index]];
            const Icon = stepIcons[index];
            return (
              <motion.div key={step.title} variants={fadeIn('up', index * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover={{ y: -6 }}
                className={`group relative rounded-3xl bg-white border border-blue-100 p-6 space-y-4 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-300`}>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent opacity-30`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[stepColors[index]].gradient} flex items-center justify-center shadow-md shadow-saey-blue/20`}>
                      <Icon size={18} className={colors.text} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-saey-navy">{step.title}</h3>
                  <p className="text-saey-muted text-sm leading-relaxed">{step.desc}</p>
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
