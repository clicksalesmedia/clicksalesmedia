'use client'
import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const SeoCounter = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-10">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <Stat
          num={45}
          suffix="%"
          subheading="Lorem ipsum dolor sit amet consectetur"
        />
        <div className="h-[1px] w-12 bg-indigo-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={15.5}
          decimals={1}
          suffix="K+"
          subheading="Lorem ipsum dolor sit amet consectetur"
        />
        <div className="h-[1px] w-12 bg-indigo-200 sm:h-12 sm:w-[1px]" />
        <Stat
          num={20}
          suffix="B+"
          subheading="Lorem ipsum dolor sit amet consectetur"
        />
      </div>
    </div>
  );
};


const Stat = ({ num, suffix, decimals = 0, subheading }: { num: number, suffix: string, decimals?: number, subheading: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        (ref.current as HTMLDivElement).textContent = value.toFixed(decimals) + suffix;
      },
    });
  }, [num, decimals, isInView, suffix]);

  return (
    <div className="flex w-72 flex-col items-center py-2 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold sm:text-6xl text-secondaryColor">
        <span ref={ref}></span>
      </p>
      <p className="max-w-48 text-center text-whiteColor">{subheading}</p>
    </div>
  );
};

export default SeoCounter;
