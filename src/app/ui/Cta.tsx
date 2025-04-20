'use client'
import FormService from "@/app/ui/modal"
import { useTranslation } from '@/app/hooks/useTranslation'
import { useLanguage } from '@/app/providers/LanguageProvider'

const Cta = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
                <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-primaryColor border border-secondaryColor dark:from-gray-900">
                    <div className="mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8">
                        {language === 'ar' ? (
                            <h1 className="text-3xl/tight sm:text-3xl/tight md:text-3xl/tight font-bold text-whiteColor dark:text-white text-center">
                                عزز تأثيرك <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">في كل</span> مرحلة تسويقية
                            </h1>
                        ) : (
                            <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-whiteColor dark:text-white text-center">
                                {t('cta.title.part1')} <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{t('cta.title.highlight')}</span> {t('cta.title.part2')}
                            </h1>
                        )}
                        <p className={`text-whiteColor dark:text-gray-300 text-center`}>
                        {t('cta.description')}
                        </p>
                        <div className="mx-auto max-w-md sm:max-w-xl flex justify-center">
                        <FormService buttonText={t('cta.buttonText')} />
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Cta