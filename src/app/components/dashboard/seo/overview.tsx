"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 100,
  },
  {
    name: "Feb",
    total: 150,
  },
  {
    name: "Mar",
    total: 200,
  },
]

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Page Speed Score</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">92/100</div>
          <p className="text-xs text-gray-500">
            +20% from last month
          </p>
          <div className="h-[80px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="total" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Keyword Rankings</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">15</div>
          <p className="text-xs text-gray-500">
            Keywords in top 10 positions
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <span className="ml-2 text-sm">70%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Backlinks</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-gray-500">
            Total backlinks
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Quality Score</span>
              <span className="font-medium">8.5/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 