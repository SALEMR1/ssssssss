'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { ArrowLeft, ArrowRight, GraduationCap, Briefcase, Award, MonitorPlay, Code } from 'lucide-react';
import Link from 'next/link';

export default function AboutClient() {
  const { t, isRTL } = useI18n();
  const data = t.aboutPage;

  const timeline = [
    {
      year: "Before 2020",
      icon: Award,
      content: data.bio1
    },
    {
      year: "2020",
      icon: MonitorPlay,
      content: data.bio2
    },
    {
      year: "2021-2022",
      icon: Briefcase,
      content: data.bio3
    },
    {
      year: "2023",
      icon: GraduationCap,
      content: data.bio4
    },
    {
      year: "2024 - Present",
      icon: Code,
      content: data.bio5
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium group"
          >
            {isRTL ? (
              <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />{t.nav.home}</>
            ) : (
              <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{t.nav.home}</>
            )}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://ik.imagekit.io/effect/gemini-3-pro-image-preview_b_%D8%AE%D9%84%D9%8A_%D8%A7%D9%84%D8%B4%D8%AE%D8%B5_%D8%A7%D9%84%D9%8A_%D8%B9%D9%84%D9%8A_%D8%A7%D9%84%20(1)%20(1).png"
                alt="Salem Rezk"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
            </div>
            
            {/* Floating Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`absolute -bottom-12 ${isRTL ? '-left-12' : '-right-12'} w-64 aspect-square rounded-3xl overflow-hidden border-4 border-[#080808] shadow-2xl hidden md:block`}
            >
              <Image
                src="https://ik.imagekit.io/effect/SDR.png"
                alt="Salem Rezk Working"
                fill
                unoptimized
                className="object-cover"
                sizes="256px"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={fadeIn('up', 0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {data.title}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {data.heading}
              </h1>
            </motion.div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div key={index} variants={fadeIn('up', index * 0.1)} className="flex gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-violet-400" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent min-h-[40px]" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-sm font-bold text-violet-400 mb-2 block">{item.year}</span>
                    <p className="text-gray-300 text-lg leading-relaxed">
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
