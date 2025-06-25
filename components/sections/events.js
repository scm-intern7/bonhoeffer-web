"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Event images data
const eventImages = [
  { src: 'https://bonhoeffermachines.com/en/public/images/Argentina-Fair.png', name: 'Argentina Fair', slug: 'argentina-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/coimbatore-fair-home.webp', name: 'Coimbatore Fair', slug: 'coimbatore-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/Colombia-Fair.png', name: 'Colombia Fair', slug: 'colombia-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/Domican-Republic.png', name: 'Dominican Republic', slug: 'dominican-republic' },
  { src: 'https://bonhoeffermachines.com/en/public/images/Football-Event.png', name: 'Football Event', slug: 'football-event' },
  { src: 'https://bonhoeffermachines.com/en/public/images/indian-fair.png', name: 'Indian Fair', slug: 'indian-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/Mexico-Fair.png', name: 'Mexico Fair', slug: 'mexico-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/nicaragua-fair-home.webp', name: 'Nicaragua Fair', slug: 'nicaragua-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/peru-fair.png', name: 'Peru Fair', slug: 'peru-fair' },
  { src: 'https://bonhoeffermachines.com/en/public/images/usaid1.png', name: 'USAID Event 1', slug: 'usaid-event-1' },
  { src: 'https://bonhoeffermachines.com/en/public/images/usaid2.png', name: 'World Vision', slug: 'usaid-event-2' }
];

// Floating Arrow Component
const FloatingArrow = ({ direction = "down", className = "" }) => {
  return (
    <motion.div
      className={`text-[#979b2e] ${className}`}
      animate={{ 
        y: direction === "down" ? [0, 10, 0] : [0, -10, 0],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className={direction === "up" ? "rotate-180" : ""}
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </motion.div>
  );
};

// Image Slider Component - Same mechanism as Social carousel
const ImageSlider = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [postsPerView, setPostsPerView] = useState(4)
  const intervalRef = useRef(null)
  const sliderRef = useRef(null)

  // Responsive postsPerView
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setPostsPerView(1); // mobile
      else if (width < 900) setPostsPerView(2); // small tablet
      else if (width < 1200) setPostsPerView(3); // large tablet/small desktop
      else setPostsPerView(4); // desktop
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, posts.length - postsPerView)

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && posts.length > postsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
      }, 4000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isAutoPlaying, maxIndex, posts.length, postsPerView])

  useEffect(() => {
    // Reset currentIndex if postsPerView changes and currentIndex is out of range
    if (currentIndex > maxIndex) setCurrentIndex(0);
  }, [postsPerView, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prevSlide = () => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const handleImageClick = (image) => {
    // Special handling for certain events
    if (image.slug === 'football-event' || image.slug === 'usaid-event-1' || image.slug === 'usaid-event-2') {
      // Redirect to general events page
      window.location.href = '/events';
    } else if (image.slug === 'mexico-fair') {
      // Redirect mexico-fair to Guanajuato fair gallery
      window.location.href = '/events/gallery/mexico-guanajuato-fair';
    } else {
      // Check if this event has a corresponding gallery
      const hasGallery = ['argentina-fair', 'colombia-fair', 'dominican-republic', 'indian-fair', 'coimbatore-fair', 'nicaragua-fair', 'peru-fair'].includes(image.slug);
      
      if (hasGallery) {
        // Redirect to gallery page
        window.location.href = `/events/gallery/${image.slug}`;
      } else {
        // Redirect to detail page
        window.location.href = `/events/${image.slug}`;
      }
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Slider Container */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out"
          animate={{ x: `-${currentIndex * (100 / postsPerView)}%` }}
        >
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / postsPerView}%` }}
            >
              <div className="bg-black rounded-xl shadow-lg overflow-hidden h-full relative group cursor-pointer" style={{ aspectRatio: '9/16' }}>
                <div 
                  className="block h-full"
                  onClick={() => handleImageClick(post)}
                >
                  <img 
                    src={post.src} 
                    alt={post.alt}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '9/16' }}
                  />
                  
                  {/* Event Name Overlay */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="bg-[#989b2e] px-3 py-2 rounded-lg shadow-lg">
                      <h3 className="text-white text-sm md:text-base font-bold">
                        {post.name}
                      </h3>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  
                  {/* Click indicator on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <p className="text-sm font-medium">View Event</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicators */}
      {posts.length > postsPerView && (
        <div className="flex flex-col items-center mt-6 space-y-3">
          {/* Progress bar only when arrows are at sides (desktop) */}
          {postsPerView === 4 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 8000)
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-[#989b2e]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          {/* Bottom center arrows for < 4 postsPerView */}
          {postsPerView < 4 && (
            <div className="flex justify-center space-x-6 mt-2">
              <button
                onClick={prevSlide}
                className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="bg-[#989b2e] hover:bg-[#7a7d24] text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Side arrows for desktop (postsPerView === 4) */}
      {posts.length > postsPerView && postsPerView === 4 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[-75px] top-1/2 transform -translate-y-1/2 z-10 bg-[#989b2e] hover:bg-[#7a7d24] text-white p-4 rounded-full transition-colors duration-300 shadow-lg hidden lg:block"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-75px] top-1/2 transform -translate-y-1/2 z-10 bg-[#989b2e] hover:bg-[#7a7d24] text-white p-4 rounded-full transition-colors duration-300 shadow-lg hidden lg:block"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </>
      )}
    </div>
  )
};

function Events() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Convert eventImages to match carousel format
  const eventPosts = eventImages.map(image => ({
    src: image.src,
    name: image.name,
    slug: image.slug,
    alt: image.name
  }));

  return (
    <section className="relative min-h-screen py-10 sm:py-16 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          ref={ref}
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Top Arrow */}
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatingArrow direction="down" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Events
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Explore our global presence and participation in industry events worldwide
          </motion.p>

          {/* Bottom Arrow */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FloatingArrow direction="up" />
          </motion.div>
        </motion.div>

        {/* Image Slider Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ImageSlider posts={eventPosts} />
        </motion.div>
      </div>
    </section>
  );
}

export default Events;