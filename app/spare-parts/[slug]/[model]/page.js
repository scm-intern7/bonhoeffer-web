'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import modelData from './modelData.json'

function ModelSpecificPage() {
  const params = useParams();
  const { slug, model } = params;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get model details based on slug and model code
  const getModelDetails = (partSlug, modelCode) => {
    // Check if the part category exists in modelData
    if (modelData[partSlug] && modelData[partSlug][modelCode]) {
      return modelData[partSlug][modelCode];
    }

    // Default model details
    const defaultDetails = {
      name: `${getPartName(partSlug)} Model`,
      compatible: 'Compatible with most machinery models',
      code: modelCode.toUpperCase(),
      details: [
        { label: 'Material', value: 'High Quality Steel/Aluminum' },
        { label: 'Finish', value: 'Corrosion Resistant' },
        { label: 'Warranty', value: '12 Months' },
        { label: 'Application', value: 'Professional Use' },
        { label: 'Weight', value: 'Optimized' },
        { label: 'Quality', value: 'OEM Standard' }
      ]
    };

    return defaultDetails;
  };

  const getPartName = (slug) => {
    const nameMap = {
      'piston-kit': 'Piston Kit',
      'piston-rings': 'Piston Rings',
      'carburetor': 'Carburetor',
      'carburetor-repair-kit': 'Carburetor Repair Kit',
      'chainsaw-chain': 'Chainsaw Chain',
      'fuel-hose-primer-bulb': 'Fuel Hose & Primer Bulb',
      'cylinder-kit': 'Cylinder Kit',
      'brush-cutter-head': 'Brush Cutter Head',
      'head-spare-parts': 'Head Spare Parts',
      'brush-cutter-nylon': 'Brush Cutter Nylon',
      'chainsaw-bar': 'Chainsaw Bar',
      'hard-tip-bar': 'Hard Tip Bar',
      'starter': 'Starter',
      'starter-rope': 'Starter Rope',
      'metal-wire-rope': 'Metal Wire Rope',
      'air-filter': 'Air Filter',
      'fuel-filter': 'Fuel Filter',
      'oil-pump': 'Oil Pump',
      'pinion': 'Pinion',
      'pinion-with-rim': 'Pinion with Rim',
      'clutch-drum': 'Clutch Drum',
      'clutch-bell': 'Clutch Bell',
      'gearbox': 'Gearbox',
      'gearbox-parts': 'Gearbox Parts',
      'mounting': 'Mounting',
      'ignition-coil': 'Ignition Coil',
      'crankshaft': 'Crankshaft',
      'brush-cutter-shaft': 'Brush Cutter Shaft',
      '2-3-teeth-blades': '2-3 Teeth Blades',
      'round-blades': 'Round Blades',
      'rubber-parts': 'Rubber Parts',
      'bearings': 'Bearings',
      'chain-accessories': 'Chain Accessories',
      'spark-plugs': 'Spark Plugs'
    };
    return nameMap[slug] || 'Spare Part';
  };

  const getPartImage = (slug) => {
    const imageMap = {
      'piston-kit': 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png',
      'piston-rings': 'https://bonhoeffermachines.com/en/public/parts-category/2_anillos-de-piston.png',
      'carburetor': 'https://bonhoeffermachines.com/en/public/parts-category/3_carburetor.png',
      'carburetor-repair-kit': 'https://bonhoeffermachines.com/en/public/parts-category/4_kit-de-reparacion-del-carburetor-.png',
      'chainsaw-chain': 'https://bonhoeffermachines.com/en/public/parts-category/5_cadena-de-motosierra.png',
      'fuel-hose-primer-bulb': 'https://bonhoeffermachines.com/en/public/parts-category/5_manguera-combustible-_-bulbo-de-imprimacion.png',
      'cylinder-kit': 'https://bonhoeffermachines.com/en/public/parts-category/7_kit-de-cilindro.png',
      'brush-cutter-head': 'https://bonhoeffermachines.com/en/public/parts-category/8_cabezal-de-motoguadana.png',
      'head-spare-parts': 'https://bonhoeffermachines.com/en/public/parts-category/9_repuestos-de-cabezal.png',
      'brush-cutter-nylon': 'https://bonhoeffermachines.com/en/public/parts-category/10_nyon-de-motoguadana.png',
      'chainsaw-bar': 'https://bonhoeffermachines.com/en/public/parts-category/11_espada-de-motosierra.png',
      'hard-tip-bar': 'https://bonhoeffermachines.com/en/public/parts-category/12_espada-con-punta-dura.png',
      'starter': 'https://bonhoeffermachines.com/en/public/parts-category/13_arrancador.png',
      'starter-rope': 'https://bonhoeffermachines.com/en/public/parts-category/14_cuerda-de-arranque.png',
      'metal-wire-rope': 'https://bonhoeffermachines.com/en/public/parts-category/15_cuerda-metallica-cuerda.png',
      'air-filter': 'https://bonhoeffermachines.com/en/public/parts-category/16_filtro-de-aire.png',
      'fuel-filter': 'https://bonhoeffermachines.com/en/public/parts-category/17_filtro-de-combustible.png',
      'oil-pump': 'https://bonhoeffermachines.com/en/public/parts-category/18_bomba-de-aciete.png',
      'pinion': 'https://bonhoeffermachines.com/en/public/parts-category/19_pinion.png',
      'pinion-with-rim': 'https://bonhoeffermachines.com/en/public/parts-category/20_pinion-con-rim.png',
      'clutch-drum': 'https://bonhoeffermachines.com/en/public/parts-category/21_emberague-tambor-de-emberague.png',
      'clutch-bell': 'https://bonhoeffermachines.com/en/public/parts-category/22_campana-de-clutch.png',
      'gearbox': 'https://bonhoeffermachines.com/en/public/parts-category/23_caja-de-engranaje.png',
      'gearbox-parts': 'https://bonhoeffermachines.com/en/public/parts-category/24_repuestos-de-caja-de-engranaje.png',
      'mounting': 'https://bonhoeffermachines.com/en/public/parts-category/25_montaje.png',
      'ignition-coil': 'https://bonhoeffermachines.com/en/public/parts-category/26_bobina-de-encendido.png',
      'crankshaft': 'https://bonhoeffermachines.com/en/public/parts-category/27_ciguenal.png',
      'brush-cutter-shaft': 'https://bonhoeffermachines.com/en/public/parts-category/28_eje-para-motoguadana.png',
      '2-3-teeth-blades': 'https://bonhoeffermachines.com/en/public/parts-category/29_cuchillas-de-2-3-dientes-para-motoguadana.png',
      'round-blades': 'https://bonhoeffermachines.com/en/public/parts-category/30_cuchillas-redondas-para-motoguadana.png',
      'rubber-parts': 'https://bonhoeffermachines.com/en/public/parts-category/31_partes-de-goma-motosierra-china.png',
      'bearings': 'https://bonhoeffermachines.com/en/public/parts-category/40_rodamientos-baleeros.png',
      'chain-accessories': 'https://bonhoeffermachines.com/en/public/parts-category/41_accesorios-de-cadena-de-motosierra.png',
      'spark-plugs': 'https://bonhoeffermachines.com/en/public/parts-category/42_bujias.png',
      'irrigation-hose': 'https://bonhoeffermachines.com/en/public/parts-category/32_manguera-de-riego.png',
      'expandable-garden-hose': 'https://bonhoeffermachines.com/en/public/parts-category/33_mangeura-de-jardin-expandible.png',
      'aluminum-couplings': 'https://bonhoeffermachines.com/en/public/parts-category/34_acoples-aluminio.png',
      'aluminum-coupling-joint': 'https://bonhoeffermachines.com/en/public/parts-category/35_junta-de-acoplamiento-de-aluminio.png',
      'professional-harness': 'https://bonhoeffermachines.com/en/public/parts-category/36_arnes-profesional-para-motoguadana.png',
      'lawn-mower-wheels': 'https://bonhoeffermachines.com/en/public/parts-category/37_llantas-para-cortacesped.png',
      'high-pressure-spray-hose': 'https://bonhoeffermachines.com/en/public/parts-category/38_manguera-de-fumigacion-de-alta-presion.png',
      'spraying-parts': 'https://bonhoeffermachines.com/en/public/parts-category/39_repuestos-de-fumigacion.png',
      'air-gun': 'https://bonhoeffermachines.com/en/public/parts-category/44_pistola-de-aire.png',
      'garden-tools': 'https://bonhoeffermachines.com/en/public/parts-category/47_herramient-as-de-jardin.png',
      'long-tail-propeller': 'https://bonhoeffermachines.com/en/public/parts-category/48_helice-de-cola-larga.png',
      'eye-protection': 'https://bonhoeffermachines.com/en/public/parts-category/49_proteccion-para-los-ojos.png',
      'head-protection-helmet': 'https://bonhoeffermachines.com/en/public/parts-category/50_proteccion-para-la-cabeza-combinacion-de-casco.png',
      'drill': 'https://bonhoeffermachines.com/en/public/parts-category/51_drill.png',
      'respiratory-protection': 'https://bonhoeffermachines.com/en/public/parts-category/51_proteccion-respiratoria.png',
      'electrodes-wire': 'https://bonhoeffermachines.com/en/public/parts-category/52_electrodes-and-wire.png',
      'face-protection': 'https://bonhoeffermachines.com/en/public/parts-category/53_protección-facial.png'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png';
  };

  // Get similar parts for the slider
  const getSimilarParts = (currentSlug) => {
    const allParts = [
      { name: 'Piston Kit', slug: 'piston-kit', image: 'https://bonhoeffermachines.com/en/public/parts-category/1_kit-de-piston.png' },
      { name: 'Carburetor', slug: 'carburetor', image: 'https://bonhoeffermachines.com/en/public/parts-category/3_carburetor.png' },
      { name: 'Air Filter', slug: 'air-filter', image: 'https://bonhoeffermachines.com/en/public/parts-category/16_filtro-de-aire.png' },
      { name: 'Spark Plugs', slug: 'spark-plugs', image: 'https://bonhoeffermachines.com/en/public/parts-category/42_bujias.png' },
      { name: 'Starter', slug: 'starter', image: 'https://bonhoeffermachines.com/en/public/parts-category/13_arrancador.png' },
      { name: 'Chainsaw Chain', slug: 'chainsaw-chain', image: 'https://bonhoeffermachines.com/en/public/parts-category/5_cadena-de-motosierra.png' },
      { name: 'Oil Pump', slug: 'oil-pump', image: 'https://bonhoeffermachines.com/en/public/parts-category/18_bomba-de-aciete.png' },
      { name: 'Ignition Coil', slug: 'ignition-coil', image: 'https://bonhoeffermachines.com/en/public/parts-category/26_bobina-de-encendido.png' }
    ];
    
    return allParts.filter(part => part.slug !== currentSlug);
  };

  const modelDetails = getModelDetails(slug, model);
  const partImage = getPartImage(slug);
  const similarParts = getSimilarParts(slug);

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % similarParts.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [similarParts.length]);

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />
      
      {/* Hero Section */}
      <section className=" flex items-center justify-center overflow-hidden mt-5">
        <div className="">
          <img
            src="https://bonhoeffermachines.com/en/public/images/spare-parts-banner-india.webp"
            alt="Spare Parts Banner"
            // fill
            className="object-cover"
            // priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* <motion.div 
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
          
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Model: {modelDetails.code}
          </motion.p>
        </motion.div> */}
      </section>

      {/* Product Details Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Product Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                <Image
                  // src={"https://bonhoeffermachines.com/en/public/parts/"+slug+"/"+model.toUpperCase()+".webp"}
                  src={modelDetails.image || partImage}
                  alt={modelDetails.name}
                  fill
                  className="object-contain p-8 bg-white"
                />
              </div>
            </motion.div>

            {/* Right Side - Product Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {modelDetails.name}
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                  {/* <span className="text-2xl font-bold text-[#989b2e]">{modelDetails.price}</span> */}
                  {/* <span className="text-sm text-gray-400 bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {modelDetails.code}
                  </span> */}
                </div>
                <p className="text-lg text-gray-300">
                  {modelDetails.compatible}
                </p>
              </div>

              {/* Product Details Cards */}
              {Array.isArray(modelDetails.details) ? (
                <div className="grid grid-cols-2 gap-4">
                  {modelDetails.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                    >
                      <h4 className="text-[#989b2e] text-sm font-medium mb-2">{detail.label}</h4>
                      <p className="text-white font-semibold">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {modelDetails.brand && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <h4 className="text-[#989b2e] text-sm font-medium mb-2">Brand</h4>
                      <p className="text-white font-semibold">{modelDetails.brand}</p>
                    </div>
                  )}
                  {modelDetails.application && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <h4 className="text-[#989b2e] text-sm font-medium mb-2">Application</h4>
                      <p className="text-white font-semibold">{modelDetails.application}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Button */}
              <motion.div
                className="pt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
                >
                  Contact for Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar Spare Parts Infinite Scroller */}
      <section className="py-10 px-6 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
              Similar Spare Parts
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore other high-quality spare parts for your machinery
            </p>
          </motion.div>

          {/* Infinite Scrolling Slider */}
          <InfiniteSparePartsSlider parts={similarParts} />
        </div>
      </section>

      {/* Navigation */}
      <section className="pt-5 px-6 text-center">
        <div className="flex justify-center space-x-8">
          <Link 
            href={`/spare-parts/${slug}`}
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {getPartName(slug)} Models
          </Link>
          <Link 
            href="/spare-parts"
            className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            All Spare Parts
          </Link>
        </div>
      </section>
    </BgLayout>
  )
}

function InfiniteSparePartsSlider({ parts }) {
  const sliderRef = useRef(null);
  // Duplicate the parts array for seamless looping
  const displayParts = [...parts, ...parts];

  // Animation: move left continuously
  // We'll use a CSS keyframes animation for performance
  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={sliderRef}
        className="flex gap-8 animate-infinite-scroll"
        style={{ minWidth: '200%', willChange: 'transform' }}
      >
        {displayParts.map((part, idx) => (
          <div
            key={idx}
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer w-72 flex-shrink-0"
            onClick={() => window.location.href = `/spare-parts/${part.slug}`}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={part.image}
                alt={part.name}
                fill
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <h4 className="text-white text-lg font-semibold mb-1 text-center">
                {part.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ModelSpecificPage
