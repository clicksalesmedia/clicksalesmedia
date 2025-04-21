'use client';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // Handle initialization and resources preloading
  useEffect(() => {
    // This code only runs on the client
    if (typeof window !== 'undefined') {
      // Force a refresh on first visit in a new browser
      if (!sessionStorage.getItem('page_initialized')) {
        sessionStorage.setItem('page_initialized', 'true');
        
        // Add a small delay to make sure all resources start loading
        setTimeout(() => {
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
        // For subsequent visits, skip initial render phase
        setIsInitialRender(false);
      }
    }
  }, []);
  
  // Preload critical images
  useEffect(() => {
    if (!isInitialRender) {
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
    }
  }, [isInitialRender]);
  
  // Set as loaded when resources are ready
  useEffect(() => {
    if (resourcesLoaded) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
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