"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BgLayout from '@/components/templates/bgLayout';

// Fair data (same as in events page)
const fairCategories = [
  {
    name: 'Argentina Fair',
    slug: 'argentina-fair',
    location: 'Argentina',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair1.webp',
    imageCount: 6,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Argentina-fair6.webp'
    ]
  },
  {
    name: 'Colombia Fair',
    slug: 'colombia-fair',
    location: 'Colombia',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair1.webp',
    imageCount: 11,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair6.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair7.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair8.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair9.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair10.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/columbia-fair11.webp'
    ]
  },
  {
    name: 'Dominican Republic Fair',
    slug: 'dominican-republic',
    location: 'Dominican Republic',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/Dominican-Republic-fair1.webp',
    imageCount: 2,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/Dominican-Republic-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Dominican-Republic-fair2.webp'
    ]
  },
  {
    name: 'Rudrapur Fair',
    slug: 'rudrapur-fair',
    location: 'India',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/india-fair1.webp',
    imageCount: 10,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair6.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair7.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair8.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair9.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/india-fair10.webp'
    ]
  },
  {
    name: 'Coimbatore Fair',
    slug: 'coimbatore-fair',
    location: 'Coimbatore, India',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider1.webp',
    imageCount: 6,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/coimbatore-slider7.webp',
    ]
  },
  {
    name: 'Guadalajara Mexico Fair',
    slug: 'guadalajara-mexico-fair',
    location: 'Guadalajara, Mexico',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/Guadalajara-Mexico-fair1.webp',
    imageCount: 2,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/Guadalajara-Mexico-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Guadalajara-Mexico-fair2.webp'
    ]
  },
  {
    name: 'Mexico Guanajuato Fair',
    slug: 'mexico-guanajuato-fair',
    location: 'Guanajuato, Mexico',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair1.webp',
    imageCount: 5,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Mexico-Guanajuato-fair5.webp'
    ]
  },
  {
    name: 'Nicaragua Fair',
    slug: 'nicaragua-fair',
    location: 'Nicaragua',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider1.webp',
    imageCount: 9,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider6.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider7.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider8.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/nicaragua-slider9.webp'
    ]
  },
  {
    name: 'Pantnagar Fair',
    slug: 'pantnagar-fair',
    location: 'Pantnagar, India',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider1.webp',
    imageCount: 6,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/pantnagar-slider6.webp'
    ]
  },
  {
    name: 'Peru Fair',
    slug: 'peru-fair',
    location: 'Peru',
    coverImage: 'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair1.webp',
    imageCount: 11,
    images: [
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair1.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair2.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair3.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair4.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair5.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair6.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair7.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair8.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair9.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair10.webp',
      'https://bonhoeffermachines.com/en/public/events/webp/Peru-Fair11.webp'
    ]
  }
];

// Lightbox Component
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-2 sm:px-6"
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
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white p-2 sm:p-3 bg-[#989b2e] hover:bg-[#989b2e]/70 cursor-pointer rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>

        <button
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white p-2 sm:p-3 bg-[#989b2e] hover:bg-[#989b2e]/70 cursor-pointer rounded-full transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        {/* Main Image */}
        <motion.div
          className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl max-h-[80vh] flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-xs sm:text-sm">
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
      <BgLayout>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Fair Gallery Not Found</h1>
            <button 
              onClick={() => router.push('/events')}
              className="bg-[#989b2e] hover:bg-[#7a7d24] cursor-pointer px-6 py-3 rounded-lg transition-colors"
            >
              Back to Events
            </button>
          </div>
        </div>
      </BgLayout>
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
    <BgLayout>
      {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      <div className="relative z-10 pt-20">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4 p-4 sm:p-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => router.push('/events')}
            className="flex items-center space-x-2 cursor-pointer text-white hover:text-[#989b2e] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
            <span className="text-base sm:text-lg font-semibold">Back to Events</span>
          </button>
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {fair.name}
            </h1>
            <p className="text-[#989b2e] mt-1 text-sm sm:text-base">{fair.location}</p>
          </div>
          <div className="text-right text-gray-300">
            <p className="text-xs sm:text-sm">{fair.imageCount} Photos</p>
          </div>
        </motion.div>
        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={image}
                      alt={`${fair.name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3">
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
    </BgLayout>
  );
}
