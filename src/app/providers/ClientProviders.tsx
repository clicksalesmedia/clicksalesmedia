'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from './LanguageProvider';
import AppContainer from '../components/AppContainer';

export default function ClientProviders({ 
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