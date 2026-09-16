'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, AtSign, Mail, MapPin, MessageCircle, ArrowUpRight, Share2, MessageSquare } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const socials = [
  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${settings.whatsapp}` },
  { icon: Globe, label: 'Facebook', href: settings.facebook },
  { icon: AtSign, label: 'Instagram', href: settings.instagram },
  { icon: MessageSquare, label: 'Threads', href: settings.threads },
  { icon: Share2, label: 'LinkedIn', href: settings.linkedin },
  { icon: Mail, label: 'Email', href: `mailto:${settings.email}` },
];

const svcHrefs = ['/#services','/#services','/#services','/#services','/#services'];
const projHrefs = ['/projects/esco','/projects/vako','/projects/ttc','/projects/dr-salman'];
const quickHrefs = ['/about','/#results','/#skills','/#process','/#faq'];

interface FooterCol { title: string; links: readonly string[]; hrefs: string[]; }

export default function Footer() {
  const { t } = useI18n();
  const cols: FooterCol[] = [
    { title: t.footer.sections.Services, links: t.footer.links.services, hrefs: svcHrefs },
    { title: t.footer.sections.Projects, links: t.footer.links.projects, hrefs: projHrefs },
    { title: t.footer.sections.Quick, links: t.footer.links.quick, hrefs: quickHrefs },
  ];
  const activeSocials = socials.filter((s) => s.href && s.href !== '#' && s.href !== 'https://wa.me/' && s.href !== 'mailto:');

  return (
    <footer className="relative bg-saey-navy pt-20 pb-8 overflow-hidden">
      {/* Subtle blue glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-saey-blue/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                <Image src="/logo.png" alt="Salem Rizk" width={48} height={48} className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-bold text-white text-xl leading-none">م. سالم رزق</span>
                <span className="block text-xs text-blue-300/70 leading-none tracking-wider mt-1">سعي للتسويق الرقمي</span>
              </div>
            </Link>
            <p className="text-blue-200/60 leading-relaxed text-sm max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2 text-sm text-blue-200/60">
              <MapPin size={14} className="text-saey-blue" />
              <span>{t.footer.location}</span>
            </div>
            <div className="flex items-center gap-3">
              {activeSocials.map((s) => (
                <Link key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/60 hover:text-white hover:bg-saey-blue/20 hover:border-saey-blue/40 transition-all duration-200">
                  <s.icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((label, i) => (
                  <li key={label}>
                    <Link href={col.hrefs[i] || '#'}
                      className="text-blue-200/55 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group">
                      {label}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-200/40 text-sm">© {new Date().getFullYear()} Salem Rizk. {t.footer.copyright}</p>
          <p className="text-blue-200/40 text-sm">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
