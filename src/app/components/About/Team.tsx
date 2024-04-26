
import Data from "@/app/ui/data";
import Image from "next/image";
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
    name: 'Rafif Shaaban',
    role: 'Co-founder',
    imageUrl: '/team/rafif.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Sara Hamza',
    role: 'Account Manager',
    imageUrl: '/team/sara.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Said Jabouri',
    role: 'Head of Production',
    imageUrl: '/team/said.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Reem El-baba',
    role: 'Head of Content Marketing',
    imageUrl: '/team/reem.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Ibraheem Rayaan',
    role: 'Head of webmaster',
    imageUrl: '/team/ibrahim.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Zeina Jadayel',
    role: 'Design Director',
    imageUrl: '/team/zeina.png',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    name: 'Moncef Bennassar',
    role: 'Head of ads Management',
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
              <Image className="object-cover w-32 h-32 rounded-full ring-4 ring-secondaryColor" width={128} height={128}  src={member.imageUrl} alt={member.name} />

              <h1 className="mt-4 text-2xl font-semibold text-secondaryColor capitalize dark:text-white group-hover:text-white">{member.name}</h1>

              <p className="mt-2 text-whiteColor capitalize dark:text-gray-300 group-hover:text-gray-300">{member.role}</p>
              {/*
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
          */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default ExecutiveTeam;
