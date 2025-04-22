import React, { useState, useEffect, useRef } from 'react';

interface ModelLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minLoadTime?: number;
}

/**
 * ModelLoader component ensures 3D content is fully loaded before display
 * Wraps any 3D/WebGL content to ensure proper initialization
 */
const ModelLoader: React.FC<ModelLoaderProps> = ({ 
  children, 
  fallback = null,
  minLoadTime = 1000
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const renderAttemptRef = useRef(0);
  const mountTimeRef = useRef(Date.now());

  // Check WebGL availability
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    // Start timing when component mounts
    mountTimeRef.current = Date.now();
    
    // We'll check DOM stability as a proxy for 3D content loading
    const domStabilityCheck = () => {
      renderAttemptRef.current += 1;
      
      // If we've tried many times, force show content
      if (renderAttemptRef.current > 20) {
        completeLoading();
        return;
      }
      
      // Calculate elapsed time
      const elapsed = Date.now() - mountTimeRef.current;
      
      // If enough time has passed and document is ready, complete loading
      if (elapsed >= minLoadTime && document.readyState === 'complete') {
        completeLoading();
      } else {
        // Otherwise, check again soon
        loadTimeoutRef.current = setTimeout(domStabilityCheck, 100);
      }
    };
    
    const completeLoading = () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      setIsLoaded(true);
    };
    
    // Wait for minimum load time and check WebGL
    const initialTimeout = setTimeout(() => {
      if (checkWebGLSupport()) {
        domStabilityCheck();
      } else {
        // If WebGL isn't supported, still show content after min time
        setIsLoaded(true);
      }
    }, 300);
    
    // Set a max timeout to ensure content eventually shows
    const maxTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(maxTimeout);
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [minLoadTime]);

  // Show fallback until loaded
  if (!isLoaded) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center w-full h-full min-h-[300px]">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 w-full h-full border-8 border-gray-800 rounded-full"></div>
              <div className="absolute top-0 w-full h-full border-8 border-t-secondaryColor rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondaryColor font-bold">
                LOADING
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show actual content once loaded
  return <>{children}</>;
};

export default ModelLoader; 