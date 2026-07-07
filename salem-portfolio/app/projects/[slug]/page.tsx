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
  return {
    title: `${project.title} Case Study | Salem Rizk`,
    description: project.overview.slice(0, 160),
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.overview.slice(0, 160),
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

  return (
    <div className="bg-[#080808] min-h-screen">
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
