"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import BgLayout from '@/components/templates/bgLayout'

function TermsPage() {
  const [expandedSection, setExpandedSection] = useState('acceptance');

  // Terms and Conditions data
  const termsData = {
    title: "Terms and Conditions",
    lastUpdated: "Last updated: July 28, 2025",
    heroSubtitle: "Please read these terms carefully before using our website and services.",
    tableOfContents: "Table of Contents",
    bottomCta: {
      title: "Questions About Our Terms?",
      subtitle: "If you have any questions about these Terms and Conditions, please don't hesitate to contact us.",
      button: "Contact Us"
    },
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These Terms and Conditions constitute a legally binding agreement between you and Bonhoeffer Machines regarding your use of the website and services."
      },
      {
        id: "use-license",
        title: "Use License",
        content: "Permission is granted to temporarily download one copy of the materials on Bonhoeffer Machines' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on the website, or remove any copyright or other proprietary notations from the materials."
      },
      {
        id: "disclaimer",
        title: "Disclaimer",
        content: "The materials on Bonhoeffer Machines' website are provided on an 'as is' basis. Bonhoeffer Machines makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
      },
      {
        id: "limitations",
        title: "Limitations",
        content: "In no event shall Bonhoeffer Machines or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bonhoeffer Machines' website, even if Bonhoeffer Machines or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you."
      },
      {
        id: "accuracy",
        title: "Accuracy of Materials",
        content: "The materials appearing on Bonhoeffer Machines' website could include technical, typographical, or photographic errors. Bonhoeffer Machines does not warrant that any of the materials on its website are accurate, complete, or current. Bonhoeffer Machines may make changes to the materials contained on its website at any time without notice. However, Bonhoeffer Machines does not make any commitment to update the materials."
      },
      {
        id: "links",
        title: "Links",
        content: "Bonhoeffer Machines has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Bonhoeffer Machines of the site. Use of any such linked website is at the user's own risk. We reserve the right to request removal of any link to our website."
      },
      {
        id: "modifications",
        title: "Modifications",
        content: "Bonhoeffer Machines may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service. We will notify users of any material changes to these terms through our website or other appropriate communication channels."
      },
      {
        id: "governing-law",
        title: "Governing Law",
        content: "These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Gurugram, Haryana. Any disputes arising under these terms shall be resolved through the appropriate legal channels in accordance with Indian law."
      },
      {
        id: "product-warranty",
        title: "Product Warranty",
        content: "All Bonhoeffer Machines products come with manufacturer warranties as specified in the product documentation. Warranty terms vary by product and are subject to the conditions outlined in the warranty registration process. Customers must register their products within the specified timeframe to activate warranty coverage."
      },
      {
        id: "user-conduct",
        title: "User Conduct",
        content: "Users agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, services, or general business of Bonhoeffer Machines. You also agree not to use the website to transmit or distribute viruses or any other harmful computer code."
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: "The website and its original content, features, and functionality are owned by Bonhoeffer Machines and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent."
      },
      {
        id: "contact",
        title: "Contact Information",
        content: "If you have questions about these Terms and Conditions, please contact us at legal@bonhoeffermachines.com, call +91 96675 15523, or write to us at Plot No. 756, 2nd Floor, Udyog Vihar Phase -5, Gurugram, Haryana, India."
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
            alt="Terms and Conditions Banner"
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
            {termsData.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {termsData.heroSubtitle}
          </p>
          <p className="mt-4 text-[#989b2e] text-lg font-medium">
            {termsData.lastUpdated}
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
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">{termsData.tableOfContents}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {termsData.sections.map((section, index) => (
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

          {/* Terms and Conditions Content */}
          <div className="space-y-8">
            {termsData.sections.map((section, index) => (
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
                        <p><strong>Email:</strong> legal@bonhoeffermachines.com</p>
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
            <h3 className="text-3xl font-bold mb-4">{termsData.bottomCta.title}</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {termsData.bottomCta.subtitle}
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
              {termsData.bottomCta.button}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default TermsPage