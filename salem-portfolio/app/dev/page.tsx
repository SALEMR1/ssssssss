import type { Metadata } from 'next';
import DevProjectsClient from '@/components/dev/DevProjectsClient';

export const metadata: Metadata = {
  title: 'Dev Projects | Salem Rizk',
  description: 'Web development portfolio — 8 real-world applications built with Next.js, React, Node.js and modern tech stacks.',
};

export default function DevPage() {
  return <DevProjectsClient />;
}
