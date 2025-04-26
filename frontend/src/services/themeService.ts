// frontend/src/services/theme.service.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const updateThemePreference = async (theme: 'light' | 'dark') => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(
    `${API_URL}/auth/theme`,
    { themePreference: theme },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};