'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // kept for API compatibility, ignored
}

export default function SectionHeader({ badge, title, highlight, subtitle, centered = true }: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-blue-200 bg-blue-50 text-saey-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-saey-blue animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-saey-navy leading-tight mb-6">
        {titleParts[0]}
        {highlight && (
          <span className="bg-gradient-to-r from-saey-blue to-saey-violet bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
        {titleParts[1]}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl leading-relaxed text-saey-muted ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
