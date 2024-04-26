'use client'
import Data from "@/app/ui/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

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
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

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
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-lg border-[1px] border-[#222222] bg-secondaryColor text-primaryColor p-1.5 text-2xl transition-opacity ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
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
          >
            {posts.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Post: React.FC<PostProps> = ({ imgUrl, author, title, description }) => {
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
        alt={`An image for a fake blog post titled ${title}`}
      />
      <span className="rounded-md border-[1px] bg-secondaryColor border-[#222222] px-1.5 py-1 text-xs uppercase text-whiteColor">
        {author}
      </span>
      <p className="mt-1.5 text-lg font-medium text-secondaryColor">{title}</p>
      <p className="text-sm text-whiteColor">{description}</p>
    </div>
  );
};

export default BlogPostCarousel;

const posts = [
  {
    id: 1,
    imgUrl: "/expertise/b2b/industries/saas.jpg",
    author: "SAAS",
    title: "SaaS Solutions",
    description:
      "Drive innovation and scalability in your SaaS business. Our targeted digital strategies enhance user engagement and maximize subscription growth.",
  },
  {
    id: 2,
    imgUrl: "/expertise/b2b/industries/real-estate.jpg",
    author: "Real estate",
    title: "Real Estate Performance Marketing",
    description:
      "Transform property listings into sales with our real estate marketing expertise. We provide powerful tools and strategies to attract buyers and sellers alike.",
  },
  {
    id: 3,
    imgUrl: "/expertise/b2b/industries/education.jpg",
    author: "Education",
    title: "Education Digital Services",
    description:
      "Empower your educational institution with digital solutions that enhance learning and administration. Our strategies help you connect with students and improve educational outcomes.",
  },
  {
    id: 4,
    imgUrl: "/expertise/b2b/industries/automotive.jpg",
    author: "Automotive",
    title: "Automotive Marketing Excellence",
    description:
      "Accelerate your automotive business with high-impact digital marketing strategies. From dealerships to manufacturers, we drive traffic and increase sales.",
  },
  {
    id: 5,
    imgUrl: "/expertise/b2b/industries/construction.jpg",
    author: "Construction",
    title: "Construction Industry Growth",
    description:
      "Build a solid foundation for your construction business with our specialized marketing approaches that increase visibility and attract new projects.",
  },
  {
    id: 6,
    imgUrl: "/expertise/b2b/industries/accreditation.jpg",
    author: "Accreditation",
    title: "Accreditation Success",
    description:
      "Enhance your accreditation processes with our tailored digital solutions. We help institutions manage standards and improve operational efficiencies.",
  },
  {
    id: 7,
    imgUrl: "/expertise/b2b/industries/gas-and-oil.jpg",
    author: "Oil & Gas",
    title: "Oil & Gas Performance Digital Strategy",
    description:
      "Fuel success in the oil and gas sector with our robust digital strategies. From exploration to distribution, we enhance visibility and operational efficiency.",
  },
  {
    id: 7,
    imgUrl: "/expertise/b2b/industries/food-beverage-restaurants-hotels.jpg",
    author: "Food & Beverage",
    title: "Food & Beverage Marketing",
    description:
      "Whet the appetite of your target audience with our food and beverage marketing expertise. We create campaigns that increase brand loyalty and drive sales.",
  },
];