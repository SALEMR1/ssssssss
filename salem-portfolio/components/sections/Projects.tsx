'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { ArrowRight, TrendingUp, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const projectMeta = [
  { accent: 'text-saey-blue',   metricBg: 'bg-blue-50',   metricBorder: 'border-blue-100',   number: '01', dot: 'bg-saey-blue' },
  { accent: 'text-saey-violet', metricBg: 'bg-violet-50', metricBorder: 'border-violet-100', number: '02', dot: 'bg-saey-violet' },
  { accent: 'text-blue-600',    metricBg: 'bg-blue-50',   metricBorder: 'border-blue-100',   number: '03', dot: 'bg-blue-600' },
  { accent: 'text-indigo-600',  metricBg: 'bg-indigo-50', metricBorder: 'border-indigo-100', number: '04', dot: 'bg-indigo-600' },
  { accent: 'text-amber-600',   metricBg: 'bg-amber-50',  metricBorder: 'border-amber-100',  number: '05', dot: 'bg-amber-500' },
];

export default function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.projects.badge} title={t.projects.title} highlight={t.projects.highlight} subtitle={t.projects.subtitle} />

        <motion.div variants={staggerContainer(0.12, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="space-y-8">
          {t.projects.items.map((project, index) => {
            const meta = projectMeta[index] || projectMeta[0];
            return (
              <motion.div key={project.id} variants={fadeIn('up', 0)} transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden border border-blue-100 bg-white hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/60 transition-all duration-500">
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${meta.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
                    {/* Left */}
                    <div className="lg:col-span-3 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md shadow-blue-100 ring-2 ring-blue-100 flex-shrink-0">
                          {project.id === 'esco' ? (
                            <Image src="https://ik.imagekit.io/effect/effect/ESCO/%D8%A5%D8%B3%D9%83%D9%88%20%D9%84%D9%84%D8%B2%D9%8A%D9%88%D8%AA/logo.jpeg" alt="ESCO Logo" fill sizes="64px" className="object-cover" />
                          ) : project.id === 'ttc' ? (
                            <Image src="https://ik.imagekit.io/effect/effect/TTC/TTC/WQF.jpg?updatedAt=1781366001803" alt="TTC Logo" fill sizes="64px" className="object-cover" />
                          ) : project.id === 'vako' ? (
                            <Image src="https://ik.imagekit.io/effect/effect/vaco/logo.jpg" alt="VAKO Logo" fill sizes="64px" className="object-cover" />
                          ) : project.id === 'dr-salman' ? (
                            <Image src="https://ik.imagekit.io/salem/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%20%D8%B3%D9%84%D9%85%D8%A7%D9%86%20/dr.jpg" alt="Dr. Salman Logo" fill sizes="64px" className="object-cover" />
                          ) : project.id === 'dice' ? (
                            <Image src="https://ik.imagekit.io/salem/%D8%AF%D8%A7%D9%8A%D8%B3%20%D8%AF%D9%85%D9%86%D9%87%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D8%B5%D9%84%D9%8A/%D9%84%D9%88%D8%AC%D9%88%20%D8%AF%D8%A7%D9%8A%D8%B3.jpg?updatedAt=1785232667246" alt="Dice Logo" fill sizes="64px" className="object-cover" />
                          ) : (
                            <Image src="/logo.png" alt="Salem Rizk" fill sizes="64px" className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-black tracking-widest ${meta.accent}`}>{meta.number}</span>
                            <span className="text-xs text-saey-muted font-medium tracking-widest uppercase">{project.industry}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-saey-navy leading-tight">{project.title}</h3>
                          <p className="text-saey-muted font-medium mt-1">{project.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-saey-muted bg-saey-gray border border-blue-100">{tag}</span>
                        ))}
                      </div>

                      <Link href={`/projects/${project.id}`} id={`project-${project.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-saey-blue text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5">
                        {t.projects.cta_label} <ExternalLink size={16} />
                      </Link>
                    </div>

                    {/* Right: metrics */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[project.metric1, project.metric2, project.metric3].map((metric) => (
                          <div key={metric.label} className={`rounded-2xl ${meta.metricBg} border ${meta.metricBorder} p-3 text-center min-w-0`} data-metric={metric.value}>
                            <div className={`text-sm font-black ${meta.accent} leading-tight mb-1 break-words hyphens-auto`}>{metric.value}</div>
                            <div className="text-[10px] text-saey-muted leading-tight">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className={`mt-2 rounded-2xl ${meta.metricBg} border ${meta.metricBorder} h-20 sm:h-24 flex items-center justify-center`}>
                        <TrendingUp size={24} className={meta.accent} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-16">
          <p className="text-saey-muted mb-6">{t.projects.cta_more}</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-saey-blue text-saey-blue font-semibold transition-all duration-300 hover:bg-saey-blue hover:text-white hover:shadow-xl hover:shadow-blue-200">
            {t.projects.cta_discuss} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
