'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { fadeIn, staggerContainer } from '@/lib/animations';
import {
  ArrowLeft, ArrowRight, Award, MonitorPlay, Briefcase,
  Code, MapPin, TrendingUp, Users,
  CheckCircle2, Zap, Heart
} from 'lucide-react';

const skills = [
  { label: 'إعلانات ميتا', icon: TrendingUp, color: 'text-saey-blue', bg: 'bg-blue-50', border: 'border-blue-200' },
  { label: 'إدارة السوشيال', icon: Users, color: 'text-saey-violet', bg: 'bg-violet-50', border: 'border-violet-200' },
  { label: 'تصميم جرافيك', icon: Zap, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200' },
  { label: 'مونتاج فيديو', icon: MonitorPlay, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { label: 'تطوير ويب', icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { label: 'استراتيجية محتوى', icon: Heart, color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200' },
];

const stats = [
  { value: '+3', label: 'سنوات خبرة', color: 'text-saey-blue' },
  { value: '+20', label: 'عميل راضٍ', color: 'text-saey-violet' },
  { value: '+39', label: 'حملة إعلانية', color: 'text-rose-500' },
  { value: '+3.2M', label: 'إجمالي الوصول', color: 'text-emerald-600' },
];

const timelineItems = [
  {
    label: 'صناعة المحتوى',
    icon: MonitorPlay,
    iconBg: 'bg-blue-50',
    iconBorder: 'border-blue-200',
    iconColor: 'text-saey-blue',
    dotColor: 'bg-saey-blue',
    key: 'bio1',
  },
  {
    label: 'الدراسة والعمل الحر',
    icon: Code,
    iconBg: 'bg-violet-50',
    iconBorder: 'border-violet-200',
    iconColor: 'text-saey-violet',
    dotColor: 'bg-saey-violet',
    key: 'bio2',
  },
  {
    label: 'الهلال السكندري',
    icon: Briefcase,
    iconBg: 'bg-amber-50',
    iconBorder: 'border-amber-200',
    iconColor: 'text-amber-500',
    dotColor: 'bg-amber-400',
    key: 'bio3',
  },
  {
    label: 'TTC & ESCO',
    icon: TrendingUp,
    iconBg: 'bg-emerald-50',
    iconBorder: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    key: 'bio4',
  },
  {
    label: 'توسّع المحفظة',
    icon: Award,
    iconBg: 'bg-rose-50',
    iconBorder: 'border-rose-200',
    iconColor: 'text-rose-500',
    dotColor: 'bg-rose-500',
    key: 'bio5',
  },
  {
    label: 'تأسيس سعي',
    icon: CheckCircle2,
    iconBg: 'bg-saey-gray',
    iconBorder: 'border-blue-200',
    iconColor: 'text-saey-blue',
    dotColor: 'bg-saey-blue',
    key: 'bio6',
  },
];

export default function AboutClient() {
  const { t, isRTL } = useI18n();
  const data = t.aboutPage;

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-saey-gray" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#2563EB0D_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-saey-muted hover:text-saey-blue transition-colors text-sm font-medium group">
              {isRTL
                ? <><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />{t.nav.home}</>
                : <><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{t.nav.home}</>}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Photos */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">

              {/* Main photo — full visible, no crop */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/60 ring-1 ring-blue-100 bg-saey-gray">
                <Image
                  src="https://ik.imagekit.io/effect/sa.jpg"
                  alt="سالم رزق"
                  width={800}
                  height={1000}
                  unoptimized
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-saey-navy/50 to-transparent" />
                {/* Name tag */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                    <p className="text-saey-navy font-black text-lg leading-tight">م. سالم رزق</p>
                    <p className="text-saey-blue text-sm font-semibold mt-0.5">مؤسس سعي · مدير تسويق رقمي · مطور ويب</p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-saey-muted text-xs">
                      <MapPin size={11} className="text-saey-blue flex-shrink-0" />
                      محافظة البحيرة، إدكو 🇪🇬
                    </div>
                  </div>
                </div>
              </div>

              {/* Second photo — full width card below */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-4 relative rounded-2xl overflow-hidden shadow-lg shadow-blue-100/50 ring-1 ring-blue-100 bg-saey-gray"
              >
                <Image
                  src="https://ik.imagekit.io/effect/sax.jpg"
                  alt="سالم رزق في العمل"
                  width={800}
                  height={450}
                  unoptimized
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-4 -left-4 hidden md:flex items-center gap-3 bg-white border border-blue-100 rounded-2xl px-4 py-3 shadow-lg shadow-blue-100/50"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <TrendingUp size={18} className="text-saey-blue" />
                </div>
                <div>
                  <div className="text-lg font-black text-saey-navy">+3.2M</div>
                  <div className="text-xs text-saey-muted">إجمالي الوصول</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Info */}
            <motion.div variants={staggerContainer()} initial="hidden" animate="show" className="space-y-8">
              <motion.div variants={fadeIn('up', 0)}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-blue-200 bg-blue-50 text-saey-blue">
                  <span className="w-1.5 h-1.5 rounded-full bg-saey-blue animate-pulse" />
                  م. سالم رزق — مؤسس سعي
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-saey-navy leading-[1.1] tracking-tight">
                  {data.heading}
                </h1>
              </motion.div>

              {/* Stats grid */}
              <motion.div variants={fadeIn('up', 0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white border border-blue-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                    <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-saey-muted mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div variants={fadeIn('up', 0.2)}>
                <p className="text-xs text-saey-muted font-semibold uppercase tracking-widest mb-3">التخصصات</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((sk) => (
                    <span key={sk.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${sk.bg} border ${sk.border} ${sk.color}`}>
                      <sk.icon size={12} />
                      {sk.label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeIn('up', 0.3)} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/#contact" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-saey-blue text-white font-semibold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5">
                  <CheckCircle2 size={16} />
                  تعاون معي
                </Link>
                <Link href="/#projects" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border-2 border-blue-200 text-saey-navy font-semibold hover:border-saey-blue hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                  استعرض أعمالي
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Timeline Section ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-blue-200 bg-blue-50 text-saey-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-saey-blue animate-pulse" />
              رحلتي المهنية
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-saey-navy leading-tight">
              من البداية{' '}
              <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">إلى الآن</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute right-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-saey-blue/20 via-saey-blue/10 to-transparent" />

            <div className="space-y-10">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  variants={fadeIn('up', i * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="relative flex gap-6 items-start"
                >
                  {/* Icon */}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl ${item.iconBg} border-2 ${item.iconBorder} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <item.icon size={22} className={item.iconColor} />
                    {/* Dot on line */}
                    <div className={`absolute -right-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${item.dotColor} ring-4 ring-white hidden md:block`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                    <span className={`inline-block text-xs font-black tracking-widest uppercase mb-3 px-3 py-1 rounded-lg ${item.iconBg} ${item.iconColor} border ${item.iconBorder}`}>
                      {item.label}
                    </span>
                    <p className="text-saey-navy text-base leading-relaxed">
                      {data[item.key as keyof typeof data]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-20 bg-saey-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-blue-200 bg-white p-12 text-center shadow-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-violet-50" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-6">
                <Heart size={28} className="text-saey-blue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-saey-navy mb-4">
                جاهز نبني حاجة{' '}
                <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">مميزة؟</span>
              </h2>
              <p className="text-saey-muted text-lg mb-8 max-w-xl mx-auto">
                علامتك التجارية تستحق حضوراً رقمياً يحول الزوار لعملاء. هيا نتحدث عن أهدافك.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-saey-blue text-white font-semibold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5">
                  <CheckCircle2 size={18} />
                  تواصل معي الآن
                </Link>
                <Link href="/#projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border-2 border-blue-200 text-saey-navy font-semibold hover:border-saey-blue transition-all duration-300">
                  استعرض الأعمال
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
