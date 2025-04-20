'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { normalizeImageUrl } from '@/app/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  coverImage: string;
  createdAt: string;
  categories: Category[];
  day: number;
  month: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/blog?published=true&limit=1')
      .then((response) => response.json())
      .then((data) => { 
        setPosts(
          data.map((post: any) => {
            const date = new Date(post.createdAt);
            return {
              ...post,
              day: date.getDate(),
              month: date.toLocaleString('default', { month: 'long' }),
            };
          })
        );
      })
      .catch((error) => console.error('Failed to fetch posts', error));
  }, []);

  // Assuming posts are sorted by date, with the most recent first
  const latestPost = posts[0];
  return (
    <div>
      {/* Conditionally render LatestBlog only if there's a latest post */}
      {latestPost && <LatestBlog post={latestPost} />}
    </div>
  );
};


const LatestBlog: React.FC<{ post: Post }> = ({ post }) => {
  // Add console logging for debugging
  console.log("Latest blog cover image:", post.coverImage);
  
  return (
    <section className="py-24 bg-[#272727]">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative inline-block">
              Latest Article
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondaryColor"></span>
            </h2>
          </div>
          <div className="md:text-right">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-white hover:text-secondaryColor transition-colors duration-300"
            >
              View all articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-black to-gray-900 border border-gray-800">
          <div className="grid md:grid-cols-12 gap-0">
            {/* Image container (spans 7 columns on md screens) */}
            <div className="md:col-span-7 relative overflow-hidden group">
              <div className="aspect-[16/9] md:aspect-auto md:h-full relative">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="w-full h-[400px] relative mb-6">
                    <Image
                      src={normalizeImageUrl(post.coverImage)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
                      unoptimized={true}
                      priority
                      onError={(e) => {
                        console.error("Failed to load image:", post.coverImage);
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/blog_uploads/default-blog-image.jpg'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6">
                      <span className="bg-secondaryColor text-black px-4 py-2 rounded-full text-sm font-semibold inline-block">
                        Featured
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Content container (spans 5 columns on md screens) */}
            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-center relative">
              {/* Date display */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-secondaryColor font-bold">{post.day}</span>
                </div>
                <span className="text-gray-300 font-medium">{post.month}</span>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <span 
                    key={category.id} 
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-secondaryColor/20 text-secondaryColor border border-secondaryColor/30"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              
              <Link href={`/blog/${post.slug}`} className="group block mb-5">
                <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-secondaryColor transition-colors duration-300">
                  {post.title}
                </h3>
              </Link>
              
              <div 
                className="text-gray-300 mb-8 md:line-clamp-3 prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              <Link 
                href={`/blog/${post.slug}`} 
                className="mt-auto inline-flex items-center bg-secondaryColor hover:bg-secondaryColor/90 text-black font-medium py-3 px-6 rounded-full transition-all duration-300 group"
              >
                Read Full Article
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
