'use client'

import SeoCounter from '@/app/ui/seoCounter'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'
import { useLanguage } from '@/app/providers/LanguageProvider'

// Simplified translations object for the SEO features section
const localTranslations = {
  en: {
    seo: {
      features: {
        card1: {
          label: "SEO Best Practices",
          title: "Optimize for Success",
          description: "Our proven SEO techniques ensure your website ranks higher in search results, driving targeted traffic and increasing conversion rates."
        },
        card2: {
          label: "Technical SEO",
          title: "Performance Optimization",
          description: "We optimize your website's technical aspects to improve loading speed, mobile responsiveness, and overall user experience."
        },
        benefits: {
          paragraph1: "For starters, it improves organic search by making optimized content more visible and hence more likely to convert users into buyers. Second, it increases site quality since search engines base their overall evaluation of a website on its searchability.",
          paragraph2: "Finally, SEO produces concrete benefits by raising exposure, generating conversions, and drawing consumers; without it, an invisible website might put you at a competitive disadvantage."
        }
      }
    }
  },
  ar: {
    seo: {
      features: {
        card1: {
          label: "أفضل ممارسات تحسين محركات البحث",
          title: "التحسين للنجاح",
          description: "تضمن تقنيات تحسين محركات البحث المثبتة لدينا تصنيف موقعك الإلكتروني بشكل أعلى في نتائج البحث، مما يوجه حركة المرور المستهدفة ويزيد من معدلات التحويل."
        },
        card2: {
          label: "تحسين محركات البحث التقني",
          title: "تحسين الأداء",
          description: "نقوم بتحسين الجوانب التقنية لموقعك الإلكتروني لتحسين سرعة التحميل والاستجابة للجوال وتجربة المستخدم بشكل عام."
        },
        benefits: {
          paragraph1: "في البداية، يحسن البحث العضوي من خلال جعل المحتوى المحسن أكثر وضوحًا وبالتالي أكثر احتمالا لتحويل المستخدمين إلى مشترين. ثانيًا، يزيد من جودة الموقع لأن محركات البحث تعتمد في تقييمها الشامل للموقع على قابليته للبحث.",
          paragraph2: "أخيرًا، ينتج تحسين محركات البحث فوائد ملموسة من خلال زيادة التعرض وتوليد التحويلات وجذب المستهلكين؛ بدونه، قد يضعك موقع الويب غير المرئي في وضع تنافسي سيئ."
        }
      }
    }
  }
};

function Features() {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Debug logging
    console.log('Current language in Features component:', language);
    console.log('Document dir:', document.documentElement.dir);
  }, [language]);

  // Helper function to get translation by key path
  const translate = (key: string): string => {
    try {
      const keys = key.split('.');
      
      // Use our local translations
      const translations = language === 'ar' ? localTranslations.ar : localTranslations.en;
      
      // Navigate through the nested keys
      let result: any = translations;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key} at part ${k}`);
          return key;
        }
      }
      
      if (typeof result === 'string') {
        return result;
      } else {
        console.warn(`Invalid translation value for key: ${key}`);
        return key;
      }
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key; // Fallback to the key itself
    }
  };

  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <section>
        <div className="container px-6 m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6">
            <div className="overflow-hidden bg-secondaryColor rounded shadow-md text-white">
                 <div className="flex justify-between items-center p-6 bg-secondaryColor" dir={textDirection}>
                     <span className={`text-white font-medium ${textAlign}`}>{translate('seo.features.card1.label')}</span>
                          <Link href="#" className="text-white">
                          <MdOutlineArrowOutward />
                          </Link>
                 </div>

                <div className="p-6" dir={textDirection}>
                    <h3 className={`mb-4 text-xl font-medium text-[#1E1E1E] ${textAlign}`}>{translate('seo.features.card1.title')}</h3>
                         <p className={`text-white ${textAlign}`}>
                             {translate('seo.features.card1.description')}
                        </p>
                     </div>
               </div>

            </div>
            <div className="col-span-4 lg:col-span-6">
            <div className="overflow-hidden bg-[#1E1E1E] rounded shadow-md text-white">
                 <div className="flex justify-between items-center p-6 bg-[#1E1E1E]" dir={textDirection}>
                     <span className={`text-white font-medium ${textAlign}`}>{translate('seo.features.card2.label')}</span>
                          <Link href="#" className="text-white">
                          <MdOutlineArrowOutward />
                          </Link>
                 </div>

                <div className="p-6" dir={textDirection}>
                    <h3 className={`mb-4 text-xl font-medium text-secondaryColor ${textAlign}`}>{translate('seo.features.card2.title')}</h3>
                         <p className={`text-white ${textAlign}`}>
                             {translate('seo.features.card2.description')}
                        </p>
                     </div>
               </div>
            </div>
          </div>
            </div>
            <div className="col-span-4 lg:col-span-6" dir={textDirection}>
            <p className={`text-white ${textAlign}`}>
            {translate('seo.features.benefits.paragraph1')}
            </p>
            <p className={`text-white ${textAlign}`}>
            {translate('seo.features.benefits.paragraph2')}
            </p>
            <SeoCounter />
            </div>
          </div>
        </div>
     </section>
  )
}

export default Features