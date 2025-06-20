"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layouts/header';

// Organized fair data based on the images in /fair folder
const fairCategories = [
  {
    name: 'Argentina Fair',
    slug: 'argentina-fair',
    location: 'Argentina',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair1.webp',
    imageCount: 6,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-fair6.webp'
    ]
  },
  {
    name: 'Colombia Fair',
    slug: 'colombia-fair',
    location: 'Colombia',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair1.webp',
    imageCount: 11,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair6.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair7.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair8.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair9.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair10.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/columbia-fair11.webp'
    ]
  },
  {
    name: 'Dominican Republic Fair',
    slug: 'dominican-republic',
    location: 'Dominican Republic',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Dominican-Republic-fair1.webp',
    imageCount: 2,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Dominican-Republic-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Dominican-Republic-fair2.webp'
    ]
  },
  {
    name: 'India Fair',
    slug: 'indian-fair',
    location: 'India',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair1.webp',
    imageCount: 10,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair6.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair7.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair8.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair9.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/india-fair10.webp'
    ]
  },
  {
    name: 'Coimbatore Fair',
    slug: 'coimbatore-fair',
    location: 'Coimbatore, India',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider1.webp',
    imageCount: 7,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider6.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-slider7.webp'
    ]
  },
  {
    name: 'Guadalajara Mexico Fair',
    slug: 'guadalajara-mexico-fair',
    location: 'Guadalajara, Mexico',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Guadalajara-Mexico-fair1.webp',
    imageCount: 2,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Guadalajara-Mexico-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Guadalajara-Mexico-fair2.webp'
    ]
  },
  {
    name: 'Mexico Guanajuato Fair',
    slug: 'mexico-guanajuato-fair',
    location: 'Guanajuato, Mexico',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair1.webp',
    imageCount: 5,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Guanajuato-fair5.webp'
    ]
  },
  {
    name: 'Nicaragua Fair',
    slug: 'nicaragua-fair',
    location: 'Nicaragua',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider1.webp',
    imageCount: 9,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider6.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider7.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider8.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-slider9.webp'
    ]
  },
  {
    name: 'Pantnagar Fair',
    slug: 'pantnagar-fair',
    location: 'Pantnagar, India',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider1.webp',
    imageCount: 6,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/pantnagar-slider6.webp'
    ]
  },
  {
    name: 'Peru Fair',
    slug: 'peru-fair',
    location: 'Peru',
    coverImage: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair1.webp',
    imageCount: 11,
    images: [
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair1.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair2.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair3.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair4.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair5.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair6.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair7.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair8.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair9.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair10.webp',
      'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Peru-Fair11.webp'
    ]
  }
];

export default function EventsPage() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Global Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
      
      <div className="relative z-20">
        <Header />
      </div>
      
      <div className="relative z-10 pt-20">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fairs Gallery
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our global participation in industrial machinery exhibitions and trade fairs around the world
          </motion.p>
        </motion.div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fairCategories.map((fair, index) => (
              <motion.div
                key={fair.slug}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => router.push(`/events/gallery/${fair.slug}`)}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-800">
                  {/* Cover Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={fair.coverImage}
                      alt={fair.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 filter"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Fair Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                        {fair.location}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {fair.imageCount} Photos
                      </p>
                    </div>
                    
                    {/* Hover Effect Icon */}
                    <motion.div
                      className="absolute top-4 right-4 bg-[#989b2e] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                    </motion.div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white text-lg font-semibold mb-1">
                          {fair.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Industrial Machinery Exhibition
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="bg-[#989b2e] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          View Gallery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
