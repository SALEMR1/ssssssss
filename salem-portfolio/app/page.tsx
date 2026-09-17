import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';

// Lazy-load below-the-fold sections to improve LCP and TTI
const Services      = dynamic(() => import('@/components/sections/Services'));
const Projects      = dynamic(() => import('@/components/sections/Projects'));
const CampaignResults = dynamic(() => import('@/components/sections/CampaignResults'));
const WhyWorkWithMe = dynamic(() => import('@/components/sections/WhyWorkWithMe'));
const WorkProcess   = dynamic(() => import('@/components/sections/WorkProcess'));
const Skills        = dynamic(() => import('@/components/sections/Skills'));
const DesignGallery = dynamic(() => import('@/components/sections/DesignGallery'));
const VideoPortfolio = dynamic(() => import('@/components/sections/VideoPortfolio'));
const FAQ           = dynamic(() => import('@/components/sections/FAQ'));
const Contact       = dynamic(() => import('@/components/sections/Contact'));

export const metadata: Metadata = {
  title: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا وتطوير مواقع',
  description:
    'سعي للتسويق الرقمي — فريق م. سالم رزق. خبرة في إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك ومطور مواقع من إدكو، البحيرة، مصر.',
  alternates: { canonical: 'https://salemrizk.online' },
  openGraph: { url: 'https://salemrizk.online' },
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
