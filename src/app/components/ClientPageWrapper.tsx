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

  useEffect(() => {
    // Check if this is a new browser session
    const isFirstVisit = !sessionStorage.getItem('hasVisited');
    setIsNewSession(isFirstVisit);
    
    // Mark this session as visited
    sessionStorage.setItem('hasVisited', 'true');
    
    // Set client-side rendering flag
    setIsClient(true);
  }, []);

  // Only render on client
  if (!isClient) {
    return <LoadingOptimized />;
  }

  // Return children with ImagePreloader for optimal image loading
  return (
    <>
      <ImagePreloader />
      {isNewSession && <LoadingOptimized />}
      {children}
    </>
  );
} 