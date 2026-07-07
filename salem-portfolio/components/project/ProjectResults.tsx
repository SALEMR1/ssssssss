'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useI18n } from '@/lib/i18n/context';

interface Results {
  reach: string; reachLabel: string; reachLabel_ar?: string;
  impressions: string; impressionsLabel: string; impressionsLabel_ar?: string;
  engagement: string; engagementLabel: string; engagementLabel_ar?: string;
  followers: string; followersLabel: string; followersLabel_ar?: string;
  clicks: string; clicksLabel: string; clicksLabel_ar?: string;
  ctr: string; ctrLabel: string; ctrLabel_ar?: string;
  roas: string; roasLabel: string; roasLabel_ar?: string;
  campaigns: string; campaignsLabel: string; campaignsLabel_ar?: string;
}

interface Props { project: { results: Results; color: string; title: string; title_ar?: string; }; }

function parseMetric(value: string) {
  const c = value.replace(/,/g, '');
  if (c.endsWith('M+')) return { number: parseFloat(c), suffix: 'M+' };
  if (c.endsWith('M')) return { number: parseFloat(c), suffix: 'M' };
  if (c.endsWith('K+')) return { number: parseFloat(c), suffix: 'K+' };
  if (c.endsWith('K')) return { number: parseFloat(c), suffix: 'K' };
  if (c.endsWith('x')) return { number: parseFloat(c), suffix: 'x' };
  if (c.endsWith('%')) return { number: parseFloat(c), suffix: '%' };
  if (c.endsWith('+')) return { number: parseFloat(c), suffix: '+' };
  return { number: parseFloat(c) || 0, suffix: '' };
}

export default function ProjectResults({ project }: Props) {
  const { t, lang } = useI18n();
  const r = project.results;
  const title = lang === 'ar' ? project.title_ar || project.title : project.title;

  const metrics = [
    { value: r.reach, label: lang === 'ar' ? r.reachLabel_ar || r.reachLabel : r.reachLabel },
    { value: r.impressions, label: lang === 'ar' ? r.impressionsLabel_ar || r.impressionsLabel : r.impressionsLabel },
    { value: r.engagement, label: lang === 'ar' ? r.engagementLabel_ar || r.engagementLabel : r.engagementLabel },
    { value: r.followers, label: lang === 'ar' ? r.followersLabel_ar || r.followersLabel : r.followersLabel },
    { value: r.clicks, label: lang === 'ar' ? r.clicksLabel_ar || r.clicksLabel : r.clicksLabel },
    { value: r.ctr, label: lang === 'ar' ? r.ctrLabel_ar || r.ctrLabel : r.ctrLabel },
    { value: r.roas, label: lang === 'ar' ? r.roasLabel_ar || r.roasLabel : r.roasLabel },
    { value: r.campaigns, label: lang === 'ar' ? r.campaignsLabel_ar || r.campaignsLabel : r.campaignsLabel },
  ];

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
            {t.project.results.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.project.results.title}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">{t.project.results.highlight}</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">{t.project.results.subtitle} {title}.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => {
            const { number, suffix } = parseMetric(metric.value);
            return (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-white/8 p-6 text-center hover:border-white/15 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-black leading-none mb-2" style={{ color: project.color }}>
                  <AnimatedCounter target={number} suffix={suffix} decimals={!Number.isInteger(number) ? 1 : 0} />
                </div>
                <p className="text-gray-400 text-xs font-medium leading-tight">{metric.label}</p>
                <div className="mt-3 h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: project.color }} initial={{ width: 0 }} whileInView={{ width: '75%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 + i * 0.07, ease: 'easeOut' }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
