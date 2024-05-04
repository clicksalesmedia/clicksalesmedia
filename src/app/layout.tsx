import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import AnimatedCursor from 'react-animated-cursor';
import ScrollToTopButton from './utils/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Create Next App',
    template: '%s - clicksalesmedia Dubai Marketing Agency',
  },
  description: 'clicksalesmedia is here',
  keywords: 'digital marketing, marketing, sales, business to business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Navbar />
        <AnimatedCursor
          innerSize={8}
          outerSize={10}
          color='178, 137, 85'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
          ]}
        />
        {children}
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
