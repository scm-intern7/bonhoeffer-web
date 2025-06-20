'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ModelSpecificPage() {
  const params = useParams();
  const { slug, model } = params;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get model details based on slug and model code
  const getModelDetails = (partSlug, modelCode) => {
    const modelDetails = {
      'piston-kit': {
        'pk-45-001': {
          name: 'Universal Piston Kit 45mm',
          compatible: 'Chainsaw Models: CS-4500, CS-5200',
          price: '$45',
          code: 'PK-45-001',
          details: [
            { label: 'Cylinder Bore', value: '45mm' },
            { label: 'Material', value: 'High-Grade Aluminum' },
            { label: 'Ring Type', value: 'Chrome Plated' },
            { label: 'Warranty', value: '12 Months' },
            { label: 'Application', value: 'Professional Use' },
            { label: 'Weight', value: '280g' }
          ]
        },
        'pk-52-002': {
          name: 'Heavy Duty Piston Kit 52mm',
          compatible: 'Chainsaw Models: CS-5800, CS-6200',
          price: '$65',
          code: 'PK-52-002',
          details: [
            { label: 'Cylinder Bore', value: '52mm' },
            { label: 'Material', value: 'Forged Aluminum' },
            { label: 'Ring Type', value: 'Ceramic Coated' },
            { label: 'Warranty', value: '18 Months' },
            { label: 'Application', value: 'Heavy Duty' },
            { label: 'Weight', value: '320g' }
          ]
        }
      },
      'carburetor': {
        'cb-std-001': {
          name: 'Standard Carburetor',
          compatible: 'Brush Cutters: BC-260, BC-330',
          price: '$35',
          code: 'CB-STD-001',
          details: [
            { label: 'Type', value: 'Diaphragm Carburetor' },
            { label: 'Fuel Type', value: 'Gasoline Mix' },
            { label: 'Adjustment', value: 'High/Low Speed' },
            { label: 'Warranty', value: '6 Months' },
            { label: 'Application', value: 'Standard Use' },
            { label: 'Weight', value: '150g' }
          ]
        }
      }
    };

    // Default model details
    const defaultDetails = {
      name: `${getPartName(partSlug)} Model`,
      compatible: 'Compatible with most machinery models',
      price: '$50',
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

    return modelDetails[partSlug]?.[modelCode] || defaultDetails;
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
      'piston-kit': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_kit-de-piston.png',
      'piston-rings': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_anillos-de-piston.png',
      'carburetor': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_carburetor.png',
      'carburetor-repair-kit': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_kit-de-reparacion-del-carburetor-.png',
      'chainsaw-chain': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_cadena-de-motosierra.png',
      'fuel-hose-primer-bulb': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_manguera-combustible-_-bulbo-de-imprimacion.png',
      'cylinder-kit': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7_kit-de-cilindro.png',
      'brush-cutter-head': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/8_cabezal-de-motoguadana.png',
      'head-spare-parts': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/9_repuestos-de-cabezal.png',
      'brush-cutter-nylon': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/10_nyon-de-motoguadana.png',
      'chainsaw-bar': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/11_espada-de-motosierra.png',
      'hard-tip-bar': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/12_espada-con-punta-dura.png',
      'starter': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/13_arrancador.png',
      'starter-rope': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/14_cuerda-de-arranque.png',
      'metal-wire-rope': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/15_cuerda-metallica-cuerda.png',
      'air-filter': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/16_filtro-de-aire.png',
      'fuel-filter': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/17_filtro-de-combustible.png',
      'oil-pump': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/18_bomba-de-aciete.png',
      'pinion': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/19_pinion.png',
      'pinion-with-rim': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/20_pinion-con-rim.png',
      'clutch-drum': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/21_emberague-tambor-de-emberague.png',
      'clutch-bell': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/22_campana-de-clutch.png',
      'gearbox': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/23_caja-de-engranaje.png',
      'gearbox-parts': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/24_repuestos-de-caja-de-engranaje.png',
      'mounting': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/25_montaje.png',
      'ignition-coil': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/26_bobina-de-encendido.png',
      'crankshaft': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/27_ciguenal.png',
      'brush-cutter-shaft': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/28_eje-para-motoguadana.png',
      '2-3-teeth-blades': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/29_cuchillas-de-2-3-dientes-para-motoguadana.png',
      'round-blades': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/30_cuchillas-redondas-para-motoguadana.png',
      'rubber-parts': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/31_partes-de-goma-motosierra-china.png',
      'bearings': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/40_rodamientos-baleeros.png',
      'chain-accessories': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/41_accesorios-de-cadena-de-motosierra.png',
      'spark-plugs': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/42_bujias.png',
      'irrigation-hose': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/32_manguera-de-riego.png',
      'expandable-garden-hose': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/33_mangeura-de-jardin-expandible.png',
      'aluminum-couplings': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/34_acoples-aluminio.png',
      'aluminum-coupling-joint': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/35_junta-de-acoplamiento-de-aluminio.png',
      'professional-harness': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/36_arnes-profesional-para-motoguadana.png',
      'lawn-mower-wheels': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/37_llantas-para-cortacesped.png',
      'high-pressure-spray-hose': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/38_manguera-de-fumigacion-de-alta-presion.png',
      'spraying-parts': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/39_repuestos-de-fumigacion.png',
      'air-gun': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/44_pistola-de-aire.png',
      'garden-tools': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/47_herramient-as-de-jardin.png',
      'long-tail-propeller': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/48_helice-de-cola-larga.png',
      'eye-protection': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/49_proteccion-para-los-ojos.png',
      'head-protection-helmet': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/50_proteccion-para-la-cabeza-combinacion-de-casco.png',
      'drill': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/51_drill.png',
      'respiratory-protection': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/51_proteccion-respiratoria.png',
      'electrodes-wire': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/52_electrodes-and-wire.png',
      'face-protection': 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/53_protección-facial.png'
    };
    return imageMap[slug] || 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_kit-de-piston.png';
  };

  // Get similar parts for the slider
  const getSimilarParts = (currentSlug) => {
    const allParts = [
      { name: 'Piston Kit', slug: 'piston-kit', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_kit-de-piston.png' },
      { name: 'Carburetor', slug: 'carburetor', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_carburetor.png' },
      { name: 'Air Filter', slug: 'air-filter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/16_filtro-de-aire.png' },
      { name: 'Spark Plugs', slug: 'spark-plugs', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/42_bujias.png' },
      { name: 'Starter', slug: 'starter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/13_arrancador.png' },
      { name: 'Chainsaw Chain', slug: 'chainsaw-chain', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_cadena-de-motosierra.png' },
      { name: 'Oil Pump', slug: 'oil-pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/18_bomba-de-aciete.png' },
      { name: 'Ignition Coil', slug: 'ignition-coil', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/26_bobina-de-encendido.png' }
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/spare-parts-banner-india.webp"
            alt="Spare Parts Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/70" /> */}
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Product Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                <Image
                  src={partImage}
                  alt={modelDetails.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>

            {/* Right Side - Product Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {modelDetails.name}
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold text-[#989b2e]">{modelDetails.price}</span>
                  <span className="text-sm text-gray-400 bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {modelDetails.code}
                  </span>
                </div>
                <p className="text-lg text-gray-300 mb-8">
                  {modelDetails.compatible}
                </p>
              </div>

              {/* Product Details Cards */}
              <div className="grid grid-cols-2 gap-4">
                {modelDetails.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h4 className="text-[#989b2e] text-sm font-medium mb-2">{detail.label}</h4>
                    <p className="text-white font-semibold">{detail.value}</p>
                  </motion.div>
                ))}
              </div>

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

      {/* Similar Spare Parts Slider */}
      <section className="py-20 px-6 ">
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

          {/* Continuous Slider */}
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div 
              className="flex space-x-6"
              animate={{ x: `${-currentSlide * 300}px` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ width: `${similarParts.length * 300}px` }}
            >
              {similarParts.map((part, index) => (
                <Link
                  key={index}
                  href={`/spare-parts/${part.slug}`}
                  className="flex-shrink-0 w-72"
                >
                  <motion.div
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
                  >
                    <div className="relative h-40 mb-4 rounded-xl overflow-hidden bg-white/5">
                      <Image
                        src={part.image}
                        alt={part.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#989b2e] transition-colors text-center">
                      {part.name}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {similarParts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-[#989b2e]' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-10 px-6 text-center">
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

export default ModelSpecificPage
