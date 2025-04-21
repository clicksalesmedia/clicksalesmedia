import Details from '@/app/components/Blog/Details'
import { prisma } from '@/app/lib/prisma'
import { Metadata, ResolvingMetadata } from 'next'
import { normalizeImageUrl } from '@/app/lib/utils'
import Script from 'next/script'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static pages for all published blog posts
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata dynamically for each blog post
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch the blog post data
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      categories: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  // Process the image URL
  const imageUrl = normalizeImageUrl(post.coverImage)
  const absoluteImageUrl = imageUrl.startsWith('/') 
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://clicksalesmedia.com'}${imageUrl}`
    : imageUrl

  // Get the categories as keywords
  const keywords = post.categories.map(cat => cat.name).join(', ')

  // Create excerpt for description if not available
  const description = post.excerpt 
    ? post.excerpt 
    : post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'

  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clicksalesmedia.com'

  return {
    title: post.title,
    description: description,
    keywords: `${keywords}, blog, clicksalesmedia, digital marketing, marketing agency`,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: post.author?.name ? [post.author.name] : ['ClickSalesMedia'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [absoluteImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

// Blog Post page component
export default async function BlogPostPage({ params }: Props) {
  return (
    <>
      <Details />
      <BlogPostJsonLd params={params} />
    </>
  )
}

// JSON-LD structured data for blog post
async function BlogPostJsonLd({ params }: Props) {
  // Fetch the blog post data for structured data
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      categories: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!post) return null;

  // Process the image URL for structured data
  const imageUrl = normalizeImageUrl(post.coverImage);
  const absoluteImageUrl = imageUrl.startsWith('/') 
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://clicksalesmedia.com'}${imageUrl}`
    : imageUrl;

  // Format the dates properly
  const publishDate = new Date(post.createdAt).toISOString();
  const modifiedDate = new Date(post.updatedAt).toISOString();

  // Base URL for links
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clicksalesmedia.com';

  // Create the structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    "image": [absoluteImageUrl],
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": post.author?.name ? "Person" : "Organization",
      "name": post.author?.name || "ClickSalesMedia",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "ClickSalesMedia",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/clicksalesmedialogo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "keywords": post.categories.map(cat => cat.name).join(', ')
  };

  return (
    <Script id="blog-post-jsonld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(structuredData)}
    </Script>
  );
}
