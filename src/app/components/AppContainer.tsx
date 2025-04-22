// components/AppContainer.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer/Footer';
import LoadingOptimized from './LoadingOptimized';
import Navbar from './Header/Navbar';
import ScrollToTopButton from '../utils/ScrollToTopButton';
import dynamic from 'next/dynamic';
import ImagePreloader from './ImagePreloader';

// Dynamically import AnimatedCursor with no SSR and low priority
const AnimatedCursor = dynamic(
  () => import('react-animated-cursor').then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // Mark as mounted immediately
    setIsMounted(true);
    
    // For returning visits in the same session, load instantly
    const hasSessionStorage = typeof sessionStorage !== 'undefined';
    const isInitialized = hasSessionStorage && sessionStorage.getItem('appInitialized');
    
    if (isInitialized) {
      // Skip loading animation for returning visitors
      setIsLoaded(true);
    } else {
      // Very short loading time for new visitors - just enough to show the logo briefly
      const timer = setTimeout(() => {
        setIsLoaded(true);
        if (hasSessionStorage) {
          sessionStorage.setItem('appInitialized', 'true');
        }
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Scroll to top when pathname changes
    if (pathname && window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Delay the loading of non-critical resources
    const loadNonCriticalResources = () => {
      // Load non-critical JS or styles here if needed
    };
    
    // Load non-critical resources after page is visible
    if (document.readyState === 'complete') {
      loadNonCriticalResources();
    } else {
      window.addEventListener('load', loadNonCriticalResources);
      return () => window.removeEventListener('load', loadNonCriticalResources);
    }
  }, [pathname]);

  // Only render client-side components after mounting
  if (!isMounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div>
      {/* Always include ImagePreloader to ensure fast image loading */}
      <ImagePreloader />
      
      {/* Only show loading for new visitors and very briefly */}
      {!isLoaded && <LoadingOptimized />}
      
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
