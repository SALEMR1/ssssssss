import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'سالم رزق - قصة البداية والرحلة | Salem Rezk',
  description: 'من ملاعب كرة القدم إلى عالم التقنية والتسويق الرقمي. تعرف على قصة سالم رزق ورحلته المهنية كمدير تسويق، صانع محتوى، ومطور ويب.',
  openGraph: {
    title: 'سالم رزق - قصة البداية والرحلة | Salem Rezk',
    description: 'تعرف على رحلة سالم رزق من لعب كرة القدم إلى إدارة التسويق الرقمي وتطوير الويب.',
    images: ['https://ik.imagekit.io/effect/SDR.png'],
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
