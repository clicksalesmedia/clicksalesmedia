'use client'
import { motion } from 'framer-motion';
import { FaLongArrowAltUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <button
        className="bg-secondaryColor text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <FaLongArrowAltUp className="w-6 h-6" />

      </button>
    </motion.div>
  );
};

export default ScrollToTopButton;