'use client';
import React, { useEffect, useState, useRef } from 'react';

// Complete list of all 43 products for full parallax experience
const products = [
  { id: 1, name: 'Gasoline Water Pump', image: '/home-products/1-gasoline-water-pump.webp', description: 'High-performance water pump for industrial and residential use' },
  { id: 2, name: 'Gasoline Engine', image: '/home-products/2-gasoline-engine.webp', description: 'Reliable gasoline engine with superior power output' },
  { id: 3, name: 'Gasoline Generator', image: '/home-products/3-gasoline-generator.webp', description: 'Portable power solution for all your energy needs' },
  { id: 4, name: 'Gasoline Inverter', image: '/home-products/4-gasoline-inverter.webp', description: 'Clean, stable power for sensitive electronics' },
  { id: 5, name: 'Gasoline Tiller', image: '/home-products/5-gasoline-tiller.webp', description: 'Professional-grade soil cultivation equipment' },
  { id: 6, name: 'EFI Machines', image: '/home-products/6-Gasoline-EFI-Machines.webp', description: 'Advanced fuel injection technology for maximum efficiency' },
  { id: 7, name: 'Brush Cutter', image: '/home-products/7-brush-cutter.webp', description: 'Heavy-duty cutting power for tough vegetation' },
  { id: 8, name: 'Backpack Brushcutter', image: '/home-products/8-bagpack-brushcutter.webp', description: 'Ergonomic design for extended professional use' },
  { id: 9, name: 'Multi Tool', image: '/home-products/9-multi-tool.webp', description: 'Versatile tool for multiple landscaping applications' },
  { id: 10, name: 'Chain Saw', image: '/home-products/10-chain-saw.webp', description: 'Professional chainsaw for forestry and construction' },
  { id: 11, name: 'Hedge Trimmer', image: '/home-products/11-hedge-trimmer.webp', description: 'Precision trimming for perfect hedge maintenance' },
  { id: 12, name: 'Blower', image: '/home-products/12-blower.webp', description: 'Powerful air movement for cleaning and maintenance' },
  { id: 13, name: 'Gasoline Lawn Mower', image: '/home-products/13-gasoline-lawn-mower.webp', description: 'Professional lawn care with precision cutting' },
  { id: 14, name: 'Earth Auger', image: '/home-products/14-earth-auger.webp', description: 'Powerful drilling solution for post holes and planting' },
  { id: 15, name: 'Electric Segment', image: '/home-products/15-electric-segment.webp', description: 'Eco-friendly electric power solutions' },
  { id: 16, name: 'Battery Segment', image: '/home-products/16-battery-segment.webp', description: 'Cordless convenience with long-lasting battery power' },
  { id: 17, name: 'Water Pump 2-Stroke', image: '/home-products/17-water-pump-2-stroke.webp', description: 'Lightweight 2-stroke water pump for efficient operation' },
  { id: 18, name: 'Engine 2-Stroke', image: '/home-products/18-engine-2-stroke.webp', description: 'Compact 2-stroke engine for maximum power-to-weight ratio' },
  { id: 19, name: 'Diesel Water Pump', image: '/home-products/19-diesel-water-pump.webp', description: 'Heavy-duty diesel water pump for industrial applications' },
  { id: 20, name: 'Diesel Generator', image: '/home-products/20-diesel-generator.webp', description: 'Reliable diesel power generation for continuous operation' },
  { id: 21, name: 'Diesel Engine', image: '/home-products/21-diesel-engine.webp', description: 'Robust diesel engine with exceptional fuel efficiency' },
  { id: 22, name: 'Gasoline Pressure Washer', image: '/home-products/22-gasoline-pressure-washer.webp', description: 'High-pressure cleaning power for tough jobs' },
  { id: 23, name: 'Pressure Washer Home Use', image: '/home-products/23-pressure-washer-home-use.webp', description: 'Perfect pressure washing solution for home maintenance' },
  { id: 24, name: 'Direct Driven Air Compressor', image: '/home-products/24-direct-driven-air-compressor.webp', description: 'Efficient air compression for pneumatic tools' },
  { id: 25, name: 'Vacuum Cleaner', image: '/home-products/25-vaccum-cleaner.webp', description: 'Industrial-grade vacuum cleaning system' },
  { id: 26, name: 'Knapsack Sprayer', image: '/home-products/26-knapsack-sprayer.webp', description: 'Portable spraying solution for agricultural applications' },
  { id: 27, name: 'Manual Sprayer', image: '/home-products/27-manual-sprayer.webp', description: 'Precision manual spraying for targeted applications' },
  { id: 28, name: 'Electric Pressure Washer', image: '/home-products/28-electric-pressure-washer.webp', description: 'Electric-powered pressure washing for eco-friendly cleaning' },
  { id: 29, name: 'Stationary Fumigation', image: '/home-products/28-Stationary-Fumigation.webp', description: 'Fixed fumigation system for pest control' },
  { id: 30, name: 'Mist Duster', image: '/home-products/29-Mistduster.webp', description: 'Fine mist application for crop protection' },
  { id: 31, name: 'Thermal Fogger', image: '/home-products/30-Thermal-Fogger.webp', description: 'Thermal fogging for wide-area pest control' },
  { id: 32, name: 'Centrifugal Pump', image: '/home-products/31-Centrifugal-Pump.webp', description: 'High-efficiency centrifugal pumping system' },
  { id: 33, name: 'Submersible Pump', image: '/home-products/32-Submersible-Pump.webp', description: 'Underwater pumping solution for deep wells' },
  { id: 34, name: 'Solar Submersible Pump', image: '/home-products/33-Solar-Submersible-Pump.webp', description: 'Solar-powered submersible pump for sustainable water access' },
  { id: 35, name: 'Solar Panel', image: '/home-products/34-solar-pannel.webp', description: 'High-efficiency solar panels for renewable energy' },
  { id: 36, name: 'Tamping Rammer', image: '/home-products/35-tamping-rammer.webp', description: 'Soil compaction tool for construction projects' },
  { id: 37, name: 'Plate Compactor', image: '/home-products/36-plate-compactor.webp', description: 'Surface compaction for paving and construction' },
  { id: 38, name: 'Concrete Cutter', image: '/home-products/37-Concrete-cutter.webp', description: 'Precision cutting through concrete and stone' },
  { id: 39, name: 'Concrete Vibrator', image: '/home-products/38-concrete-vibrator.webp', description: 'Professional concrete consolidation equipment' },
  { id: 40, name: 'Power Trowel', image: '/home-products/39-power-trovel.webp', description: 'Smooth concrete finishing for professional results' },
  { id: 41, name: 'Welding Set', image: '/home-products/40-welding-set.webp', description: 'Complete welding solution for metal fabrication' },
  { id: 42, name: 'Bench Grinder', image: '/home-products/41-bench-grinder.webp', description: 'Precision grinding and sharpening workstation' },
  { id: 43, name: 'Drill Press', image: '/home-products/42-Drill-Press.webp', description: 'Precise drilling with professional accuracy' },
  { id: 44, name: 'Silent Generator', image: '/home-products/43-silent-generator.webp', description: 'Quiet power generation for noise-sensitive environments' },
];

const Products = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Get the top position of this section
    const updateSectionTop = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSectionTop(rect.top + window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial dimensions
    
    // Use timeout to ensure DOM is rendered
    setTimeout(updateSectionTop, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden " 
             style={{ minHeight: `${(products.length + 2) * 600}px` }}>
      {/* Section Title - Always Visible */}
      {/* <div className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent h-40 pointer-events-none">
        <div className="container mx-auto px-8 pt-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center">
            Our Products
          </h1>
        </div>
      </div> */}

      {/* Full-Screen Product Layers */}
      {products.map((product, index) => {
        const relativeScroll = scrollY - sectionTop;
        const productOffset = index * 600; // Distance between products (increased from 600 to 1200)
        const progress = (relativeScroll - productOffset) / 600; // Progress for this product
        
        // Calculate transforms for smooth parallax with safety checks
        const opacity = isNaN(progress) ? 0 : Math.max(0, Math.min(1, 1 - Math.abs(progress) * 1.5));
        // const scale = isNaN(progress) ? 1 : Math.max(0.8, 1 - Math.abs(progress) * 0.3);
        const scale = 1;
        const translateY = isNaN(progress) ? 0 : progress * -100; // Move up as we scroll
        const blur = isNaN(progress) ? 0 : Math.abs(progress) * 3; // Blur when not in focus
        
        return (
          <div
            key={product.id}
            className="fixed inset-0 w-full h-screen"
            style={{
              opacity: opacity || 0,
              transform: `translateY(${translateY || 0}px) scale(${scale || 1})`,
              zIndex: Math.round((opacity || 0) * 100),
            }}
          >
            {/* Product Image Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${product.image})`,
                filter: `blur(${blur || 0}px)`,
              }}
            />
            
            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/40" /> */}
            
            {/* Content Overlay - Fixed position on left middle */}
            <div className="absolute left-8 top-3/4 transform -translate-y-1/2 z-30 max-w-md">
              <div 
                className="bg-[#9a9c30] p-6 rounded-lg shadow-2xl"
                style={{ opacity: opacity || 0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {product.name}
                </h2>
                <p className="text-sm md:text-base text-green-100 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <button 
                  className="px-8 py-3 bg-white text-[#9a9c30] font-semibold rounded-full 
                           hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl 
                           transform hover:scale-105 cursor-pointer"
                >
                  Explore Product
                </button>
              </div>
            </div>

            {/* Product Number Indicator */}
            <div 
              className="absolute bottom-8 right-8 text-white/60 text-6xl font-bold"
              style={{ opacity: opacity || 0 }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Progress Indicator */}
            {/* <div 
              className="absolute left-8 top-1/2 transform -translate-y-1/2"
              style={{ opacity: opacity || 0 }}
            >
              <div className="w-1 h-64 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    height: `${Math.max(0, Math.min(100, (opacity || 0) * 100))}%`
                  }}
                />
              </div>
            </div> */}
          </div>
        );
      })}

      {/* Scroll Indicator - only show at beginning */}
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 text-white/60 animate-bounce"
        style={{
          opacity: sectionTop > 0 ? Math.max(0, 1 - (scrollY - sectionTop) / 400) : 0
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Final Product Sticky Section - to prevent footer overlap */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-screen z-20"
        style={{
          background: ``,
          display: sectionTop > 0 && (scrollY - sectionTop) > (products.length - 3) * 600 ? 'block' : 'none'
        }}
      >
        {/* Bottom CTA Section */}
        <div className="absolute bottom-32 left-0 right-0 z-30">
          <div className="container mx-auto px-8 text-center">
            <div className="mb-8">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Explore Our Complete Range
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Discover all {products.length} premium products designed for excellence
              </p>
            </div>
            <button className="px-16 py-6 bg-[#9a9c30] text-white font-bold text-xl rounded-full 
                           hover:bg-[#85870e] transition-all duration-300 shadow-2xl hover:shadow-3xl
                           transform hover:scale-105 cursor-pointer">
              View All Products
            </button>
          </div>
        </div>
      </div>

      {/* Extra spacing to prevent footer overlap */}
      <div className="h-96"></div>
    </section>
  );
};

export default Products;