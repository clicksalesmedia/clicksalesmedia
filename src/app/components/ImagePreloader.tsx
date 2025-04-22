'use client';

import { useEffect } from 'react';

/**
 * Simple preloader that just adds basic preload links
 */
const ImagePreloader = () => {
  useEffect(() => {
    // Do nothing - we're removing all preloading to see if that's the issue
  }, []);

  return null;
};

export default ImagePreloader; 