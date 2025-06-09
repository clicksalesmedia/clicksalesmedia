'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";
import { normalizeImageUrl } from "@/app/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
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

type BlogCardProps = {
  post: BlogPost;
  getTitle: (post: BlogPost) => string;
  getExcerpt: (post: BlogPost) => string;
  isArabic: boolean;
};

const BlogSection: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

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
      
    } catch (error) {
      console.error('Error fetching blog posts:', error);
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

  const getTitle = (post: BlogPost) => {
    return isArabic && post.titleAr ? post.titleAr : post.title;
  };

  const getExcerpt = (post: BlogPost) => {
    if (isArabic && post.excerptAr) return post.excerptAr;
    if (post.excerpt) return post.excerpt;
    
    // Fallback to content preview
    const content = isArabic && post.contentAr ? post.contentAr : post.content;
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.substring(0, 120) + (textContent.length > 120 ? '...' : '');
  };

  // BlogCard component with brand colors
  const BlogCard: React.FC<BlogCardProps> = ({ post, getTitle, getExcerpt, isArabic }) => {
    return (
      <article className="group bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#C3A177]/20 overflow-hidden">
        {/* Image Section */}
        <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
          <div className="aspect-[16/10] relative bg-[#1E1E1E]">
            <Image
              src={normalizeImageUrl(post.coverImage)}
              alt={getTitle(post)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/blog_uploads/default-blog-image.jpg';
              }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#272727]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t('common.readMore')} →
                </span>
              </div>
            </div>

            {/* Date Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] rounded-xl shadow-lg px-3 py-2 text-center">
              <div className="text-lg font-bold text-white leading-none">{post.day}</div>
              <div className="text-xs font-medium text-white/90 uppercase tracking-wide">
                {post.month.slice(0, 3)}
              </div>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Categories */}
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {post.categories.slice(0, 2).map((category) => (
              <span 
                key={category.id} 
                className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`} className="block group">
            <h3 className={`text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#C3A177] group-hover:from-20% group-hover:via-[#AD8253] group-hover:via-30% group-hover:to-[#8C5C28] transition-all duration-300 line-clamp-2 leading-tight ${isArabic ? 'text-right' : ''}`}>
              {getTitle(post)}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className={`text-gray-300 line-clamp-3 leading-relaxed text-sm ${isArabic ? 'text-right' : ''}`}>
            {getExcerpt(post)}
          </p>

          {/* Read More Button */}
          <div className={`pt-4 border-t border-[#C3A177]/20 ${isArabic ? 'text-right' : ''}`}>
            <Link 
              href={`/blog/${post.slug}`} 
              className={`inline-flex items-center text-[#C3A177] hover:text-white hover:bg-gradient-to-br hover:from-[#C3A177] hover:from-20% hover:via-[#AD8253] hover:via-30% hover:to-[#8C5C28] hover:px-3 hover:py-1 hover:rounded-full transition-all duration-300 font-semibold text-sm group ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              {isArabic && (
                <svg className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              {t('common.readMore')}
              {!isArabic && (
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          </div>
        </div>
      </article>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-[#272727]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
          <div className="text-center mb-12">
            <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5">
              <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-white bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                {isArabic ? 'المدونة' : 'Our Blog'}
              </span>
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white">
                {t('home.blog.title')}
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="bg-gradient-to-br from-[#2A2A2A] to-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden animate-pulse border border-[#C3A177]/20">
                <div className="aspect-[16/10] bg-[#1E1E1E]"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-[#C3A177]/20 rounded w-1/3"></div>
                  <div className="h-6 bg-[#C3A177]/20 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#C3A177]/20 rounded"></div>
                    <div className="h-4 bg-[#C3A177]/20 rounded w-2/3"></div>
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
      <section className="py-20 bg-[#272727]">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 text-center">
          <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 mb-8">
            <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-white bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
              {isArabic ? 'المدونة' : 'Our Blog'}
            </span>
            <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white">
              {t('home.blog.title')}
            </h2>
          </div>
          <p className="text-gray-300 mb-8">Unable to load blog posts at the moment.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
          >
            View All Posts
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#272727] relative" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Decorative Arrow */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden sm:block">
        <Image 
          src="/svg/arrows.svg"
          alt="Arrows"
          width={45}
          height={45}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        {/* Section Header */}
        <div className="flex flex-col justify-center text-center mx-auto md:max-w-3xl space-y-5 mb-16">
          <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-white bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">
            {isArabic ? 'المدونة' : 'Our Blog'}
          </span>
          <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-white">
            {isArabic ? 'أحدث المقالات' : 'Latest Articles'} <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28]">{isArabic ? 'والأفكار' : '& Insights'}</span>
          </h2>
          <p className="text-white">
            {t('home.blog.description')}
          </p>
          {totalPosts > 0 && (
            <p className="text-gray-400 text-sm">
              {isArabic ? `إجمالي ${totalPosts} مقال` : `${totalPosts} articles available`}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  getTitle={getTitle} 
                  getExcerpt={getExcerpt} 
                  isArabic={isArabic}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center space-y-4">
              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`inline-flex items-center px-8 py-4 bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              )}
              
              {/* View All Button */}
              <div>
                <Link 
                  href="/blog" 
                  className={`inline-flex items-center px-6 py-3 border-2 border-[#C3A177] text-[#C3A177] font-semibold rounded-lg hover:bg-[#C3A177] hover:text-black transition-all duration-300 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  {isArabic && (
                    <svg className="mr-3 w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isArabic ? 'عرض جميع المقالات' : 'View All Posts'}
                  {!isArabic && (
                    <svg className="ml-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-6">
              {isArabic ? 'لا توجد مقالات متاحة حالياً' : 'No blog posts available yet.'}
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-[#C3A177] from-20% via-[#AD8253] via-30% to-[#8C5C28] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              {isArabic ? 'استكشف المدونة' : 'Explore Blog'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection; 