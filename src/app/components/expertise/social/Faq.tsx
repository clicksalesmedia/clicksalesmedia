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
const TABS = ["Social Media Management", "Social media Ads", "Social Media for B2B", "Social Media Content"] as const;

// Deriving a union type of tab values from the TABS constant
type Tab = typeof TABS[number];

const QUESTIONS: QuestionsMap = {
  "Social Media Management": [
    {
      question: "What is social media management and why is it important?",
      answer:
        "Social media management involves overseeing your online interactions and content across platforms. It's crucial for maintaining a cohesive brand voice, engaging with your audience, and building your digital presence effectively.",
    },
    {
      question: "What strategies do you use to enhance brand presence on social media?",
      answer:
        "We customize strategies to align with your brand’s voice and goals, utilizing targeted content calendars, community engagement practices, and performance analytics to enhance your online presence.",
    },
    {
      question: "Can you handle multiple social media platforms?",
      answer:
        "Yes, we manage a range of platforms including Facebook, Instagram, Twitter, LinkedIn, and more, ensuring a cohesive brand message across all channels.",
    },
    {
      question: "How do you deal with negative comments or a brand crisis on social media?",
      answer:
        "We employ proactive monitoring and rapid response strategies to manage negative comments and mitigate crises, maintaining your brand's reputation.",
    },
  ],
  "Social media Ads": [
    {
      question: "How do you ensure our ads target the right audience?",
      answer:
        "We use advanced targeting options based on demographics, interests, behaviors, and more to reach the most relevant audience for your brand.",
    },
    {
      question: "What kind of return on investment (ROI) can we expect from social media ads?",
      answer:
        "ROI can vary by campaign and goals, but we focus on maximizing your ad spend by optimizing campaigns for conversions and closely monitoring performance metrics.",
    },
    {
      question: "Do you offer creative design services for ads?",
      answer:
        "Yes, we provide complete creative solutions including graphic design, video production, and copywriting to make your ads engaging and effective.",
    },
    {
      question: "How often do you report on ad performance?",
      answer:
        "We offer regular reporting that suits your needs, ranging from weekly to monthly updates, including detailed analytics and insights to guide future strategies.",
    },
  ],
  "Social Media in B2B": [
    {
      question: "How does B2B social media marketing differ from B2C in your strategies?",
      answer:
        "Our B2B strategies are designed to build long-term relationships and establish thought leadership through content that addresses industry-specific issues, trends, and insights.",
    },
    {
      question: "What platforms do you recommend for B2B social media marketing?",
      answer:
        "LinkedIn and google are a cornerstone for B2B marketing, along with Twitter and Facebook depending on your industry and target audience specifics.",
    },
    {
      question: "How do you measure effectiveness in B2B social media marketing?",
      answer:
        "We focus on metrics such as lead generation, engagement with key decision-makers, and the quality of interactions over volume.",
    },
    {
      question: "Can social media influence B2B decision-making?",
      answer:
        "Absolutely, social media allows B2B companies to position themselves as experts in their field, influencing decision-makers and shaping industry conversations.",
    },
  ],
  "Social Media Content": [
    {
      question: "How do you create content that stands out on social media?",
      answer:
        "We prioritize originality and relevance in our content creation, utilizing trends, user engagement data, and brand identity to craft posts that capture attention.",
    },
    {
      question: "What types of content do you think perform best on social media?",
      answer:
        "Video content and interactive posts typically see higher engagement rates, but the best type of content can vary depending on your audience and platform.",
    },
    {
      question: "How do you ensure content aligns with our brand values?",
      answer:
        "We start by thoroughly understanding your brand’s values and voice, which guides the content strategy to ensure consistency and authenticity in all posts.",
    },
    {
      question: "Do you involve clients in the content creation process?",
      answer:
        "Yes, we collaborate closely with clients to ensure content not only meets but exceeds their expectations, incorporating their feedback and insights throughout the creation process.",
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
        Get quick answers on Social media strategy, ads, engagement, and more to effectively boost your online presence.
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





