"use client"

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  date: string
  visitors: number
  pageviews: number
}

const mockData: AnalyticsData[] = [
  { date: '2024-01', visitors: 1200, pageviews: 3500 },
  { date: '2024-02', visitors: 1400, pageviews: 4200 },
  { date: '2024-03', visitors: 1600, pageviews: 4800 },
  { date: '2024-04', visitors: 2000, pageviews: 5500 },
  { date: '2024-05', visitors: 2200, pageviews: 6000 },
]

export function Analytics() {
  const [timeframe, setTimeframe] = useState('monthly')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>(mockData)

  return (
    <div className="space-y-6">
      {/* Analytics Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Traffic Analytics</h3>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visitors" stroke="#4F46E5" name="Visitors" />
              <Line type="monotone" dataKey="pageviews" stroke="#10B981" name="Pageviews" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500">Average Time on Page</h4>
          <p className="text-2xl font-bold mt-2">2m 45s</p>
          <p className="text-sm text-green-600 mt-1">+5.2% vs last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500">Bounce Rate</h4>
          <p className="text-2xl font-bold mt-2">42.3%</p>
          <p className="text-red-600 text-sm mt-1">+2.1% vs last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-500">Pages per Session</h4>
          <p className="text-2xl font-bold mt-2">3.2</p>
          <p className="text-green-600 text-sm mt-1">+0.8 vs last month</p>
        </div>
      </div>
    </div>
  )
} 