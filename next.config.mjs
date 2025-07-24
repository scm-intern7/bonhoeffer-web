/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize image formats and settings
    formats: ['image/webp', 'image/avif'], // Use modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Reduce device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Optimize small images
    minimumCacheTTL: 86400, // Cache for 24 hours (reduces repeated optimizations)
    
    remotePatterns: [
      { protocol: 'https', hostname: '9lhi1aprmhe38img.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'bonhoeffermachines.com' },
      { protocol: 'https', hostname: 'bonhoeffermachines.in' },
      { protocol: 'https', hostname: 'en-blog.bonhoeffermachines.com'}
    ]
  },
};

export default nextConfig;
