'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeIn } from '@/lib/animations';
import testimonialsData from '@/data/testimonials.json';
import { useI18n } from '@/lib/i18n/context';

interface TestimonialEntry {
  id: number;
  name: string;
  role: string;
  role_ar?: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  quote_ar?: string;
  project: string;
  project_ar?: string;
}

export default function Testimonials() {
  const { t, lang } = useI18n();
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((p) => (p - 1 + testimonialsData.length) % testimonialsData.length);
  const next = () => setCurrent((p) => (p + 1) % testimonialsData.length);

  const currentT = (testimonialsData as TestimonialEntry[])[current];
  const quote = lang === 'ar' ? currentT.quote_ar || currentT.quote : currentT.quote;
  const role = lang === 'ar' ? currentT.role_ar || currentT.role : currentT.role;
  const project = lang === 'ar' ? currentT.project_ar || currentT.project : currentT.project;

  return (
    <section id="testimonials" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(124,58,237,0.08)_0%,_transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.testimonials.badge} title={t.testimonials.title} highlight={t.testimonials.highlight} subtitle={t.testimonials.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Featured */}
          <div className="lg:col-span-7">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
                  className="relative rounded-3xl bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/10 p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-8 right-8 opacity-10"><Quote size={80} className="text-violet-400" /></div>
                  <div className="flex gap-1 mb-6">{[...Array(currentT.rating)].map((_, i) => <Star key={i} size={18} className="text-amber-400 fill-amber-400" />)}</div>
                  <blockquote className="text-xl text-gray-200 leading-relaxed font-medium mb-8 relative z-10">"{quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center font-bold text-white text-xl">
                      {currentT.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold">{currentT.name}</p>
                      <p className="text-gray-400 text-sm">{role}</p>
                      <p className="text-violet-400 text-xs font-semibold mt-0.5">{currentT.company}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/8">
                    <span className="text-xs text-gray-500 font-medium">{t.testimonials.projectLabel}: </span>
                    <span className="text-xs text-gray-300 font-semibold">{project}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {testimonialsData.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-gradient-to-r from-violet-500 to-pink-500' : 'w-3 bg-white/20'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"><ChevronLeft size={18} /></button>
                  <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center text-white"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
          {/* List */}
          <div className="lg:col-span-5 space-y-3">
            {(testimonialsData as TestimonialEntry[]).map((t2, i) => (
              <motion.button key={t2.id} onClick={() => setCurrent(i)} variants={fadeIn('left', i * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`w-full text-left rounded-2xl p-4 border transition-all duration-300 ${i === current ? 'bg-violet-600/10 border-violet-500/30' : 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-sm ${i === current ? 'bg-gradient-to-br from-violet-600 to-pink-600' : 'bg-white/10'}`}>{t2.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{t2.name}</p>
                    <p className="text-gray-500 text-xs truncate">{t2.company}</p>
                  </div>
                  <div className="flex gap-0.5">{[...Array(t2.rating)].map((_, j) => <Star key={j} size={10} className="text-amber-400 fill-amber-400" />)}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
