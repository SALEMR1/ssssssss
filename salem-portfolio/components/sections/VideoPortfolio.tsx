'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import VideoModal from '@/components/ui/VideoModal';
import { Play, Tag } from 'lucide-react';
import videosData from '@/data/videos.json';
import { useI18n } from '@/lib/i18n/context';

interface VideoEntry {
  id: number;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  category: string;
  category_ar?: string;
  duration: string;
  embedCode?: string;
}

const categoryColors: Record<string, string> = {
  Reels: 'from-pink-600 to-rose-500',
  Ads: 'from-violet-600 to-purple-500',
  Promotional: 'from-amber-600 to-orange-500',
  Educational: 'from-emerald-600 to-teal-500',
};

// map Arabic category back to English key for color lookup
const arToEn: Record<string, string> = {
  'ريلز': 'Reels',
  'إعلانات': 'Ads',
  'ترويجية': 'Promotional',
  'تعليمية': 'Educational',
};

export default function VideoPortfolio() {
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState(t.videos.categories[0]);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; embedCode?: string } | null>(null);

  // Direct map: both EN and AR display labels → English data key
  const labelToEnKey: Record<string, string> = {
    'All': 'All', 'الكل': 'All',
    'Reels': 'Reels', 'ريلز': 'Reels',
    'Ads': 'Ads', 'إعلانات': 'Ads',
    'Promotional': 'Promotional', 'ترويجية': 'Promotional',
    'Educational': 'Educational', 'تعليمية': 'Educational',
  };

  const activeEnCat = labelToEnKey[activeCategory] ?? 'All';

  // Only show videos that have a real embed code (skip placeholder/dummy entries)
  const realVideos = (videosData as VideoEntry[]).filter((v) => !!v.embedCode);

  const filtered = activeEnCat === 'All'
    ? realVideos
    : realVideos.filter((v) => v.category === activeEnCat);

  return (
    <section id="videos" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.videos.badge} title={t.videos.title} highlight={t.videos.highlight} subtitle={t.videos.subtitle} />

        {/* Filter — only show buttons for categories with real videos */}
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {t.videos.categories.filter((cat, i) => {
            if (i === 0) return true; // Always show "All"
            const enKey = labelToEnKey[cat] ?? cat;
            return realVideos.some((v) => v.category === enKey);
          }).map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}>{cat}</button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div variants={staggerContainer(0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => {
            const gradient = categoryColors[video.category] || 'from-violet-600 to-pink-500';
            const displayTitle = lang === 'ar' ? video.title_ar || video.title : video.title;
            const displayCat = lang === 'ar' ? video.category_ar || video.category : video.category;
            const displayDesc = lang === 'ar' ? video.description_ar || video.description : video.description;
            return (
              <motion.div key={video.id} variants={fadeIn('up', 0)} whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden border border-white/8 bg-[#0d0d0d] hover:border-white/20 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10"
                onClick={() => setSelectedVideo({ title: displayTitle, embedCode: video.embedCode })}>
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.1 }} className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300`}>
                      <Play size={24} className="text-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/80 text-white text-xs font-medium backdrop-blur-sm">{video.duration}</div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-white font-bold group-hover:text-violet-300 transition-colors">{displayTitle}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{displayDesc}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Tag size={12} className="text-violet-400" />
                    <span className={`text-xs font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{displayCat}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <VideoModal isOpen={selectedVideo !== null} onClose={() => setSelectedVideo(null)} title={selectedVideo?.title || ''} embedCode={selectedVideo?.embedCode} />
    </section>
  );
}
