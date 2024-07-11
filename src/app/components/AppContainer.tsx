// components/AppContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import AnimatedCursor from 'react-animated-cursor';
import ScrollToTopButton from '../utils/ScrollToTopButton';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLoaded();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen onLoaded={handleLoaded} />}
      {isLoaded && (
        <>
          <Navbar />
          <AnimatedCursor
            innerSize={8}
            outerSize={10}
            color='178, 137, 85'
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={5}
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link',
            ]}
          />
          {children}
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </>
  );
};

export default AppContainer;
