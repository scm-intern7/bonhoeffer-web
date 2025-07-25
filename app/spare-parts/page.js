'use client'
import BgLayout from '@/components/templates/bgLayout'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import sparePartsData from './products.json'

function SparePage() {
  // Filter spare parts and accessories from imported data
  const sparePartsItems = sparePartsData.filter(item => item.category === 'spare-parts');
  const accessoriesItems = sparePartsData.filter(item => item.category === 'accessories');

  return (
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="flex items-center justify-center overflow-hidden mt-5">
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
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Spare <span className="text-[#989b2e]">Parts</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Genuine Parts & Accessories for Peak Performance
          </motion.p>
        </motion.div> */}
      </section>

      {/* Spare Parts Section */}
      <section className="pb-10 pt-5 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Spare <span className='text-[#989b2e]'>Parts</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              High-quality replacement parts to keep your machinery running at peak performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sparePartsItems.map((part, index) => (
              <motion.div
                key={`spare-${part.slug}-${index}`}
                className="group bg-white/5 backdrop-blur-sm flex flex-col items-center border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white/5 w-[80%]">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {part.label}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#989b2e] transition-colors">
                  {part.name}
                </h3>
                
                <Link 
                  href={`/spare-parts/${part.slug}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                >
                  View More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#989b2e]">
              Accessories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Essential accessories and tools to enhance your machinery&apos;s functionality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {accessoriesItems.map((accessory, index) => (
              <motion.div
                key={`accessory-${accessory.slug}-${index}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(152, 155, 46, 0.1)" }}
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={accessory.image}
                    alt={accessory.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="text-[#989b2e] text-xs font-medium bg-[#989b2e]/20 px-3 py-1 rounded-full">
                    {accessory.label}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#989b2e] transition-colors">
                  {accessory.name}
                </h3>
                
                <Link 
                  href={`/spare-parts/${accessory.slug}`}
                  className="inline-flex items-center justify-center w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:scale-105"
                >
                  View More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </BgLayout>
  )
}

export default SparePage