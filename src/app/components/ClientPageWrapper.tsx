'use client';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // Skip the initial render check and start loading resources immediately
  useEffect(() => {
    // Preload key images
    const preloadImages = () => {
      const criticalImages = [
        '/clicksalesmedia-marketing-agency.png',
        '/mesh-clicksalesmedia.png',
      ];
      
      const imagePromises = criticalImages.map(src => {
        return new Promise<void>((resolve) => {
          if (typeof window !== 'undefined') {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Still resolve on error
            img.src = src;
          } else {
            resolve();
          }
        });
      });
      
      // Wait for images to load or timeout after 2 seconds
      Promise.race([
        Promise.all(imagePromises),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]).then(() => {
        setResourcesLoaded(true);
      });
    };
    
    preloadImages();
  }, []);
  
  // Set as loaded when resources are ready
  useEffect(() => {
    if (resourcesLoaded) {
      // Shorter delay for faster loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded]);

  // Show loading spinner until everything is ready
  if (!isLoaded) {
    return <LoadingSpinner size="large" fullScreen text="LOADING" />;
  }

  // Once loaded, show the actual content
  return <>{children}</>;
} 