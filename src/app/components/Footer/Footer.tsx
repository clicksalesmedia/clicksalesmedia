import Image from "next/image"
import Link from "next/link"
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
return (
    <li>
        <Link href={link} className="duration-200 text-whiteColor hover:text-secondaryColor dark:hover:text-blue-500">
            {text}
        </Link>
    </li>
)
}
 
const FooterBlockItem = ({ title, items }: FooterBlockItemProps) => {
return (
    <div className="space-y-5">
        <h1 className="text-xl font-semibold text-secondaryColor dark:text-gray-100">
            {title}
        </h1>
        <ul className="space-y-3 text-sm">
            {
                items.map(item=>(
                    <FooterItem key={item.id} {...item}/>
                ))
            }
        </ul>
    </div>
)
}
 
const footerBlocks = [
{
    id: 1,
    title: "Clicksalemedia",
    items: [
        {
            id: 1,
            text: "About",
            link: "/about"
        },
        {
            id: 2,
            text: "Case studies",
            link: "/case-studies"
        },
        {
            id: 3,
            text: "Blog",
            link: "/blog"
        },
    ]
},
{
    id: 2,
    title: "Expertise",
    items: [
        {
            id: 1,
            text: "Branding",
            link: "/expertise/branding"
        },
        {
            id: 2,
            text: "Social Media",
            link: "/expertise/social-media"
        },
        {
            id: 3,
            text: "Web Solutions",
            link: "/expertise/web-solutions"
        },
        {
            id: 4,
            text: "SEO Solutions",
            link: "/expertise/seo-solutions"
        },
        {
            id: 5,
            text: "Google Marketing",
            link: "/expertise/google-marketing"
        },
        {
            id: 6,
            text: "B2B Management",
            link: "/expertise/business-to-business"
        },
    ]
},
{
    id: 3,
    title: "Contact",
    items: [
        {
            id: 1,
            text: "Contact us",
            link: "/contact"
        },
        {
            id: 2,
            text: "Call us",
            link: "tel:+971503412174"
        },
        {
            id: 3,
            text: "Schedule a meeting",
            link: "#"
        },
    ]
},
]
 
 
const Footer = () => {
return (
    <footer className="mt-20 md:pt-20 bg-footerBgColor dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
            <div className="w-full text-gray-700 dark:text-gray-300 grid grid-cols-2 lg:grid-cols-4 gap-8 pb-4 border-b border-b-[#2d2d2d] dark:border-b-gray-800">
                <div className="flex">
                    <Link href="/">
                        <Image alt="" src='/clicksalesmedialogo.png' width={150} height={90} />
                    </Link>
                </div>
                <div className="flex items-center space-x-2 text-secondaryColor">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Meydan Hotel - Nad Al Sheba - Nad Al Sheba 1 - Dubai, UAE</span>
                </div>
                <div className="flex items-center space-x-2 text-secondaryColor">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                    </svg>
                    <span>+971 503 412 174</span>
                </div>
                <div className="flex items-center space-x-2 text-secondaryColor">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                    </svg>
                    <span>info@clicksalesmedia.com</span>
                </div>
            </div>
            <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-8 py-10 text-[#686868] dark:text-gray-300">
                {
                    footerBlocks.map(footerBlock=>(
                        <FooterBlockItem key={footerBlock.id} {...footerBlock}/>
                    ))
                }
                <div className="space-y-5 col-span-2 md:col-span-3 lg:col-span-1">
                    <h1 className="text-lg font-semibold text-secondaryColor dark:text-gray-100">
                        Subscribe to our newsletter
                    </h1>
                    <p className="max-w-xl text-whiteColor">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores debitis ex temporibus
                    </p>
                    <form className="grid w-full relative max-w-xl">
                        <div className="flex flex-col gap-3 w-full relative">
                            <input type="email" className="w-full outline-none px-3 py-3 rounded-md bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" placeholder="Your Address Email" />
                            <button className="w-full py-3 sm:py-0 sm:w-max sm:absolute sm:right-1 sm:inset-y-1 px-4 text-sm flex sm:items-center justify-center outline-none bg-secondaryColor text-white rounded-md">Subscribe</button>
                        </div>
                    </form>
                </div>
            </nav>
            <div className="w-full flex flex-col md:flex-row gap-4 items-center sm:justify-between py-3 border-t border-[#2d2d2d] dark:border-t-[gray-800] text-secondaryColor dark:text-gray-300">
                <div className="flex text-center sm:text-left sm:min-w-max">
                    <p className="text-whiteColor"> © 2024 Clicksalesmedia. All right reserved </p>
                </div>
                <div className="flex justify-center sm:justify-end w-full gap-3">
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