import type { Metadata } from 'next';
import AboutClient from './AboutClient';

const OG_IMAGE = 'https://ik.imagekit.io/effect/SDR.png';

export const metadata: Metadata = {
  title: 'عن سالم رزق | القصة والرحلة المهنية',
  description:
    'تعرف على قصة سالم رزق — من ملاعب كرة القدم إلى مدير تسويق رقمي وخبير إعلانات ميتا ومطور مواقع. رحلة شغف وإبداع وخبرة +3 سنوات في التسويق الرقمي.',
  alternates: {
    canonical: 'https://salemrizk.com/about',
  },
  openGraph: {
    title: 'عن سالم رزق | القصة والرحلة المهنية',
    description:
      'تعرف على رحلة سالم رزق من لعب كرة القدم إلى إدارة التسويق الرقمي وتطوير الويب.',
    url: 'https://salemrizk.com/about',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'سالم رزق — القصة الشخصية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عن سالم رزق | القصة والرحلة المهنية',
    description: 'تعرف على رحلة سالم رزق في التسويق الرقمي وتطوير الويب.',
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
