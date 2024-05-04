// _app.tsx
import { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css'; // Adjust this import to your needs

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  useEffect(() => {
    // Add GTM script dynamically if in the browser environment
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX`; // Replace GTM-XXXXXXX with your GTM ID
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Add the noscript tag to support GTM if JS is disabled */}
      <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
