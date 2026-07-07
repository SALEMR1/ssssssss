'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      variants={fadeIn('up', 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border border-violet-500/30 bg-violet-500/10 text-violet-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 ${light ? 'text-gray-900' : 'text-white'}`}>
        {titleParts[0]}
        {highlight && (
          <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
        {titleParts[1]}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
