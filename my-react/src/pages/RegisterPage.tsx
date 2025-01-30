import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; 

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      await axiosInstance.post('register/', formData);
      setMessage('Реєстрація успішна! Перенаправлення на авторизацію...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Помилка реєстрації. Перевірте введені дані.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Перенаправлення на сторінку авторизації
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <img
            src="https://seeklogo.com/images/T/tinder-logo-9F4972F2FE-seeklogo.com.png"
            alt="Tinder Logo"
            className="register-logo"
          />
        </div>
        <h1 className="register-title">Створіть акаунт</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Зареєструватися
          </button>
        </form>
        {message && (
          <p className="register-message">{message}</p>
        )}
        <button
          onClick={handleLoginRedirect}
          className="login-redirect-button"
        >
          Вже маєте акаунт? Авторизуйтесь
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
