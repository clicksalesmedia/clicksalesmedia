'use client'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect } from 'react';

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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 100,
    arrows: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const logos = [
    '/clients/wse.png',
    '/clients/thegreenroasteries-logo.png',
    '/clients/ses-school-logo-clicksalesmedia.png',
    '/clients/eshraq.png',
    '/clients/inspeedglobal-1.png',
    '/clients/maeva-2.png',
    '/clients/storage.png',
    '/clients/mahadahlan.png',
    '/clients/joynt-1.png',
    '/clients/bajunaid-company.png',
    '/clients/erosforlady.png',
    '/clients/lavivianex.png',
  ];

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
              width={200} 
              height={80} 
              src={logo} 
              alt={`Logo ${index + 1}`} 
              className="logo-image" 
              unoptimized={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselLogo;
