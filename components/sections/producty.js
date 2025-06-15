'use client';
import React, { useState, useEffect, useRef } from 'react';

const products = [
  { id: 1, name: 'Gasoline Water Pump', image: '/home-products/1-gasoline-water-pump.webp', depth: 1 },
  { id: 2, name: 'Gasoline Engine', image: '/home-products/2-gasoline-engine.webp', depth: 2 },
  { id: 3, name: 'Gasoline Generator', image: '/home-products/3-gasoline-generator.webp', depth: 3 },
  { id: 4, name: 'Gasoline Inverter', image: '/home-products/4-gasoline-inverter.webp', depth: 4 },
  { id: 5, name: 'Gasoline Tiller', image: '/home-products/5-gasoline-tiller.webp', depth: 5 },
  { id: 6, name: 'Brush Cutter', image: '/home-products/7-brush-cutter.webp', depth: 6 },
];

function Producty() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const [containerOffset, setContainerOffset] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerOffset(window.scrollY + rect.top);
        setContainerHeight(rect.height);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate how much the user has scrolled through this section
  const scrollProgress = Math.max(0, Math.min(1, 
    (scrollY - containerOffset + window.innerHeight) / (containerHeight + window.innerHeight)
  ));

  // Create dramatic parallax effects based on scroll progress
  const getParallaxTransform = (depth, type = 'background') => {
    const baseMove = (scrollProgress - 0.5) * 100;
    
    switch (type) {
      case 'background':
        return `translate3d(0, ${baseMove * depth * 0.3}px, 0) scale(${1 + scrollProgress * 0.2})`;
      case 'midground':
        return `translate3d(0, ${baseMove * depth * 0.6}px, 0) scale(${1 + scrollProgress * 0.1})`;
      case 'foreground':
        return `translate3d(0, ${baseMove * depth * 1.2}px, 0) rotateX(${scrollProgress * 5}deg)`;
      default:
        return `translate3d(0, ${baseMove * depth}px, 0)`;
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Title that follows scroll with perspective */}
      <div className="sticky top-1/2 transform -translate-y-1/2 z-50 text-center">
        <h2 
          className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight"
          style={{
            transform: `perspective(1000px) rotateY(${(scrollProgress - 0.5) * 20}deg) translateZ(${scrollProgress * 50}px)`,
            opacity: 1 - Math.abs(scrollProgress - 0.5) * 2,
          }}
        >
          INDUSTRIAL
          <br />
          <span className="text-[#9a9c30]">POWER</span>
        </h2>
      </div>

      {/* Deep background layers */}
      <div className="absolute inset-0">
        {products.map((product, index) => (
          <div
            key={`bg-${product.id}`}
            className="absolute inset-0"
            style={{
              transform: getParallaxTransform(product.depth, 'background'),
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${product.image})`,
              backgroundSize: '120%',
              backgroundPosition: `${50 + index * 10}% ${30 + index * 15}%`,
              backgroundAttachment: 'fixed',
              opacity: 0.15 - index * 0.02,
              filter: `blur(${index * 2}px) sepia(${index * 10}%)`,
              zIndex: -product.depth,
            }}
          />
        ))}
      </div>

      {/* Floating product showcases */}
      <div className="absolute inset-0">
        {products.map((product, index) => {
          const xPos = 10 + (index % 3) * 30;
          const yStart = 20 + index * 40;
          const rotation = (scrollProgress - 0.5) * (10 + index * 5);
          
          return (
            <div
              key={`product-${product.id}`}
              className="absolute"
              style={{
                left: `${xPos}%`,
                top: `${yStart}%`,
                transform: `
                  ${getParallaxTransform(product.depth * 0.5, 'foreground')}
                  rotateY(${rotation}deg) 
                  rotateZ(${rotation * 0.3}deg)
                  scale(${0.8 + scrollProgress * 0.4})
                `,
                zIndex: 10 + index,
              }}
            >
              <div 
                className="relative group cursor-pointer"
                style={{
                  perspective: '1000px',
                }}
              >
                <div 
                  className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[#9a9c30]/50"
                  style={{
                    background: `linear-gradient(135deg, rgba(154,156,48,0.2) 0%, rgba(0,0,0,0.8) 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(154,156,48,0.3)',
                    transform: `rotateX(${scrollProgress * 10}deg)`,
                  }}
                >
                  <div className="p-8 h-full flex flex-col justify-between">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-2xl mb-6 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        transform: `translateY(${(scrollProgress - 0.5) * 20}px) rotateX(${scrollProgress * -5}deg)`,
                        filter: `brightness(${1 + scrollProgress * 0.3})`,
                      }}
                    />
                    
                    <div>
                      <h3 
                        className="text-white text-2xl font-bold mb-4 leading-tight"
                        style={{
                          transform: `translateY(${(scrollProgress - 0.5) * -10}px)`,
                        }}
                      >
                        {product.name}
                      </h3>
                      
                      <div 
                        className="text-[#9a9c30] font-semibold text-lg"
                        style={{
                          transform: `translateY(${(scrollProgress - 0.5) * -15}px)`,
                          opacity: 0.7 + scrollProgress * 0.3,
                        }}
                      >
                        Professional Series
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic particle field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const x = (i % 10) * 10;
          const y = Math.floor(i / 10) * 20;
          const delay = i * 0.1;
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#9a9c30] rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `
                  translate3d(
                    ${Math.sin(scrollProgress * Math.PI * 2 + delay) * 50}px,
                    ${(scrollProgress - 0.5) * (100 + i * 10)}px,
                    0
                  ) scale(${0.3 + scrollProgress})
                `,
                opacity: Math.sin(scrollProgress * Math.PI + delay) * 0.5 + 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Immersive scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="w-64 h-2 bg-black/30 rounded-full overflow-hidden backdrop-blur"
            style={{
              background: `linear-gradient(90deg, #9a9c30 ${scrollProgress * 100}%, rgba(255,255,255,0.1) ${scrollProgress * 100}%)`,
            }}
          />
          
          <div 
            className="text-white text-sm font-mono"
            style={{
              opacity: 0.7 + scrollProgress * 0.3,
              transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            }}
          >
            EXPLORING {Math.round(scrollProgress * 100)}% COMPLETE
          </div>
        </div>
      </div>

      {/* Depth field overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + (scrollProgress - 0.5) * 100}% 50%, transparent 0%, rgba(0,0,0,${0.3 + scrollProgress * 0.4}) 70%)`,
          zIndex: 5,
        }}
      />
    </section>
  );
}

export default Producty;
