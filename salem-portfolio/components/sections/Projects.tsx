'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { ArrowRight, TrendingUp, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const projectMeta = [
  { color: 'from-amber-600/20 via-orange-600/10 to-transparent', gradient: 'from-amber-500 to-orange-500', number: '01' },
  { color: 'from-violet-600/20 via-purple-600/10 to-transparent', gradient: 'from-violet-500 to-purple-500', number: '02' },
  { color: 'from-emerald-600/20 via-teal-600/10 to-transparent', gradient: 'from-emerald-500 to-teal-500', number: '03' },
];

export default function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.projects.badge} title={t.projects.title} highlight={t.projects.highlight} subtitle={t.projects.subtitle} />

        <motion.div variants={staggerContainer(0.12, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="space-y-8">
          {t.projects.items.map((project, index) => {
            const meta = projectMeta[index] || projectMeta[0];
            return (
              <motion.div key={project.id} variants={fadeIn('up', 0)} transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#0d0d0d] to-[#070707] hover:border-white/15 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative p-5 sm:p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
                    {/* Left */}
                    <div className="lg:col-span-3 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-violet-500/25 flex-shrink-0">
                          {project.id === 'esco' ? (
                            <img src="https://ik.imagekit.io/effect/effect/ESCO/%D8%A5%D8%B3%D9%83%D9%88%20%D9%84%D9%84%D8%B2%D9%8A%D9%88%D8%AA/logo.jpeg" alt="ESCO Logo" className="w-full h-full object-cover" />
                          ) : project.id === 'ttc' ? (
                            <img src="https://ik.imagekit.io/effect/effect/TTC/TTC/WQF.jpg?updatedAt=1781366001803" alt="TTC Logo" className="w-full h-full object-cover" />
                          ) : project.id === 'vako' ? (
                            <img src="https://ik.imagekit.io/effect/effect/vaco/logo.jpg" alt="VAKO Logo" className="w-full h-full object-cover" />
                          ) : (
                            <img src="https://ik.imagekit.io/effect/b_%D8%A7%D9%86%D8%A7_%D8%B9%D8%A7%D9%8A%D8%B2_%D8%A7%D9%84%D8%B1%D8%A7%D8%B3_%D8%A8%D8%B3_%D8%B2%D9%8A.png?updatedAt=1781361466755" alt="Salem Rizk" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>{meta.number}</span>
                            <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{project.industry}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">{project.title}</h3>
                          <p className="text-gray-400 font-medium mt-1">{project.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-white/5 border border-white/8">{tag}</span>
                        ))}
                      </div>
                      <Link href={`/projects/${project.id}`} id={`project-${project.id}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${meta.gradient} text-white font-semibold text-sm transition-all duration-300`}>
                        {t.projects.cta_label} <ExternalLink size={16} />
                      </Link>
                    </div>
                    {/* Right: metrics */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {[project.metric1, project.metric2, project.metric3].map((metric) => (
                          <div key={metric.label} className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-4 text-center group-hover:bg-white/8 transition-colors duration-300">
                            <div className={`text-2xl sm:text-xl font-black bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent leading-none mb-2`}>{metric.value}</div>
                            <div className="text-xs text-gray-500 leading-tight">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 rounded-2xl bg-white/3 border border-white/8 h-24 sm:h-32 flex items-center justify-center">
                        <TrendingUp size={28} className={`mx-auto bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent sm:w-8 sm:h-8`} style={{ WebkitTextFillColor: 'transparent' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-16">
          <p className="text-gray-500 mb-6">{t.projects.cta_more}</p>
          <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold transition-all duration-300">
            {t.projects.cta_discuss} <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
