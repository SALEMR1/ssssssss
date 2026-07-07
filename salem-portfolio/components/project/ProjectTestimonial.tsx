'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Props {
  project: {
    testimonial: { quote: string; quote_ar?: string; name: string; role: string; role_ar?: string; avatar?: string; };
    color: string; title: string; title_ar?: string;
  };
}

export default function ProjectTestimonial({ project }: Props) {
  const { lang } = useI18n();
  const { testimonial } = project;
  const quote = lang === 'ar' ? testimonial.quote_ar || testimonial.quote : testimonial.quote;
  const role = lang === 'ar' ? testimonial.role_ar || testimonial.role : testimonial.role;
  const title = lang === 'ar' ? project.title_ar || project.title : project.title;

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border p-10 md:p-14" style={{ borderColor: `${project.color}25` }}>
          <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at top right, ${project.color}, transparent 60%)` }} />
          <div className="absolute top-8 right-8 opacity-[0.06]"><Quote size={100} className="text-white" /></div>
          <div className="relative space-y-8">
            <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-amber-400 fill-amber-400" />)}</div>
            <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium">"{quote}"</blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-white/8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}80)` }}>
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{role}</p>
              </div>
              <div className="ml-auto">
                <span className="px-4 py-2 rounded-xl text-xs font-semibold border" style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
                  {title}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
