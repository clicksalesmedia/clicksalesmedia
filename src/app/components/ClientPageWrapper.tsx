'use client';

import React, { useEffect, useState } from 'react';

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Just mark as client-side rendered immediately
    setIsClient(true);
  }, []);

  // Return children immediately when client-side rendered
  if (!isClient) {
    return <div className="min-h-screen"></div>;
  }

  // No preloading, no loading screens, just render the content
  return <>{children}</>;
} 