import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ;

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
  title: string;
  budget: number;
  deadline: string;
  status: string;
  clientId: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
}

export const createProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await api.patch(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
}; 

export const getProjectStats = async (): Promise<{
  total: number;
  in_progress: number;
  completed: number;
  cancelled:number;
  pending: number;
}> => {
  const response = await api.get('/projects/stats');
  console.log(response.data);
  return response.data;
};