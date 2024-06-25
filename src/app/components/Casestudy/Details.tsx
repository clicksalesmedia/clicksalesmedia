'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TracingBeam } from '../../ui/tracing-beam';

type Casestudy = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  createdAt?: string; // Make createdAt optional
  thumbnailUrl?: string;
  slug: string;
  client: {
    name: string;
    industry?: string;
    challenges?: string;
  };
};

const Details = () => {
  const pathname = usePathname();
  const [casestudy, setCasestudy] = useState<Casestudy | null>(null);
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
      fetch(`https://administration.clicksalesmedia.com/api/casestudy?slug=${slug}`)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('Case study not found');
            }
            throw new Error('Failed to fetch');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Received data:', data);

          let parsedDate = null;
          if (data.createdAt) {
            try {
              parsedDate = new Date(data.createdAt);
              if (isNaN(parsedDate.getTime())) {
                throw new Error('Invalid date');
              }
            } catch (error) {
              console.warn('Date parsing issue with:', data.createdAt);
              parsedDate = null;
            }
          }

          setCasestudy({
            ...data,
            createdAt: parsedDate
              ? parsedDate.toLocaleDateString('default', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Date not available',
          });

          console.log('Parsed casestudy:', {
            ...data,
            createdAt: parsedDate
              ? parsedDate.toLocaleDateString('default', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Date not available',
          });
        })
        .catch((error) => {
          console.error('Error:', error);
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!casestudy) return <div>Case study not found</div>;

  return (
    <article className="py-20">
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          <div className="mb-10">
            <h1 className="text-4xl text-secondaryColor mb-4">{casestudy.title}</h1>
            <h2 className="bg-secondaryColor text-primaryColor rounded-full text-xl font-bold w-fit px-4 py-1 mb-4">
              {casestudy.title}
            </h2>
            <div className="text-sm prose prose-sm dark:prose-invert custom-content">
              {casestudy.thumbnailUrl && (
                <Image
                  src={casestudy.thumbnailUrl}
                  alt="case study thumbnail"
                  height="500"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              <p className="mb-3 font-normal text-slate-50 dark:text-gray-400 line-clamp-3">{casestudy.summary}</p>
              <p
                className="content-container text-base my-4"
                dangerouslySetInnerHTML={{ __html: casestudy.content }}
              ></p>
            </div>
          </div>
        </div>
      </TracingBeam>
    </article>
  );
};

export default Details;
