import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    // Store the token in localStorage
    localStorage.setItem('token', response.data.access_token);
    console.log('Login successful ', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('token');
  // Redirect to login page
  window.location.href = '/login';
}; 