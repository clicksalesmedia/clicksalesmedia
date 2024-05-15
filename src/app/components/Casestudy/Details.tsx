'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { TracingBeam } from "../../ui/tracing-beam";


type Casestudy = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  thumbnailUrl?: string; 
};

const Details = () => {
  const pathname = usePathname();
  const [casestudy, setCasestudy] = useState<Casestudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if pathname is not null before proceeding
    if (!pathname) {
      console.error('Pathname is null');
      setIsLoading(false);
      setError('Invalid URL');
      return; // Exit early if pathname is null
    }
    
    const slug = pathname.split('/').pop();
    if (slug) {
      setIsLoading(true);
      fetch(`https://administration.clicksalesmedia.com/api/casestudy?slug=${slug}`)
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
          setCasestudy({
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
  if (!casestudy) return <div>Post not found</div>;

  return (
    <article className='py-20'>
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            <div className="mb-10">
              <h1 className="text-4xl text-secondaryColor mb-4">
                {casestudy.title}
              </h1>
              <h2 className="bg-secondaryColor text-primaryColor rounded-full text-xl font-bold w-fit px-4 py-1 mb-4">
                {casestudy.title}
              </h2>
              <div className="text-sm prose prose-sm dark:prose-invert">
                {casestudy.thumbnailUrl && 
                  <Image
                    src={casestudy.thumbnailUrl}
                    alt={casestudy.title}
                    height="500"
                    width="1000"
                    className="rounded-lg mb-10 object-cover"
                  />
                }
                <p className="content-container text-base my-4"
                  dangerouslySetInnerHTML={{ __html: casestudy.content }}>
                </p>
              </div>
            </div>
        </div>
      </TracingBeam>
    </article>
  );
};

export default Details;