import type { Metadata } from 'next';
import AboutClient from './AboutClient';

const OG_IMAGE = 'https://ik.imagekit.io/effect/sa.jpg';

export const metadata: Metadata = {
  title: 'من أنا | م. سالم رزق — مؤسس سعي للتسويق الرقمي',
  description:
    'م. سالم رزق، مؤسس سعي للتسويق الرقمي — رحلة من صناعة المحتوى إلى بناء منظومة تسويقية متكاملة لعملاء في مصر والخارج. خبير إعلانات ميتا، مدير تسويق رقمي ومطور مواقع.',
  alternates: {
    canonical: 'https://salemrizk.online/about',
  },
  openGraph: {
    title: 'من أنا | م. سالم رزق — مؤسس سعي للتسويق الرقمي',
    description:
      'تعرّف على م. سالم رزق، مؤسس سعي — رحلة احترافية من صناعة المحتوى إلى إدارة منظومة عملاء متكاملة في قطاعات مختلفة.',
    url: 'https://salemrizk.online/about',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'م. سالم رزق — مؤسس سعي للتسويق الرقمي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'من أنا | م. سالم رزق — مؤسس سعي',
    description: 'م. سالم رزق، مؤسس سعي للتسويق الرقمي — خبير إعلانات ميتا ومطور مواقع من مصر.',
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
