'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Data from "@/app/ui/data";

type Category = {
  _id: string;
  name: string;
};

type PostData = {
  id: number; 
  createdAt: string; //
};

type Post = PostData & {
  thumbnailUrl: string;
  title: string;
  content:string;
  slug: string;
  day: string;
  month: string;
  categories: Category[];
};

type BlogCardProps = {
  post: Post;
};

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); 

  useEffect(() => {
    fetch("https://administration.clicksalesmedia.com/api/posts")
      .then((response) => response.json())
      .then((data: PostData[]) => {
        const enhancedPosts = data.slice(0, 3).map((post) => {
          const date = new Date(post.createdAt);
          return {
            ...post,
            day: date.getDate().toString(),
            month: date.toLocaleString('default', { month: 'long' })
          };
        });
        setPosts(enhancedPosts as Post[]);
      })
      .catch((error) => console.error("Failed to fetch posts", error));
  }, []);

  // BlogCard component
  const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const stripHtml = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };
    return (
      <div className="max-w-sm bg-black bg-opacity-30 border border-secondaryColor rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/blog/${post.slug}`} passHref>
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={1300}
              height={1400}
              className="rounded-t-lg w-full aspect-[5/3] object-cover"
            />
        </Link>
        <div className="p-5">
          <Link href={`/blog/${post.slug}`} passHref>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-secondaryColor dark:text-white line-clamp-2">
                {post.title}
              </h5>
          </Link>
          <p className="mb-3 font-light text-whiteColor dark:text-gray-400 line-clamp-2">
          {stripHtml(post.content)}
          </p>
          <Link href={`/blog/${post.slug}`} passHref className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondaryColor rounded-lg hover:bg-primaryColor-dark focus:ring-4 focus:outline-none focus:ring-primaryColor-light dark:bg-primaryColor dark:hover:bg-primaryColor-dark dark:focus:ring-primaryColor-light"> 
            Read more
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
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
