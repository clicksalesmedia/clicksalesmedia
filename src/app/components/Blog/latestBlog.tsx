'use client'
import React, { useState, useEffect } from 'react';
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
  slug: string;
  thumbnailUrl: string;
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
  return (
<section className="pb-10 pt-20">
  <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
    {/* Wrapper div for the image to control height like a card */}
    <div className="flex md:flex-1 lg:flex-2 py-[200px] h-500 overflow-hidden rounded-lg relative">
    <Link href={`/blog/${post.slug}`} passHref>
      <Image
        src={post.thumbnailUrl}
        alt={post.title}
        className="object-cover"
        layout="fill" // Use fill layout for the image to stretch and cover the div
      />
      </Link>
    </div>
    {/* Reduce the width of the text container */}
    <div className="md:w-1/4 lg:w-1/3 space-y-12 text-gray-700 dark:text-gray-300">
    <p className="text-sm text-gray-300 py-2">{post.month} {post.day}</p> 
    {post.categories.map((category, index) => (
        <React.Fragment key={category._id}>
          <span className='text-secondaryColor'>{category.name}</span>
          {/* Conditionally render the separator except after the last category */}
          {index < post.categories.length - 1 && (
            <span className="relative px-5 before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:h-3 before:w-px before:bg-gray-400"></span>
          )}
        </React.Fragment>
      ))}
      <Link href={`/blog/${post.slug}`} passHref>
      <h1 className="text-4xl font-semibold text-secondaryColor">
        {post.title}...
      </h1>
      </Link>
      <p className='content-container line-clamp-5 text-whiteColor my-4'  dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link href={`/blog/${post.slug}`} passHref className='text-secondaryColor'>Read More</Link>
 
     
    </div>
  </div>
</section>



  );
};

export default BlogSection;
