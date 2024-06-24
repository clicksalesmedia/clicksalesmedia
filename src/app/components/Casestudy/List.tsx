'use client'
import React, { useState, useEffect } from 'react'; 
import Image from "next/image"
import Link from "next/link"

interface CaseStudyApiResponse {
  _id: string;
  title: string;
  content: string;
  summary: string;
  client: {
    name: string;
  };
  thumbnailUrl: string;
  slug: string;
  createdAt: string;
}

interface CaseStudy extends CaseStudyApiResponse {
  day: number;
  month: string;
}

const List: React.FC = () => {
  const [casestudies, setCasestudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetch('https://administration.clicksalesmedia.com/api/casestudy')
      .then((response) => response.json())
      .then((data: CaseStudyApiResponse[]) => {
        // Transform the data and set the state
        setCasestudies(
          data.map((casestudy) => {
            const date = new Date(casestudy.createdAt);
            return {
              ...casestudy,
              day: date.getDate(),
              month: date.toLocaleString('default', { month: 'long' }),
            };
          })
        );
      })
      .catch((error) => console.error('Failed to fetch case studies', error));
  }, []);

  const CaseStudyCard: React.FC<{ casestudy: CaseStudy }> = ({ casestudy }) => {
    return (
      <div className="max-w-sm bg-[#222222] border border-secondaryColor rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={`/case-studies/${casestudy.slug}`}>
          <Image className="rounded-t-lg" src={casestudy.thumbnailUrl} alt={casestudy.title} width={400} height={300} />
        </Link>
        <div className="p-5">
          <Link href={`/case-studies/${casestudy.slug}`}>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-secondaryColor dark:text-white">
              {casestudy.title}
            </h2>
          </Link>
          <p className="mb-3 font-normal text-slate-50 dark:text-gray-400 line-clamp-3">{casestudy.summary}</p>
          <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-secondaryColor">Customer: </span>{casestudy.client.name}
          </div>
          <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-secondaryColor">Date: </span>{casestudy.month} {casestudy.day}
          </div>
          <Link href={`/case-studies/${casestudy.slug}`} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-center text-white bg-secondaryColor rounded-lg hover:bg-secondaryColor focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {casestudies.map((casestudy) => (
            <CaseStudyCard key={casestudy._id} casestudy={casestudy} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default List;
