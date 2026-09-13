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
    blue: 'from-saey-blue to-saey-blue',
    violet: 'from-saey-violet to-saey-violet',
  };

  const gradient = colorMap[color] || colorMap.violet;

  return (
    <div className="relative rounded-2xl bg-white border border-gray-200/50 p-6 shadow-sm">
      <div ref={ref} className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-[#111827]">{label}</span>
          <span className={`text-sm font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{level}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>
    </div>
  );
}
