'use client'
import { motion } from "framer-motion";

const HeroAnimatedButton = () => {
  return (
      <AIButton />
  );
};

const AIButton = () => {
  return (
    <button className="w-64 text-white font-medium px-3 py-2 rounded-md overflow-hidden relative transition-transform hover:scale-105 active:scale-95">
      <span className="relative z-10">Boost Your Business Now</span>
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: "-300%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 4,
          ease: "linear",
        }}
        className="bg-[linear-gradient(to_right,#c3a177,#cc9f6e,#d19b61,#ce8442,#bf752b)] absolute z-0 inset-0 w-[400%]"
      ></motion.div>
    </button>
  );
};

export default HeroAnimatedButton;