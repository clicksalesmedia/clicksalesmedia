import ButtonUX from '@/app/ui/buttonux';
import React, { useState } from 'react';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-primaryColor dark:bg-gray-900">
      <div className="container px-6 py-20 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
          {/* Text and Button */}
          <div className="flex flex-col items-center lg:items-start lg:flex-1 max-w-lg mx-auto lg:mx-0">
            <h1 className="font-semibold py-5 leading-tight text-slate-200 dark:text-white text-4xl sm:text-5xl lg:text-6xl">
              Google Marketing <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">Services</span>
            </h1>
            <p className="text-slate-200 pb-10 dark:text-gray-300 tracking-tight md:font-normal max-w-xl mx-auto lg:max-w-none">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque cumque aut maiores debitis earum nisi officiis? A veritatis numquam sed illum ullam molestiae, obcaecati reprehenderit saepe, atque odio nemo exercitationem!
            </p>
            <ButtonUX />
          </div>
          {/* Image */}
          <div className="flex-1">
            <img className="object-cover w-full h-96 rounded-xl" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" alt="Marketing Image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
