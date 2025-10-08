'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

// Database configuration
const DATABASE_CONFIG = [
  {
    id: 'model-details',
    name: 'Model Details',
    description: 'Manage product model specifications, features, and documentation',
    icon: '🔧',
    color: 'from-blue-500 to-blue-600',
    endpoint: '/models'
  },
  {
    id: 'model-faqs',
    name: 'Model FAQs',
    description: 'Manage frequently asked questions for product categories',
    icon: '❓',
    color: 'from-green-500 to-green-600',
    endpoint: '/faqs'
  },
  {
    id: 'other-models',
    name: 'Other Models',
    description: 'Manage related model suggestions and recommendations',
    icon: '🔗',
    color: 'from-purple-500 to-purple-600',
    endpoint: '/other-models'
  },
  {
    id: 'spare-parts',
    name: 'Spare Parts',
    description: 'Manage spare parts catalog and inventory',
    icon: '⚙️',
    color: 'from-orange-500 to-orange-600',
    endpoint: '/spare-parts'
  },
  {
    id: 'product-categories',
    name: 'Product Categories',
    description: 'Manage product category structure and hierarchy',
    icon: '📁',
    color: 'from-red-500 to-red-600',
    endpoint: '/categories'
  },
  {
    id: 'product-models',
    name: 'Product Models',
    description: 'Manage product model listings and relationships',
    icon: '📦',
    color: 'from-teal-500 to-teal-600',
    endpoint: '/product-models'
  }
];

// Admin API utility functions
class AdminAPI {
  constructor() {
    this.baseURL = '/api/admin';
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${localStorage.getItem('adminUsername')}:${localStorage.getItem('adminPassword')}`)}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Model Details API
  async getModels(pageSize = 50, cursor = null) {
    const params = new URLSearchParams({ pageSize: pageSize.toString() });
    if (cursor) params.append('cursor', cursor);
    return this.request(`/models?${params}`);
  }

  async createModel(data) {
    return this.request('/models', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateModel(id, data) {
    return this.request(`/models?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteModel(id) {
    return this.request(`/models?id=${id}`, {
      method: 'DELETE',
    });
  }

  // FAQs API
  async getFAQs(pageSize = 50, cursor = null) {
    const params = new URLSearchParams({ pageSize: pageSize.toString() });
    if (cursor) params.append('cursor', cursor);
    return this.request(`/faqs?${params}`);
  }

  async createFAQ(data) {
    return this.request('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(id, data) {
    return this.request(`/faqs?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id) {
    return this.request(`/faqs?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Other Models API
  async getOtherModels(pageSize = 50, cursor = null) {
    const params = new URLSearchParams({ pageSize: pageSize.toString() });
    if (cursor) params.append('cursor', cursor);
    return this.request(`/other-models?${params}`);
  }

  async createOtherModel(data) {
    return this.request('/other-models', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOtherModel(id, data) {
    return this.request(`/other-models?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOtherModel(id) {
    return this.request(`/other-models?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Generic API methods for all databases
  async getData(endpoint, pageSize = 50, cursor = null, search = '') {
    const params = new URLSearchParams({ pageSize: pageSize.toString() });
    if (cursor) params.append('cursor', cursor);
    if (search) params.append('search', search);
    return this.request(`${endpoint}?${params}`);
  }

  async createRecord(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRecord(endpoint, id, data) {
    return this.request(`${endpoint}?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteRecord(endpoint, id) {
    return this.request(`${endpoint}?id=${id}`, {
      method: 'DELETE',
    });
  }

  async exportData(endpoint, format = 'csv') {
    return this.request(`${endpoint}/export?format=${format}`);
  }
}

// Login Component
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Store credentials for API requests
      localStorage.setItem('adminUsername', username);
      localStorage.setItem('adminPassword', password);

      // Test the credentials with a simple API call
      const api = new AdminAPI();
      await api.getModels(1);
      
      onLogin(true);
    } catch (error) {
      setError('Invalid credentials');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminPassword');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Panel Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              placeholder="Enter password"
              required
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#989b2e] hover:bg-[#8a8c20] text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// Main Admin Panel Component
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  useEffect(() => {
    // Check if already authenticated
    const username = localStorage.getItem('adminUsername');
    const password = localStorage.getItem('adminPassword');
    
    if (username && password) {
      // Verify credentials
      const api = new AdminAPI();
      api.getModels(1)
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('adminUsername');
          localStorage.removeItem('adminPassword');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {selectedDatabase && (
                <button
                  onClick={() => setSelectedDatabase(null)}
                  className="text-white hover:text-[#989b2e] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h1 className="text-2xl font-bold text-white">
                {selectedDatabase ? selectedDatabase.name : 'Bonhoeffer Machines Admin'}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedDatabase ? (
          <DatabaseCards onSelectDatabase={setSelectedDatabase} />
        ) : (
          <DatabaseManager database={selectedDatabase} />
        )}
      </main>
    </div>
  );
}

// Database Cards Component
function DatabaseCards({ onSelectDatabase }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Database Management</h2>
        <p className="text-gray-300 text-lg">Select a database to manage its content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATABASE_CONFIG.map((db) => (
          <motion.div
            key={db.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={() => onSelectDatabase(db)}
          >
            <div className={`bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
              <div className="flex items-center justify-between mb-4">
                {/* <div className="text-4xl">{db.icon}</div> */}
                <h3 className="text-xl font-bold text-white">{db.name}</h3>
                <div className="text-white/80">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* <h3 className="text-xl font-bold text-white mb-2">{db.name}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{db.description}</p> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Database Manager Component
function DatabaseManager({ database }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const api = new AdminAPI();

  useEffect(() => {
    fetchData();
  }, [database, pageSize, searchTerm]);

  const fetchData = async (cursor = null) => {
    try {
      setLoading(true);
      const result = await api.getData(database.endpoint, pageSize, cursor, searchTerm);
      
      // Handle different response structures based on database type
      let records = [];
      if (database.id === 'model-details') {
        records = result.models || [];
      } else if (database.id === 'model-faqs') {
        records = result.faqs || [];
      } else if (database.id === 'other-models') {
        records = result.models || [];
      } else if (database.id === 'spare-parts') {
        records = result.spareParts || [];
      } else if (database.id === 'categories') {
        records = result.categories || [];
      } else if (database.id === 'product-models') {
        records = result.productModels || [];
      } else {
        records = result.data || result.records || [];
      }

      setData(records);
      setHasMore(result.hasMore || false);
      setNextCursor(result.nextCursor || null);
      setTotalRecords(records.length);
    } catch (error) {
      setError(`Failed to fetch ${database.name.toLowerCase()}`);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${database.name.toLowerCase().slice(0, -1)}?`)) return;

    try {
      await api.deleteRecord(database.endpoint, id);
      await fetchData();
    } catch (error) {
      setError(`Failed to delete ${database.name.toLowerCase().slice(0, -1)}`);
    }
  };

  const handleExport = async (format) => {
    try {
      const exportData = data.map(record => {
        // Flatten the record for export
        const flatRecord = {};
        Object.keys(record).forEach(key => {
          if (typeof record[key] === 'object' && record[key] !== null) {
            flatRecord[key] = JSON.stringify(record[key]);
          } else {
            flatRecord[key] = record[key];
          }
        });
        return flatRecord;
      });

      if (format === 'csv') {
        const csv = convertToCSV(exportData);
        downloadFile(csv, `${database.id}-export.csv`, 'text/csv');
      } else if (format === 'xlsx') {
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, database.name);
        XLSX.writeFile(wb, `${database.id}-export.xlsx`);
      }
    } catch (error) {
      setError('Failed to export data');
    }
  };

  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#989b2e] mx-auto mb-4"></div>
        <div className="text-white">Loading {database.name.toLowerCase()}...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-white">{database.name}</h2>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
              {totalRecords} records
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 pr-10"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Page Size */}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>

            {/* Export */}
            <div className="relative group">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Export
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExport('xlsx')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                >
                  Export as Excel
                </button>
              </div>
            </div>

            {/* Add New */}
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Data Table */}
      <DataTable
        data={data}
        database={database}
        onEdit={setEditingRecord}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchData(nextCursor)}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingRecord) && (
        <RecordForm
          database={database}
          record={editingRecord}
          onClose={() => {
            setShowCreateForm(false);
            setEditingRecord(null);
          }}
          onSave={fetchData}
        />
      )}
    </div>
  );
}

// Data Table Component
function DataTable({ data, database, onEdit, onDelete }) {
  if (!data.length) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-12 text-center">
        <div className="text-gray-400 text-lg">No data found</div>
      </div>
    );
  }

  // Get table headers from the first record
  const headers = Object.keys(data[0]).filter(key => !key.includes('time') && key !== 'id');

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/10">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((record) => (
              <tr key={record.id} className="hover:bg-white/5">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {typeof record[header] === 'boolean' 
                      ? (record[header] ? '✅' : '❌')
                      : typeof record[header] === 'object' 
                        ? JSON.stringify(record[header]) 
                        : record[header] || '-'
                    }
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(record)}
                    className="text-[#989b2e] hover:text-[#8a8c20] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(record.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
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
  );
}

// Models Panel Component (kept for backward compatibility)
function ModelsPanel() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingModel, setEditingModel] = useState(null);

  const api = new AdminAPI();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const result = await api.getModels();
      setModels(result.models);
    } catch (error) {
      setError('Failed to fetch models');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this model?')) return;

    try {
      await api.deleteModel(id);
      await fetchModels();
    } catch (error) {
      setError('Failed to delete model');
    }
  };

  if (loading) {
    return <div className="text-white">Loading models...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Model Details</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add New Model
        </button>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Power
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Warranty
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {model.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {model.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {model.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {model.power}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {model.warrantyTime} months
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingModel(model)}
                      className="text-[#989b2e] hover:text-[#8a8c20] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(model.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
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

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingModel) && (
        <ModelForm
          model={editingModel}
          onClose={() => {
            setShowCreateForm(false);
            setEditingModel(null);
          }}
          onSave={fetchModels}
        />
      )}
    </div>
  );
}

// Universal Record Form Component
function RecordForm({ database, record, onClose, onSave }) {
  const [formData, setFormData] = useState(record || {});
  const [saving, setSaving] = useState(false);
  const [schema, setSchema] = useState({});

  const api = new AdminAPI();

  // Define field schemas for different databases
  const fieldSchemas = {
    'model-details': {
      name: { type: 'text', label: 'Product Name', required: true },
      model: { type: 'text', label: 'Model Code', required: true },
      category: { type: 'text', label: 'Category', required: true },
      power: { type: 'text', label: 'Power/Specifications' },
      isBannerImage: { type: 'boolean', label: 'Has Banner Image' },
      bannerImage: { type: 'url', label: 'Banner Image URL' },
      warrantyTime: { type: 'number', label: 'Warranty (months)', min: 1, max: 60 },
      isFMTTI: { type: 'boolean', label: 'FMTTI Certified' },
      isUserManual: { type: 'boolean', label: 'Has User Manual' },
      userManualUrl: { type: 'url', label: 'User Manual URL' },
      isBrochure: { type: 'boolean', label: 'Has Brochure' },
      brochureUrl: { type: 'url', label: 'Brochure URL' },
      isSpareParts: { type: 'boolean', label: 'Has Spare Parts' },
      sparePartsUrl: { type: 'url', label: 'Spare Parts URL' },
      isWorkshopManual: { type: 'boolean', label: 'Has Workshop Manual' },
      workshopManualUrl: { type: 'url', label: 'Workshop Manual URL' },
      isVideo: { type: 'boolean', label: 'Has Video Content' },
      videoUrls: { type: 'textarea', label: 'Video URLs (JSON)' },
      isCatalogueLeft: { type: 'boolean', label: 'Has Left Catalogue' },
      catalougeLeft: { type: 'url', label: 'Left Catalogue URL' },
      isCatalogueRight: { type: 'boolean', label: 'Has Right Catalogue' },
      catalougeRight: { type: 'url', label: 'Right Catalogue URL' },
      showcaseImages: { type: 'textarea', label: 'Showcase Images (JSON array)' },
      descriptionImage: { type: 'url', label: 'Description Image URL' },
      description: { type: 'textarea', label: 'Description (JSON)' },
      specifications: { type: 'textarea', label: 'Specifications (JSON)' },
      features: { type: 'textarea', label: 'Features (JSON array)' },
      // Technical specifications
      Maximum_Power: { type: 'text', label: 'Maximum Power' },
      Starting_System: { type: 'text', label: 'Starting System' },
      Fuel_Tank_Size: { type: 'text', label: 'Fuel Tank Size' },
      Compression_Ratio: { type: 'text', label: 'Compression Ratio' },
      Recommended_Oil: { type: 'text', label: 'Recommended Oil' },
      Discharge_Diameter: { type: 'text', label: 'Discharge Diameter' },
      Suction_Diameter: { type: 'text', label: 'Suction Diameter' },
      Suction_Height: { type: 'text', label: 'Suction Height' },
      Total_Elevation: { type: 'text', label: 'Total Elevation' },
      Maximum_Pumping_Capacity: { type: 'text', label: 'Maximum Pumping Capacity' },
      Pump_Type: { type: 'text', label: 'Pump Type' },
      Impeller_Material: { type: 'text', label: 'Impeller Material' },
      Volute_Material: { type: 'text', label: 'Volute Material' },
      Mechanical_Seal: { type: 'text', label: 'Mechanical Seal' },
      // Features
      feature_1: { type: 'text', label: 'Feature 1' },
      feature_2: { type: 'text', label: 'Feature 2' },
      feature_3: { type: 'text', label: 'Feature 3' },
      feature_4: { type: 'text', label: 'Feature 4' },
      feature_5: { type: 'text', label: 'Feature 5' },
      feature_6: { type: 'text', label: 'Feature 6' },
      feature_7: { type: 'text', label: 'Feature 7' },
      feature_8: { type: 'text', label: 'Feature 8' },
      // Description fields
      description_1_title: { type: 'text', label: 'Description 1 Title' },
      description_1_text: { type: 'textarea', label: 'Description 1 Text' },
      description_2_title: { type: 'text', label: 'Description 2 Title' },
      description_2_text: { type: 'textarea', label: 'Description 2 Text' },
      // Video fields
      video_1_url: { type: 'url', label: 'Video 1 URL' },
      video_1_title: { type: 'text', label: 'Video 1 Title' },
    },
    'model-faqs': {
      category: { type: 'text', label: 'Category', required: true },
      question: { type: 'textarea', label: 'Question', required: true },
      answer: { type: 'textarea', label: 'Answer', required: true },
    },
    'other-models': {
      category: { type: 'text', label: 'Category', required: true },
      name: { type: 'text', label: 'Model Name', required: true },
      feature: { type: 'text', label: 'Key Feature' },
      imageLink: { type: 'url', label: 'Image URL' },
    },
    'spare-parts': {
      name: { type: 'text', label: 'Part Name', required: true },
      category: { type: 'text', label: 'Category', required: true },
      partNumber: { type: 'text', label: 'Part Number', required: true },
      price: { type: 'number', label: 'Price ($)', min: 0 },
      availability: { type: 'text', label: 'Availability' },
      description: { type: 'textarea', label: 'Description' },
      imageUrl: { type: 'url', label: 'Image URL' },
      compatibleModels: { type: 'textarea', label: 'Compatible Models (JSON array)' },
    },
    'categories': {
      name: { type: 'text', label: 'Category Name', required: true },
      description: { type: 'textarea', label: 'Description' },
      slug: { type: 'text', label: 'URL Slug', required: true },
      isActive: { type: 'boolean', label: 'Active' },
      sortOrder: { type: 'number', label: 'Sort Order', min: 0 },
      parentCategory: { type: 'text', label: 'Parent Category ID' },
      imageUrl: { type: 'url', label: 'Category Image URL' },
      metaTitle: { type: 'text', label: 'SEO Title' },
      metaDescription: { type: 'textarea', label: 'SEO Description' },
    },
    'product-models': {
      name: { type: 'text', label: 'Product Name', required: true },
      modelCode: { type: 'text', label: 'Model Code', required: true },
      category: { type: 'text', label: 'Category' },
      subcategory: { type: 'text', label: 'Subcategory' },
      isActive: { type: 'boolean', label: 'Active' },
      priority: { type: 'number', label: 'Priority', min: 0 },
      price: { type: 'number', label: 'Price ($)', min: 0 },
      discountPrice: { type: 'number', label: 'Discount Price ($)', min: 0 },
      availability: { type: 'text', label: 'Availability Status' },
      tags: { type: 'textarea', label: 'Tags (JSON array)' },
      shortDescription: { type: 'textarea', label: 'Short Description' },
      fullDescription: { type: 'textarea', label: 'Full Description' },
      specifications: { type: 'textarea', label: 'Specifications' },
      features: { type: 'textarea', label: 'Features' },
      thumbnailImage: { type: 'url', label: 'Thumbnail Image URL' },
      metaTitle: { type: 'text', label: 'SEO Title' },
      metaDescription: { type: 'textarea', label: 'SEO Description' },
      slug: { type: 'text', label: 'URL Slug' },
    }
  };

  useEffect(() => {
    const currentSchema = fieldSchemas[database.id] || {};
    setSchema(currentSchema);
    
    // Initialize form data with schema defaults
    if (!record) {
      const initialData = {};
      Object.keys(currentSchema).forEach(key => {
        const field = currentSchema[key];
        if (field.type === 'boolean') {
          initialData[key] = false;
        } else if (field.type === 'number') {
          initialData[key] = field.min || 0;
        } else {
          initialData[key] = '';
        }
      });
      setFormData(initialData);
    }
  }, [database, record]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Process form data before sending
      const processedData = { ...formData };
      
      // Convert JSON strings back to objects where needed
      Object.keys(processedData).forEach(key => {
        const field = schema[key];
        if (field && field.type === 'textarea' && (key.includes('Json') || key === 'videoUrls' || key === 'showcaseImages' || key === 'description' || key === 'specifications' || key === 'features')) {
          try {
            if (processedData[key]) {
              processedData[key] = JSON.parse(processedData[key]);
            }
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
      });

      if (record) {
        await api.updateRecord(database.endpoint, record.id, processedData);
      } else {
        await api.createRecord(database.endpoint, processedData);
      }
      
      await onSave();
      onClose();
    } catch (error) {
      alert(`Failed to save ${database.name.toLowerCase().slice(0, -1)}`);
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (fieldName, fieldConfig) => {
    const value = formData[fieldName] || '';

    switch (fieldConfig.type) {
      case 'boolean':
        return (
          <label className="flex items-center text-white cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(fieldName, e.target.checked)}
              className="mr-3 w-4 h-4 text-[#989b2e] bg-white/10 border-white/20 rounded focus:ring-[#989b2e]"
            />
            {fieldConfig.label}
          </label>
        );

      case 'number':
        return (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(fieldName, parseInt(e.target.value) || 0)}
              min={fieldConfig.min}
              max={fieldConfig.max}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              required={fieldConfig.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <textarea
              value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              required={fieldConfig.required}
              placeholder={fieldConfig.type === 'textarea' && fieldName.includes('Json') ? 'Enter valid JSON' : ''}
            />
          </div>
        );

      case 'url':
        return (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              required={fieldConfig.required}
              placeholder="https://..."
            />
          </div>
        );

      default: // text
        return (
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {fieldConfig.label}
              {fieldConfig.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
              required={fieldConfig.required}
            />
          </div>
        );
    }
  };

  const schemaFields = Object.keys(schema);
  const booleanFields = schemaFields.filter(key => schema[key].type === 'boolean');
  const otherFields = schemaFields.filter(key => schema[key].type !== 'boolean');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-6">
            {record ? `Edit ${database.name.slice(0, -1)}` : `Create New ${database.name.slice(0, -1)}`}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherFields.map((fieldName) => (
                <div key={fieldName}>
                  {renderField(fieldName, schema[fieldName])}
                </div>
              ))}
            </div>

            {/* Boolean Fields */}
            {booleanFields.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {booleanFields.map((fieldName) => (
                    <div key={fieldName}>
                      {renderField(fieldName, schema[fieldName])}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Model Form Component (kept for backward compatibility)
function ModelForm({ model, onClose, onSave }) {
  const [formData, setFormData] = useState(model || {
    name: '',
    model: '',
    category: '',
    power: '',
    isBannerImage: false,
    bannerImage: '',
    warrantyTime: 36,
    isFMTTI: false,
    isUserManual: false,
    userManualUrl: '',
    isBrochure: false,
    brochureUrl: '',
    isSpareParts: false,
    sparePartsUrl: '',
  });
  const [saving, setSaving] = useState(false);

  const api = new AdminAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (model) {
        await api.updateModel(model.id, formData);
      } else {
        await api.createModel(formData);
      }
      await onSave();
      onClose();
    } catch (error) {
      alert('Failed to save model');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {model ? 'Edit Model' : 'Create New Model'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Model Code
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="gasoline-generator">Gasoline Generator</option>
                  <option value="diesel-generator">Diesel Generator</option>
                  <option value="gasoline-water-pump">Gasoline Water Pump</option>
                  <option value="diesel-water-pump">Diesel Water Pump</option>
                  <option value="lawn-mower">Lawn Mower</option>
                  <option value="chainsaw">Chainsaw</option>
                  <option value="brush-cutter">Brush Cutter</option>
                  <option value="welding-machines">Welding Machines</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Power
                </label>
                <input
                  type="text"
                  value={formData.power}
                  onChange={(e) => handleChange('power', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Banner Image URL
              </label>
              <input
                type="url"
                value={formData.bannerImage}
                onChange={(e) => handleChange('bannerImage', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Warranty (months)
                </label>
                <input
                  type="number"
                  value={formData.warrantyTime}
                  onChange={(e) => handleChange('warrantyTime', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  min="1"
                  max="60"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.isBannerImage}
                  onChange={(e) => handleChange('isBannerImage', e.target.checked)}
                  className="mr-2"
                />
                Has Banner Image
              </label>
              
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.isFMTTI}
                  onChange={(e) => handleChange('isFMTTI', e.target.checked)}
                  className="mr-2"
                />
                FMTTI Certified
              </label>
              
              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.isUserManual}
                  onChange={(e) => handleChange('isUserManual', e.target.checked)}
                  className="mr-2"
                />
                Has User Manual
              </label>

              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.isBrochure}
                  onChange={(e) => handleChange('isBrochure', e.target.checked)}
                  className="mr-2"
                />
                Has Brochure
              </label>

              <label className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={formData.isSpareParts}
                  onChange={(e) => handleChange('isSpareParts', e.target.checked)}
                  className="mr-2"
                />
                Has Spare Parts
              </label>
            </div>

            {/* Document URLs */}
            {formData.isUserManual && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  User Manual URL
                </label>
                <input
                  type="url"
                  value={formData.userManualUrl}
                  onChange={(e) => handleChange('userManualUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>
            )}

            {formData.isBrochure && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Brochure URL
                </label>
                <input
                  type="url"
                  value={formData.brochureUrl}
                  onChange={(e) => handleChange('brochureUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>
            )}

            {formData.isSpareParts && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Spare Parts URL
                </label>
                <input
                  type="url"
                  value={formData.sparePartsUrl}
                  onChange={(e) => handleChange('sparePartsUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#989b2e] hover:bg-[#8a8c20] text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// FAQs Panel Component (simplified for brevity)
function FAQsPanel() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">FAQs Management</h2>
      <p className="text-gray-300">FAQ management interface coming soon...</p>
    </div>
  );
}

// Other Models Panel Component (simplified for brevity)
function OtherModelsPanel() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Other Models Management</h2>
      <p className="text-gray-300">Other models management interface coming soon...</p>
    </div>
  );
}