'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code, ArrowRight, CheckCircle2 } from 'lucide-react';
import servicesData from '@/data/services.json';
import { useI18n } from '@/lib/i18n/context';

interface ServiceEntry {
  id: number;
  icon: string;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  color?: string;
  emoji?: string;
  features: string[];
}

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, Target, Palette, Film, Calendar, BarChart3, Code,
};

const colorGradients: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  violet: { bg: 'from-violet-600/20 to-violet-900/5', border: 'border-violet-500/20', glow: 'group-hover:shadow-violet-500/20', text: 'text-violet-400' },
  rose: { bg: 'from-rose-600/20 to-rose-900/5', border: 'border-rose-500/20', glow: 'group-hover:shadow-rose-500/20', text: 'text-rose-400' },
  amber: { bg: 'from-amber-600/20 to-amber-900/5', border: 'border-amber-500/20', glow: 'group-hover:shadow-amber-500/20', text: 'text-amber-400' },
  emerald: { bg: 'from-emerald-600/20 to-emerald-900/5', border: 'border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/20', text: 'text-emerald-400' },
  sky: { bg: 'from-sky-600/20 to-sky-900/5', border: 'border-sky-500/20', glow: 'group-hover:shadow-sky-500/20', text: 'text-sky-400' },
  indigo: { bg: 'from-indigo-600/20 to-indigo-900/5', border: 'border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/20', text: 'text-indigo-400' },
  purple: { bg: 'from-purple-600/20 to-purple-900/5', border: 'border-purple-500/20', glow: 'group-hover:shadow-purple-500/20', text: 'text-purple-400' },
};

export default function Services() {
  const { t, lang } = useI18n();
  return (
    <section id="services" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          badge={t.services.badge}
          title={t.services.title}
          highlight={t.services.highlight}
          subtitle={t.services.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(servicesData as ServiceEntry[]).map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            const colors = (service.color && colorGradients[service.color]) || colorGradients.violet;
            const isLast = index === servicesData.length - 1;

            return (
              <motion.div
                key={service.id}
                variants={fadeIn('up', 0)}
                className={`group relative rounded-3xl p-px overflow-hidden transition-all duration-500 hover:shadow-2xl ${colors.glow} ${isLast ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Border gradient */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute inset-0 rounded-3xl border ${colors.border}`} />

                <div className="relative bg-gradient-to-br from-[#0d0d0d] to-[#080808] rounded-3xl p-8 h-full flex flex-col gap-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    <span className="text-3xl">{service.emoji || ''}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                      {lang === 'ar' ? service.title_ar || service.title : service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {lang === 'ar' ? service.description_ar || service.description : service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 size={14} className={colors.text} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow */}
                  <div className={`flex items-center gap-1 text-sm font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1`}>
                    {t.services.learnMore} <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeIn('up', 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-lg transition-all duration-300">
            {t.services.cta} <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
