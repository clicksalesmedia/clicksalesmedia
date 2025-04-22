/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800, // 7 days in seconds
    domains: ['clicksalesmedia.com', 'www.clicksalesmedia.com', 'i.ibb.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clicksalesmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.clicksalesmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Minify the generated output
  swcMinify: true,

  // Disable unnecessary x-powered-by header
  poweredByHeader: false,

  // Add redirects for problematic paths
  async redirects() {
    return [
      {
        source: '/components/dashboard/seo/sitemap.xml',
        destination: '/api/sitemap.xml',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 