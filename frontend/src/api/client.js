import axios from 'axios';

const client = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRequest = err.config?.url?.includes('/api/auth/');
    if (err.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Named API functions
export const apiRegister     = (data)     => client.post('/api/auth/register', data);
export const apiLogin        = (data)     => client.post('/api/auth/login', data);
export const apiFetchIssues  = ()         => client.get('/api/issues');
export const apiCreateIssue  = (data)     => client.post('/api/issues', data);
export const apiUpdateIssue  = (id, data) => client.put(`/api/issues/${id}`, data);
export const apiDeleteIssue  = (id)       => client.delete(`/api/issues/${id}`);

export default client;
