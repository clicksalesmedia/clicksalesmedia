'use client'

import Script from 'next/script'

interface OrganizationSchemaProps {
  url?: string;
  logo?: string;
  name?: string;
  description?: string;
}

export function OrganizationSchema({
  url = 'https://www.clicksalesmedia.com',
  logo = 'https://www.clicksalesmedia.com/clicksalesmedialogo.png',
  name = 'Clicksalesmedia',
  description = 'Premier AI performance marketing agency in Dubai, UAE'
}: OrganizationSchemaProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: [
      'https://www.facebook.com/clicksalesmedia',
      'https://www.instagram.com/clicksalesmedia',
      'https://www.linkedin.com/company/clicksalesmedia',
      'https://twitter.com/clicksalesmedia'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-4-123-4567',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai, UAE',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE'
    },
    foundingDate: '2020-01-01',
    founders: [
      {
        '@type': 'Person',
        name: 'Founder Name' // Replace with actual founder name
      }
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-50' // Approximate range
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 25.2048,
        longitude: 55.2708
      },
      geoRadius: '50km'
    }
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = 'Clicksalesmedia',
  areaServed = 'Dubai, UAE'
}: ServiceSchemaProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    areaServed,
    url
  }

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  )
}

interface WebsiteSchemaProps {
  url?: string;
  name?: string;
  description?: string;
}

export function WebsiteSchema({
  url = 'https://www.clicksalesmedia.com',
  name = 'Clicksalesmedia - AI Performance Marketing Agency',
  description = 'Premier AI performance marketing agency in Dubai, UAE'
}: WebsiteSchemaProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.clicksalesmedia.com/#localbusiness',
    name: 'Clicksalesmedia',
    image: 'https://www.clicksalesmedia.com/clicksalesmedialogo.png',
    priceRange: '$$',
    description: 'Premier AI performance marketing agency in Dubai, UAE',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dubai, UAE',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708
    },
    telephone: '+971-4-123-4567',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    url: 'https://www.clicksalesmedia.com',
    sameAs: [
      'https://www.facebook.com/clicksalesmedia',
      'https://www.instagram.com/clicksalesmedia',
      'https://www.linkedin.com/company/clicksalesmedia',
      'https://twitter.com/clicksalesmedia'
    ]
  }

  return (
    <Script
      id="localbusiness-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  )
} 