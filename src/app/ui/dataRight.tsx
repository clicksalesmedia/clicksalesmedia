// Defining an interface for the section structure
interface Section {
  title: string;
  description: string;
  highlight: string;
}

// Defining an interface for the sections object
interface Sections {
  [key: string]: Section;
}

// The sections data with explicit typing
export const sections: Sections = {
// Social media management
  Social: {
      title: "Your path for achieving ",
      description: "Organic content generates connection, while performance strategies provide results. If you want consistent social results, you need a system that handles everything, from paid media to strategy to big-picture goals, and more.",
      highlight: "social media success.",
  },

  // Web solution

  WebPortfolio: {
    title: "Services Section Title",
    description: "This is the description for the Services section.",
    highlight: "for the About section.",
},

};

// TypeScript component with typed props
const DataRight: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const sectionData = sections[sectionName];

  if (!sectionData) {
      return null; // Handle cases where sectionName is not found
  }

  const { title, description, highlight } = sectionData;

  return (
      <>
          <div className="flex flex-col justify-left text-left  mx-auto md:max-w-3xl space-y-5">
              <h2 className="font-semibold font-cormorant text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">
                  {title} <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">{highlight}</span>
              </h2>
              <p className="text-whiteColor dark:text-gray-300">
                  {description}
              </p>
          </div>
      </>
  );
};

export default DataRight;
