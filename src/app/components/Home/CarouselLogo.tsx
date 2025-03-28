'use client'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

const CarouselLogo = () => {
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
    <div>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className='py-10'>
            <Image width={200} height={80} src={logo} alt={`Logo ${index + 1}`} className='logoImage w-full max-w-40' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselLogo;
