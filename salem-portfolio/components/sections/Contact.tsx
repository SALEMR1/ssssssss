'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { MessageCircle, Globe, MapPin, Send, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const contactIcons = [MessageCircle, Globe, MapPin];
export default function Contact() {
  const { t } = useI18n();
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
      }
    } catch {
      setError('تعذّر الاتصال. تحقق من الإنترنت وحاول مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-saey-gray overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.06)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(91,78,232,0.04)_0%,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader badge={t.contact.badge} title={t.contact.title} highlight={t.contact.highlight} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <motion.div variants={staggerContainer(0.08, 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <motion.div variants={fadeIn('up', 0)} className="rounded-3xl bg-white border border-blue-100 p-8">
              <h3 className="text-2xl font-black text-saey-navy mb-3">{t.contact.readyTitle}</h3>
              <p className="text-saey-muted leading-relaxed">{t.contact.readySub}</p>
            </motion.div>

            {t.contact.links
              .filter((link) => {
                const isThreads = link.label.includes('ثريد') || link.label.includes('Threads');
                const isLinkedIn = link.label.includes('لينكدإن') || link.label.includes('LinkedIn');
                const isInstagram = link.label.includes('إنستجرام') || link.label.includes('Instagram');
                if (isLinkedIn && (!settings.linkedin || settings.linkedin === '#' || settings.linkedin === '')) return false;
                if (isInstagram && (!settings.instagram || settings.instagram === '#' || settings.instagram === '')) return false;
                if (isThreads) return false;
                return true;
              })
              .map((link, i) => {
                const isLocation = link.label.includes('الموقع') || link.label.includes('Location');
                const Icon = isLocation ? MapPin : contactIcons[i] || Globe;
                const getHref = (label: string) => {
                  if (label.includes('واتساب') || label.includes('WhatsApp')) return `https://wa.me/${settings.whatsapp}`;
                  if (label.includes('فيسبوك') || label.includes('Facebook')) return settings.facebook;
                  if (label.includes('إنستجرام') || label.includes('Instagram')) return settings.instagram;
                  if (label.includes('ثريد') || label.includes('Threads')) return settings.threads;
                  if (label.includes('لينكدإن') || label.includes('LinkedIn')) return settings.linkedin;
                  if (label.includes('الموقع') || label.includes('Location')) return settings.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(settings.location)}`;
                  return '#';
                };
                const href = getHref(link.label);
                return (
                  <motion.a key={link.label} href={href} target="_blank" rel="noopener noreferrer" variants={fadeIn('up', i * 0.05)} whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-md group" aria-label={link.label}>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-saey-blue"><Icon size={18} /></div>
                    <div>
                      <p className="text-xs text-saey-muted font-medium">{link.label}</p>
                      <p className="text-saey-navy text-sm font-semibold">{link.value}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-saey-muted group-hover:text-saey-blue transition-colors" />
                  </motion.a>
                );
              })}
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeIn('left', 0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-blue-100 p-8 md:p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-saey-navy mb-8">{t.contact.formTitle}</h3>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-saey-navy mb-2">{t.contact.successTitle}</h4>
                  <p className="text-saey-muted">{t.contact.successSub}</p>
                  <p className="text-xs text-saey-blue mt-3 font-medium">📧 تم إرسال رسالتك إلى saey.egyptian@gmail.com</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-saey-navy">{t.contact.nameLabel} *</label>
                      <input type="text" required placeholder={t.contact.namePlaceholder} value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy placeholder-saey-muted/50 focus:outline-none focus:border-saey-blue focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-saey-navy">{t.contact.emailLabel}</label>
                      <input type="email" placeholder={t.contact.emailPlaceholder} value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy placeholder-saey-muted/50 focus:outline-none focus:border-saey-blue focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-saey-navy">رقم الهاتف / واتساب *</label>
                      <input type="tel" required placeholder="01xxxxxxxxx" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy placeholder-saey-muted/50 focus:outline-none focus:border-saey-blue focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-saey-navy">{t.contact.serviceLabel}</label>
                      <select value={formState.service} onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy focus:outline-none focus:border-saey-blue focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm appearance-none">
                        <option value="">{t.contact.servicePlaceholder}</option>
                        {t.contact.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-saey-navy">{t.contact.messageLabel} *</label>
                    <textarea required rows={5} placeholder={t.contact.messagePlaceholder} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy placeholder-saey-muted/50 focus:outline-none focus:border-saey-blue focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm resize-none" />
                  </div>

                  {error && (
                    <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-saey-blue text-white font-semibold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> جاري الإرسال...</>
                    ) : (
                      <>{t.contact.submitBtn} <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-saey-muted mt-3">📧 سيصلك رد خلال 24 ساعة على بريدك الإلكتروني</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
