import { projectsAPI } from '../services/api';

// Cache for storing fetched projects data
let projectsCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to check if cache is still valid
const isCacheValid = () => {
  return projectsCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION);
};

// Function to fetch projects from backend with caching
export const fetchProjects = async () => {
  // Return cached data if still valid
  if (isCacheValid()) {
    return projectsCache;
  }

  try {
    const projects = await projectsAPI.getAll();
    
    // Update cache
    projectsCache = projects;
    lastFetchTime = Date.now();
    
    return projects;
  } catch (error) {
    
    // If we have cached data, return it even if expired
    if (projectsCache) {
      return projectsCache;
    }
    
    // No fallback - throw the error so the component can handle it
    throw new Error(`Backend API failed: ${error.message}`);
  }
};

// Utility functions for project statistics - updated to work with async data
export const getProjectStats = async (projects = null) => {
  // If projects not provided, fetch them
  const projectsData = projects || await fetchProjects();
  
  const completedProjects = projectsData.filter(project => project.status === 'completed').length;
  const inProgressProjects = projectsData.filter(project => project.status === 'ongoing').length;
  const totalProjects = projectsData.length;
  const uniqueLocations = [...new Set(projectsData.map(project => project.location))].length;
  const categories = [...new Set(projectsData.map(project => project.category))].length;
  
  // Calculate total duration in months
  const totalDurationMonths = projectsData.reduce((total, project) => {
    const durationStr = project.duration.split(' ')[0];
    const months = parseFloat(durationStr); // Use parseFloat to handle decimals like "1.5"
    return total + months;
  }, 0);

  return {
    completedProjects,
    inProgressProjects,
    totalProjects,
    uniqueLocations,
    categories,
    totalDurationMonths
  };
};

// Additional utility functions for backend integration
export const getProjectsByCategory = async (category) => {
  const projects = await fetchProjects();
  return projects.filter(project => project.category === category);
};

export const getRecentProjects = async (limit = 3) => {
  const projects = await fetchProjects();
  return projects.slice(0, limit);
};

// For backward compatibility, export the main fetch function as default
export default fetchProjects;
