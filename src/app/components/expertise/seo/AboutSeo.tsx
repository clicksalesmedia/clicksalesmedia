'use client'

import AnimatedButton from '@/app/ui/AnimatedButton'
import FormService from '@/app/ui/modal'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/app/providers/LanguageProvider'

// Simplified translations object for the SEO about section
const localTranslations = {
  en: {
    seo: {
      about: {
        title: "ClickSalesMedia provides effective professional SEO services.",
        paragraph1: "The importance of SEO extends beyond mere visibility. In today's digital age, it acts as a credibility marker for your business, influencing consumer perception by positioning your website as a reliable resource. High rankings in search results are often equated with reputability, encouraging more engagement from potential clients. Additionally, SEO is cost-effective compared to other marketing strategies such as pay-per-click. By investing in SEO, you're focusing on attracting traffic at the moment they are looking for information or products like yours, which can lead to higher conversion rates. Hence, neglecting SEO can mean missing out on a substantial base of potential customers who are actively seeking to engage with your business.",
        paragraph2: "Before choosing strategic keywords to target certain influencers and decision-makers in the most profitable market sectors, we thoroughly understand your business strategy and goals. Our SEO agency professionals keep up with the latest tools, research, trends, and algorithm upgrades so they can notify you of any changes that can affect your SEO objectives. To keep your site optimized, they adjust or modify your content, keywords, and SEO approach.",
        ctaButton: "Get a Free SEO Audit!"
      }
    }
  },
  ar: {
    seo: {
      about: {
        title: "تقدم كليك سيلز ميديا خدمات تحسين محركات البحث الاحترافية الفعالة.",
        paragraph1: "تتجاوز أهمية تحسين محركات البحث (SEO) مجرد الظهور. في العصر الرقمي الحالي، يعمل كعلامة مصداقية لعملك، مما يؤثر على إدراك المستهلك من خلال وضع موقعك الإلكتروني كمصدر موثوق. غالبًا ما يرتبط الترتيب العالي في نتائج البحث بالسمعة الطيبة، مما يشجع على المزيد من المشاركة من العملاء المحتملين. بالإضافة إلى ذلك، فإن تحسين محركات البحث فعال من حيث التكلفة مقارنة باستراتيجيات التسويق الأخرى مثل الدفع بالنقرة. من خلال الاستثمار في تحسين محركات البحث، فإنك تركز على جذب حركة المرور في اللحظة التي يبحثون فيها عن معلومات أو منتجات مثل منتجاتك، مما قد يؤدي إلى معدلات تحويل أعلى. وبالتالي، فإن إهمال تحسين محركات البحث يمكن أن يعني تفويت قاعدة كبيرة من العملاء المحتملين الذين يسعون بنشاط للتفاعل مع عملك.",
        paragraph2: "قبل اختيار الكلمات الرئيسية الاستراتيجية لاستهداف مؤثرين وصناع قرار معينين في قطاعات السوق الأكثر ربحية، نفهم تمامًا استراتيجية عملك وأهدافك. يواكب محترفو وكالة تحسين محركات البحث لدينا أحدث الأدوات والأبحاث والاتجاهات وتحديثات الخوارزميات حتى يتمكنوا من إخطارك بأي تغييرات يمكن أن تؤثر على أهداف تحسين محركات البحث الخاصة بك. للحفاظ على تحسين موقعك، يقومون بتعديل أو تغيير المحتوى والكلمات الرئيسية ونهج تحسين محركات البحث الخاص بك.",
        ctaButton: "احصل على تدقيق مجاني لتحسين محركات البحث!"
      }
    }
  }
};

function AboutSeo() {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    console.log('AboutSeo - Current language:', language);
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
          console.warn(`AboutSeo - Translation key not found: ${key} at part ${k}`);
          return key;
        }
      }
      
      if (typeof result === 'string') {
        return result;
      } else {
        console.warn(`AboutSeo - Invalid translation value for key: ${key}`);
        return key;
      }
    } catch (error) {
      console.error(`AboutSeo - Translation error for key: ${key}`, error);
      return key; // Fallback to the key itself
    }
  };

  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
<div className="container px-6 m-auto pb-10">
  <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
  <div className="col-span-4 lg:col-span-6">
  <div className="container px-6 m-auto">
  <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-12 pb-4">
            <div className={`flex flex-col justify-left ${textAlign} mx-auto md:max-w-3xl space-y-5`} dir={textDirection}>
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {translate('seo.about.title')}
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                {translate('seo.about.paragraph1')}
              </p>
              <p className="text-whiteColor dark:text-gray-300">
                {translate('seo.about.paragraph2')}
              </p>
          </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 lg:col-span-6 py-4">
            <FormService buttonText={translate('seo.about.ctaButton')} />
            </div>
            <div className="col-span-4 lg:col-span-6"></div>
          </div>
        </div>
  </div>
    <div className="col-span-4 lg:col-span-6">
    <Image alt={'SEO'} src={'/expertise/seo-clicksalesmedia.jpg'} width={'646'} height={'485'}
                        className="w-full rounded-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
              />
    </div>
  </div>
</div>
  )
}

export default AboutSeo