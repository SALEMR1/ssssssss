import { NextResponse } from 'next/server';
import projectsData from '@/data/projects.json';

const SITE_URL = 'https://salemrizk.online';

export async function GET() {
  const projects = projectsData as any[];

  const imageEntries = projects
    .filter((p) => p.coverImage || p.heroImage)
    .map((p) => {
      const images = [
        p.coverImage,
        p.heroImage,
        p.logo,
        ...(p.gallery || []).map((g: any) => g.src),
      ].filter(Boolean).slice(0, 10);

      return `
  <url>
    <loc>${SITE_URL}/projects/${p.slug}</loc>
    ${images.map((img: string) => `
    <image:image>
      <image:loc>${img}</image:loc>
      <image:title>${p.title_ar || p.title} — سعي · م. سالم رزق</image:title>
      <image:caption>${p.overview_ar ? p.overview_ar.slice(0, 100) : p.overview.slice(0, 100)}</image:caption>
    </image:image>`).join('')}
  </url>`;
    }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}</loc>
    <image:image>
      <image:loc>${SITE_URL}/logo.png</image:loc>
      <image:title>م. سالم رزق — مؤسس سعي للتسويق الرقمي</image:title>
      <image:caption>سعي للتسويق الرقمي | Saey Digital Marketing</image:caption>
    </image:image>
  </url>
  ${imageEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
