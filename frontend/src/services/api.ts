import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export function setAuthToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
