import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Salem Rizk | Digital Marketing',
    short_name: 'Salem Rizk',
    description: 'Digital marketing, Meta Ads, branding, and web development portfolio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBFCFF',
    theme_color: '#07152E',
    icons: [{ src: '/logo.png', sizes: '1080x1080', type: 'image/png', purpose: 'any' }],
  };
}
