// next-sitemap.config.js

module.exports = {
  siteUrl: 'https://www.clicksalesmedia.com', // Replace with your actual site URL
  generateRobotsTxt: true, // Generate a robots.txt file
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // You can add more policies if needed
    ],
  },
  sitemapSize: 7000, // Optional: The number of URLs per sitemap file
};
