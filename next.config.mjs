/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Reduced sizes for faster optimization
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    qualities: [60, 75, 90],
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
  staticPageGenerationTimeout: 300,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // Server components configuration
  serverExternalPackages: [],
  // Explicitly use webpack to avoid Turbopack conflicts
  // Turbopack is default in Next.js 16, but we have webpack config
  turbopack: undefined,
};

export default nextConfig;
