'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { MessageCircle, Globe, AtSign, Share2, MapPin, Send, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const contactIcons = [MessageCircle, Globe, AtSign, MessageSquare, Share2, MapPin];
const contactColors = [
  { color: 'text-green-400', bg: 'hover:bg-green-500/10 hover:border-green-500/30' },
  { color: 'text-blue-400', bg: 'hover:bg-blue-500/10 hover:border-blue-500/30' },
  { color: 'text-pink-400', bg: 'hover:bg-pink-500/10 hover:border-pink-500/30' },
  { color: 'text-gray-300', bg: 'hover:bg-gray-500/10 hover:border-gray-500/30' },
  { color: 'text-sky-400', bg: 'hover:bg-sky-500/10 hover:border-sky-500/30' },
  { color: 'text-rose-400', bg: 'hover:bg-rose-500/10 hover:border-rose-500/30' },
];

export default function Contact() {
  const { t } = useI18n();
  const [formState, setFormState] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const settings = { whatsapp: '01208569475', email: 'salmbrykrzq@gmail.com', facebook: 'https://www.facebook.com/share/1D1kKU2XCg/', instagram: 'https://www.instagram.com/p/DVV-CnujVmn/?igsh=MXUwYTE5YmRhcGlvZw==', threads: 'https://www.threads.com/@salem_rizk22?invite=0', linkedin: '#' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `الاسم: ${formState.name}\nالبريد: ${formState.email}\nالخدمة: ${formState.service}\nالرسالة: ${formState.message}`;
    const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.1)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(219,39,119,0.08)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.contact.badge} title={t.contact.title} highlight={t.contact.highlight} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <motion.div variants={fadeIn('up', 0)} className="rounded-3xl bg-gradient-to-br from-violet-950/40 to-pink-950/20 border border-violet-500/20 p-8">
              <h3 className="text-2xl font-black text-white mb-3">{t.contact.readyTitle}</h3>
              <p className="text-gray-400 leading-relaxed">{t.contact.readySub}</p>
            </motion.div>

            {t.contact.links.map((link, i) => {
              const Icon = contactIcons[i];
              const c = contactColors[i];
              const getHref = (label: string) => {
                if (label.includes('واتساب') || label.includes('WhatsApp')) return `https://wa.me/${settings.whatsapp}`;
                if (label.includes('فيسبوك') || label.includes('Facebook')) return settings.facebook;
                if (label.includes('إنستجرام') || label.includes('Instagram')) return settings.instagram;
                if (label.includes('ثريد') || label.includes('Threads')) return settings.threads;
                if (label.includes('لينكدإن') || label.includes('LinkedIn')) return settings.linkedin;
                return '#';
              };
              return (
                <motion.a key={link.label} href={getHref(link.label)} target="_blank" rel="noopener noreferrer" variants={fadeIn('up', i * 0.05)} whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 transition-all duration-300 ${c.bg} group`} aria-label={link.label}>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${c.color}`}><Icon size={18} /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{link.label}</p>
                    <p className="text-white text-sm font-semibold">{link.value}</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-white transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeIn('left', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3">
            <div className="rounded-3xl bg-gradient-to-br from-[#0f0f0f] to-[#080808] border border-white/10 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-white mb-8">{t.contact.formTitle}</h3>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.contact.successTitle}</h4>
                  <p className="text-gray-400">{t.contact.successSub}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label={t.contact.formTitle}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium text-gray-300">{t.contact.nameLabel} *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t.contact.namePlaceholder}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-medium text-gray-300">{t.contact.emailLabel} *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.contact.emailPlaceholder}
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="text-sm font-medium text-gray-300">{t.contact.serviceLabel}</label>
                    <select
                      id="contact-service"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      aria-label={t.contact.serviceLabel}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-all duration-200 text-sm appearance-none"
                    >
                      <option value="" className="bg-gray-900">{t.contact.servicePlaceholder}</option>
                      {t.contact.services.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium text-gray-300">{t.contact.messageLabel} *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder={t.contact.messagePlaceholder}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5 group">
                    {t.contact.submitBtn}
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-gray-600 mt-3">{t.contact.privacy}</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
