'use client'
import React, { useState, ReactNode } from "react";
import { FiMenu, FiArrowRight, FiX, FiChevronDown } from "react-icons/fi";
import { GrSchedule } from "react-icons/gr";

import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";


interface NavLinkProps {
  children: ReactNode;
  href: string;
  FlyoutContent?: React.ComponentType<{ setMenuOpen?: (open: boolean) => void }>;
}

interface MobileMenuLinkProps {
  children: ReactNode;
  href: string;
  FoldContent?: React.ComponentType<{ setMenuOpen?: (open: boolean) => void }>;
  setMenuOpen: (open: boolean) => void;
}


interface ExpertiseProps {
  setMenuOpen?: (open: boolean) => void; 
}

const Navbar = () => {
  return (
    <>
      <FlyoutNav />
    </>
  );
};

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 250 ? true : false);
  });

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12
      ${
        scrolled
          ? "bg-primaryColor py-3 shadow-xl"
          : "bg-primaryColor/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href='/'>
      <Image src='/clicksalesmedialogo.svg' alt="clicksalesmedia agency" width={100} height={50}></Image>
      </Link>
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <Link href={href} className="relative">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-secondaryColor transition-transform duration-300 ease-out"
        />
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primaryColor" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 rounded-xs border-2 border-secondaryColor px-4 py-2 font-semibold text-secondaryColor transition-colors transition duration-500 hover:bg-white hover:text-black">
      <GrSchedule />
      <span>Schedule a Meeting</span>
      </button>
    </div>
  );
};
const Expertise: React.FC<ExpertiseProps> = ({ setMenuOpen }) => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-secondaryColor p-6 lg:col-span-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-primaryColor">Our Expertise</h2>
          <p className="mb-6 max-w-xs text-sm text-primaryColor">
          {"Placeholder is the world's leading placeholder company."}
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-xs text-primaryColor hover:underline"
        >
          Discover More <FiArrowRight />
        </Link>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-primaryColor border border-[#222222] p-6 lg:col-span-8"
      onClick={() => setMenuOpen?.(false)}
      >
        <Link
          href="/expertise/branding"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">Branding</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
        <Link
          href="/expertise/social-media-management"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">Social Media</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
        <Link
          href="/expertise/website-solutions"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">Website Solutions</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
        <Link
          href="/expertise/seo-solutions"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">SEO Solutions</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
        <Link
          href="/expertise//google-marketing-services"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">Google Marketing</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
        <Link
          href="/expertise/business-to-business"
          className="rounded border-2 border-secondaryColor bg-[#222222] p-3 transition-colors hover:bg-[#111111]"
        >
          <h3 className="mb-1 font-semibold text-secondaryColor">Business to Business</h3>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, quam?
          </p>
        </Link>
      </div>
    </div>
  );
};


const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({ children, href, FoldContent, setMenuOpen }) => {
  const [open, setOpen] = useState(false);


  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
    setMenuOpen(false);
  };
  

  const toggleFoldContent = () => {
    setOpen(!open);
    if (!FoldContent) {
      setMenuOpen(false); // Close the menu if there's no foldable content
    }
  };

  

 return (
    <div className="relative text-neutral-950">
      {FoldContent ? (
        <>
           <div
            className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
            onClick={toggleFoldContent}
          >
            <span>{children}</span>
            <motion.div
              animate={{ rotate: open ? "180deg" : "0deg" }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <FiChevronDown />
            </motion.div>
          </div>
          {open && (
            <motion.div
              initial={false}
              animate={{
                height: "fit-content",
                marginBottom: "24px",
                marginTop: "12px",
              }}
              className="overflow-hidden"
            >
               <FoldContent setMenuOpen={setMenuOpen} />
            </motion.div>
          )}
        </>
      ) : (
        <div
          onClick={handleClick} // This is now correctly typed for a div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
        >
          <Link href={href}>{children}</Link>
          <FiArrowRight />
        </div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-primaryColor"
          >
            <div className="flex items-center justify-between p-6 bg-[#222222]">
              <Logo />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-secondaryColor" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-primaryColor p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end bg-primaryColor p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

const LINKS = [
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Expertise",
    href: "#",
    component: Expertise,
  },
  {
    text: "Case Studies",
    href: "/case-studies",
  },
  {
    text: "Blog",
    href: "/blog",
  },
  {
    text: "Contact",
    href: "/contact",
  },
];