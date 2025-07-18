/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '9lhi1aprmhe38img.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'bonhoeffermachines.com' },
      { protocol: 'https', hostname: 'bonhoeffermachines.in' },
      { protocol: 'https', hostname: 'en-blog.bonhoeffermachines.com'}
    ]
  },
};

export default nextConfig;
