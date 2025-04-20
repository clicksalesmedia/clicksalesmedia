'use client'
import ButtonUX from '@/app/ui/buttonux';
import FormService from '@/app/ui/modal';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/providers/LanguageProvider';

// Translations for Google Marketing Services Hero
const localTranslations = {
  en: {
    title: {
      part1: "Our Google ",
      part2: "Marketing Services"
    },
    description: "We specialize in Google marketing, ensuring your brand stands out in the digital sphere. Whether it's search ads, display ads, or YouTube campaigns, we tailor strategies to your specific needs. With expert guidance and real-time analytics, we optimize your campaigns for maximum impact. Let us elevate your online presence and drive results that matter.",
    buttonText: "Schedule a Free Consultation"
  },
  ar: {
    title: {
      part1: "خدمات ",
      part2: "التسويق عبر جوجل"
    },
    description: "نحن متخصصون في التسويق عبر جوجل، ونضمن تميز علامتك التجارية في المجال الرقمي. سواء كانت إعلانات البحث، أو إعلانات العرض، أو حملات يوتيوب، نقوم بتخصيص استراتيجيات تناسب احتياجاتك المحددة. مع توجيه خبير وتحليلات في الوقت الفعلي، نحسن حملاتك لتحقيق أقصى تأثير. دعنا نرفع مستوى تواجدك عبر الإنترنت ونحقق النتائج التي تهمك.",
    buttonText: "احجز استشارة مجانية"
  }
};

const Hero = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    console.log('Hero - Current language:', language);
  }, [language]);

  // Get translations based on current language
  const translations = language === 'ar' ? localTranslations.ar : localTranslations.en;
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  return (
    <section className="bg-primaryColor dark:bg-gray-900">
      <div className="container px-6 py-20 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
          {/* Text and Button */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1 max-w-lg mx-auto lg:mx-0" dir={textDirection}>
            <h1 className={`font-semibold py-5 leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl ${textAlign} w-full`}>
              {isRTL ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{translations.title.part2}</span> {translations.title.part1}
                </>
              ) : (
                <>
                  {translations.title.part1}<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{translations.title.part2}</span>
                </>
              )}
            </h1>
            <p className={`text-slate-200 pb-10 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none px-2 ${textAlign}`}>
              {translations.description}
            </p>
            <FormService buttonText={translations.buttonText} />
          </div>
          {/* Image */}
          <div className="flex-1">
            <Image width={900} height={400} className="object-cover w-full h-96 rounded-xl" src="/expertise/ppcads/gads.jpg" alt="google-ads-optimization" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
