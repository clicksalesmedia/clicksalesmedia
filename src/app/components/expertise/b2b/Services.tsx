'use client'
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/app/providers/LanguageProvider';
import { useTranslation } from '@/app/hooks/useTranslation';

function Services() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
  }, [language]);

  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-primaryColor pt-16 pb-32 space-y-24">
        {/* First Section: ROI Optimization */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className={`px-4 py-16 sm:px-6 lg:py-20 lg:px-8 xl:py-24 ${isRTL ? 'lg:col-start-2 text-right' : ''}`}>
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  {t('b2b.services.roiOptimization.tag' as any)}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t('b2b.services.roiOptimization.title' as any)}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  {t('b2b.services.roiOptimization.description' as any)}
                </p>
              </div>
            </div>
            <div className={`mt-12 sm:mt-16 lg:mt-0 ${isRTL ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
              <div className={`flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <img
                  alt="ROI Optimization"
                  loading="lazy"
                  className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
                  src="/expertise/b2b/returen-on-investement.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Section: Our System */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className={`px-4 py-16 sm:px-6 lg:py-20 lg:px-8 xl:py-24 ${isRTL ? 'text-right' : 'lg:col-start-2'}`}>
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  {t('b2b.services.ourSystem.tag' as any)}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t('b2b.services.ourSystem.title' as any)}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  {t('b2b.services.ourSystem.description' as any)}
                </p>
              </div>
            </div>
            <div className={`mt-12 sm:mt-16 lg:mt-0 ${isRTL ? 'lg:col-start-2' : ''}`}>
              <div className={`flex justify-center ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <img
                  alt="Our System"
                  loading="lazy"
                  className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
                  src="/expertise/b2b/clicksalesmedia-system.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Section: Customers Optimization */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24">
            <div className={`px-4 py-16 sm:px-6 lg:py-10 lg:px-8 xl:py-14 ${isRTL ? 'lg:col-start-2 text-right' : ''}`}>
              <div>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  {t('b2b.services.customersOptimization.tag' as any)}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {t('b2b.services.customersOptimization.title' as any)}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  {t('b2b.services.customersOptimization.description' as any)}
                </p>
              </div>
            </div>
            <div className={`mt-12 sm:mt-16 lg:mt-0 ${isRTL ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
              <div className={`flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-end'}`}>
                <img
                  alt="Customers Optimization"
                  loading="lazy"
                  className="w-full max-w-md ring-1 ring-black ring-opacity-5 lg:w-auto"
                  src="/expertise/b2b/contract.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;