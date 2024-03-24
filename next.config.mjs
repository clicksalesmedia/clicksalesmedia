/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'aceternity.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'clicksalesmediacms.s3.us-east-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
