import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

// Skeleton fallback — minimal height placeholder keeps layout stable while chunk loads
const SectionSkeleton = ({ h = 'py-32' }: { h?: string }) => (
  <div className={`${h} bg-white animate-pulse`} aria-hidden="true" />
);
const SectionSkeletonGray = ({ h = 'py-32' }: { h?: string }) => (
  <div className={`${h} bg-saey-gray animate-pulse`} aria-hidden="true" />
);

// Lazy-load below-the-fold sections to improve LCP and TTI
const Services       = dynamic(() => import('@/components/sections/Services'),       { loading: () => <SectionSkeletonGray /> });
const Projects       = dynamic(() => import('@/components/sections/Projects'),       { loading: () => <SectionSkeleton /> });
const CampaignResults= dynamic(() => import('@/components/sections/CampaignResults'),{ loading: () => <SectionSkeletonGray /> });
const WhyWorkWithMe  = dynamic(() => import('@/components/sections/WhyWorkWithMe'),  { loading: () => <SectionSkeleton /> });
const WorkProcess    = dynamic(() => import('@/components/sections/WorkProcess'),    { loading: () => <SectionSkeletonGray /> });
const Skills         = dynamic(() => import('@/components/sections/Skills'),         { loading: () => <SectionSkeleton /> });
const DesignGallery  = dynamic(() => import('@/components/sections/DesignGallery'), { loading: () => <SectionSkeletonGray /> });
const VideoPortfolio = dynamic(() => import('@/components/sections/VideoPortfolio'),{ loading: () => <SectionSkeleton /> });
const FAQ            = dynamic(() => import('@/components/sections/FAQ'),            { loading: () => <SectionSkeletonGray /> });
const Contact        = dynamic(() => import('@/components/sections/Contact'),        { loading: () => <SectionSkeletonGray /> });

const SITE_URL = 'https://salemrizk.online';
const OG_IMAGE = 'https://salemrizk.online/logo.png';

export const metadata: Metadata = {
  title: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا وتطوير مواقع',
  description:
    'سعي للتسويق الرقمي — فريق م. سالم رزق. خبرة في إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك ومطور مواقع من إدكو، البحيرة، مصر.',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ar': SITE_URL,
      'ar-EG': SITE_URL,
      'en': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا وتطوير مواقع',
    description:
      'سعي للتسويق الرقمي — فريق م. سالم رزق. إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك ومطور مواقع من مصر.',
    images: [{ url: OG_IMAGE, width: 1080, height: 1080, alt: 'م. سالم رزق — مؤسس سعي للتسويق الرقمي', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@salemrizk',
    creator: '@salemrizk',
    title: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا وتطوير مواقع',
    description:
      'سعي للتسويق الرقمي — فريق م. سالم رزق. إعلانات ميتا، تصميم جرافيك، تطوير مواقع من مصر.',
    images: [OG_IMAGE],
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* Below the fold — lazy loaded */}
      <Services />
      <Projects />
      <CampaignResults />
      <WhyWorkWithMe />
      <WorkProcess />
      <Skills />
      <DesignGallery />
      <VideoPortfolio />
      <FAQ />
      <Contact />
    </>
  );
}
