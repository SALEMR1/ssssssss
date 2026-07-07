'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import Lightbox from '@/components/ui/Lightbox';
import { ZoomIn } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  category_ar?: string;
  alt: string;
}

interface Props {
  project: {
    gallery: GalleryItem[];
    color: string;
    title: string;
    title_ar?: string;
  };
}

// Detect if src is a real remote image (http/https) or a placeholder path
function isRealImage(src: string) {
  return src.startsWith('http://') || src.startsWith('https://');
}

export default function ProjectGallery({ project }: Props) {
  const { t, lang } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeEn, setActiveEn] = useState('All');

  const projectTitle = lang === 'ar' ? project.title_ar || project.title : project.title;

  // Only keep real remote images (http/https), skip local/placeholder paths
  const realGallery = project.gallery.filter((g) => isRealImage(g.src));

  const enCats = ['All', ...Array.from(new Set(realGallery.map((g) => g.category)))];

  const filtered =
    activeEn === 'All'
      ? realGallery
      : realGallery.filter((g) => g.category === activeEn);

  const lightboxItems = filtered.map((item) => ({
    src: item.src,
    alt: item.alt,
    category: lang === 'ar' ? item.category_ar || item.category : item.category,
  }));

  // Don't render gallery section if there are no real images
  if (realGallery.length === 0) return null;

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeIn('up', 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
            style={{
              color: project.color,
              borderColor: `${project.color}40`,
              backgroundColor: `${project.color}10`,
            }}
          >
            {t.project.gallery.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            {t.project.gallery.title}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
              {t.project.gallery.highlight}
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {t.project.gallery.subtitle} {projectTitle}.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {enCats.map((cat, i) => {
            const arLabel =
              i === 0
                ? 'الكل'
                : project.gallery.find((g) => g.category === cat)?.category_ar || cat;
            const label = lang === 'ar' ? arLabel : cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveEn(cat)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={
                  activeEn === cat
                    ? { backgroundColor: project.color, color: '#fff' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#9ca3af',
                      }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/8 hover:border-white/25 transition-all duration-300 hover:shadow-2xl break-inside-avoid mb-4"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover block"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm"
                    style={{
                      backgroundColor: `${project.color}40`,
                      border: `1px solid ${project.color}50`,
                      color: '#fff',
                    }}
                  >
                    {lang === 'ar' ? item.category_ar || item.category : item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filtered.length)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
          }
        />
      </div>
    </section>
  );
}
