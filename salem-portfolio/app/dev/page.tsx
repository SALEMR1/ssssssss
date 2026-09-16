import type { Metadata } from 'next';
import DevProjectsClient from '@/components/dev/DevProjectsClient';

const OG_IMAGE = 'https://salemrizk.online/logo.png';

export const metadata: Metadata = {
  title: 'مشاريع برمجية | م. سالم رزق — مطور Next.js & React',
  description:
    'معرض مشاريع تطوير الويب لـ م. سالم رزق، مؤسس سعي — تطبيقات ويب حقيقية مبنية بـ Next.js وReact وTypeScript. من متاجر إلكترونية إلى أنظمة ERP.',
  alternates: {
    canonical: 'https://salemrizk.online/dev',
  },
  openGraph: {
    title: 'مشاريع برمجية | م. سالم رزق — مطور Next.js & React',
    description:
      'تطبيقات ويب حقيقية مبنية بـ Next.js وReact وTypeScript من إبداع م. سالم رزق.',
    url: 'https://salemrizk.online/dev',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'مشاريع تطوير الويب — سالم رزق',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مشاريع برمجية | م. سالم رزق — مؤسس سعي',
    description: 'تطبيقات ويب حقيقية بـ Next.js وReact وTypeScript من إبداع م. سالم رزق.',
    images: [OG_IMAGE],
  },
};

export default function DevPage() {
  return <DevProjectsClient />;
}
