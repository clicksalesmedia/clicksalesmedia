'use client'
import { useEffect, useState } from 'react';
import HoverEffect from "@/app/ui/card-hover-effect";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";

const Features = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [featureItems, setFeatureItems] = useState<any[]>([]);
  
  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Create the feature items with translations
    const items = [
      {
        title: t('b2b.features.services.branding.title' as any),
        description: t('b2b.features.services.branding.description' as any),
        link: "",
        icon: "branding"
      },
      {
        title: t('b2b.features.services.accountBasedMarketing.title' as any),
        description: t('b2b.features.services.accountBasedMarketing.description' as any),
        link: "",
        icon: "sales"
      },
      {
        title: t('b2b.features.services.leadGeneration.title' as any),
        description: t('b2b.features.services.leadGeneration.description' as any),
        link: "",
        icon: "target-leadgen"
      },
      {
        title: t('b2b.features.services.strategy.title' as any),
        description: t('b2b.features.services.strategy.description' as any),
        link: "",
        icon: "strategy"
      },
      {
        title: t('b2b.features.services.demandGeneration.title' as any),
        description: t('b2b.features.services.demandGeneration.description' as any),
        link: "",
        icon: "demand-generation"
      },
      {
        title: t('b2b.features.services.salesEnablement.title' as any),
        description: t('b2b.features.services.salesEnablement.description' as any),
        link: "",
        icon: "sales-enablement"
      },
      {
        title: t('b2b.features.services.contentManagement.title' as any),
        description: t('b2b.features.services.contentManagement.description' as any),
        link: "",
        icon: "content-management"
      },
      {
        title: t('b2b.features.services.adsManagement.title' as any),
        description: t('b2b.features.services.adsManagement.description' as any),
        link: "",
        icon: "ads-management"
      },
      {
        title: t('b2b.features.services.innovation.title' as any),
        description: t('b2b.features.services.innovation.description' as any),
        link: "",
        icon: "innovation"
      }
    ];
    
    setFeatureItems(items);
  }, [language, t]);
  
  return (
    <section className="py-10">
      <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
        <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          {isRTL ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">{t('b2b.features.highlight' as any)}</span> {t('b2b.features.title' as any)}
            </>
          ) : (
            <>
              {t('b2b.features.title' as any)}<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]"> {t('b2b.features.highlight' as any)}</span>
            </>
          )}
        </h1>
        <p className="flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
          {t('b2b.features.description' as any)}
        </p>
      </div>
      <div className="container px-6 py-5 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
          <HoverEffect items={featureItems} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
};

export default Features;


