import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Data from "@/app/ui/data";


interface Settings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  centerMode: boolean;
  focusOnSelect: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  responsive?: any; // Updated to a more appropriate type if necessary
}

const CustomCarousel: React.FC = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 1700,
    responsive: [
      {
        breakpoint: 768, // TailwindCSS SM breakpoint
        settings: {
          slidesToShow: 1,
        },
      },
      // You can add more breakpoints here if needed
    ],
  };

  const slides = [
    "/social/diving.png",
    "/social/maeva.png",
    "/social/lubina.png",
    "/social/laviviane.png",
    "/social/wse.png",
  ];

  return (
    // Use a React Fragment to wrap multiple elements
    <>
      <div className="relative mx-auto w-full max-w-screen-xl px-4 py-20">
        <div className="absolute top-1/2 left-1/4 right-1/4 transform -translate-y-1/2 mx-auto w-1/2 h-1/4 bg-secondaryColor/50 rounded-l-full rounded-r-full z-0"></div>
        <Slider {...settings} className="relative z-10">
          {slides.map((src, index) => (
            <div key={index} className="px-2">
              <Image src={src} alt={`Slide ${index}`} width={211} height={427} layout="responsive" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CustomCarousel;
