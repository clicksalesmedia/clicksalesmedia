"use client"

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PageSpeedData {
  page: string
  score: number
}

const mockData: PageSpeedData[] = [
  { page: '/home', score: 95 },
  { page: '/about', score: 88 },
  { page: '/services', score: 92 },
  { page: '/blog', score: 85 },
  { page: '/contact', score: 90 },
]

export function Overview() {
  const [pageSpeedData, setPageSpeedData] = useState<PageSpeedData[]>(mockData)
  const [keywordRankings, setKeywordRankings] = useState(75)
  const [totalBacklinks, setTotalBacklinks] = useState(1250)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Page Speed Scores */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Page Speed Scores</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pageSpeedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Rankings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Keyword Rankings</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {keywordRankings}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${keywordRankings}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Your keywords are performing well. {keywordRankings}% of your targeted keywords are ranking on the first page.
          </p>
        </div>
      </div>

      {/* Backlinks Overview */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Backlinks Overview</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-blue-600">{totalBacklinks.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Total Backlinks</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
} 