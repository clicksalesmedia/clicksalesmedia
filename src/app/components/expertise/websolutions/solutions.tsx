'use client'
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import FormService from "@/app/ui/modal";

interface TextParallaxContentProps {
  imgUrl: string;         
  subheading: string;   
  heading: string;   
  children: React.ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}


export const Solutions = () => {
  return (
    <div className="bg-primaryColor">
      <TextParallaxContent
        imgUrl="/expertise/websolutions/web-application.jpg"
        subheading="New technology web applications"
        heading="Why Create Your Web Application with Us?">
        <WebApplication />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/expertise/websolutions/ecommerce-solution.jpg"
        subheading="Advanced Ecommerce Solutions"
        heading="Why Choose Our Advanced E-commerce Development Solutions?"
      >
        <EcommerceSolutions />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/expertise/websolutions/landing-page-marketing.jpg"
        subheading="Advanced Marketing Landing pages"
        heading="Why Opt for Our Advanced Marketing Landing Pages?"
      >
        <LandingPages />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl text-whiteColor">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl text-white">{heading}</p>
    </motion.div>
  );
};

const WebApplication = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 md:col-span-12">
      <p className="mb-4 text-xl text-whiteColor md:text-2xl">
      At Clicksalesmedia, we harness the power of the latest technologies and artificial intelligence to develop state-of-the-art web applications that are not only modern but also optimized for performance.
      </p>
      <p className="mb-8 text-xl text-whiteColor md:text-2xl">
      {"Our approach combines innovative AI solutions with cutting-edge web technology to create applications that are intelligent, efficient, and tailored to meet the unique needs of your business. From automating complex processes to delivering seamless user experiences, our team is dedicated to providing you with a competitive edge in today's digital world. Choose us to lead your project, and experience a partnership that transforms your digital presence."}
      </p>
      <FormService buttonText="Unleash Powerful Web Solutions!" />
    </div>
  </div>
);

const EcommerceSolutions = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 md:col-span-12">
      <p className="mb-4 text-xl text-whiteColor md:text-2xl">
      At Clicksalesmedia, we specialize in pushing the boundaries of e-commerce with our advanced development solutions powered by the latest technologies. 
      </p>
      <p className="mb-8 text-xl text-whiteColor md:text-2xl">
      {"Our commitment to innovation allows us to implement cutting-edge features such as AI-driven recommendations, AR/VR experiences, and seamless integration with multiple sales channels, ensuring a captivating and convenient shopping experience for your customers. Whether you're looking to optimize your existing online store or build a sophisticated e-commerce platform from scratch, our expert team equips your business with the tools it needs to thrive in a digital-first marketplace. Partner with us and turn your e-commerce vision into reality, driving growth and customer satisfaction."}
      </p>
      <FormService buttonText="Revolutionize Your Store Today!" />
    </div>
  </div>
);

const LandingPages = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 md:col-span-12">
      <p className="mb-4 text-xl text-whiteColor md:text-2xl">
      At Clicksalesmedia, we elevate the art of the landing page by integrating sophisticated CRM and tracking technologies to enhance your marketing campaigns. </p>
      <p className="mb-8 text-xl text-whiteColor md:text-2xl">
      {"Our advanced landing pages are designed not just to attract but also to convert. By employing the latest tools in analytics and customer relationship management, we ensure that every visitor's interaction is captured, analyzed, and utilized to tailor interactions and boost conversions. From dynamic content that adapts to user behavior to precise tracking that informs strategy adjustments in real-time, our solutions empower your business to make data-driven decisions that significantly improve campaign performance. Partner with us to craft landing pages that serve as powerful tools in your marketing arsenal, turning traffic into valuable leads. "}</p>
      <FormService buttonText="Convert Visitors Now!" />
    </div>
  </div>
);

export default Solutions