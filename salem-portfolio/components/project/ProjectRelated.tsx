'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface RelatedProject {
  slug: string; title: string; title_ar?: string; subtitle: string; subtitle_ar?: string;
  industry: string; industry_ar?: string; color: string; tags: string[]; tags_ar?: string[];
  results: { reach: string; roas: string; };
}

interface Props { projects: RelatedProject[]; }

export default function ProjectRelated({ projects }: Props) {
  const { t, lang } = useI18n();
  if (!projects.length) return null;
  return (
    <section className="py-24 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">{t.project.related.title}</h2>
            <p className="text-gray-400 mt-2">{t.project.related.subtitle}</p>
          </div>
          <Link href="/#projects" className="hidden sm:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 group">
            {t.project.related.viewAll}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const title = lang === 'ar' ? project.title_ar || project.title : project.title;
            const subtitle = lang === 'ar' ? project.subtitle_ar || project.subtitle : project.subtitle;
            const industry = lang === 'ar' ? project.industry_ar || project.industry : project.industry;
            const tags = lang === 'ar' ? project.tags_ar || project.tags : project.tags;
            return (
              <motion.div key={project.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                className="group relative rounded-3xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-8 hover:border-white/15 transition-all duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500" style={{ backgroundColor: project.color }} />
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">{industry}</span>
                    <div className="flex gap-2 text-xs font-semibold" style={{ color: project.color }}>
                      <span>{project.results.reach}</span><span>·</span><span>{project.results.roas} ROAS</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{title}</h3>
                    <p className="text-gray-400 mt-1">{subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-gray-400">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                    {t.project.related.viewCase} <ExternalLink size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1">
            {t.project.related.cta} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
