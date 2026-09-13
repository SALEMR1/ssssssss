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
    <section id="testimonials" className="relative py-32 bg-saey-gray overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(37,99,235,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.testimonials.badge} title={t.testimonials.title} highlight={t.testimonials.highlight} subtitle={t.testimonials.subtitle} light />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Featured */}
          <div className="lg:col-span-7">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
                  className="relative rounded-3xl bg-white border border-blue-100 p-10 overflow-hidden shadow-md shadow-blue-100/50">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-saey-blue/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-8 right-8 opacity-10"><Quote size={80} className="text-saey-blue" /></div>
                  <div className="flex gap-1 mb-6">{[...Array(currentT.rating)].map((_, i) => <Star key={i} size={18} className="text-saey-blue fill-saey-blue" />)}</div>
                  <blockquote className="text-xl text-saey-navy leading-relaxed font-medium mb-8 relative z-10">&ldquo;{quote}&rdquo;</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saey-blue to-saey-violet flex items-center justify-center font-bold text-white text-xl">
                      {currentT.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-saey-navy font-bold">{currentT.name}</p>
                      <p className="text-saey-muted text-sm">{role}</p>
                      <span className="text-saey-blue text-xs font-semibold mt-0.5">{currentT.company}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-100">
                    <span className="text-xs text-saey-muted font-medium">{t.testimonials.projectLabel}: </span>
                    <span className="text-xs text-saey-navy font-semibold">{project}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {testimonialsData.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-saey-blue scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-saey-muted hover:text-saey-navy hover:border-blue-300 transition-all duration-200"><ChevronLeft size={18} /></button>
                  <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-xl bg-saey-blue flex items-center justify-center text-white hover:bg-blue-700 transition-colors"><ChevronRight size={18} /></button>
                </div>
              </div>
            </div>
          </div>
          {/* List */}
          <div className="lg:col-span-5 space-y-3">
            {(testimonialsData as TestimonialEntry[]).map((t2, i) => (
              <motion.button key={t2.id} onClick={() => setCurrent(i)} variants={fadeIn('left', i * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`w-full text-left rounded-2xl p-4 border transition-all duration-300 ${i === current ? 'bg-blue-50 border-blue-300' : 'bg-white border-blue-100 hover:border-blue-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-sm ${i === current ? 'bg-gradient-to-br from-saey-blue to-saey-violet' : 'bg-saey-gray'}`}>{t2.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-saey-navy text-sm font-semibold truncate">{t2.name}</p>
                    <p className="text-saey-muted text-xs truncate">{t2.company}</p>
                  </div>
                  <div className="flex gap-0.5">{[...Array(t2.rating)].map((_, j) => <Star key={j} size={10} className="text-saey-blue fill-saey-blue" />)}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
