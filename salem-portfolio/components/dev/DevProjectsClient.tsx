'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle2, ArrowRight, Code2, Sparkles, ArrowLeft, Layers, Monitor, Server, Smartphone, Images, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import Lightbox from '@/components/ui/Lightbox';
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

interface DevProject {
  id: number;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  image?: string;
  images?: string[];
  color: string;
  tags: string[];
  category: string;
  category_ar?: string;
  liveUrl?: string;
  isOffline?: boolean;
  year: string;
  status: string;
  status_ar?: string;
  features: string[];
  features_ar?: string[];
}

function DevProjectCard({
  project,
  lang,
  isRTL,
  td,
  onOpenGallery,
}: {
  project: DevProject;
  lang: string;
  isRTL: boolean;
  td: ReturnType<typeof useI18n>['t']['devProjects'];
  onOpenGallery: (images: string[], initialIndex: number, title: string) => void;
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const images = project.images && project.images.length > 0
    ? project.images
    : project.image
    ? [project.image]
    : [];

  const title = (lang === 'ar' ? project.title_ar : project.title) ?? project.title;
  const description = (lang === 'ar' ? project.description_ar : project.description) ?? project.description;
  const features = (lang === 'ar' ? project.features_ar : project.features) ?? project.features;
  const category = (lang === 'ar' ? project.category_ar : project.category) ?? project.category;
  const status = (lang === 'ar' ? project.status_ar : project.status) ?? project.status;
  const isLive = project.status === 'Live';
  const hasMultipleImages = images.length > 1;
  const currentImg = images[selectedImgIndex] || images[0];

  return (
    <motion.div variants={item} layout
      className="group relative rounded-3xl bg-gradient-to-br from-[#181818] to-[#111111] border border-white/8 overflow-hidden hover:border-amber-500/20 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/20 flex flex-col"
      style={{ ['--project-color' as string]: project.color }}>

      {/* Top color bar */}
      <div className="h-1 w-full rounded-t-3xl opacity-80" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }} />

      {/* Project Image & Organized Gallery */}
      <div className="relative overflow-hidden flex-shrink-0 bg-[#0D0D0D]">
        {hasMultipleImages ? (
          <div
            className="relative h-60 w-full overflow-hidden cursor-pointer group/img"
            onClick={() => onOpenGallery(images, selectedImgIndex, title)}
          >
            <Image
              src={currentImg}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/20 to-transparent" />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40">
              <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                <Maximize2 size={14} />
                {lang === 'ar' ? 'عرض بدقة كاملة' : 'View Full Screen'}
              </span>
            </div>

            {/* In-card next/prev buttons */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImgIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white pointer-events-auto transition-colors border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImgIndex((prev) => (prev + 1) % images.length);
                }}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white pointer-events-auto transition-colors border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative h-52 flex items-center justify-center">
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 50%, transparent 100%)` }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2"
                style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}15)`, borderColor: `${project.color}40` }}>
                <Code2 size={36} style={{ color: project.color }} />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-lg opacity-60" style={{ background: `${project.color}40` }} />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full opacity-40" style={{ background: `${project.color}30` }} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: project.color }} />
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
          project.isOffline
            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            : isLive
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
            : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${project.isOffline ? 'bg-amber-400' : isLive ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
          {project.isOffline ? (lang === 'ar' ? 'أوفلاين (Desktop)' : 'Offline ERP') : status}
        </div>

        {/* Year */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-10 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-xs text-gray-400 font-mono`}>
          {project.year}
        </div>

        {/* Organized Thumbnails Strip (all images together in one place) */}
        {hasMultipleImages && (
          <div className="px-4 py-2.5 bg-[#0E0E0E] border-t border-white/8 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Images size={14} className="text-amber-400" />
              <span>{lang === 'ar' ? `${images.length} شاشات من السيستم:` : `${images.length} System Screens:`}</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {images.map((imgUrl, i) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImgIndex(i);
                  }}
                  className={`relative w-11 h-7 rounded-md overflow-hidden border transition-all flex-shrink-0 ${
                    selectedImgIndex === i
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                      : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                  aria-label={`Select image ${i + 1}`}
                >
                  <Image src={imgUrl} alt={`Thumbnail ${i + 1}`} fill sizes="44px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
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
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
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
        <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-2">
          {hasMultipleImages ? (
            <button
              type="button"
              onClick={() => onOpenGallery(images, selectedImgIndex, title)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full"
              style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
            >
              <Images size={15} />
              {lang === 'ar' ? `استعراض شاشات السيستم (${images.length} صور)` : `View System Screens (${images.length} photos)`}
            </button>
          ) : project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full"
              style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}>
              <ExternalLink size={14} />
              {td.liveBtn}
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function DevProjectsClient() {
  const { t, lang, isRTL } = useI18n();
  const td = t.devProjects;

  const [lightboxItems, setLightboxItems] = useState<{ src: string; alt: string; category?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openGallery = (images: string[], initialIndex: number, projectTitle: string) => {
    setLightboxItems(images.map((src, i) => ({
      src,
      alt: `${projectTitle} - Screen ${i + 1}`,
      category: projectTitle,
    })));
    setLightboxIndex(initialIndex);
  };

  // Only show categories that have at least one project
  const availableFilters = td.filters.filter((filter: string) => {
    const enKey = enCatMap[filter] ?? 'all';
    if (enKey === 'all') return true;
    return (devProjectsData as DevProject[]).some((p) => p.category === enKey);
  });

  const [activeFilter, setActiveFilter] = useState(availableFilters[0] || td.filters[0]);

  const activeEnCat = enCatMap[activeFilter] ?? 'all';
  const filtered = activeEnCat === 'all'
    ? (devProjectsData as DevProject[])
    : (devProjectsData as DevProject[]).filter((p) => p.category === activeEnCat);

  return (
    <div className="min-h-screen bg-[#131313]">

      {/* ─── Hero ─── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#0A0A0A]">
        {/* Background glows — amber/orange oil palette */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-700/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-yellow-700/8 rounded-full blur-3xl pointer-events-none" />
        {/* Diagonal engine-grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.025)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        {/* Fade into body */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#131313] to-transparent pointer-events-none" />

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Code2 size={14} className="text-amber-400" />
              {td.badge}
              <Sparkles size={14} className="text-amber-400" />
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl md:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6">
              {td.title}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">{td.highlight}</span>
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
                  <div className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-gray-500 text-xs tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <section className="sticky top-20 z-30 bg-[#0F0F0F]/95 backdrop-blur-xl border-b border-amber-900/20 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 justify-center">
            {availableFilters.map((filter: string) => {
              const enKey = enCatMap[filter] ?? 'all';
              const Icon = categoryIcons[enKey] || Layers;
              const isActive = activeFilter === filter;
              return (
                <button key={filter} onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/8 hover:border-amber-500/30'
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
      <section className="py-16 pb-24 bg-[#131313]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} variants={container} initial="hidden" animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filtered.map((project) => (
                <DevProjectCard
                  key={project.id}
                  project={project as DevProject}
                  lang={lang}
                  isRTL={isRTL}
                  td={td}
                  onOpenGallery={openGallery}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="pb-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-amber-600/20 p-12 md:p-16 text-center">
            {/* BG — نفطي غامق */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-[#0D0D0D]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-600/12 rounded-full blur-3xl" />
            {/* خطوط معدنية خلفية */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles size={14} className="text-amber-400" />
                {lang === 'ar' ? 'تطوير ويب احترافي' : 'Professional Web Development'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                {td.ctaTitle}
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">{td.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1">
                  {td.ctaBtn}
                  <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <Link href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-amber-500/20 text-white font-semibold hover:bg-white/10 hover:border-amber-500/40 transition-all duration-300">
                  {lang === 'ar' ? 'عرض باقي الأعمال' : 'View All Work'}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
      />
    </div>
  );
}
