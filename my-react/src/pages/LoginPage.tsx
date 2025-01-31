import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  access: string;
  refresh: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Якщо користувач вже авторизований, перенаправляємо його на home
    if (localStorage.getItem("access")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login/", formData);
      const { access, refresh } = response.data as LoginResponse;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      setMessage("✅ Авторизація успішна!");
      
      // Використовуємо setTimeout для надійної переадресації
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch {
      setMessage("❌ Помилка авторизації. Перевірте ім'я користувача та пароль.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">Увійдіть у свій акаунт</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Ім'я користувача" className="input" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Пароль" className="input" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Увійти</button>
        </form>
        {message && <p className="text-center text-sm text-gray-600 mt-3">{message}</p>}
        <button onClick={() => navigate("/register")} className="btn-secondary mt-3">Створити акаунт</button>
      </div>
    </div>
  );
};

export default LoginPage;
