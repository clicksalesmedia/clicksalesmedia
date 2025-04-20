'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BlogPostForm from '@/app/components/dashboard/BlogPostForm';

export default function NewBlog() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    redirect('/dashboard/login');
  }
  
  // Initial empty form data
  const initialData = {
    title: '',
    titleAr: '',
    slug: '',
    content: '',
    contentAr: '',
    excerpt: '',
    excerptAr: '',
    coverImage: '',
    published: false,
    categories: [],
  };
  
  return (
    <div className="dashboard">
      <BlogPostForm 
        initialData={initialData} 
        formType="new" 
      />
    </div>
  );
}
