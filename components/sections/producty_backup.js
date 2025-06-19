'use client';
import React, { useState, useEffect, useRef } from 'react';

// Generate products from filenames with proper names
const products = [
  { id: 1, name: 'Gasoline Water Pump', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/1-gasoline-water-pump.webp', slug: 'gasoline-water-pump' },
  { id: 2, name: 'Gasoline Engine', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/2-gasoline-engine.webp', slug: 'gasoline-engine' },
  { id: 3, name: 'Gasoline Generator', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/3-gasoline-generator.webp', slug: 'gasoline-generator' },
  { id: 4, name: 'Gasoline Inverter', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/4-gasoline-inverter.webp', slug: 'gasoline-inverter' },
  { id: 5, name: 'Gasoline Tiller', image: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/5-gasoline-tiller.webp', slug: 'gasoline-tiller' },
];

function Producty() {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [containerTop, setContainerTop] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let animationFrameId;
    
    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const isVisible = rect.top < windowHeight && rect.bottom > 0;
          setIsInView(isVisible);
          setContainerTop(rect.top + currentScrollY);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleProductClick = (product) => {
    window.location.href = `/products/${product.slug}`;
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  const calculateParallaxOffset = (factor = 0.5) => {
    if (!isInView) return 0;
    const containerOffset = containerTop - scrollY;
    const parallaxOffset = containerOffset * factor;
    return parallaxOffset;
  };

  const backgroundParallax = calculateParallaxOffset(0.3);
  const overlayParallax = calculateParallaxOffset(0.15);
  const contentParallax = calculateParallaxOffset(-0.1);

  const scrollProgress = containerRef.current 
    ? Math.max(0, Math.min(1, (scrollY - containerTop + window.innerHeight) / (window.innerHeight * 2)))
    : 0;

  const zoomScale = 1 + (scrollProgress * 0.05);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute top-8 left-0 right-0 z-50 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Our Product Range
        </h2>
        <p className="text-xl text-gray-300">
          Explore our comprehensive collection of industrial equipment
        </p>
      </div>

      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${products[currentIndex].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate3d(0, ${backgroundParallax}px, 0) scale(${1.1 * zoomScale})`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-30 max-w-md">
          <div className="bg-[#9a9c30]/95 p-8 rounded-lg shadow-2xl backdrop-blur-md border border-white/10">
            <div className="text-white text-sm uppercase tracking-wider mb-2 opacity-90">
              Product {String(currentIndex + 1).padStart(2, '0')} of {products.length}
            </div>
            <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
              {products[currentIndex].name}
            </h3>
            <p className="text-green-100 mb-6 leading-relaxed">
              High-quality industrial equipment designed for professional use and maximum efficiency.
            </p>
            <button 
              onClick={() => handleProductClick(products[currentIndex])}
              className="px-8 py-3 bg-white text-[#9a9c30] font-semibold rounded-full 
                       hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl 
                       transform hover:scale-105 cursor-pointer active:scale-95"
            >
              View Product Details
            </button>
          </div>
        </div>

        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 
                   bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 
                   transition-all duration-300 text-white hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 
                   bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 
                   transition-all duration-300 text-white hover:scale-110 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-40">
        <div className="container mx-auto px-8">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {products.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex % 5 
                      ? 'bg-[#9a9c30] scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm 
                       rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Producty;
