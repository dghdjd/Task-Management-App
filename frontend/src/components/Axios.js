import axios from 'axios';

const baseUrl = 'http://junhaoapp.xyz';
//http://127.0.0.1:8000/
//'http://junhaoapp.xyz';

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include access token in headers
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get access token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
