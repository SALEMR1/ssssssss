'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.services, href: '/#services' },
    { label: t.nav.projects, href: '/#projects' },
    { label: t.nav.devProjects, href: '/dev', highlight: true },
    { label: t.nav.results, href: '/#results' },
    { label: t.nav.skills, href: '/#skills' },
    { label: t.nav.contact, href: '/#contact' },
  ];

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');

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
                <span className="font-bold text-saey-navy text-lg leading-none">Salem Rizk</span>
                <span className="block text-[10px] text-saey-muted leading-none tracking-wider mt-0.5">DIGITAL MARKETING</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group rounded-lg ${
                    link.highlight
                      ? 'text-saey-blue hover:bg-blue-50'
                      : 'text-saey-muted hover:text-saey-navy hover:bg-saey-gray'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-saey-gray border border-blue-100 text-saey-muted text-xs font-bold"
                aria-label="Switch language"
              >
                <span className={lang === 'ar' ? 'text-saey-blue' : ''}>AR</span>
                <span className="text-gray-300">|</span>
                <span className={lang === 'en' ? 'text-saey-blue' : ''}>EN</span>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl bg-saey-gray border border-blue-100 text-saey-navy"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X size={20} /></motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}><Menu size={20} /></motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-blue-100 overflow-hidden lg:hidden shadow-lg shadow-blue-900/5"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      link.highlight
                        ? 'text-saey-blue hover:bg-blue-50'
                        : 'text-saey-muted hover:text-saey-navy hover:bg-saey-gray'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link href="/#contact" onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-xl bg-saey-blue text-white font-semibold">
                  {t.nav.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
