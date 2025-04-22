// components/RootLayout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from './providers/LanguageProvider';
import { Analytics } from '@vercel/analytics/react';
import { AiDataProvider } from './providers/AiDataProvider';
import Script from 'next/script';
import './globals.css';
import React from 'react';
import AppContainer from './components/AppContainer';
import { NextAuthProvider } from '@/app/providers';
import type { Metadata } from 'next';
import { Noto_Sans_Arabic, Noto_Kufi_Arabic, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'] });
const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: {
    default: 'Clicksalesmedia: AI Performance Marketing Agency Dubai',
    template: '%s | Clicksalesmedia Dubai Marketing Agency',
  },
  description: "Welcome to Clicksalesmedia, the premier AI performance marketing agency dedicated to elevating your brand's online presence. We specialize in leveraging cutting-edge artificial intelligence and machine learning technologies to deliver unparalleled results for your business. Our expert team crafts data-driven strategies that optimize your digital marketing campaigns, ensuring maximum ROI and growth.",
  keywords: 'Marketing agency Dubai, AI Marketing agency Dubai, Web solutions Dubai, business to business marketing, performance marketing Dubai, digital marketing agency UAE',
  alternates: {
    languages: {
      'en': 'https://www.clicksalesmedia.com/en',
      'ar': 'https://www.clicksalesmedia.com/ar'
    },
    canonical: 'https://www.clicksalesmedia.com'
  },
  metadataBase: new URL('https://www.clicksalesmedia.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Clicksalesmedia: AI Performance Marketing Agency Dubai',
    description: "Elevate your brand's online presence with Clicksalesmedia, the premier AI performance marketing agency in Dubai",
    url: 'https://www.clicksalesmedia.com',
    siteName: 'Clicksalesmedia',
    images: [
      {
        url: 'https://www.clicksalesmedia.com/clicksalesmedialogo.png',
        width: 800,
        height: 600,
        alt: 'Clicksalesmedia Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clicksalesmedia: AI Performance Marketing Agency Dubai',
    description: "AI-powered marketing strategies for maximum ROI and business growth in Dubai",
    creator: '@clicksalesmedia',
    images: ['https://www.clicksalesmedia.com/clicksalesmedialogo.png'],
  },
  verification: {
    google: 'verification-code', // Replace with your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current language from URL or set default to English
  let currentLang = 'en';
  let isRtl = false;
  
  // Handle client-side logic separately to prevent hydration mismatch
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    currentLang = pathname.includes('/ar') ? 'ar' : 'en';
    isRtl = currentLang === 'ar';
  }
  
  return (
    <html lang={currentLang} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="/logo.svg" 
          as="image" 
          type="image/svg+xml" 
          fetchPriority="high"
        />
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://cdn.jsdelivr.net" 
        />
        
        {/* Advanced preloading strategy for critical resources */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/css/app/page.css" as="style" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} ${notoSansArabic.className} ${notoKufiArabic.className} bg-bgColor dark:bg-[#121212] text-textColor dark:text-white h-screen overflow-x-hidden`}>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-WBLD4686'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <NextAuthProvider>
          <LanguageProvider>
            <AppContainer>
              {children}
            </AppContainer>
          </LanguageProvider>
        </NextAuthProvider>

        <Script
          id='gtm-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WBLD4686');`,
          }}
        />
      </body>
    </html>
  );
}