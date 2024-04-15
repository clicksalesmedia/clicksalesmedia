'use client'
import React, { useEffect, useRef } from "react";
import ScrollAnimationWrapper from "@/app/ui/ScrollAnimationWrapper";
import Link from "next/link";
import Image from "next/image";

const FitText: React.FC = () => {
  // Specify the type of elements the refs will point to.
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) {
        return;
      }

      const containerWidth = container.offsetWidth;
      let min = 1;
      let max = 2500;

      while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        text.style.fontSize = `${mid}px`;

        if (text.offsetWidth <= containerWidth) {
          min = mid + 1;
        } else {
          max = mid - 1;
        }
      }

      text.style.fontSize = `${max}px`;
    };

    resizeText();

    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  return (
    <>
    <ScrollAnimationWrapper>
      <div className="flex h-200 items-center justify-center overflow-hidden bg-primaryColor" ref={containerRef}>
        <span className="whitespace-nowrap text-center font-bold uppercase text-[#474747] text-opacity-2" ref={textRef}>
        We are Google Partner Agency
        </span>
      </div>
    </ScrollAnimationWrapper>
    <div className="flex justify-center items-center">
    <Link href="https://www.google.com/partners/agency?id=5210292678" target="_blank">
    <Image width={150} height={150} alt="google partner agency clicksalesmedia" src="https://www.gstatic.com/partners/badge/images/2024/PartnerBadgeClickable.svg"/>
    </Link>
    </div>
    </>
  );
};

export default FitText;
