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
          <Image width={180} height={280} src={t.img} alt={t.name} className="w-full h-44 object-cover" />
          <div className="bg-secondaryColor text-slate-50 p-4">
            <span className="block font-semibold text-lg mb-1">{t.name}</span>
            <span className="block mb-3 text-sm font-medium">{t.title}</span>
            <span className="block text-sm text-slate-300">{t.info}</span>
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
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam.",
    },
    {
      id: 2,
      img: "/testimonials/chef-abdesamad.jpg",
      name: "Chef Abdesamad",
      title: "Owner of Lubinablanca Restaurant",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt.",
    },
    {
      id: 3,
      img: "/testimonials/dr-mohammed-saad.jpg",
      name: "Dr.Mohammed Saad",
      title: "CEO of American Accreditation Association",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis.",
    },
    {
      id: 4,
      img: "/testimonials/hicham.jpg",
      name: "Mr. Hicham Bouliz",
      title: "Founder of Jurico",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur esse corporis!",
    },
    
  ],
  bottom: [
    {
      id: 1,
      img: "/testimonials/said-traiteur.jpg",
      name: "Said Hannour",
      title: "Owner of Traiteur Hannour Alliance",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!",
    },
    {
      id: 2,
      img: "/testimonials/maevafashion.jpg",
      name: "Mme. Sana",
      title: "Founder of Maevafashion",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere.",
    },
    {
      id: 3,
      img: "/testimonials/joynt.jpg",
      name: "Mr. Saleh Ghalayini",
      title: "Project Manager at Joynt",
      info: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
  ],
};

export default Testimonial;