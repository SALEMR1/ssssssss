import type { Metadata } from 'next';
import DevProjectsClient from '@/components/dev/DevProjectsClient';

const OG_IMAGE = '/logo.png';

export const metadata: Metadata = {
  title: 'مشاريع برمجية | سالم رزق — مطور Next.js & React',
  description:
    'معرض مشاريع تطوير الويب لسالم رزق — 9 تطبيقات ويب حقيقية مبنية بـ Next.js وReact وTypeScript. من متاجر إلكترونية إلى منصات تعليمية.',
  alternates: {
    canonical: 'https://salemrizk.com/dev',
  },
  openGraph: {
    title: 'مشاريع برمجية | سالم رزق — مطور Next.js & React',
    description:
      '9 تطبيقات ويب حقيقية مبنية بـ Next.js وReact وTypeScript من إبداع سالم رزق.',
    url: 'https://salemrizk.com/dev',
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
    title: 'مشاريع برمجية | سالم رزق',
    description: '9 تطبيقات ويب حقيقية بـ Next.js وReact وTypeScript.',
    images: [OG_IMAGE],
  },
};

export default function DevPage() {
  return <DevProjectsClient />;
}
