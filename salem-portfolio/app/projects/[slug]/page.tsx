import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import projectsData from '@/data/projects.json';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import ProjectChallenge from '@/components/project/ProjectChallenge';
import ProjectStrategy from '@/components/project/ProjectStrategy';
import ProjectResults from '@/components/project/ProjectResults';
import ProjectBeforeAfter from '@/components/project/ProjectBeforeAfter';
import ProjectAchievements from '@/components/project/ProjectAchievements';
import ProjectGallery from '@/components/project/ProjectGallery';
import ProjectTestimonial from '@/components/project/ProjectTestimonial';
import ProjectTimeline from '@/components/project/ProjectTimeline';
import ProjectRelated from '@/components/project/ProjectRelated';
import ProjectTools from '@/components/project/ProjectTools';

const SITE_URL = 'https://salemrizk.online';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (projectsData as any[]).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (projectsData as any[]).find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title_ar || project.title} — دراسة حالة | سعي · م. سالم رزق`;
  const description = project.overview_ar
    ? project.overview_ar.slice(0, 160)
    : project.overview.slice(0, 160);
  const url = `${SITE_URL}/projects/${slug}`;
  const image = project.coverImage || project.heroImage || `${SITE_URL}/logo.png`;

  return {
    title,
    description,
    keywords: [
      project.title, project.title_ar,
      project.industry, project.industry_ar,
      'سعي للتسويق الرقمي', 'م. سالم رزق', 'Salem Rizk', 'Saey',
      'دراسة حالة تسويق رقمي', 'إعلانات ميتا مصر', 'digital marketing Egypt',
    ].filter(Boolean),
    authors: [{ name: 'م. سالم رزق — سعي', url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'ar_EG',
      siteName: 'سعي — م. سالم رزق',
      images: [{ url: image, width: 1200, height: 630, alt: `${project.title_ar || project.title} — سعي` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (projectsData as any[]).find((p) => p.slug === slug);

  if (!project) notFound();

  const relatedProjects = (projectsData as any[]).filter((p) =>
    project.relatedProjects.includes(p.slug)
  );

  // Schema.org — Article (CaseStudy)
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/projects/${slug}#article`,
    headline: `${project.title_ar || project.title} — دراسة حالة`,
    description: project.overview_ar ? project.overview_ar.slice(0, 200) : project.overview.slice(0, 200),
    url: `${SITE_URL}/projects/${slug}`,
    image: {
      '@type': 'ImageObject',
      url: project.coverImage || project.heroImage || `${SITE_URL}/logo.png`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: 'م. سالم رزق',
      alternateName: 'Salem Rizk',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'سعي للتسويق الرقمي',
      alternateName: 'Saey Digital Marketing',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: `${project.year}-01-01`,
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: ['ar', 'en'],
    keywords: [project.title, project.industry, 'تسويق رقمي', 'digital marketing Egypt'].join(', '),
  };

  // Schema.org — BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'المشاريع', item: `${SITE_URL}/#projects` },
      { '@type': 'ListItem', position: 3, name: project.title_ar || project.title, item: `${SITE_URL}/projects/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallenge project={project} />
      <ProjectStrategy project={project} />
      <ProjectResults project={project} />
      <ProjectBeforeAfter project={project} />
      <ProjectAchievements project={project} />
      <ProjectGallery project={project} />
      <ProjectTestimonial project={project} />
      <ProjectTimeline project={project} />
      <ProjectTools project={project} />
      <ProjectRelated projects={relatedProjects} />
    </div>
  );
}
