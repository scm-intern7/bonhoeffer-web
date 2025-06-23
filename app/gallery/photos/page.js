'use client'
import React, { useState } from 'react'
import BgLayout from '@/components/templates/bgLayout'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import galleryUrls from '../../../gallery-urls.json'

function PhotosPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)

  // Convert gallery URLs object to array
  const galleryImages = Object.entries(galleryUrls).map(([filename, url]) => ({
    filename,
    url,
    alt: filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').replace(/[-_]/g, ' ')
  }))

  const openLightbox = (index) => {
    setImageIndex(index)
    setSelectedImage(galleryImages[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (imageIndex + 1) % galleryImages.length
    setImageIndex(nextIndex)
    setSelectedImage(galleryImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (imageIndex - 1 + galleryImages.length) % galleryImages.length
    setImageIndex(prevIndex)
    setSelectedImage(galleryImages[prevIndex])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  React.useEffect(() => {
    // Add CSS to reduce footer z-index on gallery pages
    const style = document.createElement('style')
    style.textContent = `
      footer {
        z-index: 10 !important;
      }
    `
    document.head.appendChild(style)

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      // Clean up the style when component unmounts
      document.head.removeChild(style)
    }
  }, [selectedImage, imageIndex])

  return (
    <BgLayout>
      {/* Hero Image */}
      <div className="relative w-full h-[40vw] min-h-[220px] max-h-[400px] mt-5">
        <Image
          src="https://bonhoeffermachines.com/en/public/images/images-banner-india.webp"
          alt="Gallery Hero Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <section className="py-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Photo <span className="text-[#989b2e]">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of events, exhibitions, and moments captured over time
          </p>
          <div className="mt-4 text-sm text-gray-400">
            {galleryImages.length} Photos
          </div>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.filename}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.005 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-[#989b2e] z-[10000] cursor-pointer"
              onClick={closeLightbox}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#989b2e] z-[10000] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#989b2e] z-[10000] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-full max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {imageIndex + 1} of {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BgLayout>
  )
}

export default PhotosPage