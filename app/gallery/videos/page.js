'use client'
import React, { useState } from 'react'
import BgLayout from '@/components/templates/bgLayout'
import { motion, AnimatePresence } from 'framer-motion'

function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [failedThumbnails, setFailedThumbnails] = useState(new Set())

  // YouTube video URLs from ytvids.txt
  const youtubeVideos = [
    'https://www.youtube.com/embed/PK7vX_UUwjg',
    'https://www.youtube.com/embed/_X_TSlSgsxs',
    'https://www.youtube.com/embed/w_mqxMLSlnU',
    'https://www.youtube.com/embed/rQz9cBmZ0Fo?si=VTC7xEbMFNg71D26',
    'https://www.youtube.com/embed/Ttt6Bza8asw?si=uTih3cBIbHHg1oDT',
    'https://www.youtube.com/embed/3pAwtrSEN9M?si=Ngfs4wUMFBknj5lg',
    'https://www.youtube.com/embed/dzjUZh8dvsY?si=LGpVNlbNFOjSItZK',
    'https://www.youtube.com/embed/YQF1CTd3Zeo?si=UFcPyChx7mYxP77c',
    'https://www.youtube.com/embed/bnrgLd_fLeI?si=LxYfUqUOMlPLK4uP',
    'https://www.youtube.com/embed/g-Ps-Pz1QJc',
    'https://www.youtube.com/embed/pEt_yUkdbCU',
    'https://www.youtube.com/embed/OLK47HGbFIc',
    'https://www.youtube.com/embed/D-OcfsR3iz8',
    'https://www.youtube.com/embed/HtfzPrXLn58',
    'https://www.youtube.com/embed/2eT-_7jQIFA',
    'https://www.youtube.com/embed/HE2g7NCM6l8',
    'https://www.youtube.com/embed/9jqGSWIh0Vo',
    'https://www.youtube.com/embed/qDw_MiGOPqw',
    'https://www.youtube.com/embed/rq-xWluwyu8',
    'https://www.youtube.com/embed/TzVU4bKKRXE',
    'https://www.youtube.com/embed/4YXTyEu18S8',
    'https://www.youtube.com/embed/4dEHZSPnceY',
    'https://www.youtube.com/embed/VyL3mcHWl3g',
    'https://www.youtube.com/embed/x0VBJ4TPigo',
    'https://www.youtube.com/embed/gnXa_Qud65E',
    'https://www.youtube.com/embed/S3fhIWEdH14',
    'https://www.youtube.com/embed/-h-Lzed16Ik',
    'https://www.youtube.com/embed/j1j0UPvMEBw',
    'https://www.youtube.com/embed/EOU1kCSROck',
    'https://www.youtube.com/embed/Prtebkg68EU',
    'https://www.youtube.com/embed/dGa1C_vI-Co',
    'https://www.youtube.com/embed/dis79Os6H2Q',
    'https://www.youtube.com/embed/OMDXRtjhJbk',
    'https://www.youtube.com/embed/sHNMi26jEnw',
    'https://www.youtube.com/embed/_tQImGxsgAg',
    'https://www.youtube.com/embed/dAtvfdQJrrw',
    'https://www.youtube.com/embed/virIG_nfGjI',
    'https://www.youtube.com/embed/SBmLYb8j7fY',
    'https://www.youtube.com/embed/dHV-3-P-h-w',
    'https://www.youtube.com/embed/3u20NiyM-YI',
    'https://www.youtube.com/embed/V0v_b7C-BNU',
    'https://www.youtube.com/embed/vGrx6XgKfEE',
    'https://www.youtube.com/embed/dFHfnY-boO4',
    'https://www.youtube.com/embed/gyvpEqfILt0',
    'https://www.youtube.com/embed/ap_HcYXN0e0',
    'https://www.youtube.com/embed/spl98c4_wU0',
    'https://www.youtube.com/embed/YjpPOUOg_BM',
    'https://www.youtube.com/embed/_K1uyE__RoA',
    'https://www.youtube.com/embed/kwm9vETANRs',
    'https://www.youtube.com/embed/bvYHdxSetAc',
    'https://www.youtube.com/embed/Y4FDt4YwK5g',
    'https://www.youtube.com/embed/0FKYCDMzaN4',
    'https://www.youtube.com/embed/Hnx81kTLQ6o',
    'https://www.youtube.com/embed/YkI6395CtUg',
    'https://www.youtube.com/embed/LvHWwiSI2D0',
    'https://www.youtube.com/embed/7GTbDg24dPw',
    'https://www.youtube.com/embed/xII22h7AieE',
    'https://www.youtube.com/embed/BjUC99QfIdU',
    'https://www.youtube.com/embed/nTniQrQKLkM',
    'https://www.youtube.com/embed/6GhE92JNE64',
    'https://www.youtube.com/embed/MTvlVMSQBMo'
  ]

  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  const getVideoThumbnail = (embedUrl) => {
    // Extract video ID from YouTube embed URL
    const videoId = embedUrl.split('/embed/')[1]?.split('?')[0]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  const handleThumbnailError = (index) => {
    setFailedThumbnails(prev => new Set([...prev, index]))
  }

  // Add CSS to reduce footer z-index on gallery pages
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      footer {
        z-index: 10 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Clean up the style when component unmounts
      document.head.removeChild(style)
    }
  }, [])

  return (
    <BgLayout>
      {/* Header */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Video <span className="text-[#989b2e]">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our product demonstrations, events, and behind-the-scenes content
          </p>
          <div className="mt-4 text-sm text-gray-400">
            {youtubeVideos.length} Videos
          </div>
        </motion.div>
      </section>

      {/* Videos Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {youtubeVideos.map((videoUrl, index) => (
              <motion.div
                key={index}
                className="relative aspect-video cursor-pointer group overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openVideoModal(videoUrl)}
              >
                {/* Video Thumbnail */}
                <div className="relative w-full h-full bg-gray-800">
                  {!failedThumbnails.has(index) ? (
                    <img
                      src={getVideoThumbnail(videoUrl)}
                      alt={`Video ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleThumbnailError(index)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center text-gray-300">
                        <svg className="w-16 h-16 mx-auto mb-3 text-[#989b2e]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="text-sm font-medium">Video {index + 1}</div>
                        <div className="text-xs text-gray-400 mt-1">Click to play</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Play Button Overlay - Only show if thumbnail loaded OR if it's a placeholder */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  {!failedThumbnails.has(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#989b2e] hover:bg-[#8a8c20] text-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Video Number - Only show if thumbnail loaded */}
                  {!failedThumbnails.has(index) && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Video {index + 1}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-[#989b2e] z-[10000]"
              onClick={closeVideoModal}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={selectedVideo}
                title="YouTube video player"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BgLayout>
  )
}

export default VideosPage