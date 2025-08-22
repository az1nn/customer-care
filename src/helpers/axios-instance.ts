import axios, { AxiosInstance } from 'axios';

const defaultInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default defaultInstance;
