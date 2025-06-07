'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaGlobe, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaUser, FaTag, FaExternalLinkAlt, FaEye } from 'react-icons/fa';

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

interface Portfolio {
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
}

const projectTypeLabels: Record<string, { label: string; color: string; gradient: string }> = {
  WEBSITE: { label: 'Website', color: 'bg-blue-100 text-blue-800', gradient: 'from-blue-500 to-cyan-500' },
  SEO: { label: 'SEO', color: 'bg-green-100 text-green-800', gradient: 'from-green-500 to-emerald-500' },
  PPC: { label: 'PPC', color: 'bg-purple-100 text-purple-800', gradient: 'from-purple-500 to-violet-500' },
  SOCIAL_MEDIA: { label: 'Social Media', color: 'bg-pink-100 text-pink-800', gradient: 'from-pink-500 to-rose-500' },
  EMAIL_MARKETING: { label: 'Email Marketing', color: 'bg-yellow-100 text-yellow-800', gradient: 'from-yellow-500 to-orange-500' },
  CONTENT_MARKETING: { label: 'Content Marketing', color: 'bg-indigo-100 text-indigo-800', gradient: 'from-indigo-500 to-blue-500' },
  BRANDING: { label: 'Branding', color: 'bg-red-100 text-red-800', gradient: 'from-red-500 to-pink-500' },
  OTHER: { label: 'Other', color: 'bg-gray-100 text-gray-800', gradient: 'from-gray-500 to-slate-500' },
};

export default function PortfolioDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    async function fetchPortfolioItem() {
      try {
        // Use a query to find the item by slug since our API is set up by ID
        const response = await fetch(`/api/portfolio?published=true`);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const data = await response.json();
        
        // Handle both response formats: direct array or { items: [...], total: number }
        const items = Array.isArray(data) ? data : (data.items || []);
        
        // Ensure we have an array before processing
        if (!Array.isArray(items)) {
          console.error('Portfolio items data is not an array:', items);
          throw new Error('Invalid portfolio data format received from API');
        }
        
        const currentItem = items.find((item: Portfolio) => item.slug === slug);
        
        if (!currentItem) {
          throw new Error('Portfolio item not found');
        }
        
        setPortfolio(currentItem);
      } catch (err) {
        console.error('Error fetching portfolio item:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPortfolioItem();
    }
  }, [slug]);

  const handlePrevImage = () => {
    if (!portfolio?.gallery.length) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolio.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!portfolio?.gallery.length) return;
    setCurrentImageIndex((prev) => 
      prev === portfolio.gallery.length - 1 ? 0 : prev + 1
    );
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

  if (error || !portfolio) {
    return (
      <div className="bg-primaryColor min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-whiteColor px-8 py-6 rounded-3xl shadow-2xl" role="alert">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M6 12h12M6 12l4-4m-4 4l4 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Portfolio Item Not Found</h3>
                  <p className="text-red-300 mt-1">{error || 'This project could not be found'}</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/our-work" className="inline-flex items-center px-6 py-3 bg-secondaryColor text-primaryColor rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all font-medium">
                <FaArrowLeft className="mr-2" />
                Back to All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primaryColor min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden pt-20 md:pt-24">
        <Image
          src={portfolio.coverImage}
          alt={portfolio.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primaryColor via-black/60 to-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <div className="bg-secondaryColor/90 text-primaryColor px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  {projectTypeLabels[portfolio.projectType]?.label || portfolio.projectType}
                </div>
                {portfolio.featured && (
                  <div className="bg-secondaryColor text-primaryColor px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured Project
                  </div>
                )}
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-whiteColor mb-6 leading-tight font-cormorant"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {portfolio.title}
              </motion.h1>
              
              <motion.div
                className="flex flex-wrap items-center gap-6 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center bg-whiteColor/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <FaUser className="text-secondaryColor mr-2" />
                  <span className="font-medium">Client: {portfolio.clientName}</span>
                </div>
                <div className="flex items-center bg-whiteColor/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <FaCalendarAlt className="text-secondaryColor mr-2" />
                  <span>{new Date(portfolio.createdAt).getFullYear()}</span>
                </div>
                <div className="flex items-center bg-whiteColor/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <FaUser className="text-secondaryColor mr-2" />
                  <span>By {portfolio.author.name}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Navigation */}
        <div className="absolute top-28 md:top-32 left-8 right-8 flex justify-between items-center z-20">
          <Link href="/our-work" className="group flex items-center bg-black/60 backdrop-blur-sm hover:bg-black/80 text-whiteColor px-6 py-3 rounded-full transition-all font-medium">
            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          {portfolio.url && (
            <a 
              href={portfolio.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center bg-secondaryColor hover:shadow-lg text-primaryColor font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              <FaGlobe className="mr-2" />
              Visit Live Site
              <FaExternalLinkAlt className="ml-2 text-sm transform group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Project Overview */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="bg-footerBgColor/60 backdrop-blur-sm rounded-3xl p-8 border border-thirdColor/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-whiteColor mb-6 flex items-center font-cormorant">
                  <div className="w-2 h-8 bg-secondaryColor rounded-full mr-4"></div>
                  About This Project
                </h2>
                <div className="text-gray-300 leading-relaxed mb-8 text-lg">
                  <p>{portfolio.description}</p>
                </div>

                {portfolio.results && (
                  <div className="mt-8 p-6 bg-secondaryColor/10 backdrop-blur-sm border border-secondaryColor/20 rounded-2xl">
                    <h3 className="text-xl font-bold text-whiteColor mb-4 flex items-center">
                      <FaEye className="text-secondaryColor mr-2" />
                      Results & Impact
                    </h3>
                    <div className="text-gray-300 leading-relaxed">
                      <p>{portfolio.results}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Project Details Sidebar */}
            <div className="space-y-6">
              <div className="bg-footerBgColor/60 backdrop-blur-sm rounded-3xl p-6 border border-thirdColor/20 shadow-2xl">
                <h3 className="text-xl font-bold text-whiteColor mb-6">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-thirdColor/20">
                    <span className="text-thirdColor">Client</span>
                    <span className="text-whiteColor font-medium">{portfolio.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-thirdColor/20">
                    <span className="text-thirdColor">Category</span>
                    <span className="bg-secondaryColor/90 text-primaryColor px-3 py-1 rounded-full text-sm font-medium">
                      {projectTypeLabels[portfolio.projectType]?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-thirdColor/20">
                    <span className="text-thirdColor">Year</span>
                    <span className="text-whiteColor font-medium">{new Date(portfolio.createdAt).getFullYear()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-thirdColor">Author</span>
                    <span className="text-whiteColor font-medium">{portfolio.author.name}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Technologies */}
              {portfolio.techStack.length > 0 && (
                <div className="bg-footerBgColor/60 backdrop-blur-sm rounded-3xl p-6 border border-thirdColor/20 shadow-2xl">
                  <h3 className="text-xl font-bold text-whiteColor mb-6 flex items-center">
                    <FaTag className="text-secondaryColor mr-2" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {portfolio.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="bg-primaryColor/80 backdrop-blur-sm border border-thirdColor/30 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:border-secondaryColor/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Project Gallery */}
          {portfolio.gallery.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-whiteColor mb-4 font-cormorant">
                  Project <span className="text-secondaryColor">Gallery</span>
                </h2>
                <p className="text-thirdColor text-lg">Explore the visual journey of this project</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {portfolio.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-footerBgColor border border-thirdColor/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowGallery(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${portfolio.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="bg-secondaryColor text-primaryColor font-bold py-2 px-4 rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Full Size
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-whiteColor text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1} / {portfolio.gallery.length}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Call to Action */}
          <div className="text-center">
            <div className="bg-footerBgColor/60 backdrop-blur-xl p-12 rounded-3xl border border-thirdColor/20 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-whiteColor font-cormorant">
                Like What You See?
              </h2>
              <p className="text-thirdColor text-lg mb-8 max-w-2xl mx-auto">
                Ready to create something amazing together? Let's discuss your project and bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 bg-secondaryColor text-primaryColor rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
                  Start Your Project
                </Link>
                <Link href="/our-work" className="px-8 py-4 bg-transparent border-2 border-secondaryColor text-secondaryColor rounded-2xl hover:bg-secondaryColor hover:text-primaryColor transition-all font-semibold">
                  View More Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Full-screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && portfolio.gallery.length > 0 && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full max-w-7xl aspect-video">
              <Image
                src={portfolio.gallery[currentImageIndex]}
                alt={`${portfolio.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-xl shadow-2xl"
              />
              
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-whiteColor p-4 rounded-full transition-all hover:scale-110 border border-thirdColor/30"
              >
                <FaChevronLeft size={24} />
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-whiteColor p-4 rounded-full transition-all hover:scale-110 border border-thirdColor/30"
              >
                <FaChevronRight size={24} />
              </button>
              
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-whiteColor p-3 rounded-full transition-all hover:scale-110 border border-thirdColor/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-whiteColor px-6 py-3 rounded-full border border-thirdColor/30">
                <span className="text-secondaryColor font-semibold">{currentImageIndex + 1}</span> / {portfolio.gallery.length}
              </div>

              {/* Gallery thumbnails */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-lg overflow-x-auto px-4">
                {portfolio.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-secondaryColor scale-110' 
                        : 'border-thirdColor/30 hover:border-thirdColor'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 