'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
// import productsData from './products.json'
// import paraData from './para.json'
// import faqs from './faq.json'

// FAQ Item Component
// function FAQItem({ faq, index }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.div
//       className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       viewport={{ once: true }}
//     >
//       <button
//         className="w-full cursor-pointer p-4 md:p-6 text-left flex justify-between items-center hover:bg-white/5 transition-all duration-300"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h4 className="text-base xs:text-lg md:text-xl font-semibold text-white pr-4">
//           {faq.question}
//         </h4>
//         <motion.div
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex-shrink-0"
//         >
//           <svg 
//             className="w-5 h-5 text-[#989b2e]" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M19 9l-7 7-7-7" 
//             />
//           </svg>
//         </motion.div>
//       </button>
//       <motion.div
//         initial={false}
//         animate={{ 
//           height: isOpen ? "auto" : 0,
//           opacity: isOpen ? 1 : 0 
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="overflow-hidden"
//       >
//         <div className="px-4 md:px-6 pb-4 md:pb-6">
//           <p className="text-sm xs:text-base md:text-lg text-gray-300 leading-relaxed">
//             {faq.answer}
//           </p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

function ProductSpecificPage() {
  const params = useParams();
  const slug = params.slug;
  const [models, setModels] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [productExists, setProductExists] = useState(true);

  // Fetch data from Notion APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch product models
        const modelsResponse = await fetch(`/api/product-models?slug=${slug}`);
        const modelsData = await modelsResponse.json();
        
        // Fetch product details
        const detailsResponse = await fetch(`/api/product-details?slug=${slug}`);
        const detailsData = await detailsResponse.json();
        
        // Fetch product info (name, image, description)
        const infoResponse = await fetch(`/api/product-info?slug=${slug}`);
        const infoData = await infoResponse.json();
        
        // Check if we have any product data
        const hasProductData = (modelsData && modelsData.length > 0) || 
                              (detailsData && detailsData.length > 0) || 
                              (infoData && Object.keys(infoData).length > 0);
        
        if (hasProductData) {
          setModels(modelsData || []);
          setProductDetails(detailsData || []);
          setProductInfo(infoData || {});
          setProductExists(true);
        } else {
          // No product data found - this is a 404
          setProductExists(false);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        // On error, treat as 404
        setProductExists(false);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const productName = productInfo.name || 'Product';
  const productImage = productInfo.image || '/placeholder-image.jpg';
  const productDescription = productInfo.description || 'Product description not available.';

  if (loading) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading product information...</p>
          </div>
        </div>
      </BgLayout>
    );
  }

  if (!productExists) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center py-9">
          <div className="text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-5xl md:text-7xl font-bold text-[#989b2e] mb-4">404</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Product Not Found
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto">
                The product "{slug}" you're looking for doesn't exist or has been moved.
              </p>
              <Link
                href="/product"
                className="inline-flex items-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Products
              </Link>
            </motion.div>
          </div>
        </div>
      </BgLayout>
    );
  }

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative h-[22vh] xs:h-[26vh] sm:h-[32vh] md:h-[38vh] lg:h-[44vh] min-h-[160px] sm:min-h-[200px] md:min-h-[260px] lg:min-h-[320px] flex items-center overflow-hidden mt-4 md:mt-5">
        <div className="absolute inset-0">
          <Image
            src={productImage}
            alt="Product Banner"
            fill
            className="object-cover object-left md:object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <motion.div
          className="relative z-10 text-white px-3 xs:px-4 sm:px-6 flex items-center h-full justify-start w-full"
          style={{ left: 0 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-left w-full max-w-[90%] xs:max-w-[80%] md:max-w-[40%] pl-1 xs:pl-2 sm:pl-4 md:pl-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ maxWidth: '25%' }}
          >
            <span className="text-[#989b2e]">{productName}</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Product Description */}
      <section className="pt-10 xs:pt-12 md:pt-16 px-3 xs:px-4 sm:px-6">
        <div className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-8">
              Professional Grade <span className="text-[#989b2e]">{productName}</span>
            </h2>
            <p className="text-base xs:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto">
              {productDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section className="pt-10 xs:pt-14 md:pt-20 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
          >
            {models.map((model, index) => (
              <motion.div
                key={model.id || model.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 xs:p-5 md:p-6 hover:bg-white/10 transition-all duration-300 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(152, 155, 46, 0.1)' }}
              >
                <div className="relative w-full  mb-4 xs:mb-6 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={model.image}
                    alt={model.name}
                    // fill
                    className="object-contain p-2 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white mb-2 xs:mb-3 group-hover:text-[#989b2e] transition-colors text-center">
                  {model.name}
                </h3>
                <div className="space-y-1 xs:space-y-2 mb-2 xs:mb-4 text-center">
                  <p className="text-gray-300 text-xs xs:text-sm">
                    {model.feature}
                  </p>
                </div>
                <Link
                  href={model.link || `/product/${slug}/${model.name.toLowerCase()}`}
                  className="inline-flex  items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 xs:px-6 py-2 xs:py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105 cursor-pointer text-sm xs:text-base mt-auto"
                >
                  View Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      {/* <section className="pt-10 xs:pt-14 md:pt-20 px-3 xs:px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Frequently Asked <span className="text-[#989b2e]">Questions</span>
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {getFAQDetails(slug).map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Detailed Information Section */}
      {productDetails.length > 0 && (
        <section className="pt-10 xs:pt-14 md:pt-20 px-3 xs:px-4 sm:px-6">
          <motion.h2 
            className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Detailed Information About <span className="text-[#989b2e]">{productName}</span>
          </motion.h2>
          <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto space-y-8">
            {productDetails.map((section, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl xs:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                  {section.title}
                </h3>
                <div className="text-base xs:text-lg md:text-xl text-gray-300 leading-relaxed">
                  {section.description.split('\n').map((paragraph, pIndex) => {
                    if (paragraph.trim() === '') return null;
                    
                    // Check if it's a numbered list item
                    if (paragraph.match(/^\d+\./)) {
                      return (
                        <div key={pIndex} className="mb-3">
                          <strong className="text-[#989b2e] font-semibold">{paragraph}</strong>
                        </div>
                      );
                    }
                    
                    // Check if it's a feature list (contains colons)
                    if (paragraph.includes(':') && paragraph.trim().length < 100) {
                      const [feature, ...descParts] = paragraph.split(':');
                      return (
                        <div key={pIndex} className="mb-2">
                          <span className="text-[#989b2e] font-semibold">{feature}:</span>
                          <span className="ml-1">{descParts.join(':')}</span>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={pIndex} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Back Navigation */}
      <section className="pt-6 xs:pt-8 md:pt-10 px-3 xs:px-4 sm:px-6 text-center">
        <Link
          href="/product"
          className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors text-base xs:text-lg font-medium gap-1 xs:gap-2"
        >
          <svg className="w-5 h-5 mr-1 xs:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Products
        </Link>
      </section>
    </BgLayout>
  )
}

export default ProductSpecificPage
