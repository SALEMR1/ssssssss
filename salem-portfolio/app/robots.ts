import type { MetadataRoute } from 'next';

const SITE_URL = 'https://salemrizk.online';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/image-sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
