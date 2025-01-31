import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  access: string;
  refresh: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login/', formData);
      const { access, refresh } = response.data as LoginResponse; 

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      setMessage('✅ Авторизація успішна!');
      navigate('/home');
    } catch {
      setMessage("❌ Помилка авторизації. Перевірте ім'я користувача та пароль.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Увійдіть у свій акаунт</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Ім'я користувача" className="input" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Пароль" className="input" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Увійти</button>
        </form>
        {message && <p className="text-center text-sm text-gray-700 mt-3">{message}</p>}
        <button onClick={() => navigate('/register')} className="btn-secondary mt-3">Створити акаунт</button>
      </div>
    </div>
  );
};

export default LoginPage;
