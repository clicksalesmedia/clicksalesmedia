// next-sitemap.config.js

module.exports = {
  siteUrl: 'https://www.clicksalesmedia.com', // Replace with your actual site URL
  generateRobotsTxt: true, // Generate a robots.txt file
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/dashboard/' },
    ],
    additionalSitemaps: [
      'https://www.clicksalesmedia.com/server-sitemap.xml',
    ],
  },
  sitemapSize: 7000, // Optional: The number of URLs per sitemap file
  exclude: [
    '/api/*', 
    '/dashboard/*', 
    '/components/dashboard/seo/sitemap.xml',
    '/components/dashboard/seo/sitemap'
  ],
  priority: 0.7,
  changefreq: 'weekly',
  transform: async (config, path) => {
    // Custom priority for specific pages
    const priority = path === '/' 
      ? 1.0 
      : path.includes('/blog/') 
        ? 0.8 
        : path.includes('/expertise/') 
          ? 0.9 
          : path.includes('/case-studies/') 
            ? 0.8 
            : 0.7;

    // Custom change frequency
    const changefreq = path === '/' 
      ? 'daily' 
      : path.includes('/blog/') 
        ? 'weekly' 
        : 'monthly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};
