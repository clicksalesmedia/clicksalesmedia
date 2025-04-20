"use client"
import React from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';
import Image from 'next/image';

function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section className="relative bg-primaryColor dark:bg-gray-900 overflow-hidden py-16 md:py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondaryColor blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondaryColor blur-3xl rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text content */}
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">
                {t('aboutHero.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-whiteColor mb-3">
              {t('aboutHero.subtitle')} <span className="font-bold text-secondaryColor">{t('aboutHero.highlightedText')}</span>
            </p>
            <p className="text-slate-200 mb-4 mx-auto lg:ms-auto lg:me-0 max-w-xl">
              {t('aboutHero.description')}
            </p>
            <p className="text-slate-200 mb-8 mx-auto lg:ms-auto lg:me-0 max-w-xl italic">
              {t('aboutHero.values')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-secondaryColor/10 border border-secondaryColor/30 rounded-lg">
                <h3 className="text-secondaryColor font-bold text-lg">{t('aboutHero.foundedIn')}</h3>
                <p className="text-whiteColor text-2xl font-bold">{t('aboutHero.year')}</p>
              </div>
              <div className="text-center p-4 bg-secondaryColor/10 border border-secondaryColor/30 rounded-lg">
                <h3 className="text-secondaryColor font-bold text-lg">{t('aboutHero.happyClients')}</h3>
                <p className="text-whiteColor text-2xl font-bold">{t('aboutHero.clientsCount')}</p>
              </div>
              <div className="text-center p-4 bg-secondaryColor/10 border border-secondaryColor/30 rounded-lg">
                <h3 className="text-secondaryColor font-bold text-lg">{t('aboutHero.successfulProjects')}</h3>
                <p className="text-whiteColor text-2xl font-bold">{t('aboutHero.projectsCount')}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-end'} order-first lg:order-last`}>
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-secondaryColor/50">
                <Image 
                  src="/websites/aiclicksalemedia.png" 
                  alt={isRTL ? "فريق كليك سيلز ميديا" : "ClickSalesMedia Team"}
                  width={500} 
                  height={500} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondaryColor/20 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondaryColor/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero