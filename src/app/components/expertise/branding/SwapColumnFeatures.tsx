'use client'
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
const Swap = () => {
  return (
    <>
    <div className="mt-[-50px]">
      <SwapColumnFeatures />
    </div>
    </>
  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(features[0]);

  return (
    
    <section className="relative mx-auto max-w-7xl">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
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

const SlidingFeatureDisplay = ({ featureInView }) => {
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

const Content = ({ setFeatureInView, featureInView }) => {
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
          <h2 className="my-3 text-5xl font-bold text-secondaryColor">{featureInView.title}</h2>
          <p className="text-whiteColor">{featureInView.description}</p>
          {featureInView.advantages?.length > 0 && (
            <ul role="list" className="space-y-2 pt-6">
            {featureInView.advantages.map((advantage) => (
              <li key={advantage.id} className="flex items-center gap-4 text-whiteColor dark:text-gray-400">
                <FiCheckCircle className="text-secondaryColor"/>
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

const ExampleFeature = ({ featureInView }) => {
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl overflow-hidden">
      {/* Image display */}
      <img src={featureInView.imageUrl} alt={featureInView.title} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
};


export default Swap;

const features = [
  {
    id: 1,
    callout: "Branding",
    title: "Business Name",
    description:
      "Your business name is the cornerstone of your brand identity. We assist in selecting a name that resonates with your vision, target audience, and industry, ensuring it’s memorable and distinct.",
    advantages: [
        { id: 'bs1', text: 'Brainstorming and ideation for a unique business name.' },
        { id: 'bs2', text: 'Availability checks to secure your chosen name legally.' },
        { id: 'bs3', text: 'Name development aligned with your brand’s identity and values.' },
      ],
    contentPosition: "r",
    Icon: FiEye,
    imageUrl: '/brandingname.jpg',
  },
  {
    id: 2,
    callout: "Branding",
    title: "Business Slogan",
    description:
      "Crafting a compelling business slogan or tagline that encapsulates your brand’s essence and resonates with your audience.",
    advantages: [
        { id: 'bs1', text: 'Ideation and creation of a memorable and impactful business slogan.' },
        { id: 'bs2', text: 'Ensuring alignment with your brand’s messaging and values.' },
        { id: 'bs3', text: 'Crafting a succinct and engaging tagline that sticks with your audience.' },
        
      ],
    contentPosition: "l",
    Icon: FiSearch,
    imageUrl: '/slogan.jpg',
  },
  {
    id: 3,
    callout: "Branding",
    title: "Branding Strategy",
    description:
      "Developing a comprehensive branding strategy to guide your brand’s growth, messaging, and positioning in the market.",
    advantages: [
        { id: 'bs1', text: 'Defining your brand’s mission, values, and unique selling points.' },
        { id: 'bs2', text: 'Identifying target audience characteristics and preferences.' },
        { id: 'bs3', text: 'Crafting a roadmap for brand development and market presence.' },
        
      ],
    contentPosition: "r",
    Icon: FiPlay,
    imageUrl: '/brandstrategy.jpg',
  },
  {
    id: 4,
    callout: "Branding",
    title: "Brand Guidelines​",
    description:
      "Creating clear and comprehensive brand guidelines to ensure consistency in visual elements, messaging, and brand identity.",
      advantages: [
        { id: 'bs1', text: 'Designing a style guide encompassing logo usage, color schemes, typography, and imagery.' },
        { id: 'bs2', text: 'Documenting your brand’s tone of voice, messaging guidelines, and communication protocols.' },
        { id: 'bs3', text: 'Establishing a set of standards to maintain brand consistency across all materials.' },
        
      ],
    contentPosition: "l",
    Icon: FiDollarSign,
    imageUrl: '/branding-guid.jpg',
  },
  {
    id: 5,
    callout: "Branding",
    title: "Logo Design",
    description:
      "Designing a memorable and visually striking logo that embodies your brand’s personality and message.",
    advantages: [
        { id: 'bs1', text: 'Custom logo design tailored to your brand’s identity and values.' },
        { id: 'bs2', text: 'Iterative design process with client feedback to ensure satisfaction.' },
        { id: 'bs3', text: 'Delivery of logo files in various formats for versatile use.' },
        
      ],
    contentPosition: "r",
    Icon: FiPlay,
    imageUrl: '/logodeisgn.jpg',
  },
  {
    id: 6,
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
    id: 7,
    callout: "Branding",
    title: "Brand Stationery",
    description:
      "Designing branded stationery that conveys professionalism and consistency in all business communications.",
    advantages: [
        { id: 'bs1', text: 'Developing business cards, letterheads, envelopes, and email signatures with your brand’s visual identity.' },
        { id: 'bs2', text: 'Ensuring cohesive branding across all stationery items.' },
        { id: 'bs3', text: 'Enhancing brand recognition in all written and digital interactions.' },
        
      ],
    contentPosition: "r",
    Icon: FiPlay,
    imageUrl: '/brandguidlines.jpg',
  },
  {
    id: 8,
    callout: "Branding",
    title: "Packaging​",
    description:
      "Creating eye-catching and functional packaging that reinforces your brand’s image and resonates with customers.",
      advantages: [
        { id: 'bs1', text: 'Designing packaging that reflects your brand’s aesthetics and values.' },
        { id: 'bs2', text: 'Ensuring practicality and sustainability in packaging solutions.' },
        { id: 'bs3', text: 'Enhancing the unboxing experience to leave a lasting impression.' },
        
      ],
    contentPosition: "l",
    Icon: FiDollarSign,
    imageUrl: '/package.jpg',
  },
  {
    id: 9,
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