import axios from 'axios';

// Backend API base URL - Vite uses VITE_ prefix for environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to set API key dynamically
export const setApiKey = (key) => {
  console.log('🔧 Setting API key in axios defaults:', key);
  api.defaults.headers['x-api-key'] = key;
  console.log('📋 Updated axios headers:', api.defaults.headers);
};

// Function to clear API key
export const clearApiKey = () => {
  console.log('🗑️ Clearing API key from axios defaults');
  delete api.defaults.headers['x-api-key'];
  console.log('� Updated axios headers after clear:', api.defaults.headers);
};

// Don't automatically initialize from localStorage here
// Let the component handle it to avoid timing issues
console.log('⚠️ API service loaded - NOT auto-initializing API key');

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    const apiKeyInConfig = config.headers['x-api-key'];
    const apiKeyInDefaults = api.defaults.headers['x-api-key'];
    
    console.log('🚀 API Request Debug:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      apiKeyInRequest: apiKeyInConfig ? `***${apiKeyInConfig.slice(-4)}` : 'NOT SET',
      apiKeyInDefaults: apiKeyInDefaults ? `***${apiKeyInDefaults.slice(-4)}` : 'NOT SET',
      allHeaders: Object.keys(config.headers),
      hasData: !!config.data
    });
    
    // Force log the actual header value for debugging
    console.log('🔍 Raw x-api-key header:', config.headers['x-api-key']);
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      responseData: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Projects API
export const projectsAPI = {
  // Validate API key
  validateApiKey: async (apiKey) => {
    try {
      const response = await api.get('/api/projects/admin/validate', {}, {
        headers: {
          'x-api-key': apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error validating API key:', error);
      throw error;
    }
  },

  // Get all projects
  getAll: async () => {
    try {
      const response = await api.get('/api/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const response = await api.post('/api/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update existing project
  update: async (id, projectData) => {
    try {
      const response = await api.put(`/api/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
};

// Debug function to test API manually
export const testApiKey = async (testKey = null) => {
  console.log('🧪 Testing API Key...');
  
  if (testKey) {
    console.log(`🔑 Testing with custom key: ${testKey}`);
    // Create a temporary axios instance for testing
    const testApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': testKey
      }
    });
    
    try {
      const response = await testApi.get('/api/projects');
      console.log('✅ Test API call successful with custom key');
      return response.data;
    } catch (error) {
      console.error('❌ Test API call failed:', error.response?.status, error.response?.statusText);
      throw error;
    }
  } else {
    // Test with current API instance
    try {
      const response = await api.get('/api/projects');
      console.log('✅ Test API call successful with current instance');
      return response.data;
    } catch (error) {
      console.error('❌ Test API call failed:', error.response?.status, error.response?.statusText);
      throw error;
    }
  }
};

// Export the api instance for other potential uses
export default api;
