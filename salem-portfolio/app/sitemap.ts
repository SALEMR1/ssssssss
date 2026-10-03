import type { MetadataRoute } from 'next';
import projectsData from '@/data/projects.json';
import type { Project } from '@/lib/types';

const SITE_URL = 'https://salemrizk.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dev`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projectsData as Project[]).map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(`${project.year}-01-01`),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...projectRoutes];
}
