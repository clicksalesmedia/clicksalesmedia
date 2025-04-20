"use client"
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';

interface TeamMember {
  id: keyof typeof memberIds;
  imageUrl: string;
  socialMedia: {
    reddit: string;
    facebook: string;
    github: string;
  };
}

// Define member IDs as a type to ensure type safety with translations
const memberIds = {
  rafif: 'rafif',
  sara: 'sara',
  said: 'said',
  reem: 'reem',
  ibraheem: 'ibraheem',
  zeina: 'zeina',
  moncef: 'moncef',
  ahmed: 'ahmed',
  layla: 'layla',
  omar: 'omar',
  nadia: 'nadia',
  karim: 'karim',
  maya: 'maya',
  youssef: 'youssef',
  fatima: 'fatima',
  ziad: 'ziad'
} as const;

const teamMembers: TeamMember[] = [
  {
    id: 'rafif',
    imageUrl: '/team/rafif.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'sara',
    imageUrl: '/team/sara.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'said',
    imageUrl: '/team/said.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'reem',
    imageUrl: '/team/reem.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'ibraheem',
    imageUrl: '/team/ibrahim.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'zeina',
    imageUrl: '/team/zeina.png',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'moncef',
    imageUrl: '/team/moncef.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'ahmed',
    imageUrl: '/team/ahmed.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'layla',
    imageUrl: '/team/layla.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'omar',
    imageUrl: '/team/omar.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'nadia',
    imageUrl: '/team/nadia.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'karim',
    imageUrl: '/team/karim.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'maya',
    imageUrl: '/team/maya.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'youssef',
    imageUrl: '/team/youssef.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'fatima',
    imageUrl: '/team/fatima.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
  {
    id: 'ziad',
    imageUrl: '/team/ziad.jpg',
    socialMedia: {
      reddit: '#',
      facebook: '#',
      github: '#',
    },
  },
];

const ExecutiveTeam: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <section className="bg-primaryColor dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className={`flex flex-col items-center max-w-2xl mx-auto text-center ${isRTL ? 'rtl' : ''}`}>
          <span className="text-secondaryColor font-semibold tracking-wider text-sm">{t('team.title')}</span>
          <h2 className="mt-4 font-bold text-slate-200 text-2xl sm:text-3xl lg:text-4xl">
            {t('team.heading')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-secondaryColor to-[#B28757]">
              {t('team.headingHighlight')}
            </span>
          </h2>
          <p className="mt-4 text-slate-200 dark:text-gray-300">
            {t('team.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => {
            // Safely construct the translation paths
            const namePath = `team.members.${member.id}.name` as const;
            const rolePath = `team.members.${member.id}.role` as const;
            
            return (
              <div key={index} className={`flex flex-col items-center p-8 transition-colors duration-300 transform border border-secondaryColor cursor-pointer rounded-xl hover:border-transparent group hover:bg-secondaryColor dark:border-gray-700 dark:hover:border-transparent ${isRTL ? 'rtl' : ''}`}>
                <Image 
                  className="object-cover w-32 h-32 rounded-full ring-4 ring-secondaryColor" 
                  width={128} 
                  height={128} 
                  src={member.imageUrl} 
                  alt={t(namePath)} 
                />

                <h1 className="mt-4 text-2xl font-semibold text-secondaryColor capitalize dark:text-white group-hover:text-white">
                  {t(namePath)}
                </h1>

                <p className="mt-2 text-whiteColor capitalize dark:text-gray-300 group-hover:text-gray-300">
                  {t(rolePath)}
                </p>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTeam;
