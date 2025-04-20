"use client"

import { useState } from "react"

interface MetaTag {
  id: string
  name: string
  content: string
}

export function MetaTagsManager() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleAddMetaTag = () => {
    if (name && content) {
      setMetaTags([...metaTags, {
        id: Math.random().toString(),
        name,
        content
      }])
      setName("")
      setContent("")
    }
  }

  const handleDeleteMetaTag = (id: string) => {
    setMetaTags(metaTags.filter(tag => tag.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Custom Meta Tags</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Meta Name/Property
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., og:title"
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

        <div className="mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name/Property</th>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 