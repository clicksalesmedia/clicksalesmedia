import Link from "next/link";
import { FiArrowRight } from "react-icons/fi"; // Importing the right arrow icon

const ButtonGen = () => {
  return (
    <div className="grid place-content-center">
      <Link href="#" passHref>
        <DrawOutlineButton>Read More</DrawOutlineButton>
      </Link>
    </div>
  );
};

const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button 
      {...rest}
      className="group relative inline-flex items-center px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-secondaryColor"
    >
      <span>{children}</span>
      <FiArrowRight className="ml-2" /> 

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-secondaryColor transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-secondaryColor transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-secondaryColor transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-secondaryColor transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default ButtonGen;
