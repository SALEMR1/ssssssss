'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { ChevronDown, HelpCircle } from 'lucide-react';
import faqsData from '@/data/faqs.json';
import { useI18n } from '@/lib/i18n/context';

interface FaqEntry {
  id: number;
  question: string;
  question_ar?: string;
  answer: string;
  answer_ar?: string;
}

export default function FAQ() {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="faq" className="relative py-32 bg-saey-gray overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.faq.badge} title={t.faq.title} highlight={t.faq.highlight} subtitle={t.faq.subtitle} light />
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
          {(faqsData as FaqEntry[]).map((faq, index) => {
            const question = lang === 'ar' ? faq.question_ar || faq.question : faq.question;
            const answer = lang === 'ar' ? faq.answer_ar || faq.answer : faq.answer;
            return (
              <motion.div key={faq.id} variants={fadeIn('up', index * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${openId === faq.id ? 'border-blue-300 bg-blue-50' : 'border-blue-100 bg-white hover:border-blue-200'}`}>
                <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)} className="w-full flex items-center justify-between gap-4 p-6 text-left group" aria-expanded={openId === faq.id}>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-black w-8 ${openId === faq.id ? 'text-saey-blue' : 'text-gray-600'}`}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={`font-semibold transition-colors duration-200 ${openId === faq.id ? 'text-saey-blue' : 'text-saey-navy group-hover:text-saey-blue'}`}>{question}</span>
                  </div>
                  <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                    <ChevronDown size={20} className={openId === faq.id ? 'text-saey-blue' : 'text-gray-500'} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: openId === faq.id ? 'auto' : 0, opacity: openId === faq.id ? 1 : 0 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 text-saey-muted leading-relaxed">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div variants={fadeIn('up', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 text-center p-8 rounded-3xl border border-blue-100 bg-white shadow-sm">
          <HelpCircle size={32} className="text-saey-blue mx-auto mb-3" />
          <h3 className="text-saey-navy font-bold text-xl mb-2">{t.faq.stillQuestion}</h3>
          <p className="text-saey-muted mb-6">{t.faq.stillSub}</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-saey-blue text-white font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
            {t.faq.contactBtn}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
