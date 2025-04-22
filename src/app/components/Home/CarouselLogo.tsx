'use client'
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect } from 'react';

const logos = [
  '/clients/client1.png',
  '/clients/client2.png',
  '/clients/client3.png',
  '/clients/client4.png',
  '/clients/client5.png',
  '/clients/client6.png',
  '/clients/client7.png',
  '/clients/client8.png',
];

const CarouselLogo = () => {
  // Add effect to handle overflow on mount and cleanup
  useEffect(() => {
    // Add overflow-x: hidden to html and body to prevent horizontal scrolling
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    // Cleanup function to restore original overflow settings when component unmounts
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full logo-carousel-container px-0 mx-0 vw-100">
      <style jsx global>{`
        html, body {
          overflow-x: hidden !important;
          max-width: 100%;
        }
        
        .logo-carousel-container {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding: 1rem 0;
          overflow: hidden;
          max-width: 100vw;
          box-sizing: border-box;
        }
        
        .slick-slider {
          overflow: hidden;
          max-width: 100vw;
        }
        
        .logo-item {
          display: flex !important;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          transition: all 0.3s ease;
        }
        
        .logo-image {
          filter: grayscale(100%);
          opacity: 0.7;
          transition: all 0.3s ease;
          mix-blend-mode: luminosity;
          max-height: 80px;
          object-fit: contain;
        }
        
        .logo-item:hover .logo-image {
          filter: grayscale(0%);
          opacity: 1;
          mix-blend-mode: normal;
          transform: scale(1.1);
          filter: drop-shadow(0 0 8px rgba(var(--secondary-color-rgb), 0.6));
        }
      `}</style>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="logo-item">
            <Image 
              width={160} 
              height={80} 
              src={logo} 
              alt={`Client Logo ${index + 1}`} 
              className="logo-image"
              quality={75}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselLogo;
