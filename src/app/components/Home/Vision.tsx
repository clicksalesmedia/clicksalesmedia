'use client'
import Image from "next/image"
import Data from "@/app/ui/data";
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';
import { motion } from 'framer-motion';

function Vision() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section className="py-20 bg-[#1f1f1f]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Section Header - Same style as Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 mb-16"
        >
          <span className={`rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-white bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] ${isRTL ? 'font-noto-kufi' : ''}`}>
            {isRTL ? 'عنا' : 'About Us'}
          </span>
          <h2 className={`font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white ${isRTL ? 'font-noto-kufi' : ''}`}>
            {isRTL ? 'مهمتنا ' : 'Our Mission '} 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
              {isRTL ? 'ورؤيتنا' : '& Vision'}
            </span>
          </h2>
          <p className={`text-white ${isRTL ? 'font-noto-kufi' : ''}`}>
            {isRTL 
              ? 'نحن ملتزمون بتقديم خدمات تسويقية استثنائية تحقق نتائج متميزة لعملائنا، مدفوعين بقيمنا الأساسية في الشفافية والإبداع والتميز.'
              : 'We are committed to delivering exceptional marketing services that achieve outstanding results for our clients, driven by our core values of transparency, creativity, and excellence.'
            }
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
            <div className="flex md:flex-1">
                <Image src="/chess-clicksalesmedia.png" alt="working on housing" width={1300} height={900} className="w-full md:h-full object-cover rounded-lg" />
            </div>
            <div className="md:w-1/2 lg:w-[54%] space-y-12 text-gray-700 dark:text-gray-300">
            <Data sectionName="vision" />
                <div className="grid sm:grid-cols-2 gap-6">

                <div className="space-y-6 p-4 bg-black bg-opacity-30 border border-secondaryColor rounded-lg">
                        <span className="rounded-full bg-secondaryColor dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </span>
                        <h2 className={`font-semibold text-xl text-secondaryColor dark:text-white ${isRTL ? 'text-right' : ''}`}>{t('vision.mission.title')}</h2>
                        <p className={isRTL ? 'text-right' : ''}>
                        {t('vision.mission.description')}
                        </p>
                    </div>
                    
                    <div className="space-y-6 p-4 bg-black bg-opacity-30 border border-secondaryColor rounded-lg">
                        <span className="rounded-full bg-secondaryColor dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </span>
                        <h2 className={`font-semibold text-xl text-secondaryColor dark:text-white ${isRTL ? 'text-right' : ''}`}>{t('vision.vision.title')}</h2>
                        <p className={isRTL ? 'text-right' : ''}>
                        {t('vision.vision.description')}
                        </p>
                    </div>

                    <div className="space-y-6 p-4 bg-black bg-opacity-30 border border-secondaryColor rounded-lg">
                        <span className="rounded-full bg-secondaryColor dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </span>
                        <h2 className={`font-semibold text-xl text-secondaryColor dark:text-white ${isRTL ? 'text-right' : ''}`}>{t('vision.values.title')}</h2>
                        <p className={isRTL ? 'text-right' : ''}>
                        {t('vision.values.description')}
                        </p>
                    </div>

                    <div className="space-y-6 p-4 bg-black bg-opacity-30 border border-secondaryColor rounded-lg">
                        <span className="rounded-full bg-secondaryColor dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>
                        </span>
                        <h2 className={`font-semibold text-xl text-secondaryColor dark:text-white ${isRTL ? 'text-right' : ''}`}>{t('vision.goals.title')}</h2>
                        <p className={isRTL ? 'text-right' : ''}>
                        {t('vision.goals.description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Vision