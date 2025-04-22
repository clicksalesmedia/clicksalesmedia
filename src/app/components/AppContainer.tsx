// components/AppContainer.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';
import ScrollToTopButton from '../utils/ScrollToTopButton';
import dynamic from 'next/dynamic';

// Load cursor with ssr disabled
const AnimatedCursor = dynamic(
  () => import('react-animated-cursor').then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // Mark mounted immediately to render content
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Scroll to top when path changes
    if (pathname && window) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Show children but use a min-height container initially
  if (!isMounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div>
      {!isDashboard && <Navbar />}
      
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
      
      {!isDashboard && (
        <>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </div>
  );
};

export default AppContainer;
