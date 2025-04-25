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

export interface Interaction {
  id: string;
  date: string;
  type: string;
  notes: string;
  clientId?: string;
  projectId?: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export const createInteraction = async (interactionData: Omit<Interaction, 'id'>): Promise<Interaction> => {
  // Convert date string to ISO string for backend
  const formattedData = {
    ...interactionData,
    date: new Date(interactionData.date).toISOString(),
    // Convert empty strings to undefined for optional fields
    clientId: interactionData.clientId || undefined,
    projectId: interactionData.projectId || undefined,
  };
  console.log(formattedData);
  const response = await api.post('/interactions', formattedData);
  console.log(response.data);
  return response.data;
};

export const getInteractions = async (): Promise<Interaction[]> => {
  const response = await api.get('/interactions');
  return response.data;
};

export const getInteraction = async (id: string): Promise<Interaction> => {
  const response = await api.get(`/interactions/${id}`);
  return response.data;
};

export const updateInteraction = async (id: string, interactionData: Partial<Interaction>): Promise<Interaction> => {
  // Convert date string to ISO string for backend if date is provided
  const formattedData = {
    ...interactionData,
    ...(interactionData.date && { date: new Date(interactionData.date).toISOString() }),
  };
  const response = await api.patch(`/interactions/${id}`, formattedData);
  return response.data;
};

export const deleteInteraction = async (id: string): Promise<void> => {
  await api.delete(`/interactions/${id}`);
};

export const getInteractionsByClient = async (clientId: string): Promise<Interaction[]> => {
  const response = await api.get(`/interactions/client/${clientId}`);
  return response.data;
};

export const getInteractionsByProject = async (projectId: string): Promise<Interaction[]> => {
  const response = await api.get(`/interactions/project/${projectId}`);
  return response.data;
}; 