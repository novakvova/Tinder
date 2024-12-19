import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 && 
      error.config &&
      !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const refreshResponse = await axios.post<{ access: string }>(
          'http://127.0.0.1:8000/api/token/refresh/',
          {
            refresh: localStorage.getItem('refresh'),
          }
        );

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem('access', newAccessToken);

      
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
