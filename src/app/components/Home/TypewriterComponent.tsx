"use client"

import React, { useEffect, useState } from 'react';

const TypewriterComponent: React.FC = () => {
  const sentences = [
    'Digital Marketing Agency',
    'Sales Strategies',
    'Website Solutions',
  ];

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = sentences[index][prevText?.length ?? 0];

        if (nextChar !== undefined) {
          return (prevText ?? '') + nextChar;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            // Clear the text after a delay
            const clearId = setInterval(() => {
              setDisplayText((prevText) => {
                const nextChar = prevText?.[prevText.length - 1];

                if (nextChar !== undefined) {
                  return prevText.slice(0, -1);
                } else {
                  clearInterval(clearId);

                  // Move to the next sentence after clearing
                  setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
                }

                return prevText ?? ''; // Ensure a string value is returned
              });
            }, 50); // Adjust the clearing speed (milliseconds)
          }, 1000); // Delay before clearing
        }

        return prevText ?? ''; // Ensure a string value is returned
      });
    }, 100); // Adjust the typing speed (milliseconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return <h2 className="text-2xl md:text-3xl text-secondaryColor font-montserrat"><span className='text-thirdColor'>ClickSalesMedia:</span> {displayText}</h2>;
};

export default TypewriterComponent;
