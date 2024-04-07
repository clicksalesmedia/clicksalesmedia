'use client'
import React, { ReactNode } from "react";
import { IconType } from 'react-icons';
import { motion } from "framer-motion";
import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";

interface TranslateWrapperProps {
    children: ReactNode; 
    reverse?: boolean; 
  }

  interface LogoItemProps {
    Icon: IconType;
    name: string;
  }

const Services = () => {
  return (
    <section className="bg-primaryColor py-24">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight  text-center text-whiteColor md:text-5xl lg:text-6xl dark:text-white">
   Our Branding {" "}
    <span className="text-secondaryColor dark:text-blue-500">Services</span>
  </h1>
      <div className="flex translate-y-[50%] rotate-[7deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-secondaryColor">
        <TranslateWrapper reverse={false}>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper reverse={false}>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper reverse={false}>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="flex -translate-y-[50%] -rotate-[7deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-secondaryColor">
        <TranslateWrapper reverse={true}>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse={true}>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse={true}>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
  );
};

const TranslateWrapper: React.FC<TranslateWrapperProps> = ({ children, reverse = false }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem: React.FC<LogoItemProps> = ({ Icon, name }) => {
  return (
    <a
      href="/"
      rel="nofollow"
      target="_blank"
      className="flex items-center justify-center gap-4 px-4 py-4 text-black transition-colors md:py-6"
    >
      <Icon className="text-3xl md:text-4xl" />
      <span className="whitespace-nowrap text-2xl font-semibold uppercase md:text-3xl">
        {name}
      </span>
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiNike} name="Business Name" />
    <LogoItem Icon={Si3M} name="Logo Design" />
    <LogoItem Icon={SiAbstract} name="Slogan" />
    <LogoItem Icon={SiAdobe} name="Brand Positioning" />
    <LogoItem Icon={SiAirtable} name="Graphic Design" />
    
    
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={SiBmw} name="Brand Strategy" />
    <LogoItem Icon={SiBurton} name="Personal Branding" />
    <LogoItem Icon={SiBuildkite} name="Brand Boosting" />
    <LogoItem Icon={SiAmazon} name="Packaging" />
    <LogoItem Icon={SiBox} name="Brand Registration" />
    <LogoItem Icon={SiBytedance} name="Brand Awarness" />
    <LogoItem Icon={SiChase} name="Video Production" />
    <LogoItem Icon={SiCloudbees} name="Photo Shooting" />
  </>
);

export default Services;