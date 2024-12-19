import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("refresh")
      ) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refresh");
  
          // Явно вказуємо тип для відповіді
          interface RefreshResponse {
            access: string;
          }
  
          const response = await axios.post<RefreshResponse>(
            "http://127.0.0.1:8000/api/token/refresh/",
            { refresh: refreshToken }
          );
  
          const { access } = response.data; // TypeScript тепер розуміє, що в data є 'access'
          localStorage.setItem("access", access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axios(originalRequest); // Повторний запит з новим токеном
        } catch (refreshError) {
          console.error("Не вдалося оновити токен:", refreshError);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login"; // Перенаправлення на авторизацію
        }
      }
  
      if (error.response?.status === 401) {
        // Якщо refresh токен також недійсний
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; // Перенаправлення на авторизацію
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
