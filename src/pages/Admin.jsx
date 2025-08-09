import { useState, useEffect } from 'react';
import { projectsAPI, setApiKey as setAxiosApiKey, clearApiKey } from '../services/api';
import { getImageSrc } from '../utils/imageUtils';
import LazyImage from '../components/LazyImage';
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

  // Initialize component once
  useEffect(() => {
    if (!isInitialized) {
      const storedKey = localStorage.getItem('admin-api-key');
      
      if (storedKey && storedKey.trim() !== '') {
        setApiKey(storedKey);
        setAxiosApiKey(storedKey);
        setShowApiKeyPrompt(false);
      } else {
        setShowApiKeyPrompt(true);
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Initialize API key in axios when component mounts or apiKey changes
  useEffect(() => {
    if (apiKey) {
      setAxiosApiKey(apiKey);
    } else {
      clearApiKey();
    }
  }, [apiKey]);

  useEffect(() => {
    if (apiKey && !showApiKeyPrompt) {
      loadProjects();
    }
  }, [apiKey, showApiKeyPrompt]);

  // Image compression function
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Convert file to base64 with compression
  const convertToBase64 = async (file) => {
    try {
      setUploadingImage(true);
      
      // Compress image first
      const compressedFile = await compressImage(file);
      
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      throw error;
    } finally {
      setUploadingImage(false);
    }
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

    // Add file size limit (10MB before compression)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('Image size must be less than 10MB. Please choose a smaller image.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Large image detected. Compressing to optimize performance...');
    }

    try {
      setUploadingImage(true);
      
      const base64 = await convertToBase64(file);
      
      setFormData(prev => ({
        ...prev,
        image: base64
      }));
      setImagePreview(base64);
      
    } catch (error) {
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
    
    if (apiKey.trim()) {
      const trimmedKey = apiKey.trim();
      setValidatingApiKey(true);
      
      try {
        await projectsAPI.validateApiKey(trimmedKey);
        
        localStorage.setItem('admin-api-key', trimmedKey);
        setShowApiKeyPrompt(false);
        
      } catch (error) {
        
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
    localStorage.removeItem('admin-api-key');
    clearApiKey();
    setApiKey('');
    setShowApiKeyPrompt(true);
    setIsInitialized(false);
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
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
                        <LazyImage 
                          src={project.image} 
                          alt={project.title}
                          className="project-thumbnail"
                          style={{ 
                            width: '80px', 
                            height: '60px', 
                            borderRadius: '4px',
                            objectFit: 'cover'
                          }}
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
