import React from 'react'
import Link from 'next/link'

// Full product list from products.js
const products = [
  { id: 1, name: 'Gasoline Water Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp', description: 'High-performance water pump for industrial and residential use' },
  { id: 2, name: 'Gasoline Engine', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2-gasoline-engine.webp', description: 'Reliable gasoline engine with superior power output' },
  { id: 3, name: 'Gasoline Generator', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3-gasoline-generator.webp', description: 'Portable power solution for all your energy needs' },
  { id: 4, name: 'Gasoline Inverter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4-gasoline-inverter.webp', description: 'Clean, stable power for sensitive electronics' },
  { id: 5, name: 'Gasoline Tiller', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5-gasoline-tiller.webp', description: 'Professional-grade soil cultivation equipment' },
  { id: 6, name: 'EFI Machines', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/6-Gasoline-EFI-Machines.webp', description: 'Advanced fuel injection technology for maximum efficiency' },
  { id: 7, name: 'Brush Cutter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/7-brush-cutter.webp', description: 'Heavy-duty cutting power for tough vegetation' },
  { id: 8, name: 'Backpack Brushcutter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/8-bagpack-brushcutter.webp', description: 'Ergonomic design for extended professional use' },
  { id: 9, name: 'Multi Tool', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/9-multi-tool.webp', description: 'Versatile tool for multiple landscaping applications' },
  { id: 10, name: 'Chain Saw', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/10-chain-saw.webp', description: 'Professional chainsaw for forestry and construction' },
  { id: 11, name: 'Hedge Trimmer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/11-hedge-trimmer.webp', description: 'Precision trimming for perfect hedge maintenance' },
  { id: 12, name: 'Blower', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/12-blower.webp', description: 'Powerful air movement for cleaning and maintenance' },
  { id: 13, name: 'Gasoline Lawn Mower', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/13-gasoline-lawn-mower.webp', description: 'Professional lawn care with precision cutting' },
  { id: 14, name: 'Earth Auger', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/14-earth-auger.webp', description: 'Powerful drilling solution for post holes and planting' },
  { id: 15, name: 'Electric Segment', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/15-electric-segment.webp', description: 'Eco-friendly electric power solutions' },
  { id: 16, name: 'Battery Segment', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/16-battery-segment.webp', description: 'Cordless convenience with long-lasting battery power' },
  { id: 17, name: 'Water Pump 2-Stroke', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/17-water-pump-2-stroke.webp', description: 'Lightweight 2-stroke water pump for efficient operation' },
  { id: 18, name: 'Engine 2-Stroke', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/18-engine-2-stroke.webp', description: 'Compact 2-stroke engine for maximum power-to-weight ratio' },
  { id: 19, name: 'Diesel Water Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/19-diesel-water-pump.webp', description: 'Heavy-duty diesel water pump for industrial applications' },
  { id: 20, name: 'Diesel Generator', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/20-diesel-generator.webp', description: 'Reliable diesel power generation for continuous operation' },
  { id: 21, name: 'Diesel Engine', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/21-diesel-engine.webp', description: 'Robust diesel engine with exceptional fuel efficiency' },
  { id: 22, name: 'Gasoline Pressure Washer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/22-gasoline-pressure-washer.webp', description: 'High-pressure cleaning power for tough jobs' },
  { id: 23, name: 'Pressure Washer Home Use', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/23-pressure-washer-home-use.webp', description: 'Perfect pressure washing solution for home maintenance' },
  { id: 24, name: 'Direct Driven Air Compressor', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/24-direct-driven-air-compressor.webp', description: 'Efficient air compression for pneumatic tools' },
  { id: 25, name: 'Vacuum Cleaner', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/25-vaccum-cleaner.webp', description: 'Industrial-grade vacuum cleaning system' },
  { id: 26, name: 'Knapsack Sprayer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/26-knapsack-sprayer.webp', description: 'Portable spraying solution for agricultural applications' },
  { id: 27, name: 'Manual Sprayer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/27-manual-sprayer.webp', description: 'Precision manual spraying for targeted applications' },
  { id: 28, name: 'Electric Pressure Washer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/28-electric-pressure-washer.webp', description: 'Electric-powered pressure washing for eco-friendly cleaning' },
  { id: 29, name: 'Stationary Fumigation', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/28-Stationary-Fumigation.webp', description: 'Fixed fumigation system for pest control' },
  { id: 30, name: 'Mist Duster', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/29-Mistduster.webp', description: 'Fine mist application for crop protection' },
  { id: 31, name: 'Thermal Fogger', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/30-Thermal-Fogger.webp', description: 'Thermal fogging for wide-area pest control' },
  { id: 32, name: 'Centrifugal Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/31-Centrifugal-Pump.webp', description: 'High-efficiency centrifugal pumping system' },
  { id: 33, name: 'Submersible Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/32-Submersible-Pump.webp', description: 'Underwater pumping solution for deep wells' },
  { id: 34, name: 'Solar Submersible Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/33-Solar-Submersible-Pump.webp', description: 'Solar-powered submersible pump for sustainable water access' },
  { id: 35, name: 'Solar Panel', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/34-solar-pannel.webp', description: 'High-efficiency solar panels for renewable energy' },
  { id: 36, name: 'Tamping Rammer', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/35-tamping-rammer.webp', description: 'Soil compaction tool for construction projects' },
  { id: 37, name: 'Plate Compactor', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/36-plate-compactor.webp', description: 'Surface compaction for paving and construction' },
  { id: 38, name: 'Concrete Cutter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/37-Concrete-cutter.webp', description: 'Precision cutting through concrete and stone' },
  { id: 39, name: 'Concrete Vibrator', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/38-concrete-vibrator.webp', description: 'Professional concrete consolidation equipment' },
  { id: 40, name: 'Power Trowel', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/39-power-trovel.webp', description: 'Smooth concrete finishing for professional results' },
  { id: 41, name: 'Welding Set', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/40-welding-set.webp', description: 'Complete welding solution for metal fabrication' },
  { id: 42, name: 'Bench Grinder', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/41-bench-grinder.webp', description: 'Precision grinding and sharpening workstation' },
  { id: 43, name: 'Drill Press', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/42-Drill-Press.webp', description: 'Precise drilling with professional accuracy' },
  { id: 44, name: 'Silent Generator', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/43-silent-generator.webp', description: 'Quiet power generation for noise-sensitive environments' },
];

// Helper to create slugs from product names
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function Producty() {
  return (
    <div className="w-full overflow-hidden">
      {/* Sticky section title with arrows */}
      <div className="sticky top-0 z-50 flex items-center justify-center bg-transparent py-8">
        {/* Left Arrow (different style, pointing right) */}
        <svg className="w-10 h-10 md:w-14 md:h-14 text-[#9a9c30] mr-2 md:mr-4" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20h20M20 10l10 10-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-6xl md:text-8xl font-bold text-white bg-clip-text text-center drop-shadow-lg mx-2">
          Our <span className="text-[#9a9c30]">Products</span>
        </h1>
        {/* Right Arrow (different style, pointing left) */}
        <svg className="w-10 h-10 md:w-14 md:h-14 text-[#9a9c30] ml-2 md:ml-4 rotate-180" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20h20M20 10l10 10-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {products.map((product, idx) => (
        <section
          key={product.id}
          className="w-full min-h-screen flex items-center justify-start relative bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          {/* Removed overlay title from first product */}
          <div className="bg-[#9a9c30] p-6 rounded-lg shadow-2xl w-[420px] ml-0 absolute left-8 top-1/2 -translate-y-1/2 z-30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {product.name}
            </h2>
            <p className="text-sm md:text-base text-green-100 mb-6 leading-relaxed">
              {product.description}
            </p>
            <Link href={`/product/${slugify(product.name)}`} passHref >
              <button className="px-8 py-3 bg-white text-[#9a9c30] font-semibold rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer block text-center">
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