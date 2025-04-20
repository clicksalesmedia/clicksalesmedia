'use client'
import HoverEffect from "@/app/ui/card-hover-effect";
import FormService from "@/app/ui/modal";
import { useLanguage } from '@/app/providers/LanguageProvider';
import { useEffect, useState } from "react";

// Translations for Google Marketing Services
const localTranslations = {
  en: {
    title: {
      part1: "Our Google",
      part2: " Marketing Services"
    },
    description: "We believe in transparency. Your investment deserves clarity — knowing where it's allocated, what's effective, and where adjustments are needed. We develop personalized dashboards for real-time insights into your ad campaigns. Our aim is to simplify the process, providing straightforward access to key metrics such as ad spend, conversions, calls, and ROI.",
    buttonText: "Boost Your ROI Today!",
    projects: [
      {
        title: "Research & Plan",
        description: "Before diving into the digital realm, we research and plan every step to ensure your campaign's success. From understanding your audience to creating the perfect strategy, we're with you every step of the way.",
        link: "",
        icon: "research"
      },
      {
        title: "Google Ads",
        description: "Reach your target audience where they spend most of their time – online. With Google Ads, we create compelling campaigns that drive traffic, leads, and conversions, helping your business thrive in the digital landscape.",
        link: "",
        icon: "googleadsicon"
      },
      {
        title: "Google Analytics",
        description: "Discover the power of data with Google Analytics. Gain valuable insights into your website's performance, user behavior, and conversion rates. With this knowledge, we optimize your strategies for maximum impact and growth.",
        link: "",
        icon: "googleanalyticsicon"
      },
      {
        title: "Google Tag Manager",
        description: "Simplify your tracking and analytics processes with Google Tag Manager. Seamlessly manage tags, pixels, and scripts on your website, ensuring accurate data collection and streamlined performance tracking.",
        link: "",
        icon: "googletagmanager"
      },
      {
        title: "Remarketing Strategy",
        description: "Re-engage with past visitors and turn them into loyal customers with our remarketing strategy. By strategically targeting users who have interacted with your brand, we keep your business top-of-mind and drive repeat conversions.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "Reports and Analysis",
        description: "Track your progress and measure your success with our comprehensive reporting and analysis services. From campaign performance to audience demographics, we provide actionable insights that inform your future strategies and drive continuous improvement.",
        link: "",
        icon: "reports"
      }
    ]
  },
  ar: {
    title: {
      part1: "خدماتنا",
      part2: " للتسويق عبر جوجل"
    },
    description: "نحن نؤمن بالشفافية. استثمارك يستحق الوضوح — معرفة أين يتم تخصيصه، وما هو فعال، وأين تكون التعديلات مطلوبة. نقوم بتطوير لوحات تحكم مخصصة لرؤى في الوقت الفعلي حول حملاتك الإعلانية. هدفنا هو تبسيط العملية، وتوفير وصول مباشر إلى المقاييس الرئيسية مثل الإنفاق الإعلاني والتحويلات والمكالمات والعائد على الاستثمار.",
    buttonText: "عزز عائد استثمارك اليوم!",
    projects: [
      {
        title: "البحث والتخطيط",
        description: "قبل الغوص في المجال الرقمي، نبحث ونخطط لكل خطوة لضمان نجاح حملتك. من فهم جمهورك إلى إنشاء الاستراتيجية المثالية، نحن معك في كل خطوة على الطريق.",
        link: "",
        icon: "research"
      },
      {
        title: "إعلانات جوجل",
        description: "الوصول إلى جمهورك المستهدف حيث يقضون معظم وقتهم - عبر الإنترنت. مع إعلانات جوجل، نقوم بإنشاء حملات جذابة تدفع حركة المرور والعملاء المحتملين والتحويلات، مما يساعد عملك على الازدهار في المشهد الرقمي.",
        link: "",
        icon: "googleadsicon"
      },
      {
        title: "تحليلات جوجل",
        description: "اكتشف قوة البيانات مع تحليلات جوجل. احصل على رؤى قيمة حول أداء موقعك الإلكتروني وسلوك المستخدم ومعدلات التحويل. مع هذه المعرفة، نحسن استراتيجياتك لتحقيق أقصى تأثير ونمو.",
        link: "",
        icon: "googleanalyticsicon"
      },
      {
        title: "مدير العلامات من جوجل",
        description: "تبسيط عمليات التتبع والتحليلات الخاصة بك مع مدير العلامات من جوجل. إدارة العلامات والبكسلات والنصوص البرمجية على موقعك بسلاسة، مما يضمن جمع البيانات بدقة وتتبع الأداء بسلاسة.",
        link: "",
        icon: "googletagmanager"
      },
      {
        title: "استراتيجية إعادة التسويق",
        description: "أعد التفاعل مع الزوار السابقين وحولهم إلى عملاء مخلصين مع استراتيجية إعادة التسويق لدينا. من خلال استهداف المستخدمين الذين تفاعلوا مع علامتك التجارية بشكل استراتيجي، نحافظ على بقاء عملك في المقدمة ونقود عمليات التحويل المتكررة.",
        link: "",
        icon: "remarketing"
      },
      {
        title: "التقارير والتحليل",
        description: "تتبع تقدمك وقياس نجاحك مع خدمات التقارير والتحليل الشاملة لدينا. من أداء الحملة إلى بيانات الجمهور، نقدم رؤى قابلة للتنفيذ تعلم استراتيجياتك المستقبلية وتدفع التحسين المستمر.",
        link: "",
        icon: "reports"
      }
    ]
  }
};

const GoogleServices = () => {
  const { language } = useLanguage();
  const [isRTL, setIsRTL] = useState(false);
  const [projects, setProjects] = useState(localTranslations.en.projects);
  
  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Set content based on current language
    if (language === 'ar') {
      setProjects(localTranslations.ar.projects);
    } else {
      setProjects(localTranslations.en.projects);
    }
    
    console.log('GoogleServices - Current language:', language);
  }, [language]);

  // Get translations based on current language
  const translations = language === 'ar' ? localTranslations.ar : localTranslations.en;
  const textAlign = isRTL ? 'text-right' : 'text-left';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  return (
    <section className="py-10">
      <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5" dir={textDirection}>
        <h1 className={`font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl ${textAlign}`}>
          {isRTL ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{translations.title.part2}</span>{translations.title.part1}
            </>
          ) : (
            <>
              {translations.title.part1}<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{translations.title.part2}</span>
            </>
          )}
        </h1>
        <p className={`flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none ${textAlign}`}>
          {translations.description}
        </p>
      </div>
      <div className="container px-6 py-5 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
          <HoverEffect items={projects} isRTL={isRTL} />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
            <FormService buttonText={translations.buttonText} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleServices;


