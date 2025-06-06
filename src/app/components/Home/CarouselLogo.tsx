'use client'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  altText?: string;
  link?: string;
  active: boolean;
  sortOrder: number;
}

const CarouselLogo = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch logos from API
  useEffect(() => {
    async function fetchLogos() {
      try {
        const response = await fetch('/api/logos');
        if (!response.ok) {
          throw new Error('Failed to fetch logos');
        }
        const data = await response.json();
        setLogos(data);
      } catch (err) {
        console.error('Error fetching logos:', err);
        setError('Failed to load logos');
      } finally {
        setLoading(false);
      }
    }

    fetchLogos();
  }, []);

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

  // Show loading state
  if (loading) {
    return (
      <div className="w-full logo-carousel-container px-0 mx-0 vw-100">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondaryColor mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading logos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full logo-carousel-container px-0 mx-0 vw-100">
        <div className="flex justify-center items-center py-20">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (logos.length === 0) {
    return (
      <div className="w-full logo-carousel-container px-0 mx-0 vw-100">
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400">No logos available</p>
        </div>
      </div>
    );
  }

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
        {logos.map((logo) => {
          const logoElement = (
            <div key={logo.id} className="logo-item">
              <Image 
                width={200} 
                height={80} 
                src={logo.imageUrl} 
                alt={logo.altText || logo.name} 
                className="logo-image" 
                unoptimized={true}
              />
            </div>
          );

          // If logo has a link, wrap in anchor tag
          if (logo.link) {
            return (
              <a 
                key={logo.id}
                href={logo.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {logoElement}
              </a>
            );
          }

          return logoElement;
        })}
      </Slider>
    </div>
  );
};

export default CarouselLogo;
