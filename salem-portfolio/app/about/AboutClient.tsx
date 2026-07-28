'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { ArrowLeft, ArrowRight, GraduationCap, Briefcase, Award, MonitorPlay, Code, BookOpen } from 'lucide-react';
import Link from 'next/link';

const IMAGE_MAIN = 'https://ik.imagekit.io/effect/gemini-3-pro-image-preview_b_%D8%AE%D9%84%D9%8A_%D8%A7%D9%84%D8%B4%D8%AE%D8%B5_%D8%A7%D9%84%D9%8A_%D8%B9%D9%84%D9%8A_%D8%A7%D9%84%20(1)%20(1).png';
const IMAGE_WORK = 'https://ik.imagekit.io/effect/SDR.png';
const IMAGE_DAYES = 'https://ik.imagekit.io/salem/%D8%AF%D8%A7%D9%8A%D8%B3%20%D8%AF%D9%85%D9%86%D9%87%D9%88%D8%B1%20%D8%A7%D9%84%D8%A7%D8%B5%D9%84%D9%8A/w.jpg';

export default function AboutClient() {
  const { t, isRTL } = useI18n();
  const data = t.aboutPage;

  const timeline = [
    { year: 'قبل 2020 / Before 2020', icon: Award,        content: data.bio1 },
    { year: '2020',                    icon: MonitorPlay,   content: data.bio2 },
    { year: '2024 – 2025',             icon: Briefcase,     content: data.bio3 },
    { year: '2025 – Present',          icon: GraduationCap, content: data.bio4 },
    { year: '2025',                    icon: Code,          content: data.bio5 },
    { year: 'التدريس / Teaching',       icon: BookOpen,      content: data.bio6 },
  ];

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20 overflow-hidden relative">
      {/* Subtle bg glow — desktop only */}
      <div className="hidden md:block absolute top-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
          >
            {isRTL
              ? <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />{t.nav.home}</>
              : <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{t.nav.home}</>
            }
          </Link>
        </motion.div>

        {/* ── Top section: images + heading ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Images column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {/* صورة دايس — أولاً */}
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0d0d]">
              <Image
                src={IMAGE_DAYES}
                alt="سالم رزق — إدارة تسويق دايس دمنهور"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* الصورتين الباقيتين جنب بعض */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-[#0d0d0d]">
                <Image
                  src={IMAGE_MAIN}
                  alt="سالم رزق — مدير تسويق رقمي"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain"
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-[#0d0d0d]">
                <Image
                  src={IMAGE_WORK}
                  alt="سالم رزق في العمل — تصميم ومونتاج"
                  width={400}
                  height={500}
                  className="w-full h-auto object-contain"
                  unoptimized
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Heading + timeline column */}
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            <motion.div variants={fadeIn('up', 0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {data.title}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {data.heading}
              </h1>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', index * 0.07)}
                  className="flex gap-5"
                >
                  {/* Icon + connector */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon size={18} className="text-violet-400" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent min-h-[32px]" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pb-6">
                    <span className="text-xs font-bold text-violet-400 mb-1.5 block tracking-wider uppercase">
                      {item.year}
                    </span>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
