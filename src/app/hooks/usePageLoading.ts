import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  delay?: number;
  minLoadingTime?: number;
}

export default function usePageLoading(options: UsePageLoadingOptions = {}) {
  const { delay = 0, minLoadingTime = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timer: NodeJS.Timeout;
    let minTimer: NodeJS.Timeout;
    let startTime = Date.now();

    // Create a promise that resolves after the minimum loading time
    const minLoadingPromise = new Promise<void>((resolve) => {
      minTimer = setTimeout(() => {
        resolve();
      }, minLoadingTime);
    });

    // Function to check if the page is fully loaded
    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        // Both DOM and resources are loaded
        const elapsedTime = Date.now() - startTime;
        
        // Wait for both minimum loading time and page load
        Promise.all([
          minLoadingPromise,
          // Add delay if specified
          delay > 0 ? new Promise(r => setTimeout(r, delay)) : Promise.resolve()
        ]).then(() => {
          setIsLoading(false);
        });
        
        return true;
      }
      return false;
    };

    // If already complete, run the function
    if (checkPageLoaded()) return;

    // Add event listener for when the page loads
    const onLoad = () => {
      checkPageLoaded();
    };

    window.addEventListener('load', onLoad);
    
    // Set interval to keep checking readyState (for browsers where load might not fire)
    timer = setInterval(() => {
      if (checkPageLoaded()) {
        clearInterval(timer);
      }
    }, 100);

    return () => {
      window.removeEventListener('load', onLoad);
      clearInterval(timer);
      clearTimeout(minTimer);
    };
  }, [delay, minLoadingTime]);

  return { isLoading };
} 