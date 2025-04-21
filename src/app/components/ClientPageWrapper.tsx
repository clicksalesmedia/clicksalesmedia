'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from "@/app/components/LoadingSpinner";

// Dynamic import for 3D components - this can only be done in a client component
const ModelLoader = dynamic(() => import('./3d/ModelLoader'), {
  loading: () => <LoadingSpinner size="large" />,
  ssr: false
});

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // This code only runs on the client
    if (typeof window !== 'undefined') {
      // Force a refresh on first visit in a new browser
      if (!sessionStorage.getItem('page_initialized')) {
        sessionStorage.setItem('page_initialized', 'true');
        
        // Add a small delay to make sure all resources start loading
        setTimeout(() => {
          setIsLoaded(true);
          setIsInitialRender(false);
        }, 300);
        
        // If first load in a new browser, listen for navigation and force a reload
        // This helps with loading issues
        const handleBeforeUnload = () => {
          sessionStorage.setItem('should_reload', 'true');
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      } else {
        // For subsequent visits, just set as loaded
        setIsLoaded(true);
        setIsInitialRender(false);
      }
    }
  }, []);
  
  // Preload critical images
  useEffect(() => {
    if (!isInitialRender) {
      const criticalImages = [
        '/clicksalesmedia-marketing-agency.png',
        '/mesh-clicksalesmedia.png',
      ];
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isInitialRender]);

  if (!isLoaded) {
    return <LoadingSpinner size="large" fullScreen />;
  }

  // Use ModelLoader as a wrapper to ensure proper 3D/complex content loading
  return (
    <ModelLoader minLoadTime={800}>
      {children}
    </ModelLoader>
  );
} 