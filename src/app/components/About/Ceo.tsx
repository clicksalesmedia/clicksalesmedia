"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/app/hooks/useTranslation'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function Ceo() {
    const { t } = useTranslation()
    const { language } = useLanguage()
    const isRTL = language === 'ar'
    
    return (
    <>
        <section className="py-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
                
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-14 gap-y-8 md:items-end">
                    <div className={`space-y-4 md:space-y-6 md:col-span-2 lg:col-span-1 w-full max-w-3xl lg:max-w-none mx-auto lg:mx-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <h2 className="font-display font-semibold text-2xl md:text-3xl text-secondaryColor dark:text-white">
                        {t('ceo.title')}
                        </h2>
                        <div className="text-gray-700 dark:text-gray-900 space-y-3 mx-auto max-w-2xl lg:max-w-none">
                            <p className="text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
                            {t('ceo.description')}
                            </p>
                        </div>
                        <div className="w-full flex justify-end">
                            <Link href="/contact" className="px-6 h-11 flex items-center rounded-lg bg-secondaryColor dark:bg-white text-white dark:text-gray-900 text-sm transition ease-linear hover:bg-gray-900">{t('ceo.contactUs')}</Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="avatar">
                            <div className="rounded-md">
                                <Image className="rounded-md" src="/mounir-clicksalesmedia.jpg" width={300} height={500} alt={t('ceo.ceoAlt')} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 lg:space-y-6">
                        <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} gap-x-3 p-2 md:p-3 lg:p-4 bg-secondaryColor dark:bg-gray-900 border border-[#966d3b]/80 dark:border-gray-900/80 rounded-lg`}>
                            <span className="min-w-max text-secondaryColor p-2 md:p-3 rounded-lg bg-primaryColor dark:bg-gray-800 border border-secondaryColor/70 dark:border-gray-900/70 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width={24} height={24} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </span>
                            <div className="w-full">
                                <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg block mb-1">{t('ceo.journeySuccess.title')}</span>
                                <p className="text-gray-700 dark:text-gray-300">
                                {t('ceo.journeySuccess.description')}
                                </p>
                            </div>
                        </div>
                        <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} gap-x-3 p-2 md:p-3 lg:p-4 bg-secondaryColor dark:bg-gray-900 border border-[#966d3b]/80 dark:border-gray-900/80 rounded-lg`}>
                            <span className="min-w-max text-secondaryColor p-2 md:p-3 rounded-lg bg-primaryColor dark:bg-gray-800 border border-secondaryColor/70 dark:border-gray-900/70 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width={24} height={24} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                                </svg>
                            </span>
                            <div className="w-full">
                                <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg block mb-1">{t('ceo.impactCreators.title')}</span>
                                <p className="text-gray-700 dark:text-gray-300">
                                {t('ceo.impactCreators.description')}
                                </p>
                            </div>
                        </div>
                        <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''} gap-x-3 p-2 md:p-3 lg:p-4 bg-secondaryColor dark:bg-gray-900 border border-[#966d3b]/80 dark:border-gray-900/80 rounded-lg`}>
                            <span className="min-w-max text-secondaryColor p-2 md:p-3 rounded-lg bg-primaryColor dark:bg-gray-800 border border-secondaryColor/70 dark:border-gray-900/70 dark:text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width={24} height={24} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </span>
                            <div className="w-full">
                                <span className="font-semibold text-gray-800 dark:text-gray-200 text-lg block mb-1">{t('ceo.resultsDriven.title')}</span>
                                <p className="text-gray-700 dark:text-gray-300">
                                {t('ceo.resultsDriven.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}