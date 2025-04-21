// components/RootLayout.tsx
import Script from 'next/script';
import { Noto_Sans_Arabic, Noto_Kufi_Arabic, Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import AppContainer from './components/AppContainer';
import { NextAuthProvider } from '@/app/providers';
import { LanguageProvider } from '@/app/providers/LanguageProvider';
import type { Metadata } from 'next';

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

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, params }) => {
  // Determine direction and language based on locale parameter
  const isRtl = params?.locale === 'ar';
  const currentLang = params?.locale || 'ar';
  
  return (
    <html lang={currentLang} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Helper to ensure CSS is loaded before showing content
              (function() {
                if (typeof window !== 'undefined') {
                  const loadState = document.createElement('style');
                  loadState.textContent = 'body::before { content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #272727; z-index: 9999; transition: opacity 0.3s ease, visibility 0.3s ease; }';
                  loadState.id = 'loadStateStyle';
                  document.head.appendChild(loadState);
                  
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      const style = document.getElementById('loadStateStyle');
                      if (style) {
                        style.textContent = 'body::before { opacity: 0; visibility: hidden; }';
                        setTimeout(function() {
                          style.remove();
                        }, 300);
                      }
                    }, 200);
                  });
                }
              })();
            `
          }}
        />
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} ${notoSansArabic.className} ${notoKufiArabic.className}`}>
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
      </body>
    </html>
  );
};

export default RootLayout;