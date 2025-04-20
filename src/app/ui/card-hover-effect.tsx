'use client'
import { cn } from "../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const getIcon = (iconName: any) => {
  const iconPath = `/expertise/icons/${iconName}.svg`;
  return <Image width={150} height={150} src={iconPath} alt={iconName} className="w-10 h-10" />;
};



const HoverEffect = ({
  items,
  className,
  isRTL = false,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon: string;
  }[];
  className?: string;
  isRTL?: boolean;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={`${item?.link}-${idx}`}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-secondaryColor dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card icon={item.icon} isRTL={isRTL}>
            <CardTitle isRTL={isRTL}>{item.title}</CardTitle>
            <CardDescription isRTL={isRTL}>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};


export const Card = ({
  className,
  children,
  icon,
  isRTL = false,
}: {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isRTL?: boolean;
}) => {
  return (
    <div className={cn("rounded-2xl h-full w-full p-4 overflow-hidden bg-[#222222] border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className)}>
      <div className={`flex items-start ${isRTL ? 'space-x-reverse flex-row-reverse' : 'space-x-4'}`}>
        <div className="shrink-0">
          {icon && getIcon(icon)}
        </div>
        <div className="relative z-50 flex-grow">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
  isRTL = false,
}: {
  className?: string;
  children: React.ReactNode;
  isRTL?: boolean;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", isRTL ? "text-right" : "", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
  isRTL = false,
}: {
  className?: string;
  children: React.ReactNode;
  isRTL?: boolean;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        isRTL ? "text-right" : "",
        className
      )}
    >
      {children}
    </p>
  );
};
export default HoverEffect