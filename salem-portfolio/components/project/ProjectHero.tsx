'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Building2, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ProjectHeroProps {
  project: {
    title: string; title_ar?: string;
    subtitle: string; subtitle_ar?: string;
    industry: string; industry_ar?: string;
    duration: string; duration_ar?: string;
    year: string; color: string; tags: string[]; tags_ar?: string[];
    results: { reach: string; impressions: string; roas: string; followers: string; };
  };
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const { t, lang, isRTL } = useI18n();
  const title = lang === 'ar' ? project.title_ar || project.title : project.title;
  const subtitle = lang === 'ar' ? project.subtitle_ar || project.subtitle : project.subtitle;
  const industry = lang === 'ar' ? project.industry_ar || project.industry : project.industry;
  const duration = lang === 'ar' ? project.duration_ar || project.duration : project.duration;
  const tags = lang === 'ar' ? project.tags_ar || project.tags : project.tags;

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-black pt-32 pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: project.color }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium group">
            {isRTL
              ? <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />{t.project.backToProjects}</>
              : <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{t.project.backToProjects}</>
            }
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/80 border border-white/15 bg-white/5 backdrop-blur-sm">{tag}</span>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">{title}</h1>
              <p className="text-xl md:text-2xl font-medium mt-4" style={{ color: project.color }}>{subtitle}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-wrap gap-6">
              {[
                { icon: Building2, label: t.project.labels.industry, value: industry },
                { icon: Clock, label: t.project.labels.duration, value: duration },
                { icon: Calendar, label: t.project.labels.year, value: project.year },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon size={16} className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 leading-none">{item.label}</p>
                    <p className="text-sm text-white font-semibold mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="grid grid-cols-2 gap-4">
            {[
              { value: project.results.reach, label: t.project.resultMetrics.reach },
              { value: project.results.impressions, label: t.project.resultMetrics.impressions },
              { value: project.results.roas, label: t.project.resultMetrics.roas },
              { value: project.results.followers, label: t.project.resultMetrics.followers },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center backdrop-blur-sm">
                <div className="text-3xl font-black leading-none" style={{ color: project.color }}>{stat.value}</div>
                <div className="text-xs text-gray-400 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
