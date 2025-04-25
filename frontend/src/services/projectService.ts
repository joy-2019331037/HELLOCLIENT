import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
  clientId: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const fetchProject = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData: {
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold';
  startDate: string;
  endDate?: string;
  clientId: string;
}): Promise<Project> => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (
  id: string,
  projectData: Partial<Project>
): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
}; 