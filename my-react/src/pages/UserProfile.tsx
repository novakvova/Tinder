import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import "../styles/UserProfile.css";

interface UserProfileData {
  avatar: string;
  display_name: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [editableUser, setEditableUser] = useState<UserProfileData>({
    avatar: '',
    display_name: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/profile/");
        const userData = response.data as UserProfileData;

        
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;

        if (userData.avatar && !userData.avatar.startsWith('http')) {
          userData.avatar = `${baseUrl}${userData.avatar}`;
        }

        setUser(userData);
        setEditableUser(userData);
      } catch (error) {
        console.error("Помилка завантаження профілю:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditableUser({
      ...editableUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('display_name', editableUser.display_name);
      formData.append('bio', editableUser.bio);
      if (avatarFile) formData.append('avatar', avatarFile);

      const response = await axios.put('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Профіль оновлено успішно!');
      setUser(response.data as UserProfileData);
    } catch (error) {
      console.error('Помилка при оновленні профілю:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="user-profile-container">
        Завантаження профілю...
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <label htmlFor="avatar-upload">
        <img
  src={
    avatarFile
      ? URL.createObjectURL(avatarFile)
      : editableUser.avatar || 'https://via.placeholder.com/150'
  }
  alt="Avatar"
  className="profile-avatar"
/>

          <input
            type="file"
            id="avatar-upload"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </label>
        <input
          type="text"
          name="display_name"
          value={editableUser.display_name || ''}
          onChange={handleChange}
          placeholder="Ім'я користувача"
          className="profile-input"
        />
        <textarea
          name="bio"
          value={editableUser.bio || ''}
          onChange={handleChange}
          placeholder="Про себе"
          className="profile-input"
        ></textarea>
        <button onClick={handleEditProfile} className="profile-button">
          Зберегти зміни
        </button>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Вийти
      </button>
    </div>
  );
};

export default UserProfile;
