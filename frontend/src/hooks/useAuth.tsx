import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/auth.service';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  themePreference: 'light' | 'dark';
}

const api_url = process.env.REACT_APP_API_URL;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${api_url}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser({
          id: response.data.id,
          email: response.data.email,
          name: `${response.data.firstName} ${response.data.lastName}`,
          themePreference: response.data.themePreference || 'light'
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
    setLoading(false);
  }, []);

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      await registerService({ email, password, firstName, lastName });
      // After successful registration, automatically log the user in
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await loginService({ email, password });
      // Fetch user data after successful login
      await fetchUserData();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 