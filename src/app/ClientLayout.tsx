'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/app/providers/LanguageProvider'; 
import AppContainer from '@/app/components/AppContainer';

export default function ClientLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <AppContainer>
          {children}
        </AppContainer>
      </LanguageProvider>
    </SessionProvider>
  );
} 