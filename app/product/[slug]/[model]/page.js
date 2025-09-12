'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ModelSpecificPage() {
  const params = useParams();
  const { slug, model } = params;
  const [activeView, setActiveView] = useState('specifications');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // For FAQ accordion
  const [loading, setLoading] = useState(true);
  const [modelExists, setModelExists] = useState(true);

  const warranty36 = 'https://bonhoeffermachines.com/en/public/images/36-months.webp';
  const warranty12 = 'https://bonhoeffermachines.com/en/public/images/12-months.webp';
  const warranty15 = 'https://bonhoeffermachines.com/en/public/images/15-months.webp';
  const warranty24 = 'https://bonhoeffermachines.com/en/public/images/24-months.webp';
  const isoImage = 'https://bonhoeffermachines.com/en/public/images/iso.png';
  const fmttiImage = 'https://bonhoeffermachines.com/en/public/images/fmtti.webp';

  // Fetch model details from Notion API
  const fetchModelDetails = async (productSlug, modelName) => {
    try {
      const response = await fetch(`/api/model-details?productSlug=${productSlug}&modelName=${modelName}`);
      const data = await response.json();
      return data && Object.keys(data).length > 0 ? data : null;
    } catch (error) {
      console.error('Error fetching model details:', error);
      return null;
    }
  };

  const getProductName = (slug) => {
    const nameMap = {
      'gasoline-water-pump': 'Gasoline Water Pump',
      'diesel-water-pump': 'Diesel Water Pump',
      'gasoline-engine': 'Gasoline Engine',
      'diesel-engine': 'Diesel Engine',
      'gasoline-tiller': 'Gasoline Tiller',
      'mini-cultivator': 'Mini Cultivator',
      'brush-cutter': 'Brush Cutter',
      'backpack-brush-cutter': 'Backpack Brush Cutter',
      'chainsaw': 'Chainsaw',
      'hedge-trimmer': 'Hedge Trimmer',
      'lawn-mower': 'Lawn Mower',
      'leaf-blower': 'Leaf Blower',
      'multi-tool': 'Multi Tool',
      'diesel-generator': 'Diesel Generator',
      'gasoline-generator': 'Gasoline Generator',
      'gasoline-inverter': 'Gasoline Inverter'
    };
    return nameMap[slug] || 'Product';
  };

  const getProductImage = (slug) => {
    const imageMap = {
      'gasoline-water-pump': 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp',
      'gasoline-engine': 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp',
      'gasoline-generator': 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp',
      'brush-cutter': 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp',
      'chainsaw': 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp';
  };

  // Fetch other models from Notion API
  const fetchOtherModels = async (productSlug, currentModel) => {
    try {
      const response = await fetch(`/api/other-models?productSlug=${productSlug}&currentModel=${currentModel}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching other models:', error);
      return [];
    }
  };

  // Fetch FAQs from Notion API
  const fetchFAQs = async (productSlug) => {
    try {
      const response = await fetch(`/api/model-faqs?productSlug=${productSlug}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  };

  const [modelDetails, setModelDetails] = useState(null);
  const [otherModels, setOtherModels] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Check if model exists and set data
  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      
      try {
        // Fetch all data in parallel
        const [details, otherModelsList, faqsList] = await Promise.all([
          fetchModelDetails(slug, model),
          fetchOtherModels(slug, model),
          fetchFAQs(slug)
        ]);
        
        if (details) {
          setModelDetails(details);
          setOtherModels(otherModelsList);
          setFaqs(faqsList);
          setModelExists(true);
        } else {
          setModelExists(false);
        }
      } catch (error) {
        console.error('Error fetching model data:', error);
        setModelExists(false);
      }
      
      setLoading(false);
    };

    if (slug && model) {
      fetchModelData();
    }
  }, [slug, model]);

  const handleDownload = (type) => {
    // Mock download functionality
    alert(`Downloading ${type} for ${modelDetails.name}`);
  };

  // ExZoomGallery: Custom exzoom-inspired image gallery/zoom
  function ExZoomGallery({ images = [], alt = '', currentIndex, setCurrentIndex }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0.5, y: 0.5 });
    const mainImgRef = React.useRef(null);

    const handleMouseMove = (e) => {
      const rect = mainImgRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setZoomPos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    const handlePrev = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const handleNext = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
      <div className="w-full flex flex-col items-center relative">
        {/* Main image container - responsive */}
        <div className="relative w-full max-w-lg aspect-square">
          <div
            className="rounded-2xl overflow-visible bg-white border border-white/10 flex items-center justify-center relative w-full h-full"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            ref={mainImgRef}
          >
            <Image
              src={images[currentIndex]}
              alt={alt}
              fill
              className="object-contain cursor-crosshair select-none"
              draggable={false}
              priority
            />
            {/* Zoomed overlay - only on desktop */}
            {isZoomed && (
              <div className="fixed lg:absolute top-0 left-full ml-6 z-50 hidden xl:block w-96 h-96">
                <div className="rounded-2xl border border-[#989b2e] shadow-2xl overflow-hidden bg-white w-full h-full relative">
                  <img
                    src={images[currentIndex]}
                    alt={alt + ' zoomed'}
                    // fill
                    className="object-contain"
                    style={{
                      transform: `scale(2.5) translate(${-zoomPos.x * 60 + 30}%, ${-zoomPos.y * 60 + 30}%)`,
                      transition: 'transform 0.1s',
                    }}
                    draggable={false}
                    // priority
                  />
                </div>
              </div>
            )}
          </div>
          {/* Prev/Next buttons - responsive positioning */}
          <button
            className="absolute cursor-pointer left-0 sm:-left-12 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#7a7d24] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-20"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button
            className="absolute cursor-pointer right-0 sm:-right-12 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#7a7d24] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-20"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:w-6 sm:h-6">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
        {/* Thumbnails - responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 px-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === idx ? 'border-[#989b2e]' : 'border-white/20 hover:border-white/40'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={alt + ' thumbnail ' + (idx + 1)}
                // fill
                className="object-contain p-1 sm:p-2 bg-white"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 1. Banner Section (Image or Video)
  // Place this at the top, replacing the static hero image section
  const renderBannerSection = () => {
    if (modelDetails.isBannerImage && modelDetails.bannerImage) {
      // Banner image (single or array)
      const bannerSrc = Array.isArray(modelDetails.bannerImage)
        ? modelDetails.bannerImage[0]
        : modelDetails.bannerImage;
      return (
        // <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        //   <div className="absolute inset-0">
        //     <Image
        //       src={bannerSrc}
        //       alt="Product Banner"
        //       fill
        //       className="object-cover"
        //       priority
        //     />
        //     <div className="absolute inset-0 bg-black/70" />
        //   </div>
        //   <motion.div 
        //     className="relative z-10 text-center text-white px-6"
        //     initial={{ opacity: 0, y: 50 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 1 }}
        //   >
        //     <motion.h1 
        //       className="text-3xl md:text-5xl font-bold mb-4"
        //       initial={{ opacity: 0, scale: 0.8 }}
        //       animate={{ opacity: 1, scale: 1 }}
        //       transition={{ duration: 1, delay: 0.3 }}
        //     >
        //       <span className="text-[#989b2e]">{modelDetails.name}</span>
        //     </motion.h1>
        //   </motion.div>
        // </section>
      <section className="relative h-[22vh] xs:h-[26vh] sm:h-[32vh] md:h-[38vh] lg:h-[44vh] min-h-[160px] sm:min-h-[200px] md:min-h-[260px] lg:min-h-[320px] flex items-center overflow-hidden mt-20 md:mt-20">
        <div className="absolute inset-0">
          <Image
            src={bannerSrc}
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
            <span className="text-[#989b2e]">{modelDetails.name}</span>
          </motion.h1>
        </motion.div>
      </section>
      );
    } else if (modelDetails.isVideo && Array.isArray(modelDetails.videoUrls) && modelDetails.videoUrls.length > 0) {
      // Video banner (YouTube embed) - handles multiple videos
      return (
        <section className="relative min-h-[50vh] lg:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden mt-5 pt-19 lg:pt-12">

          <div className={`grid gap-6 w-full max-w-7xl px-6 ${
            modelDetails.videoUrls.length === 1 ? 'grid-cols-1 max-w-4xl' :
            modelDetails.videoUrls.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {modelDetails.videoUrls.map((video, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="aspect-video relative">
                  <iframe
                    src={video.url}
                    title={video.title || `Product Video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl border-none shadow-2xl"
                  />
                </div>
                {video.title && (
                  <div className="mt-3 text-center text-white text-lg font-semibold">
                    {video.title}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-6 my-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[#989b2e]">{modelDetails.name}</span>
            </motion.h1>
          </motion.div>
        </section>
      );
    } else {
      // Fallback: static hero image (as before)
      return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
          <div className="absolute inset-0">
            <Image
              src="/product-banner.avif"
              alt="Product Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <motion.div 
            className="relative z-10 text-center text-white px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[#989b2e]">{modelDetails.name}</span>
            </motion.h1>
          </motion.div>
        </section>
      );
    }
  };

  // 2. Document Buttons (in Product Info section)
  // Replace the document buttons block with this:
  function DocumentButtons() {
    return (
      <motion.div
        className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:justify-end"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {modelDetails.isUserManual && (
          <a
            href={modelDetails.userManualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm sm:text-base rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            User Manual
          </a>
        )}
        {modelDetails.isBrochure && (
          <a
            href={modelDetails.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Brochure
          </a>
        )}
        {modelDetails.isSpareParts && modelDetails.sparePartsUrl && (
          <a
            href={modelDetails.sparePartsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Spare Parts
          </a>
        )}
        {modelDetails.isWorkshopManual && (
          <a
            href={modelDetails.workshopManualUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Workshop Manual
          </a>
        )}
      </motion.div>
    );
  }

  // 3. Warranty & Certifications (in Certification Seals section)
  // Replace the warranty/certification seals block with this:
  function WarrantyCertifications() {
    return (
      <motion.div
        className="flex justify-center lg:justify-end space-x-4 sm:space-x-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
            <Image
              src={
                modelDetails.warrantyTime === 36 ? warranty36 :
                modelDetails.warrantyTime === 24 ? warranty24 :
                modelDetails.warrantyTime === 15 ? warranty15 :
                warranty12
              }
              alt="Warranty Seal"
              width={48}
              height={48}
              className="object-contain sm:w-16 sm:h-16"
            />
          </div>
          {/* <p className="text-xs text-gray-300">{modelDetails.warrantyTime} Month Warranty</p> */}
        </div>
        {modelDetails.isFMTTI && (
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
              <Image
                src={fmttiImage}
                alt="FMTTI Seal"
                width={48}
                height={48}
                className="object-contain sm:w-16 sm:h-16"
              />
            </div>
            {/* <p className="text-xs text-gray-300">FMTTI Certified</p> */}
          </div>
        )}
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 bg-white/10">
            <Image
              src={isoImage}
              alt="ISO Seal"
              width={48}
              height={48}
              className="object-contain sm:w-16 sm:h-16"
            />
          </div>
          {/* <p className="text-xs text-gray-300">ISO Company</p> */}
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading model information...</p>
          </div>
        </div>
      </BgLayout>
    );
  }

  if (!modelExists || !modelDetails) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center py-15">
          <div className="text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-5xl md:text-7xl font-bold text-[#989b2e] mb-4">404</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Model Not Found
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
                The model &quot;{model}&quot; for &quot;{getProductName(slug)}&quot; doesn&apos;t exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href={`/product/${slug}`}
                  className="inline-flex items-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 py-3 rounded-full font-medium transition-all duration-300 gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to {getProductName(slug)} Models
                </Link>
                <Link
                  href="/product"
                  className="inline-flex items-center text-[#989b2e] hover:text-white border border-[#989b2e] hover:border-white px-6 py-3 rounded-full font-medium transition-all duration-300 gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  All Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </BgLayout>
    );
  }

  return (
    <BgLayout>
      {/* Hero Section */}
      {renderBannerSection()}

      {/* Product Info & Download Buttons */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-12 px-2 sm:px-5">
            {/* Left - Product Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {modelDetails.model}
              </h2>
              {/* <p className="text-[#989b2e] text-lg font-medium">{modelDetails.power}</p> */}
            </motion.div>

            {/* Right - Download Buttons */}
            <div className="flex-shrink-0">
              <DocumentButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Product Leaflet Image */}
      {(modelDetails.isCatalogueLeft || modelDetails.isCatalogueRight) && (
        <section className="py-6 sm:py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row gap-4 md:gap-8 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {modelDetails.isCatalogueLeft && (
                <div className="relative w-full aspect-[2492/3508] h-full max-h-110 sm:max-h-[550px] md:max-h-[750px]">
                  <img
                    src={modelDetails.catalougeLeft}
                    alt={`${modelDetails.name} Leaflet Left`}
                    // fill
                    className="object-contain bg-white rounded-xl shadow-md"
                    // priority
                  />
                </div>
              )}
              {modelDetails.isCatalogueRight && (
                <div className="relative w-full aspect-[2492/3508] h-full max-h-110 sm:max-h-[550px] md:max-h-[750px]">
                  <img
                    src={modelDetails.catalougeRight}
                    alt={`${modelDetails.name} Leaflet Right`}
                    // fill
                    className="object-contain bg-white rounded-xl shadow-md"
                    // priority
                  />
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Specifications/Features Toggle & Certification Seals */}
      <section className="pt-8 sm:pt-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Toggle Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1"
            >
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={() => setActiveView('specifications')}
                  className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all cursor-pointer duration-300 ${
                    activeView === 'specifications'
                      ? 'bg-[#989b2e] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Technical Specifications
                </button>
                {modelDetails.features && modelDetails.features.length > 0 && (
                  <button
                    onClick={() => setActiveView('features')}
                    className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all cursor-pointer duration-300 ${
                      activeView === 'features'
                        ? 'bg-[#989b2e] text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    Special Features
                  </button>
                )}
              </div>
            </motion.div>

            {/* Right - Certification Seals */}
            <div className="order-2">
              <WarrantyCertifications />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1"
            >
              <ExZoomGallery
                images={modelDetails.showcaseImages}
                alt={modelDetails.name}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
              />
            </motion.div>

            {/* Right - Specifications or Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2"
            >
              {activeView === 'specifications' ? (
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {modelDetails.specifications.map((spec, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.005 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                        <h4 className="text-[#989b2e] font-medium text-sm sm:text-base">{spec.label}</h4>
                        <p className="text-white font-semibold text-sm sm:text-base">{spec.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {modelDetails.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                    >
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Description & Model Description */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          { modelDetails.descriptionImage && (
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Product & Model Descriptions */}
            <motion.div
              className="space-y-6 sm:space-y-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="space-y-4">
                  {modelDetails.description.map((desc, idx) => (
                    <div key={idx}>
                      {desc.title && <h3 className="text-xl sm:text-2xl font-bold text-[#989b2e] mb-3 sm:mb-4">{desc.title}</h3>}
                      <p className="text-gray-100 leading-relaxed text-sm sm:text-base">{desc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Labeled Product Image */}
            { modelDetails.descriptionImage && (
            <motion.div
              className="relative h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 order-1 lg:order-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={modelDetails.descriptionImage}
                alt={`${modelDetails.name} labeled view`}
                fill
                className="object-contain p-4 sm:p-8 bg-white"
              />
              {/* You can add labeled callouts here */}
            </motion.div>
            )}
          </div>
          )}

          { !modelDetails.descriptionImage && (
          <div className="">
            {/* Left - Product & Model Descriptions */}
            <motion.div
              className=""
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="space-y-4">
                  {modelDetails.description.map((desc, idx) => (
                    <div key={idx}>
                      {desc.title && <h3 className="text-xl sm:text-2xl font-bold text-[#989b2e] mb-3 sm:mb-4">{desc.title}</h3>}
                      <p className="text-gray-100 text-sm sm:text-base">{desc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Labeled Product Image */}
            { modelDetails.descriptionImage && (
            <motion.div
              className="relative h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 order-1 lg:order-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={modelDetails.descriptionImage}
                alt={`${modelDetails.name} labeled view`}
                fill
                className="object-contain p-4 sm:p-8 bg-white"
              />
              {/* You can add labeled callouts here */}
            </motion.div>
            )}
          </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      { faqs.length > 0 && (
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                Frequently Asked <span className='text-[#989b2e]'>Questions</span>
              </h2>
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div
                    key={index}
                    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-lg' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                  >
                    <button
                      className="w-full flex justify-between items-center text-left p-4 sm:p-6 focus:outline-none cursor-pointer"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg font-semibold text-white pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className="transition-all duration-300 px-4 sm:px-6"
                      style={{
                        maxHeight: isOpen ? '500px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? 'auto' : 'none',
                      }}
                    >
                      <p className="text-gray-300 leading-relaxed mb-2 text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Models */}
      {otherModels.length > 1 && (
        <section className="pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
              Other <span className='text-[#989b2e]'>Models</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherModels.map((otherModel, index) => (
              <Link
                key={index}
                href={`/product/${slug}/${otherModel.name}`}
                className="group"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.01 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48 sm:h-60 mb-4 rounded-xl overflow-hidden bg-white">
                    <Image
                      src={otherModel.image || getProductImage(slug)}
                      alt={otherModel.name}
                      fill
                      className="object-contain p-2 scale-130 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0 group-hover:text-[#989b2e] transition-colors text-center">
                    {otherModel.name}
                  </h3>
                  <p className="text-gray-300 text-center">{otherModel.power}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )}

      {/* Navigation */}
      <section className="pb-5 px-4 sm:px-6 text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <Link 
            href={`/product/${slug}`}
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {getProductName(slug)} Models
          </Link>
          <Link 
            href="/product"
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            All Products
          </Link>
        </div>
      </section>
    </BgLayout>
  )
}

export default ModelSpecificPage