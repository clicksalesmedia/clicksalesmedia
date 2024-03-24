'use client'
import React, { useRef } from "react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import Features from "../../expertise/b2b/Features";
import CountUpStats from "@/app/ui/counter";
import Keys from "./keys";

interface CardType {
  id: number;
  component: React.ComponentType<any>; // Specify props as needed
}

// Adjusted Services function to use dynamic imports based on id
export default function ServicesComponent() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <div ref={ref} className="relative">
        {CARDS.map((c, idx) => (
          <Card
            key={c.id}
            card={c}
            scrollYProgress={scrollYProgress}
            position={idx + 1}
          />
        ))}
      </div>
    </>
  );
}

const Card: React.FC<{
  position: number;
  card: CardType;
  scrollYProgress: MotionValue;
}> = ({ position, card, scrollYProgress }) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;
  const DynamicComponent = card.component; // Assigning dynamic component based on card data

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: position === CARDS.length ? undefined : y,
        background: isOddCard ? "#272727" : "#d1af77",
        color: isOddCard ? "#d1af77" : "#272727",
      }}
      className="sticky top-0 flex w-full origin-top flex-col items-center justify-center px-4"
    >
      {/* Rendering dynamic component */}
      <DynamicComponent className="mb-4 text-4xl" />
    </motion.div>
  );
};

const CARD_HEIGHT = 700;

const CARDS: CardType[] = [
  {
    id: 1,
    component: Features,
  },
  {
    id: 2,
    component: CountUpStats,
  },
  {
    id: 3,
    component: Keys,
  },
  {
    id: 4,
    component: Features,
  },
];
