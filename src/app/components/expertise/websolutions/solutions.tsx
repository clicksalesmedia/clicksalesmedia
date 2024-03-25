import Image from "next/image"
import Link from "next/link"
 
interface LogoItemProps {
    logo: string;
    name: string; 
  }

const LogoItem: React.FC<LogoItemProps> = ({ logo, name }) => {return (
    
    <Link href="#" target="_blank" className="bg-gray-100/80 dark:bg-gray-900/80 p-4 rounded-lg border-gray-100 dark:border-gray-900" rel="noreferer">
        <Image src={logo} width={300} alt={name} className="w-auto h-9 dark:grayscale" />
    </Link>
)
}
 
const logos = [
{
    id: 1,
    logo: "/logos/spotify.png",
    name: "Spotify"
},
{
    id: 2,
    logo: "/logos/paypallogo.png",
    name: "Paypal Logo"
},
{
    id: 3,
    logo: "/logos/spotify.png",
    name: "Spotify"
},
{
    id: 4,
    logo: "/logos/spotify.png",
    name: "Spotify"
},
{
    id: 5,
    logo: "/logos/spotify.png",
    name: "Spotify"
},
]
 
const Solutions = () => {
return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10 ">
            <div className="flex flex-col md:flex-row gap-10 gap-y-16">
                <div className="flex flex-wrap gap-4 w-full">
                    {
                        logos.map(
                            logo=>(
                                <LogoItem key={logo.id} {...logo}/>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    </section>
)
}
export default Solutions