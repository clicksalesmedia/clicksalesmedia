'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { TracingBeam } from "../../ui/tracing-beam";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

const Details = () => {
  const pathname = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const slug = pathname.split('/').pop();
    if (slug) {
      setIsLoading(true);
      fetch(`http://localhost:3001/api/posts?slug=${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then(data => {
          console.log("Received data:", data); // Ensure data structure is as expected
          const parsedDate = new Date(data.createdAt);
          console.log("Parsed Date:", parsedDate.toISOString()); // Log the parsed date in ISO format for debugging

          if (isNaN(parsedDate.getTime())) {
            console.warn("Date parsing issue with:", data.createdAt);
            // Set a fallback or handle differently instead of blocking render
          }

          // Proceed to set the post data, using a fallback for date if needed
          setPost({
            ...data,
            createdAt: !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Date not available', // Fallback display
          });
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className='py-20'>
     <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="mb-10">

            <h1 className="text-4xl text-secondaryColor mb-4">
              {post.title}
            </h1>

            <h2 className="bg-secondaryColor text-primaryColor rounded-full text-xl font-bold w-fit px-4 py-1 mb-4">
              {post.title}
            </h2>

            <div className="text-sm  prose prose-sm dark:prose-invert">

                <Image
                  src={post.thumbnailUrl}
                  alt="blog thumbnail"
                  height="500"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />

              
<p className="content-container text-base my-4"
   dangerouslySetInnerHTML={{ __html: post.content }}>
</p>
            </div>
          </div>
      </div>
    </TracingBeam>
    </article>
  );
};

export default Details;






