import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string; role: string }) =>
    api.post('/api/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/login', data),
};

// Vendor API
export const vendorAPI = {
  checkRegistration: () =>
    api.get('/api/vendor/isregistered'),
  
  register: (data: any) =>
    api.post('/api/vendor/register', data),
  
  getProfile: () =>
    api.get('/api/vendor/profile'),
};

// Bill API
export const billAPI = {
  // Get bills for vendor
  getVendorBills: (vendorId: string, params?: { page?: number; limit?: number; status?: string }) =>
    api.get(`/api/bills/vendor/${vendorId}`, { params }),
  
  // Get bills for customer
  getCustomerBills: (customerEmail: string, params?: { page?: number; limit?: number; status?: string }) =>
    api.get(`/api/bills/customer/${customerEmail}`, { params }),
  
  // Get specific bill
  getBill: (billId: string) =>
    api.get(`/api/bills/${billId}`),
  
  // Download bill (get presigned URL)
  downloadBill: (billId: string) =>
    api.get(`/api/bills/${billId}/download`),
  
  // Get bill statistics
  getBillStats: (vendorId: string, params?: { startDate?: string; endDate?: string }) =>
    api.get(`/api/bills/stats/${vendorId}`, { params }),
};

// Utility functions
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};

export default api; 