'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';

enum PortfolioType {
  WEBSITE = 'WEBSITE',
  SEO = 'SEO',
  PPC = 'PPC',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL_MARKETING = 'EMAIL_MARKETING',
  CONTENT_MARKETING = 'CONTENT_MARKETING',
  BRANDING = 'BRANDING',
  OTHER = 'OTHER',
}

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  description: string;
  coverImage: string;
  projectType: PortfolioType;
  techStack: string[];
  featured: boolean;
  createdAt: string;
  titleAr?: string;
  clientNameAr?: string;
  descriptionAr?: string;
}

const FeaturedWork = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get language-specific field
  const getLocalizedField = (item: PortfolioItem, field: string, arField: string) => {
    if (isRTL && item[arField as keyof PortfolioItem]) {
      return item[arField as keyof PortfolioItem];
    }
    return item[field as keyof PortfolioItem];
  };

  useEffect(() => {
    async function fetchPortfolioItems() {
      try {
        const response = await fetch('/api/portfolio?published=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio items');
        }
        
        const data = await response.json();
        
        // Handle both response formats: direct array or { items: [...], total: number }
        const portfolioData = Array.isArray(data) ? data : (data.items || []);
        
        // Get the latest 3 items sorted by creation date (newest first)
        const latestItems = portfolioData
          .sort((a: PortfolioItem, b: PortfolioItem) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);
        
        setPortfolioItems(latestItems);
      } catch (err) {
        console.error('Error fetching portfolio items:', err);
        setError('Failed to load portfolio items');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolioItems();
  }, []);

  const projectTypeLabels: Record<string, { label: string; labelAr: string; color: string; bgColor: string }> = {
    WEBSITE: { label: 'Website', labelAr: 'موقع ويب', color: 'text-blue-800', bgColor: 'bg-blue-100' },
    SEO: { label: 'SEO', labelAr: 'تحسين محركات البحث', color: 'text-green-800', bgColor: 'bg-green-100' },
    PPC: { label: 'PPC', labelAr: 'إعلانات الدفع لكل نقرة', color: 'text-purple-800', bgColor: 'bg-purple-100' },
    SOCIAL_MEDIA: { label: 'Social Media', labelAr: 'وسائل التواصل الاجتماعي', color: 'text-pink-800', bgColor: 'bg-pink-100' },
    EMAIL_MARKETING: { label: 'Email Marketing', labelAr: 'التسويق عبر البريد الإلكتروني', color: 'text-yellow-800', bgColor: 'bg-yellow-100' },
    CONTENT_MARKETING: { label: 'Content Marketing', labelAr: 'تسويق المحتوى', color: 'text-indigo-800', bgColor: 'bg-indigo-100' },
    BRANDING: { label: 'Branding', labelAr: 'العلامة التجارية', color: 'text-red-800', bgColor: 'bg-red-100' },
    OTHER: { label: 'Other', labelAr: 'أخرى', color: 'text-gray-800', bgColor: 'bg-gray-100' },
  };

  if (error) {
    return (
      <section className="py-20 bg-[#1f1f1f]" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          {/* Section Header - Same style as Features */}
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 mb-16">
            <span className={`rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-white bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'أعمالنا' : 'Our Work'}
            </span>
            <h2 className={`font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'مشاريعنا ' : 'Recent Projects '} 
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {isRTL ? 'الأخيرة' : '& Success Stories'}
              </span>
            </h2>
          </div>
          <div className="text-center">
            <p className={`text-red-400 mb-4 ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'فشل في تحميل عناصر المحفظة' : 'Failed to load portfolio items'}
            </p>
            <Link href="/our-work" className={`inline-flex items-center px-6 py-3 bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300 ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'عرض أعمالنا' : 'View Our Work'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
            {isRTL ? 'أعمالنا' : 'Our Work'}
          </span>
          <h2 className={`font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white ${isRTL ? 'font-noto-kufi' : ''}`}>
            {isRTL ? 'مشاريعنا ' : 'Recent Projects '} 
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
              {isRTL ? 'الأخيرة' : '& Success Stories'}
            </span>
          </h2>
          <p className={`text-white ${isRTL ? 'font-noto-kufi' : ''}`}>
            {isRTL 
              ? 'تحقق من بعض مشاريعنا الحديثة التي تحقق نتائج استثنائية لعملائنا وتعكس خبرتنا في مختلف المجالات الرقمية.'
              : 'Discover our recent projects that deliver exceptional results for our clients, showcasing our expertise across various digital domains.'
            }
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <FaSpinner className="animate-spin text-[#C3A177] text-4xl mx-auto mb-4" />
              <p className={`text-gray-300 ${isRTL ? 'font-noto-kufi' : ''}`}>
                {isRTL ? 'جاري تحميل أعمالنا الأخيرة...' : 'Loading our latest work...'}
              </p>
            </div>
          </div>
        ) : portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#2a2a2a] rounded-lg overflow-hidden group hover:shadow-xl hover:shadow-secondaryColor/10 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-white">
                  <Image
                    src={work.coverImage || '/clients/wse.png'}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/our-work/${work.slug}`} className={`bg-secondaryColor text-white py-2 px-4 rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${isRTL ? 'font-noto-kufi' : ''}`}>
                      {isRTL ? 'عرض المشروع' : 'View Project'}
                    </Link>
                  </div>
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${projectTypeLabels[work.projectType]?.bgColor} ${projectTypeLabels[work.projectType]?.color} ${isRTL ? 'font-noto-kufi' : ''}`}>
                      {isRTL 
                        ? projectTypeLabels[work.projectType]?.labelAr || work.projectType
                        : projectTypeLabels[work.projectType]?.label || work.projectType
                      }
                    </span>
                  </div>
                  {work.featured && (
                    <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                      <span className={`bg-secondaryColor text-white text-xs font-bold px-2 py-1 rounded-full ${isRTL ? 'font-noto-kufi' : ''}`}>
                        {isRTL ? '⭐ مميز' : '⭐ Featured'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-secondaryColor transition-colors duration-300 ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                    {getLocalizedField(work, 'title', 'titleAr') as string}
                  </h3>
                  <p className={`text-gray-400 text-sm mb-4 ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                    {getLocalizedField(work, 'clientName', 'clientNameAr') as string}
                  </p>
                  <p className={`text-gray-300 mb-4 line-clamp-2 ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                    {getLocalizedField(work, 'description', 'descriptionAr') as string}
                  </p>
                  <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {work.techStack && work.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className={`text-xs bg-[#333] text-gray-300 px-2 py-1 rounded ${isRTL ? 'font-noto-kufi' : ''}`}>
                        {tech}
                      </span>
                    ))}
                    {work.techStack && work.techStack.length > 3 && (
                      <span className={`text-xs bg-[#333] text-gray-300 px-2 py-1 rounded ${isRTL ? 'font-noto-kufi' : ''}`}>
                        +{work.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  <Link 
                    href={`/our-work/${work.slug}`}
                    className={`inline-flex items-center text-secondaryColor hover:text-primaryColor transition-colors ${isRTL ? 'font-noto-kufi flex-row-reverse' : ''}`}
                  >
                    {isRTL ? 'عرض التفاصيل' : 'View details'} 
                    <FaArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className={`text-gray-400 mb-4 ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'لا توجد عناصر محفظة متاحة بعد.' : 'No portfolio items available yet.'}
            </p>
            <Link href="/our-work" className={`text-secondaryColor hover:text-primaryColor transition-colors ${isRTL ? 'font-noto-kufi' : ''}`}>
              {isRTL ? 'تحقق مرة أخرى قريباً ←' : 'Check back soon →'}
            </Link>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/our-work" className="inline-block">
            <div className="relative group">
              <button className={`px-8 py-3 text-white font-semibold rounded-sm overflow-hidden relative ${isRTL ? 'font-noto-kufi' : ''}`}>
                <span className="relative z-10">{isRTL ? 'عرض جميع المشاريع' : 'View All Projects'}</span>
                <motion.div
                  initial={{ left: 0 }}
                  animate={{ left: '-300%' }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 4,
                    ease: 'linear',
                  }}
                  className="bg-[linear-gradient(to_right,#c3a177,#cc9f6e,#d19b61,#ce8442,#bf752b)] absolute z-0 inset-0 w-[400%]"
                ></motion.div>
              </button>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork; 