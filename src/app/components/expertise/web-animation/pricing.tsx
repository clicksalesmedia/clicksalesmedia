"use client";
import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface BenefitProps {
  text: string;
  checked: boolean;
}

interface PriceCardProps {
  tier: string;
  price: string;
  bestFor: string;
  CTA: React.ReactNode;
  benefits: BenefitProps[];
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Pricing: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-primaryColor text-zinc-200 selection:bg-zinc-600">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-3xl font-semibold leading-tight text-secondaryColor sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-zinc-400 md:text-lg">
          Our Web Animation Packages
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PriceCard
            tier="One-time Fee"
            price="$490"
            bestFor="Basic Web Animation Package"
            CTA={<GhostButton className="w-full">Get started now</GhostButton>}
            benefits={[
              { text: "3 UX Design Sections", checked: true },
              { text: "3 Web Animations", checked: true },
              { text: "2 Ad Banners for Google Ads", checked: true },
              { text: "1 Ad Banner for Social Ads", checked: true },
            ]}
          />
          <PriceCard
            tier="One-time Fee"
            price="$650"
            bestFor="Standard Web Animation Package"
            CTA={<GhostButton className="w-full">Get Standard</GhostButton>}
            benefits={[
              { text: "5 UX Design Sections", checked: true },
              { text: "5 Web Animations", checked: true },
              { text: "4 Ad Banners for Google Ads", checked: true },
              { text: "3 Ad Banners for Social Ads", checked: true },
              { text: "1 Email Marketing Animation Design", checked: true },
            ]}
          />
          <PriceCard
            tier="One-time Fee"
            price="$890"
            bestFor="Premium Web Animation Package"
            CTA={
              <GhostButton className="w-full bg-secondaryColor text-black font-semibold hover:bg-zinc-200 hover:text-zinc-900">
                Go Premium
              </GhostButton>
            }
            benefits={[
              { text: "5 UX Design Sections", checked: true },
              { text: "5 Web Animations", checked: true },
              { text: "4 Ad Banners for Google Ads", checked: true },
              { text: "3 Ad Banners for Social Ads", checked: true },
              { text: "1 Email Marketing Animation Design", checked: true },
              { text: "1 Landing Page or Website (4 pages)", checked: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const PriceCard: React.FC<PriceCardProps> = ({ tier, price, bestFor, CTA, benefits }) => {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center border-b border-zinc-700 pb-6">
          <span className="mb-6 inline-block text-zinc-50">{tier}</span>
          <span className="mb-3 inline-block text-4xl font-medium text-secondaryColor">{price}</span>
          <span className="bg-gradient-to-br from-zinc-200 to-zinc-500 bg-clip-text text-center text-transparent">
            {bestFor}
          </span>
        </div>

        <div className="space-y-4 py-9">
          {benefits.map((b, i) => (
            <Benefit {...b} key={i} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {CTA}
      </div>
    </Card>
  );
};

const Benefit: React.FC<BenefitProps> = ({ text, checked }) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-secondaryColor text-sm text-zinc-50">
          <FiCheck />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-800 text-sm text-zinc-400">
          <FiX />
        </span>
      )}
      <span className="text-sm text-zinc-300">{text}</span>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ className, children, style = {} }) => {
  return (
    <motion.div
      initial={{
        filter: "blur(2px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      style={style}
      className={twMerge(
        "relative h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-gradient-to-br from-zinc-950/50 to-zinc-900/80 p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "rounded-md px-4 py-2 text-lg text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Pricing;
