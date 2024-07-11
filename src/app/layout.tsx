// components/RootLayout.tsx
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import AppContainer from './components/AppContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Clicksalesmedia: AI Perfomance Marketing Agency',
    template: '%s - clicksalesmedia Dubai Marketing Agency',
  },
  description: "Welcome to Clicksalesmedia, the premier AI performance marketing agency dedicated to elevating your brand's online presence. We specialize in leveraging cutting-edge artificial intelligence and machine learning technologies to deliver unparalleled results for your business. Our expert team crafts data-driven strategies that optimize your digital marketing campaigns, ensuring maximum ROI and growth.",
  keywords: 'Marketing agency, AI Marketing agency, Web solutions, business to business, performance marketing',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <Script
          id='gtm-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WBLD4686');`, // Replace GTM-WBLD4686 with your GTM ID
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-WBLD4686' // Replace GTM-WBLD4686 with your GTM ID
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <AppContainer>
          {children}
        </AppContainer>
      </body>
    </html>
  );
};

export default RootLayout;
