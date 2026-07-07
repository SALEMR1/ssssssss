'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages } from 'lucide-react';
import { useI18n, type Lang } from '@/lib/i18n/context';

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
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/50 transition-shadow duration-300">
                <img src="https://ik.imagekit.io/effect/b_%D8%A7%D9%86%D8%A7_%D8%B9%D8%A7%D9%8A%D8%B2_%D8%A7%D9%84%D8%B1%D8%A7%D8%B3_%D8%A8%D8%B3_%D8%B2%D9%8A.png?updatedAt=1781361466755" alt="Salem Rizk" className="w-full h-full object-cover rounded-full" fetchPriority="high" />
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none">Salem Rizk</span>
                <span className="block text-[10px] text-gray-500 leading-none tracking-wider mt-0.5">DIGITAL MARKETING</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${
                    link.highlight
                      ? 'text-indigo-400 hover:text-indigo-300'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    link.highlight
                      ? 'bg-gradient-to-r from-indigo-500 to-violet-500'
                      : 'bg-gradient-to-r from-violet-500 to-pink-500'
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA + Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language switcher */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200"
                aria-label="Switch language"
              >
                <Languages size={14} className="text-violet-400" />
                <span className={lang === 'ar' ? 'text-violet-400 font-bold' : 'text-gray-400'}>AR</span>
                <span className="text-gray-600">|</span>
                <span className={lang === 'en' ? 'text-violet-400 font-bold' : 'text-gray-400'}>EN</span>
              </button>

              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Mobile: lang + menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold hover:bg-white/10 transition-all duration-200"
                aria-label="Switch language"
              >
                <span className={lang === 'ar' ? 'text-violet-400' : 'text-gray-400'}>AR</span>
                <span className="text-gray-600">|</span>
                <span className={lang === 'en' ? 'text-violet-400' : 'text-gray-400'}>EN</span>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                      <Menu size={20} />
                    </motion.div>
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
            className="fixed top-20 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden lg:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      link.highlight
                        ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold"
                >
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
