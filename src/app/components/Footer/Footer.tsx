'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';
// Import is now in globals.css
// import 'react-toastify/dist/ReactToastify.css';


import { FaInstagramSquare, FaLinkedin, FaPinterestSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
 
interface FooterItemProps {
    text: string;
    link: string;
  }

interface FooterBlockItemProps {
    title: string;
    items: Array<{ id: number; text: string; link: string }>;
  }

const FooterItem = ({ text, link }: FooterItemProps) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    
    return (
        <li>
            <Link href={link} className={`duration-200 text-whiteColor hover:text-secondaryColor dark:hover:text-blue-500 ${isRTL ? 'font-noto-kufi' : ''}`}>
                {text}
            </Link>
        </li>
    )
}
 
const FooterBlockItem = ({ title, items }: FooterBlockItemProps) => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    
    return (
        <div className="space-y-5">
            <h1 className={`text-xl font-semibold text-secondaryColor dark:text-gray-100 ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                {title}
            </h1>
            <ul className={`space-y-3 text-sm ${isRTL ? 'text-right' : ''}`}>
                {
                    items.map(item=>(
                        <FooterItem key={item.id} {...item}/>
                    ))
                }
            </ul>
        </div>
    )
}
 
const Footer = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [email, setEmail] = useState('');

    const footerBlocks = [
        {
            id: 1,
            title: t('footer.company.title'),
            items: [
                {
                    id: 1,
                    text: t('footer.company.about'),
                    link: "/about"
                },
                {
                    id: 2,
                    text: t('footer.company.caseStudies'),
                    link: "/case-studies"
                },
                {
                    id: 3,
                    text: t('footer.company.blog'),
                    link: "/blog"
                },
            ]
        },
        {
            id: 2,
            title: t('footer.expertise.title'),
            items: [
                {
                    id: 1,
                    text: t('footer.expertise.branding'),
                    link: "/expertise/branding"
                },
                {
                    id: 2,
                    text: t('footer.expertise.socialMedia'),
                    link: "/expertise/social-media"
                },
                {
                    id: 3,
                    text: t('footer.expertise.webSolutions'),
                    link: "/expertise/web-solutions"
                },
                {
                    id: 4,
                    text: t('footer.expertise.seoSolutions'),
                    link: "/expertise/seo-solutions"
                },
                {
                    id: 5,
                    text: t('footer.expertise.googleMarketing'),
                    link: "/expertise/google-marketing"
                },
                {
                    id: 6,
                    text: t('footer.expertise.b2bManagement'),
                    link: "/expertise/business-to-business"
                },
            ]
        },
        {
            id: 3,
            title: t('footer.contact.title'),
            items: [
                {
                    id: 1,
                    text: t('footer.contact.contactUs'),
                    link: "/contact"
                },
                {
                    id: 2,
                    text: t('footer.contact.callUs'),
                    link: "tel:+971503412174"
                },
                {
                    id: 3,
                    text: t('footer.contact.scheduleMeeting'),
                    link: "#"
                },
            ]
        },
    ];
  
    const handleSubscribe = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/emailsubscriptions', { email });
        console.log(response.data); // Check the response
  
        if (response.data.success) {
          toast.success(t('footer.newsletter.successMessage'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setEmail('');
        } else {
          toast.error(t('footer.newsletter.errorMessage'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error(error); // Log errors
        toast.error(t('footer.newsletter.generalError'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    };
return (
    <footer className="mt-20 md:pt-20 bg-footerBgColor dark:bg-gray-900" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="w-full text-gray-700 dark:text-gray-300 grid grid-cols-2 lg:grid-cols-4 gap-8 pb-4 border-b border-b-[#2d2d2d] dark:border-b-gray-800">
                <div className="flex">
                    <Link href="/">
                        <Image alt="Clicksalesmedia Logo" src='/clicksalesmedialogo.png' width={150} height={90} />
                    </Link>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-secondaryColor`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className={`${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                        {t('footer.contactInfo.address')}
                    </span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-secondaryColor`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>
                    <span className={`${isRTL ? 'font-noto-kufi' : ''}`}>
                        {t('footer.contactInfo.phone')}
                    </span>
                </div>
                <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-secondaryColor`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                    <span className={`${isRTL ? 'font-noto-kufi' : ''}`}>
                        {t('footer.contactInfo.email')}
                    </span>
                </div>
            </div>
            <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-8 py-10 text-[#686868] dark:text-gray-300">
                {
                    footerBlocks.map(footerBlock=>(
                        <FooterBlockItem key={footerBlock.id} {...footerBlock}/>
                    ))
                }
                <div className="space-y-5 col-span-2 md:col-span-3 lg:col-span-1">
                    <h1 className={`text-lg font-semibold text-secondaryColor dark:text-gray-100 ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                        {t('footer.newsletter.title')}
                    </h1>
                    <p className={`max-w-xl text-whiteColor ${isRTL ? 'font-noto-kufi text-right' : ''}`}>
                        {t('footer.newsletter.description')}
                    </p>
                    <form className="grid w-full relative max-w-xl" onSubmit={handleSubscribe}>
                        <div className="flex flex-col gap-3 w-full relative">
                            <input
                                type="email"
                                className={`w-full outline-none px-3 py-3 rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ${isRTL ? 'font-noto-kufi text-right' : ''}`}
                                placeholder={t('footer.newsletter.placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className={`w-full py-3 sm:py-0 sm:w-max sm:absolute ${isRTL ? 'sm:left-1' : 'sm:right-1'} sm:inset-y-1 px-4 text-sm flex sm:items-center justify-center outline-none bg-secondaryColor text-white rounded-md ${isRTL ? 'font-noto-kufi' : ''}`}
                            >
                                {t('footer.newsletter.subscribe')}
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer
                    position={isRTL ? "top-left" : "top-right"}
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={isRTL}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
            </nav>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center sm:justify-between py-3 border-t border-[#2d2d2d] dark:border-t-[gray-800] text-secondaryColor dark:text-gray-300">
                <div className={`flex text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'} sm:min-w-max`}>
                    <p className={`text-whiteColor ${isRTL ? 'font-noto-kufi' : ''}`}>
                        {t('footer.copyright')}
                    </p>
                </div>
                <div className={`flex justify-center ${isRTL ? 'sm:justify-start' : 'sm:justify-end'} w-full gap-3`}>
                    <Link href="https://linkedin.com/company/clicksalesmedia" aria-label="linkedin" rel="noreferer">
                        <FaLinkedin />
                    </Link>
                    <Link href="https://instagram.com/clicksalesmedia" aria-label="instagram" rel="noreferer">
                        <FaInstagramSquare />
                    </Link>
                    <Link href="https://twitter.com/clicksalesmedia" aria-label="twitter" rel="noreferer">
                        <FaSquareXTwitter />
                    </Link>
                    <Link href="https://pinterest.com/clicksalesmedia" aria-label="pinterest" rel="noreferer">
                        <FaPinterestSquare />
                    </Link>
                </div>
            </div>
        </div>
    </footer>
)
}
 
export default Footer