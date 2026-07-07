'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import Lightbox from '@/components/ui/Lightbox';
import { Filter } from 'lucide-react';
import galleryData from '@/data/gallery.json';
import { useI18n } from '@/lib/i18n/context';

export default function DesignGallery() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState(t.gallery.categories[0]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const enCategories = ['All', 'Posts', 'Carousels', 'Ads', 'Stories', 'Branding'];
  const activeCatIndex = t.gallery.categories.indexOf(activeCategory);
  const activeEnCat = enCategories[activeCatIndex] ?? 'All';
  const filteredItems =
    activeEnCat === 'All'
      ? galleryData
      : galleryData.filter((item) => item.category === activeEnCat);

  const lightboxItems = filteredItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    category: item.category,
  }));

  return (
    <section id="gallery" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          badge={t.gallery.badge}
          title={t.gallery.title}
          highlight={t.gallery.highlight}
          subtitle={t.gallery.subtitle}
        />

        {/* Filter */}
        <motion.div
          variants={fadeIn('up', 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {t.gallery.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {i === 0 && <Filter size={14} />}
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid — uses next/image for optimization */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0d0d0d] border border-white/8 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 ${
                  index % 7 === 0 || index % 7 === 4 ? 'row-span-2' : ''
                }`}
                onClick={() => setLightboxIndex(index)}
              >
                <div
                  className={`relative w-full ${
                    index % 7 === 0 || index % 7 === 4 ? 'h-72' : 'h-48'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    priority={index < 4}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-black/80 text-gray-300 backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Lightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
          onPrev={() =>
            setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
          }
        />
      </div>
    </section>
  );
}
