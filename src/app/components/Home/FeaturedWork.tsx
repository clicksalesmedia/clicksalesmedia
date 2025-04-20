'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

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
}

const FeaturedWork = () => {
  const [latestWorks, setLatestWorks] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedWorks() {
      try {
        const response = await fetch('/api/portfolio?published=true&limit=3');
        if (!response.ok) throw new Error('Failed to fetch works');
        const data = await response.json();
        setLatestWorks(data);
      } catch (error) {
        console.error('Error fetching featured works:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedWorks();
  }, []);

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

  if (loading) {
    return (
      <section className="py-20 bg-[#1f1f1f]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-t-2 border-secondaryColor border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#1f1f1f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primaryColor to-secondaryColor bg-clip-text text-transparent"
          >
            Our Latest Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg max-w-3xl mx-auto"
          >
            Check out some of our recent projects delivering exceptional results for our clients.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden group hover:shadow-xl hover:shadow-secondaryColor/10 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={work.coverImage || '/images/placeholder.jpg'}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/our-work/${work.slug}`} className="bg-secondaryColor text-white py-2 px-4 rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project
                  </Link>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${projectTypeLabels[work.projectType]?.bgColor} ${projectTypeLabels[work.projectType]?.color}`}>
                    {projectTypeLabels[work.projectType]?.label || work.projectType}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondaryColor transition-colors duration-300">
                  {work.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {work.clientName}
                </p>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.techStack && work.techStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs bg-[#333] text-gray-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {work.techStack && work.techStack.length > 3 && (
                    <span className="text-xs bg-[#333] text-gray-300 px-2 py-1 rounded">
                      +{work.techStack.length - 3}
                    </span>
                  )}
                </div>
                <Link 
                  href={`/our-work/${work.slug}`}
                  className="inline-flex items-center text-secondaryColor hover:text-primaryColor transition-colors"
                >
                  View details <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/our-work" className="inline-block">
            <div className="relative group">
              <button className="px-8 py-3 text-white font-semibold rounded-sm overflow-hidden relative">
                <span className="relative z-10">View All Projects</span>
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