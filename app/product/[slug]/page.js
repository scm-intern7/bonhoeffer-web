'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ProductSpecificPage() {
  const params = useParams();
  const slug = params.slug;

  // Get product models based on slug
  const getProductModels = (productSlug) => {
    const productModels = {
      'gasoline-water-pump': [
        { id: 1, name: 'WP-20', image: 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp', power: '5.5 HP', displacement: '163cc' },
        { id: 2, name: 'WP-30', image: 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp', power: '6.5 HP', displacement: '196cc' },
        { id: 3, name: 'WP-40', image: 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp', power: '7.0 HP', displacement: '210cc' },
        { id: 4, name: 'WP-50', image: 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp', power: '8.0 HP', displacement: '250cc' }
      ],
      'gasoline-engine': [
        { id: 1, name: 'GE-154F', image: 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp', power: '2.6 HP', displacement: '87cc' },
        { id: 2, name: 'GE-168F', image: 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp', power: '5.5 HP', displacement: '163cc' },
        { id: 3, name: 'GE-170F', image: 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp', power: '7.0 HP', displacement: '210cc' },
        { id: 4, name: 'GE-188F', image: 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp', power: '13.0 HP', displacement: '389cc' }
      ],
      'gasoline-generator': [
        { id: 1, name: 'GG-950', image: 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp', power: '650W', displacement: '63cc' },
        { id: 2, name: 'GG-1200', image: 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp', power: '1000W', displacement: '87cc' },
        { id: 3, name: 'GG-2500', image: 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp', power: '2000W', displacement: '163cc' },
        { id: 4, name: 'GG-6500', image: 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp', power: '5500W', displacement: '389cc' }
      ],
      'brush-cutter': [
        { id: 1, name: 'BC-260', image: 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp', power: '1.0 HP', displacement: '26cc' },
        { id: 2, name: 'BC-330', image: 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp', power: '1.2 HP', displacement: '33cc' },
        { id: 3, name: 'BC-430', image: 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp', power: '1.7 HP', displacement: '43cc' },
        { id: 4, name: 'BC-520', image: 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp', power: '2.2 HP', displacement: '52cc' }
      ],
      'chainsaw': [
        { id: 1, name: 'CS-3800', image: 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp', power: '2.0 HP', displacement: '38cc' },
        { id: 2, name: 'CS-4500', image: 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp', power: '2.4 HP', displacement: '45cc' },
        { id: 3, name: 'CS-5200', image: 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp', power: '3.2 HP', displacement: '52cc' },
        { id: 4, name: 'CS-6500', image: 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp', power: '4.8 HP', displacement: '65cc' }
      ]
    };

    // Default models for products not specifically defined
    const defaultModels = [
      { id: 1, name: `${getProductName(productSlug)}-100`, image: getProductImage(productSlug), power: '5.5 HP', displacement: '163cc' },
      { id: 2, name: `${getProductName(productSlug)}-200`, image: getProductImage(productSlug), power: '6.5 HP', displacement: '196cc' },
      { id: 3, name: `${getProductName(productSlug)}-300`, image: getProductImage(productSlug), power: '7.0 HP', displacement: '210cc' },
      { id: 4, name: `${getProductName(productSlug)}-400`, image: getProductImage(productSlug), power: '8.0 HP', displacement: '250cc' }
    ];

    return productModels[productSlug] || defaultModels;
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
      'electric-pressure-washer': 'Electric Pressure Washer',
      'electric-motors': 'Electric Motors',
      'air-compressor': 'Air Compressor',
      'solar-panel': 'Solar Panel',
      'solar-water-pump': 'Solar Water Pump',
      'gasoline-sprayer': 'Gasoline Sprayer',
      'manual-sprayer': 'Manual Sprayer',
      'backpack-atomizer': 'Backpack Atomizer',
      'mistduster': 'Mistduster',
      'gasoline-generator': 'Gasoline Generator',
      'gasoline-inverter': 'Gasoline Inverter',
      'pressure-washer': 'Pressure Washer',
      'domestic-pressure-washer': 'Domestic Pressure Washer',
      'commercial-vacuum': 'Commercial Vacuum',
      'welding-machine': 'Welding Machine',
      'centrifugal-pump': 'Centrifugal Pump',
      'submersible-pump': 'Submersible Pump',
      '2-stroke-water-pump': '2-Stroke Water Pump',
      '2-stroke-engine': '2-Stroke Engine',
      'tamping-rammer': 'Tamping Rammer',
      'plate-compactor': 'Plate Compactor',
      'concrete-cutter': 'Concrete Cutter',
      'concrete-vibrator': 'Concrete Vibrator',
      'power-trowel': 'Power Trowel',
      'earth-auger': 'Earth Auger',
      'garden-tools': 'Garden Tools',
      'hand-tools': 'Hand Tools',
      'wood-chipper': 'Wood Chipper',
      'chaff-cutter': 'Chaff Cutter',
      'log-splitter': 'Log Splitter',
      'mini-dumper': 'Mini Dumper',
      'trencher': 'Trencher',
      'ac-professional': 'AC Professional'
    };
    return nameMap[slug] || 'Product';
  };

  const getProductImage = (slug) => {
    const imageMap = {
      'gasoline-water-pump': 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp',
      'gasoline-engine': 'https://bonhoeffermachines.com/public/product_banner/2-gasoline-engine.webp',
      'gasoline-generator': 'https://bonhoeffermachines.com/public/product_banner/3-gasoline-generator.webp',
      'gasoline-inverter': 'https://bonhoeffermachines.com/public/product_banner/4-gasoline-inverter.webp',
      'gasoline-tiller': 'https://bonhoeffermachines.com/public/product_banner/5-gasoline-tiller.webp',
      'brush-cutter': 'https://bonhoeffermachines.com/public/product_banner/7-brush-cutter.webp',
      'backpack-brush-cutter': 'https://bonhoeffermachines.com/public/product_banner/8-bagpack-brushcutter.webp',
      'multi-tool': 'https://bonhoeffermachines.com/public/product_banner/9-multi-tool.webp',
      'chainsaw': 'https://bonhoeffermachines.com/public/product_banner/10-chain-saw.webp',
      'hedge-trimmer': 'https://bonhoeffermachines.com/public/product_banner/11-hedge-trimmer.webp',
      'leaf-blower': 'https://bonhoeffermachines.com/public/product_banner/12-blower.webp',
      'lawn-mower': 'https://bonhoeffermachines.com/public/product_banner/13-gasoline-lawn-mower.webp',
      'earth-auger': 'https://bonhoeffermachines.com/public/product_banner/14-earth-auger.webp',
      'diesel-water-pump': 'https://bonhoeffermachines.com/public/product_banner/19-diesel-water-pump.webp',
      'diesel-generator': 'https://bonhoeffermachines.com/public/product_banner/20-diesel-generator.webp',
      'diesel-engine': 'https://bonhoeffermachines.com/public/product_banner/21-diesel-engine.webp',
      'pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/22-gasoline-pressure-washer.webp',
      'domestic-pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/23-pressure-washer-home-use.webp',
      'air-compressor': 'https://bonhoeffermachines.com/public/product_banner/24-direct-driven-air-compressor.webp',
      'commercial-vacuum': 'https://bonhoeffermachines.com/public/product_banner/25-vaccum-cleaner.webp',
      'manual-sprayer': 'https://bonhoeffermachines.com/public/product_banner/27-manual-sprayer.webp',
      'electric-pressure-washer': 'https://bonhoeffermachines.com/public/product_banner/28-electric-pressure-washer.webp',
      'mistduster': 'https://bonhoeffermachines.com/public/product_banner/29-Mistduster.webp',
      'centrifugal-pump': 'https://bonhoeffermachines.com/public/product_banner/31-Centrifugal-Pump.webp',
      'submersible-pump': 'https://bonhoeffermachines.com/public/product_banner/32-Submersible-Pump.webp',
      'solar-water-pump': 'https://bonhoeffermachines.com/public/product_banner/33-Solar-Submersible-Pump.webp',
      'solar-panel': 'https://bonhoeffermachines.com/public/product_banner/34-solar-pannel.webp',
      'tamping-rammer': 'https://bonhoeffermachines.com/public/product_banner/35-tamping-rammer.webp',
      'plate-compactor': 'https://bonhoeffermachines.com/public/product_banner/36-plate-compactor.webp',
      'concrete-cutter': 'https://bonhoeffermachines.com/public/product_banner/37-Concrete-cutter.webp',
      'concrete-vibrator': 'https://bonhoeffermachines.com/public/product_banner/38-concrete-vibrator.webp',
      'power-trowel': 'https://bonhoeffermachines.com/public/product_banner/39-power-trovel.webp',
      'welding-machine': 'https://bonhoeffermachines.com/public/product_banner/40-welding-set.webp'
    };
    return imageMap[slug] || 'https://bonhoeffermachines.com/public/product_banner/1-gasoline-water-pump.webp';
  };

  const getProductDescription = (slug) => {
    const descriptions = {
      'gasoline-water-pump': 'High-performance gasoline-powered water pumps designed for agricultural irrigation, construction dewatering, and emergency water transfer applications. Features reliable 4-stroke engines with excellent fuel efficiency and durable cast iron construction.',
      'gasoline-engine': 'Robust single-cylinder, air-cooled gasoline engines suitable for various applications including generators, water pumps, tillers, and other agricultural equipment. Built with premium components for long-lasting performance.',
      'gasoline-generator': 'Portable gasoline generators providing reliable power for outdoor events, construction sites, emergency backup, and remote locations. Features automatic voltage regulation and low noise operation.',
      'brush-cutter': 'Professional-grade brush cutters designed for grass cutting, weed control, and light brush clearing. Ergonomic design with anti-vibration technology and versatile cutting attachments.',
      'chainsaw': 'Professional chainsaws for tree felling, pruning, and wood cutting applications. Features advanced anti-kickback technology, automatic chain lubrication, and ergonomic design for extended use.'
    };
    
    return descriptions[slug] || `Professional ${getProductName(slug).toLowerCase()} designed for heavy-duty applications. Built with premium materials and advanced engineering for reliable performance in demanding conditions.`;
  };

  const productName = getProductName(slug);
  const productImage = getProductImage(slug);
  const productDescription = getProductDescription(slug);
  const models = getProductModels(slug);

  return (
    <BgLayout>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-5">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.com/public/product_banner/product-banner.webp"
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
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="text-[#989b2e]">{productName}</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Choose from our range of professional {productName.toLowerCase()} models
          </motion.p>
        </motion.div>
      </section>

      {/* Product Description */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Professional Grade <span className="text-[#989b2e]">{productName}</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {productDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Grid Section */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Available <span className="text-[#989b2e]">Models</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Select the perfect {productName.toLowerCase()} model for your specific needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-contain p-2 scale-150 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#989b2e] transition-colors text-center">
                  {model.name}
                </h3>
                
                <div className="space-y-2 mb-4 text-center">
                  <p className="text-gray-300 text-sm">
                    <span className="font-medium">Power:</span> {model.power}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-medium">Engine:</span> {model.displacement}
                  </p>
                </div>
                
                <Link 
                  href={`/product/${slug}/${model.name.toLowerCase()}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105 cursor-pointer"
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

      {/* Back Navigation */}
      <section className="py-10 px-6 text-center">
        <Link 
          href="/product"
          className="inline-flex items-center text-[#989b2e] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Products
        </Link>
      </section>
    </BgLayout>
  )
}

export default ProductSpecificPage
