import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import CampaignResults from '@/components/sections/CampaignResults';
import WhyWorkWithMe from '@/components/sections/WhyWorkWithMe';
import WorkProcess from '@/components/sections/WorkProcess';
import Skills from '@/components/sections/Skills';
import DesignGallery from '@/components/sections/DesignGallery';
import VideoPortfolio from '@/components/sections/VideoPortfolio';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
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
