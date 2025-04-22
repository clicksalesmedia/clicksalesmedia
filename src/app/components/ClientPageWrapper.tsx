'use client';

import React, { useEffect, useState } from 'react';
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface ClientPageWrapperProps {
  children: React.ReactNode;
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  // Only check if we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render on client
  if (!isClient) {
    return <LoadingSpinner size="large" fullScreen text="LOADING" />;
  }

  // Immediately show content
  return <>{children}</>;
} 