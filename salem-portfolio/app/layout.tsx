import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import { I18nProvider } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const SITE_URL = 'https://salemrizk.com';
const OG_IMAGE = settings.ogImage;
const LOGO_URL =
  'https://ik.imagekit.io/effect/b_%D8%A7%D9%86%D8%A7_%D8%B9%D8%A7%D9%8A%D8%B2_%D8%A7%D9%84%D8%B1%D8%A7%D8%B3_%D8%A8%D8%B3_%D8%B2%D9%8A.png?updatedAt=1781361466755';

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
    default: 'سالم رزق | مدير وسائل التواصل الاجتماعي وخبير إعلانات ميتا',
    template: '%s | سالم رزق',
  },
  description:
    'سالم رزق — مدير وسائل تواصل اجتماعي، خبير إعلانات ميتا، مصمم جرافيك، ومطور مواقع من إدكو، البحيرة، مصر. حقق +3.2M وصول و4.2x ROAS.',
  keywords: [
    'Salem Rizk', 'social media manager Egypt', 'Meta Ads specialist',
    'Facebook advertising Egypt', 'Instagram marketing Egypt',
    'graphic designer Egypt', 'performance marketer', 'digital marketing Egypt',
    'video editing reels', 'content creator Egypt', 'brand building',
    'website development Egypt', 'Edko Beheira Egypt', 'freelance marketer Egypt',
    'سالم رزق', 'مدير وسائل تواصل اجتماعي', 'إعلانات ميتا',
    'تسويق رقمي مصر', 'تصميم جرافيك', 'مونتاج فيديو',
    'إدارة صفحات فيسبوك', 'إنستجرام مصر', 'مطور مواقع',
    'فريلانسر مصر', 'إدكو البحيرة',
  ],
  authors: [{ name: 'Salem Rizk', url: SITE_URL }],
  creator: 'Salem Rizk',
  publisher: 'Salem Rizk',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Salem Rizk Portfolio',
    title: 'سالم رزق | مدير وسائل التواصل الاجتماعي وخبير إعلانات ميتا',
    description:
      'سالم رزق — مدير وسائل تواصل اجتماعي، خبير إعلانات ميتا، مصمم جرافيك، ومطور مواقع. حقق +3.2M وصول و4.2x ROAS لعملائه.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'سالم رزق', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@salemrizk',
    creator: '@salemrizk',
    title: 'سالم رزق | مدير وسائل التواصل الاجتماعي وخبير إعلانات ميتا',
    description: 'سالم رزق — مدير وسائل تواصل اجتماعي، خبير إعلانات ميتا، مصمم جرافيك من مصر.',
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Salem Rizk',
    alternateName: 'سالم رزق',
    jobTitle: 'Social Media Manager & Performance Marketer',
    description: settings.siteDescription,
    url: SITE_URL,
    image: { '@type': 'ImageObject', url: settings.logo, width: 400, height: 400 },
    email: `mailto:${settings.email}`,
    telephone: `+2${settings.whatsapp}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Edko', addressRegion: 'Beheira', addressCountry: 'EG' },
    sameAs: [settings.facebook, settings.instagram, settings.threads, `https://wa.me/${settings.whatsapp}`].filter(l => l !== '#'),
    knowsAbout: ['Social Media Management', 'Meta Ads', 'Facebook Advertising', 'Instagram Marketing', 'Graphic Design', 'Video Editing', 'Digital Marketing', 'Web Development'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Salem Rizk Portfolio',
    description: settings.siteDescription,
    inLanguage: ['ar', 'en'],
    author: { '@id': `${SITE_URL}/#person` },
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
      // Single font variable — less class noise, no CLS from multiple font swaps
      className={`${cairo.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Critical resource hints ── */}
        {/* ImageKit — where all images come from */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

        {/* Preload the LCP image so the browser fetches it immediately */}
        <link
          rel="preload"
          as="image"
          href={LOGO_URL}
          // @ts-expect-error — fetchpriority is valid HTML but not yet in React types
          fetchpriority="high"
        />

        {/* ── Structured data ── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#080808] text-white overflow-x-hidden">
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
