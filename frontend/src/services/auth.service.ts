import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 