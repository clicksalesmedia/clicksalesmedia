'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaExternalLinkAlt, FaSpinner, FaSave, FaTimes, FaSort, FaArrowUp, FaArrowDown, FaBuilding, FaUpload, FaImage, FaLink } from 'react-icons/fa';

interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  altText?: string;
  link?: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface LogoFormData {
  name: string;
  imageUrl: string;
  altText: string;
  link: string;
  active: boolean;
  sortOrder: number;
}

const LogosManagement = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLogo, setEditingLogo] = useState<Logo | null>(null);
  const [formData, setFormData] = useState<LogoFormData>({
    name: '',
    imageUrl: '',
    altText: '',
    link: '',
    active: true,
    sortOrder: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'sortOrder' | 'name' | 'createdAt'>('sortOrder');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Fetch logos
  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/logos?includeInactive=true');
      if (!response.ok) {
        throw new Error('Failed to fetch logos');
      }
      const data = await response.json();
      setLogos(data);
    } catch (err) {
      console.error('Error fetching logos:', err);
      setError('Failed to load logos');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Handle file upload
  const handleFileUpload = async (): Promise<string> => {
    if (!selectedFile) throw new Error('No file selected');

    setUploadProgress(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);
      uploadFormData.append('folder', 'clients');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      return result.url;
    } finally {
      setUploadProgress(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = formData.imageUrl;

      // If using file upload mode and a file is selected, upload it first
      if (uploadMode === 'file' && selectedFile) {
        imageUrl = await handleFileUpload();
      }

      const url = editingLogo ? `/api/logos/${editingLogo.id}` : '/api/logos';
      const method = editingLogo ? 'PUT' : 'POST';

      const dataToSubmit = {
        ...formData,
        imageUrl: imageUrl,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save logo');
      }

      await fetchLogos();
      resetForm();
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this logo?')) return;

    try {
      const response = await fetch(`/api/logos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete logo');
      }

      await fetchLogos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Toggle active status
  const toggleActive = async (logo: Logo) => {
    try {
      const response = await fetch(`/api/logos/${logo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !logo.active }),
      });

      if (!response.ok) {
        throw new Error('Failed to update logo');
      }

      await fetchLogos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Update sort order
  const updateSortOrder = async (logo: Logo, direction: 'up' | 'down') => {
    const newSortOrder = direction === 'up' ? logo.sortOrder - 1 : logo.sortOrder + 1;
    
    try {
      const response = await fetch(`/api/logos/${logo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sortOrder: newSortOrder }),
      });

      if (!response.ok) {
        throw new Error('Failed to update sort order');
      }

      await fetchLogos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      altText: '',
      link: '',
      active: true,
      sortOrder: Math.max(...logos.map(l => l.sortOrder), 0) + 1
    });
    setEditingLogo(null);
    setUploadMode('url');
    setSelectedFile(null);
    setPreviewUrl('');
    setUploadProgress(false);
  };

  // Start editing
  const startEdit = (logo: Logo) => {
    setEditingLogo(logo);
    setFormData({
      name: logo.name,
      imageUrl: logo.imageUrl,
      altText: logo.altText || '',
      link: logo.link || '',
      active: logo.active,
      sortOrder: logo.sortOrder
    });
    setShowForm(true);
  };

  // Sort logos
  const sortedLogos = [...logos].sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];

    if (sortBy === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading logos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Logos Management</h1>
          <p className="text-gray-600">Manage your client logos carousel</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add New Logo</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-500 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logos</p>
              <p className="text-2xl font-bold text-gray-900">{logos.length}</p>
            </div>
            <FaBuilding className="text-blue-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Logos</p>
              <p className="text-2xl font-bold text-green-600">{logos.filter(l => l.active).length}</p>
            </div>
            <FaEye className="text-green-500 text-2xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hidden Logos</p>
              <p className="text-2xl font-bold text-gray-500">{logos.filter(l => !l.active).length}</p>
            </div>
            <FaEyeSlash className="text-gray-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Logo Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {editingLogo ? 'Edit Logo' : 'Add New Logo'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image *
                    </label>
                    
                    {/* Upload Mode Toggle */}
                    <div className="flex space-x-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setUploadMode('url')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                          uploadMode === 'url'
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FaLink />
                        <span>URL</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMode('file')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                          uploadMode === 'file'
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <FaUpload />
                        <span>Upload</span>
                      </button>
                    </div>

                    {/* URL Input Mode */}
                    {uploadMode === 'url' && (
                      <input
                        type="url"
                        required={uploadMode === 'url'}
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="/clients/logo.png or https://example.com/logo.png"
                      />
                    )}

                    {/* File Upload Mode */}
                    {uploadMode === 'file' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FaImage className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP or SVG (MAX. 5MB)</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileSelect}
                              required={uploadMode === 'file' && !editingLogo}
                            />
                          </label>
                        </div>

                        {/* File Preview */}
                        {selectedFile && (
                          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <FaImage className="text-blue-500" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-blue-900 truncate">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-blue-600">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl('');
                              }}
                              className="text-blue-400 hover:text-blue-600"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}

                        {/* Image Preview */}
                        {previewUrl && (
                          <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )}

                        {/* Upload Progress */}
                        {uploadProgress && (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <FaSpinner className="animate-spin" />
                            <span className="text-sm">Uploading image...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={formData.altText}
                      onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Client Logo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website Link
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://client.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-gray-700">
                      Show in carousel
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      {submitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>
                          <FaSave />
                          <span>{editingLogo ? 'Update' : 'Create'}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logos List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Logos ({logos.length})</h2>
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="sortOrder-asc">Sort Order (Low to High)</option>
                <option value="sortOrder-desc">Sort Order (High to Low)</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {logos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FaBuilding className="text-4xl mx-auto mb-4 text-gray-300" />
            <p>No logos found. Add your first client logo!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedLogos.map((logo) => (
                  <tr key={logo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 relative bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={logo.imageUrl}
                            alt={logo.altText || logo.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        {logo.link && (
                          <a
                            href={logo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{logo.name}</p>
                        {logo.altText && (
                          <p className="text-sm text-gray-500">{logo.altText}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          logo.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {logo.active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-900">{logo.sortOrder}</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => updateSortOrder(logo, 'up')}
                            className="text-xs text-gray-400 hover:text-gray-600 p-1"
                          >
                            <FaArrowUp />
                          </button>
                          <button
                            onClick={() => updateSortOrder(logo, 'down')}
                            className="text-xs text-gray-400 hover:text-gray-600 p-1"
                          >
                            <FaArrowDown />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleActive(logo)}
                          className={`p-2 rounded-lg transition-colors ${
                            logo.active
                              ? 'text-gray-600 hover:bg-gray-100'
                              : 'text-green-600 hover:bg-green-100'
                          }`}
                          title={logo.active ? 'Hide logo' : 'Show logo'}
                        >
                          {logo.active ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => startEdit(logo)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit logo"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(logo.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete logo"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogosManagement; 