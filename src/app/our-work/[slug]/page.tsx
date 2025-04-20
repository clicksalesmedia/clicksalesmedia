'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGlobe, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

const projectTypeLabels: Record<string, { label: string; color: string }> = {
  WEBSITE: { label: 'Website', color: 'bg-blue-100 text-blue-800' },
  SEO: { label: 'SEO', color: 'bg-green-100 text-green-800' },
  PPC: { label: 'PPC', color: 'bg-purple-100 text-purple-800' },
  SOCIAL_MEDIA: { label: 'Social Media', color: 'bg-pink-100 text-pink-800' },
  EMAIL_MARKETING: { label: 'Email Marketing', color: 'bg-yellow-100 text-yellow-800' },
  CONTENT_MARKETING: { label: 'Content Marketing', color: 'bg-indigo-100 text-indigo-800' },
  BRANDING: { label: 'Branding', color: 'bg-red-100 text-red-800' },
  OTHER: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
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
        
        const items = await response.json();
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
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-t-4 border-secondaryColor border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="bg-[#272727] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error || 'Portfolio item not found'}</span>
          </div>
          <div className="text-center mt-8">
            <Link href="/our-work" className="inline-flex items-center text-white hover:text-secondaryColor transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to All Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#272727] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
        <Image
          src={portfolio.coverImage}
          alt={portfolio.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#272727] to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-10">
            <div className="max-w-4xl">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${projectTypeLabels[portfolio.projectType]?.color}`}>
                {projectTypeLabels[portfolio.projectType]?.label || portfolio.projectType}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {portfolio.title}
              </h1>
              <p className="text-xl text-gray-300">
                Client: {portfolio.clientName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <Link href="/our-work" className="inline-flex items-center text-white hover:text-secondaryColor transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to All Projects
            </Link>
            {portfolio.url && (
              <a 
                href={portfolio.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-secondaryColor hover:bg-secondaryColor/90 text-black font-medium py-2 px-4 rounded-full transition-all"
              >
                <FaGlobe className="mr-2" />
                Visit Project
              </a>
            )}
          </div>

          {/* Project Description */}
          <div className="bg-black bg-opacity-50 rounded-xl p-8 mb-12 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">About This Project</h2>
            <div className="text-gray-300 leading-relaxed mb-8">
              <p className="mb-4">{portfolio.description}</p>
            </div>

            {portfolio.results && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Results</h3>
                <div className="text-gray-300 leading-relaxed">
                  <p>{portfolio.results}</p>
                </div>
              </div>
            )}

            {portfolio.techStack.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolio.techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Gallery */}
          {portfolio.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolio.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-900"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
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
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 bg-secondaryColor text-black font-medium py-2 px-4 rounded-full">
                        View
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full-screen Gallery Modal */}
      {showGallery && portfolio.gallery.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <Image
              src={portfolio.gallery[currentImageIndex]}
              alt={`${portfolio.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
            
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
            >
              <FaChevronRight size={20} />
            </button>
            
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {portfolio.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 