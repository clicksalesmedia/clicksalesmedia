'use client'
import FormService from "@/app/ui/modal"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/app/providers/LanguageProvider"
 
const ContentSection = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2 space-y-12 text-whiteColor dark:text-gray-300 md:py-8">
                <h1 className="text-secondaryColor dark:text-white font-semibold text-2xl sm:text-3xl md:text-4xl">
                  {language === 'en' 
                    ? "Social Media Management" 
                    : "إدارة وسائل التواصل الاجتماعي"}
                </h1>
                <p className="text-whiteColor">
                  {language === 'en'
                    ? "Our social media management services aim to empower your brand fully in the diverse and competitive digital landscape. We set up your social media accounts, considering the visual strategies and identity that align with your brand. This service also includes comprehensive content planning, scheduling, and goal setting for your brand."
                    : "تهدف خدمات إدارة وسائل التواصل الاجتماعي لدينا إلى تمكين علامتك التجارية بالكامل في المشهد الرقمي المتنوع والتنافسي. نقوم بإعداد حسابات وسائل التواصل الاجتماعي الخاصة بك، مع مراعاة الاستراتيجيات المرئية والهوية التي تتماشى مع علامتك التجارية. تشمل هذه الخدمة أيضًا تخطيط المحتوى الشامل، والجدولة، ووضع الأهداف لعلامتك التجارية."}
                </p>

                <p className="text-whiteColor">
                  {language === 'en'
                    ? "Our social media management strategy also involves crafting integrated and engaging content strategies that highlight your brand's identity, along with posting schedules and the objectives you seek to achieve. We believe in the power of paid advertising on social media and offer services to design paid advertising strategies on all platforms. We create strategies to maximize reach and engagement to ensure your brand's objectives are met."
                    : "تتضمن استراتيجية إدارة وسائل التواصل الاجتماعي لدينا أيضًا صياغة استراتيجيات محتوى متكاملة وجذابة تبرز هوية علامتك التجارية، إلى جانب جداول النشر والأهداف التي تسعى لتحقيقها. نؤمن بقوة الإعلانات المدفوعة على وسائل التواصل الاجتماعي ونقدم خدمات لتصميم استراتيجيات إعلانية مدفوعة على جميع المنصات. نخلق استراتيجيات لزيادة الوصول والمشاركة لضمان تحقيق أهداف علامتك التجارية."}
                </p>

                <p className="text-whiteColor">
                  {language === 'en'
                    ? "We place great importance on analyzing your competitors in the social media field through a detailed study of their strategies, evaluating their audience engagement tactics, and monitoring the growth of the audiences they target."
                    : "نضع أهمية كبيرة على تحليل منافسيك في مجال وسائل التواصل الاجتماعي من خلال دراسة مفصلة لاستراتيجياتهم، وتقييم تكتيكات مشاركة جمهورهم، ومراقبة نمو الجماهير التي يستهدفونها."}
                </p>

                <div className="flex">
                <FormService buttonText={language === 'en' ? "Unleash Social Potential!" : "أطلق إمكانات التواصل الاجتماعي!"} />
                </div>
            </div>
            <div className="flex md:flex-1">
                <Image src="/social/social.png" alt="creative agency " width={1300} height={900} className="w-full md:h-full object-cover rounded-lg" />
            </div>
        </div>
    </section>
  )
}
export default ContentSection