"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "2024-01",
    "Organic Traffic": 2400,
    "Bounce Rate": 45,
  },
  {
    date: "2024-02",
    "Organic Traffic": 3000,
    "Bounce Rate": 42,
  },
  {
    date: "2024-03",
    "Organic Traffic": 3500,
    "Bounce Rate": 38,
  },
]

const keywordData = [
  { keyword: "AI Marketing Dubai", position: 3, volume: 1200 },
  { keyword: "Digital Marketing Agency UAE", position: 5, volume: 2400 },
  { keyword: "Performance Marketing Dubai", position: 2, volume: 800 },
  { keyword: "SEO Services Dubai", position: 4, volume: 1600 },
  { keyword: "PPC Agency Dubai", position: 1, volume: 1000 },
]

export function Analytics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Organic Traffic & Bounce Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Organic Traffic"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Bounce Rate"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywordData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.keyword}</p>
                    <p className="text-sm text-muted-foreground">
                      Position: {item.position} | Volume: {item.volume}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    item.position <= 3 ? 'bg-green-100 text-green-800' :
                    item.position <= 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    #{item.position}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical SEO Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Mobile Friendly</span>
                  <span className="text-green-600">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Page Speed</span>
                  <span className="text-yellow-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>SSL/Security</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Crawl Errors</span>
                  <span className="text-red-600">12 issues</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 