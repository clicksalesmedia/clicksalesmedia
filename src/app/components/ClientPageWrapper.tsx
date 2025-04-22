'use client';

import React, { useEffect, useState } from 'react';
import LoadingOptimized from '@/app/components/LoadingOptimized';
import ImagePreloader from '@/app/components/ImagePreloader';

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [isNewSession, setIsNewSession] = useState(false);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  useEffect(() => {
    // Start preloading images immediately
    if (typeof window !== 'undefined') {
      // Check if this is a new browser session (first visit in this tab)
      const isFirstVisit = !sessionStorage.getItem('hasVisited');
      setIsNewSession(isFirstVisit);
      
      // Check if the user has visited the site before (across sessions)
      const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
      setHasLoadedBefore(!!hasVisitedBefore);
      
      // Mark session as visited
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Set client-side rendering flag
    setIsClient(true);
    
    // Add preload hints for initial resources
    const addPreloadHints = () => {
      if (document.head) {
        const criticalResources = [
          { href: '/logo.svg', as: 'image' },
          { href: `/_next/static/css/91cb7d5bb23f65a4.css`, as: 'style' }
        ];
        
        criticalResources.forEach(resource => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource.href;
          link.as = resource.as;
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        });
      }
    };
    
    if (typeof window !== 'undefined') {
      addPreloadHints();
    }
  }, []);

  // Only show loading for new sessions and when it's the first time ever visiting
  const shouldShowLoading = isNewSession && !hasLoadedBefore;

  // Only render on client
  if (!isClient) {
    return (
      <>
        {/* No spinner, just a blank container that will be immediately replaced */}
        <div className="min-h-screen"></div>
      </>
    );
  }

  // Return children with ImagePreloader for optimal image loading
  return (
    <>
      <ImagePreloader />
      {shouldShowLoading && <LoadingOptimized />}
      {children}
    </>
  );
} 