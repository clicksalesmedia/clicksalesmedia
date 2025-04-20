'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@/app/hooks/useTranslation'

function WebClicksalesmedia() {
  const { t } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
  }, []);

  const textDirection = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'text-right' : 'text-left';

  return (
    <>
    <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
      <div className="col-span-4 lg:col-span-6">
      <object type="image/svg+xml" data="/svg/sv.svg">svg-animation</object>
        </div>
        <div className="col-span-4 lg:col-span-6 pt-40" dir={textDirection}>
        <div className={`${textAlign}`}>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {t('webSolutions.webAnimation.title')}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('webSolutions.webAnimation.subtitle')}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {t('webSolutions.webAnimation.description')} </p>
              </div>
              <div className='pt-10'>
                {/* 
              <button
                   type="button"
                 className="text-white bg-gradient-to-r from-[#e2c3a1] via-secondaryColor to-[#af8054] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                 >
                 Learn More
              </button>
                */}
              </div>
              
        </div>
      </div>
    </div>
  </section>
    <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6" dir={textDirection}>
        <div className={`${textAlign}`}>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {t('webSolutions.uiUxDesigns.title')}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('webSolutions.uiUxDesigns.subtitle')}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {t('webSolutions.uiUxDesigns.description')} </p>
              </div>
        </div>
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/ui-web.png" width={600} height={400} alt='Web performance' />
        </div>
      </div>
    </div>
  </section>
  <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/website-performance.png" width={600} height={400} alt='Web performance' />
        </div>
        <div className="col-span-4 lg:col-span-6" dir={textDirection}>
        <div className={`${textAlign}`}>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {t('webSolutions.webPerformance.title')}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('webSolutions.webPerformance.subtitle')}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {t('webSolutions.webPerformance.description')}
                </p>
              </div>
        </div>
      </div>
    </div>
  </section>
  <section className='py-20'>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-6" dir={textDirection}>
        <div className={`${textAlign}`}>
                <span className="rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {t('webSolutions.uniqueSystem.title')}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t('webSolutions.uniqueSystem.subtitle')}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                {t('webSolutions.uniqueSystem.description')}
                </p>
              </div>
        </div>
        <div className="col-span-4 lg:col-span-6">
            <Image src="/expertise/websolutions/system-clicksalesmedia.png" width={600} height={400} alt='Web performance' />
        </div>
      </div>
    </div>
  </section>
  </>
  )
}

export default WebClicksalesmedia
