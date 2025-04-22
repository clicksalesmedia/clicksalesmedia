'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Define the context type
interface AiDataContextType {
  // Empty placeholder context
}

// Create the context with default values
const AiDataContext = createContext<AiDataContextType>({});

// Provider component
export function AiDataProvider({ children }: { children: ReactNode }) {
  return (
    <AiDataContext.Provider value={{}}>
      {children}
    </AiDataContext.Provider>
  );
}

// Hook to use the context
export function useAiData() {
  return useContext(AiDataContext);
} 