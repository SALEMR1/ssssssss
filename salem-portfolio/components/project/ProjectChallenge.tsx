'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { XCircle, Target, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Props {
  project: {
    challenge: string; challenge_ar?: string;
    challengePoints: string[]; challengePoints_ar?: string[];
    objectives: string[]; objectives_ar?: string[];
    color: string;
  };
}

export default function ProjectChallenge({ project }: Props) {
  const { t, lang } = useI18n();
  const challenge = lang === 'ar' ? project.challenge_ar || project.challenge : project.challenge;
  const points = lang === 'ar' ? project.challengePoints_ar || project.challengePoints : project.challengePoints;
  const objectives = lang === 'ar' ? project.objectives_ar || project.objectives : project.objectives;

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Challenge */}
          <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border border-rose-500/15 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center"><XCircle size={22} className="text-rose-400" /></div>
              <div>
                <h3 className="text-2xl font-black text-white">{t.project.challenge.badge}</h3>
                <p className="text-rose-400 text-sm font-medium">{t.project.challenge.badgeSub}</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">{challenge}</p>
            <ul className="space-y-3">
              {points.map((point, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Objectives */}
          <motion.div variants={fadeIn('up', 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] border p-8 space-y-6" style={{ borderColor: `${project.color}25` }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                <Target size={22} style={{ color: project.color }} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{t.project.challenge.objectiveBadge}</h3>
                <p className="text-sm font-medium" style={{ color: project.color }}>{t.project.challenge.objectiveSub}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {objectives.map((obj, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                  <span className="text-gray-300 text-sm leading-relaxed">{obj}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
