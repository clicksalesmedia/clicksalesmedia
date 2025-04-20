'use client'

import Data from '@/app/ui/data';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/providers/LanguageProvider';

// Translations for the SEO services
const localTranslations = {
  en: {
    services: [
      {
        title: 'Research and plan',
        description:
          "We do extensive research on industry trends, customer behavior, and competition analysis to create a strategic content roadmap that is perfect for your company's objectives.",
        imageUrl: "/expertise/icons/targeting.png", 
      },
      {
        title: 'SEO strategy implementation',
        description:
          "Improve your web page visibility with our SEO content strategy and execution services. We use innovative techniques to improve your website's exposure and enhance organic traffic, assuring long-term success in the digital world.",
        imageUrl: "/expertise/icons/backlinks.png", 
      },
      {
        title: 'Technical and Performance Analysis',
        description:
          "Our technical and performance study analyzes the complexities of your website's structure. From page speed to mobile responsiveness, we discover and fix technical issues to improve the user experience and performance in general.",
        imageUrl: "/expertise/icons/speed-seo-website.png", 
      },
      {
        title: 'Keywords Plan and Analysis',
        description:
          'Our complete keyword plan and research will help you maximize the power of your keywords. We carefully research and choose relevant keywords specific to your industry and target demographic, then optimize your content for greatest exposure and communication.',
        imageUrl: "/expertise/icons/seo-keywords.png",
      },
      {
        title: 'Results Analysis',
        description:
          'Our results analysis services provide helpful details about the success of your marketing activities. We analyze key performance measures, evaluate data patterns, and make practical suggestions to help refine tactics and promote continual progress.',
        imageUrl: "/expertise/icons/seo-analysis.png",
      },
      {
        title: 'Traffic and ROI Strategy',
        description:
          'Our traffic and ROI approach maximizes investment returns. We create tailored strategies to attract quality customers, improve website traffic, and optimize conversion rates, resulting in a meaningful impact on your bottom line.',
        imageUrl: "/expertise/icons/result-seo-clicksalesmedia.png",
      },
    ]
  },
  ar: {
    services: [
      {
        title: 'البحث والتخطيط',
        description:
          "نقوم ببحث مكثف حول اتجاهات الصناعة وسلوك العملاء وتحليل المنافسة لإنشاء خارطة طريق استراتيجية للمحتوى تناسب أهداف شركتك بشكل مثالي.",
        imageUrl: "/expertise/icons/targeting.png", 
      },
      {
        title: 'تنفيذ استراتيجية تحسين محركات البحث',
        description:
          "قم بتحسين رؤية صفحة الويب الخاصة بك مع خدمات استراتيجية وتنفيذ محتوى تحسين محركات البحث لدينا. نستخدم تقنيات مبتكرة لتحسين مستوى التعرض لموقعك الإلكتروني وتعزيز حركة المرور العضوية، مما يضمن النجاح على المدى الطويل في العالم الرقمي.",
        imageUrl: "/expertise/icons/backlinks.png", 
      },
      {
        title: 'تحليل التقنية والأداء',
        description:
          "تحلل دراسة التقنية والأداء لدينا تعقيدات بنية موقع الويب الخاص بك. من سرعة الصفحة إلى الاستجابة للجوال، نكتشف ونصلح المشكلات التقنية لتحسين تجربة المستخدم والأداء بشكل عام.",
        imageUrl: "/expertise/icons/speed-seo-website.png", 
      },
      {
        title: 'خطة وتحليل الكلمات المفتاحية',
        description:
          'ستساعدك خطة الكلمات المفتاحية الشاملة والبحث لدينا على زيادة قوة الكلمات المفتاحية الخاصة بك. نبحث بعناية ونختار الكلمات المفتاحية ذات الصلة المحددة لصناعتك والجمهور المستهدف، ثم نحسن المحتوى الخاص بك للحصول على أقصى قدر من التعرض والتواصل.',
        imageUrl: "/expertise/icons/seo-keywords.png",
      },
      {
        title: 'تحليل النتائج',
        description:
          'توفر خدمات تحليل النتائج لدينا تفاصيل مفيدة حول نجاح أنشطتك التسويقية. نحن نحلل مقاييس الأداء الرئيسية، ونقيّم أنماط البيانات، ونقدم اقتراحات عملية للمساعدة في تنقيح التكتيكات وتعزيز التقدم المستمر.',
        imageUrl: "/expertise/icons/seo-analysis.png",
      },
      {
        title: 'استراتيجية حركة المرور والعائد على الاستثمار',
        description:
          'نهجنا في حركة المرور والعائد على الاستثمار يزيد عوائد الاستثمار. نحن نضع استراتيجيات مخصصة لجذب عملاء ذوي جودة، وتحسين حركة مرور الموقع، وتحسين معدلات التحويل، مما يؤدي إلى تأثير مهم على النتيجة النهائية.',
        imageUrl: "/expertise/icons/result-seo-clicksalesmedia.png",
      },
    ]
  }
};

interface FeatureItem {
  title: string;
  description: string;
  imageUrl: string; 
}

// Functional component
const SeoServices: React.FC = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  const [features, setFeatures] = useState<FeatureItem[]>([]);

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Set features based on current language
    if (language === 'ar') {
      setFeatures(localTranslations.ar.services);
    } else {
      setFeatures(localTranslations.en.services);
    }
    
    console.log('SeoServices - Current language:', language);
  }, [language]);

  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <section>
      <div className="container px-6 m-auto">
        <div className='mt-20'>
        <Data sectionName='seoServices' />
        </div>
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          {features.map((feature, index) => (
            <div key={index} className="col-span-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <div>
                  <Image
                    src={feature.imageUrl}
                    width={100}
                    height={100}
                    alt={`${feature.title} icon`}
                  />
                </div>
                <div className={`flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base`} dir={textDirection}>
                  <h3 className={`mb-2 py-2 text-lg leading-6 text-secondaryColor ${textAlign}`}>{feature.title}</h3>
                  <p className={`text-whiteColor ${textAlign}`}>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoServices;
