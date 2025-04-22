"use client"
import FormService from '@/app/ui/modal'
import SpiningText from '@/app/ui/spiningText'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/app/hooks/useTranslation'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function NewHero() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <>
            <section className="py-8 mt-24 bg-cover bg-center relative">
                {/* Background pattern as a next/image for better performance */}
                <div className="absolute inset-0 -z-10">
                    <Image 
                        src="/mesh-clicksalesmedia.png" 
                        alt="Background pattern"
                        fill
                        sizes="100vw"
                        quality={60}
                        priority={true}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                
                <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-stretch gap-10">
                    <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto">
                        <Image 
                            src="/clicksalesmedia-marketing-agency.png" 
                            width={1125} 
                            height={700} 
                            alt="Clicksalesmedia - AI Performance Marketing Agency in Dubai helping businesses grow with data-driven strategies" 
                            className="lg:w-full lg:h-full object-cover" 
                            priority={true}
                            loading="eager"
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="lg:w-1/2 lg:py-10 xl:py-12 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto ">
                        <h1 className={`font-semibold leading-tight text-secondaryColor dark:text-white text-2xl md:text-3xl lg:text-4xl ${isRTL ? 'text-right' : ''}`}>
                            {t('home.hero.title')} <div className="relative inline-block px-2">
                                <SpiningText />
                            </div>
                        </h1>
                        <p className={`mt-4 text-whiteColor dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                            {t('home.hero.subtitle')}
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <FormService buttonText={t('common.transformTraffic')} />
                            <Link href="/our-work" passHref
                                className="px-6 py-3 flex items-center border-[1.5px] border-secondaryColor dark:border-gray-300 text-secondaryColor rounded-full duration-300 transition-colors hover:bg-secondaryColor hover:text-white">
                                <span className="mr-2">See Portfolio</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                                    <path d="M15.8791 22.9374L22.9166 15.9L15.8791 8.8625M21.0641 15.9H7.08331" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}