'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaSave, FaUpload } from 'react-icons/fa';
import { slugify } from '@/app/lib/utils';
import Image from 'next/image';
import RichTextEditor from '@/app/components/RichTextEditor';

export default function EditBlog() {
  const params = useParams();
  const postSlug = params?.slug as string;
  
  console.log('Blog slug from URL:', postSlug);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    titleAr: '',
    slug: '',
    content: '',
    contentAr: '',
    excerpt: '',
    excerptAr: '',
    coverImage: '',
    published: false,
    categories: [] as string[],
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!postSlug) {
        setError('Invalid blog slug');
        setLoading(false);
        return;
      }
      
      try {
        console.log('Attempting to fetch blog post with API route:', `/api/blog/${postSlug}`);
        const response = await fetch(`/api/blog/${postSlug}`);
        
        console.log('API response status:', response.status);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog post not found. Please check the slug and try again.');
          } else {
            setError(`Failed to fetch blog post: ${response.statusText}`);
          }
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        console.log('Received blog data:', data);
        
        const categories = data.categories ? data.categories.map((cat: any) => cat.name) : [];
        
        setFormData({
          id: data.id,
          title: data.title || '',
          titleAr: data.titleAr || '',
          slug: data.slug || '',
          content: data.content || '',
          contentAr: data.contentAr || '',
          excerpt: data.excerpt || '',
          excerptAr: data.excerptAr || '',
          coverImage: data.coverImage || '',
          published: data.published || false,
          categories,
        });
        
        if (data.coverImage) {
          setImagePreview(data.coverImage);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
      }
    }

    if (status === 'authenticated' && postSlug) {
      fetchBlogPost();
    }
  }, [postSlug, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value,
        slug: slugify(value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));

    if (!formData.excerpt && content) {
      const textContent = content.replace(/<[^>]*>/g, '');
      const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
      setFormData((prev) => ({ ...prev, excerpt }));
    }
  };
  
  const handleArEditorChange = (contentAr: string) => {
    setFormData((prev) => ({ ...prev, contentAr }));

    if (!formData.excerptAr && contentAr) {
      const textContent = contentAr.replace(/<[^>]*>/g, '');
      const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
      setFormData((prev) => ({ ...prev, excerptAr: excerpt }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !formData.categories.includes(categoryInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()],
      }));
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };
  
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('Image selected:', file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Selected file is not an image');
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }
      
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      console.log('Created object URL:', objectUrl);
      setImagePreview(objectUrl);
      
      // Clear any previous errors
      setError(null);
      
      // Automatically upload the image
      await uploadSelectedImage(file);
    }
  };
  
  const uploadSelectedImage = async (file: File) => {
    setUploading(true);
    setError(null);

    // Create FormData for upload
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    console.log('Starting image upload:', file.name, file.type, file.size);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataObj,
      });

      console.log('Upload response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('Upload API response data:', data);
      
      if (!data.url) {
        throw new Error('No URL returned from upload API');
      }

      console.log('Upload successful, image URL:', data.url);
      
      // Store the direct URL returned from the server
      const imageUrl = data.url;
      
      // Update form data with the image URL
      setFormData(prev => {
        const updatedFormData = { ...prev, coverImage: imageUrl };
        console.log('Updated form data with cover image:', updatedFormData.coverImage);
        return updatedFormData;
      });
      
      return true;
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
      return false;
    } finally {
      setUploading(false);
    }
  };

  // Original handleImageUpload function can now just call the shared upload function
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError("No image selected for upload");
      return;
    }

    await uploadSelectedImage(selectedImage);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if an image is selected but not uploaded
    if (selectedImage && (!formData.coverImage || formData.coverImage === '')) {
      setError('Please wait for the image to finish uploading before submitting');
      return;
    }
    
    setSaving(true);
    setError(null);

    if (!formData.title || !formData.content) {
      setError('Title and content are required');
      setSaving(false);
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        published: formData.published === true,
        // Ensure coverImage is properly set
        coverImage: formData.coverImage || ''
      };
      
      console.log('Submitting data to API:', `/api/blog/${postSlug}`, {
        ...dataToSubmit,
        content: dataToSubmit.content?.substring(0, 50) + '...', // Truncate content for logging
        coverImage: dataToSubmit.coverImage // Log the cover image URL being submitted
      });
      
      const response = await fetch(`/api/blog/${postSlug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      console.log('Update response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to update blog post';
        try {
          const errorData = await response.json();
          console.log('Error response:', errorData);
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
            if (errorData.details) {
              errorMessage += `: ${errorData.details}`;
            }
          }
        } catch (jsonError) {
          errorMessage = `Server error (${response.status}): ${errorMessage}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Update successful:', data);
      
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Error updating blog post:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <button
          onClick={() => router.push('/dashboard/blog')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title (English)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="titleAr" className="block text-sm font-medium text-gray-700 mb-1">
                Title (Arabic)
              </label>
              <input
                type="text"
                id="titleAr"
                name="titleAr"
                value={formData.titleAr}
                onChange={handleChange}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="flex flex-col space-y-4">
                {imagePreview && (
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <Image 
                      src={imagePreview} 
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                      unoptimized={true}
                      sizes="(max-width: 768px) 100vw, 700px"
                      onError={(e) => {
                        console.error('Error loading image:', imagePreview);
                        e.currentTarget.src = '/images/blog_uploads/default-blog-image.jpg'; // Fallback image
                      }}
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder="Image URL or upload"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                    readOnly={true} // Make it read-only as it will be set automatically on upload
                  />
                  
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                      disabled={uploading}
                    >
                      <FaUpload className="inline mr-1" />
                      {uploading ? 'Uploading...' : 'Browse'}
                    </button>
                  </div>
                  
                  {/* Optional manual upload button - can be removed if auto-upload works well */}
                  {selectedImage && !formData.coverImage && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      disabled={uploading}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Uploading...' : 'Upload Manually'}
                    </button>
                  )}
                </div>
                
                {/* Display image status information */}
                {uploading && (
                  <div className="text-sm text-blue-600 mt-2">
                    <p>Uploading image... Please wait.</p>
                  </div>
                )}
                
                {formData.coverImage && (
                  <div className="text-xs text-green-600 mt-2">
                    <p>✓ Image uploaded successfully!</p>
                    <p className="text-gray-600">Image path: {formData.coverImage}</p>
                    <p className="text-gray-600">Full URL: {formData.coverImage.startsWith('/') ? 
                      `${typeof window !== 'undefined' ? window.location.origin : ''}${formData.coverImage}` : 
                      formData.coverImage}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content (English)
              </label>
              <div className="mt-1">
                <RichTextEditor
                  id="content"
                  value={formData.content}
                  onChange={handleEditorChange}
                  className="bg-white"
                />
              </div>
            </div>
            
            <div className="col-span-2">
              <label htmlFor="contentAr" className="block text-sm font-medium text-gray-700 mb-1">
                Content (Arabic)
              </label>
              <div className="mt-1" dir="rtl">
                <RichTextEditor
                  id="contentAr"
                  value={formData.contentAr}
                  onChange={handleArEditorChange}
                  className="bg-white"
                />
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (English)
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description for this post"
              />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="excerptAr" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt (Arabic)
              </label>
              <textarea
                id="excerptAr"
                name="excerptAr"
                value={formData.excerptAr}
                onChange={handleChange}
                rows={3}
                dir="rtl"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description for this post in Arabic"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a category"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                  {formData.published ? 'Published' : 'Draft'}
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="mr-2" />
              {saving ? 'Saving...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 