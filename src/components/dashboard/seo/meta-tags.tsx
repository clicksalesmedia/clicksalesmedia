"use client"

import { useState } from 'react'

interface MetaTag {
  id: string
  name: string
  content: string
}

export function MetaTagsManager() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const handleAddMetaTag = () => {
    if (name && content) {
      setMetaTags([
        ...metaTags,
        {
          id: Math.random().toString(),
          name,
          content,
        },
      ])
      setName('')
      setContent('')
    }
  }

  const handleDeleteMetaTag = (id: string) => {
    setMetaTags(metaTags.filter((tag) => tag.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Add Custom Meta Tag</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="metaName" className="block text-sm font-medium">
                Meta Name/Property
              </label>
              <input
                id="metaName"
                type="text"
                placeholder="e.g., description, og:title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>
              <input
                id="content"
                type="text"
                placeholder="Meta tag content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleAddMetaTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Meta Tag
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Custom Meta Tags</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Meta Name/Property</th>
                  <th className="text-left py-3 px-4">Content</th>
                  <th className="text-left py-3 px-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {metaTags.map((tag) => (
                  <tr key={tag.id} className="border-b">
                    <td className="py-3 px-4">{tag.name}</td>
                    <td className="py-3 px-4">{tag.content}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteMetaTag(tag.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {metaTags.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                      No custom meta tags added yet
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