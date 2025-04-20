'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TracingBeam } from '../../ui/tracing-beam';
import { useLanguage } from '../../providers/LanguageProvider';
import { normalizeImageUrl } from '@/app/lib/utils';

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Post = {
  id: string;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  excerpt: string;
  excerptAr: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  categories: Category[];
};

const Details = () => {
  const pathname = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const isArabic = language === 'ar';

  useEffect(() => {
    if (!pathname) {
      console.error('Pathname is null');
      setIsLoading(false);
      setError('Invalid URL');
      return;
    }

    const urlSlug = pathname.split('/').pop();
    console.log('Extracted slug from pathname:', urlSlug);
    
    if (urlSlug) {
      setIsLoading(true);
      
      // Fetch the post directly using the slug route
      console.log('Fetching blog post from API:', `/api/blog/${urlSlug}`);
      fetch(`/api/blog/${urlSlug}`)
        .then(response => {
          console.log('API response status:', response.status);
          if (!response.ok) {
            throw new Error(`Failed to fetch post details (Status: ${response.status})`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Received blog post data:', data ? 'Yes' : 'No');
          setPost(data);
          // Set the document title programmatically since we can't use Head component
          if (data?.title) {
            document.title = isArabic && data.titleAr ? data.titleAr : data.title;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname, language, isArabic]);

  const getTitle = () => {
    if (!post) return '';
    return isArabic && post.titleAr ? post.titleAr : post.title;
  };

  const getContent = () => {
    if (!post) return '';
    return isArabic && post.contentAr ? post.contentAr : post.content;
  };

  if (isLoading) return <div className="py-20 text-center">Loading...</div>;
  if (error) return <div className="py-20 text-center">Error: {error}</div>;
  if (!post) return <div className="py-20 text-center">Post not found</div>;

  // Use the normalizeImageUrl utility function to handle the image URL properly
  const imageUrl = normalizeImageUrl(post.coverImage);
  console.log("Normalized image URL for display:", imageUrl);

  return (
    <article className='py-20' dir={isArabic ? 'rtl' : 'ltr'}>
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="mb-10">
            {/* Always show an image - either the cover image or a default */}
            <Image
              src={imageUrl}
              alt={getTitle()}
              height={500}
              width={1000}
              className="rounded-lg mb-10 object-cover w-full"
              unoptimized={true} 
              priority // Add priority to ensure the cover image loads quickly
              onError={(e) => {
                // If image fails to load, replace with default
                console.error("Image failed to load:", imageUrl);
                const target = e.target as HTMLImageElement;
                target.src = '/images/blog_uploads/default-blog-image.jpg';
              }}
            />
            
            <style jsx global>{`
              /* Shared styles for both languages */
              .blog-content h1,
              .blog-content h2,
              .blog-content h3,
              .blog-content h4,
              .blog-content h5,
              .blog-content h6 {
                font-weight: 700;
                color: var(--secondary-color);
                ${isArabic ? 'text-align: right !important;' : ''}
              }
              
              .blog-content h2 {
                font-size: ${isArabic ? '1.85rem' : '2.25rem'};
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                line-height: ${isArabic ? '1.6' : '1.3'};
              }
              
              .blog-content h3 {
                font-size: ${isArabic ? '1.5rem' : '1.75rem'};
                margin-top: 1.25rem;
                margin-bottom: 0.75rem;
                line-height: ${isArabic ? '1.5' : '1.3'};
              }
              
              .blog-content p {
                font-size: 1.125rem;
                line-height: ${isArabic ? '2' : '1.8'};
                margin-bottom: 1.25rem;
                font-weight: ${isArabic ? '500' : '400'};
                color: #f8f8f8;
                ${isArabic ? 'text-align: right !important;' : ''}
              }
              
              .blog-content ul, 
              .blog-content ol {
                margin-${isArabic ? 'right' : 'left'}: 1.5rem;
                margin-bottom: 1.25rem;
                ${isArabic ? 'padding-right: 1rem; text-align: right !important;' : ''}
              }
              
              .blog-content li {
                margin-bottom: 0.5rem;
                font-size: 1.125rem;
                line-height: ${isArabic ? '1.9' : '1.7'};
                ${isArabic ? 'text-align: right !important;' : ''}
              }
              
              .blog-content a {
                color: var(--secondary-color);
                text-decoration: underline;
              }
              
              .blog-content blockquote {
                border-${isArabic ? 'right' : 'left'}: 4px solid var(--secondary-color);
                padding-${isArabic ? 'right' : 'left'}: 1rem;
                font-style: italic;
                margin: 1.5rem 0;
                ${isArabic ? 'text-align: right !important;' : ''}
              }
              
              /* Arabic-specific typography enhancements */
              ${isArabic ? `
                .blog-content {
                  font-family: 'Cairo', 'Tajawal', sans-serif;
                  letter-spacing: -0.01em;
                  text-align: right !important;
                  direction: rtl !important;
                }
                
                .blog-content h2, .blog-content h3 {
                  letter-spacing: -0.02em;
                }
                
                /* Force RTL for all content with high specificity */
                .blog-content *,
                .blog-content p,
                .blog-content div,
                .blog-content span,
                .blog-content h1,
                .blog-content h2,
                .blog-content h3,
                .blog-content h4,
                .blog-content h5,
                .blog-content h6,
                .blog-content ul,
                .blog-content ol,
                .blog-content li,
                .blog-content blockquote {
                  text-align: right !important;
                  direction: rtl !important;
                }
              ` : ''}
            `}</style>
            
            <h1 className={`${isArabic ? 'text-4xl leading-relaxed text-right' : 'text-5xl'} font-bold text-secondaryColor mb-6`}>
              {getTitle()}
            </h1>
            
            <div className={`flex flex-wrap gap-2 mb-6 ${isArabic ? 'justify-end' : ''}`}>
              {post.categories.map(category => (
                <span key={category.id} className="bg-secondaryColor text-primaryColor rounded-full text-sm font-bold px-3 py-1">
                  {category.name}
                </span>
              ))}
            </div>
            
            <div className={`text-base prose prose-xl dark:prose-invert custom-content ${isArabic ? 'text-right rtl' : ''}`}
                 style={isArabic ? { direction: 'rtl', textAlign: 'right' } : {}}>
              <div className={`blog-content content-container text-base my-6 ${isArabic ? 'text-right rtl' : ''}`}
                   style={isArabic ? { direction: 'rtl', textAlign: 'right' } : {}}
                   dangerouslySetInnerHTML={{ __html: getContent() }}>
              </div>
            </div>
          </div>
        </div>
      </TracingBeam>
    </article>
  );
};

export default Details;
