'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  level: number;
  color?: string;
  delay?: number;
}

export default function ProgressBar({ label, level, color = 'violet', delay = 0 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorMap: Record<string, string> = {
    violet: 'from-violet-500 to-violet-400',
    rose: 'from-rose-500 to-pink-400',
    amber: 'from-amber-500 to-yellow-400',
    emerald: 'from-emerald-500 to-teal-400',
    sky: 'from-sky-500 to-blue-400',
    indigo: 'from-indigo-500 to-violet-400',
  };

  const gradient = colorMap[color] || colorMap.violet;

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
