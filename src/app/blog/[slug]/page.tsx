import Details from '@/app/components/Blog/Details'
import { Metadata } from 'next'
import Script from 'next/script'

type Props = {
  params: Promise<{ slug: string }>
}

// Generate static params (empty for now)
export async function generateStaticParams() {
  return []
}

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog Post',
    description: 'Blog post content.',
  }
}

// Blog Post page component
export default async function BlogPostPage() {
  return (
    <>
      <Details />
    </>
  )
} 