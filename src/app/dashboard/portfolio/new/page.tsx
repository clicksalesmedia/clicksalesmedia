'use client';

import { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaTimes, FaPlus, FaTrash, FaUpload, FaImage, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

enum PortfolioType {
  WEBSITE = 'WEBSITE',
  SEO = 'SEO',
  PPC = 'PPC',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL_MARKETING = 'EMAIL_MARKETING',
  CONTENT_MARKETING = 'CONTENT_MARKETING',
  BRANDING = 'BRANDING',
  OTHER = 'OTHER',
}

const typeLabels: Record<string, string> = {
  WEBSITE: 'Website',
  SEO: 'SEO',
  PPC: 'PPC',
  SOCIAL_MEDIA: 'Social Media',
  EMAIL_MARKETING: 'Email Marketing',
  CONTENT_MARKETING: 'Content Marketing',
  BRANDING: 'Branding',
  OTHER: 'Other',
};

interface FormData {
  title: string;
  titleAr: string;
  clientName: string;
  clientNameAr: string;
  description: string;
  descriptionAr: string;
  coverImage: string;
  gallery: string[];
  projectType: PortfolioType;
  results: string;
  resultsAr: string;
  metrics: any;
  techStack: string[];
  url: string;
  published: boolean;
  featured: boolean;
}

export default function NewPortfolioItem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const [newTechItem, setNewTechItem] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'english' | 'arabic'>('english');
  
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    titleAr: '',
    clientName: '',
    clientNameAr: '',
    description: '',
    descriptionAr: '',
    coverImage: '',
    gallery: [],
    projectType: PortfolioType.WEBSITE,
    results: '',
    resultsAr: '',
    metrics: {},
    techStack: [],
    url: '',
    published: false,
    featured: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === 'published' || name === 'featured') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // File upload handlers
  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Preview
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    
    // Upload
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'cover');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      // Make sure we have a valid URL
      if (data.url && typeof data.url === 'string') {
        setFormData(prev => ({
          ...prev,
          coverImage: data.url,
        }));
      } else {
        throw new Error('Invalid URL received from server');
      }
      
    } catch (err) {
      setError(`Cover image upload failed: ${(err as Error).message}`);
      setCoverPreview(null);
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = '';
      }
    }
  };
  
  const handleGalleryImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Preview
    const previewUrl = URL.createObjectURL(file);
    setGalleryPreviews(prev => [...prev, previewUrl]);
    
    // Upload
    setUploadingGallery(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'gallery');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      // Make sure we have a valid URL before adding it to the gallery
      if (data.url && typeof data.url === 'string') {
        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, data.url],
        }));
      } else {
        throw new Error('Invalid URL received from server');
      }
      
    } catch (err) {
      setError(`Gallery image upload failed: ${(err as Error).message}`);
      setGalleryPreviews(prev => prev.slice(0, -1)); // Remove the last preview
    } finally {
      setUploadingGallery(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  const handleAddGalleryImageUrl = () => {
    if (newGalleryImage.trim()) {
      try {
        // Basic validation: try to parse the URL
        new URL(newGalleryImage.trim());
        
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, newGalleryImage.trim()],
        }));
        setNewGalleryImage('');
      } catch (error) {
        // If URL is invalid, show an error
        setError('Please enter a valid URL');
      }
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
    
    // Also remove the preview if it exists
    if (index < galleryPreviews.length) {
      setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddTechItem = () => {
    if (newTechItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTechItem.trim()],
      }));
      setNewTechItem('');
    }
  };

  const handleRemoveTechItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields (only English fields are required)
    if (!formData.title) {
      setError('Project title (English) is required');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.clientName) {
      setError('Client name (English) is required');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.description) {
      setError('Description (English) is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.coverImage) {
      setError('Cover image is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create portfolio item');
      }

      router.push('/dashboard/portfolio');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Portfolio Item</h1>
        
        <div className="flex space-x-2">
          <Link
            href="/dashboard/portfolio"
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <FaTimes className="mr-2" />
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center disabled:opacity-50"
          >
            <FaSave className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h2>
              
              {/* Language tabs */}
              <div className="mb-6">
                <div className="flex border-b">
                  <button
                    type="button"
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'english' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('english')}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'arabic' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('arabic')}
                  >
                    Arabic
                  </button>
                </div>
              </div>
              
              {activeTab === 'english' ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="results">
                      Results
                    </label>
                    <textarea
                      id="results"
                      name="results"
                      value={formData.results}
                      onChange={handleChange}
                      rows={5}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="titleAr">
                      Project Title (Arabic)
                    </label>
                    <input
                      type="text"
                      id="titleAr"
                      name="titleAr"
                      value={formData.titleAr}
                      onChange={handleChange}
                      dir="rtl"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientNameAr">
                      Client Name (Arabic)
                    </label>
                    <input
                      type="text"
                      id="clientNameAr"
                      name="clientNameAr"
                      value={formData.clientNameAr}
                      onChange={handleChange}
                      dir="rtl"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descriptionAr">
                      Description (Arabic)
                    </label>
                    <textarea
                      id="descriptionAr"
                      name="descriptionAr"
                      value={formData.descriptionAr}
                      onChange={handleChange}
                      dir="rtl"
                      rows={5}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resultsAr">
                      Results (Arabic)
                    </label>
                    <textarea
                      id="resultsAr"
                      name="resultsAr"
                      value={formData.resultsAr}
                      onChange={handleChange}
                      dir="rtl"
                      rows={5}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectType">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(PortfolioType).map(([key, value]) => (
                    <option key={key} value={value}>
                      {typeLabels[value]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                  Project URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Media & Additional Details</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Image *
                </label>
                <div className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      ref={coverFileInputRef}
                      className="hidden"
                      id="coverImageUpload"
                    />
                    <label
                      htmlFor="coverImageUpload"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      {uploadingCover ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FaUpload className="mr-2" />
                          Upload Cover Image
                        </>
                      )}
                    </label>
                    {formData.coverImage ? (
                      <span className="ml-2 text-green-600 text-sm">Image uploaded successfully</span>
                    ) : (
                      <span className="ml-2 text-red-600 text-sm">Required</span>
                    )}
                  </div>
                </div>
                
                {coverPreview && (
                  <div className="mt-2 relative w-full h-48 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                
                <p className="text-sm text-gray-500 mt-1">
                  Recommended size: 1200x800 pixels. Max file size: 5MB.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gallery Images
                </label>
                <div className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      ref={galleryFileInputRef}
                      className="hidden"
                      id="galleryImageUpload"
                    />
                    <label
                      htmlFor="galleryImageUpload"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      {uploadingGallery ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FaUpload className="mr-2" />
                          Upload Gallery Image
                        </>
                      )}
                    </label>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-1 mb-2">
                  Or enter image URL manually:
                </p>
                
                <div className="flex">
                  <input
                    type="url"
                    value={newGalleryImage}
                    onChange={(e) => setNewGalleryImage(e.target.value)}
                    placeholder="https://example.com/gallery-image.jpg"
                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImageUrl}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                {formData.gallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-full h-24 bg-gray-100 rounded overflow-hidden border">
                          {image && typeof image === 'string' && image.startsWith('/images/') ? (
                            // For uploaded images with a preview
                            <Image
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            // For URLs without a preview
                            <div className="flex items-center justify-center h-full bg-gray-200">
                              <FaImage className="text-gray-400 text-2xl" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 opacity-70 hover:opacity-100"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {image && typeof image === 'string' ? image.split('/').pop() : 'Unknown file'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Technologies Used
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={newTechItem}
                    onChange={(e) => setNewTechItem(e.target.value)}
                    placeholder="React, Node.js, etc."
                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechItem}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                  >
                    <FaPlus />
                  </button>
                </div>
                {formData.techStack.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.techStack.map((tech, index) => (
                      <span key={index} className="inline-flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechItem(index)}
                          className="text-red-500 hover:text-red-700 ml-1"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Publishing Options</h2>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published" className="ml-2 block text-gray-700">
                    Publish this project (make it visible on the website)
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="ml-2 block text-gray-700">
                    Feature this project (show it prominently on the website)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-6 flex justify-end">
            <div className="flex space-x-2">
              <Link
                href="/dashboard/portfolio"
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              >
                <FaTimes className="mr-2" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center disabled:opacity-50"
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 