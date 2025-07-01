'use client'
import BgLayout from "@/components/templates/bgLayout"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Image Slider Component
function ImageSlider({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative h-145 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#989b2e]/90 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#989b2e] hover:bg-[#989b2e]/90 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-[#989b2e] scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 bg-[#989b2e] hover:bg-[#989b2e]/90 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-300"
      >
        {isAutoPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  )
}

function SponsorPage() {
  const bannerImage = "https://bonhoeffermachines.in/public/images/about-new/About-us-new-banner.webp"
  
  const images1 = [
    "https://bonhoeffermachines.com/public/media/Football1.jpg",
    "https://bonhoeffermachines.com/public/media/fair5.jpeg",
    "https://bonhoeffermachines.com/public/media/fair3.jpeg",
    "https://bonhoeffermachines.com/public/media/Football3.jpg",
    "https://bonhoeffermachines.com/public/media/Football4.jpg",
    "https://bonhoeffermachines.com/public/media/Football7.jpeg",
    "https://bonhoeffermachines.com/public/media/fair1.jpeg",
    "https://bonhoeffermachines.com/public/media/Football8.jpg",
    "https://bonhoeffermachines.com/public/media/event-26may1.jpeg",
    "https://bonhoeffermachines.com/public/media/event-31aug1.webp"
  ]

  const images2 = [
    "https://bonhoeffermachines.com/public/media/event-5jun1.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun2.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun3.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun4.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun5.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun6.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun7.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun8.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun9.webp",
    "https://bonhoeffermachines.com/public/media/event-5jun10.webp"
  ]

  const images3 = [
    "https://bonhoeffermachines.com/public/media/event-7july1.webp",
    "https://bonhoeffermachines.com/public/media/event-7july2.webp",
    "https://bonhoeffermachines.com/public/media/event-7july3.webp",
    "https://bonhoeffermachines.com/public/media/event-7july4.webp",
    "https://bonhoeffermachines.com/public/media/event-7july5.webp",
    "https://bonhoeffermachines.com/public/media/event-7july6.webp",
    "https://bonhoeffermachines.com/public/media/event-7july7.webp",
    "https://bonhoeffermachines.com/public/media/event-7july8.webp",
    "https://bonhoeffermachines.com/public/media/event-7july9.webp"
  ]

  return (
    <BgLayout>
     {/* Mobile header spacer for fixed header on mobile/tablet */}
      <div className="block lg:hidden" style={{ height: '4em' }} aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden mt-5 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="https://bonhoeffermachines.com/public/images/about-new/About-us-new-banner.webp"
            alt="About Us Banner"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/50" /> */}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-10 h-10 text-[#989b2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section>  
        <motion.div 
          className="relative mt-5 z-10 text-center text-white px-2 sm:px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Sponsorship <span className="text-[#989b2e]">Programs</span> 
          </motion.h1>
          <motion.p 
            className="text-lg xs:text-xl sm:text-xl md:text-2xl max-w-2xl sm:max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Building Communities, Supporting Dreams, Creating Impact
          </motion.p>
        </motion.div>
      </section>

      {/* Hero Banner Section */}
      {/* <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Bonhoeffer Machines Sponsorship Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-[#989b2e]">Sponsorship</span> Programs
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed"
          >
            Building Communities, Supporting Dreams, Creating Impact
          </motion.p>
        </motion.div> */}

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section> */}

      {/* Introduction Section */}
      <section className="pt-20 pb-5 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              A Glimpse into <span className="text-[#989b2e]">Bonhoeffer Machines</span> Sponsorship Programs
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
              Social work is essential for any organization that is part of society and committed to the growth of communities and individuals. We share this belief at Bonhoeffer Machines. As an Indian company, we operate in Latin American, Asian, and Central American countries. Our objective is to contribute to society through active participation in various events and major programs. We sponsor and support numerous social initiatives, including sports events and government-sponsored programs. Through this page, you can determine how we are helping society through various programs and events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Football Partnership Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#989b2e] rounded-full p-3 mr-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8C8.12 8 7 6.88 7 5.5S8.12 3 9.5 3 12 4.12 12 5.5 10.88 8 9.5 8zm5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM16 9c-1.38 0-2.5-1.12-2.5-2.5S14.62 4 16 4s2.5 1.12 2.5 2.5S17.38 9 16 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Football Partnership</h3>
                </div>
                <h4 className="text-2xl font-semibold text-[#989b2e] mb-4">
                  Bonhoeffer Machines Partners with Club Deportivo Marathón to Support Honduran Football
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Bonhoeffer Machines is thrilled to announce its official partnership with Club Deportivo Marathón, one of Honduras's most celebrated football clubs with a rich 96-year history. As a proud sponsor, we are dedicated to supporting the team's pursuit of excellence on the field and helping them achieve their ambitious goals. Our company values of dedication, hard work, and teamwork align perfectly with the spirit of football, making this partnership a natural fit. We eagerly anticipate a successful collaboration that not only enhances the club's performance but also contributes to the growth and development of the sport in Honduras.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageSlider images={images1} title="Football Partnership" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cycling Competition Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:order-1"
            >
              <ImageSlider images={images2} title="Cycling Competition" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:order-2"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#989b2e] rounded-full p-3 mr-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Active Lifestyle</h3>
                </div>
                <h4 className="text-2xl font-semibold text-[#989b2e] mb-4">
                  Bonhoeffer Sponsors Cycling Competition in Noida to Promote Active Lifestyles
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Bonhoeffer Machines is proud to have sponsored a vibrant cycling competition in Noida, reaffirming our commitment to promoting health, wellness, and community spirit. This exciting event was designed to encourage individuals of all ages to embrace an active lifestyle, while fostering values like teamwork, perseverance, and sportsmanship. By supporting this initiative, Bonhoeffer highlights the importance of physical fitness and its role in building stronger, more connected communities. The cycling competition also served as a platform to raise awareness about sustainable transportation, with participants celebrating both friendly competition and eco-conscious living. We believe such events reflect our core values and social responsibility.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* USAID Partnership Section */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#989b2e] rounded-full p-3 mr-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Farmer Empowerment</h3>
                </div>
                <h4 className="text-2xl font-semibold text-[#989b2e] mb-4">
                  Empowering Farmers: Bonhoeffer Partners with USAID Nicaragua to Distribute Manual Sprayers
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Bonhoeffer is working with USAID Nicaragua to provide manual sprayers to farmers in rural and low-income areas of the country. These sprayers help farmers improve crop spraying, saving time and increasing productivity. The sprayers are affordable and easy to use, making them accessible to communities with limited resources. This partnership aims to support local agriculture, boost crop yields, and improve the livelihoods of farmers in Nicaragua. By providing these tools, Bonhoeffer and USAID are helping farmers grow healthier crops and strengthen their local economies.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ImageSlider images={images3} title="USAID Partnership" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className=""
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-[#989b2e]">Mission</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Partner with Bonhoeffer Machines to create meaningful impact in communities worldwide. 
              Together, we can build a better future through sports, agriculture, and social responsibility.
            </p>
            <Link href="/contact-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#989b2e] hover:bg-[#7a7f25] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                Contact Us for Partnerships
                </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </BgLayout>
  )
}

export default SponsorPage