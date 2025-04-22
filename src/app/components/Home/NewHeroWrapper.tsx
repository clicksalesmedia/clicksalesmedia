'use client';

import React, { useState, useEffect } from 'react';
import NewHero from './NewHero';

export default function NewHeroWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ultra-fast loading for hero section
  useEffect(() => {
    // Check if we've loaded this component before in this session
    const hasLoaded = sessionStorage.getItem('heroLoaded');
    
    if (hasLoaded) {
      // If already loaded in this session, show immediately
      setIsLoaded(true);
      return;
    }
    
    // Immediately preload critical hero images with highest priority
    const heroImages = [
      '/clicksalesmedia-marketing-agency.png',
      '/mesh-clicksalesmedia.png',
    ];
    
    // Add preload tags to head for faster loading
    heroImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
    
    // Also use Image objects for maximum browser compatibility
    heroImages.forEach(src => {
      const img = new window.Image();
      img.onload = () => {
        setIsLoaded(true);
        sessionStorage.setItem('heroLoaded', 'true');
      };
      img.src = `${src}?t=${Date.now()}`;
    });
    
    // Fallback - show content after short delay even if images haven't loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
      sessionStorage.setItem('heroLoaded', 'true');
    }, 400);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  // If not loaded, render an empty div with the same dimensions
  // to prevent layout shifts, but no spinner
  if (!isLoaded) {
    return <div className="min-h-[70vh]"></div>;
  }
  
  return <NewHero />;
} 