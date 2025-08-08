import { useState, useEffect } from 'react';
import { projectsAPI, setApiKey as setAxiosApiKey, clearApiKey } from '../services/api';
import './Admin.css';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(true);
  const [validatingApiKey, setValidatingApiKey] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleId: '',
    description: '',
    descriptionId: '',
    category: 'residential',
    location: '',
    duration: '',
    image: '',
    status: 'completed'
  });

  console.log('🚀 Admin component initialized');
  console.log('📋 Current localStorage admin-api-key:', localStorage.getItem('admin-api-key'));
  console.log('🔑 Current apiKey state:', apiKey);
  console.log('❓ Show API key prompt:', showApiKeyPrompt);

  // Initialize component once
  useEffect(() => {
    if (!isInitialized) {
      console.log('🔄 Initializing admin component...');
      const storedKey = localStorage.getItem('admin-api-key');
      console.log('🔍 Found stored API key:', storedKey);
      
      if (storedKey && storedKey.trim() !== '') {
        console.log('✅ Using stored API key');
        setApiKey(storedKey);
        setAxiosApiKey(storedKey);
        setShowApiKeyPrompt(false);
      } else {
        console.log('❌ No stored API key, showing prompt');
        setShowApiKeyPrompt(true);
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Initialize API key in axios when component mounts or apiKey changes
  useEffect(() => {
    if (apiKey) {
      console.log('🔧 Initializing API key in axios:', apiKey);
      setAxiosApiKey(apiKey);
    } else {
      console.log('🗑️ No API key, clearing axios defaults');
      clearApiKey();
    }
  }, [apiKey]);

  useEffect(() => {
    if (apiKey && !showApiKeyPrompt) {
      loadProjects();
    }
  }, [apiKey, showApiKeyPrompt]);

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Handle image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      console.log('📸 Converting image to base64...');
      
      const base64 = await convertToBase64(file);
      console.log('✅ Image converted to base64');
      
      setFormData(prev => ({
        ...prev,
        image: base64
      }));
      setImagePreview(base64);
      
    } catch (error) {
      console.error('❌ Error converting image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle manual URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      image: url
    }));
    
    // Set preview for URLs
    if (url && (url.startsWith('http') || url.startsWith('data:image'))) {
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  // Clear image
  const clearImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    setImagePreview('');
    // Clear file input
    const fileInput = document.getElementById('imageFile');
    if (fileInput) fileInput.value = '';
  };

  const handleApiKeySubmit = async () => {
    console.log('🔐 Submitting API key:', apiKey);
    
    if (apiKey.trim()) {
      const trimmedKey = apiKey.trim();
      setValidatingApiKey(true);
      
      try {
        console.log('🔍 Validating API key with backend...');
        await projectsAPI.validateApiKey(trimmedKey);
        
        console.log('✅ API key is valid!');
        localStorage.setItem('admin-api-key', trimmedKey);
        setShowApiKeyPrompt(false);
        console.log('✅ API key submission complete');
        
      } catch (error) {
        console.error('❌ API key validation failed:', error);
        
        if (error.response?.status === 401) {
          alert('Invalid API key. Please check your key and try again.');
        } else if (error.response?.data?.message) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('Failed to validate API key. Please check your connection and try again.');
        }
      } finally {
        setValidatingApiKey(false);
      }
    } else {
      alert('Please enter a valid API key');
    }
  };

  const resetApiKey = () => {
    console.log('🗑️ Resetting API key...');
    localStorage.removeItem('admin-api-key');
    clearApiKey();
    setApiKey('');
    setShowApiKeyPrompt(true);
    setIsInitialized(false);
    console.log('✅ API key reset complete');
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      alert('Error loading projects: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, formData);
        alert('Project updated successfully!');
      } else {
        await projectsAPI.create(formData);
        alert('Project created successfully!');
      }
      
      setFormData({
        title: '',
        titleId: '',
        description: '',
        descriptionId: '',
        category: 'residential',
        location: '',
        duration: '',
        image: '',
        status: 'completed'
      });
      setShowForm(false);
      setEditingProject(null);
      setImagePreview('');
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      titleId: project.titleId || '',
      description: project.description || '',
      descriptionId: project.descriptionId || '',
      category: project.category || 'residential',
      location: project.location || '',
      duration: project.duration || '',
      image: project.image || '',
      status: project.status || 'completed'
    });
    setImagePreview(project.image || '');
    setShowForm(true);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await projectsAPI.delete(id);
        alert('Project deleted successfully!');
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      titleId: '',
      description: '',
      descriptionId: '',
      category: 'residential',
      location: '',
      duration: '',
      image: '',
      status: 'completed'
    });
    setImagePreview('');
    setShowForm(true);
  };

  if (showApiKeyPrompt) {
    return (
      <div className="admin">
        <div className="admin-container">
          <div className="api-key-prompt">
            <h1>🔐 Admin Access</h1>
            <p>Enter your API key to access the admin panel:</p>
            <div className="api-key-form">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key..."
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleApiKeySubmit}
                disabled={validatingApiKey}
              >
                {validatingApiKey ? 'Validating...' : 'Access Admin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin">
        <div className="admin-container">
          <h1>Loading Admin Panel...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-header">
          <h1>🔐 Admin Panel</h1>
          <div className="admin-actions">
            <button 
              className="btn btn-primary"
              onClick={handleNewProject}
            >
              + Add New Project
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetApiKey}
              title="Change API Key"
            >
              🔑 Reset Key
            </button>
          </div>
        </div>

        {/* Project Form */}
        {showForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <div className="form-header">
                <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Title (English)</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="titleId">Title (Indonesian)</label>
                    <input
                      type="text"
                      id="titleId"
                      name="titleId"
                      value={formData.titleId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="description">Description (English)</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descriptionId">Description (Indonesian)</label>
                    <textarea
                      id="descriptionId"
                      name="descriptionId"
                      value={formData.descriptionId}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="residential">Residential</option>
                      <option value="business">Business</option>
                      <option value="BUMN">BUMN</option>
                      <option value="infrastructure">Infrastructure</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="completed">Completed</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 6 months"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image">Project Image</label>
                  
                  {/* Image Upload Options */}
                  <div className="image-upload-section">
                    <div className="upload-tabs">
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => document.getElementById('imageFile').click()}
                        disabled={uploadingImage}
                      >
                        {uploadingImage ? 'Processing...' : '📁 Upload Image'}
                      </button>
                      <span>or</span>
                    </div>
                    
                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    
                    {/* URL Input */}
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleImageUrlChange}
                      placeholder="Enter image URL or upload a file above"
                      disabled={uploadingImage}
                    />
                    
                    {/* Clear button */}
                    {(formData.image || imagePreview) && (
                      <button 
                        type="button" 
                        className="btn btn-clear"
                        onClick={clearImage}
                        title="Clear image"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="image-preview">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="preview-image"
                      />
                      <p className="preview-info">
                        {formData.image.startsWith('data:image') ? '📸 Uploaded Image' : '🔗 Image URL'}
                      </p>
                    </div>
                  )}
                  
                  {uploadingImage && (
                    <div className="upload-progress">
                      <div className="progress-bar">
                        <div className="progress-fill"></div>
                      </div>
                      <p>Converting image to base64...</p>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="projects-list">
          <h2>Projects ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No projects found. Add your first project!</p>
            </div>
          ) : (
            <div className="projects-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project._id}>
                      <td>
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="project-thumbnail"
                        />
                      </td>
                      <td>
                        <div className="project-title">
                          <div className="title-en">{project.title}</div>
                          <div className="title-id">{project.titleId}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`category-badge ${project.category}`}>
                          {project.category}
                        </span>
                      </td>
                      <td>{project.location}</td>
                      <td>{project.duration}</td>
                      <td>
                        <span className={`status-badge ${project.status}`}>
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-edit"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-delete"
                            onClick={() => handleDelete(project._id, project.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
