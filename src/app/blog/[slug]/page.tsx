import Details from '@/app/components/Blog/Details'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/app/lib/prisma'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params for published blog posts
export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true }
    })
    
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: {
        title: true,
        titleAr: true,
        excerpt: true,
        excerptAr: true,
        coverImage: true
      }
    })
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }
    
    return {
      title: post.title,
      description: post.excerpt || 'Read this blog post from ClickSales Media',
      openGraph: {
        title: post.title,
        description: post.excerpt || 'Read this blog post from ClickSales Media',
        images: post.coverImage ? [{ url: post.coverImage }] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || 'Read this blog post from ClickSales Media',
        images: post.coverImage ? [post.coverImage] : [],
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Blog post content.',
    }
  }
}

// Blog Post page component
export default async function BlogPostPage({ params }: Props) {
  try {
    const { slug } = await params
    
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })
    
    if (!post) {
      notFound()
    }
    
    return (
      <>
        <Details post={{
          ...post,
          coverImage: post.coverImage || '/images/blog_uploads/default-blog-image.jpg',
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString()
        }} />
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
} 