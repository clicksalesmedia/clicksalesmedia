'use client'
import { FC } from 'react';
import { motion } from "framer-motion";
import Data from "@/app/ui/data";
import Image from 'next/image';

interface TestimonialItem {
  id: number;
  img: string;
  name: string;
  title: string;
  info: string;
}

// Define the props for the TestimonialList component
interface TestimonialListProps {
  list: TestimonialItem[];
  reverse?: boolean;
  duration: number;
}

const Testimonial = () => {
  return (
    <div className="bg-primaryColor py-12 hidden md:block">
      <div className="mb-8 px-4">
      <Data sectionName="testimonials" />
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-primaryColor to-transparent" />
        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.middle} duration={125} reverse />
          <TestimonialList list={testimonials.middle} duration={125} reverse />
          <TestimonialList list={testimonials.middle} duration={125} reverse />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>

        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-primaryColor to-transparent" />
      </div>
    </div>
  );
};

const TestimonialList: FC<TestimonialListProps> = ({ list, reverse = false, duration }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((t) => (
        <div
          key={t.id}
          className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
        >
          <Image width={180} height={280} src={t.img} alt={t.name} className="w-full h-60 object-cover" />
          <div className="bg-secondaryColor text-whiteColor p-4">
            <span className="block font-semibold text-lg mb-1">{t.name}</span>
            <span className="block mb-3 text-sm font-medium text-primaryColor">{t.title}</span>
            <span className="block text-sm text-whiteColor">{t.info}</span>
          </div>
          <span className="text-7xl absolute top-2 right-2 text-slate-700">&apos;&apos; </span>
        </div>
      ))}
    </motion.div>
  );
};

const testimonials = {

  middle: [
    {
      id: 1,
      img: "/testimonials/doctor-samir.jpg",
      name: "Dr Samir",
      title: "Founder of Inspeedglobal",
      info: `The ROI from the ad campaigns managed by clicksalesmedia has been incredible. They've mastered the art of targeting and optimizing our ads, resulting in a dramatic increase in quality leads.`,
    },
    {
      id: 2,
      img: "/testimonials/chef-abdesamad.jpg",
      name: "Chef Abdesamad",
      title: "Owner of Lubinablanca Restaurant",
      info:`Since partnering with clicksalesmedia, our brand identity has transformed. Their creative team not only refined our logo and color scheme but also aligned our entire online presence to truly reflect our values and attract the right customers. It's been a game-changer!`,
    },
    {
      id: 3,
      img: "/testimonials/dr-mohammed-saad.jpg",
      name: "Dr.Mohammed Saad",
      title: "CEO of American Accreditation Association",
      info: `We needed a website that was not just aesthetically pleasing but also functionally robust. clicksalesmedia delivered beyond our expectations, creating a site that has significantly improved our user engagement and conversion rates.`,
    },
    {
      id: 4,
      img: "/testimonials/hicham.jpg",
      name: "Mr. Hicham Bouliz",
      title: "Founder of Jurico",
      info: `Implementing a CRM solution with clicksalesmedia has revolutionized how we manage customer relationships. Their tailored approach ensures we're maximizing every customer interaction, which has boosted our sales significantly.`,
    },
    
  ],
  bottom: [
    {
      id: 1,
      img: "/testimonials/said-traiteur.jpg",
      name: "Said Hannour",
      title: "Owner of Traiteur Hannour Alliance",
      info: `Every project with clicksalesmedia has been a breeze. Their project managers are exceptional—communicative, organized, and always a step ahead. It's made all the difference in meeting our marketing objectives on time.`,
    },
    {
      id: 2,
      img: "/testimonials/maevafashion.jpg",
      name: "Mme. Sana",
      title: "Founder of Maevafashion",
      info: `Launching our online store with clicksalesmedia was a seamless experience. Their expertise in eCommerce optimization has not only enhanced our site's user experience but also improved our sales metrics dramatically.`,
    },
    {
      id: 3,
      img: "/testimonials/joynt.jpg",
      name: "Mr. Saleh Ghalayini",
      title: "Strategy Consultant at Tryjoynt",
      info: `The B2B strategies developed by clicksalesmedia have opened new doors for us in the industry. Their insights into partnership development have led to several lucrative contracts and a stronger market position.`,
    },
  ],
};

export default Testimonial;