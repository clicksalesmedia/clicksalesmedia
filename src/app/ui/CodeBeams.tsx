'use client'
import React, { useEffect, useState,ReactNode } from "react";
import { motion } from "framer-motion";

interface CodeBeamsProps {
  icon: React.ReactNode; 
  title: string;
  description: string;
}

interface TransitionProps {
  ease?: string;
  duration?: number;
  repeat?: number;
  repeatDelay?: number;
  // Include other properties as needed, or use a more flexible type like `any` or `Record<string, any>`
}

interface BeamProps {
  top: string | number;  
  left: string | number;
  transition?: TransitionProps;
}

interface CardProps {
  className?: string; 
  children: ReactNode;
}

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}


const CodeBeams: React.FC<CodeBeamsProps> = ({ icon, title, description }) => {
  return (
    <div className="relative overflow-hidden bg-[#111111] text-slate-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <section className="relative z-20 py-20 md:py-36">
          <span className="mx-auto mb-6 block w-fit rounded bg-gradient-to-br from-primaryColor to-[#111111] p-3 text-3xl shadow-md shadow-secondaryColor">
          {icon}
          </span>
          <h2 className="mb-3 text-center text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
          </h2>
          <p className="mb-6 text-center text-base leading-snug text-slate-400 sm:text-lg sm:leading-snug md:text-xl md:leading-snug">
          {description}
          </p>

        </section>
      </div>
      <BGGrid />
    </div>
  );
};

const BGGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(45 45 45 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute bottom-0 left-0 right-0 top-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-primaryColor/0 to-primaryColor/80" />
      <Beams />
    </div>
  );
};

const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const Beam: React.FC<BeamProps> = ({ top, left, transition = {} }) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-secondaryColor/0 to-secondaryColor"
    />
  );
};

export const SocialMediaHero = () => {

  return (
    <Card className="mx-auto max-w-3xl pt-3">
     <h1>
        hello
     </h1>
    </Card>
  );
};




const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <motion.div
      initial={{
        filter: "blur(4px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-[#222222] bg-gradient-to-br from-[#222222]/50 to-primaryColor/80 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};



const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

export default CodeBeams