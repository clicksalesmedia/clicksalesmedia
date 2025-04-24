import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clicksalesmedia.com'
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/expertise',
    '/our-work',
    '/expertise/ai-marketing',
    '/expertise/branding',
    '/expertise/social-media-management',
    '/expertise/website-solutions',
    '/expertise/web-animation',
    '/expertise/seo-solutions',
    '/expertise/google-marketing-services',
    '/expertise/business-to-business',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  return routes
} 