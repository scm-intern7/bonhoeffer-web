'use client'
import BgLayout from '@/components/templates/bgLayout'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function ProductPage() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Complete product categories with Spanish filenames converted to English
  const productCategories = [
    {
      id: 1,
      name: "Agro Industrial",
      products: [
        { name: "Gasoline Water Pump", slug: "gasoline-water-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_bomba-de-agua-gasolina.webp" },
        { name: "Diesel Water Pump", slug: "diesel-water-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_BOMBA_DE_AGUA_DE_DIESEL.webp" },
        { name: "Gasoline Engine", slug: "gasoline-engine", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2-gasoline-engine.webp" },
        { name: "Diesel Engine", slug: "diesel-engine", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_MOTOR_DE_DIESEL.webp" },
        { name: "Gasoline Tiller", slug: "gasoline-tiller", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5-gasoline-tiller.webp" },
        { name: "Mini Cultivator", slug: "mini-cultivator", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_MINI-CULTIVADOR-DE-GASOLIN.webp" }
      ]
    },
    {
      id: 2,
      name: "Garden and Forestry",
      products: [
        { name: "Brush Cutter", slug: "brush-cutter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_DESBROZADORA.webp" },
        { name: "Backpack Brush Cutter", slug: "backpack-brush-cutter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_DESBROZADORA_DE_MOCHILA.webp" },
        { name: "Chainsaw", slug: "chainsaw", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_MOTOSIERRA.webp" },
        { name: "Hedge Trimmer", slug: "hedge-trimmer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_CORTAZETOS.webp" },
        { name: "Lawn Mower", slug: "lawn-mower", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/10_CORTACAPED.webp" },
        { name: "Leaf Blower", slug: "leaf-blower", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/6_SOPLADORA.webp" },
        { name: "Multi Tool", slug: "multi-tool", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_MULTIFUNCIONAL.webp" }
      ]
    },
    {
      id: 3,
      name: "Diesel Machines",
      products: [
        { name: "Diesel Generator", slug: "diesel-generator", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_GENERADOR_DE_DIESEL.webp" },
        { name: "Diesel Water Pump", slug: "diesel-water-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_BOMBA_DE_AGUA_DE_DIESEL.webp" },
        { name: "Diesel Engine", slug: "diesel-engine", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_MOTOR_DE_DIESEL.webp" }
      ]
    },
    {
      id: 4,
      name: "Electric Machines",
      products: [
        { name: "Electric Pressure Washer", slug: "electric-pressure-washer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_HIDROLAVADORA-DE-ELECTRICA.webp" },
        { name: "Electric Motors", slug: "electric-motors", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_electric-motors.webp" },
        { name: "Direct Driven Air Compressor", slug: "air-compressor", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_Direct-driven-air-compressor.webp" }
      ]
    },
    {
      id: 5,
      name: "Solar",
      products: [
        { name: "Solar Panel", slug: "solar-panel", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_PANEL_SOLAR.webp" },
        { name: "Solar Water Pump", slug: "solar-water-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_BOMBA_DE_SOLAR.webp" }
      ]
    },
    {
      id: 6,
      name: "Sprayers and Fumigation",
      products: [
        { name: "Gasoline Sprayer", slug: "gasoline-sprayer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_FUMIGADORA_DE_GASOLINA.webp" },
        { name: "Manual Sprayer", slug: "manual-sprayer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_FUMIGADORA_MANUAL.webp" },
        { name: "Backpack Atomizer", slug: "backpack-atomizer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_ATOMIZADOR_DE_MOCHILA.webp" },
        { name: "Mistduster", slug: "mistduster", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_NEBULIZADOR.webp" }
      ]
    },
    {
      id: 7,
      name: "Domestic and Commercial",
      products: [
        { name: "Gasoline Generator", slug: "gasoline-generator", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_GENERADOR-DE-GASOLINA.webp" },
        { name: "Gasoline Inverter", slug: "gasoline-inverter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_INVERSOR-DE-GASOLINA.webp" },
        { name: "Pressure Washer", slug: "pressure-washer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_HIDROLAVADORA-DE-GASOLINA.webp" },
        { name: "Domestic Pressure Washer", slug: "domestic-pressure-washer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_Domestic-pressure-washer.webp" },
        { name: "Commercial Vacuum", slug: "commercial-vacuum", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_ASPIRADORA-GRADO-COMERCIAL.webp" }
      ]
    },
    {
      id: 8,
      name: "Industrial",
      products: [
        { name: "Welding Machine", slug: "welding-machine", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_MAQUINAS-DE-SOLDAR.webp" },
        { name: "Centrifugal Pump", slug: "centrifugal-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_BOMBA-CENTR%C3%96FUGA.webp" },
        { name: "Submersible Pump", slug: "submersible-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_BOMBA-DE-SUMERGIBLE.webp" },
        { name: "2-Stroke Water Pump", slug: "2-stroke-water-pump", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/8_BOMBA_DE_AGUA_2_TIEMPO.webp" },
        { name: "2-Stroke Engine", slug: "2-stroke-engine", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/9_MOTOR_DE_2_TIEMPOS.webp" }
      ]
    },
    {
      id: 9,
      name: "Construction",
      products: [
        { name: "Tamping Rammer", slug: "tamping-rammer", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1_MARCOS-DE-APISONAMIENTO.webp" },
        { name: "Plate Compactor", slug: "plate-compactor", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2_PLATO-COMPACTADOR.webp" },
        { name: "Concrete Cutter", slug: "concrete-cutter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3_concrete-cutter.webp" },
        { name: "Concrete Vibrator", slug: "concrete-vibrator", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4_concrete-vibrator.webp" },
        { name: "Power Trowel", slug: "power-trowel", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5_PODER-CONCRETO-PALETA.webp" }
      ]
    },
    {
      id: 10,
      name: "Tools",
      products: [
        { name: "Earth Auger", slug: "earth-auger", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7_BARRENA_DE_TIERRA.webp" },
        { name: "Garden Tools", slug: "garden-tools", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/garden-tools.webp" },
        { name: "Hand Tools", slug: "hand-tools", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/hand-tools-home.webp" }
      ]
    },
    {
      id: 11,
      name: "Wood Chipper and Chaff Cutter",
      products: [
        { name: "Wood Chipper", slug: "wood-chipper", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/wood-chipper-home.webp" },
        { name: "Chaff Cutter", slug: "chaff-cutter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/chaff-cutter.webp" }
      ]
    },
    {
      id: 12,
      name: "Special Segment",
      products: [
        { name: "Log Splitter", slug: "log-splitter", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/log-splitter-home.webp" },
        { name: "Mini Dumper", slug: "mini-dumper", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/mini-dumper-home.webp" },
        { name: "Trencher", slug: "trencher", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/trencher-home.webp" },
        { name: "AC Professional", slug: "ac-professional", image: "https://9lhi1aprmhe38img.public.blob.vercel-storage.com/ac-professional-home.webp" }
      ]
    }
  ];

  // Dropdown timeout handlers
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowDropdown(true);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 1000); // 2 second delay
    setDropdownTimeout(timeout);
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://9lhi1aprmhe38img.public.blob.vercel-storage.com/product-banner.webp"
            alt="Products Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our <span className="text-[#989b2e]">Products</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Comprehensive Range of Professional Machinery & Equipment
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Access Dropdown */}
      <section className="relative py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative inline-block">
            <motion.div
              className="bg-[#989b2e] text-white px-6 py-3 rounded-lg cursor-pointer shadow-lg"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">Quick Product Access</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <motion.div
                className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-200 z-50 min-w-[800px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Categories List */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-100 mb-4">Categories</h3>
                      {productCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-[#989b2e] hover:text-white"
                          onMouseEnter={() => setHoveredCategory(category.id)}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>

                    {/* Products for Hovered Category */}
                    <div className="col-span-2">
                      {hoveredCategory && (
                        <div>
                          <h3 className="font-bold text-gray-100 mb-4">
                            {productCategories.find(cat => cat.id === hoveredCategory)?.name} Products
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {productCategories
                              .find(cat => cat.id === hoveredCategory)
                              ?.products.map((product, index) => (
                                <Link
                                  key={index}
                                  href={`/product/${product.slug}`}
                                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#989b2e] transition-colors"
                                >
                                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-200">
                                    {product.name}
                                  </span>
                                </Link>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Introduction Text */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Professional Machinery for <span className="text-[#989b2e]">Every Application</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              From agricultural equipment to industrial machinery, our comprehensive product range covers 
              every aspect of professional work. Each category features cutting-edge technology, robust 
              construction, and reliable performance to meet the demands of modern industry. Explore our 
              extensive collection designed for professionals who demand excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Sections */}
      {productCategories.map((category, categoryIndex) => (
        <section key={category.id} className={`py-20 px-6 ${categoryIndex % 2 === 1 ? 'bg-black/20' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#989b2e]">
                {category.name}
              </h2>
            </motion.div>

            {/* Product Slider */}
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
                {category.products.map((product, index) => (
                  <Link
                    key={index}
                    href={`/product/${product.slug}`}
                    className="flex-shrink-0 w-80"
                  >
                    <motion.div
                      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
                    >
                      <div className="relative h-96 mb-6 rounded-xl overflow-hidden bg-white">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#989b2e] transition-colors text-center">
                        {product.name}
                      </h3>
                      
                      <div className="text-center">
                        <span className="inline-flex items-center text-[#989b2e] font-medium">
                          View Models
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-20 px-6 bg-[#989b2e]/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Our technical experts are here to help you find the perfect machinery for your specific needs. 
              Contact us for personalized recommendations and professional guidance.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
            >
              Contact Our Experts
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default ProductPage