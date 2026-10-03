'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProgressBarProps {
  label: string;
  level: number;
  color?: string;
  delay?: number;
}

// Maps any color key to a solid Tailwind bg class (no broken gradient)
const barColorMap: Record<string, string> = {
  blue:    'bg-saey-blue',
  violet:  'bg-saey-violet',
  rose:    'bg-rose-500',
  emerald: 'bg-emerald-500',
  sky:     'bg-sky-500',
  amber:   'bg-amber-500',
};

// Maps color key to text color for the percentage label
const textColorMap: Record<string, string> = {
  blue:    'text-saey-blue',
  violet:  'text-saey-violet',
  rose:    'text-rose-500',
  emerald: 'text-emerald-500',
  sky:     'text-sky-500',
  amber:   'text-amber-500',
};

export default function ProgressBar({ label, level, color = 'violet', delay = 0 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const barClass  = barColorMap[color]  ?? barColorMap.violet;
  const textClass = textColorMap[color] ?? textColorMap.violet;

  return (
    <div className="relative rounded-2xl bg-white border border-gray-200/50 p-6 shadow-sm">
      <div ref={ref} className="space-y-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-saey-navy">{label}</span>
          <span className={`text-sm font-black ${textClass}`}>{level}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            role="progressbar"
            aria-valuenow={level}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
            className={`h-full rounded-full ${barClass}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>
    </div>
  );
}
