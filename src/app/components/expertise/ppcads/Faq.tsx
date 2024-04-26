'use client'
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";

// Define the structure of each question
type QuestionType = {
  question: string;
  answer: string;
};

// Define the mapping type for the questions categorized by tabs
type QuestionsMap = {
  [key: string]: QuestionType[];
};

// List of tabs as a constant tuple
const TABS = ["PPC Ads Strategies", "Paid Search", "Performance Max", "Google Shopping", "Google My Business" ] as const;

// Deriving a union type of tab values from the TABS constant
type Tab = typeof TABS[number];

const QUESTIONS: QuestionsMap = {
  "PPC Ads Strategies": [
    {
      question: "What are the key elements of a successful PPC campaign?",
      answer:
        "A successful PPC campaign involves careful keyword selection, compelling ad copy, optimized landing pages, and strategic bid management to maximize ROI.",
    },
    {
      question: "How do you determine the right budget for a PPC campaign?",
      answer:
        "We assess your business goals, target audience, and competitive landscape to set a budget that maximizes visibility and conversions while maintaining cost-efficiency.",
    },
    {
      question: "What strategies do you use to improve PPC ad performance?",
      answer:
        "We utilize A/B testing, keyword refinement, and performance analytics to continually optimize ads and ensure they resonate with the target audience and drive results.",
    },
    {
      question: "How do you ensure PPC ads reach the intended audience?",
      answer:
        "We leverage advanced targeting options including demographic, geographic, and psychographic filters, as well as retargeting techniques to ensure ads are seen by the most relevant users.",
    },
  ],
  "Paid Search": [
    {
      question: "What distinguishes paid search from other forms of digital advertising?",
      answer:
        "Paid search targets users actively searching for your products or services, offering immediate visibility and direct response compared to broader-reaching digital ad types.",
    },
    {
      question: "How do you optimize paid search ads for high conversion rates?",
      answer:
        "We focus on precise keyword targeting, crafting engaging ad copy, and designing user-friendly landing pages that are optimized for conversions.",
    },
    {
      question: "What metrics are most important in measuring paid search effectiveness?",
      answer:
        "Key metrics include Click-Through Rate (CTR), Cost Per Click (CPC), Conversion Rate, and Return on Ad Spend (ROAS), which help us gauge campaign success and areas for improvement.",
    },
    {
      question: "How quickly can we see results from paid search campaigns?",
      answer:
        "Results can often be seen shortly after campaign launch due to the immediate nature of paid search, with ongoing optimizations enhancing performance over time.",
    },
  ],
  "Performance Max": [
    {
      question: "What is Google's Performance Max, and how does it benefit advertisers?",
      answer:
        "Performance Max is a Google Ads campaign type that uses AI to optimize ad placement across all Google platforms. It maximizes conversion value by automatically finding the best performing strategies.",
    },
    {
      question: "How do you set up a Performance Max campaign?",
      answer:
        "Setting up involves defining campaign goals, uploading assets like images and videos, and providing a range of conversion actions for Google’s AI to target.",
    },
    {
      question: "What makes Performance Max different from standard PPC campaigns?",
      answer:
        "Performance Max utilizes machine learning to automatically adjust bids, placements, and targeting across Google's entire inventory, which can lead to improved performance and simplified management.",
    },
    {
      question: "Can Performance Max campaigns use existing assets from other campaigns?",
      answer:
        "Yes, Performance Max can utilize existing ad assets, allowing seamless integration and leveraging past creative work for new optimization opportunities.",
    },
  ],
  "Google Shopping": [
    {
      question: "How does Google Shopping work for retailers?",
      answer:
        "Google Shopping displays products directly in search results, allowing users to compare prices and see products before clicking through to a retailer’s website to make a purchase.",
    },
    {
      question: "What are the advantages of using Google Shopping for e-commerce?",
      answer:
        "It offers high intent-to-purchase exposure, direct product comparisons, and simplified path to purchase, which can significantly boost sales.",
    },
    {
      question: "What strategies optimize Google Shopping campaigns?",
      answer:
        "Optimization strategies include detailed product feeds, strategic bidding, high-quality images, and continuous performance monitoring to adjust bids and product listings for maximum ROI.",
    },
    {
      question: "How do you handle product listings and bidding in Google Shopping?",
      answer:
        "We manage product listings through meticulous feed optimization and use data-driven bidding strategies to compete effectively in product category auctions.",
    },
  ],
  "Google My Business": [
    {
      question: "What is Google My Business and why is it important for local businesses?",
      answer:
        "Google My Business (GMB) is a free tool that allows businesses to manage their online presence across Google, including Search and Maps. It is crucial for helping local businesses increase their visibility, attract more customers, and manage their information effectively.",
    },
    {
      question: "How do you optimize a Google My Business listing for better visibility?",
      answer:
        "Optimization includes ensuring your business information is accurate and comprehensive, posting regular updates, adding high-quality photos, and collecting customer reviews to enhance credibility and attract more local searches.",
    },
    {
      question: "What types of content should be posted on Google My Business?",
      answer:
        "Effective content for GMB includes updates about your business, promotions, upcoming events, and new products or services. Regular posting keeps your profile active and engaging for potential customers.",
    },
    {
      question: "How can Google My Business impact my local SEO rankings?",
      answer:
        "A well-managed GMB profile can significantly boost your local SEO by making your business more relevant and visible in local search results and on Google Maps. This can lead to increased traffic both online and in-store.",
    },
  ],
};

const FAQ: React.FC = () => {
  const [selected, setSelected] = useState<Tab>(TABS[0]);

  return (
    <section className="overflow-hidden bg-primaryColor px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5 py-10">
                <h1 className=" font-semibold leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
             <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">FAQ</span>
        </h1>
        <p className=" flex text-slate-200 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
        Discover how our agency helps you maximize the potential of Google's services. Our FAQs offer insights into effective strategies for Google Ads, Google My Business, Google Shopping, and more, ensuring your business achieves optimal online visibility and success.
        </p>
            </div>
    </>
  );
};

interface TabsProps {
  selected: Tab;
  setSelected: React.Dispatch<React.SetStateAction<Tab>>;
}

const Tabs: React.FC<TabsProps> = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-[#c98727] text-slate-50"
              : "border-secondaryColor bg-transparent text-secondaryColor"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-secondaryColor to-[#c9974f]"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

interface QuestionsProps {
  selected: Tab;
}

const Questions: React.FC<QuestionsProps> = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(QUESTIONS).map(([tab, questions]) => {
        return selected === tab ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              ease: "backIn",
            }}
            className="space-y-4"
            key={tab}
          >
            {questions.map((q, idx) => (
              <Question key={idx} {...q} />
            ))}
          </motion.div>
        ) : undefined;
      })}
    </AnimatePresence>
  </div>
  );
};

interface QuestionProps extends QuestionType {}

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-secondaryColor px-4 transition-colors ${
        open ? "bg-[#222222]" : "bg-[#1E1E1E]"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-secondaryColor" : "text-secondaryColor"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-secondaryColor" : "text-secondaryColor"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;





