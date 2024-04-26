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
const TABS = ["SEO On-page", "SEO Off-page", "Technical SEO", "Tracking and Reports"] as const;

// Deriving a union type of tab values from the TABS constant
type Tab = typeof TABS[number];

const QUESTIONS: QuestionsMap = {
  "SEO On-page": [
    {
      question: "What is on-page SEO and why is it important?",
      answer:
        "On-page SEO involves optimizing web page content for search engines and users. Common on-page SEO practices include optimizing title tags, content, internal links, and URLs. It’s crucial for enhancing search visibility and user experience.",
    },
    {
      question: "How do you optimize meta descriptions and title tags?",
      answer:
        "We craft compelling meta descriptions and title tags that incorporate targeted keywords, align with the content on the page, and are optimized for the maximum click-through rate.",
    },
    {
      question: "What role do keywords play in on-page SEO?",
      answer:
        "Keywords are fundamental to on-page SEO. We conduct thorough keyword research to find the best terms for your content, ensuring they are effectively integrated to match user search intent.",
    },
    {
      question: "How do you ensure content quality for SEO?",
      answer:
        "We focus on creating informative, engaging, and well-structured content that serves the user's intent, incorporates strategic keyword usage, and aligns with Google’s quality guidelines.",
    },
  ],
  "SEO Off-page": [
    {
      question: "What are the key components of off-page SEO?",
      answer:
        "Off-page SEO primarily involves link building, social media strategy, and managing local listings. These elements help improve the site’s reputation and authority by securing credible backlinks and social media mentions.",
    },
    {
      question: "How do you approach link building?",
      answer:
        "We use a variety of techniques including guest blogging, broken link building, and creating shareable content. Our focus is on obtaining high-quality links from reputable and relevant websites.",
    },
    {
      question: "What impact do social signals have on SEO?",
      answer:
        "Social signals such as likes, shares, and comments may indirectly influence a site’s search rankings by increasing online visibility and traffic to the site.",
    },
    {
      question: "How does influencer collaboration enhance SEO?",
      answer:
        "Collaborating with influencers can amplify your content’s reach, generate social signals, and attract quality backlinks, all of which can boost SEO performance.",
    },
  ],
  "Technical SEO": [
    {
      question: "What is technical SEO?",
      answer:
        "Technical SEO refers to website and server optimizations that help search engine spiders crawl and index your site more effectively to improve organic rankings.",
    },
    {
      question: "How do you optimize site speed?",
      answer:
        "We enhance site speed by new technologies, optimizing images, leveraging browser caching, reducing server response time, and utilizing content distribution networks (CDNs).",
    },
    {
      question: "What are the common technical issues that affect SEO?",
      answer:
        "Common issues include slow site speed, duplicate content, broken links, and poor mobile optimization. We identify and resolve these issues to improve SEO performance.",
    },
    {
      question: "How important is mobile optimization for SEO today?",
      answer:
        "Extremely important. Mobile optimization is crucial as more users access the internet via mobile devices. Sites must be responsive and fast-loading to provide a good user experience and rank well.",
    },
  ],
  "Tracking and Reports": [
    {
      question: "How do you track SEO performance?",
      answer:
        "We use tools like Google Analytics and Google Search Console to monitor various metrics such as traffic, rankings, and conversions to assess the effectiveness of SEO strategies.",
    },
    {
      question: "What kind of SEO reports do you provide to clients?",
      answer:
        "We provide detailed reports that cover all key performance indicators, including ranking improvements, traffic data, and ROI from SEO efforts. These reports help clients understand the value we bring.",
    },
    {
      question: "How often do you review and adjust SEO strategies?",
      answer:
        "We conduct monthly reviews of our strategies based on the data collected and adjust as needed to continuously optimize performance and tackle new challenges.",
    },
    {
      question: "Can you measure the impact of SEO on overall business growth?",
      answer:
        "Yes, through analytics and tracking, we correlate SEO efforts with increases in website traffic, better quality leads, and higher conversion rates, showing the direct impact on business growth.",
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
        {"Explore key insights on enhancing your website's search engine performance!"}
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





