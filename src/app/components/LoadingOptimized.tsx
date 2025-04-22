'use client';

import React, { useEffect, useState } from 'react';

const LoadingOptimized = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Preload the logo image immediately
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = '/logo.svg';
    }
    
    // Start fading out after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800); // Shorter delay for faster experience
    
    return () => clearTimeout(timer);
  }, []);

  // When not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backdropFilter: 'blur(5px)' }}
    >
      {/* Just the SVG logo, no loading circle */}
      <div className="w-24 h-24 flex items-center justify-center">
        <img 
          src="/logo.svg" 
          alt="Loading" 
          className="w-full h-full" 
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default LoadingOptimized; 