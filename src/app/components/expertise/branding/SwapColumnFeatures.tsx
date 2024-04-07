'use client'
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

interface Feature {
  id: number;
  callout: string;
  title: string;
  description: string;
  advantages?: { id: string; text: string }[];
  contentPosition: "l" | "r";
  Icon: React.ElementType;
  imageUrl: string;
}

const Swap = () => {
  return (
    <>
    <div className="mt-[-50px]">
      <SwapColumnFeatures />
    </div>
    </>
  );
};

const SwapColumnFeatures: React.FC = () => {
  const [featureInView, setFeatureInView] = useState<Feature>(features[0]);

  return (  
    <section className="relative mx-auto max-w-7xl">
    <SlidingFeatureDisplay featureInView={featureInView} />
    <div className="-mt-[100vh] hidden md:block" />
    {features.map((s) => (
      <Content
        key={s.id}
        featureInView={s}
        setFeatureInView={setFeatureInView}
        {...s}
      />
    ))}
  </section>
  );
};

const SlidingFeatureDisplay: React.FC<{ featureInView: Feature }> = ({ featureInView }) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content: React.FC<{
  featureInView: Feature;
  setFeatureInView: React.Dispatch<React.SetStateAction<Feature>>;
}> = ({ featureInView, setFeatureInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
      <motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <span className="rounded-full bg-secondaryColor px-2 py-1.5 text-xs font-medium text-whiteColor">
    {featureInView.callout}
  </span>
  <h2 className="my-3 text-5xl font-bold text-secondaryColor">
    {featureInView.title}
  </h2>
  <p className="text-whiteColor">
    {featureInView.description}
  </p>
  {featureInView.advantages && featureInView.advantages.length > 0 && (
    <ul role="list" className="space-y-2 pt-6">
      {featureInView.advantages.map((advantage) => (
        <li key={advantage.id} className="flex items-center gap-4 text-whiteColor dark:text-gray-400">
          <FiCheckCircle className="text-secondaryColor" />
          <span>{advantage.text}</span>
        </li>
      ))}
    </ul>
  )}
</motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature: React.FC<{ featureInView: Feature }> = ({ featureInView }) => {
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl overflow-hidden">
      {/* Image display */}
      <Image width={600} height={300} src={featureInView.imageUrl} alt={featureInView.title} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
};


export default Swap;

const features: Feature[] = [
 
  {
    id: 1,
    callout: "Branding",
    title: "Branding Strategy",
    description:
      "Developing a comprehensive branding strategy to guide your brand’s growth, messaging, and positioning in the market.",
    advantages: [
        { id: 'bs1', text: 'Defining your brand’s mission, values, and unique selling points.' },
        { id: 'bs2', text: 'Identifying target audience characteristics and preferences.' },
        { id: 'bs3', text: 'Crafting a roadmap for brand development and market presence.' },
        
      ],
    contentPosition: "l",
    Icon: FiPlay,
    imageUrl: '/brandstrategy.jpg',
  },
  {
    id: 2,
    callout: "Branding",
    title: "Brand Guidelines​",
    description:
      "Creating clear and comprehensive brand guidelines to ensure consistency in visual elements, messaging, and brand identity.",
      advantages: [
        { id: 'bs1', text: 'Designing a style guide encompassing logo usage, color schemes, typography, and imagery.' },
        { id: 'bs2', text: 'Documenting your brand’s tone of voice, messaging guidelines, and communication protocols.' },
        { id: 'bs3', text: 'Establishing a set of standards to maintain brand consistency across all materials.' },
        
      ],
    contentPosition: "r",
    Icon: FiDollarSign,
    imageUrl: '/branding-guid.jpg',
  },
  
  {
    id: 3,
    callout: "Branding",
    title: "Company Profile​",
    description:
      "Creating a compelling company profile that showcases your brand’s story, values, and achievements.",
      advantages: [
        { id: 'bs1', text: 'Crafting a narrative that resonates with your audience and communicates your brand’s journey.' },
        { id: 'bs2', text: 'Designing a visually appealing company profile with impactful graphics and content.' },
        { id: 'bs3', text: 'Highlighting your brand’s unique offerings and competitive advantages.' },
        
      ],
    contentPosition: "l",
    Icon: FiDollarSign,
    imageUrl: '/company-profile.jpg',
  },
 
  {
    id: 4,
    callout: "Branding",
    title: "Brand Positioning",
    description:
      "Strategically positioning your brand in the market to stand out, connect with your target audience, and gain a competitive edge.",
    advantages: [
        { id: 'bs1', text: 'Identifying your unique selling propositions and competitive advantages.' },
        { id: 'bs2', text: 'Crafting a brand story and messaging that resonates with your target audience.' },
        { id: 'bs3', text: 'Developing a strategic plan to establish your brand’s position in the market.' },
        
      ],
    contentPosition: "r",
    Icon: FiPlay,
    imageUrl: '/brandpositioning.jpg',
  },
];