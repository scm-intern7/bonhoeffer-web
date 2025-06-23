"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layouts/header';

// Fair data (same as in events page)
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

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-60"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Main Image */}
        <motion.div
          className="max-w-7xl max-h-[90vh] mx-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function FairGallery({ params }) {
  const router = useRouter();
  const { slug } = React.use(params);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  // Find the fair based on slug
  const fair = fairCategories.find(f => f.slug === slug);
  
  if (!fair) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
        <div className="relative z-20">
          <Header />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Fair Gallery Not Found</h1>
            <button 
              onClick={() => router.push('/events')}
              className="bg-[#989b2e] hover:bg-[#7a7d24] px-6 py-3 rounded-lg transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => 
      prev === fair.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setLightboxIndex((prev) => 
      prev === 0 ? fair.images.length - 1 : prev - 1
    );
  };

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
          className="flex items-center justify-between p-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => router.push('/events')}
            className="flex items-center space-x-2 text-white hover:text-[#989b2e] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
            <span className="text-lg font-semibold">Back to Events</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {fair.name}
            </h1>
            <p className="text-gray-300 mt-1">{fair.location}</p>
          </div>
          
          <div className="text-right text-gray-300">
            <p className="text-sm">{fair.imageCount} Photos</p>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fair.images.map((image, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.005 }}
                onClick={() => openLightbox(index)}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-800">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={`${fair.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Number */}
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={fair.images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}
