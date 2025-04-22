'use client';

import { useEffect } from 'react';

// Add critical images that should be preloaded here
const CRITICAL_IMAGES = [
  '/logo.svg',
  '/hero-image.webp',
  '/background-pattern.webp',
  // Add other critical images here
];

/**
 * Preloads critical images to improve initial loading performance
 */
const ImagePreloader = () => {
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    
    // Preload all critical images
    CRITICAL_IMAGES.forEach(preloadImage);
  }, []);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader; 