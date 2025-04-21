'use client';

import React, { useState, useEffect } from 'react';
import NewHero from './NewHero';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function NewHeroWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Make sure all critical hero images are preloaded
  useEffect(() => {
    // Preload hero images
    const heroImages = [
      '/clicksalesmedia-marketing-agency.png',
      '/mesh-clicksalesmedia.png',
    ];
    
    const imagePromises = heroImages.map(src => {
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
    
    // Mark images as loaded when all are done, or after timeout
    Promise.race([
      Promise.all(imagePromises),
      new Promise(resolve => setTimeout(resolve, 2000)) // Safety timeout
    ]).then(() => {
      setImageLoaded(true);
    });
  }, []);
  
  // Set component as loaded after a delay and when images are loaded
  useEffect(() => {
    if (imageLoaded) {
      // Small delay to ensure smooth rendering
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);
  
  if (!isLoaded) {
    return <LoadingSpinner size="large" />;
  }
  
  return <NewHero />;
} 