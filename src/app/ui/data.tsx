// Defining an interface for the section structure
interface Section {
  title: string;
  description: string;
  highlight: string;
  subTitle: string;
}

// Defining an interface for the sections object
interface Sections {
  [key: string]: Section;
}

// The sections data with explicit typing
export const sections: Sections = {

    //Home
  services: {
      title: "Services Section Title",
      description: "This is the description for the Services section.",
      highlight: "for the About section.",
      subTitle: "Testimonials"
  },
  about: {
      title: "About Section Title",
      description: "This is the description",
      highlight: "for the About section.",
      subTitle: "Testimonials"
  },
  // Add other sections following the same structure...
  // Example for brevity:
  features: {
      subTitle: "OUR FEATURES",
      title: "Marketing Solutions for",
      highlight: "Your Business Needs.",
      description: "Experience unparalleled premium quality with ClickSalesMedia. Elevate your expectations and discover a world of exclusive, top-tier marketing services."
  },

  // Expertise:
  //-Websolution:
  why: {
    subTitle: "OUR FEATURES",
    title: "Marketing Solutions for",
    highlight: "Your Business Needs.",
    description: "Experience unparalleled premium quality with ClickSalesMedia. Elevate your expectations and discover a world of exclusive, top-tier marketing services."
},

// Expertise:
  //-seo:
  seoServices: {
    subTitle: "OUR FEATURES",
    title: "Marketing Solutions for",
    highlight: "Your Business Needs.",
    description: ""
},

// B2B Industries

B2bIndustries: {
    title: "Comprehensive Performance Marketing Solutions ",
    subTitle: "Industries",
    description: "Customized Strategies to Meet Industry-Specific Demands ",
    highlight: "for Diverse Industries",
  },

//Schedule a meeting

scheduleMeeting: {
  subTitle: "Schedule a meeting",
  title: "Schedule a free 30 Min",
  highlight: "Consultation Meeting!",
  description: "Book a free consultation to explore how we can help elevate your business and project with tailored marketing and sales strategies designed to boost your performance and drive success."
},
};

// TypeScript component with typed props
const Data: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const sectionData = sections[sectionName];

  if (!sectionData) {
      return null; // Handle cases where sectionName is not found
  }

  const { title, subTitle, description, highlight } = sectionData;

  return (
      <>
          <div className="flex flex-col justify-center text-center  mx-auto md:max-w-3xl space-y-5">
              <span className="rounded-lg px-2.5 py-1 text-xs w-max mx-auto font-semibold tracking-wide text-whiteColor bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{subTitle}</span>
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-whiteColor dark:text-white">
                  {title} <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{highlight}</span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                  {description}
              </p>
          </div>
      </>
  );
};

export default Data;
