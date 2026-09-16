import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'م. سالم رزق | سعي للتسويق الرقمي',
    short_name: 'سعي | Salem Rizk',
    description: 'م. سالم رزق، مؤسس سعي للتسويق الرقمي — خبير إعلانات ميتا، تصميم، وتطوير مواقع.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#2563EB',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
