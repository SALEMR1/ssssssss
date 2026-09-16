import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import { I18nProvider } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const SITE_URL = 'https://salemrizk.online';
const OG_IMAGE = `https://salemrizk.online${settings.ogImage}`;
const LOGO_URL = '/logo.png';

// Only load Cairo — it covers Arabic + Latin, eliminating 2 extra font requests.
// Inter & Syne are dropped; system-ui fallback is instant (zero CLS, zero network).
const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
  // Only load the weights actually used — reduces font file size ~60%
  weight: ['400', '600', '700', '900'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'م. سالم رزق | مؤسس سعي للتسويق الرقمي — مصر',
    template: '%s | سعي — م. سالم رزق',
  },
  description:
    'م. سالم رزق، مؤسس سعي للتسويق الرقمي — خبير إعلانات ميتا، مدير تسويق رقمي، مصمم جرافيك ومطور مواقع من إدكو، البحيرة، مصر. حقق +3.2M وصول و4.2x ROAS لعملائه.',
  keywords: [
    'م. سالم رزق', 'سالم رزق', 'سعي', 'سعي للتسويق الرقمي',
    'مؤسس سعي', 'مدير تسويق رقمي مصر', 'خبير إعلانات ميتا',
    'إعلانات فيسبوك مصر', 'تسويق إنستجرام مصر',
    'مصمم جرافيك مصر', 'مونتاج فيديو', 'تطوير مواقع مصر',
    'فريلانسر مصر', 'إدكو البحيرة', 'salemrizk.online',
    'Salem Rizk', 'Saey', 'Saey Digital Marketing',
    'social media manager Egypt', 'Meta Ads specialist Egypt',
    'Facebook advertising Egypt', 'performance marketer Egypt',
    'graphic designer Egypt', 'website development Egypt',
    'freelance marketer Egypt', 'Edko Beheira Egypt',
    'salemrizk online', 'salem rizk online',
  ],
  authors: [{ name: 'م. سالم رزق — سعي', url: SITE_URL }],
  creator: 'م. سالم رزق',
  publisher: 'سعي للتسويق الرقمي',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ar': SITE_URL,
      'ar-EG': SITE_URL,
      'en': `${SITE_URL}?lang=en`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'سعي — م. سالم رزق',
    title: 'م. سالم رزق | مؤسس سعي للتسويق الرقمي',
    description:
      'م. سالم رزق، مؤسس سعي — خبير إعلانات ميتا، مدير تسويق رقمي، مصمم جرافيك ومطور مواقع. حقق +3.2M وصول و4.2x ROAS لعملائه في مصر والخارج.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'م. سالم رزق — مؤسس سعي', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@salemrizk',
    creator: '@salemrizk',
    title: 'م. سالم رزق | مؤسس سعي للتسويق الرقمي',
    description: 'م. سالم رزق، مؤسس سعي — خبير إعلانات ميتا، مدير تسويق رقمي، مصمم جرافيك من مصر.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Digital Marketing & Web Development',
  applicationName: 'Salem Rizk Portfolio',
  manifest: '/manifest.webmanifest',
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#07152E',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'م. سالم رزق',
    alternateName: ['سالم رزق', 'Salem Rizk', 'Eng. Salem Rizk'],
    jobTitle: 'مؤسس سعي للتسويق الرقمي | Digital Marketing Director & Web Developer',
    description: settings.siteDescription,
    url: SITE_URL,
    image: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 400, height: 400 },
    email: `mailto:${settings.email}`,
    telephone: `+2${settings.whatsapp}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Edko', addressRegion: 'Beheira', addressCountry: 'EG' },
    sameAs: [settings.facebook, settings.instagram, settings.threads, `https://wa.me/${settings.whatsapp}`].filter(l => l !== '#'),
    knowsAbout: [
      'Social Media Management', 'Meta Ads', 'Facebook Advertising',
      'Instagram Marketing', 'Graphic Design', 'Video Editing',
      'Digital Marketing', 'Web Development', 'Brand Strategy',
      'Performance Marketing', 'Content Creation',
    ],
    founder: {
      '@type': 'Organization',
      name: 'سعي للتسويق الرقمي',
      alternateName: 'Saey Digital Marketing',
      url: SITE_URL,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'سعي — م. سالم رزق',
    alternateName: 'Saey — Salem Rizk',
    description: settings.siteDescription,
    inLanguage: ['ar', 'en'],
    author: { '@id': `${SITE_URL}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Logo schema — يجعل اللوجو يظهر في نتائج Google
  const logoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'سعي للتسويق الرقمي',
    alternateName: ['Saey Digital Marketing', 'Salem Rizk', 'سالم رزق'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo.png`,
      contentUrl: `${SITE_URL}/logo.png`,
      width: 1080,
      height: 1080,
      caption: 'سعي للتسويق الرقمي — م. سالم رزق',
    },
    image: { '@id': `${SITE_URL}/#logo` },
    sameAs: [
      settings.facebook,
      settings.instagram,
      settings.threads,
      `https://wa.me/${settings.whatsapp}`,
    ].filter(l => l && l !== '#'),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Salem Rizk — Digital Marketing Services',
    provider: { '@id': `${SITE_URL}/#person` },
    url: SITE_URL,
    areaServed: { '@type': 'Country', name: 'Egypt' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads & Facebook Advertising' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing & Reels' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
      ],
    },
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      // Single font variable — less class noise, no CLS from multiple font swaps
      className={`${cairo.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Google Analytics ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MM0YWJ93L4" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MM0YWJ93L4');
        `}} />

        {/* ── hreflang — bilingual AR/EN ── */}
        <link rel="alternate" hrefLang="ar" href="https://salemrizk.online" />
        <link rel="alternate" hrefLang="ar-EG" href="https://salemrizk.online" />
        <link rel="alternate" hrefLang="en" href="https://salemrizk.online" />
        <link rel="alternate" hrefLang="x-default" href="https://salemrizk.online" />

        {/* ── Critical resource hints ── */}
        {/* ImageKit — where all images come from */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

        {/* Preload the LCP image so the browser fetches it immediately */}
        <link
          rel="preload"
          as="image"
          href={LOGO_URL}
          fetchPriority="high"
        />

        {/* ── Structured data ── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(logoSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <I18nProvider>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
