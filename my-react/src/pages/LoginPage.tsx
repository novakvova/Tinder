import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; 

interface LoginResponse {
  access: string;
  refresh: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('/login/', formData);
      console.log('Response:', response.data);
  
      const { access, refresh } = response.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
  
      setMessage('Авторизація успішна!');
      navigate('/home'); 
    } catch (error) {
      setMessage("Помилка авторизації. Перевірте ім'я користувача та пароль.");
      console.error('Помилка авторизації:', error);
    }
  };
  

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img
            src="https://seeklogo.com/images/T/tinder-logo-9F4972F2FE-seeklogo.com.png"
            alt="Tinder Logo"
            className="login-logo"
          />
        </div>
        <h1 className="login-title">Увійдіть у свій акаунт</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Увійти
          </button>
        </form>
        {message && (
          <p
            className={`login-message ${
              message === 'Авторизація успішна!' ? 'success' : 'error'
            }`}
          >
            {message}
          </p>
        )}
        <button
          onClick={handleRegisterRedirect}
          className="register-button"
        >
          Створити акаунт
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
