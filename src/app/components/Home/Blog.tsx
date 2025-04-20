'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Data from "@/app/ui/data";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";
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

type BlogCardProps = {
  post: Post;
};

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Fetch from internal API instead of external URL
    fetch('/api/blog?published=true&limit=3')
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

  // BlogCard component
  const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const imageUrl = normalizeImageUrl(post.coverImage);
    
    const stripHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };
    
    return (
      <div className="max-w-sm bg-black bg-opacity-30 border border-secondaryColor rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/blog/${post.slug}`} passHref>
            <Image
              src={imageUrl}
              alt={getTitle(post)}
              width={1300}
              height={1400}
              className="rounded-t-lg w-full aspect-[5/3] object-cover"
              unoptimized={true}
              onError={(e) => {
                console.error("Failed to load image:", imageUrl);
                const target = e.target as HTMLImageElement;
                target.src = '/images/blog_uploads/default-blog-image.jpg'; // Fallback image
              }}
            />
        </Link>
        <div className="p-5">
          <Link href={`/blog/${post.slug}`} passHref>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-secondaryColor dark:text-white line-clamp-2">
                {getTitle(post)}
              </h5>
          </Link>
          <p className="mb-3 font-light text-whiteColor dark:text-gray-400 line-clamp-2">
          {stripHtml(getContent(post))}
          </p>
          <Link href={`/blog/${post.slug}`} passHref className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondaryColor rounded-lg hover:bg-primaryColor-dark focus:ring-4 focus:outline-none focus:ring-primaryColor-light dark:bg-primaryColor dark:hover:bg-primaryColor-dark dark:focus:ring-primaryColor-light"> 
            {t('common.readMore')}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 relative">
      <div className="absolute left-0 top-3/1 transform -translate-y-1/2 hidden md:block">
        <Image src="/svg/arrows.svg" alt="Arrows" width={45} height={45} layout="fixed" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        <Data sectionName="blog" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {posts.map((post, index) => (
            <BlogCard key={`post-${post.id}-${index}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
