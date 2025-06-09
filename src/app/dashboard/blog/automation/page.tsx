'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Play, 
  Pause, 
  Settings,
  Eye,
  Edit,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface AutomationData {
  recentPosts: any[];
  stats: {
    total: number;
    thisWeek: number;
    today: number;
  };
  lastRun: {
    date: string;
    title: string;
    language: string;
  } | null;
  isActive: boolean;
}

interface AutomationStatus {
  isActive: boolean;
  lastRun: any;
  nextRun: string;
  systemHealth: {
    database: boolean;
    openai: boolean;
    storage: boolean;
    cron: boolean;
  };
}

export default function BlogAutomationPage() {
  const [automationData, setAutomationData] = useState<AutomationData | null>(null);
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'status' | 'logs' | 'stats'>('overview');

  useEffect(() => {
    fetchAutomationData();
    fetchAutomationStatus();
    fetchLogs();
  }, []);

  const fetchAutomationData = async () => {
    try {
      const response = await fetch('/api/blog/automation');
      const data = await response.json();
      setAutomationData(data);
    } catch (error) {
      console.error('Error fetching automation data:', error);
    }
  };

  const fetchAutomationStatus = async () => {
    try {
      const response = await fetch('/api/blog/automation?action=status');
      const data = await response.json();
      setAutomationStatus(data);
    } catch (error) {
      console.error('Error fetching automation status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/blog/automation?action=logs');
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleToggleAutomation = async () => {
    try {
      const response = await fetch('/api/blog/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_automation',
          enabled: !automationStatus?.isActive
        })
      });
      
      if (response.ok) {
        fetchAutomationStatus();
      }
    } catch (error) {
      console.error('Error toggling automation:', error);
    }
  };

  const handleManualTrigger = async () => {
    try {
      const response = await fetch('/api/blog/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'trigger' })
      });
      
      if (response.ok) {
        alert('Manual generation triggered successfully!');
        fetchAutomationData();
      }
    } catch (error) {
      console.error('Error triggering manual generation:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Automation</h1>
          <p className="text-gray-600 mt-2">Monitor and manage automated blog post generation</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleManualTrigger}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Generate Now
          </button>
          
          <button
            onClick={handleToggleAutomation}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              automationStatus?.isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {automationStatus?.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {automationStatus?.isActive ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Automation Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {automationStatus?.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              automationStatus?.isActive ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {automationStatus?.isActive ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Posts Today</p>
              <p className="text-2xl font-bold text-gray-900">{automationData?.stats.today || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{automationData?.stats.thisWeek || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Generated</p>
              <p className="text-2xl font-bold text-gray-900">{automationData?.stats.total || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'status', label: 'System Status', icon: Settings },
            { id: 'logs', label: 'Logs', icon: Eye },
            { id: 'stats', label: 'Statistics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Automated Posts</h3>
              
              {automationData?.recentPosts.length ? (
                <div className="space-y-4">
                  {automationData.recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{post.title}</h4>
                        {post.titleAr && (
                          <p className="text-sm text-gray-600 mt-1" dir="rtl">{post.titleAr}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          Created: {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        
                        <Link
                          href={`/dashboard/blog/edit/${post.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        
                        <Link
                          href={`/blog/${post.slug || post.id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No automated posts found</p>
              )}
            </div>

            {/* Next Run Info */}
            {automationStatus?.nextRun && (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Next Automated Run</h3>
                    <p className="text-blue-700">
                      {new Date(automationStatus.nextRun).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'status' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationStatus?.systemHealth && Object.entries(automationStatus.systemHealth).map(([component, status]) => (
                <div key={component} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <span className="font-medium capitalize">{component}</span>
                  <span className={`flex items-center gap-2 ${status ? 'text-green-600' : 'text-red-600'}`}>
                    {status ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {status ? 'Healthy' : 'Error'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Logs</h3>
            
            {logs.length ? (
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{log.file}</span>
                      <span className="text-sm text-gray-500">{log.date}</span>
                    </div>
                    <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                      {log.content}
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No logs available</p>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <p className="text-gray-500">Advanced statistics and charts will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
} 