'use client'
import React, { useState, useEffect } from 'react'; // Import React hooks
import Image from 'next/image';
import Link from 'next/link';



interface Category {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  slug: string;
  createdAt: string; // or Date, depending on how you handle dates
  categories: Category[];
  day: number;
  month: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://administration.clicksalesmedia.com/api/posts')
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(
          data.map((post) => {
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

  const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
    return (
      <div className="rounded-md flex flex-col bg-[#222222] dark:bg-gray-950 shadow-sm shadow-black dark:shadow-none border border-black/20 dark:border-gray-800/80 p-4">
        <div className="relative">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            width={1300}
            height={800}
            className="w-full rounded aspect-[5/3] object-cover bg-gray-100 dark:bg-gray-900"
          />
          <div className="absolute inset-x-2 bottom-2 px-3 py-1.5 rounded-md bg-gray-800/80 backdrop-filter backdrop-blur-sm">
            <p className="font-semibold text-gray-100"> {post.categories.map((category, index) => (
        <React.Fragment key={category._id}>
          <span className='text-whiteColor'>{category.name}</span>
          {/* Conditionally render the separator except after the last category */}
          {index < post.categories.length - 1 && (
            <span className="relative px-5 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:h-3 before:w-px before:bg-gray-400"></span>
          )}
        </React.Fragment>
      ))}</p> 
            <p className="text-sm text-gray-300">{post.month} {post.day}</p> 
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} passHref className="mt-5 text-xl font-semibold text-secondaryColor dark:text-white">
          {post.title}
        </Link>
        <p className="content-container line-clamp-2 my-4"
   dangerouslySetInnerHTML={{ __html: post.content }}>
</p>
        <div className="flex flex-1 items-end">

          <Link href={`/blog/${post.slug}`} passHref className="flex items-center gap-x-2 text-secondaryColor dark:text-blue-500">
            Read more
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        {/* Intro or Title Section - Ensure it's generic or based on passed props */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
