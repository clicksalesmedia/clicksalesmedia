'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';
// Import translations directly
import arTranslations from '@/app/i18n/locales/ar.json';
import enTranslations from '@/app/i18n/locales/en.json';

// Define hardcoded fallback translations
const fallbackTranslations = {
  ar: {
    title: "تقنية الذكاء الاصطناعي لدينا مصممة لتعزيز نمو شركتك",
    description: "في جوهرنا، نؤمن بتحويل تجربة التسويق والمبيعات الخاصة بك من خلال قوة الذكاء الاصطناعي والأتمتة. تم تصميم حلولنا المتطورة لتعزيز أدائك وزيادة عائد الاستثمار الخاص بك بسلاسة. تخيل عالماً حيث تكون جهودك التسويقية مضبوطة بدقة وقابلة للتطوير دون عناء، مما يحقق نتائج استثنائية. مع نهجنا المبتكر، يمكنك فتح مستويات جديدة من الكفاءة والفعالية، مع التركيز على ما يهم حقاً. دعنا نرشدك في هذه الرحلة المثيرة نحو تسويق أكثر ذكاءً وتأثيراً.",
    aiMarketingAlt: "حلول التسويق بالذكاء الاصطناعي",
    companiesAlt: "الشركات التي تستخدم حلول الذكاء الاصطناعي لدينا"
  },
  en: {
    title: "Our AI Technology is Built to Skyrocket Your Company",
    description: "At our core, we believe in transforming your marketing and sales experience with the power of AI and automation. Our cutting-edge solutions are designed to seamlessly enhance your performance and boost your ROI. Imagine a world where your marketing efforts are finely tuned and effortlessly scalable, delivering exceptional results. With our innovative approach, you can unlock new levels of efficiency and effectiveness, all while focusing on what truly matters. Let us guide you on this exciting journey towards smarter, more impactful marketing.",
    aiMarketingAlt: "AI Marketing Solutions",
    companiesAlt: "Companies using our AI solutions"
  }
};

function Grid() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [titleText, setTitleText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  
  // Safe access to translations with fallback
  const getTranslation = (lang: string, path: string) => {
    try {
      if (lang === 'ar') {
        if (path === 'title') return fallbackTranslations.ar.title;
        if (path === 'description') return fallbackTranslations.ar.description;
        if (path === 'aiMarketingAlt') return fallbackTranslations.ar.aiMarketingAlt;
        if (path === 'companiesAlt') return fallbackTranslations.ar.companiesAlt;
      } else {
        if (path === 'title') return fallbackTranslations.en.title;
        if (path === 'description') return fallbackTranslations.en.description;
        if (path === 'aiMarketingAlt') return fallbackTranslations.en.aiMarketingAlt;
        if (path === 'companiesAlt') return fallbackTranslations.en.companiesAlt;
      }
    } catch (error) {
      console.error('Error accessing translation:', error);
    }
    
    // Default fallbacks
    if (path === 'title') return lang === 'ar' ? fallbackTranslations.ar.title : fallbackTranslations.en.title;
    if (path === 'description') return lang === 'ar' ? fallbackTranslations.ar.description : fallbackTranslations.en.description;
    if (path === 'aiMarketingAlt') return lang === 'ar' ? fallbackTranslations.ar.aiMarketingAlt : fallbackTranslations.en.aiMarketingAlt;
    return lang === 'ar' ? fallbackTranslations.ar.companiesAlt : fallbackTranslations.en.companiesAlt;
  };
  
  useEffect(() => {
    // Force refresh translations when language changes
    // Try to use the translation system first
    try {
      const title = t('aiMarketing.grid.title' as any);
      const desc = t('aiMarketing.grid.description' as any);
      
      // If we get back the key, it means translation failed
      if (title === 'aiMarketing.grid.title' || desc === 'aiMarketing.grid.description') {
        // Fallback to direct access
        setTitleText(getTranslation(language, 'title'));
        setDescriptionText(getTranslation(language, 'description'));
      } else {
        setTitleText(title);
        setDescriptionText(desc);
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to hardcoded translations
      setTitleText(getTranslation(language, 'title'));
      setDescriptionText(getTranslation(language, 'description'));
    }
    
    console.log('Current language:', language);
    console.log('Title translation:', titleText);
    console.log('Description translation:', descriptionText);
  }, [language, t]);

  return (
    <section className='p-5 md:p-20'>
      <div className="container px-2 md:px-6 m-auto">
        <div className={`grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 border border-neutral-400 border-opacity-30 ${isRTL ? 'rtl' : ''}`}>
          <div className="col-span-1 md:col-span-4 lg:col-span-7 border-b md:border-b-0 md:border-r border-neutral-400 border-opacity-30">          
            <object type="image/svg+xml" data="/svg/robot-ai.svg" className="w-full">svg-animation</object>
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-5">
            <Image 
              src="/svg/ai.svg"
              alt={getTranslation(language, 'aiMarketingAlt')}
              width={600}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
      <div className="container px-2 md:px-6 m-auto">
        <div className={`grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 border-t-0 border border-neutral-400 border-opacity-30 ${isRTL ? 'rtl' : ''}`}>
          <div className="col-span-1 md:col-span-4 lg:col-span-6 border-b md:border-b-0 md:border-r border-neutral-400 border-opacity-30">
            <Image 
              src="/svg/companiesv.svg"
              alt={getTranslation(language, 'companiesAlt')}
              width={1000}
              height={700}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-6">
            <div className='p-4'>
              <h2 className='text-secondaryColor text-2xl font-semibold py-2'>{titleText}</h2>
              <p className={`text-white ${isRTL ? 'text-right' : 'text-justify'}`}>
                {descriptionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Grid
