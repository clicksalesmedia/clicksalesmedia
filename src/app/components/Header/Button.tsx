'use client'
import { motion } from "framer-motion";


const AIButton = () => {
  return (
    <button className="text-white font-medium px-3 py-2 rounded-md overflow-hidden relative transition-transform hover:scale-105 active:scale-95">
      <span className="relative z-10">Sign up free</span>
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: "-300%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 4,
          ease: "linear",
        }}
        className="bg-[linear-gradient(to_right,#C3A177,#E6C68D,#FFD36F,#FFBE5E,#FF9C40)] absolute z-0 inset-0 w-[400%]"
      ></motion.div>
    </button>
  );
};

export default AIButton;