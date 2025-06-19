"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Event images data (same as in events.js)
const eventImages = [
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Argentina-Fair.png', name: 'Argentina Fair', slug: 'argentina-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/coimbatore-fair-home.webp', name: 'Coimbatore Fair', slug: 'coimbatore-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Colombia-Fair.png', name: 'Colombia Fair', slug: 'colombia-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Domican-Republic.png', name: 'Dominican Republic', slug: 'dominican-republic' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Football-Event.png', name: 'Football Event', slug: 'football-event' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/indian-fair.png', name: 'Indian Fair', slug: 'indian-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/Mexico-Fair.png', name: 'Mexico Fair', slug: 'mexico-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/nicaragua-fair-home.webp', name: 'Nicaragua Fair', slug: 'nicaragua-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/peru-fair.png', name: 'Peru Fair', slug: 'peru-fair' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/usaid1.png', name: 'USAID Event 1', slug: 'usaid-event-1' },
  { src: 'https://9lhi1aprmhe38img.public.blob.vercel-storage.com/usaid2.png', name: 'USAID Event 2', slug: 'usaid-event-2' }
];

export default function EventDetail({ params }) {
  const router = useRouter();
  // Unwrap the params Promise using React.use()
  const { slug } = React.use(params);
  
  // Find the event based on slug
  const event = eventImages.find(img => img.slug === slug);
  
  if (!event) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
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

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Global Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />
      
      <div className="relative z-10">
        {/* Header/Navigation */}
        <motion.div 
          className="flex items-center justify-between p-6"
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
          
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {event.name}
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Hero Image */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <img
                src={event.src}
                alt={event.name}
                className="h-full mx-auto object-cover rounded-2xl shadow-2xl"
                style={{ aspectRatio: '9/16' }}
              />
              
              {/* Event Name Overlay */}
              <div className="absolute bottom-2 left-25">
                <div className="bg-[#989b2e] px-6 py-3 rounded-lg shadow-lg">
                  <h2 className="text-white text-xl md:text-2xl font-bold">
                    {event.name}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Event Details Section */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Event Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Event Information</h3>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-[#989b2e] font-semibold">Event:</span> {event.name}</p>
                <p><span className="text-[#989b2e] font-semibold">Type:</span> Industrial Machinery Exhibition</p>
                <p><span className="text-[#989b2e] font-semibold">Status:</span> Completed</p>
                <p><span className="text-[#989b2e] font-semibold">Participation:</span> Active Exhibitor</p>
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {/* Placeholder for additional photos */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item}
                    className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center opacity-50"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">More photos coming soon...</p>
            </div>
          </motion.div>

          {/* Video Section Placeholder */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Event Videos</h3>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-3">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <p>Event videos coming soon...</p>
              </div>
            </div>
          </motion.div>

          {/* Other Events */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Other Events</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventImages
                .filter(img => img.slug !== slug)
                .slice(0, 4)
                .map((otherEvent, index) => (
                  <motion.div
                    key={otherEvent.slug}
                    className="cursor-pointer group"
                    onClick={() => router.push(`/events/${otherEvent.slug}`)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <img
                        src={otherEvent.src}
                        alt={otherEvent.name}
                        className="h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors rounded-lg" />
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-[#989b2e] px-2 py-1 rounded text-md text-white font-semibold">
                          {otherEvent.name}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
