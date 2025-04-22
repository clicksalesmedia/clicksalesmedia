'use client';

import { useEffect } from 'react';

// Add critical images that should be preloaded here
const CRITICAL_IMAGES = [
  '/logo.svg',
  '/hero-image.webp',
  '/background-pattern.webp',
  '/clicksalesmedia-marketing-agency.png',
  '/mesh-clicksalesmedia.png',
  // Add other critical images here
];

// Add critical stylesheets that need to be preloaded
const CRITICAL_STYLESHEETS = [
  '/_next/static/css/91cb7d5bb23f65a4.css' // Update this path if needed
];

/**
 * Preloads critical images and resources to improve initial loading performance
 */
const ImagePreloader = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create link preload tags directly in the head for highest priority loading
    const preloadResources = () => {
      // Preload images with high priority
      CRITICAL_IMAGES.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
        
        // Also create image objects to start loading
        const img = new window.Image();
        img.src = src;
      });
      
      // Preload critical CSS
      CRITICAL_STYLESHEETS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };
    
    // Execute immediately
    preloadResources();
    
    // Clean up preload links on unmount
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (CRITICAL_IMAGES.includes(link.getAttribute('href') || '') || 
            CRITICAL_STYLESHEETS.includes(link.getAttribute('href') || '')) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default ImagePreloader; 