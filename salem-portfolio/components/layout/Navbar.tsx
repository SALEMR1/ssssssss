'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages, Home, Briefcase, Star, Phone, Code } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useI18n();
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when route changes
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: t.nav.home,        href: '/' },
    { label: t.nav.about,       href: '/about' },
    { label: t.nav.services,    href: '/#services' },
    { label: t.nav.projects,    href: '/#projects' },
    { label: t.nav.devProjects, href: '/dev', highlight: true },
    { label: t.nav.results,     href: '/#results' },
    { label: t.nav.skills,      href: '/#skills' },
    { label: t.nav.contact,     href: '/#contact' },
  ];

  const bottomNav = [
    { label: t.nav.home,        href: '/',          icon: Home },
    { label: t.nav.services,    href: '/#services',  icon: Star },
    { label: t.nav.cta,         href: '/#contact',   icon: Phone, isPrimary: true },
    { label: t.nav.projects,    href: '/#projects',  icon: Briefcase },
    { label: t.nav.devProjects, href: '/dev',         icon: Code },
  ];

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');

  /** Returns true when the link href matches the current page */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    // For hash links (/#contact etc.) check the page path only
    const path = href.split('#')[0];
    return path ? pathname === path : false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm shadow-blue-900/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 group-hover:ring-saey-blue transition-all duration-300">
                <Image src="/logo.png" alt="Salem Rizk" width={40} height={40} priority className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-bold text-saey-navy text-lg leading-none">م. سالم رزق</span>
                <span className="block text-[10px] text-saey-muted leading-none tracking-wider mt-0.5">سعي للتسويق الرقمي</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      active
                        ? 'text-saey-blue bg-blue-50 font-semibold'
                        : link.highlight
                        ? 'text-saey-blue hover:bg-blue-50'
                        : 'text-saey-muted hover:text-saey-navy hover:bg-saey-gray'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-saey-blue" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-saey-gray border border-blue-100 text-saey-muted text-sm font-semibold hover:border-blue-300 hover:text-saey-navy transition-all duration-200"
                aria-label="Switch language"
              >
                <Languages size={14} className="text-saey-blue" />
                <span className={lang === 'ar' ? 'text-saey-blue font-bold' : ''}>AR</span>
                <span className="text-gray-300">|</span>
                <span className={lang === 'en' ? 'text-saey-blue font-bold' : ''}>EN</span>
              </button>

              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-xl bg-saey-blue text-white text-sm font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Mobile top-right controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1 px-3 rounded-xl bg-saey-gray border border-blue-100 text-saey-muted text-xs font-bold"
                aria-label="Switch language"
              >
                <span className={lang === 'ar' ? 'text-saey-blue' : ''}>AR</span>
                <span className="text-gray-300">|</span>
                <span className={lang === 'en' ? 'text-saey-blue' : ''}>EN</span>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-saey-gray border border-blue-100 text-saey-navy"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait">
                  {menuOpen
                    ? <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X size={20} /></motion.div>
                    : <motion.div key="open"  initial={{ rotate: 90 }}  animate={{ rotate: 0 }} exit={{ rotate: -90 }}><Menu size={20} /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-blue-100 overflow-hidden lg:hidden shadow-lg shadow-blue-900/5"
          >
            <div className="px-6 py-4 pb-6 space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div key={link.href} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`block px-4 py-3 rounded-xl transition-colors duration-200 font-medium text-sm ${
                        active
                          ? 'text-saey-blue bg-blue-50 font-semibold'
                          : link.highlight
                          ? 'text-saey-blue hover:bg-blue-50'
                          : 'text-saey-muted hover:text-saey-navy hover:bg-saey-gray'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Navigation Bar ─────────────────────────────────── */}
      <nav
        dir={isRTL ? 'rtl' : 'ltr'}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-[0_-4px_20px_rgba(20,108,255,0.07)]"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-2 h-16">
          {bottomNav.map((item) => {
            const Icon   = item.icon;
            const active = isActive(item.href);

            if (item.isPrimary) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className="flex flex-col items-center justify-center -mt-5 min-w-[56px]"
                >
                  <div className="w-14 h-14 rounded-full bg-saey-blue flex items-center justify-center shadow-lg shadow-blue-300/50 active:scale-95 transition-transform">
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-[9px] font-bold text-saey-blue mt-0.5">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] px-2 rounded-xl transition-colors active:bg-saey-gray"
              >
                <Icon
                  size={20}
                  className={active ? 'text-saey-blue' : 'text-saey-muted'}
                />
                <span className={`text-[9px] font-semibold ${active ? 'text-saey-blue' : 'text-saey-muted'}`}>
                  {item.label}
                </span>
                {/* Active dot */}
                {active && <span className="w-1 h-1 rounded-full bg-saey-blue" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
