import type { Metadata } from 'next';
import { Inter, Syne, Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import { I18nProvider } from '@/lib/i18n/context';
import settings from '@/data/settings.json';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: settings.siteTitle,
  description: settings.siteDescription,
  keywords: [
    'social media manager',
    'Meta Ads specialist',
    'Facebook advertising',
    'graphic designer Egypt',
    'performance marketer',
    'Salem Rizk',
    'Damanhour Egypt',
    'مدير وسائل تواصل اجتماعي',
    'سالم رزق',
    'digital marketing Egypt',
    'social media marketing',
    'Instagram marketing',
    'video editing',
    'content creation',
    'brand building',
  ],
  authors: [{ name: settings.brandName }],
  creator: settings.brandName,
  publisher: settings.brandName,
  metadataBase: new URL('https://salemrizk.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar-EG': '/ar',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    title: settings.siteTitle,
    description: settings.siteDescription,
    siteName: settings.brandName,
    images: [
      {
        url: settings.ogImage,
        width: 1200,
        height: 630,
        alt: settings.brandName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: settings.siteTitle,
    description: settings.siteDescription,
    creator: settings.twitterHandle,
    images: [settings.ogImage],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.brandName,
    jobTitle: 'Social Media Manager & Performance Marketer',
    description: settings.siteDescription,
    url: 'https://salemrizk.com',
    image: settings.logo,
    email: settings.email,
    telephone: settings.whatsapp,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.location.split(',')[0],
      addressCountry: 'EG',
    },
    sameAs: [
      settings.facebook,
      settings.instagram,
      settings.linkedin,
      `https://twitter.com/${settings.twitterHandle.replace('@', '')}`,
    ].filter(link => link !== '#'),
  };

  return (
    // Default to Arabic — dir/lang will be patched client-side by I18nProvider
    <html lang="ar" dir="rtl" className={`${inter.variable} ${syne.variable} ${cairo.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
