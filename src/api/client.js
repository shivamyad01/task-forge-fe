import axios from 'axios';
import { API_BASE_URL } from '../utils/constant';

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can centralize error handling here if desired
    return Promise.reject(error);
  }
);

export default client;
