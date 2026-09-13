'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

/* All service cards use the two logo accents, not an unrelated rainbow. */
const colorMap: Record<string, { iconBg: string; iconBorder: string; check: string; hover: string }> = {
  violet:  { iconBg: 'bg-violet-50', iconBorder: 'border-violet-200', check: 'text-saey-violet', hover: 'group-hover:text-saey-violet' },
  rose:    { iconBg: 'bg-blue-50',   iconBorder: 'border-blue-200',   check: 'text-saey-blue',   hover: 'group-hover:text-saey-blue' },
  amber:   { iconBg: 'bg-violet-50', iconBorder: 'border-violet-200', check: 'text-saey-violet', hover: 'group-hover:text-saey-violet' },
  emerald: { iconBg: 'bg-blue-50',   iconBorder: 'border-blue-200',   check: 'text-saey-blue',   hover: 'group-hover:text-saey-blue' },
  sky:     { iconBg: 'bg-blue-50',   iconBorder: 'border-blue-200',   check: 'text-saey-blue',   hover: 'group-hover:text-saey-blue' },
  indigo:  { iconBg: 'bg-violet-50', iconBorder: 'border-violet-200', check: 'text-saey-violet', hover: 'group-hover:text-saey-violet' },
  purple:  { iconBg: 'bg-violet-50', iconBorder: 'border-violet-200', check: 'text-saey-violet', hover: 'group-hover:text-saey-violet' },
};

export default function Services() {
  const { t, lang } = useI18n();
  return (
    <section id="services" className="relative py-32 bg-saey-gray overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#146CFF0D_1px,_transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.services.badge} title={t.services.title} highlight={t.services.highlight} subtitle={t.services.subtitle} />

        <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(servicesData as ServiceEntry[]).map((service, index) => {
            const c = (service.color && colorMap[service.color]) || colorMap.indigo;
            const isLast = index === servicesData.length - 1;
            return (
              <motion.div key={service.id} variants={fadeIn('up', 0)}
                className={`brand-surface group relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-400 ${isLast ? 'md:col-span-2 lg:col-span-1' : ''}`}>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${c.iconBg} border ${c.iconBorder} flex items-center justify-center text-3xl`}>
                  {service.emoji || '✦'}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className={`text-xl font-bold text-saey-navy transition-colors ${c.hover}`}>
                    {lang === 'ar' ? service.title_ar || service.title : service.title}
                  </h3>
                  <p className="text-saey-muted text-sm leading-relaxed">
                    {lang === 'ar' ? service.description_ar || service.description : service.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-saey-muted">
                      <CheckCircle2 size={14} className={c.check} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-saey-blue to-saey-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-16">
          <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-saey-blue text-white font-semibold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5">
            {t.services.cta} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
