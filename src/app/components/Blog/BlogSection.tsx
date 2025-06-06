'use client'
import React, { useState, useEffect } from 'react'; // Import React hooks
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../providers/LanguageProvider';
import { useTranslation } from '@/app/hooks/useTranslation';
import { normalizeImageUrl } from '@/app/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  coverImage: string;
  slug: string;
  createdAt: string;
  categories: Category[];
  day: number;
  month: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/blog?published=true')
      .then((response) => response.json())
      .then((data) => {
        setPosts(
          data.map((post: any) => {
            const date = new Date(post.createdAt);
            return {
              ...post,
              day: date.getDate(),
              month: date.toLocaleString(language === 'ar' ? 'ar-EG' : 'default', { month: 'long' }),
            };
          })
        );
      })
      .catch((error) => console.error('Failed to fetch posts', error));
  }, [language]);

  const getTitle = (post: Post) => {
    return language === 'ar' && post.titleAr ? post.titleAr : post.title;
  };

  const getContent = (post: Post) => {
    return language === 'ar' && post.contentAr ? post.contentAr : post.content;
  };

  const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
    // Use the normalize function to get a properly formatted image URL
    const imageUrl = normalizeImageUrl(post.coverImage);

    return (
      <Link 
        href={`/blog/${post.slug}`} 
        passHref 
        className="group block transition-all duration-300 h-full"
      >
        <div className="h-full flex flex-col rounded-xl overflow-hidden bg-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800">
          <div className="relative overflow-hidden">
            <div className="aspect-[16/9] relative">
              <Image
                src={imageUrl}
                alt={getTitle(post)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/blog_uploads/default-blog-image.jpg';
                }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">{t('common.readMore')} →</p>
              </div>
            </div>
            
            {/* Date badge */}
            <div className="absolute top-4 right-4 bg-gray-900 rounded-lg shadow-md px-3 py-2 text-center">
              <p className="text-lg font-bold text-white">{post.day}</p>
              <p className="text-xs font-medium text-gray-300">{post.month.slice(0, 3)}</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-5">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.map((category) => (
                <span 
                  key={category.id} 
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondaryColor/20 text-secondaryColor"
                >
                  {category.name}
                </span>
              ))}
            </div>
            
            <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-secondaryColor transition-colors duration-200">
              {getTitle(post)}
            </h2>
            
            <div 
              className="text-sm text-gray-300 line-clamp-2 mb-4 prose-sm"
              dangerouslySetInnerHTML={{ __html: getContent(post) }}
            />
            
            <div className="mt-auto pt-4 border-t border-gray-800">
              <span className="inline-flex items-center text-sm font-medium text-secondaryColor">
                {t('common.readMore')}
                <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-16 bg-[#272727]">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.blog.title')}</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t('home.blog.description')}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
