"use client"
import FormService from '@/app/ui/modal'
import SpiningText from '@/app/ui/spiningText'
import Image from 'next/image'
import Link from 'next/link'

 
export default function NewHero() {
return (
    <>
        <section className="py-8 mt-24 bg-cover bg-center relative"  style={{ backgroundImage: 'url("mesh-clicksalesmedia.png")' }}>
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-stretch gap-10">
            <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto">
                    <Image src="/clicksalesmedia-marketing-agency.png" width={2250} height={1400} alt="sidebiew image" className="lg:w-full lg:h-full object-cover" />
                </div>
                <div className="lg:w-1/2 lg:py-10 xl:py-12 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto ">
                    <h1 className="font-semibold leading-tight text-secondaryColor dark:text-white text-2xl md:text-3xl lg:text-4xl">
                    The First AI Performance Marketing Agency in the Middle East <div className="relative inline-block px-2">
                         <SpiningText /></div>
                    </h1>
                    <p className="mt-4 text-whiteColor dark:text-gray-300">
                    {"Welcome to the first AI Performance Marketing Agency in the Middle East. We harness advanced AI and automation scripts to boost your marketing performance and optimization, delivering unmatched results and ROI. Join us to revolutionize your digital marketing with cutting-edge technology and expertise."}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                    <FormService />
                        <Link href="#" className="flex items-center justify-center gap-x-2 px-5 py-1.5 font-semibold border border-secondaryColor text-secondaryColor dark:border-secondaryColor dark:text-white">
                        Schedule a Call
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-browser-safari" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm.25-14.75v1.5a.25.25 0 0 1-.5 0v-1.5a.25.25 0 0 1 .5 0Zm0 12v1.5a.25.25 0 1 1-.5 0v-1.5a.25.25 0 1 1 .5 0ZM4.5 1.938a.25.25 0 0 1 .342.091l.75 1.3a.25.25 0 0 1-.434.25l-.75-1.3a.25.25 0 0 1 .092-.341Zm6 10.392a.25.25 0 0 1 .341.092l.75 1.299a.25.25 0 1 1-.432.25l-.75-1.3a.25.25 0 0 1 .091-.34ZM2.28 4.408l1.298.75a.25.25 0 0 1-.25.434l-1.299-.75a.25.25 0 0 1 .25-.434Zm10.392 6 1.299.75a.25.25 0 1 1-.25.434l-1.3-.75a.25.25 0 0 1 .25-.434ZM1 8a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 0 .5h-1.5A.25.25 0 0 1 1 8Zm12 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 1 1 0 .5h-1.5A.25.25 0 0 1 13 8ZM2.03 11.159l1.298-.75a.25.25 0 0 1 .25.432l-1.299.75a.25.25 0 0 1-.25-.432Zm10.392-6 1.299-.75a.25.25 0 1 1 .25.433l-1.3.75a.25.25 0 0 1-.25-.434ZM4.5 14.061a.25.25 0 0 1-.092-.341l.75-1.3a.25.25 0 0 1 .434.25l-.75 1.3a.25.25 0 0 1-.342.091Zm6-10.392a.25.25 0 0 1-.091-.342l.75-1.299a.25.25 0 1 1 .432.25l-.75 1.3a.25.25 0 0 1-.341.09ZM6.494 1.415l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM9.86 13.972l.13.483a.25.25 0 1 1-.483.13l-.13-.483a.25.25 0 0 1 .483-.13ZM3.05 3.05a.25.25 0 0 1 .354 0l.353.354a.25.25 0 0 1-.353.353l-.354-.353a.25.25 0 0 1 0-.354Zm9.193 9.193a.25.25 0 0 1 .353 0l.354.353a.25.25 0 1 1-.354.354l-.353-.354a.25.25 0 0 1 0-.353ZM1.545 6.01l.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.482Zm12.557 3.365.483.13a.25.25 0 1 1-.13.483l-.483-.13a.25.25 0 1 1 .13-.483Zm-12.863.436a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177Zm12.557-3.365a.25.25 0 0 1 .176-.306l.483-.13a.25.25 0 1 1 .13.483l-.483.13a.25.25 0 0 1-.306-.177ZM3.045 12.944a.299.299 0 0 1-.029-.376l3.898-5.592a.25.25 0 0 1 .062-.062l5.602-3.884a.278.278 0 0 1 .392.392L9.086 9.024a.25.25 0 0 1-.062.062l-5.592 3.898a.299.299 0 0 1-.382-.034l-.005-.006Zm3.143 1.817a.25.25 0 0 1-.176-.306l.129-.483a.25.25 0 0 1 .483.13l-.13.483a.25.25 0 0 1-.306.176ZM9.553 2.204a.25.25 0 0 1-.177-.306l.13-.483a.25.25 0 1 1 .483.13l-.13.483a.25.25 0 0 1-.306.176Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}