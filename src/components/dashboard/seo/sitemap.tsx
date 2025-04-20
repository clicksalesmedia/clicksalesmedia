"use client"

import { useState } from 'react'

interface SitemapEntry {
  id: string
  url: string
  priority: number
  changefreq: string
  lastmod: string
}

export function SitemapManager() {
  const [entries, setEntries] = useState<SitemapEntry[]>([])
  const [url, setUrl] = useState("")
  const [priority, setPriority] = useState("0.5")
  const [changefreq, setChangefreq] = useState("weekly")

  const handleAddEntry = () => {
    if (url) {
      setEntries([...entries, {
        id: Math.random().toString(),
        url,
        priority: parseFloat(priority),
        changefreq,
        lastmod: new Date().toISOString()
      }])
      setUrl("")
    }
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const handleGenerateSitemap = async () => {
    try {
      const response = await fetch('/api/seo/sitemap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entries }),
      })
      if (!response.ok) throw new Error('Failed to generate sitemap')
      // Handle success
    } catch (error) {
      console.error('Error generating sitemap:', error)
      // Handle error
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Add URL to Sitemap</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium">
                URL
              </label>
              <input
                id="url"
                type="text"
                placeholder="Enter URL path"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white"
              >
                <option value="0.1">0.1</option>
                <option value="0.3">0.3</option>
                <option value="0.5">0.5</option>
                <option value="0.7">0.7</option>
                <option value="0.9">0.9</option>
                <option value="1.0">1.0</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="changefreq" className="block text-sm font-medium">
                Change Frequency
              </label>
              <select
                id="changefreq"
                value={changefreq}
                onChange={(e) => setChangefreq(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white"
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleAddEntry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add URL
            </button>
            <button
              onClick={handleGenerateSitemap}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Generate Sitemap
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sitemap Entries</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">URL</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Frequency</th>
                  <th className="text-left py-3 px-4">Last Modified</th>
                  <th className="text-left py-3 px-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-3 px-4">{entry.url}</td>
                    <td className="py-3 px-4">{entry.priority}</td>
                    <td className="py-3 px-4">{entry.changefreq}</td>
                    <td className="py-3 px-4">{new Date(entry.lastmod).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                      No URLs added to sitemap yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 