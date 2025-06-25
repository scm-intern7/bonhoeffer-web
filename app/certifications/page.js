'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

function CertificationPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  // Certification data with detailed information
  const certifications = [
    {
      id: 1,
      name: "ISO Quality Management Certification",
      image: "https://bonhoeffermachines.com/en/public/images/certificate/Certificacion-ISO.jpg",
      authority: "International Organization for Standardization",
      type: "Quality Management System",
      description: "ISO certification ensures our commitment to quality management systems, continuous improvement, and customer satisfaction.",
      validUntil: "October, 2026",
      benefits: ["Quality Assurance", "Process Optimization", "Customer Trust", "Global Recognition"]
    },
    {
      id: 2,
      name: "Commercial Test Report - GT-950T",
      image: "https://bonhoeffermachines.com/en/public/images/certificate/BON-GT-950T.jpg",
      authority: "Government of India - Ministry of Agriculture and Farmers Welfare",
      type: "Commercial Test Report",
      description: "Official government authorization for international trade operations and machinery export.",
      validUntil: "May, 2028",
      benefits: ["Legal Export Authority", "International Trade", "Government Compliance", "Trade Security"]
    },
    {
      id: 3,
      name: "Commercial Test Report - BC36",
      image: "https://bonhoeffermachines.com/en/public/images/certificate/BON-P-BC36.jpg",
      authority: "Government of India - Ministry of Agriculture and Farmers Welfare",
      type: "Commercial Test Report",
      description: "BIS certification confirming our products meet Indian quality and safety standards.",
      validUntil: "2025",
      benefits: ["Product Safety", "Market Access", "Quality Standards", "Consumer Protection"]
    },
    {
      id: 4,
      name: "Commercial Test Report - BC45",
      image: "https://bonhoeffermachines.com/en/public/images/certificate/BON-P-BC45.jpg",
      authority: "Government of India - Ministry of Agriculture and Farmers Welfare",
      type: "Advanced Product Certification",
      description: "Enhanced product certification for our advanced machinery line ensuring superior quality.",
      validUntil: "2025",
      benefits: ["Advanced Quality", "Technical Excellence", "Safety Compliance", "Performance Standards"]
    },
    {
      id: 5,
      name: "Commercial Test Report - BP-BC45",
      image: "https://bonhoeffermachines.com/en/public/images/certificate/BON-P-BP-BC45.jpg",
      authority: "Government of India - Ministry of Agriculture and Farmers Welfare",
      type: "Business Process Certification",
      description: "Certification validating our business processes, manufacturing standards, and operational excellence.",
      validUntil: "2025",
      benefits: ["Process Excellence", "Operational Standards", "Business Integrity", "Manufacturing Quality"]
    }
  ];

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 " />
        
        <motion.div 
          className="relative z-10 text-center text-white px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-[#989b2e]/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <svg className="w-16 h-16 text-[#989b2e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L19 7L18.09 9.74L23 12L18.09 14.26L19 17L13.09 15.74L12 22L10.91 15.74L5 17L5.91 14.26L1 12L5.91 9.74L5 7L10.91 8.26L12 2Z"/>
              </svg>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Our <span className="text-[#989b2e]">Certifications</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-5xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Trusted by Government of India • Certified for Excellence • Your Assurance of Quality
          </motion.p>
        </motion.div>
      </section>

      {/* Trust Building Section */}
      {/* <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Government Verified • <span className="text-[#989b2e]">Quality Assured</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Our certifications from the Government of India and international bodies demonstrate our unwavering commitment 
              to quality, safety, and excellence. Each certificate represents rigorous testing, compliance verification, 
              and our dedication to delivering world-class machinery that meets the highest standards.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* Certifications Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 md:gap-x-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(152, 155, 46, 0.1)' }}
                onClick={() => openModal(cert)}
              >
                <div className="relative w-full aspect-[3/4] mb-6 rounded-xl overflow-hidden bg-white/10">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#989b2e] transition-colors">
                  {cert.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#989b2e] text-xs sm:text-sm font-medium">
                    {cert.authority}
                  </span>
                  <motion.div
                    className="text-[#989b2e]"
                    whileHover={{ x: 5 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Certifications Matter */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#989b2e]">
              Why Our Certifications Matter
            </h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl sm:max-w-4xl mx-auto">
              Every certification represents our commitment to excellence and your assurance of quality
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-8">
            {[
              {
                icon: "🏛️",
                title: "Government Verified",
                description: "All certifications issued by Government of India ensure legal compliance and authenticity"
              },
              {
                icon: "🔒",
                title: "Quality Assured",
                description: "Rigorous testing and quality control processes verified by authorized bodies"
              },
              {
                icon: "🌍",
                title: "International Standards",
                description: "ISO and other international certifications enabling global market access"
              },
              {
                icon: "🛡️",
                title: "Customer Protection",
                description: "Certified products provide warranty protection and service guarantees"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCert && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-y-auto mt-16 lg:mt-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-y-4 sm:gap-y-0">
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">{selectedCert.name}</h2>
                  <p className="text-[#989b2e] font-medium text-sm sm:text-base">{selectedCert.authority}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </BgLayout>
  )
}

export default CertificationPage