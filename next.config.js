/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'placehold.co',
      'cdn.pixabay.com',
      'cdn.sanity.io',
    ],
  },
  
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