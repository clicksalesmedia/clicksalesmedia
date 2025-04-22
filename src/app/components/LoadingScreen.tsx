'use client';

import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window === 'undefined') return;
    
    // Set a minimum display time for the loading screen
    const minDisplayTime = setTimeout(() => {
      // This ensures the loading screen shows for at least 2 seconds
      const contentLoadedHandler = () => {
        setIsVisible(false);
        onLoaded();
      };
      
      if (document.readyState === 'complete') {
        contentLoadedHandler();
      } else {
        window.addEventListener('load', contentLoadedHandler);
        
        // Fallback in case the load event never fires
        const fallback = setTimeout(() => {
          setIsVisible(false);
          onLoaded();
        }, 3000);
        
        return () => {
          window.removeEventListener('load', contentLoadedHandler);
          clearTimeout(fallback);
        };
      }
    }, 2000);
    
    return () => clearTimeout(minDisplayTime);
  }, [onLoaded]);

  // Don't render during SSR
  if (!isMounted) return null;
  
  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: '#222222',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      transition: 'opacity 0.5s ease-out',
      opacity: isVisible ? 1 : 0,
    }}>
      <object
        type="image/svg+xml"
        data="/svg/clicksalesmedia-symbol-v.svg"
        width="100"
        height="100"
        style={{ width: '100px', height: '100px' }}
      >
        svg-animation
      </object>
    </div>
  );
};

export default LoadingScreen;
