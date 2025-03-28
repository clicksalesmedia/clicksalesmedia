'use client'
import FormService from "@/app/ui/modal"

const Cta = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
                <div className="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-primaryColor border border-secondaryColor dark:from-gray-900">
                    <div className="mx-auto text-center max-w-xl md:max-w-2xl relative space-y-8">
                        <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold text-whiteColor dark:text-white">
                        Amplify Your Impact <span className="text-transparent bg-clip-text bg-gradient-to-br from-secondaryColor from-20% via-[#AD8253] via-30% to-[#8C5C28]">Across Every</span> Marketing Milestone
                        </h1>
                        <p className="text-whiteColor dark:text-gray-300">
                        Ready to transform your business? Fill out the form below to learn how our tailored marketing strategies can significantly increase your ROI. Start your journey to better performance now!
                        </p>
                        <div className="mx-auto max-w-md sm:max-w-xl flex justify-center">
                        <FormService />
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    }
     
    export default Cta