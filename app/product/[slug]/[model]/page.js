'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
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

  // Get model details based on slug and model
  const getModelDetails = (productSlug, modelName) => {
    const modelDetails = {
      'gasoline-water-pump': {
        'wp-20': {
          name: 'WP-20 Gasoline Water Pump',
          power: '5.5 HP',
          description: 'Compact and efficient water pump designed for residential and small commercial applications.',
          modelDescription: 'The WP-20 model features a reliable 4-stroke engine with automatic pressure regulation and durable cast iron construction for long-lasting performance.',
          images: [
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp',
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp',
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp'
          ],
          specifications: [
            { label: 'Engine Name', value: 'Bonhoeffer 168F' },
            { label: 'Cylinder Displacement', value: '163cc' },
            { label: 'Net Power at Preset RPM', value: '5.5 HP @ 3600 RPM' },
            { label: 'Air Filter Type', value: 'Dry Type Paper Element' },
            { label: 'Fuel Tank Volume', value: '3.6 L' },
            { label: 'Fuel Type', value: 'Unleaded Gasoline' },
            { label: 'Engine Oil Capacity', value: '0.6 L' },
            { label: 'Engine Oil Type', value: 'SAE 10W-30' },
            { label: 'Suction Size', value: '2 inch (50mm)' },
            { label: 'Discharge Size', value: '2 inch (50mm)' },
            { label: 'Max Flow Rate', value: '600 L/min' },
            { label: 'Max Head', value: '30 meters' }
          ],
          features: [
            'Reliable Bonhoeffer Gasoline Engine: Equipped with a robust 4-stroke engine ensuring powerful and consistent performance.',
            'High-Flow Design: Optimized impeller design for maximum water flow and efficiency.',
            'Cast Iron Construction: Durable pump housing for long-lasting operation in harsh conditions.',
            'Easy Start System: Recoil starter with decompression valve for effortless starting.',
            'Portable Design: Lightweight frame with carrying handles for easy transportation.',
            'Self-Priming Capability: Quick priming system reduces setup time and improves efficiency.',
            'Vibration Dampening: Anti-vibration mounts reduce operational noise and increase stability.',
            'Weather Protection: Corrosion-resistant coating protects against environmental damage.'
          ]
        }
      },
      'brush-cutter': {
        'bc-260': {
          name: 'BC-260 Brush Cutter',
          power: '1.0 HP',
          description: 'Lightweight and versatile brush cutter perfect for homeowners and light professional use.',
          modelDescription: 'The BC-260 model combines power and maneuverability with a 26cc 2-stroke engine, making it ideal for grass cutting and light brush clearing.',
          images: [
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7-brush-cutter.webp',
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7-brush-cutter.webp',
            'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7-brush-cutter.webp'
          ],
          specifications: [
            { label: 'Engine Name', value: 'Bonhoeffer 260' },
            { label: 'Cylinder Displacement', value: '26cc' },
            { label: 'Net Power at Preset RPM', value: '1.0 HP @ 7000 RPM' },
            { label: 'Air Filter Type', value: 'Foam Element' },
            { label: 'Fuel Tank Volume', value: '0.6 L' },
            { label: 'Fuel Type', value: '2-Stroke Mix (25:1)' },
            { label: 'Engine Oil Type', value: '2-Stroke Oil' },
            { label: 'Cutting Width', value: '255mm' },
            { label: 'Shaft Type', value: 'Straight Drive' },
            { label: 'Weight', value: '5.2 kg' },
            { label: 'Noise Level', value: '95 dB(A)' },
            { label: 'Vibration Level', value: '< 2.5 m/s²' }
          ],
          features: [
            'Powerful 2-Stroke Engine: High-performance engine delivers excellent power-to-weight ratio for efficient cutting.',
            'Anti-Vibration System: Advanced dampening technology reduces operator fatigue during extended use.',
            'Quick Start Technology: Easy-start system with primer bulb ensures reliable starting in all conditions.',
            'Dual Handle Design: Ergonomic bike-handle configuration provides superior control and comfort.',
            'Professional Cutting Head: Heavy-duty trimmer head accommodates various line sizes and blade attachments.',
            'Lightweight Construction: Optimized design minimizes weight without compromising durability.',
            'Safety Features: Protective guard and throttle lock ensure safe operation.',
            'Easy Maintenance: Tool-free access to air filter and spark plug for quick servicing.'
          ]
        }
      }
    };

    // Default model details
    const defaultDetails = {
      name: `${getProductName(productSlug)} ${modelName.toUpperCase()}`,
      power: '5.5 HP',
      description: `Professional ${getProductName(productSlug).toLowerCase()} designed for heavy-duty applications.`,
      modelDescription: `The ${modelName.toUpperCase()} model features advanced engineering and premium components for reliable performance in demanding conditions.`,
      images: [
        getProductImage(productSlug),
        getProductImage(productSlug),
        getProductImage(productSlug)
      ],
      specifications: [
        { label: 'Engine Name', value: 'Bonhoeffer Professional' },
        { label: 'Cylinder Displacement', value: '163cc' },
        { label: 'Net Power at Preset RPM', value: '5.5 HP @ 3600 RPM' },
        { label: 'Air Filter Type', value: 'Dry Type Paper Element' },
        { label: 'Fuel Tank Volume', value: '3.6 L' },
        { label: 'Fuel Type', value: 'Unleaded Gasoline' },
        { label: 'Engine Oil Capacity', value: '0.6 L' },
        { label: 'Engine Oil Type', value: 'SAE 10W-30' },
        { label: 'Operating Weight', value: '25 kg' },
        { label: 'Dimensions (L×W×H)', value: '650×450×550 mm' },
        { label: 'Warranty Period', value: '36 Months' },
        { label: 'Certification', value: 'ISO 9001:2015' }
      ],
      features: [
        'Reliable Bonhoeffer Engine: Equipped with robust and dependable engine ensuring powerful performance.',
        'Professional Grade Construction: Built with premium materials for long-lasting durability.',
        'Easy Operation: User-friendly controls and ergonomic design for comfortable operation.',
        'Low Maintenance: Designed for minimal maintenance requirements and easy servicing.',
        'Safety Features: Comprehensive safety systems protect both operator and equipment.',
        'Efficient Performance: Optimized design delivers maximum efficiency and fuel economy.',
        'Weather Resistant: Corrosion-resistant coating and weatherproof components.',
        'Comprehensive Warranty: Backed by 36-month warranty and nationwide service support.'
      ]
    };

    return modelDetails[productSlug]?.[modelName] || defaultDetails;
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
      'gasoline-water-pump': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp',
      'gasoline-engine': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2-gasoline-engine.webp',
      'gasoline-generator': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3-gasoline-generator.webp',
      'brush-cutter': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7-brush-cutter.webp',
      'chainsaw': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/10-chain-saw.webp'
    };
    return imageMap[slug] || 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp';
  };

  // Get other models for the same product
  const getOtherModels = (productSlug, currentModel) => {
    const allModels = {
      'gasoline-water-pump': [
        { name: 'WP-20', power: '5.5 HP' },
        { name: 'WP-30', power: '6.5 HP' },
        { name: 'WP-40', power: '7.0 HP' },
        { name: 'WP-50', power: '8.0 HP' }
      ],
      'brush-cutter': [
        { name: 'BC-260', power: '1.0 HP' },
        { name: 'BC-330', power: '1.2 HP' },
        { name: 'BC-430', power: '1.7 HP' },
        { name: 'BC-520', power: '2.2 HP' }
      ]
    };

    const models = allModels[productSlug] || [
      { name: 'Model-100', power: '5.5 HP' },
      { name: 'Model-200', power: '6.5 HP' },
      { name: 'Model-300', power: '7.0 HP' }
    ];

    return models.filter(m => m.name.toLowerCase() !== currentModel);
  };

  // Mock FAQ data
  const getFAQs = (productSlug) => {
    const faqs = {
      'gasoline-water-pump': [
        { question: 'What type of fuel should I use?', answer: 'Use only unleaded gasoline with octane rating of 87 or higher. Do not use fuel containing ethanol.' },
        { question: 'How often should I change the oil?', answer: 'Change engine oil after first 20 hours of operation, then every 50 hours or annually, whichever comes first.' },
        { question: 'What is the maximum suction lift?', answer: 'The maximum suction lift is 8 meters under ideal conditions with proper priming.' },
        { question: 'Can it run dry?', answer: 'Never run the pump dry as this will damage the mechanical seal and impeller. Always ensure adequate water supply.' }
      ],
      'brush-cutter': [
        { question: 'What fuel mixture should I use?', answer: 'Use a 25:1 gasoline to 2-stroke oil mixture. Always use fresh fuel and high-quality 2-stroke oil.' },
        { question: 'How do I replace the cutting line?', answer: 'Stop the engine, remove the trimmer head cover, and wind new line following the directional arrows on the spool.' },
        { question: 'What safety equipment is required?', answer: 'Always wear safety glasses, hearing protection, long pants, closed-toe shoes, and gloves when operating.' },
        { question: 'How often should I clean the air filter?', answer: 'Clean the foam air filter every 10 hours of operation or more frequently in dusty conditions.' }
      ]
    };

    return faqs[productSlug] || [
      { question: 'What is the warranty period?', answer: 'All our products come with a comprehensive 36-month warranty covering manufacturing defects.' },
      { question: 'Where can I get service support?', answer: 'We have authorized service centers nationwide. Contact our customer support for the nearest location.' },
      { question: 'What maintenance is required?', answer: 'Regular maintenance includes oil changes, air filter cleaning, and spark plug replacement as per the user manual.' }
    ];
  };

  const modelDetails = getModelDetails(slug, model);
  const otherModels = getOtherModels(slug, model);
  const faqs = getFAQs(slug);

  const handleDownload = (type) => {
    // Mock download functionality
    alert(`Downloading ${type} for ${modelDetails.name}`);
  };

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/product-banner.webp"
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

      {/* Product Info & Download Buttons */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Product Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {modelDetails.name}
              </h2>
              <p className="text-[#989b2e] text-lg font-medium">{modelDetails.power}</p>
            </motion.div>

            {/* Right - Download Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => handleDownload('User Manual')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                User Manual
              </button>
              <button
                onClick={() => handleDownload('Brochure')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Brochure
              </button>
              <Link
                href="/spare-parts"
                className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Spare Parts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Leaflet Image */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative h-[50vh] w-[120vh] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={modelDetails.images[0]}
              alt={`${modelDetails.name} Leaflet`}
              fill
              className="object-fill"
            />
          </motion.div>
        </div>
      </section>

      {/* Specifications/Features Toggle & Certification Seals */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Toggle Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => setActiveView('specifications')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeView === 'specifications'
                      ? 'bg-[#989b2e] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveView('features')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeView === 'features'
                      ? 'bg-[#989b2e] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Special Features
                </button>
              </div>
            </motion.div>

            {/* Right - Certification Seals */}
            <motion.div
              className="flex justify-end space-x-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-[#989b2e]/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-[#989b2e] font-bold text-xs">36M</span>
                </div>
                <p className="text-xs text-gray-300">36 Month Warranty</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-400 font-bold text-xs">FMTTI</span>
                </div>
                <p className="text-xs text-gray-300">FMTTI Certified</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                  <span className="text-green-400 font-bold text-xs">ISO</span>
                </div>
                <p className="text-xs text-gray-300">ISO Company</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Main Image */}
                <div 
                  className={`relative h-96 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 cursor-zoom-in transition-transform duration-300 ${
                    isZoomed ? 'scale-110' : ''
                  }`}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <Image
                    src={modelDetails.images[currentImageIndex]}
                    alt={modelDetails.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex space-x-3 mt-4">
                  {modelDetails.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'border-[#989b2e]'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${modelDetails.name} view ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right - Specifications or Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {activeView === 'specifications' ? (
                <div className="grid grid-cols-1 gap-4">
                  {modelDetails.specifications.map((spec, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#989b2e] text-sm font-medium">{spec.label}</h4>
                        <p className="text-white font-semibold">{spec.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {modelDetails.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <p className="text-gray-300 leading-relaxed">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Description & Model Description */}
      <section className="py-12 px-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Labeled Product Image */}
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={modelDetails.images[0]}
                alt={`${modelDetails.name} labeled view`}
                fill
                className="object-contain p-8"
              />
              {/* You can add labeled callouts here */}
            </motion.div>

            {/* Right - Product & Model Descriptions */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-[#989b2e] mb-4">About This Product</h3>
                <p className="text-gray-300 leading-relaxed">{modelDetails.description}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#989b2e] mb-4">About This Model</h3>
                <p className="text-gray-300 leading-relaxed">{modelDetails.modelDescription}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Models */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
              Other Models
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherModels.map((otherModel, index) => (
              <Link
                key={index}
                href={`/product/${slug}/${otherModel.name.toLowerCase()}`}
                className="group"
              >
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-60 mb-4 rounded-xl overflow-hidden bg-white">
                    <Image
                      src={getProductImage(slug)}
                      alt={otherModel.name}
                      fill
                      className="object-contain p-2 scale-130 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#989b2e] transition-colors text-center">
                    {otherModel.name}
                  </h3>
                  <p className="text-gray-300 text-center">{otherModel.power}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-10 px-6 text-center">
        <div className="flex justify-center space-x-8">
          <Link 
            href={`/product/${slug}`}
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {getProductName(slug)} Models
          </Link>
          <Link 
            href="/product"
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
