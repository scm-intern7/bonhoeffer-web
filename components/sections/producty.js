import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Full product list from products.js
const products = [
  { id: 1, name: 'Gasoline Water Pump', image: 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp', description: 'High-performance water pump for industrial and residential use' },
  { id: 2, name: 'Gasoline Engine', image: 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp', description: 'Reliable gasoline engine with superior power output' },
  { id: 3, name: 'Gasoline Generator', image: 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp', description: 'Portable power solution for all your energy needs' },
  { id: 4, name: 'Gasoline Inverter', image: 'https://bonhoeffermachines.com/public/product_banner/4-gasoline-inverter.webp', description: 'Clean, stable power for sensitive electronics' },
  { id: 5, name: 'Gasoline Tiller', image: 'https://bonhoeffermachines.com/public/product_banner/5-gasoline-tiller.webp', description: 'Professional-grade soil cultivation equipment' },
  // { id: 6, name: 'EFI Machines', image: 'https://bonhoeffermachines.com/public/product_banner/6-Gasoline-EFI-Machines.webp', description: 'Advanced fuel injection technology for maximum efficiency' },
  { id: 7, name: 'Brush Cutter', image: 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp', description: 'Heavy-duty cutting power for tough vegetation' },
  { id: 8, name: 'Backpack Brushcutter', image: 'https://bonhoeffermachines.com/public/product_banner/8-bagpack-brushcutter.webp', description: 'Ergonomic design for extended professional use' },
  { id: 9, name: 'Multi Tool', image: 'https://bonhoeffermachines.com/public/product_banner/9-multi-tool.webp', description: 'Versatile tool for multiple landscaping applications' },
  { id: 10, name: 'Chain Saw', image: 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp', description: 'Professional chainsaw for forestry and construction' },
  { id: 11, name: 'Hedge Trimmer', image: 'https://bonhoeffermachines.com/public/product_banner/11-hedge-trimmer.webp', description: 'Precision trimming for perfect hedge maintenance' },
  { id: 12, name: 'Blower', image: 'https://bonhoeffermachines.com/public/product_banner/12-blower.webp', description: 'Powerful air movement for cleaning and maintenance' },
  { id: 13, name: 'Gasoline Lawn Mower', image: 'https://bonhoeffermachines.com/public/product_banner/13-gasoline-lawn-mower.webp', description: 'Professional lawn care with precision cutting' },
  { id: 14, name: 'Earth Auger', image: 'https://bonhoeffermachines.com/public/product_banner/14-earth-auger.webp', description: 'Powerful drilling solution for post holes and planting' },
  { id: 15, name: 'Electric Segment', image: 'https://bonhoeffermachines.com/public/product_banner/15-electric-segment.webp', description: 'Eco-friendly electric power solutions' },
  // { id: 16, name: 'Battery Segment', image: 'https://bonhoeffermachines.com/public/product_banner/16-battery-segment.webp', description: 'Cordless convenience with long-lasting battery power' },
  { id: 17, name: 'Water Pump 2-Stroke', image: 'https://bonhoeffermachines.com/public/product_banner/17-water-pump-2-stroke.webp', description: 'Lightweight 2-stroke water pump for efficient operation' },
  { id: 18, name: 'Engine 2-Stroke', image: 'https://bonhoeffermachines.com/public/product_banner/18-engine-2-stroke.webp', description: 'Compact 2-stroke engine for maximum power-to-weight ratio' },
  { id: 19, name: 'Diesel Water Pump', image: 'https://bonhoeffermachines.com/public/product_banner/19-diesel-water-pump.webp', description: 'Heavy-duty diesel water pump for industrial applications' },
  { id: 20, name: 'Diesel Generator', image: 'https://bonhoeffermachines.com/public/product_banner/20-diesel-generator.webp', description: 'Reliable diesel power generation for continuous operation' },
  { id: 21, name: 'Diesel Engine', image: 'https://bonhoeffermachines.com/public/product_banner/21-diesel-engine.webp', description: 'Robust diesel engine with exceptional fuel efficiency' },
  { id: 22, name: 'Gasoline Pressure Washer', image: 'https://bonhoeffermachines.com/public/product_banner/22-gasoline-pressure-washer.webp', description: 'High-pressure cleaning power for tough jobs' },
  { id: 23, name: 'Pressure Washer Home Use', image: 'https://bonhoeffermachines.com/public/product_banner/23-pressure-washer-home-use.webp', description: 'Perfect pressure washing solution for home maintenance' },
  { id: 24, name: 'Direct Driven Air Compressor', image: 'https://bonhoeffermachines.com/public/product_banner/24-direct-driven-air-compressor.webp', description: 'Efficient air compression for pneumatic tools' },
  { id: 25, name: 'Vacuum Cleaner', image: 'https://bonhoeffermachines.com/public/product_banner/25-vaccum-cleaner.webp', description: 'Industrial-grade vacuum cleaning system' },
  { id: 26, name: 'Knapsack Sprayer', image: 'https://bonhoeffermachines.com/public/product_banner/26-knapsack-sprayer.webp', description: 'Portable spraying solution for agricultural applications' },
  { id: 27, name: 'Manual Sprayer', image: 'https://bonhoeffermachines.com/public/product_banner/27-manual-sprayer.webp', description: 'Precision manual spraying for targeted applications' },
  { id: 28, name: 'Electric Pressure Washer', image: 'https://bonhoeffermachines.com/public/product_banner/28-electric-pressure-washer.webp', description: 'Electric-powered pressure washing for eco-friendly cleaning' },
  // { id: 29, name: 'Stationary Fumigation', image: 'https://bonhoeffermachines.com/public/product_banner/28-Stationary-Fumigation.webp', description: 'Fixed fumigation system for pest control' },
  { id: 30, name: 'Mist Duster', image: 'https://bonhoeffermachines.com/public/product_banner/29-Mistduster.webp', description: 'Fine mist application for crop protection' },
  { id: 31, name: 'Thermal Fogger', image: 'https://bonhoeffermachines.com/public/product_banner/30-Thermal-Fogger.webp', description: 'Thermal fogging for wide-area pest control' },
  { id: 32, name: 'Centrifugal Pump', image: 'https://bonhoeffermachines.com/public/product_banner/31-Centrifugal-Pump.webp', description: 'High-efficiency centrifugal pumping system' },
  { id: 33, name: 'Submersible Pump', image: 'https://bonhoeffermachines.com/public/product_banner/32-Submersible-Pump.webp', description: 'Underwater pumping solution for deep wells' },
  { id: 34, name: 'Solar Submersible Pump', image: 'https://bonhoeffermachines.com/public/product_banner/33-Solar-Submersible-Pump.webp', description: 'Solar-powered submersible pump for sustainable water access' },
  { id: 35, name: 'Solar Panel', image: 'https://bonhoeffermachines.com/public/product_banner/34-solar-pannel.webp', description: 'High-efficiency solar panels for renewable energy' },
  { id: 36, name: 'Tamping Rammer', image: 'https://bonhoeffermachines.com/public/product_banner/35-tamping-rammer.webp', description: 'Soil compaction tool for construction projects' },
  { id: 37, name: 'Plate Compactor', image: 'https://bonhoeffermachines.com/public/product_banner/36-plate-compactor.webp', description: 'Surface compaction for paving and construction' },
  { id: 38, name: 'Concrete Cutter', image: 'https://bonhoeffermachines.com/public/product_banner/37-Concrete-cutter.webp', description: 'Precision cutting through concrete and stone' },
  { id: 39, name: 'Concrete Vibrator', image: 'https://bonhoeffermachines.com/public/product_banner/38-concrete-vibrator.webp', description: 'Professional concrete consolidation equipment' },
  { id: 40, name: 'Concrete Power Trowel', image: 'https://bonhoeffermachines.com/public/product_banner/39-power-trovel.webp', description: 'Smooth concrete finishing for professional results' },
  { id: 41, name: 'Welding Set', image: 'https://bonhoeffermachines.com/public/product_banner/40-welding-set.webp', description: 'Complete welding solution for metal fabrication' },
  // { id: 42, name: 'Bench Grinder', image: 'https://bonhoeffermachines.com/public/product_banner/41-bench-grinder.webp', description: 'Precision grinding and sharpening workstation' },
  // { id: 43, name: 'Silent Generator', image: 'https://bonhoeffermachines.com/public/product_banner/43-silent-generator.webp', description: 'Quiet power generation for noise-sensitive environments' },
];

const FloatingArrow = ({ direction, className = "", sizeClass = "w-20 h-2" }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        x: direction === 'right' ? [0, 10, 0] : [0, -10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width="40" height="8"
        className={`min-w-0 max-w-[32px] max-h-[8px] sm:max-w-[48px] sm:max-h-[10px] md:max-w-[64px] md:max-h-[12px] lg:max-w-[80px] lg:max-h-[16px] ${sizeClass}`}
        viewBox="0 0 80 8" fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={direction === 'right' 
            ? "M0 4L6 0.5V2.5H79V5.5H6V7.5L0 4Z"
            : "M80 4L74 7.5V5.5H1V2.5H74V0.5L80 4Z"
          }
          fill="#989b2e"
        />
      </svg>
    </motion.div>
  )
}

// Helper to create slugs from product names
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function Producty() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative">
        {/* Sticky section title with arrows */}
        <div className="sticky top-0 z-50 flex flex-col xs:flex-row items-center justify-center bg-transparent py-6 sm:py-8 px-2 sm:px-0 gap-2 sm:gap-0">
          {/* Left Arrow */}
          <div className="absolute left-150 flex items-center" style={{ marginRight: '10px', maxWidth: 'calc(100vw/8)' }}>
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: [0.5, 1, 0.5], x: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="40" height="8"
                className="min-w-0 max-w-[32px] max-h-[8px] sm:max-w-[48px] sm:max-h-[10px] md:max-w-[64px] md:max-h-[12px] lg:max-w-[80px] lg:max-h-[16px] w-8 h-2 sm:w-12 sm:h-2 md:w-16 md:h-2 lg:w-20 lg:h-2"
                viewBox="0 0 80 8" fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M80 4L74 7.5V5.5H1V2.5H74V0.5L80 4Z"
                  fill="#989b2e"
                />
              </svg>
            </motion.div>
          </div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white px-6"
          >
            Our <span className='text-[#9a9c30]'>Products</span>
          </motion.h2>
          <div className="absolute right-150 flex items-center" style={{ marginLeft: '10px', maxWidth: 'calc(100vw/8)' }}>
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0.5, 1, 0.5], x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="40" height="8"
                className="min-w-0 max-w-[32px] max-h-[8px] sm:max-w-[48px] sm:max-h-[10px] md:max-w-[64px] md:max-h-[12px] lg:max-w-[80px] lg:max-h-[16px] w-8 h-2 sm:w-12 sm:h-2 md:w-16 md:h-2 lg:w-20 lg:h-2"
                viewBox="0 0 80 8" fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M0 4L6 0.5V2.5H79V5.5H6V7.5L0 4Z"
                  fill="#989b2e"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
      {products.map((product, idx) => (
        <section
          key={product.id}
          className="w-full min-h-screen flex flex-col sm:flex-row items-center justify-start relative bg-fixed bg-cover bg-center px-2 sm:px-0"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          {/* Overlay title and card - responsive, bottom left on mobile/tablet */}
          <div className="bg-[#9a9c30] p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg z-30
            absolute sm:static left-0 sm:left-8 bottom-0 sm:bottom-auto top-auto sm:top-auto
            ml-0 sm:ml-8
            translate-y-0 sm:translate-y-0
            mb-4 sm:mb-0"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-white">
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-green-100 mb-4 sm:mb-6 leading-relaxed">
              {product.description}
            </p>
            <Link href={`/product/${slugify(product.name)}`} passHref >
              <button className="w-full px-4 py-2 sm:px-8 sm:py-3 bg-white text-[#9a9c30] font-semibold rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer block text-center text-sm sm:text-base">
                Explore Product
              </button>
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Producty