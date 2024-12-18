import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<LoginResponse>('http://127.0.0.1:8000/login/', formData);
      const { access, refresh } = response.data;

      // Зберігаємо токени у localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      setMessage('Авторизація успішна!');
    } catch (error) {
      setMessage('Помилка авторизації. Перевірте ім\'я користувача та пароль.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Авторизація</h1>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Ім'я користувача:</label>
          <input
            type="text"
            name="username"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Увійти
        </button>
      </form>
      {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
