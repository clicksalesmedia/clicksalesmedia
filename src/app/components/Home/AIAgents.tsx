'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaRobot, FaChartLine, FaBrain, FaCogs, FaArrowRight, FaPaperPlane, FaSpinner, FaComments } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useLanguage } from '@/app/providers/LanguageProvider';
import Link from 'next/link';
import ChatBookingForm, { BookingFormData } from '../../components/ChatBookingForm';

const AIAgents = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {role: 'assistant', content: isRTL ? 
      'مرحباً، أنا كريم، ممثل شركة ClickSalesMedia. كيف يمكنني مساعدتكم اليوم؟' : 
      'Hello, I am Karim, AI Assistant from ClickSalesMedia. How can I help you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  
  const controls = useAnimation();
  
  // Add state to track if the chat icon has been shown
  const [showChatIcon, setShowChatIcon] = useState(true);
  
  // Add state to control tooltip position
  const [tooltipPosition, setTooltipPosition] = useState('top');
  const chatIconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top } = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - left,
          y: event.clientY - top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide chat icon when chat is open
  useEffect(() => {
    setShowChatIcon(!isChatOpen);
  }, [isChatOpen]);

  // Add effect to detect screen position and adjust tooltip
  useEffect(() => {
    const handleResize = () => {
      if (chatIconRef.current) {
        const rect = chatIconRef.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        // If less than 200px from right edge, show tooltip on the left
        if (windowWidth - rect.right < 200) {
          setTooltipPosition('left');
        } else {
          setTooltipPosition('top');
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to detect if text contains Arabic characters
  const containsArabic = (text: string) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  // Function to check if message mentions pricing
  const mentionsPricing = (message: string) => {
    const pricingKeywords = [
      'price', 'cost', 'pricing', 'fee', 'how much', 
      'سعر', 'تكلفة', 'أسعار', 'كم يكلف', 'كم سعر', 'كم هو سعر'
    ];
    return pricingKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    
    // Add user message to chat
    setMessages(prev => [...prev, {role: 'user', content: userMessage}]);
    
    try {
      // Determine language for the conversation
      const useArabic = isRTL || containsArabic(userMessage);
      
      // Check for pricing mentions to handle specially
      if (mentionsPricing(userMessage)) {
        // Pricing-specific response with booking form
        const pricingResponse = useArabic ? 
          'للحصول على تفاصيل الأسعار، نحتاج إلى فهم احتياجاتك المحددة. يمكنك ملء النموذج أدناه لحجز استشارة مجانية، وسيقوم خبراؤنا بتقديم عرض سعر مخصص لمتطلباتك.' : 
          'For pricing details, we need to understand your specific requirements. You can fill out the form below to book a free consultation, and our experts will provide a customized quote tailored to your needs.';
        
        setTimeout(() => {
          setMessages(prev => [...prev, {role: 'assistant', content: pricingResponse}]);
          setShowBookingForm(true);
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      // Prepare chat history for API call
      const chatHistory = messages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));
      
      // Add user's latest message
      chatHistory.push({
        role: "user" as const,
        content: userMessage
      });
      
      // Make API request to our Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: chatHistory,
          useArabic: useArabic
        }),
      });
      
      // Check if response is successful
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      
      // Add the AI's response to the chat
      setMessages(prev => [
        ...prev, 
        {role: 'assistant', content: data.message}
      ]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = isRTL ? 
        'عذرًا، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.' : 
        'Sorry, an error occurred. Please try again.';
      
      setMessages(prev => [...prev, {
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Services data with links
  const services = [
    {
      title: isRTL ? 'إنشاء المواقع الإلكترونية' : 'Website Creation',
      link: '/services/web-development'
    },
    {
      title: isRTL ? 'إدارة الإعلانات بالذكاء الاصطناعي' : 'Ads Management with AI',
      link: '/services/ai-ads'
    },
    {
      title: isRTL ? 'إدارة وسائل التواصل الاجتماعي' : 'Social Media Management',
      link: '/services/social-media'
    },
    {
      title: isRTL ? 'إدارة إعلانات جوجل' : 'Google Ads Management',
      link: '/services/google-ads'
    },
    {
      title: isRTL ? 'بناء العلامة التجارية' : 'Branding',
      link: '/services/branding'
    },
    {
      title: isRTL ? 'تخطيط الأعمال والاستراتيجيات' : 'Business Planning & Strategies',
      link: '/services/planning'
    },
    {
      title: isRTL ? 'حلول الذكاء الاصطناعي' : 'AI Solutions',
      link: '/services/ai-solutions'
    },
    {
      title: isRTL ? 'التسويق عبر البريد الإلكتروني' : 'Email Marketing',
      link: '/services/email-marketing'
    }
  ];

  // Function to safely process Arabic text to prevent rendering issues
  const sanitizeArabicText = (content: string) => {
    // Replace problematic patterns that could break rendering
    return content
      .replace(/ع":\w+":/, 'علامة') // Fix broken Arabic text for brand/marks
      .replace(/إد":": إعلانات/, 'إدارة إعلانات') // Fix broken Arabic for ad management
      .replace(/نست"> دم/, 'نستخدم') // Fix broken Arabic for "we use"
      .replace(/المخ لفة/, 'المختلفة') // Fix broken Arabic for "different"
      .replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
  };

  // Function to render message content with enhanced service links
  const renderMessageContent = (content: string) => {
    // Clean up any problematic Arabic text
    let renderedContent = sanitizeArabicText(content);
    
    // First, replace contact page mentions with links
    const contactRegex = isRTL ? 
      /صفحة الاتصال|صفحة التواصل/gi : 
      /contact page|contact form/gi;
      
    renderedContent = renderedContent.replace(
      contactRegex, 
      `<a href="/contact" class="inline-block px-3 py-1.5 my-1.5 rounded-md bg-primaryColor text-white font-medium border-2 border-primaryColor hover:bg-opacity-90 transition-colors">${isRTL ? 'صفحة الاتصال' : 'contact page'}</a>`
    );
    
    // Then replace service mentions with styled label links
    services.forEach((service, index) => {
      const regex = new RegExp(`\\b${service.title}\\b`, 'gi');
      const serviceStyles = getServiceStyles(index);
      
      // Replace with labeled styled link
      renderedContent = renderedContent.replace(
        regex, 
        `<a href="${service.link}" class="${serviceStyles}">${service.title}</a>`
      );
    });
    
    return <div className="message-content space-y-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderedContent }} />;
  };

  // Get predefined styles for each service to ensure Tailwind compatibility
  const getServiceStyles = (index: number) => {
    // Predefined styles for service labels - adjusted for dark mode/dark background
    const styleClasses = [
      "inline-block px-2 py-0.5 my-1 rounded bg-blue-700 bg-opacity-30 text-blue-200 border border-blue-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-green-700 bg-opacity-30 text-green-200 border border-green-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-purple-700 bg-opacity-30 text-purple-200 border border-purple-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-yellow-600 bg-opacity-30 text-yellow-200 border border-yellow-500 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-indigo-700 bg-opacity-30 text-indigo-200 border border-indigo-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-red-700 bg-opacity-30 text-red-200 border border-red-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-pink-700 bg-opacity-30 text-pink-200 border border-pink-600 hover:bg-opacity-40 transition-colors",
      "inline-block px-2 py-0.5 my-1 rounded bg-teal-700 bg-opacity-30 text-teal-200 border border-teal-600 hover:bg-opacity-40 transition-colors"
    ];
    
    return styleClasses[index % styleClasses.length];
  };

  const agents = [
    {
      icon: <FaRobot className="w-10 h-10" />,
      title: t('home.aiAgents.intelligentMarketing.title'),
      description: t('home.aiAgents.intelligentMarketing.description'),
      color: "#C3A177",
      bgGradient: "linear-gradient(135deg, rgba(195, 161, 119, 0.1) 0%, rgba(195, 161, 119, 0.3) 100%)"
    },
    {
      icon: <FaChartLine className="w-10 h-10" />,
      title: t('home.aiAgents.predictiveAnalytics.title'),
      description: t('home.aiAgents.predictiveAnalytics.description'),
      color: "#4D96FF",
      bgGradient: "linear-gradient(135deg, rgba(77, 150, 255, 0.1) 0%, rgba(77, 150, 255, 0.3) 100%)"
    },
    {
      icon: <FaBrain className="w-10 h-10" />,
      title: t('home.aiAgents.personalization.title'),
      description: t('home.aiAgents.personalization.description'),
      color: "#FF6B6B",
      bgGradient: "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0.3) 100%)"
    },
    {
      icon: <FaCogs className="w-10 h-10" />,
      title: t('home.aiAgents.automation.title'),
      description: t('home.aiAgents.automation.description'),
      color: "#1EE3CF",
      bgGradient: "linear-gradient(135deg, rgba(30, 227, 207, 0.1) 0%, rgba(30, 227, 207, 0.3) 100%)"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: [0.5, 0.8, 0.5], 
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, duration: 4 }
    }
  };

  // Chat bubble animation variant
  const chatBubbleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    }
  };

  // Handle booking form submission
  const handleBookingSubmit = async (formData: BookingFormData) => {
    setIsSubmittingForm(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add confirmation message to chat
      const confirmationMessage = isRTL ? 
        `شكراً ${formData.name}، تم استلام طلبك بنجاح. سنتواصل معك قريباً على ${formData.email} لمناقشة التفاصيل حول خدمة ${formData.service}.` :
        `Thank you ${formData.name}, your booking has been successfully submitted. We'll contact you soon at ${formData.email} to discuss details about ${formData.service}.`;
      
      setMessages(prev => [
        ...prev,
        {role: 'assistant', content: confirmationMessage}
      ]);
      
      // Hide the form after successful submission
      setShowBookingForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = isRTL ? 
        'عذراً، حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.' :
        'Sorry, there was an error submitting the form. Please try again.';
        
      setMessages(prev => [
        ...prev,
        {role: 'assistant', content: errorMessage}
      ]);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background with animated mesh gradient */}
      <div className="absolute inset-0 bg-[#272727] z-0">
        <div className="absolute inset-0 opacity-20 bg-[#151515]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div 
          className="absolute rounded-full w-96 h-96 filter blur-[80px]"
          style={{ 
            background: "radial-gradient(circle, rgba(195,161,119,0.4) 0%, rgba(0,0,0,0) 70%)",
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
          animate={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            variants={glowVariants}
            style={{ background: "radial-gradient(circle, rgba(195,161,119,0.15) 0%, rgba(0,0,0,0) 70%)" }}
          />
          
          <motion.h2 
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primaryColor via-[#e0c9a1] to-secondaryColor bg-clip-text text-transparent relative inline-block"
          >
            {t('home.aiAgents.title')}
            <motion.span 
              className="absolute -right-8 -top-8 text-primaryColor opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaCogs size={40} />
            </motion.span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            {t('home.aiAgents.description')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedAgent(selectedAgent === index ? null : index)}
              style={{ 
                background: agent.bgGradient,
                boxShadow: selectedAgent === index ? `0 10px 30px -10px ${agent.color}40` : 'none'
              }}
            >
              <div className="relative z-10 flex items-start gap-6">
                <motion.div 
                  className="flex-shrink-0 p-4 rounded-lg"
                  style={{ color: agent.color, background: `${agent.color}20` }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  {agent.icon}
                </motion.div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    {agent.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{agent.description}</p>
                  
                  <AnimatePresence>
                    {selectedAgent === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700 mt-3">
                          {['Real-time', 'Automated', 'Scalable', 'Data-driven'].map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 text-xs rounded-full" 
                              style={{ background: `${agent.color}20`, color: agent.color }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button 
            onClick={() => setIsChatOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            {isRTL ? 'تحدث مع كريم، المساعد الذكي' : 'Talk to Our AI Assistant Karim'}
          </button>
        </motion.div>
      </div>

      {/* AI Chatbot UI */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 w-96 max-w-full z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
              {/* Chat header */}
              <div className="p-4 bg-gradient-to-r from-primaryColor to-secondaryColor flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white" />
                  </div>
                  <h3 className="text-white font-medium">
                    {isRTL ? 'كريم - المساعد الذكي' : 'Karim - AI Assistant'}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              {/* Chat messages */}
              <div className={`flex-grow overflow-y-auto p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    variants={chatBubbleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-secondaryColor text-white'
                          : 'bg-gray-800 text-gray-200'
                      }`}
                    >
                      <div className={`text-sm ${isRTL ? 'text-right' : 'text-left'} space-y-2`}>
                        {renderMessageContent(message.content)}
                      </div>
                      
                      {/* Special contact page button for pricing inquiries */}
                      {message.role === 'assistant' && 
                       ((message.content.toLowerCase().includes('price') || 
                        message.content.toLowerCase().includes('pricing') ||
                        message.content.includes('سعر') || 
                        message.content.includes('تكلفة') ||
                        message.content.includes('أسعار')) || 
                        message.role === 'assistant' && index === messages.length - 1 && 
                        messages.some(msg => mentionsPricing(msg.content))) && 
                       !showBookingForm && (
                        <Link href="/contact">
                          <div className="mt-3 bg-primaryColor hover:bg-primaryColor/90 border-2 border-primaryColor transition-colors rounded-md p-3 text-center text-sm font-medium text-white">
                            {isRTL ? 'انتقل إلى صفحة الاتصال للحصول على الأسعار' : 'Go to Contact Page for Pricing'}
                          </div>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Booking form */}
                {showBookingForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-4 max-w-full w-full"
                  >
                    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-2 bg-gray-800 text-white text-sm font-medium">
                        {isRTL ? 'حجز استشارة للحصول على أسعار مخصصة' : 'Book a Consultation for Custom Pricing'}
                      </div>
                      <div className="p-3">
                        <ChatBookingForm 
                          onSubmit={handleBookingSubmit}
                          isSubmitting={isSubmittingForm}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-800 text-gray-200 rounded-lg p-3">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <div className="p-3 border-t border-gray-800">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isRTL ? "اكتب رسالتك هنا..." : "Type your message here..."}
                    className={`flex-grow bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-secondaryColor ${isRTL ? 'text-right' : 'text-left'}`}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-secondaryColor text-white p-2.5 rounded-lg hover:bg-primaryColor disabled:opacity-50"
                  >
                    {isLoading ? (
                      <FaSpinner className="animate-spin w-5 h-5" />
                    ) : (
                      <FaPaperPlane className="w-5 h-5" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Static Bot Icon */}
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            ref={chatIconRef}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primaryColor to-secondaryColor shadow-lg flex items-center justify-center cursor-pointer z-50"
          >
            <div className="relative">
              <FaComments className="text-white w-7 h-7" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            
            {/* Arabic tooltip */}
            {isRTL && (
              <motion.div
                className={`absolute ${
                  tooltipPosition === 'top' 
                    ? '-top-10 right-1/2 translate-x-1/2' 
                    : 'top-1/2 right-full -translate-y-1/2 mr-3'
                } bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md whitespace-nowrap z-10`}
                initial={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : 0, x: tooltipPosition === 'top' ? 0 : 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                تحدث مع مساعدنا الذكي كريم
                <div 
                  className={`absolute ${
                    tooltipPosition === 'top'
                      ? '-bottom-2 right-1/2 translate-x-1/2'
                      : 'top-1/2 -right-1.5 -translate-y-1/2'
                  } w-3 h-3 bg-white transform rotate-45`}
                ></div>
              </motion.div>
            )}
            
            {/* English tooltip */}
            {!isRTL && (
              <motion.div
                className={`absolute ${
                  tooltipPosition === 'top' 
                    ? '-top-10 left-1/2 -translate-x-1/2' 
                    : 'top-1/2 right-full -translate-y-1/2 mr-3'
                } bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md whitespace-nowrap z-10`}
                initial={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : 0, x: tooltipPosition === 'top' ? 0 : 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Ask Karim, our AI Expert!
                <div 
                  className={`absolute ${
                    tooltipPosition === 'top'
                      ? '-bottom-2 left-1/2 -translate-x-1/2'
                      : 'top-1/2 -right-1.5 -translate-y-1/2'
                  } w-3 h-3 bg-white transform rotate-45`}
                ></div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AIAgents; 