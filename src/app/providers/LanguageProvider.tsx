'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { languages, fallbackLng } from '../i18n/settings';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isInitialized: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: fallbackLng,
  setLanguage: () => {},
  isInitialized: false,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(fallbackLng);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') || fallbackLng;
      setLanguage(storedLang);
      document.documentElement.lang = storedLang;
      document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr';
      
      // Apply Noto Kufi font class for Arabic
      if (storedLang === 'ar') {
        document.documentElement.classList.add('font-[Noto_Kufi_Arabic]');
      } else {
        document.documentElement.classList.remove('font-[Noto_Kufi_Arabic]');
      }
      
      setIsInitialized(true);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      localStorage.setItem('language', lang);
      setLanguage(lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      
      // Apply Noto Kufi font class for Arabic before reload
      if (lang === 'ar') {
        document.documentElement.classList.add('font-[Noto_Kufi_Arabic]');
      } else {
        document.documentElement.classList.remove('font-[Noto_Kufi_Arabic]');
      }
      
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  );
} 