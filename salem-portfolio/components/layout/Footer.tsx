'use client';

import Link from 'next/link';
import { Globe, AtSign, Mail, MapPin, MessageCircle, ArrowUpRight, Share2, MessageSquare } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const socials = [
  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${settings.whatsapp}`, color: 'hover:text-green-400' },
  { icon: Globe, label: 'Facebook', href: settings.facebook, color: 'hover:text-blue-400' },
  { icon: AtSign, label: 'Instagram', href: settings.instagram, color: 'hover:text-pink-400' },
  { icon: MessageSquare, label: 'Threads', href: settings.threads, color: 'hover:text-gray-300' },
  { icon: Share2, label: 'LinkedIn', href: settings.linkedin, color: 'hover:text-sky-400' },
  { icon: Mail, label: 'Email', href: `mailto:${settings.email}`, color: 'hover:text-violet-400' },
];

const svcHrefs = ['/#services','/#services','/#services','/#services','/#services'];
const projHrefs = ['/projects/esco','/projects/vako','/projects/ttc'];
const quickHrefs = ['/#about','/#results','/#skills','/#process','/#faq'];

interface FooterCol {
  title: string;
  links: readonly string[];
  hrefs: string[];
}

export default function Footer() {
  const { t } = useI18n();
  const cols: FooterCol[] = [
    { title: t.footer.sections.Services, links: t.footer.links.services, hrefs: svcHrefs },
    { title: t.footer.sections.Projects, links: t.footer.links.projects, hrefs: projHrefs },
    { title: t.footer.sections.Quick, links: t.footer.links.quick, hrefs: quickHrefs },
  ];
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                <img src="https://ik.imagekit.io/effect/b_%D8%A7%D9%86%D8%A7_%D8%B9%D8%A7%D9%8A%D8%B2_%D8%A7%D9%84%D8%B1%D8%A7%D8%B3_%D8%A8%D8%B3_%D8%B2%D9%8A.png?updatedAt=1781361466755" alt="Salem Rizk" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-bold text-white text-xl leading-none">Salem Rizk</span>
                <span className="block text-xs text-gray-500 leading-none tracking-wider mt-1">DIGITAL MARKETING</span>
              </div>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} className="text-violet-400" />
              <span>{t.footer.location}</span>
            </div>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link key={s.label} href={s.href} aria-label={s.label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.color} hover:bg-white/10 hover:border-white/20 transition-all duration-200`}>
                  <s.icon size={16} />
                </Link>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((label, i) => (
                  <li key={label}>
                    <Link href={col.hrefs[i] || '#'} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group">
                      {label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Salem Rizk. {t.footer.copyright}</p>
          <p className="text-gray-600 text-sm">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
