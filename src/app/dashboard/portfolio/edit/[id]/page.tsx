'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

const typeLabels: Record<PortfolioType, string> = {
  [PortfolioType.WEBSITE]: 'Website Development',
  [PortfolioType.SEO]: 'Search Engine Optimization',
  [PortfolioType.PPC]: 'Pay-Per-Click Advertising',
  [PortfolioType.SOCIAL_MEDIA]: 'Social Media Marketing',
  [PortfolioType.EMAIL_MARKETING]: 'Email Marketing',
  [PortfolioType.CONTENT_MARKETING]: 'Content Marketing',
  [PortfolioType.BRANDING]: 'Branding & Design',
  [PortfolioType.OTHER]: 'Other Services',
};

interface FormData {
  title: string;
  slug: string;
  clientName: string;
  description: string;
  coverImage: string;
  gallery: string[];
  projectType: PortfolioType;
  results: string;
  techStack: string[];
  url: string;
  published: boolean;
  featured: boolean;
}

export default function EditPortfolioItem() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    clientName: '',
    description: '',
    coverImage: '',
    gallery: [''],
    projectType: PortfolioType.WEBSITE,
    results: '',
    techStack: [''],
    url: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    async function fetchPortfolioItem() {
      try {
        const response = await fetch(`/api/portfolio/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio item');
        }
        
        const data = await response.json();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          clientName: data.clientName || '',
          description: data.description || '',
          coverImage: data.coverImage || '',
          gallery: data.gallery?.length ? data.gallery : [''],
          projectType: data.projectType || PortfolioType.WEBSITE,
          results: data.results || '',
          techStack: data.techStack?.length ? data.techStack : [''],
          url: data.url || '',
          published: data.published || false,
          featured: data.featured || false,
        });
        
        // Set the cover preview for the existing image
        if (data.coverImage) {
          setCoverPreview(data.coverImage);
        }
      } catch (err) {
        console.error('Error fetching portfolio item:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPortfolioItem();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSlugGeneration = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // File upload handlers
  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Preview
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    
    // Upload
    setUploadingCover(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('type', 'cover');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      setFormData(prev => ({
        ...prev,
        coverImage: data.filePath,
      }));
      
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
  
  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Upload
    setUploadingGallery(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('type', 'gallery');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      
      // Add the new uploaded image to the gallery
      const updatedGallery = [...formData.gallery];
      // Replace the first empty string with the new uploaded image or add to the end
      const emptyIndex = updatedGallery.findIndex(url => url === '');
      if (emptyIndex !== -1) {
        updatedGallery[emptyIndex] = data.filePath;
      } else {
        updatedGallery.push(data.filePath);
      }
      
      setFormData(prev => ({
        ...prev,
        gallery: updatedGallery,
      }));
      
    } catch (err) {
      setError(`Gallery image upload failed: ${(err as Error).message}`);
    } finally {
      setUploadingGallery(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  const handleGalleryChange = (index: number, value: string) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery[index] = value;
    setFormData(prev => ({ ...prev, gallery: updatedGallery }));
  };

  const addGalleryItem = () => {
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ''] }));
  };

  const removeGalleryItem = (index: number) => {
    if (formData.gallery.length > 1) {
      const updatedGallery = formData.gallery.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, gallery: updatedGallery }));
    }
  };

  const handleTechChange = (index: number, value: string) => {
    const updatedTech = [...formData.techStack];
    updatedTech[index] = value;
    setFormData(prev => ({ ...prev, techStack: updatedTech }));
  };

  const addTechItem = () => {
    setFormData(prev => ({ ...prev, techStack: [...prev.techStack, ''] }));
  };

  const removeTechItem = (index: number) => {
    if (formData.techStack.length > 1) {
      const updatedTech = formData.techStack.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, techStack: updatedTech }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Clean up empty gallery and tech items
      const gallery = formData.gallery.filter(item => item.trim() !== '');
      const techStack = formData.techStack.filter(item => item.trim() !== '');

      const payload = {
        ...formData,
        gallery,
        techStack
      };

      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update portfolio item');
      }

      router.push('/dashboard/portfolio');
    } catch (err) {
      console.error('Error updating portfolio item:', err);
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-t-4 border-secondaryColor border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#272727] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Edit Portfolio Item</h1>
            <Link 
              href="/dashboard/portfolio"
              className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
            >
              <FaTimes className="mr-2" />
              Cancel
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-black bg-opacity-50 rounded-xl p-8 mb-12 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="title" className="block text-gray-300 mb-2">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  onBlur={handleSlugGeneration}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                  required
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-gray-300 mb-2">Slug *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from title. Used in URLs.</p>
              </div>

              <div>
                <label htmlFor="clientName" className="block text-gray-300 mb-2">Client Name *</label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                  required
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-gray-300 mb-2">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                  required
                >
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="url" className="block text-gray-300 mb-2">Project URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Cover Image *</label>
                <div className="mb-2 flex items-center">
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
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
                  >
                    {uploadingCover ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        Upload Image
                      </>
                    )}
                  </label>
                  
                  <input
                    type="url"
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    className="w-full ml-2 bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                    placeholder="Or enter image URL"
                    required
                  />
                </div>
                
                {coverPreview && (
                  <div className="mt-2 relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                    <Image
                      src={coverPreview}
                      alt="Cover Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-300 mb-2">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="results" className="block text-gray-300 mb-2">Results</label>
              <textarea
                id="results"
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
              ></textarea>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300">Gallery Images</label>
                <div className="flex gap-2">
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
                    className="cursor-pointer inline-flex items-center text-sm bg-gray-700 hover:bg-gray-600 text-white font-medium py-1 px-2 rounded-lg transition-all"
                  >
                    {uploadingGallery ? (
                      <>
                        <FaSpinner className="animate-spin mr-1" size={12} />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-1" size={12} />
                        Upload Image
                      </>
                    )}
                  </label>
                  
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="inline-flex items-center text-sm bg-gray-800 hover:bg-gray-700 text-white font-medium py-1 px-2 rounded-lg transition-all"
                  >
                    <FaPlus className="mr-1" size={12} />
                    Add URL
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {formData.gallery.map((url, index) => (
                  url && url.startsWith('/images/') ? (
                    <div key={index} className="relative group">
                      <div className="relative w-full h-24 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                        <Image
                          src={url}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(index)}
                          className="absolute top-1 right-1 text-white bg-red-600 rounded-full p-1 opacity-80 hover:opacity-100"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-1">{url.split('/').pop()}</p>
                    </div>
                  ) : (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleGalleryChange(index, e.target.value)}
                        placeholder="Image URL"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(index)}
                        className="ml-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
                        disabled={formData.gallery.length === 1 && url === ''}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300">Technologies Used</label>
                <button
                  type="button"
                  onClick={addTechItem}
                  className="inline-flex items-center text-sm bg-gray-800 hover:bg-gray-700 text-white font-medium py-1 px-2 rounded-lg transition-all"
                >
                  <FaPlus className="mr-1" size={12} />
                  Add Tech
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.techStack.map((tech, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechChange(index, e.target.value)}
                      placeholder="Technology name"
                      className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-secondaryColor"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechItem(index)}
                      className="ml-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
                      disabled={formData.techStack.length === 1}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-secondaryColor bg-gray-800 border-gray-700 rounded focus:ring-secondaryColor focus:ring-offset-gray-800"
                />
                <label htmlFor="published" className="ml-2 text-gray-300">Published (visible to the public)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-secondaryColor bg-gray-800 border-gray-700 rounded focus:ring-secondaryColor focus:ring-offset-gray-800"
                />
                <label htmlFor="featured" className="ml-2 text-gray-300">Featured (highlighted on homepage)</label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link 
                href="/dashboard/portfolio"
                className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all"
              >
                <FaTimes className="mr-2" />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center bg-secondaryColor hover:bg-secondaryColor/90 text-black font-medium py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-black rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 