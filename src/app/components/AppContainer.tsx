// components/AppContainer.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import LoadingScreen from './LoadingScreen';
import Navbar from './Header/Navbar';
import ScrollToTopButton from '../utils/ScrollToTopButton';
import dynamic from 'next/dynamic';
import { useLanguage } from '../providers/LanguageProvider';

// Dynamically import AnimatedCursor with no SSR
const AnimatedCursor = dynamic(
  () => import('react-animated-cursor').then((mod) => mod.default),
  { ssr: false }
);

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const { isInitialized } = useLanguage();

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    setIsMounted(true);
    if (pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  // Ensure resources are loaded before showing content
  useEffect(() => {
    if (isMounted && isInitialized) {
      // Add a small delay to ensure all resources load properly
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isMounted, isInitialized]);

  // Don't render content until client-side hydration is complete
  if (!isMounted || !isInitialized) {
    return <LoadingScreen onLoaded={() => {}} />;
  }

  return (
    <div>
      {!isLoaded && <LoadingScreen onLoaded={handleLoaded} />}
      {isLoaded && (
        <>
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
        </>
      )}
    </div>
  );
};

export default AppContainer;
