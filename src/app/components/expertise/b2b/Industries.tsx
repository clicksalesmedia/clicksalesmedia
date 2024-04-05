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
    title: "We built an AI chess bot with ChatGPT",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 2,
    imgUrl: "/expertise/b2b/industries/real-estate.jpg",
    author: "Real estate",
    title: "How to grow your personal brand as a web designer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 3,
    imgUrl: "/expertise/b2b/industries/education.jpg",
    author: "Education",
    title: "Calm down, monoliths are totally fine",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 4,
    imgUrl: "/expertise/b2b/industries/automotive.jpg",
    author: "Automotive",
    title: "A quick guide to Framer Motion (for dummies)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 5,
    imgUrl: "/expertise/b2b/industries/construction.jpg",
    author: "Construction",
    title: "You probably don't need kubernetes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 6,
    imgUrl: "/expertise/b2b/industries/accreditation.jpg",
    author: "Accreditation",
    title: "State of JavaScript in 2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
  {
    id: 7,
    imgUrl: "/expertise/b2b/industries/gas-and-oil.jpg",
    author: "Oil & Gas",
    title: "What's new in Python?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, dolor.",
  },
];