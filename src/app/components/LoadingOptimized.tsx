'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingOptimized = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fading out after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // When not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative w-24 h-24">
        <Image
          src="/logo.svg"
          alt="Loading"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
};

export default LoadingOptimized; 