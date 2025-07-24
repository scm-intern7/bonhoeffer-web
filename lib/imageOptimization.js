// lib/imageOptimization.js
// Helper to optimize image URLs for better caching and smaller sizes

export const optimizeImageUrl = (url, width = 800, quality = 85) => {
  // If it's already a Next.js optimized image URL, return as-is
  if (url.includes('/_next/image')) {
    return url;
  }
  
  // For external images, we'll let Next.js Image component handle optimization
  return url;
};

export const getImageProps = (src, alt, width, height, priority = false) => {
  return {
    src,
    alt,
    width,
    height,
    quality: 85, // Reduce from default 100
    priority,
    loading: priority ? 'eager' : 'lazy',
    placeholder: 'blur',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  };
};

// Predefined sizes for common use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 }
};
