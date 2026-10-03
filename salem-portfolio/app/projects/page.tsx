import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';

const SITE_URL = 'https://salemrizk.online';
const OG_IMAGE = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  title: 'دراسات الحالة والمشاريع | سعي — م. سالم رزق',
  description:
    'استعرض دراسات الحالة الحقيقية لـ م. سالم رزق — نتائج قابلة للقياس في إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك وتطوير مواقع لعملاء في مصر.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
    languages: {
      'ar': `${SITE_URL}/projects`,
      'ar-EG': `${SITE_URL}/projects`,
      'en': `${SITE_URL}/projects`,
      'x-default': `${SITE_URL}/projects`,
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/projects`,
    title: 'دراسات الحالة والمشاريع | سعي — م. سالم رزق',
    description:
      'نتائج حقيقية وقابلة للقياس — إعلانات ميتا، إدارة السوشيال، تصميم وتطوير مواقع من م. سالم رزق.',
    images: [{ url: OG_IMAGE, width: 1080, height: 1080, alt: 'مشاريع سعي — م. سالم رزق', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@salemrizk',
    creator: '@salemrizk',
    title: 'دراسات الحالة | سعي — م. سالم رزق',
    description: 'نتائج حقيقية — إعلانات ميتا، سوشيال ميديا، تصميم وتطوير مواقع.',
    images: [OG_IMAGE],
  },
};

const projectAccents = [
  { border: 'border-blue-300',   badge: 'bg-blue-50 text-blue-700 border-blue-200',   dot: 'bg-saey-blue' },
  { border: 'border-violet-300', badge: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-saey-violet' },
  { border: 'border-indigo-300', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
  { border: 'border-amber-300',  badge: 'bg-amber-50 text-amber-700 border-amber-200',  dot: 'bg-amber-500' },
  { border: 'border-emerald-300',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
];

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  // JSON-LD ItemList for the listing page
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'دراسات الحالة — سعي · م. سالم رزق',
    url: `${SITE_URL}/projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/projects/${p.slug}`,
      name: p.title_ar || p.title,
    })),
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#FBFCFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── Hero ── */}
      <section aria-label="قائمة المشاريع" className="relative bg-[#07152E] pt-32 pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center text-white">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            العودة للرئيسية
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest text-white/70 mb-6">
            دراسات حالة حقيقية
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5">
            <span className="text-white">أعمالنا</span>
            <br />
            <span className="bg-gradient-to-r from-[#146CFF] to-[#6A3DFF] bg-clip-text text-transparent">
              ونتائجها الحقيقية
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            كل مشروع هنا دراسة حالة حقيقية — أرقام قابلة للقياس، وتحديات حقيقية، وحلول مثبتة.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-10 border-t border-white/10">
            {[
              { value: `${projects.length}+`, label: 'دراسة حالة' },
              { value: '3M+', label: 'وصول شهري' },
              { value: '4.2x', label: 'متوسط ROAS' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black bg-gradient-to-r from-[#146CFF] to-[#6A3DFF] bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section aria-label="المشاريع" className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => {
            const accent = projectAccents[index % projectAccents.length];
            const logoSrc = project.logo || project.coverImage || project.heroImage || '/logo.png';

            return (
              <article
                key={project.slug}
                className={`group relative rounded-3xl bg-white border border-blue-100 hover:${accent.border} hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-400 overflow-hidden`}
              >
                {/* Top color bar on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${accent.dot} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="p-7 sm:p-9">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">

                    {/* Logo */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm ring-1 ring-blue-100 flex-shrink-0">
                      <Image
                        src={logoSrc}
                        alt={`${project.title_ar || project.title} — شعار`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Industry badge + year */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.industry_ar && (
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${accent.badge}`}>
                            {project.industry_ar}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 font-medium">{project.duration_ar || project.year}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-black text-[#07152E] leading-tight mb-2">
                        {project.title_ar || project.title}
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                        {project.subtitle_ar || project.subtitle}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(project.tags_ar || project.tags).slice(0, 4).map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-[#F4F7FF] text-gray-500 border border-blue-50">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#146CFF] hover:bg-[#0756D7] text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-blue-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                      >
                        شوف دراسة الحالة
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Back to home CTA */}
        <div className="text-center mt-16 pt-12 border-t border-blue-100">
          <p className="text-gray-400 text-sm mb-4">عايز تشتغل معنا؟</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#146CFF] text-[#146CFF] font-semibold hover:bg-[#146CFF] hover:text-white transition-all duration-200"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </main>
  );
}
