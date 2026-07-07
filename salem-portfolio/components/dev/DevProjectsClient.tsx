'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle2, ArrowRight, Code2, Sparkles, ArrowLeft, Layers, Monitor, Server, Smartphone } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import devProjectsData from '@/data/dev-projects.json';

/* ─── Category map ─── */
const enCatMap: Record<string, string> = {
  'الكل': 'all', 'All': 'all',
  'فول ستاك': 'fullstack', 'Full Stack': 'fullstack',
  'فرونت إند': 'frontend', 'Frontend': 'frontend',
  'باك إند': 'backend', 'Backend': 'backend',
  'موبايل': 'mobile', 'Mobile': 'mobile',
};

const categoryIcons: Record<string, React.ElementType> = {
  all: Layers,
  fullstack: Code2,
  frontend: Monitor,
  backend: Server,
  mobile: Smartphone,
};

/* ─── Stagger helpers ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function DevProjectsClient() {
  const { t, lang, isRTL } = useI18n();
  const td = t.devProjects;
  const [activeFilter, setActiveFilter] = useState(td.filters[0]);

  const activeEnCat = enCatMap[activeFilter] ?? 'all';
  const filtered = activeEnCat === 'all'
    ? devProjectsData
    : devProjectsData.filter((p) => p.category === activeEnCat);

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* ─── Hero ─── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group">
              {isRTL
                ? <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</>
                : <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</>
              }
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Code2 size={14} className="text-indigo-400" />
              {td.badge}
              <Sparkles size={14} className="text-indigo-400" />
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
              {td.title}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">{td.highlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              {td.subtitle}
            </motion.p>

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-6">
              {[
                { value: '9', label: lang === 'ar' ? 'مشاريع' : 'Projects' },
                { value: '5+', label: lang === 'ar' ? 'تقنيات' : 'Tech Stacks' },
                { value: '100%', label: lang === 'ar' ? 'كود نظيف' : 'Clean Code' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-gray-500 text-xs tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <section className="sticky top-20 z-30 bg-[#080808]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center">
            {td.filters.map((filter: string) => {
              const enKey = enCatMap[filter] ?? 'all';
              const Icon = categoryIcons[enKey] || Layers;
              const isActive = activeFilter === filter;
              return (
                <button key={filter} onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/8 hover:border-white/20'
                  }`}>
                  <Icon size={14} />
                  {filter}
                  {isActive && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-xs font-black">
                      {filtered.length}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Projects Grid ─── */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} variants={container} initial="hidden" animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filtered.map((project) => {
                const title = (lang === 'ar' ? project.title_ar : project.title) ?? project.title;
                const description = (lang === 'ar' ? project.description_ar : project.description) ?? project.description;
                const features = (lang === 'ar' ? project.features_ar : project.features) ?? project.features;
                const category = (lang === 'ar' ? project.category_ar : project.category) ?? project.category;
                const status = (lang === 'ar' ? project.status_ar : project.status) ?? project.status;
                const isLive = project.status === 'Live';

                return (
                  <motion.div key={project.id} variants={item} layout
                    className="group relative rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#090909] border border-white/8 overflow-hidden hover:border-white/15 transition-all duration-500 hover:shadow-2xl flex flex-col"
                    style={{ ['--project-color' as string]: project.color }}>

                    {/* Top color bar */}
                    <div className="h-1 w-full rounded-t-3xl opacity-80" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />

                    {/* Project Image */}
                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}25 0%, ${project.color}10 50%, transparent 100%)` }} />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Main icon */}
                          <div className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2"
                            style={{ 
                              background: `linear-gradient(135deg, ${project.color}30, ${project.color}15)`,
                              borderColor: `${project.color}40`
                            }}>
                            <Code2 size={36} style={{ color: project.color }} />
                          </div>
                          {/* Floating elements */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-lg opacity-60"
                            style={{ background: `${project.color}40` }} />
                          <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full opacity-40"
                            style={{ background: `${project.color}30` }} />
                        </div>
                      </div>
                      {/* Glowing effect */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20"
                        style={{ backgroundColor: project.color }} />
                      {/* Status badge */}
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border ${
                        isLive
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        {status}
                      </div>
                      {/* Year */}
                      <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} text-xs text-gray-600 font-medium`}>{project.year}</div>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1 gap-5">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-lg"
                            style={{ color: project.color, backgroundColor: `${project.color}12`, border: `1px solid ${project.color}25` }}>
                            {category}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white leading-tight group-hover:text-white transition-colors">{title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{description}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-gray-400 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{td.featuresTitle}</p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {features.map((feat) => (
                            <div key={feat} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                              <span className="text-gray-300 text-xs leading-relaxed">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA buttons */}
                      <div className={`mt-auto pt-2`}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full"
                          style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`, boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 25px ${project.color}35`)}
                          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`)}>
                          <ExternalLink size={14} />
                          {td.liveBtn}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-indigo-500/20 p-12 md:p-16 text-center">
            {/* BG */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-violet-950/30 to-[#080808]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/15 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles size={14} className="text-indigo-400" />
                {lang === 'ar' ? 'تطوير ويب احترافي' : 'Professional Web Development'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                {td.ctaTitle}
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">{td.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
                  {td.ctaBtn}
                  <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  {lang === 'ar' ? 'عرض باقي الأعمال' : 'View All Work'}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
