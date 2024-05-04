// _app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
        {/* Any other meta tags */}
      </Head>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WBLD4686');`, // Replace GTM-WBLD4686 with your GTM ID
        }}
      />
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBLD4686" // Replace GTM-WBLD4686 with your GTM ID
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
        </iframe>
      </noscript>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
