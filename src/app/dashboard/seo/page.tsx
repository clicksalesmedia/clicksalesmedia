"use client"

import { useState } from 'react'
import { Overview } from "@/components/dashboard/seo/overview"
import { MetaTagsManager } from "@/components/dashboard/seo/meta-tags"
import { SitemapManager } from "@/app/components/dashboard/seo/sitemap"
import { Analytics } from "@/components/dashboard/seo/analytics"

export default function SEODashboard() {
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const handleSave = async () => {
    try {
      const response = await fetch('/api/seo/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageUrl: url,
          title,
          description,
          keywords,
        }),
      })
      if (!response.ok) throw new Error('Failed to save SEO settings')
      // Handle success
    } catch (error) {
      console.error('Error saving SEO settings:', error)
      // Handle error
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEO Management</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-2 border-b">
          {['overview', 'meta-tags', 'sitemap', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Page SEO Settings</h3>
                <p className="text-sm text-gray-500">Configure the basic SEO settings for your pages</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="url" className="block text-sm font-medium">
                    Page URL
                  </label>
                  <input
                    id="url"
                    type="text"
                    placeholder="Enter page URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Meta Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter meta title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Meta Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter meta description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="keywords" className="block text-sm font-medium">
                    Keywords
                  </label>
                  <textarea
                    id="keywords"
                    placeholder="Enter keywords (comma-separated)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  />
                </div>
              </div>
            </div>
            <Overview />
          </div>
        )}

        {activeTab === 'meta-tags' && <MetaTagsManager />}
        {activeTab === 'sitemap' && <SitemapManager />}
        {activeTab === 'analytics' && <Analytics />}
      </div>
    </div>
  )
} 