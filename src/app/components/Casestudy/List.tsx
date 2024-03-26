'use client'
import React, { useState, useEffect } from 'react'; 
import Image from "next/image"
import Link from "next/link"


interface CaseStudyApiResponse {
  _id: string;
  title: string;
  content: string;
  customer: string;
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
    fetch('http://localhost:3001/api/casestudy')
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

    <div className="flex flex-col lg:flex-row gap-8 p-5 rounded-md bg-[#222222] dark:bg-gray-900 border border-secondaryColor/20 dark:border-gray-800/80 ">
        <div className="w-full lg:w-2/5 lg:h-full">
            <Image src={casestudy.thumbnailUrl} alt={casestudy.title} width={1300} height={900} className="rounded aspect-video lg:aspect-auto lg:h-full w-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col space-y-6">
            <Link href={`/case-studies/${casestudy.slug}`} className="text-xl font-semibold text-secondaryColor dark:text-white">
            {casestudy.title}
            </Link>
            <p  dangerouslySetInnerHTML={{ __html: casestudy.content }} className="text-whiteColor dark:text-gray-300 text-sm line-clamp-2">
            </p>
            <div className="flex items-center gap-x-4">
             
                <div>
                    <p className="text-whiteColor dark:text-gray-50 font-semibold">Customer: {casestudy.customer}</p>
                    <p className="text-sm text-whiteColor dark:text-gray-300">
                    {casestudy.month} {casestudy.day}
                    </p>
                </div>
            </div>
        </div>
    </div>


)
}

return (
    <section className="py-20">
    <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {casestudies.map((casestudy) => (
            <CaseStudyCard key={casestudy._id} casestudy={casestudy} />
          ))}
        </div>
    </div>
</section>
  );
};

export default List