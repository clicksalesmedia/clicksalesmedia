'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaHistory, FaEye } from 'react-icons/fa';
import ScriptFormModal from './components/ScriptFormModal';
import { TrackingScript } from './components/ScriptForm';
import { useRouter } from 'next/navigation';

interface TrackingLog {
  id: string;
  trackingScriptId: string;
  action: 'added' | 'modified' | 'activated' | 'deactivated' | 'deleted' | 'verified';
  timestamp: string;
  userEmail: string;
  details?: string;
}

export default function TrackingManagement() {
  const router = useRouter();
  const [trackingScripts, setTrackingScripts] = useState<TrackingScript[]>([]);
  const [logs, setLogs] = useState<TrackingLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'scripts' | 'logs'>('scripts');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentScript, setCurrentScript] = useState<TrackingScript | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  // Fetch tracking scripts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch scripts
        const scriptsResponse = await fetch('/api/tracking');
        if (!scriptsResponse.ok) {
          throw new Error('Failed to fetch tracking scripts');
        }
        
        const scriptsData = await scriptsResponse.json();
        setTrackingScripts(scriptsData);
        
        // Fetch logs
        const logsResponse = await fetch('/api/tracking/logs');
        if (!logsResponse.ok) {
          throw new Error('Failed to fetch tracking logs');
        }
        
        const logsData = await logsResponse.json();
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while loading data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter scripts based on search term and filters
  const filteredScripts = trackingScripts.filter(script => {
    const matchesSearch = 
      script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || script.type === filterType;
    const matchesProvider = filterProvider === 'all' || script.provider === filterProvider;
    
    return matchesSearch && matchesType && matchesProvider;
  });

  const handleAddScript = () => {
    setCurrentScript(null);
    setShowAddModal(true);
  };

  const handleEditScript = (script: TrackingScript) => {
    setCurrentScript(script);
    setShowEditModal(true);
  };

  const handleSaveScript = async (scriptData: Partial<TrackingScript>) => {
    try {
      setIsLoading(true);
      
      if (currentScript?.id) {
        // Update existing script
        const response = await fetch(`/api/tracking/${currentScript.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scriptData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update tracking script');
        }
        
        const updatedScript = await response.json();
        
        // Update local state
        setTrackingScripts(prev => 
          prev.map(script => script.id === updatedScript.id ? updatedScript : script)
        );
      } else {
        // Create new script
        const response = await fetch('/api/tracking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(scriptData),
        });
        
        if (!response.ok) {
          throw new Error('Failed to create tracking script');
        }
        
        const newScript = await response.json();
        
        // Update local state
        setTrackingScripts(prev => [newScript, ...prev]);
      }
      
      // Refresh logs
      const logsResponse = await fetch('/api/tracking/logs');
      const logsData = await logsResponse.json();
      setLogs(logsData);
      
      // Close modals
      setShowAddModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error saving script:', error);
      setError('An error occurred while saving the script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (script: TrackingScript) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/tracking/${script.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...script,
          active: !script.active
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update script status');
      }
      
      const updatedScript = await response.json();
      
      // Update local state
      setTrackingScripts(prev => 
        prev.map(s => s.id === updatedScript.id ? updatedScript : s)
      );
      
      // Refresh logs
      const logsResponse = await fetch('/api/tracking/logs');
      const logsData = await logsResponse.json();
      setLogs(logsData);
    } catch (error) {
      console.error('Error toggling script status:', error);
      setError('An error occurred while updating the script status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyScript = async (script: TrackingScript) => {
    try {
      setIsLoading(true);
      
      // Create a log entry for verification
      const response = await fetch('/api/tracking/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingScriptId: script.id,
          action: 'verified',
          details: `Verified ${script.name} implementation`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify script');
      }
      
      // Refresh data
      const scriptsResponse = await fetch('/api/tracking');
      const scriptsData = await scriptsResponse.json();
      setTrackingScripts(scriptsData);
      
      const logsResponse = await fetch('/api/tracking/logs');
      const logsData = await logsResponse.json();
      setLogs(logsData);
    } catch (error) {
      console.error('Error verifying script:', error);
      setError('An error occurred while verifying the script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteScript = async (script: TrackingScript) => {
    if (!window.confirm(`Are you sure you want to delete "${script.name}"?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/tracking/${script.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete script');
      }
      
      // Update local state
      setTrackingScripts(prev => prev.filter(s => s.id !== script.id));
      
      // Refresh logs
      const logsResponse = await fetch('/api/tracking/logs');
      const logsData = await logsResponse.json();
      setLogs(logsData);
    } catch (error) {
      console.error('Error deleting script:', error);
      setError('An error occurred while deleting the script. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (active: boolean) => {
    return active 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'analytics': return 'Analytics';
      case 'conversion': return 'Conversion';
      case 'remarketing': return 'Remarketing';
      case 'pixel': return 'Pixel';
      case 'tag_manager': return 'Tag Manager';
      case 'custom': return 'Custom Script';
      default: return type;
    }
  };

  const getProviderLabel = (provider: string) => {
    switch (provider) {
      case 'google': return 'Google';
      case 'meta': return 'Meta (Facebook)';
      case 'linkedin': return 'LinkedIn';
      case 'twitter': return 'Twitter';
      case 'other': return 'Other';
      default: return provider;
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'added': return 'Added';
      case 'modified': return 'Modified';
      case 'activated': return 'Activated';
      case 'deactivated': return 'Deactivated';
      case 'deleted': return 'Deleted';
      case 'verified': return 'Verified';
      default: return action;
    }
  };

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'added': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'modified': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'activated': return 'bg-green-100 text-green-800 border-green-200';
      case 'deactivated': return 'bg-red-100 text-red-800 border-red-200';
      case 'deleted': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'verified': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading && trackingScripts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tracking Management</h1>
        <button
          onClick={handleAddScript}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          disabled={isLoading}
        >
          <FaPlus className="mr-2" /> Add Tracking
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex -mb-px">
          <button
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'scripts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('scripts')}
          >
            Tracking Scripts
          </button>
          <button
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'logs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            Activity Logs
          </button>
        </div>
      </div>

      {activeTab === 'scripts' && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search scripts..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="analytics">Analytics</option>
                <option value="conversion">Conversion</option>
                <option value="remarketing">Remarketing</option>
                <option value="pixel">Pixel</option>
                <option value="tag_manager">Tag Manager</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={filterProvider}
                onChange={e => setFilterProvider(e.target.value)}
              >
                <option value="all">All Providers</option>
                <option value="google">Google</option>
                <option value="meta">Meta (Facebook)</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Scripts Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScripts.length > 0 ? (
                  filteredScripts.map(script => (
                    <tr key={script.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{script.name}</div>
                        {script.notes && (
                          <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{script.notes}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getTypeLabel(script.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getProviderLabel(script.provider)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(script.active)}`}>
                          {script.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(script.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleToggleStatus(script)}
                            className={`p-1 rounded-full ${
                              script.active
                                ? 'text-red-600 hover:bg-red-100'
                                : 'text-green-600 hover:bg-green-100'
                            }`}
                            title={script.active ? 'Deactivate' : 'Activate'}
                            disabled={isLoading}
                          >
                            {script.active ? <FaTimes /> : <FaCheck />}
                          </button>
                          <button
                            onClick={() => handleVerifyScript(script)}
                            className="p-1 text-purple-600 hover:bg-purple-100 rounded-full"
                            title="Verify Implementation"
                            disabled={isLoading}
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEditScript(script)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                            title="Edit"
                            disabled={isLoading}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteScript(script)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                            title="Delete"
                            disabled={isLoading}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No tracking scripts found. Try adjusting your filters or add a new script.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Script
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.length > 0 ? (
                logs.map(log => {
                  const script = trackingScripts.find(s => s.id === log.trackingScriptId) || { name: 'Unknown Script' };
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {typeof script === 'object' && 'name' in script ? script.name : 'Unknown Script'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionBadgeClass(log.action)}`}>
                          {getActionLabel(log.action)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.userEmail}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {log.details || '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modals */}
      <ScriptFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        script={null}
        onSave={handleSaveScript}
        title="Add New Tracking Script"
      />
      
      <ScriptFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        script={currentScript}
        onSave={handleSaveScript}
        title="Edit Tracking Script"
      />
    </div>
  );
} 