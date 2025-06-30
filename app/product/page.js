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

  // Product categories and products, hardcoded from product page.csv
  const productCategories = [
    {
      id: 1,
      name: "Agro Industrial",
      products: [
        { name: "Gasoline Water Pump", slug: "gasoline-water-pump", image: "https://bonhoeffermachines.com/public/images/segment/1_bomba-de-agua-gasolina.webp" },
        { name: "Gasoline Engine", slug: "gasoline-engine", image: "https://bonhoeffermachines.com/public/images/segment/2_MOTOR-DE-GASOLINA.webp" },
        { name: "Gasoline Generator", slug: "gasoline-generator", image: "https://bonhoeffermachines.com/public/images/segment/3_GENERADOR-DE-GASOLINA.webp" },
        { name: "Gasoline Inverter", slug: "gasoline-inverter", image: "https://bonhoeffermachines.com/public/images/segment/4_INVERSOR-DE-GASOLINA.webp" },
        { name: "Tiller", slug: "gasoline-tiller", image: "https://bonhoeffermachines.com/public/images/segment/5_MINI-CULTIVADOR-DE-GASOLIN.webp" }
      ]
    },
    {
      id: 2,
      name: "Garden And Forestry",
      products: [
        { name: "Earth Auger", slug: "earth-auger", image: "https://bonhoeffermachines.com/public/images/segment/7_BARRENA_DE_TIERRA.webp" },
        { name: "Water Pump 2 Stroke", slug: "water-pump-2-stroke", image: "https://bonhoeffermachines.com/public/images/segment/8_BOMBA_DE_AGUA_2_TIEMPO.webp" },
        { name: "Engine 2 Strokes", slug: "engine-2-stroke", image: "https://bonhoeffermachines.com/public/images/segment/9_MOTOR_DE_2_TIEMPOS.webp" },
        { name: "Lawn Mower", slug: "lawn-mower", image: "https://bonhoeffermachines.com/public/images/segment/10_CORTAC%E5%BF%83PED.webp" },
        { name: "Brush Cutter", slug: "brush-cutter", image: "https://bonhoeffermachines.com/public/images/segment/1_DESBROZADORA.webp" },
        { name: "Backpack Brush Cutter", slug: "backpack-brush-cutter", image: "https://bonhoeffermachines.com/public/images/segment/2_DESBROZADORA_DE_MOCHILA.webp" },
        { name: "Multi Tool", slug: "multi-tool", image: "https://bonhoeffermachines.com/public/images/segment/3_MULTIFUNCIONAL.webp" },
        { name: "Chainsaw", slug: "chainsaw", image: "https://bonhoeffermachines.com/public/images/segment/4_MOTOSIERRA.webp" },
        { name: "Hedge Trimmer", slug: "hedge-trimmer", image: "https://bonhoeffermachines.com/public/images/segment/5_CORTAZETOS.webp" },
        { name: "Blower", slug: "blower", image: "https://bonhoeffermachines.com/public/images/segment/6_SOPLADORA.webp" }
      ]
    },
    {
      id: 3,
      name: "Diesel Machines",
      products: [
        { name: "Diesel Water Pump", slug: "diesel-water-pump", image: "https://bonhoeffermachines.com/public/images/segment/1_BOMBA_DE_AGUA_DE_DIESEL.webp" },
        { name: "Diesel Generator", slug: "diesel-generator", image: "https://bonhoeffermachines.com/public/images/segment/2_GENERADOR_DE_DIESEL.webp" },
        { name: "Diesel Engine", slug: "diesel-engine", image: "https://bonhoeffermachines.com/public/images/segment/3_MOTOR_DE_DIESEL.webp" }
      ]
    },
    {
      id: 4,
      name: "Electric Machine",
      products: [
        { name: "Electric Lawn Mower", slug: "electric", image: "https://bonhoeffermachines.com/public/images/segment/10_CORTAC%E5%BF%83PED.webp" },
        { name: "Electric Pressure Washer", slug: "electric-pressure-washer", image: "https://bonhoeffermachines.com/public/images/segment/1_HIDROLAVADORA-DE-ELECTRICA.webp" }
      ]
    },
    {
      id: 5,
      name: "Solar",
      products: [
        { name: "Panel Solar", slug: "solar-panel", image: "https://bonhoeffermachines.com/public/images/segment/1_PANEL_SOLAR.webp" },
        { name: "Submersible Pump", slug: "submersible-pump", image: "https://bonhoeffermachines.com/public/images/segment/2_BOMBA_DE_SOLAR.webp" }
      ]
    },
    {
      id: 6,
      name: "Sprayers And Fumigation",
      products: [
        { name: "Knapsack Sprayer", slug: "knapsack-sprayer", image: "https://bonhoeffermachines.com/public/images/segment/1_FUMIGADORA_DE_GASOLINA.webp" },
        { name: "Manual Sprayer", slug: "manual-sprayer", image: "https://bonhoeffermachines.com/public/images/segment/2_FUMIGADORA_MANUAL.webp" },
        { name: "Mist Duster", slug: "mistduster", image: "https://bonhoeffermachines.com/public/images/segment/4_ATOMIZADOR_DE_MOCHILA.webp" },
        { name: "Thermal Fogger", slug: "thermal-fogger", image: "https://bonhoeffermachines.com/public/images/segment/5_NEBULIZADOR.webp" }
      ]
    },
    {
      id: 7,
      name: "Domestic And Commercial",
      products: [
        { name: "Gasoline Pressure Washer", slug: "gasoline-pressure-washer", image: "https://bonhoeffermachines.com/public/images/segment/2_HIDROLAVADORA-DE-GASOLINA.webp" },
        { name: "Pressure Washer Home Use", slug: "pressure-washer-home-use", image: "https://bonhoeffermachines.com/public/images/segment/3_Domestic-pressure-washer.webp" },
        { name: "Direct Driven Air Compressor", slug: "direct-driven-air-compressor", image: "https://bonhoeffermachines.com/public/images/segment/4_Direct-driven-air-compressor.webp" },
        { name: "Vacuum Cleaner Commercial Grade", slug: "vacuum-cleaner", image: "https://bonhoeffermachines.com/public/images/segment/5_ASPIRADORA-GRADO-COMERCIAL.webp" }
      ]
    },
    {
      id: 8,
      name: "Industrial",
      products: [
        { name: "Electric Motors", slug: "electric-motor", image: "https://bonhoeffermachines.com/en/public/images/segment/2_electric-motors.webp" },
        { name: "Centrifugal Pump", slug: "centrifugal-pump", image: "https://bonhoeffermachines.com/en/public/images/segment/4_BOMBA-CENTRO%CC%88FUGA.webp" },
        { name: "Submersible Pump", slug: "submersible-pump", image: "https://bonhoeffermachines.com/public/images/segment/5_BOMBA-DE-SUMERGIBLE.webp" },
        { name: "Welding Machines", slug: "welding-machines", image: "https://bonhoeffermachines.com/en/public/images/segment/1_MAQUINAS-DE-SOLDAR.webp" }
      ]
    },
    {
      id: 9,
      name: "Construction",
      products: [
        { name: "Plate Compactor", slug: "plate-compactor", image: "https://bonhoeffermachines.com/public/images/segment/2_PLATO-COMPACTADOR.webp" },
        { name: "Concrete Cutter", slug: "concrete-cutter", image: "https://bonhoeffermachines.in/public/images/segment/3_concrete-cutter.webp" },
        { name: "Concrete Vibrator", slug: "concrete-vibrator", image: "https://bonhoeffermachines.in/public/images/segment/4_concrete-vibrator.webp" },
        { name: "Concrete Power Trowel", slug: "concrete-power-trowel", image: "https://bonhoeffermachines.com/public/images/segment/5_PODER-CONCRETO-PALETA.webp" },
        { name: "Tamping Rammer", slug: "tamping-rammer", image: "https://bonhoeffermachines.com/public/images/segment/1_MARCOS-DE-APISONAMIENTO.webp" }
      ]
    },
    {
      id: 10,
      name: "Tools",
      products: [
        { name: "Power Tools", slug: "power-tools", image: "https://bonhoeffermachines.com/public/images/segment/ac-professional-home.webp" },
        { name: "Hand Tools", slug: "hand-tools", image: "https://bonhoeffermachines.com/public/images/segment/hand-tools-home.webp" },
        { name: "Garden Tools", slug: "garden-tools", image: "https://bonhoeffermachines.com/public/images/segment/garden-tools.webp" }
      ]
    },
    {
      id: 11,
      name: "Wood Chipper And Chaff Cutter",
      products: [
        { name: "Wood Chipper", slug: "wood-chipper", image: "https://bonhoeffermachines.com/public/images/segment/wood-chipper-home.webp" },
        { name: "Corn Thresher & Chaff Cutter", slug: "corn-thresher-chaff-cutter", image: "https://bonhoeffermachines.com/public/images/segment/chaff-cutter.webp" }
      ]
    },
    {
      id: 12,
      name: "Special Segment",
      products: [
        { name: "Trencher", slug: "trencher", image: "https://bonhoeffermachines.com/public/images/segment/trencher-home.webp" },
        { name: "Leaf Blower", slug: "leaf-blower", image: "https://bonhoeffermachines.com/public/images/segment/leaf-blower-home.webp" },
        { name: "Mini Dumper", slug: "mini-dumper", image: "https://bonhoeffermachines.com/public/images/segment/mini-dumper-home.webp" },
        { name: "Log Splitter", slug: "log-splitter", image: "https://bonhoeffermachines.com/public/images/segment/log-splitter-home.webp" }
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
    }, 300); // 0.3 second delay
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

  // Product Categories Sections
  const [sliderIndices, setSliderIndices] = React.useState(
    productCategories.map(() => 0)
  );
  const productsPerView = 3;
  const autoSlideInterval = React.useRef([]);

  React.useEffect(() => {
    // Clear all intervals on unmount
    return () => {
      autoSlideInterval.current.forEach(clearInterval);
    };
  }, []);

  React.useEffect(() => {
    // Set up auto-slide for each category
    productCategories.forEach((cat, catIdx) => {
      if (cat.products.length > productsPerView) {
        if (autoSlideInterval.current[catIdx]) clearInterval(autoSlideInterval.current[catIdx]);
        autoSlideInterval.current[catIdx] = setInterval(() => {
          setSliderIndices(prev => {
            const updated = [...prev];
            const maxIdx = Math.max(0, cat.products.length - productsPerView);
            updated[catIdx] = prev[catIdx] >= maxIdx ? 0 : prev[catIdx] + 1;
            return updated;
          });
        }, 4000);
      }
    });
    // Cleanup on category/product change
    return () => {
      autoSlideInterval.current.forEach(clearInterval);
    };
  }, [productCategories, productsPerView]);

  // Move these functions above the return statement so they are defined before use
  const handleNext = (catIdx, maxIdx) => {
    setSliderIndices(prev => {
      const updated = [...prev];
      updated[catIdx] = prev[catIdx] >= maxIdx ? 0 : prev[catIdx] + 1;
      return updated;
    });
  };
  const handlePrev = (catIdx, maxIdx) => {
    setSliderIndices(prev => {
      const updated = [...prev];
      updated[catIdx] = prev[catIdx] <= 0 ? maxIdx : prev[catIdx] - 1;
      return updated;
    });
  };

  // Responsive state for products per view and card width
  const [responsive, setResponsive] = React.useState({ productsPerView: 3, cardWidth: 340, cardHeight: 510, imageHeight: 440, imageWidth: 280 });

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setResponsive({ productsPerView: 1, cardWidth: 260, cardHeight: 380, imageHeight: 260, imageWidth: 180 });
      } else if (window.innerWidth < 1024) {
        setResponsive({ productsPerView: 2, cardWidth: 300, cardHeight: 440, imageHeight: 320, imageWidth: 210 });
      } else {
        setResponsive({ productsPerView: 3, cardWidth: 340, cardHeight: 510, imageHeight: 440, imageWidth: 260 });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[32vh] sm:min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.in/public/images/product-banner.webp"
            alt="Products Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-4 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-3xl xs:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our <span className="text-[#989b2e]">Products</span>
          </motion.h1>
          
          <motion.p 
            className="text-base xs:text-lg md:text-2xl max-w-2xl md:max-w-4xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Comprehensive Range of Professional Machinery & Equipment
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Access Dropdown - hidden on mobile */}
      <section className="relative py-6 sm:py-8 px-2 sm:px-6 hidden sm:block">
        <div className="max-w-7xl mx-auto">
          <div className="relative inline-block">
            <motion.div
              className="bg-[#989b2e] text-white px-4 sm:px-6 py-3 rounded-lg cursor-pointer shadow-lg w-full max-w-xs sm:max-w-none"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 justify-center">
                <span className="font-medium">Quick Product Access</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
            {/* Dropdown Menu */}
            {showDropdown && (
              <motion.div
                className="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-[#989b2e] z-50 w-full max-w-2xl sm:min-w-[800px] overflow-x-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {/* Categories List */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-100 mb-2 sm:mb-4">Categories</h3>
                      {productCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-[#989b2e] hover:text-white text-sm sm:text-base"
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
                          <h3 className="font-bold text-gray-100 mb-2 sm:mb-4">
                            {productCategories.find(cat => cat.id === hoveredCategory)?.name} Products
                          </h3>
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                            {productCategories
                              .find(cat => cat.id === hoveredCategory)
                              ?.products.map((product, index) => (
                                <Link
                                  key={index}
                                  href={`/product/${product.slug}`}
                                  className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-[#989b2e] transition-colors"
                                >
                                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden">
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <span className="text-xs sm:text-sm font-medium text-gray-200">
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
      <section className="py-8 sm:py-16 px-2 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-8">
              Professional Machinery for <span className="text-[#989b2e]">Every Application</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl md:max-w-4xl mx-auto">
              From agricultural equipment to industrial machinery, our comprehensive product range covers every aspect of professional work. Each category features cutting-edge technology, robust construction, and reliable performance to meet the demands of modern industry. Explore our extensive collection designed for professionals who demand excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Sections */}
      {productCategories.map((category, categoryIndex) => {
        const maxIndex = Math.max(0, category.products.length - responsive.productsPerView);
        const currentIndex = sliderIndices[categoryIndex] || 0;
        return (
          <section key={category.id} className={`py-6 sm:py-10 px-2 sm:px-6`}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-6 sm:mb-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#989b2e]" id={`category-${category.id}`}>
                  {category.name}
                </h2>
              </motion.div>
              {/* Product Slider */}
              <div className="relative">
                {/* Navigation Arrows */}
                {category.products.length > responsive.productsPerView && (
                  <div className="absolute right-0 -top-10 flex space-x-2 z-10">
                    <button
                      onClick={() => handlePrev(categoryIndex, maxIndex)}
                      className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300"
                      aria-label="Previous"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleNext(categoryIndex, maxIndex)}
                      className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300"
                      aria-label="Next"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                      </svg>
                    </button>
                  </div>
                )}
                <div className="overflow-hidden py-4">
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      width: `${category.products.length * responsive.cardWidth + (category.products.length - 1) * 16}px`,
                      transform: `translateX(-${currentIndex * (responsive.cardWidth + 16)}px)`
                    }}
                  >
                    {category.products.map((product, index) => (
                      <Link
                        key={index}
                        href={`/product/${product.slug}`}
                        className="flex-shrink-0 mr-4 last:mr-0"
                        style={{ width: `${responsive.cardWidth}px`, height: `${responsive.cardHeight}px` }}
                      >
                        <motion.div
                          className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.01 }}
                          whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(152, 155, 46, 0.1)' }}
                        >
                          <div className="relative mb-4 sm:mb-6 rounded-xl overflow-hidden bg-white flex-1 flex items-center justify-center"
                            style={{ height: `${responsive.imageHeight}px`, width: `${responsive.imageWidth}px`, margin: '0 auto' }}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <h3 className="text-base sm:text-xl font-bold text-white my-2 sm:my-4 group-hover:text-[#989b2e] transition-colors text-center">
                            {product.name}
                          </h3>
                          <div className="text-center">
                            <span className="inline-flex items-center text-[#989b2e] font-medium text-xs sm:text-base">
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
            </div>
          </section>
        );
      })}

      {/* Call to Action */}
      <section className="py-10 sm:py-20 px-2 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Need Help Choosing the Right Product?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Our technical experts are here to help you find the perfect machinery for your specific needs. Contact us for personalized recommendations and professional guidance.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
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