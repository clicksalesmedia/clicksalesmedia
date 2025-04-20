'use client'
import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useLanguage } from '@/app/providers/LanguageProvider';

// Translations for the counter section
const localTranslations = {
  en: {
    yearsOfExperience: "Years of Experience",
    successfulProjects: "Successful Projects",
    totalKeywordsRanked: "Total Keywords Ranked"
  },
  ar: {
    yearsOfExperience: "سنوات الخبرة",
    successfulProjects: "مشاريع ناجحة",
    totalKeywordsRanked: "إجمالي الكلمات المفتاحية المُصنفة"
  }
};

const SeoCounter = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    console.log('SeoCounter - Current language:', language);
  }, [language]);

  // Get translations based on current language
  const translations = language === 'ar' ? localTranslations.ar : localTranslations.en;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={15}
          suffix="+"
          subheading={translations.yearsOfExperience}
          isRTL={isRTL}
        />
        <div className="h-[1px] w-12 bg-indigo-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={432}
          suffix="+"
          subheading={translations.successfulProjects}
          isRTL={isRTL}
        />
        <div className="h-[1px] w-12 bg-indigo-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={25}
          suffix="K+"
          subheading={translations.totalKeywordsRanked}
          isRTL={isRTL}
        />
      </div>
    </div>
  );
};


const Stat = ({ 
  num, 
  suffix, 
  decimals = 0, 
  subheading,
  isRTL
}: { 
  num: number, 
  suffix: string, 
  decimals?: number, 
  subheading: string,
  isRTL: boolean
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const textAlign = isRTL ? 'text-right' : 'text-left';

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        (ref.current as HTMLDivElement).textContent = value.toFixed(decimals) + suffix;
      },
    });
  }, [num, decimals, isInView, suffix]);

  return (
    <div className="flex w-72 flex-col items-center py-2 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold sm:text-6xl text-secondaryColor">
        <span ref={ref}></span>
      </p>
      <p className="max-w-48 text-center text-whiteColor">{subheading}</p>
    </div>
  );
};

export default SeoCounter;
