import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

// Lazy-load below-the-fold sections to improve LCP and TTI
const Services      = dynamic(() => import('@/components/sections/Services'));
const Projects      = dynamic(() => import('@/components/sections/Projects'));
const CampaignResults = dynamic(() => import('@/components/sections/CampaignResults'));
const WhyWorkWithMe = dynamic(() => import('@/components/sections/WhyWorkWithMe'));
const WorkProcess   = dynamic(() => import('@/components/sections/WorkProcess'));
const Skills        = dynamic(() => import('@/components/sections/Skills'));
const DesignGallery = dynamic(() => import('@/components/sections/DesignGallery'));
const VideoPortfolio = dynamic(() => import('@/components/sections/VideoPortfolio'));
const Testimonials  = dynamic(() => import('@/components/sections/Testimonials'));
const FAQ           = dynamic(() => import('@/components/sections/FAQ'));
const Contact       = dynamic(() => import('@/components/sections/Contact'));

export const metadata: Metadata = {
  title: 'سالم رزق | مدير وسائل التواصل الاجتماعي وخبير إعلانات ميتا — مصر',
  description:
    'سالم رزق — مدير وسائل تواصل اجتماعي، خبير إعلانات ميتا، مصمم جرافيك، مونتير فيديو، ومطور مواقع من إدكو، البحيرة، مصر. حقق +3.2M وصول و4.2x ROAS لعملائه.',
  alternates: {
    canonical: 'https://salemrizk.com',
  },
  openGraph: {
    url: 'https://salemrizk.com',
  },
};

export default function Home() {
  return (
    <>
      {/* Above the fold — loaded immediately */}
      <Hero />
      <About />

      {/* Below the fold — lazy loaded */}
      <Services />
      <Projects />
      <CampaignResults />
      <WhyWorkWithMe />
      <WorkProcess />
      <Skills />
      <DesignGallery />
      <VideoPortfolio />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
