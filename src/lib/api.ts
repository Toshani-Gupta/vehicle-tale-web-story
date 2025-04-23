import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    name: string;
    contactEmail: string;
    phone: string;
    gender: string;
    needs: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Vehicle API
export const vehicleAPI = {
  getVehicles: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },

  getVehicle: async (id: string) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  addVehicle: async (vehicleData: {
    make: string;
    model: string;
    year: number;
    vin: string;
  }) => {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  },

  updateVehicle: async (id: string, vehicleData: {
    make?: string;
    model?: string;
    year?: number;
    vin?: string;
  }) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  deleteVehicle: async (id: string) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },
};

// Service API
export const serviceAPI = {
  addService: async (vehicleId: string, serviceData: {
    date: string;
    type: string;
    description: string;
  }) => {
    const response = await api.post(`/services/${vehicleId}`, serviceData);
    return response.data;
  },

  updateService: async (vehicleId: string, serviceId: string, serviceData: {
    date?: string;
    type?: string;
    description?: string;
  }) => {
    const response = await api.put(`/services/${vehicleId}/${serviceId}`, serviceData);
    return response.data;
  },

  deleteService: async (vehicleId: string, serviceId: string) => {
    const response = await api.delete(`/services/${vehicleId}/${serviceId}`);
    return response.data;
  },
}; 