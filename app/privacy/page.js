"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BgLayout from '@/components/templates/bgLayout'
import { useTranslation } from '../../translation/useTranslation'

function PrivacyPage() {
  const [expandedSection, setExpandedSection] = useState('introduction');
  const { t } = useTranslation();

  // Fallback data for when translations aren't loaded
  const fallbackData = {
    title: "Privacy Policy",
    lastUpdated: "Last updated: July 28, 2025",
    heroSubtitle: "Your privacy matters to us. Learn how we protect and use your information.",
    tableOfContents: "Table of Contents",
    bottomCta: {
      title: "Questions About Our Privacy Policy?",
      subtitle: "We're committed to transparency and protecting your privacy. If you have any questions or concerns, we're here to help.",
      button: "Contact Us"
    },
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "At Bonhoeffer Machines, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us."
      },
      {
        id: "information-collection",
        title: "Information We Collect",
        content: "We collect information you provide directly to us, such as when you register for warranty, contact us, apply for careers, or subscribe to updates. We also automatically collect certain information when you visit our website, including your IP address, browser type, and usage data."
      },
      {
        id: "information-use",
        title: "How We Use Your Information",
        content: "We use your information to provide and maintain our services, process warranty registrations, respond to inquiries, send updates about products and services, improve our website, comply with legal obligations, and protect our rights and prevent fraud."
      },
      {
        id: "information-sharing",
        title: "Information Sharing",
        content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with authorized dealers, service providers, when required by law, in business transfers, or with your explicit consent."
      },
      {
        id: "data-security",
        title: "Data Security",
        content: "We implement appropriate technical and organizational security measures including encryption, regular security assessments, access controls, and secure data storage. However, no method of transmission over the internet is 100% secure."
      },
      {
        id: "cookies",
        title: "Cookies & Tracking",
        content: "Our website uses cookies to enhance your browsing experience, analyze website performance, and personalize content. You can control cookie settings through your browser preferences."
      },
      {
        id: "your-rights",
        title: "Your Privacy Rights",
        content: "Depending on your location, you may have rights to access, rectify, erase, port, object to, or restrict processing of your personal data. Contact us to exercise these rights."
      },
      {
        id: "contact",
        title: "Contact Information",
        content: ""
      }
    ]
  };

  // Get translated data or use fallback
  const translatedPrivacy = t('privacy');
  
  // Convert translated sections object to array format for compatibility
  const getPrivacyData = () => {
    if (translatedPrivacy && translatedPrivacy.sections) {
      const sectionsArray = Object.entries(translatedPrivacy.sections).map(([key, section]) => ({
        id: key,
        title: section.title,
        content: section.content
      }));
      
      return {
        title: translatedPrivacy.title || fallbackData.title,
        lastUpdated: translatedPrivacy.lastUpdated || fallbackData.lastUpdated,
        heroSubtitle: translatedPrivacy.heroSubtitle || fallbackData.heroSubtitle,
        tableOfContents: translatedPrivacy.tableOfContents || fallbackData.tableOfContents,
        bottomCta: translatedPrivacy.bottomCta || fallbackData.bottomCta,
        sections: sectionsArray
      };
    }
    
    return fallbackData;
  };

  const privacyData = getPrivacyData();
  
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
            alt="Privacy Policy Banner"
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
            {privacyData.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how we protect and use your information.
          </p>
          <p className="mt-4 text-[#989b2e] text-lg font-medium">
            {privacyData.lastUpdated}
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
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privacyData.sections.map((section, index) => (
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

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            {privacyData.sections.map((section, index) => (
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
            <h3 className="text-3xl font-bold mb-4">Questions About Our Privacy Policy?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              We're committed to transparency and protecting your privacy. If you have any questions or concerns, we're here to help.
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
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default PrivacyPage