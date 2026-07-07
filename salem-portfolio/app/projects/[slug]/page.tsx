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

const SITE_URL = 'https://salemrizk.com';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — دراسة حالة | سالم رزق`;
  const description = project.overview_ar
    ? project.overview_ar.slice(0, 160)
    : project.overview.slice(0, 160);
  const url = `${SITE_URL}/projects/${slug}`;
  const image = project.coverImage || project.heroImage || '';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: project.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) notFound();

  const relatedProjects = projectsData.filter((p) =>
    project.relatedProjects.includes(p.slug)
  );

  // Schema.org — CaseStudy / Article
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — Case Study`,
    description: project.overview.slice(0, 200),
    url: `${SITE_URL}/projects/${slug}`,
    image: project.coverImage || project.heroImage,
    author: {
      '@type': 'Person',
      name: 'Salem Rizk',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Salem Rizk',
      url: SITE_URL,
    },
    datePublished: `${project.year}-01-01`,
    dateModified: `${project.year}-12-31`,
    inLanguage: 'ar',
  };

  return (
    <div className="bg-[#080808] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
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
