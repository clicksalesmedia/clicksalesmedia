'use client'
import React from 'react'
import Link from 'next/link'
import { useLanguage } from "@/app/providers/LanguageProvider";

interface ServicePageProps {
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    buttonText: {
        en: string;
        ar: string;
    };
    icon: React.ReactNode;
    href: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ title, description, buttonText, icon, href }) => {
    const { language } = useLanguage();
    
    return (
        <div className="flex flex-col h-full bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors p-6">
            <div className="mb-4 text-[#B28757]">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-secondaryColor">{language === 'en' ? title.en : title.ar}</h3>
            <p className="text-gray-400 mb-6 flex-grow">{language === 'en' ? description.en : description.ar}</p>
            <Link href={href} className="mt-auto">
                <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#B28757] to-secondaryColor rounded-md hover:from-secondaryColor hover:to-[#B28757] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryColor transition-all">
                    {language === 'en' ? buttonText.en : buttonText.ar}
                </span>
            </Link>
        </div>
    )
}

export default ServicePage 