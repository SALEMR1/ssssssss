'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { Lightbulb, BarChart3, Clock, Eye, Database, Award } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const reasonIcons = [Lightbulb, BarChart3, Clock, Eye, Database, Award];
const reasonColors = ['amber', 'violet', 'emerald', 'rose', 'sky', 'indigo'];

const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
  amber: { gradient: 'from-amber-600 to-yellow-400', bg: 'from-amber-600/15 to-transparent', border: 'border-amber-500/20', text: 'text-amber-400' },
  violet: { gradient: 'from-violet-600 to-violet-400', bg: 'from-violet-600/15 to-transparent', border: 'border-violet-500/20', text: 'text-violet-400' },
  emerald: { gradient: 'from-emerald-600 to-teal-400', bg: 'from-emerald-600/15 to-transparent', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  rose: { gradient: 'from-rose-600 to-pink-400', bg: 'from-rose-600/15 to-transparent', border: 'border-rose-500/20', text: 'text-rose-400' },
  sky: { gradient: 'from-sky-600 to-blue-400', bg: 'from-sky-600/15 to-transparent', border: 'border-sky-500/20', text: 'text-sky-400' },
  indigo: { gradient: 'from-indigo-600 to-violet-400', bg: 'from-indigo-600/15 to-transparent', border: 'border-indigo-500/20', text: 'text-indigo-400' },
};

export default function WhyWorkWithMe() {
  const { t } = useI18n();
  return (
    <section id="why" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.why.badge} title={t.why.title} highlight={t.why.highlight} subtitle={t.why.subtitle} />
        <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.why.reasons.map((reason, i) => {
            const colors = colorMap[reasonColors[i]];
            const Icon = reasonIcons[i];
            return (
              <motion.div key={reason.title} variants={fadeIn('up', 0)} whileHover={{ y: -6 }}
                className={`group relative rounded-3xl overflow-hidden border ${colors.border} bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-8 transition-all duration-500 hover:shadow-xl`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative space-y-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className={colors.text} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {/* CTA banner */}
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-pink-600/15 to-violet-600/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] to-[#080808]" style={{ mixBlendMode: 'multiply' }} />
          <div className="relative border border-violet-500/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t.why.cta_title}{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{t.why.cta_highlight}</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">{t.why.cta_sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1">{t.why.cta_work}</a>
              <a href="/#projects" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300">{t.why.cta_portfolio}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
