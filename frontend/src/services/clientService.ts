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

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export const fetchClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients');
  return response.data;
};

export const fetchClient = async (id: string): Promise<Client> => {
  const response = await api.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (clientData: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}): Promise<Client> => {
  const response = await api.post('/clients', clientData);
  return response.data;
};

export const updateClient = async (
  id: string,
  clientData: Partial<Client>
): Promise<Client> => {
  const response = await api.put(`/clients/${id}`, clientData);
  return response.data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/clients/${id}`);
}; 