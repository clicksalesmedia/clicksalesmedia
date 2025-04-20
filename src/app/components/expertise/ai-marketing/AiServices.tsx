'use client'

import HoverEffect from "@/app/ui/card-hover-effect";
import FormService from "@/app/ui/modal";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState, useMemo } from "react";

const AiServices = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRtl = language === 'ar';

  const projects = useMemo(() => [
    {
      title: t('aiMarketing.services.performance.title'),
      description: t('aiMarketing.services.performance.description'),
      link: "",
      icon: "web-ai-performance"
    },
    {
      title: t('aiMarketing.services.cro.title'),
      description: t('aiMarketing.services.cro.description'),
      link: "",
      icon: "cro"
    },
    {
      title: t('aiMarketing.services.automation.title'),
      description: t('aiMarketing.services.automation.description'),
      link: "",
      icon: "automation"
    },
    {
      title: t('aiMarketing.services.seo.title'),
      description: t('aiMarketing.services.seo.description'),
      link: "",
      icon: "ai-seo"
    },
    {
      title: t('aiMarketing.services.ppc.title'),
      description: t('aiMarketing.services.ppc.description'),
      link: "",
      icon: "ppc-ads-ai"
    },
    {
      title: t('aiMarketing.services.blogging.title'),
      description: t('aiMarketing.services.blogging.description'),
      link: "",
      icon: "remarketing"
    },
    {
      title: t('aiMarketing.services.email.title'),
      description: t('aiMarketing.services.email.description'),
      link: "",
      icon: "email-marketing-ai"
    },
    {
      title: t('aiMarketing.services.leadGen.title'),
      description: t('aiMarketing.services.leadGen.description'),
      link: "",
      icon: "lead-gen"
    },
    {
      title: t('aiMarketing.services.social.title'),
      description: t('aiMarketing.services.social.description'),
      link: "",
      icon: "reports"
    },
  ], [language, t]);
 
  return (
    <section className="py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 ${isRtl ? 'rtl' : ''}`}>
        <h1 className="font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
          {language === 'ar' ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">خدمات التسويق</span> بالذكاء الاصطناعي
            </>
          ) : (
            <>
              AI<span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]"> Marketing Services</span>
            </>
          )}
        </h1>
        <p className={`flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none ${isRtl ? 'text-right justify-center' : ''}`}>
          {t('aiMarketing.description')}
        </p>
      </div>
      <div className="container px-6 py-5 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
          <HoverEffect items={projects} isRTL={isRtl} />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
            <FormService buttonText={t('aiMarketing.cta')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiServices;


