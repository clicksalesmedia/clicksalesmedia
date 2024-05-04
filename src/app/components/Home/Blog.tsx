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

type Post = PostData &{
  thumbnailUrl: string;
  title: string;
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
                    ...post, // This spreads all existing properties of post
                    day: date.getDate().toString(), // Converting day to string if your Post type expects a string
                    month: date.toLocaleString('default', { month: 'long' })
                };
            });
            setPosts(enhancedPosts as Post[]); // Cast enhancedPosts to Post[] if absolutely necessary
        })
        .catch((error) => console.error("Failed to fetch posts", error));
}, []);

  // BlogCard component
  const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
      <Link href={`/blog/${post.slug}`} passHref className="text-secondaryColor dark:text-secondaryColor transition hover:text-opacity-90 flex items-center gap-x-3 group">
      <div className="bg-black bg-opacity-30 dark:bg-gray-950 shadow-xs shadow-[#222222] dark:shadow-transparent border border-primaryColor/50 dark:border-gray-800/50">
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        width={1300}
        height={1400}
        className="w-full aspect-[5/3] object-cover bg-primaryColor dark:bg-gray-900"
      />
      <div className="relative p-4 pt-10">
        <div className="absolute right-4 -top-8 bg-secondaryColor px-4 py-0.5 flex flex-col">
          <p className="font-bold text-2xl text-white">{post.day}</p>
          <p className="text-sm text-gray-200">{post.month}</p>
        </div>
        <div className="flex items-center text-secondaryColor dark:text-gray-400">
          {post.categories.map((category, index) => (
            <React.Fragment key={category._id}>
              <span>{category.name}</span>
              {/* Conditionally render the separator except after the last category */}
              {index < post.categories.length - 1 && (
                <span className="relative px-5 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:h-3 before:w-px before:bg-gray-400"></span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-xl my-6 font-semibold text-whiteColor dark:text-white">
          {post.title}
        </h1>
        <Link href={`/blog/${post.slug}`} passHref className="text-secondaryColor dark:text-secondaryColor transition hover:text-opacity-90 flex items-center gap-x-3 group">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 transition-all ease-linear group-hover:ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </div>
    </Link>
    );
  };

  return (
    <section className="py-20 relative">
      <div className="absolute left-0 top-3/1 transform -translate-y-1/2">
        <Image src="/svg/arrows.svg" alt="Arrows" width={45} height={45} layout="fixed" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        <Data sectionName="blog" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
