'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaArrowRight, FaExternalLinkAlt, FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';
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
        
        // Handle both response formats: direct array or { items: [...], total: number }
        const portfolioData = Array.isArray(data) ? data : (data.items || []);
        console.log(`Retrieved ${portfolioData.length} portfolio items`);
        
        // Ensure we have an array before processing
        if (!Array.isArray(portfolioData)) {
          console.error('Portfolio data is not an array:', portfolioData);
          throw new Error('Invalid portfolio data format received from API');
        }
        
        // Make sure all items have the Arabic fields defined, even if empty
        const processedData = portfolioData.map((item: PortfolioItem) => ({
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

  const projectTypeLabels: Record<string, { label: string; color: string; bgColor: string; gradient: string }> = {
    WEBSITE: { label: 'Website', color: 'text-blue-700', bgColor: 'bg-blue-50', gradient: 'from-blue-500 to-cyan-500' },
    SEO: { label: 'SEO', color: 'text-green-700', bgColor: 'bg-green-50', gradient: 'from-green-500 to-emerald-500' },
    PPC: { label: 'PPC', color: 'text-purple-700', bgColor: 'bg-purple-50', gradient: 'from-purple-500 to-violet-500' },
    SOCIAL_MEDIA: { label: 'Social Media', color: 'text-pink-700', bgColor: 'bg-pink-50', gradient: 'from-pink-500 to-rose-500' },
    EMAIL_MARKETING: { label: 'Email Marketing', color: 'text-yellow-700', bgColor: 'bg-yellow-50', gradient: 'from-yellow-500 to-orange-500' },
    CONTENT_MARKETING: { label: 'Content Marketing', color: 'text-indigo-700', bgColor: 'bg-indigo-50', gradient: 'from-indigo-500 to-blue-500' },
    BRANDING: { label: 'Branding', color: 'text-red-700', bgColor: 'bg-red-50', gradient: 'from-red-500 to-pink-500' },
    OTHER: { label: 'Other', color: 'text-gray-700', bgColor: 'bg-gray-50', gradient: 'from-gray-500 to-slate-500' },
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
      <div className="flex items-center justify-center min-h-screen bg-primaryColor">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-thirdColor rounded-full"></div>
          <div className="absolute top-0 w-20 h-20 border-4 border-t-secondaryColor rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-secondaryColor rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 bg-primaryColor min-h-screen text-whiteColor">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-whiteColor px-8 py-6 rounded-2xl shadow-2xl" role="alert">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl">Error Loading Portfolio</h3>
                <p className="text-red-300 mt-1">{error}</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-3 bg-secondaryColor hover:bg-secondaryColor/90 text-primaryColor rounded-xl transition-all transform hover:scale-105 flex items-center font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primaryColor min-h-screen text-whiteColor">
      {/* Enhanced Hero Section */}
      <div className="relative h-[60vh] overflow-hidden flex items-center justify-center pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-footerBgColor via-primaryColor to-footerBgColor"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-secondaryColor/20 to-transparent"></div>
          <div className="grid grid-cols-8 h-full opacity-30">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-thirdColor/20"></div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center bg-secondaryColor/20 backdrop-blur-sm border border-secondaryColor/30 rounded-full px-6 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaTrophy className="text-secondaryColor mr-2" />
            <span className="text-secondaryColor font-medium">Our Success Stories</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight font-cormorant"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our <span className="text-secondaryColor">Portfolio</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover the digital experiences we've crafted for our clients. Each project tells a unique story of innovation, growth, and success.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center bg-whiteColor/5 backdrop-blur-sm rounded-lg px-4 py-2">
              <FaUsers className="text-secondaryColor mr-2" />
              <span>50+ Happy Clients</span>
            </div>
            <div className="flex items-center bg-whiteColor/5 backdrop-blur-sm rounded-lg px-4 py-2">
              <FaChartLine className="text-secondaryColor mr-2" />
              <span>200% Avg Growth</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced curved divider */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-primaryColor">
            <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 mt-4 md:mt-8 relative z-30">
        {/* Enhanced Search and Filter Controls */}
        <div className="mb-16">
          <div className="bg-footerBgColor/60 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-thirdColor/20">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-thirdColor text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search by client name, project type, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-primaryColor/80 border border-thirdColor/40 rounded-2xl pl-12 pr-6 py-4 text-whiteColor placeholder-thirdColor focus:outline-none focus:ring-2 focus:ring-secondaryColor focus:border-transparent transition-all"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl transition-all font-medium ${
                  showFilters 
                    ? 'bg-secondaryColor text-primaryColor' 
                    : 'bg-primaryColor/80 hover:bg-primaryColor text-whiteColor border border-thirdColor/40'
                }`}
              >
                <FaFilter className="mr-2" />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Enhanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 border-t border-thirdColor/30 mt-8">
                    <div className="text-gray-300 mb-4 font-medium text-lg">Filter by category:</div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setFilter('ALL')}
                        className={`px-6 py-3 rounded-full transition-all font-medium ${
                          filter === 'ALL'
                            ? 'bg-secondaryColor text-primaryColor shadow-lg scale-105'
                            : 'bg-primaryColor/80 text-whiteColor hover:bg-primaryColor border border-thirdColor/40'
                        }`}
                      >
                        All Projects
                      </button>
                      {Object.keys(PortfolioType).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilter(type)}
                          className={`px-6 py-3 rounded-full transition-all font-medium ${
                            filter === type
                              ? 'bg-secondaryColor text-primaryColor shadow-lg scale-105'
                              : 'bg-primaryColor/80 text-whiteColor hover:bg-primaryColor border border-thirdColor/40'
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

        {/* Enhanced Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-lg font-light">
            {filteredItems.length === 0 ? (
              <span className="text-thirdColor">No results found</span>
            ) : (
              <span>
                Showing <span className="font-bold text-secondaryColor text-xl">{filteredItems.length}</span> 
                <span className="text-thirdColor ml-1">
                  {filteredItems.length === 1 ? 'project' : 'projects'}
                </span>
              </span>
            )}
          </div>
          {filteredItems.length > 0 && (
            <div className="text-sm text-thirdColor">
              Scroll to explore our work
            </div>
          )}
        </div>

        {/* Enhanced Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-footerBgColor/40 backdrop-blur-sm rounded-3xl p-12 max-w-2xl mx-auto border border-thirdColor/20">
              <div className="w-24 h-24 bg-thirdColor/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-thirdColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-whiteColor">No Projects Found</h3>
              <p className="text-thirdColor mb-8 text-lg">
                {searchQuery ? 
                  `We couldn't find any projects matching "${searchQuery}"` :
                  `We don't have any ${filter !== 'ALL' ? projectTypeLabels[filter]?.label : ''} projects to display right now.`
                }
              </p>
              <button 
                onClick={() => {setFilter('ALL'); setSearchQuery('');}}
                className="px-8 py-4 bg-secondaryColor text-primaryColor rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all font-medium"
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
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariant}
                  exit={{ opacity: 0, y: 20 }}
                  className="h-full"
                >
                  <Link href={`/our-work/${item.slug}`} className="block h-full group">
                    <div className="h-full bg-footerBgColor/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:shadow-secondaryColor/20 border border-thirdColor/20 flex flex-col">
                      {/* Enhanced Image Section */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                        
                        {/* Enhanced badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          {item.featured && (
                            <div className="bg-secondaryColor text-primaryColor px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                              ⭐ Featured
                            </div>
                          )}
                          <div className="ml-auto bg-secondaryColor/90 text-primaryColor px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                            {projectTypeLabels[item.projectType]?.label}
                          </div>
                        </div>

                        {/* URL indicator */}
                        {item.url && (
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-whiteColor p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-whiteColor mb-2 line-clamp-2 group-hover:text-secondaryColor transition-colors duration-300">
                            {isRTL && item.titleAr ? item.titleAr : item.title}
                          </h3>
                          
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 bg-secondaryColor rounded-full mr-2"></div>
                            <p className="text-gray-300 text-sm">
                              <span className="font-medium">Client:</span> {isRTL && item.clientNameAr ? item.clientNameAr : item.clientName}
                            </p>
                          </div>

                          <p className="text-thirdColor text-sm line-clamp-3 mb-4 leading-relaxed">
                            {isRTL && item.descriptionAr ? item.descriptionAr : item.description}
                          </p>
                        </div>
                        
                        {/* Tech Stack */}
                        {item.techStack.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {item.techStack.slice(0, 3).map((tech, i) => (
                                <span key={i} className="bg-primaryColor/60 border border-thirdColor/30 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                                  {tech}
                                </span>
                              ))}
                              {item.techStack.length > 3 && (
                                <span className="bg-secondaryColor/20 border border-secondaryColor/30 text-secondaryColor px-3 py-1 rounded-lg text-xs font-medium">
                                  +{item.techStack.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Enhanced CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-thirdColor/20">
                          <div className="text-secondaryColor font-semibold text-sm flex items-center opacity-80 group-hover:opacity-100 transition-all duration-300">
                            View Case Study 
                            <FaArrowRight className="ml-2 text-xs transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <div className="text-xs text-thirdColor">
                            {new Date(item.createdAt).getFullYear()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Enhanced Call to Action Section */}
        {filteredItems.length > 0 && (
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-footerBgColor/60 backdrop-blur-xl p-12 rounded-3xl border border-thirdColor/20 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-whiteColor font-cormorant">
                Ready to Start Your Project?
              </h2>
              <p className="text-thirdColor text-lg mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Contact us to discuss your next project and join our success stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 bg-secondaryColor text-primaryColor rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                  Start Your Project
                </Link>
                <Link href="/services" className="px-8 py-4 bg-transparent border-2 border-secondaryColor text-secondaryColor rounded-2xl hover:bg-secondaryColor hover:text-primaryColor transition-all font-semibold">
                  View Our Services
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
