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
  titleAr?: string | null;
  content: string;
  contentAr?: string | null;
  excerpt?: string | null;
  excerptAr?: string | null;
  coverImage: string;
  slug: string;
  createdAt: string;
  categories: Category[];
  day: number;
  month: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const { language } = useLanguage();
  const { t } = useTranslation();

  const isArabic = language === 'ar';
  const postsPerPage = 12;

  useEffect(() => {
    // Reset pagination when language changes
    setCurrentPage(1);
    setPosts([]);
    setHasMore(true);
    fetchBlogPosts(1, true);
  }, [language]);

  const fetchBlogPosts = async (page: number = 1, reset: boolean = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await fetch(`/api/blog?published=true&limit=${postsPerPage}&page=${page}&language=${language}&format=paginated`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      
      // Process posts to add day and month
      const processedPosts = data.posts.map((post: any) => {
        const date = new Date(post.createdAt);
        return {
          ...post,
          day: date.getDate(),
          month: date.toLocaleString(language === 'ar' ? 'ar-EG' : 'default', { month: 'long' }),
        };
      });

      if (reset) {
        setPosts(processedPosts);
      } else {
        setPosts(prev => [...prev, ...processedPosts]);
      }
      
      setTotalPosts(data.total);
      setHasMore(data.page < data.totalPages);
      setError(null);
      
    } catch (error) {
      console.error('Failed to fetch posts', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchBlogPosts(nextPage, false);
    }
  };

  const getTitle = (post: Post) => {
    return isArabic && post.titleAr ? post.titleAr : post.title;
  };

  const getContent = (post: Post) => {
    return isArabic && post.contentAr ? post.contentAr : post.content;
  };

  const getExcerpt = (post: Post) => {
    if (isArabic && post.excerptAr) return post.excerptAr;
    if (post.excerpt) return post.excerpt;
    
    // Fallback to content preview
    const content = getContent(post);
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.substring(0, 120) + (textContent.length > 120 ? '...' : '');
  };

  const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
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
            <div className={`flex flex-wrap gap-2 mb-3 ${isArabic ? 'justify-end' : ''}`}>
              {post.categories.map((category) => (
                <span 
                  key={category.id} 
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondaryColor/20 text-secondaryColor"
                >
                  {category.name}
                </span>
              ))}
            </div>
            
            <h2 className={`text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-secondaryColor transition-colors duration-200 ${isArabic ? 'text-right' : ''}`}>
              {getTitle(post)}
            </h2>
            
            <p className={`text-sm text-gray-300 line-clamp-2 mb-4 ${isArabic ? 'text-right' : ''}`}>
              {getExcerpt(post)}
            </p>
            
            <div className={`mt-auto pt-4 border-t border-gray-800 ${isArabic ? 'text-right' : ''}`}>
              <span className={`inline-flex items-center text-sm font-medium text-secondaryColor ${isArabic ? 'flex-row-reverse' : ''}`}>
                {isArabic && (
                  <svg className="mr-1 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                )}
                {t('common.readMore')}
                {!isArabic && (
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-[#272727]" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.blog.title')}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t('home.blog.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-black rounded-xl shadow-lg border border-gray-800 animate-pulse">
                <div className="aspect-[16/9] bg-gray-800 rounded-t-xl"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded"></div>
                    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-[#272727]" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.blog.title')}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t('home.blog.description')}</p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-6">
              {isArabic ? 'فشل في تحميل المقالات' : 'Failed to load blog posts'}
            </p>
            <button
              onClick={() => fetchBlogPosts(1, true)}
              className="inline-flex items-center px-6 py-3 bg-secondaryColor text-black font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              {isArabic ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#272727]" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.blog.title')}</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t('home.blog.description')}</p>
          {totalPosts > 0 && (
            <p className="text-gray-400 text-sm mt-2">
              {isArabic ? `إجمالي ${totalPosts} مقال` : `${totalPosts} articles available`}
            </p>
          )}
        </div>
        
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`inline-flex items-center px-8 py-4 bg-secondaryColor text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isArabic ? 'جاري التحميل...' : 'Loading...'}
                    </>
                  ) : (
                    <>
                      {isArabic && (
                        <svg className="mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 14.707a1 1 0 010-1.414L10.586 8 5.293 2.707a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {isArabic ? 'تحميل المزيد' : 'Load More Posts'}
                      {!isArabic && (
                        <svg className="ml-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 14.707a1 1 0 010-1.414L10.586 8 5.293 2.707a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-6">
              {isArabic ? 'لا توجد مقالات متاحة حالياً' : 'No blog posts available yet.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
