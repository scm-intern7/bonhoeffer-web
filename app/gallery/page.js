'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function GalleryPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to photos by default
    router.replace('/gallery/photos')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
        <p>Redirecting to gallery...</p>
      </div>
    </div>
  )
}

export default GalleryPage
