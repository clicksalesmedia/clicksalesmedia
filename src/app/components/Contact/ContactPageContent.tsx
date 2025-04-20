'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/app/hooks/useTranslation'
import ContactForm from './contactForm'

export default function ContactPageContent() {
  const { t } = useTranslation();
  
  return (
    <main className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2 space-y-10 text-gray-700 dark:text-gray-300 md:py-4">
          <h1 className="text-secondaryColor py-2 dark:text-white font-semibold text-2xl sm:text-3xl md:text-4xl">
            {t('contact.page.businessTitle')}
          </h1>
          <div>
            <Image className="h-auto max-w-full rounded-lg" src="/contact/digital-marketing-dubai.jpg" width={1200} height={900} alt="" />
          </div>
          <p className='flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none'>
            {t('contact.page.businessDescription')}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="tel:+97150341274" className="flex gap-x-6 items-start" rel="noreferer">
              <span className="p-3 md:p-3.5 rounded-md bg-secondaryColor dark:bg-gray-900 text-whiteColor dark:text-gray-200 flex w-max">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground text-secondaryColor text-lg font-semibold">{t('contact.page.callUs')}</p>
                <p className="font-semibold text-whiteColor dark:text-white text-sm font-semibold">{t('contact.page.phoneNumber')}</p>
              </div>
            </Link>
            <Link href="mailto:info@clicksalesmedia.com" className="flex gap-x-6 items-start" rel="noreferer">
              <span className="p-3 md:p-3.5 rounded-md bg-secondaryColor dark:bg-gray-900 text-whiteColor dark:text-gray-200 flex w-max">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground text-secondaryColor text-lg font-semibold">{t('contact.page.sendMail')}</p>
                <p className="font-semibold text-whiteColor dark:text-white text-sm font-semibold">{t('contact.page.email')}</p>
              </div>
            </Link>
            <div className="flex gap-x-6 items-start">
              <span className="p-3 md:p-3.5 rounded-md bg-secondaryColor dark:bg-gray-900 text-whiteColor dark:text-gray-200 flex w-max">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground text-secondaryColor text-lg font-semibold">{t('contact.page.addressTitle')}</p>
                <p className="font-semibold text-whiteColor dark:text-white text-sm">{t('contact.page.addressText')}</p>
              </div>
            </div>
            <div className="flex gap-x-6 items-start">
              <span className="p-3 md:p-3.5 rounded-md bg-secondaryColor dark:bg-gray-900 text-whiteColor dark:text-gray-200 flex w-max">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground text-secondaryColor text-lg font-semibold">{t('contact.page.openingHoursTitle')}</p>
                <p className="font-semibold text-whiteColor dark:text-white text-sm">{t('contact.page.openingHoursText')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-1">
          <h1 className="text-secondaryColor py-6 dark:text-white font-semibold text-2xl sm:text-3xl md:text-4xl">
            {t('contact.page.getInTouch')}
          </h1>
          <p className='flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none py-6'>
            {t('contact.page.projectDetails')}
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  )
} 