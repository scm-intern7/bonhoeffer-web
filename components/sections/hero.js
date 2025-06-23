"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom hook for counting animation
const useCountUp = (end, duration = 2, delay = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startCounting = () => {
    if (hasStarted) return;
    setHasStarted(true);
    
    setTimeout(() => {
      const increment = end / (duration * 60); // 60 FPS
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / 60);
    }, delay * 1000);
  };

  return [count, startCounting];
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", prefix = "", delay = 0 }) => {
  const [count, startCounting] = useCountUp(end, 2.5, delay);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      startCounting();
    }
  }, [inView, startCounting]);

  return (
    <motion.span
      ref={ref}
      className="font-bold text-[#989b2e]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: delay }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <>
      <section ref={containerRef} className="relative min-h-screen overflow-hidden">
        {/* Main Content */}
        <div className='flex flex-col items-center text-white pt-20 relative z-10'>
          {/* Hero Title - Simplified Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className='text-6xl font-bold mb-4 text-white'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Welcome to Bonhoeffer Machines
            </motion.h1>
            
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Innovating the future of industrial machinery with cutting-edge technology
            </motion.p>
          </motion.div>

          {/* Search Bar - Simplified */}
          <motion.div 
            className='flex flex-row mt-8 relative'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <input 
              type='text' 
              placeholder='Search our products...' 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className='w-96 p-3 rounded-l-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#989b2e] transition-all duration-300 border border-white/20'
            />
            <button 
              className='px-6 py-3 bg-[#989b2e] rounded-r-lg transition-all duration-300 font-semibold hover:bg-[#7a7d24]'
            >
              Search
            </button>
          </motion.div>
        </div>

        {/* Video Section - Simplified Parallax */}
        <motion.div 
          className='flex justify-center mt-16 relative'
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <video 
            className='w-[75%] mx-auto object-cover rounded-2xl shadow-xl' 
            autoPlay 
            loop 
            muted
          >
            <source src="https://bonhoeffermachines.com/en/public/images/Brand_Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Statistics Section - Simplified */}
        <motion.div 
          className='flex justify-center items-center gap-16 mt-50 mb-16'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Statistics Column */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="px-12 py-8 mb-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h1 className='text-8xl font-bold mb-2 text-[#989b2e]'>Global</h1>
              <h2 className='text-7xl font-bold text-white'>Presence</h2>
            </div>
            
            <div className="space-y-10">
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-4xl font-semibold text-white'>
                  <AnimatedCounter end={3} suffix="+" delay={0.5} /> Continents
                </h3>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-4xl font-semibold text-white'>
                  <AnimatedCounter end={17} suffix="+" delay={0.8} /> Countries
                </h3>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className='text-4xl font-semibold text-white'>
                  <AnimatedCounter end={4500} suffix="+" delay={0.5} /> Products
                </h3>
              </div>
            </div>
          </motion.div>

          {/* GIF Section - Simplified */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://bonhoeffermachines.com/en/public/index_files/Global%20Presence.gif" 
              alt="Hero Animation"
              className="w-full object-cover rounded-2xl border-2 border-[#989b2e]/30 shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero