'use client';

import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onLoaded(); // Notify the parent component that loading is finished
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: '#222222',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      transition: 'opacity 0.5s ease-out',
      opacity: isVisible ? 1 : 0,
    }}>
      <object
        type="image/svg+xml"
        data="/svg/clicksalesmedia-symbol-v.svg"
        width="100"
        height="100"
        style={{ width: '100px', height: '100px' }}
      >
        svg-animation
      </object>
    </div>
  );
};

export default LoadingScreen;
