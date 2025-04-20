'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string | null;
  };
}

export default function CaseStudyManagement() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const response = await fetch('/api/case-studies');
        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }
        const data = await response.json();
        setCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setError('Failed to load case studies');
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete case study');
      }
      
      setCaseStudies(caseStudies.filter(study => study.id !== id));
    } catch (error) {
      console.error('Error deleting case study:', error);
      alert('Failed to delete case study');
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update case study');
      }
      
      setCaseStudies(
        caseStudies.map(study => 
          study.id === id ? { ...study, published: !study.published } : study
        )
      );
    } catch (error) {
      console.error('Error updating case study:', error);
      alert('Failed to update case study');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Link
          href="/dashboard/case-studies/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg inline-flex items-center"
        >
          <FaPlus className="mr-2" />
          New Case Study
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {caseStudies.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No case studies found. Create your first case study!
                </td>
              </tr>
            ) : (
              caseStudies.map((study) => (
                <tr key={study.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{study.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{study.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublishStatus(study.id, study.published)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        study.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {study.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(study.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        target="_blank"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/dashboard/case-studies/edit/${study.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(study.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 