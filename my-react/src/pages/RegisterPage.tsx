import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Запит на бекенд для реєстрації
      await axios.post('http://127.0.0.1:8000/register/', formData);
      setMessage('Реєстрація успішна! Можете авторизуватися.');
    } catch (error) {
      setMessage('Помилка реєстрації. Перевірте введені дані.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Реєстрація</h1>
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
          <label>Електронна пошта:</label>
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
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
          Зареєструватися
        </button>
      </form>
      {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default RegisterPage;
