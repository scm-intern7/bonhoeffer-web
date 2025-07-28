"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BgLayout from '@/components/templates/bgLayout'

function CookiesPage() {
  const [expandedSection, setExpandedSection] = useState('what-are-cookies');

  // Cookie Policy data
  const cookieData = {
    title: "Cookie Policy",
    lastUpdated: "Last updated: July 28, 2025",
    heroSubtitle: "Learn how we use cookies to improve your browsing experience on our website.",
    tableOfContents: "Table of Contents",
    bottomCta: {
      title: "Questions About Our Cookie Policy?",
      subtitle: "If you have any questions about how we use cookies or want to manage your preferences, we're here to help.",
      button: "Contact Us"
    },
    sections: [
      {
        id: "what-are-cookies",
        title: "What Are Cookies?",
        content: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners. Cookies contain information that is transferred to your computer's hard drive and help us improve your experience on our website."
      },
      {
        id: "how-we-use-cookies",
        title: "How We Use Cookies",
        content: "We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as essential cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes."
      },
      {
        id: "types-of-cookies",
        title: "Types of Cookies We Use",
        content: "Essential Cookies: These are necessary for the website to function properly and cannot be switched off. They are usually only set in response to actions made by you. Performance Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously. Functionality Cookies: These enable the website to provide enhanced functionality and personalization. Marketing Cookies: These may be set through our site by our advertising partners to build a profile of your interests."
      },
      {
        id: "essential-cookies",
        title: "Essential Cookies",
        content: "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our site functions. You can block or delete them by changing your browser settings."
      },
      {
        id: "analytics-cookies",
        title: "Analytics and Performance Cookies",
        content: "These cookies collect information about how you use our website, such as which pages you visit most often and if you get error messages from web pages. All information these cookies collect is aggregated and therefore anonymous. We use this information to improve how our website works and to understand user behavior patterns."
      },
      {
        id: "functionality-cookies",
        title: "Functionality Cookies",
        content: "These cookies allow our website to remember choices you make (such as your language preference, region you are in, or text size) and provide enhanced, more personal features. They may also be used to provide services you have asked for such as watching a video or commenting on a blog. The information these cookies collect may be anonymized and they cannot track your browsing activity on other websites."
      },
      {
        id: "marketing-cookies",
        title: "Marketing and Targeting Cookies",
        content: "These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of advertising campaigns. They remember that you have visited a website and this information is shared with other organizations such as advertisers."
      },
      {
        id: "third-party-cookies",
        title: "Third-Party Cookies",
        content: "We may use third-party services such as Google Analytics, social media plugins, and advertising networks that may place cookies on your device. These third parties have their own privacy policies and cookie policies. We recommend that you check the respective privacy and cookie policies of these third parties to understand how they use cookies."
      },
      {
        id: "managing-cookies",
        title: "Managing Your Cookie Preferences",
        content: "You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer."
      },
      {
        id: "browser-settings",
        title: "Browser Settings",
        content: "You can manage cookies through your browser settings. Each browser is different, so check the Help menu of your browser to learn how to change your cookie preferences."
      },
      {
        id: "cookie-consent",
        title: "Cookie Consent",
        content: "When you first visit our website, you will see a cookie banner that asks for your consent to use cookies. You can choose to accept all cookies, reject non-essential cookies, or customize your preferences. You can change your cookie preferences at any time by clicking on the cookie settings link in our website footer."
      },
      {
        id: "updates-to-policy",
        title: "Updates to This Policy",
        content: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. When we make changes, we will update the 'Last Updated' date at the top of this policy. We encourage you to review this policy periodically to stay informed about how we use cookies."
      },
      {
        id: "contact",
        title: "Contact Information",
        content: ""
      }
    ]
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setExpandedSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden mt-5">
        <div className=" inset-0">
          <img
            src="https://bonhoeffermachines.in/public/images/contact-banner-india.webp"
            alt="Cookie Policy Banner"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-10 h-10 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Hero Text */}
      <section className='mt-5'>
        <motion.div 
          className="relative z-10 text-center text-white px-2 sm:px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {cookieData.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {cookieData.heroSubtitle}
          </p>
          <p className="mt-4 text-[#989b2e] text-lg font-medium">
            {cookieData.lastUpdated}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className=" rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">{cookieData.tableOfContents}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cookieData.sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left p-4 rounded-lg transition-all duration-300 ${
                    expandedSection === section.id 
                      ? 'bg-[#989b2e] text-white shadow-md' 
                      : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium">
                    {index + 1}. {section.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Cookie Policy Content */}
          <div className="space-y-8">
            {cookieData.sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                  expandedSection === section.id ? 'ring-2 ring-[#989b2e]' : ''
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#989b2e] text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100">{section.title}</h3>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed">
                    {section.content.split('. ').map((sentence, sentenceIndex) => (
                      <p key={sentenceIndex} className="mb-4">
                        {sentence}{sentenceIndex < section.content.split('. ').length - 1 ? '.' : ''}
                      </p>
                    ))}
                  </div>

                  {/* Special styling for contact section */}
                  {section.id === 'contact' && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border-l-4 border-[#989b2e]">
                      <h4 className="font-bold text-gray-100 mb-4">Contact Details:</h4>
                      <div className="space-y-2 text-gray-300">
                        <p><strong>Email:</strong> support@bonhoeffermachines.com</p>
                        <p><strong>Phone:</strong> +91 96675 15523</p>
                        <p><strong>Address:</strong> Plot No. 756, 2nd Floor, Udyog Vihar Phase -5, Gurugram, Haryana, India</p>
                      </div>
                    </div>
                  )}

                  {/* Special styling for browser settings section */}
                  {section.id === 'browser-settings' && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border-l-4 border-[#989b2e]">
                      <h4 className="font-bold text-gray-100 mb-4">Quick Browser Settings Guide:</h4>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#989b2e] rounded-full flex items-center justify-center text-xs font-bold">C</div>
                          <p><strong>Chrome:</strong> Settings → Advanced → Privacy and Security → Site Settings → Cookies</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#989b2e] rounded-full flex items-center justify-center text-xs font-bold">F</div>
                          <p><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#989b2e] rounded-full flex items-center justify-center text-xs font-bold">S</div>
                          <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#989b2e] rounded-full flex items-center justify-center text-xs font-bold">E</div>
                          <p><strong>Edge:</strong> Settings → Site Permissions → Cookies and Site Data</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-[#989b2e] to-[#7a7c24] text-white rounded-2xl p-12 text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">{cookieData.bottomCta.title}</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {cookieData.bottomCta.subtitle}
            </p>
            <motion.a
              href="/contact-us"
              className="inline-flex items-center bg-white text-[#989b2e] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {cookieData.bottomCta.button}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default CookiesPage