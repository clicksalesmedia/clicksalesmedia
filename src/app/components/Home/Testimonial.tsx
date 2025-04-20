'use client'
import { FC } from 'react';
import { motion } from "framer-motion";
import Data from "@/app/ui/data";
import Image from 'next/image';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';

interface TestimonialItem {
  id: string;
  img: string;
  key: string;
}

// Define the props for the TestimonialList component
interface TestimonialListProps {
  list: TestimonialItem[];
  reverse?: boolean;
  duration: number;
}

const Testimonial = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-primaryColor py-12 hidden md:block" dir="ltr">
      <div className="mb-8 px-4">
      <Data sectionName="testimonials" />
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r w-24 z-10 from-primaryColor to-transparent" />
        <div className="flex items-center mb-4">
          <TestimonialList list={testimonials.middle} duration={125} reverse={false} />
          <TestimonialList list={testimonials.middle} duration={125} reverse={false} />
          <TestimonialList list={testimonials.middle} duration={125} reverse={false} />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} reverse={true} />
          <TestimonialList list={testimonials.bottom} duration={275} reverse={true} />
          <TestimonialList list={testimonials.bottom} duration={275} reverse={true} />
        </div>

        <div className="absolute top-0 bottom-0 right-0 bg-gradient-to-l w-24 z-10 from-primaryColor to-transparent" />
      </div>
    </div>
  );
};

const TestimonialList: FC<TestimonialListProps> = ({ list, reverse = false, duration }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((testimonial) => {
        const nameKey = `testimonials.clients.${testimonial.key}.name` as const;
        const titleKey = `testimonials.clients.${testimonial.key}.title` as const;
        const infoKey = `testimonials.clients.${testimonial.key}.info` as const;
        
        return (
          <div
            key={testimonial.id}
            className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative"
          >
            <div className="relative">
              <Image width={180} height={280} src={testimonial.img} alt={t(nameKey as any)} className="w-full h-60 object-cover" />
              {isRTL && <span className="text-7xl absolute -left-10 top-2 text-slate-700">&apos;&apos; </span>}
            </div>
            <div className="bg-secondaryColor text-whiteColor p-4">
              <span className={`block font-semibold text-lg mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t(nameKey as any)}</span>
              <span className={`block mb-3 text-sm font-medium text-primaryColor ${isRTL ? 'text-right' : 'text-left'}`}>{t(titleKey as any)}</span>
              <span className={`block text-sm text-whiteColor ${isRTL ? 'text-right' : 'text-left'}`}>{t(infoKey as any)}</span>
            </div>
            {!isRTL && <span className="text-7xl absolute top-2 right-2 text-slate-700">&apos;&apos; </span>}
          </div>
        );
      })}
    </motion.div>
  );
};

const testimonials = {
  middle: [
    {
      id: "1",
      img: "/testimonials/doctor-samir.jpg",
      key: "drSamir"
    },
    {
      id: "2",
      img: "/testimonials/chef-abdesamad.jpg",
      key: "chefAbdesamad"
    },
    {
      id: "3",
      img: "/testimonials/dr-mohammed-saad.jpg",
      key: "drMohammedSaad"
    },
    {
      id: "4",
      img: "/testimonials/hicham.jpg",
      key: "mrHicham"
    },
  ],
  bottom: [
    {
      id: "5",
      img: "/testimonials/said-traiteur.jpg",
      key: "saidHannour"
    },
    {
      id: "6",
      img: "/testimonials/maevafashion.jpg",
      key: "mmeSana"
    },
    {
      id: "7",
      img: "/testimonials/joynt.jpg",
      key: "mrSaleh"
    },
  ],
};

export default Testimonial;