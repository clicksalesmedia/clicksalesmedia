'use client';

import React, { useState, useEffect } from 'react';
import NewHero from './NewHero';
import LoadingOptimized from '@/app/components/LoadingOptimized';

export default function NewHeroWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Improved image preloading with better performance
  useEffect(() => {
    // Immediately start preloading critical hero images
    const heroImages = [
      '/clicksalesmedia-marketing-agency.png',
      '/mesh-clicksalesmedia.png',
    ];
    
    // Create an array to track loading status
    const imageLoadingStatus = heroImages.map(() => false);
    let loadTimeout: NodeJS.Timeout;
    
    // Function to check if we should consider loading complete
    const checkAllLoaded = () => {
      // If any image has loaded or max time elapsed, consider loading complete
      if (imageLoadingStatus.some(status => status) || 
          document.readyState === 'complete') {
        clearTimeout(loadTimeout);
        setIsLoaded(true);
      }
    };
    
    // Set a maximum timeout to show content regardless
    loadTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    // Preload each image and track its status
    heroImages.forEach((src, index) => {
      if (typeof window !== 'undefined') {
        const img = new Image();
        img.onload = () => {
          imageLoadingStatus[index] = true;
          checkAllLoaded();
        };
        img.onerror = () => {
          // Still mark as "loaded" on error to avoid blocking
          imageLoadingStatus[index] = true;
          checkAllLoaded();
        };
        // Add timestamp to prevent caching issues
        img.src = `${src}?t=${Date.now()}`;
      }
    });
    
    // Also check when document is ready
    if (document.readyState === 'complete') {
      checkAllLoaded();
    } else {
      window.addEventListener('load', checkAllLoaded);
    }
    
    return () => {
      clearTimeout(loadTimeout);
      window.removeEventListener('load', checkAllLoaded);
    };
  }, []);
  
  if (!isLoaded) {
    return <LoadingOptimized />;
  }
  
  return <NewHero />;
} 