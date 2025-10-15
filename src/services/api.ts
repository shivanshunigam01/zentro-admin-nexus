import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.zentroverse.com/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  },
  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// Generic CRUD services
export const crudService = {
  getAll: async (model: string, params?: any) => {
    const { data } = await api.get(`/${model}`, { params });
    return data;
  },
  getById: async (model: string, id: string) => {
    const { data } = await api.get(`/${model}/${id}`);
    return data;
  },
  create: async (model: string, payload: any) => {
    const { data } = await api.post(`/${model}`, payload);
    return data;
  },
  update: async (model: string, id: string, payload: any) => {
    const { data } = await api.put(`/${model}/${id}`, payload);
    return data;
  },
  delete: async (model: string, id: string) => {
    const { data } = await api.delete(`/${model}/${id}`);
    return data;
  },
};
