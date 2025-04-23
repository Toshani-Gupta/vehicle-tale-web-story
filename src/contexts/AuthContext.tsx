import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  contactEmail?: string;
  phone?: string;
  gender?: string;
  needs?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    contactEmail: string;
    phone: string;
    gender: string;
    needs: string;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    contactEmail?: string;
    phone?: string;
    gender?: string;
    needs?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Here you would typically validate the token with the backend
      // For now, we'll just set a mock user
      setUser({
        id: '1',
        username: 'johndoe',
        name: 'John Doe',
        email: 'johndoe@email.com',
        contactEmail: 'johndoe@email.com',
        phone: '+1 555 1234567',
        gender: 'male',
        needs: 'Looking to buy a new car'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login({ email, password });
      setUser(response.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    contactEmail: string;
    phone: string;
    gender: string;
    needs: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      setUser(response.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: {
    name?: string;
    contactEmail?: string;
    phone?: string;
    gender?: string;
    needs?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      // Here you would typically make an API call to update the profile
      // For now, we'll just update the local state
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 