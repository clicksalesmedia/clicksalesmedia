'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TracingBeam } from '../../ui/tracing-beam';
import Head from 'next/head';

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  thumbnailUrl?: string;
  seo: {
    title: string;
    description: string;
    seoKeywords: string;
  };
};

const Details = () => {
  const pathname = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      console.error('Pathname is null');
      setIsLoading(false);
      setError('Invalid URL');
      return;
    }

    const slug = pathname.split('/').pop();
    if (slug) {
      setIsLoading(true);
      fetch(`https://administration.clicksalesmedia.com/api/posts?slug=${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then(data => {
          setPost(data);
          updateMetadata(data.seo);
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname]);

  const updateMetadata = (seo:any) => {
    if (typeof document !== "undefined") {
      document.title = seo.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", seo.description);
      document.querySelector('meta[name="keywords"]')?.setAttribute("content", seo.seoKeywords);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <Head>
        <title>{post?.seo.title}</title>
        <meta name="description" content={post?.seo.description} />
        <meta name="keywords" content={post?.seo.seoKeywords} />
      </Head>
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
              <div className="text-sm prose prose-sm dark:prose-invert custom-content">
                {post.thumbnailUrl && 
                  <Image
                    src={post.thumbnailUrl}
                    alt="blog thumbnail"
                    height="500"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                }
                <p className="content-container text-base my-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}>
                </p>
              </div>
            </div>
          </div>
        </TracingBeam>
      </article>
    </>
  );
};

export default Details;
