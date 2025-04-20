'use client'
import Data from "@/app/ui/data";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { useTranslation } from "@/app/hooks/useTranslation";

interface PostProps {
    imgUrl: string;
    author: string;
    title: string;
    description: string;
  }

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const BlogPostCarousel = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [industryPosts, setIndustryPosts] = useState<any[]>([]);
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Check document direction after component mounts
    setIsRTL(document.documentElement.dir === 'rtl');
    
    // Initialize posts with translations
    const translatedPosts = [
      {
        id: 1,
        imgUrl: "/expertise/b2b/industries/saas.jpg",
        author: t('b2b.industriesList.saas.tag' as any),
        title: t('b2b.industriesList.saas.title' as any),
        description: t('b2b.industriesList.saas.description' as any),
      },
      {
        id: 2,
        imgUrl: "/expertise/b2b/industries/real-estate.jpg",
        author: t('b2b.industriesList.realEstate.tag' as any),
        title: t('b2b.industriesList.realEstate.title' as any),
        description: t('b2b.industriesList.realEstate.description' as any),
      },
      {
        id: 3,
        imgUrl: "/expertise/b2b/industries/education.jpg",
        author: t('b2b.industriesList.education.tag' as any),
        title: t('b2b.industriesList.education.title' as any),
        description: t('b2b.industriesList.education.description' as any),
      },
      {
        id: 4,
        imgUrl: "/expertise/b2b/industries/automotive.jpg",
        author: t('b2b.industriesList.automotive.tag' as any),
        title: t('b2b.industriesList.automotive.title' as any),
        description: t('b2b.industriesList.automotive.description' as any),
      },
      {
        id: 5,
        imgUrl: "/expertise/b2b/industries/construction.jpg",
        author: t('b2b.industriesList.construction.tag' as any),
        title: t('b2b.industriesList.construction.title' as any),
        description: t('b2b.industriesList.construction.description' as any),
      },
      {
        id: 6,
        imgUrl: "/expertise/b2b/industries/accreditation.jpg",
        author: t('b2b.industriesList.accreditation.tag' as any),
        title: t('b2b.industriesList.accreditation.title' as any),
        description: t('b2b.industriesList.accreditation.description' as any),
      },
      {
        id: 7,
        imgUrl: "/expertise/b2b/industries/gas-and-oil.jpg",
        author: t('b2b.industriesList.oilAndGas.tag' as any),
        title: t('b2b.industriesList.oilAndGas.title' as any),
        description: t('b2b.industriesList.oilAndGas.description' as any),
      },
      {
        id: 8,
        imgUrl: "/expertise/b2b/industries/food-beverage-restaurants-hotels.jpg",
        author: t('b2b.industriesList.foodAndBeverage.tag' as any),
        title: t('b2b.industriesList.foodAndBeverage.title' as any),
        description: t('b2b.industriesList.foodAndBeverage.description' as any),
      },
    ];
    
    setIndustryPosts(translatedPosts);
    // Reset offset when language changes
    setOffset(0);
  }, [language, t]);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (industryPosts.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="py-8" ref={ref}>
        <div>
        <Data sectionName="B2bIndustries" />
        </div>     
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 py-4">
              <button
                className={`rounded-lg border-[1px] border-[#222222] bg-secondaryColor text-primaryColor p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                {isRTL ? <FiArrowRight /> : <FiArrowLeft />}
              </button>
              <button
                className={`rounded-lg border-[1px] border-[#222222] bg-secondaryColor text-primaryColor p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                {isRTL ? <FiArrowLeft /> : <FiArrowRight />}
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {industryPosts.map((post) => {
              return <Post key={post.id} {...post} isRTL={isRTL} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface EnhancedPostProps extends PostProps {
  isRTL: boolean;
}

const Post: React.FC<EnhancedPostProps> = ({ imgUrl, author, title, description, isRTL }) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <img
        src={imgUrl}
        className="mb-3 h-[200px] w-full rounded-lg object-cover"
        alt={`Image for ${title}`}
      />
      <span className="rounded-md border-[1px] bg-secondaryColor border-[#222222] px-1.5 py-1 text-xs uppercase text-whiteColor">
        {author}
      </span>
      <p className={`mt-1.5 text-lg font-medium text-secondaryColor ${isRTL ? 'text-right' : ''}`}>{title}</p>
      <p className={`text-sm text-whiteColor ${isRTL ? 'text-right' : ''}`}>{description}</p>
    </div>
  );
};

export default BlogPostCarousel;