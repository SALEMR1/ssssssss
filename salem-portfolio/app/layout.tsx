import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import { I18nProvider } from '@/lib/i18n/context';
import ServiceWorkerRegister from '@/components/layout/ServiceWorkerRegister';
import PromoBanner from '@/components/layout/PromoBanner';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import settings from '@/data/settings.json';

const SITE_URL = 'https://salemrizk.online';
// settings.ogImage is already an absolute URL — no prefix needed
const OG_IMAGE = settings.ogImage;
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
    default: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا، تصميم، تطوير مواقع',
    template: '%s | سعي — م. سالم رزق',
  },
  description:
    'سعي للتسويق الرقمي — فريق م. سالم رزق. خبرة في إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك، مونتاج فيديو وتطوير مواقع. نتائج حقيقية قابلة للقياس.',
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
  // No layout-level canonical or hreflang — each page sets its own via alternates
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'سعي — م. سالم رزق',
    title: 'سعي للتسويق الرقمي | م. سالم رزق — إعلانات ميتا، تصميم، تطوير مواقع',
    description:
      'سعي للتسويق الرقمي — فريق م. سالم رزق. إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك ومطور مواقع. نتائج حقيقية لعملاء في مصر والخارج.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'م. سالم رزق — مؤسس سعي', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@salemrizk',
    creator: '@salemrizk',
    title: 'م. سالم رزق | سعي للتسويق الرقمي — مؤسس سعي',
    description: 'سعي للتسويق الرقمي — فريق م. سالم رزق. إعلانات ميتا، تصميم جرافيك، تطوير مواقع من مصر.',
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
  icons: {
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#146CFF',
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
    email: settings.email,
    telephone: `+2${settings.whatsapp}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Edko', addressRegion: 'Beheira', addressCountry: 'EG' },
    sameAs: [settings.facebook, settings.instagram, settings.threads, `https://wa.me/${settings.whatsapp}`].filter(Boolean).filter(l => l !== '#'),
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

  // LocalBusiness schema — يظهر الموقع في Google Maps وSearch
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'سعي للتسويق الرقمي',
    alternateName: 'Saey Digital Marketing',
    description: 'وكالة تسويق رقمي متكاملة — إعلانات ميتا، إدارة وسائل التواصل، تصميم جرافيك، مونتاج فيديو، وتطوير مواقع.',
    url: SITE_URL,
    telephone: `+2${settings.whatsapp}`,
    email: settings.email,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    hasMap: 'https://share.google/eXBtlDnSXtqe8UsxX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'إدكو',
      addressLocality: 'Edko',
      addressRegion: 'Beheira',
      addressCountry: 'EG',
      postalCode: '22745',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '31.3000',
      longitude: '30.2833',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
    areaServed: [
      { '@type': 'City', name: 'إدكو' },
      { '@type': 'State', name: 'البحيرة' },
      { '@type': 'Country', name: 'مصر' },
    ],
    sameAs: [
      settings.facebook,
      `https://wa.me/${settings.whatsapp}`,
      SITE_URL,
    ].filter(Boolean),
    founder: { '@id': `${SITE_URL}/#person` },
    priceRange: '$$',
    currenciesAccepted: 'EGP, USD',
    paymentAccepted: 'Cash, Bank Transfer',
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
        {/* hreflang is handled by metadata.alternates.languages above — no manual tags needed */}

        {/* ── Critical resource hints ── */}
        {/* Google Analytics / GTM */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        {/* ── Google Analytics — loaded after page is interactive ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MM0YWJ93L4"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MM0YWJ93L4');
        `}</Script>
        <ServiceWorkerRegister />
        <I18nProvider>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <PromoBanner />
          <WhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}
