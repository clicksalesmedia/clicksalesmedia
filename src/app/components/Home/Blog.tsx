'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Data from "@/app/ui/data";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";

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
  day: number;
  month: string;
}

type BlogCardProps = {
  post: Post;
};

// Sample blog posts data with client images
const samplePosts: Post[] = [
  {
    id: "1",
    title: "Digital Marketing Strategies for 2023",
    titleAr: "استراتيجيات التسويق الرقمي لعام 2023",
    content: "Explore the latest digital marketing strategies that can help your business grow in the coming year.",
    contentAr: "استكشف أحدث استراتيجيات التسويق الرقمي التي يمكن أن تساعد عملك على النمو في العام المقبل.",
    coverImage: "/clients/bajunaid-company.png",
    slug: "digital-marketing-strategies-2023",
    day: 15,
    month: "January",
  },
  {
    id: "2",
    title: "The Power of SEO for Small Businesses",
    titleAr: "قوة تحسين محركات البحث للشركات الصغيرة",
    content: "Learn how small businesses can leverage SEO to compete with larger companies in their industry.",
    contentAr: "تعرف على كيفية استفادة الشركات الصغيرة من تحسين محركات البحث للتنافس مع الشركات الكبرى في مجالها.",
    coverImage: "/clients/maeva-2.png",
    slug: "power-of-seo-small-businesses",
    day: 22,
    month: "February",
  },
  {
    id: "3",
    title: "Building a Strong Brand Identity Online",
    titleAr: "بناء هوية علامة تجارية قوية عبر الإنترنت",
    content: "Discover the essential elements for creating a memorable and effective brand identity in the digital world.",
    contentAr: "اكتشف العناصر الأساسية لإنشاء هوية علامة تجارية فعالة ولا تُنسى في العالم الرقمي.",
    coverImage: "/clients/wse.png",
    slug: "building-strong-brand-identity",
    day: 8,
    month: "March",
  }
];

const BlogSection: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const getTitle = (post: Post) => {
    return language === 'ar' && post.titleAr ? post.titleAr : post.title;
  };

  const getContent = (post: Post) => {
    return language === 'ar' && post.contentAr ? post.contentAr : post.content;
  };

  // BlogCard component
  const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const stripHtml = (html: string) => {
      return html; // No need to strip HTML as our sample data is already plain text
    };
    
    return (
      <div className="max-w-sm bg-black bg-opacity-30 border border-secondaryColor rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/blog/${post.slug}`} passHref>
            <div className="relative h-48 w-full bg-white">
              <Image
                src={post.coverImage}
                alt={getTitle(post)}
                fill
                className="rounded-t-lg object-contain p-4"
                unoptimized={true}
                onError={(e) => {
                  console.error("Failed to load image:", post.coverImage);
                  const target = e.target as HTMLImageElement;
                  target.src = '/clients/wse.png'; // Fallback image
                }}
              />
            </div>
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
        <Image src="/svg/arrows.svg" alt="Arrows" width={45} height={45} />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        <Data sectionName="blog" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {samplePosts.map((post, index) => (
            <BlogCard key={`post-${post.id}-${index}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 