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
        {/* Advanced preloading strategy for critical resources */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/css/app/page.css" as="style" />
        <link rel="preload" href="/_next/static/chunks/main-app.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/webpack.js" as="script" />
        
        {/* Critical preloading script */}
        <Script
          src="/preload-resources.js"
          strategy="beforeInteractive"
          id="preload-resources"
        />
        
        {/* Force hard refresh for new browsers to avoid partial loading issues */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Force a hard refresh on first visit to avoid partial loading issues
              (function() {
                try {
                  if (typeof window !== 'undefined') {
                    // Check if this is the first visit in this browser session
                    if (!sessionStorage.getItem('app_initialized')) {
                      // Set the flag for future checks
                      sessionStorage.setItem('app_initialized', 'true');
                      
                      // Handle navigation changes to force reload on initial navigation
                      const originalPushState = history.pushState;
                      const originalReplaceState = history.replaceState;
                      
                      history.pushState = function() {
                        originalPushState.apply(this, arguments);
                        window.dispatchEvent(new Event('pushstate'));
                        window.dispatchEvent(new Event('locationchange'));
                      };
                      
                      history.replaceState = function() {
                        originalReplaceState.apply(this, arguments);
                        window.dispatchEvent(new Event('replacestate'));
                        window.dispatchEvent(new Event('locationchange'));
                      };
                      
                      window.addEventListener('popstate', function() {
                        window.dispatchEvent(new Event('locationchange'));
                      });
                      
                      let firstNavDone = false;
                      window.addEventListener('locationchange', function() {
                        if (!firstNavDone) {
                          firstNavDone = true;
                          // Force a reload after first navigation to ensure everything loads properly
                          setTimeout(() => { window.location.reload(); }, 100);
                        }
                      });
                    }
                  }
                } catch (e) {
                  console.error('Navigation initialization error:', e);
                }
              })();
            `
          }}
        />
        
        {/* Enhanced loading overlay */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced CSS loading mechanism
              (function() {
                if (typeof window !== 'undefined') {
                  // Create and apply loading overlay
                  const loadState = document.createElement('style');
                  loadState.textContent = 'body::before { content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #272727; z-index: 9999; transition: opacity 0.5s ease, visibility 0.5s ease; }';
                  loadState.id = 'loadStateStyle';
                  document.head.appendChild(loadState);
                  
                  // Pre-cache key images using Image API
                  const cacheImages = [
                    '/images/hero/hero-bg.jpg',
                    '/images/logo.png',
                    '/clicksalesmedialogo.png'
                  ];
                  
                  const preloadImages = () => {
                    cacheImages.forEach(src => {
                      const img = new Image();
                      img.src = src;
                    });
                  };
                  
                  // More sophisticated load detection
                  let allLoaded = false;
                  const checkFullyLoaded = () => {
                    if (allLoaded) return;
                    
                    // Check if document is complete and has been visible for at least 800ms
                    if (document.readyState === 'complete') {
                      setTimeout(() => {
                        allLoaded = true;
                        const style = document.getElementById('loadStateStyle');
                        if (style) {
                          style.textContent = 'body::before { opacity: 0; visibility: hidden; }';
                          setTimeout(() => {
                            style.remove();
                          }, 500);
                        }
                      }, 800);
                    }
                  };
                  
                  // Robust event listeners to ensure loading overlay removal
                  window.addEventListener('load', checkFullyLoaded);
                  window.addEventListener('DOMContentLoaded', preloadImages);
                  
                  // Fallback timer to ensure overlay is eventually removed
                  setTimeout(checkFullyLoaded, 5000);
                  
                  // Check periodically
                  const loadCheckInterval = setInterval(() => {
                    if (document.readyState === 'complete') {
                      checkFullyLoaded();
                      clearInterval(loadCheckInterval);
                    }
                  }, 200);
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