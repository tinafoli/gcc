/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ghanacodeclub.org',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'ghanacode.club',
        pathname: '/images/**',
      }
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@headlessui/react'],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  
  staticPageGenerationTimeout: 120,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig; 