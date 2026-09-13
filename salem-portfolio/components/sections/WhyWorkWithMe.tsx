'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { Lightbulb, BarChart3, Clock, Eye, Database, Award } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const reasonIcons = [Lightbulb, BarChart3, Clock, Eye, Database, Award];
const reasonColors = ['blue', 'violet', 'blue', 'violet', 'blue', 'violet'];

const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
  blue: { gradient: 'from-saey-blue to-saey-blue', bg: 'from-saey-blue/15 to-transparent', border: 'border-saey-blue/20', text: 'text-saey-blue' },
  violet: { gradient: 'from-saey-violet to-saey-violet', bg: 'from-saey-violet/15 to-transparent', border: 'border-saey-violet/20', text: 'text-saey-violet' },
};

export default function WhyWorkWithMe() {
  const { t } = useI18n();
  return (
    <section id="why" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.why.badge} title={t.why.title} highlight={t.why.highlight} subtitle={t.why.subtitle} light />
        <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.why.reasons.map((reason, i) => {
            const colors = colorMap[reasonColors[i]];
            const Icon = reasonIcons[i];
            return (
              <motion.div key={reason.title} variants={fadeIn('up', 0)} whileHover={{ y: -6 }}
                className={`group relative rounded-3xl bg-white border border-blue-100 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/60 hover:border-blue-200`}>
                <div className="relative space-y-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[reasonColors[i]].gradient} flex items-center justify-center shadow-md shadow-saey-blue/20`}>
                    <Icon size={24} className={colors.text} />
                  </div>
                  <h3 className="text-xl font-bold text-saey-navy">{reason.title}</h3>
                  <p className="text-saey-muted leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {/* CTA banner */}
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-violet-50 to-blue-50" />
          <div className="relative border border-blue-200 rounded-3xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-black text-saey-navy mb-4">
              {t.why.cta_title}{' '}
              <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">{t.why.cta_highlight}</span>
            </h3>
            <p className="text-saey-muted text-lg mb-8 max-w-xl mx-auto">{t.why.cta_sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="px-8 py-4 rounded-2xl bg-saey-blue text-white font-semibold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-1">{t.why.cta_work}</Link>
              <Link href="/#projects" className="px-8 py-4 rounded-2xl bg-white border-2 border-blue-200 text-saey-navy font-semibold hover:border-saey-blue transition-all duration-300">{t.why.cta_portfolio}</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
