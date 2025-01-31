import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('register/', formData);
      setMessage('✅ Реєстрація успішна! Перенаправлення...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setMessage('❌ Помилка реєстрації. Перевірте введені дані.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <img src="https://seeklogo.com/images/T/tinder-logo-9F4972F2FE-seeklogo.com.png" alt="Tinder" className="mx-auto h-14 mb-4"/>
        <h1 className="text-xl font-semibold text-center mb-4">Створіть акаунт</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Ім'я користувача" className="input" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Електронна пошта" className="input" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Пароль" className="input" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Зареєструватися</button>
        </form>
        {message && <p className="text-center text-sm text-gray-700 mt-3">{message}</p>}
        <button onClick={() => navigate('/login')} className="btn-secondary mt-3">Вже маєте акаунт? Увійдіть</button>
      </div>
    </div>
  );
};

export default RegisterPage;
