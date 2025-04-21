'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaArrowRight } from 'react-icons/fa';
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

// Portfolio item type matching our database model
interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  description: string;
  coverImage: string;
  gallery: string[];
  projectType: PortfolioType;
  results?: string;
  metrics?: any;
  techStack: string[];
  url?: string;
  published: boolean;
  featured: boolean;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  titleAr?: string;
  clientNameAr?: string;
  descriptionAr?: string;
}

export default function OurWorkPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Helper function to get language-specific field
  const getLocalizedField = (item: PortfolioItem, field: string, arField: string) => {
    if (isRTL && item[arField as keyof PortfolioItem]) {
      return item[arField as keyof PortfolioItem];
    }
    return item[field as keyof PortfolioItem];
  };

  // Fetch portfolio items on page load
  useEffect(() => {
    async function fetchPortfolioItems() {
      try {
        console.log('Fetching portfolio items...');
        const response = await fetch('/api/portfolio?published=true');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Portfolio API Error:', { 
            status: response.status, 
            statusText: response.statusText,
            data: errorData 
          });
          throw new Error(`Failed to fetch portfolio items: ${errorData.details || response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Retrieved ${data.length} portfolio items`);
        
        // Make sure all items have the Arabic fields defined, even if empty
        const processedData = data.map((item: PortfolioItem) => ({
          ...item,
          titleAr: item.titleAr || "",
          clientNameAr: item.clientNameAr || "",
          descriptionAr: item.descriptionAr || "",
        }));
        
        setPortfolioItems(processedData);
        setFilteredItems(processedData);
      } catch (err) {
        const errorMessage = (err as Error).message || 'Failed to load portfolio items';
        console.error('Portfolio fetch error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolioItems();
  }, []);

  // Apply filters when filter or search changes
  useEffect(() => {
    let result = portfolioItems;
    
    // Apply category filter
    if (filter !== 'ALL') {
      result = result.filter((item) => item.projectType === filter);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) => {
          // Check in both English and Arabic fields
          const titleMatch = item.title.toLowerCase().includes(query) || 
                            ((item.titleAr || '').toLowerCase().includes(query));
          const clientMatch = item.clientName.toLowerCase().includes(query) || 
                             ((item.clientNameAr || '').toLowerCase().includes(query));
          const descMatch = item.description.toLowerCase().includes(query) || 
                           ((item.descriptionAr || '').toLowerCase().includes(query));
          const techMatch = item.techStack.some(tech => tech.toLowerCase().includes(query));
          
          return titleMatch || clientMatch || descMatch || techMatch;
        }
      );
    }
    
    setFilteredItems(result);
  }, [filter, searchQuery, portfolioItems]);

  const projectTypeLabels: Record<string, { label: string; color: string; bgColor: string }> = {
    WEBSITE: { label: 'Website', color: 'text-blue-800', bgColor: 'bg-blue-100' },
    SEO: { label: 'SEO', color: 'text-green-800', bgColor: 'bg-green-100' },
    PPC: { label: 'PPC', color: 'text-purple-800', bgColor: 'bg-purple-100' },
    SOCIAL_MEDIA: { label: 'Social Media', color: 'text-pink-800', bgColor: 'bg-pink-100' },
    EMAIL_MARKETING: { label: 'Email Marketing', color: 'text-yellow-800', bgColor: 'bg-yellow-100' },
    CONTENT_MARKETING: { label: 'Content Marketing', color: 'text-indigo-800', bgColor: 'bg-indigo-100' },
    BRANDING: { label: 'Branding', color: 'text-red-800', bgColor: 'bg-red-100' },
    OTHER: { label: 'Other', color: 'text-gray-800', bgColor: 'bg-gray-100' },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#272727]">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 w-full h-full border-8 border-gray-800 rounded-full"></div>
          <div className="absolute top-0 w-full h-full border-8 border-t-secondaryColor rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondaryColor font-bold">
            LOADING
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#272727] min-h-screen text-white">
        <div className="bg-red-900/40 border-l-4 border-red-500 text-white px-6 py-4 rounded-lg" role="alert">
          <div className="flex items-center mb-2">
            <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span className="font-semibold text-xl">Error Loading Portfolio</span>
          </div>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#272727] min-h-screen text-white">
      {/* Hero Section with Parallax */}
      <div className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black opacity-50 z-10"
          style={{
            backgroundImage: 'url("/images/portfolio-hero.jpg")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        ></div>
        <motion.div 
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our <span className="text-secondaryColor">{t('portfolio.mainTitle')}</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('portfolio.mainSubtitle')}
          </motion.p>
        </motion.div>
        
        {/* Curved shape divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-[#272727]">
            <path d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 -mt-10 relative z-30">
        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects by name, client, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryColor focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 md:w-auto"
              >
                <FaFilter className="mr-2" />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-700 mt-4">
                    <div className="text-gray-300 mb-3 font-medium">Filter by category:</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-full transition-all ${
                          filter === 'ALL'
                            ? 'bg-secondaryColor text-black font-medium'
                            : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-700'
                        }`}
                      >
                        All Projects
                      </button>
                      {Object.keys(PortfolioType).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilter(type)}
                          className={`px-4 py-2 rounded-full transition-all ${
                            filter === type
                              ? 'bg-secondaryColor text-black font-medium'
                              : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-700'
                          }`}
                        >
                          {projectTypeLabels[type]?.label || type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-lg font-light">
          {filteredItems.length === 0 ? (
            <span>No results found</span>
          ) : (
            <span>Showing <span className="font-semibold text-secondaryColor">{filteredItems.length}</span> {filteredItems.length === 1 ? 'project' : 'projects'}</span>
          )}
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-gray-800/40 rounded-xl p-10 max-w-2xl mx-auto border border-gray-700">
              <svg className="w-20 h-20 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-2xl font-bold mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 
                  `We couldn't find any projects matching "${searchQuery}"` :
                  `We don't have any ${filter !== 'ALL' ? projectTypeLabels[filter]?.label : ''} projects to display right now.`
                }
              </p>
              <button 
                onClick={() => {setFilter('ALL'); setSearchQuery('');}}
                className="px-6 py-3 bg-secondaryColor text-black rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariant}
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full"
                >
                  <Link href={`/our-work/${item.slug}`} className="block h-full">
                    <div className="group h-full bg-gray-900 rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-secondaryColor/20 border border-gray-800 flex flex-col">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                        {item.featured && (
                          <div className="absolute top-4 left-4 bg-secondaryColor text-black px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            Featured
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${projectTypeLabels[item.projectType]?.bgColor} ${projectTypeLabels[item.projectType]?.color}`}>
                            {projectTypeLabels[item.projectType]?.label}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="absolute bottom-0 left-0 w-full p-4">
                          <div className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full" 
                              style={{ 
                                backgroundColor: projectTypeLabels[item.projectType]?.bgColor || 'bg-gray-100',
                                color: projectTypeLabels[item.projectType]?.color || 'text-gray-800'
                              }}>
                            {item.projectType.toLowerCase() === 'website' ? t('portfolio.filters.website') :
                             item.projectType.toLowerCase() === 'seo' ? t('portfolio.filters.seo') :
                             item.projectType.toLowerCase() === 'ppc' ? t('portfolio.filters.ppc') :
                             item.projectType.toLowerCase() === 'social_media' ? t('portfolio.filters.socialMedia') :
                             item.projectType.toLowerCase() === 'email_marketing' ? t('portfolio.filters.emailMarketing') :
                             item.projectType.toLowerCase() === 'content_marketing' ? t('portfolio.filters.contentMarketing') :
                             item.projectType.toLowerCase() === 'branding' ? t('portfolio.filters.branding') :
                             t('portfolio.filters.other')}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                            {isRTL && item.titleAr ? item.titleAr : item.title}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">{t('portfolio.clientLabel')}:</span> {isRTL && item.clientNameAr ? item.clientNameAr : item.clientName}
                          </p>
                        </div>
                        
                        {item.techStack.length > 0 && (
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-2">
                              {item.techStack.slice(0, 3).map((tech, i) => (
                                <span key={i} className="bg-black/40 border border-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                                  {tech}
                                </span>
                              ))}
                              {item.techStack.length > 3 && (
                                <span className="bg-black/40 border border-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                                  +{item.techStack.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 text-secondaryColor font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-0 group-hover:translate-x-1">
                          View Project <FaArrowRight className="ml-2 text-xs" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
