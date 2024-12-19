import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance'; 

interface UserProfileData {
  avatar: string;
  name: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
          alert('Ви не авторизовані. Перенаправлення на сторінку входу.');
          window.location.href = '/login';
          return;
        }
      
        try {
          const response = await axios.get('/profile/');
          setUser(response.data as UserProfileData);
        } catch (error: any) {
          if (error.response?.status === 403 || error.response?.status === 401) {
            console.error('Відмовлено в доступі. Повторно авторизуйтесь.');
            alert('Сесія закінчилася. Авторизуйтесь знову.');
            window.location.href = '/login';
          } else {
            console.error('Сталася помилка при завантаженні профілю:', error);
          }
        }
      };
      
      

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    alert('Редагування профілю поки недоступне!');
  };

  const handleLogout = () => {
    localStorage.removeItem('access'); 
    localStorage.removeItem('refresh');
    window.location.href = '/login'; 
  };

  if (!user) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-red-400">
        Завантаження профілю...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 to-red-400 flex flex-col items-center justify-center text-white">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <img
          src={user.avatar || 'https://via.placeholder.com/150'}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-700 mb-4">{user.bio}</p>
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Редагувати профіль
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
      >
        Вийти
      </button>
    </div>
  );
};

export default UserProfile;
