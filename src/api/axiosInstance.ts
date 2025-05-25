import axios from "axios";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match && match[2] !== undefined ? match[2] : null;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // untuk cookie-based auth
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor untuk menambahkan CSRF token ke header
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookie('XSRF-TOKEN');
  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }
  return config;
});

export default axiosInstance;
