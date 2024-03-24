
import Data from "@/app/ui/data";
import { FaInstagram, FaLinkedinIn ,FaXTwitter } from "react-icons/fa6";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socialMedia: {
    reddit: string;
    facebook: string;
    github: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Arthur Melo',
    role: 'Design Director',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  // Add more team members as needed
];

const ExecutiveTeam: React.FC = () => {
  return (
    <section className="bg-primaryColor dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
      <Data sectionName="team" />

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center p-8 transition-colors duration-300 transform border border-secondaryColor cursor-pointer rounded-xl hover:border-transparent group hover:bg-secondaryColor dark:border-gray-700 dark:hover:border-transparent">
              <img className="object-cover w-32 h-32 rounded-full ring-4 ring-secondaryColor" src={member.imageUrl} alt={member.name} />

              <h1 className="mt-4 text-2xl font-semibold text-secondaryColor capitalize dark:text-white group-hover:text-white">{member.name}</h1>

              <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{member.role}</p>

              <div className="flex mt-3 -mx-2">
                <a href={member.socialMedia.reddit} className="mx-2 text-secondaryColor dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Reddit">
                <FaXTwitter />
                </a>
                <a href={member.socialMedia.facebook} className="mx-2 text-secondaryColor dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Facebook">
                <FaInstagram />
                </a>
                <a href={member.socialMedia.github} className="mx-2 text-secondaryColor dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Github">
                <FaLinkedinIn />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default ExecutiveTeam;
