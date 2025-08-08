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
  api.defaults.headers['x-api-key'] = key;
};

// Function to clear API key
export const clearApiKey = () => {
  delete api.defaults.headers['x-api-key'];
};

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
      throw error;
    }
  },

  // Get all projects
  getAll: async () => {
    try {
      const response = await api.get('/api/projects');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const response = await api.post('/api/projects', projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update existing project
  update: async (id, projectData) => {
    try {
      const response = await api.put(`/api/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export the api instance for other potential uses
export default api;
