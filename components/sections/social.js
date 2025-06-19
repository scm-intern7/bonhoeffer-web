'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// FloatingArrow component for horizontal arrows
const FloatingArrow = ({ direction, className }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        x: direction === 'right' ? [0, 10, 0] : [0, -10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg width="80" height="8" viewBox="0 0 80 8" fill="none">
        <path
          d={direction === 'right' 
            ? "M0 4L6 0.5V2.5H79V5.5H6V7.5L0 4Z"
            : "M80 4L74 7.5V5.5H1V2.5H74V0.5L80 4Z"
          }
          fill="#989b2e"
        />
      </svg>
    </motion.div>
  )
}

// SocialSlider component for Instagram carousel
const SocialSlider = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef(null)
  const sliderRef = useRef(null)

  const postsPerView = 3
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

  // Auto-play muted videos for Instagram reels and process embeds
  useEffect(() => {
    // Process Instagram embeds when slider changes
    const processInstagramEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process()
      }
    }

    // Handle regular videos
    const videos = sliderRef.current?.querySelectorAll('video')
    videos?.forEach(video => {
      video.muted = true
      video.autoplay = true
      video.loop = true
      video.play().catch(e => console.log('Video autoplay prevented:', e))
    })

    // Process Instagram embeds after a delay
    const timer = setTimeout(processInstagramEmbeds, 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Navigation Arrows */}
      {posts.length > postsPerView && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[-45] top-1/2 transform -translate-y-1/2 z-10 bg-[#989b2e] hover:bg-[#7a7d24] text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[-45] top-1/2 transform -translate-y-1/2 z-10 bg-[#989b2e] hover:bg-[#7a7d24] text-white p-3 rounded-full transition-colors duration-300 shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </>
      )}

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
              <div className="bg-black rounded-xl shadow-lg overflow-hidden h-full relative group cursor-pointer">
                {post.link ? (
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {post.type === 'video' ? (
                      <video 
                        className="w-full h-96 object-cover"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                      >
                        <source src={post.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img 
                        src={post.src} 
                        alt={post.alt}
                        className="w-full h-96 object-cover"
                      />
                    )}
                    
                    {/* Instagram overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <p className="text-sm font-medium">View on Instagram</p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="h-full relative">
                    {post.type === 'video' ? (
                      <video 
                        className="w-full h-96 object-cover"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                      >
                        <source src={post.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img 
                        src={post.src} 
                        alt={post.alt}
                        className="w-full h-96 object-cover"
                      />
                    )}
                    
                    {/* No link overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-sm bg-black/50 px-3 py-1 rounded">Add Instagram link here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicators */}
      {posts.length > postsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
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
    </div>
  )
}

function Social() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    script.crossOrigin = 'anonymous'
    
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      document.body.appendChild(script)
    }

    // Process Instagram embeds after script loads
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process()
      }
    }

    // Also try to process embeds after a short delay
    setTimeout(() => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process()
      }
    }, 2000)

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  // Re-process Instagram embeds when currentIndex changes (for carousel)
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process()
      }
    }

    // Delay processing to ensure DOM is updated
    const timer = setTimeout(processEmbeds, 500)
    return () => clearTimeout(timer)
  }, [isVisible])

  // Instagram posts using local files with clickable links
  const instagramPosts = [
    // POST 1 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_488885213_1107940894680980_4789339094195931779_n.jpg',
      link: 'https://www.instagram.com/p/DCGWdZ6h8Ep/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 1'
    },

    // POST 2 - Video  
    {
      type: 'video',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_AQP-Q2mmRGLUiN_qFs_zkilVzghmekiys7TT_rgjlUhFz8B1Xpe7UHbk1i5bvsEp1Apya8OFf6KVlYDmsNBGFlggreGr_PnGSXWiWy0.mp4',
      link: 'https://www.instagram.com/reel/DC4ABhAph-Q/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Reel 1'
    },

    // POST 3 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489077248_1108475861294150_3656903405949980397_n.jpg',
      link: 'https://www.instagram.com/p/DC6k8BWBZE3/?img_index=3', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 2'
    },

    // POST 4 - Video
    {
      type: 'video',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_AQP7OJDMBLMjtJZFVAsdTJ5hfuak6GvvYkZLm09TvI2uRKlRbCONdJt2x2aKgY9BaSJ7th9Ip0c5yRFiKvMJLYkYnI_5oQoZyxQw6as.mp4',
      link: 'https://www.instagram.com/reel/DCjX3mtyPiZ/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Reel 2'
    },

    // POST 5 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489145578_1108062314668838_7283280978802939278_n.jpg',
      link: 'https://www.instagram.com/p/DCYd1gzBDsQ/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 3'
    },

    // POST 6 - Video
    {
      type: 'video',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_AQPaX38cYK6yL9YtmbuxwpdS2CN8XEK4RPvZwtbxuGi1G11r_JWudokpdyg6gU7EFb6IVaQQEvKDT-OkPrc5cpNLm3ThjASVJjuWNOI.mp4',
      link: 'https://www.instagram.com/reel/DCYeoPYM9HG/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Reel 3'
    },

    // POST 7 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489408786_1108288477979555_2083801441289224471_n.jpg',
      link: 'https://www.instagram.com/p/DCrKdKhhzGX/?img_index=2', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 4'
    },

    // POST 8 - Video
    {
      type: 'video',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_AQPejIREjYJM_5_UxtS6weKd7GEmD30CqTe6XF0l5u3c6svCm_OjF-c4iL7MVUSSKyWYjMC-IR1D-DrxolwhABUFjQ6DvEP6a0fsBd4.mp4',
      link: 'https://www.instagram.com/reel/DC4ABhAph-Q/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Reel 4'
    },

    // POST 9 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489439352_1108342044640865_7538575157735465045_n.jpg',
      link: 'https://www.instagram.com/p/DC0zD0Lh0zE/', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 5'
    },

    // POST 10 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489449824_1108288564646213_5468841401004960226_n.jpg',
      link: 'https://www.instagram.com/p/DCrKdKhhzGX/?img_index=1', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 6'
    },

    // POST 11 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489555397_1108288651312871_3601338633129120268_n.jpg',
      link: 'https://www.instagram.com/p/DCrKdKhhzGX/?img_index=3', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 7'
    },

    // POST 12 - Image
    {
      type: 'image',
      src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/SnapInsta.to_489911847_1108475831294153_2393572046063124811_n.jpg',
      link: 'https://www.instagram.com/p/DC6k8BWBZE3/?img_index=2', // PASTE INSTAGRAM POST LINK HERE
      alt: 'Instagram Post 8'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Header Section with Floating Arrows */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center mb-16"
        >
          {/* Left Arrow */}
          <FloatingArrow 
            direction="left" 
            className="right-full -mr-70 top-1/2 transform -translate-y-1/2" 
          />
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white"
          >
            Digital Platforms
          </motion.h1>
          
          {/* Right Arrow */}
          <FloatingArrow 
            direction="right" 
            className="left-full -ml-70 top-1/2 transform -translate-y-1/2" 
          />
        </motion.div>

        {/* Social Media Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="social-media-embed"
        >
          <SocialSlider posts={instagramPosts} />
        </motion.div>

        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Stay connected with our latest updates, behind-the-scenes moments, and community highlights across our social media platforms.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Social