'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define a type for the cursor position
type CursorPosition = {
  x: number;
  y: number;
};

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Define the function with the correct event type
    const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', setFromEvent);

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, []);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{ ease: "linear", duration: 0.1 }}
    >
      <div className="w-6 h-6 rounded-full bg-transparent border border-gray-800 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
